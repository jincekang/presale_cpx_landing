import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Wallet } from "lucide-react";
import WalletModal from "./WalletModal";
import { toast } from "sonner";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Presale", href: "#presale" },
    { label: "Tokenomics", href: "#tokenomics" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "FAQs", href: "#faqs" },
    // { label: "Whitepaper", href: "https://tally.so/r/nPoN9d" },
  ];

  const handleWalletConnect = () => {
    setIsWalletModalOpen(true);
  };

  const handleWalletSelect = (walletId: string) => {
    setConnectedWallet(walletId);
    toast.success(`${walletId} wallet connected successfully!`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/10 hover:bg-background/50 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">          
            <img src="/favicon.ico" alt="CPX_logo" className="w-10 mr-1" />
            <div className="text-2xl font-bold text-gradient">
              Carbon Pepe X
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-5 mr-1 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Button variant="outline" className="gradient-border glow-primary hover:bg-gradient-primary hover:text-primary-foreground w-full"
              onClick={handleWalletConnect}>
              <Wallet className="w-4 h-4" />
              
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-primary/10 border text-muted-foreground"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card/20 backdrop-blur-lg rounded-lg mt-2 border border-border">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2">
                <Button variant="outline" className="gradient-border hover:bg-gradient-primary hover:text-primary-foreground w-full"
                  onClick={handleWalletConnect}>
                  <Wallet className="w-3 h-4 mr-1" />
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        // onWalletSelect={handleWalletSelect}
      />
    </nav>
  );
};

export default Navigation;