import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, ExternalLink, Loader2, Settings } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import WalletSelectionModal from "./WalletSelectionModal";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal = ({ isOpen, onClose }: WalletModalProps) => {
  const { connectWithWallet, disconnectWallet, isConnected, address, isLoading, selectedWallet } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const [showWalletSelection, setShowWalletSelection] = useState(false);

  const handleConnect = () => {
    setShowWalletSelection(true);
  };

  const handleWalletSelect = async (wallet: any) => {
    try {
      setIsConnecting(true);
      await connectWithWallet(wallet);
      setShowWalletSelection(false);
      onClose();
    } catch (error) {
      console.error('Connection failed:', error);
      // Don't show additional error message here as the hook already handles it
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      onClose();
    } catch (error) {
      console.error('Disconnection failed:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gradient">
            <Wallet className="w-5 h-5" />
            {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {isConnected ? (
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="text-sm text-muted-foreground mb-1">Connected Wallet:</div>
                <div className="font-semibold mb-2 flex items-center gap-2">
                  {selectedWallet?.icon} {selectedWallet?.name}
                </div>
                <div className="text-sm text-muted-foreground mb-1">Address:</div>
                <div className="font-mono text-sm break-all">
                  {address}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleDisconnect}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Disconnecting...
                    </>
                  ) : (
                    'Disconnect'
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowWalletSelection(true)}
                  disabled={isLoading}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Switch Wallet
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                onClick={handleConnect}
                disabled={isConnecting || isLoading}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="text-2xl">🔗</div>
                  <div className="text-left flex-1">
                    <div className="font-semibold">Select Wallet</div>
                    <div className="text-sm text-muted-foreground">
                      Choose from available wallets
                    </div>
                  </div>
                  {isConnecting || isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </Button>
              
              <div className="text-xs text-muted-foreground text-center">
                By connecting a wallet, you agree to our Terms & Conditions
              </div>
            </div>
          )}
        </div>
      </DialogContent>
      
      <WalletSelectionModal 
        isOpen={showWalletSelection}
        onClose={() => setShowWalletSelection(false)}
        onWalletSelect={handleWalletSelect}
      />
    </Dialog>
  );
};

export default WalletModal;