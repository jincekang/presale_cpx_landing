import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, CreditCard, Coins, TrendingUp, Users, Clock, Icon, Loader2 } from "lucide-react";
import WalletModal from "./WalletModal";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "sonner";

const PresaleWidget = () => {
  const [selectedPayment, setSelectedPayment] = useState("ETH");
  const [amount, setAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Use real wallet connection
  const { isConnected, address, connectWallet, provider } = useWallet();

  const paymentMethods = [
    { symbol: "ETH", name: "Ethereum", icon: "/images/ethereum.png", price: 0.0035 },
    { symbol: "USDC", name: "USD Coin", icon: "/images/usdc.png", price: 0.05 },
    { symbol: "USDT", name: "Tether", icon: "/images/usdt.png", price: 0.05 },
  ];

  const presaleData = {
    currentStage: 1,
    totalStages: 5,
    tokensRaised: 67580000,
    totalTokens: 100000000,
    currentPrice: 0.05,
    nextPrice: 0.075,
    participants: 2847,
  };

  const progressPercentage = (presaleData.tokensRaised / presaleData.totalTokens) * 100;

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const selectedMethod = paymentMethods.find(method => method.symbol === selectedPayment);
    if (selectedMethod && value) {
      const tokens = parseFloat(value) / selectedMethod.price;
      setTokenAmount(tokens.toFixed(0));
    } else {
      setTokenAmount("");
    }
  };

  const handleWalletConnect = () => {
    setIsWalletModalOpen(true);
  };

  const handlePurchase = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }
    if (!provider) {
      toast.error("Wallet provider not available");
      return;
    }

    try {
      setIsProcessing(true);
      
      // Convert amount to wei (assuming ETH)
      const amountInWei = (parseFloat(amount) * Math.pow(10, 18)).toString(16);
      
      // For demo purposes, we'll just show a success message
      // In a real implementation, you would:
      // 1. Deploy or interact with a smart contract
      // 2. Send the actual transaction
      // 3. Handle the transaction hash
      
      toast.success("Purchase initiated! Please confirm the transaction in your wallet.");
      
      // Simulate transaction processing
      setTimeout(() => {
        setIsProcessing(false);
        toast.success("Transaction completed successfully!");
      }, 2000);
      
    } catch (error: any) {
      console.error('Purchase failed:', error);
      setIsProcessing(false);
      toast.error("Transaction failed. Please try again.");
    }
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText("https://carbonpepex.io/ref/abc123");
    toast.success("Referral link copied to clipboard!");
  };

  return (
    <section id="presale" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-2 glow-accent animate-pulse-glow">
              <TrendingUp className="w-4 h-4 mr-2" />
              Stage {presaleData.currentStage} of {presaleData.totalStages}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Purchase Your <span className="text-gradient">Tokens</span> Now
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Don't miss out on the opportunity to invest in the future of DeFi at pre-launch prices.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Presale Stats */}
            <Card className="gradient-border bg-gradient-card shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex item-row">
                    <Wallet className="w-5 h-5 mr-2" />
                    <span>Presale Progress</span>
                  </div>
                  <Badge variant="outline" className="glow-success">
                    <Clock className="w-3 h-3 mr-1" />
                    Live
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{presaleData.tokensRaised.toLocaleString()} tokens raised</span>
                    <span>{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3 glow-accent" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0</span>
                    <span>{presaleData.totalTokens.toLocaleString()} total</span>
                  </div>
                </div>

                {/* Current Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-primary/20 rounded-lg">
                    <div>
                      <div className="text-2xl font-bold text-gradient">${presaleData.currentPrice}</div>
                      <div className="text-sm text-muted-foreground">Current Price</div>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-primary/20 rounded-lg glow-primary animate-pulse-glow">
                    <div className="text-2xl font-bold text-gradient">${presaleData.nextPrice}</div>
                    <div className="text-sm text-muted-foreground">Next Stage</div>
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-accent" />
                    <div>
                      <div className="font-semibold">{presaleData.participants.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Participants</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Coins className="w-5 h-5 text-success" />
                    <div>
                      <div className="font-semibold">25%</div>
                      <div className="text-sm text-muted-foreground">Bonus Tokens</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Purchase Widget */}
            <Card className="gradient-border bg-gradient-card shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex item-row">
                    <Wallet className="w-5 h-5 mr-2" />
                    <span>Purchase Tokens</span>
                  </div>
                  <Badge variant="outline" className="glow-success">
                    <Clock className="w-3 h-3 mr-1" />
                    Live
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="buy" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy">Buy Tokens</TabsTrigger>
                    <TabsTrigger value="referral">Referral</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="buy" className="space-y-6 mt-6">
                    {/* Payment Method Selection */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">Select Payment Method</label>
                      <div className="grid grid-cols-3 gap-2">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.symbol}
                            onClick={() => setSelectedPayment(method.symbol)}
                            className={`p-3 rounded-lg border text-center transition-all ${
                              selectedPayment === method.symbol
                                ? 'border-primary bg-primary/30 glow-primary'
                                : 'border-border hover:border-primary/90'
                            }`}
                          >
                            <div className="flex">
                              <div className="w-40"><img className="w-7" src={method.icon} /></div>
                              <div className="w-60 font-bold text-lg text-left">{method.symbol}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Amount Input */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Amount ({selectedPayment})
                        </label>
                        <Input
                          type="number"
                          placeholder="0.0"
                          value={amount}
                          onChange={(e) => handleAmountChange(e.target.value)}
                          className="text-lg"
                          min="0.0022"
                          max="10"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">You'll Receive</label>
                        <div className="p-3 bg-primary/20 rounded-lg animate-pulse-glow">
                          <div className="text-lg font-semibold text-gradient">
                            {tokenAmount || "0"} CPX
                          </div>
                          <div className="text-sm text-muted-foreground">
                            + {tokenAmount ? Math.floor(parseFloat(tokenAmount) * 0.25) : 0} bonus tokens (25%)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Referral Code Input */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Referral Code (Optional)
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter referral code for 25% bonus"
                        // value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value)}
                        className="text-sm"
                      />
                    </div>

                    {/* Connect Wallet / Purchase Button */}
                    {!isConnected ? (
                      <Button variant="outline" 
                        className="gradient-border glow-primary hover:bg-gradient-primary hover:text-primary-foreground w-full"
                        size="lg"
                        onClick={handleWalletConnect}
                      >
                        <Wallet className="w-4 h-4 mr-2" />
                        Connect Wallet
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                          <div className="text-sm text-muted-foreground mb-1">Connected:</div>
                          <div className="font-mono text-sm break-all">
                            {address}
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full bg-gradient-primary glow-primary hover:shadow-glow-primary transition-all duration-300"
                          size="lg"
                          disabled={!amount || isProcessing}
                          onClick={handlePurchase}
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-4 h-4 mr-2" />
                              Purchase CPX Tokens
                            </>
                          )}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsWalletModalOpen(true)}
                          className="w-full"
                        >
                          Manage Wallet
                        </Button>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground text-center">
                      Min purchase: 0.1 ETH • Max purchase: 10 ETH per wallet
                    </div>
                  </TabsContent>

                  <TabsContent value="referral" className="mt-6">
                    <div className="text-center space-y-4">
                      <div className="text-2xl font-bold text-gradient">25% Referral Bonus</div>
                      <p className="text-muted-foreground">
                        Invite friends and earn 25% bonus tokens on their purchases
                      </p>
                      <div className="p-4 bg-primary/20 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-2">Your Referral Link:</div>
                        <div className="font-mono text-sm bg-background p-2 rounded border break-all">
                          https://carbonpepex.io/ref/abc123
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="gradient-border glow-primary hover:bg-gradient-primary hover:text-primary-foreground w-full"
                        size="lg"
                        onClick={handleCopyReferral}
                      >
                        Copy Referral Link
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </section>
  );
};

export default PresaleWidget;