import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, ExternalLink } from "lucide-react";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWalletSelect: (wallet: string) => void;
}

const WalletModal = ({ isOpen, onClose, onWalletSelect }: WalletModalProps) => {
  const wallets = [
    {
      name: "MetaMask",
      icon: "🦊",
      description: "Connect using browser extension",
      id: "metamask"
    },
    {
      name: "WalletConnect",
      icon: "🔗",
      description: "Scan with WalletConnect to connect",
      id: "walletconnect"
    },
    {
      name: "Coinbase Wallet",
      icon: "🔵",
      description: "Connect using Coinbase Wallet",
      id: "coinbase"
    },
    {
      name: "Trust Wallet",
      icon: "⚡",
      description: "Connect using Trust Wallet",
      id: "trust"
    }
  ];

  const handleWalletClick = (walletId: string) => {
    onWalletSelect(walletId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gradient">
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 mt-4">
          {wallets.map((wallet) => (
            <Button
              key={wallet.id}
              variant="ghost"
              className="w-full justify-start h-auto p-4 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
              onClick={() => handleWalletClick(wallet.id)}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="text-2xl">{wallet.icon}</div>
                <div className="text-left flex-1">
                  <div className="font-semibold">{wallet.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {wallet.description}
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
            </Button>
          ))}
        </div>
        
        <div className="text-xs text-muted-foreground text-center mt-4">
          By connecting a wallet, you agree to our Terms & Conditions
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;