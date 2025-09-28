import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, ExternalLink, Download, Loader2, RefreshCw } from "lucide-react";
import { useWalletDetection, WalletInfo } from "@/hooks/useWalletDetection";
import { toast } from "sonner";

interface WalletSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWalletSelect: (wallet: WalletInfo) => void;
}

const WalletSelectionModal = ({ isOpen, onClose, onWalletSelect }: WalletSelectionModalProps) => {
  const { availableWallets, isDetecting, refreshWallets } = useWalletDetection();
  const [selectedWallet, setSelectedWallet] = useState<WalletInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleWalletClick = async (wallet: WalletInfo) => {
    if (!wallet.isInstalled && wallet.id !== 'walletconnect') {
      // Open download page for uninstalled wallets
      if (wallet.downloadUrl) {
        window.open(wallet.downloadUrl, '_blank');
        toast.info(`Please install ${wallet.name} and refresh the page`);
      }
      return;
    }

    setSelectedWallet(wallet);
    setIsConnecting(true);

    try {
      await onWalletSelect(wallet);
      onClose();
    } catch (error) {
      console.error('Wallet connection failed:', error);
      toast.error(`Failed to connect to ${wallet.name}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleRefresh = () => {
    refreshWallets();
    toast.info('Refreshing available wallets...');
  };

  const installedWallets = availableWallets.filter(wallet => wallet.isInstalled || wallet.id === 'walletconnect');
  const uninstalledWallets = availableWallets.filter(wallet => !wallet.isInstalled && wallet.id !== 'walletconnect');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-gradient-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gradient">
            <Wallet className="w-5 h-5" />
            Select Wallet
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Refresh Button */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isDetecting}
              className="flex items-center gap-2"
            >
              {isDetecting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Refresh
            </Button>
          </div>

          {/* Installed Wallets */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Badge variant="outline" className="glow-success">
                Available
              </Badge>
              Installed Wallets
            </h3>
            <div className="grid gap-3">
              {installedWallets.map((wallet) => (
                <Button
                  key={wallet.id}
                  variant="outline"
                  className="w-full justify-start h-auto p-4 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                  onClick={() => handleWalletClick(wallet)}
                  disabled={isConnecting}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="text-2xl">{wallet.icon}</div>
                    <div className="text-left flex-1">
                      <div className="font-semibold flex items-center gap-2">
                        {wallet.name}
                        {wallet.isInstalled && (
                          <Badge variant="secondary" className="text-xs">
                            Installed
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {wallet.description}
                      </div>
                    </div>
                    {isConnecting && selectedWallet?.id === wallet.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Uninstalled Wallets */}
          {uninstalledWallets.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Badge variant="outline" className="glow-accent">
                  Install
                </Badge>
                Other Wallets
              </h3>
              <div className="grid gap-3">
                {uninstalledWallets.map((wallet) => (
                  <Button
                    key={wallet.id}
                    variant="outline"
                    className="w-full justify-start h-auto p-4 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all opacity-75"
                    onClick={() => handleWalletClick(wallet)}
                    disabled={isConnecting}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="text-2xl">{wallet.icon}</div>
                      <div className="text-left flex-1">
                        <div className="font-semibold flex items-center gap-2">
                          {wallet.name}
                          <Badge variant="outline" className="text-xs">
                            Not Installed
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {wallet.description}
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* No Wallets Message */}
          {availableWallets.length === 0 && !isDetecting && (
            <div className="text-center py-8">
              <Wallet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Wallets Detected</h3>
              <p className="text-muted-foreground mb-4">
                No wallet extensions were found. Please install a wallet to continue.
              </p>
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          )}

          {/* Loading State */}
          {isDetecting && (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
              <p className="text-muted-foreground">Detecting available wallets...</p>
            </div>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground text-center mt-4">
          By connecting a wallet, you agree to our Terms & Conditions
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletSelectionModal;
