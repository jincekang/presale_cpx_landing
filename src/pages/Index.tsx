import HeroSection from "@/components/HeroSection";
import PresaleWidget from "@/components/PresaleWidget";
import PricingTable from "@/components/PricingTable";
import TokenomicsSection from "@/components/TokenomicsSection";
import RoadmapSection from "@/components/RoadmapSection";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PresaleWidget />
      <PricingTable />
      <TokenomicsSection />
      <RoadmapSection />
      <FAQSection />
    </div>
  );
};

export default Index;
