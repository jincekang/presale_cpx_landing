import { Wallet, CreditCard, Coins, TrendingUp, Users, Clock, Icon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    q: "What is the minimum pre-sale investment?",
    a: "The minimum investment is just 0.0022 ETH (approximately $10), making the presale accessible to all investors.",
  },
  {
    q: "How does the referral system work?",
    a: "When you use a valid referral code, you'll receive 25% extra tokens. For example, if you purchase 1000 CPX, you'll receive 1250 CPX in total."
  },
  {
    q: "When will the tokens be released?",
    a: "30% of tokens are released immediately after purchase. The remaining 70% are released gradually over 10 months through the vesting system."
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept ETH (native), USDT, and USDC. Conversions are handled automatically using Chainlink oracles to ensure fair pricing.",
  },
  {
    q: "Are contracts safe?",
    a: "Yes! All contracts are verified on Etherscan, internally audited, and include advanced protections such as multi-sig, reentrancy guard, and circuit breakers.",
  },
  {
    q: "When will the token be listed on exchanges?",
    a: "We plan to list CPX on DEXs (Uniswap) shortly after the presale ends, followed by listings on CoinMarketCap, CoinGecko, and larger CEXs.",
  },
];

const FAQSection = () => {
  return (
    <section id="faqs" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-2 glow-accent animate-pulse-glow">
                <TrendingUp className="w-4 h-4 mr-2" />
                FAQs
            </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Frequently Asked <span className="text-gradient">Questions</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Get your questions answered about Carbon Pepe X</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border border-border border-b-0 rounded-lg bg-card shadow-card-3 overflow-hidden">
                <AccordionTrigger className="bg-primary/10 hover:bg-primary/20 group px-6 py-5 text-left [&>svg]:hidden">
                  <div className="flex w-full items-center justify-between">
                    <span className="font-medium">{item.q}</span>
                    <span className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full font-bold group-data-[state=open]:hidden">+</span>
                    <span className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full font-bold hidden group-data-[state=open]:inline-flex">×</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-primary/15 px-6 pb-6 text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;



