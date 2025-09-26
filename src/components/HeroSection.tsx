import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, Shield, TrendingUp, Users } from "lucide-react";

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: Users, label: "Investors", value: "2,847" },
    { icon: TrendingUp, label: "ETH Raised", value: "1,247" },
    { icon: Shield, label: "Security Rating", value: "A+" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-secondary rounded-full blur-3xl opacity-15 animate-float" style={{animationDelay: '3s'}}></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="outline" className="mb-4 px-4 py-2 glow-accent animate-pulse-glow">
            <Rocket className="w-4 h-4 mr-2" />
            Presale Live Now - Limited Time
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            <span className="text-gradient">Carbon Pepe X</span>{" "}
            Climate Revolution
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up">
            The first climate-focused meme token combining viral culture with real climate impact. Join the presale with minimum investment of $10 and get 25% bonus tokens.
          </p>

          {/* Countdown Timer */}
          <div className="mb-12 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Presale Ends In:</h3>
            <div className="flex justify-center space-x-4 md:space-x-6">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, index) => (
                <div key={item.label} className="text-center">
                  <div className="bg-card border rounded-xl p-4 md:p-6 shadow-card-3 glow-primary min-w-[80px] md:min-w-[100px] glow-primary animate-glow">
                    <div className="text-2xl md:text-4xl font-bold text-gradient mb-2">
                      {item.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{animationDelay: '0.5s'}}>
            <a
              key={"joinpresalenow_hero"}
              href={"#presale"}
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-gradient-primary hover:shadow-glow-primary transition-all duration-300 text-lg px-8 py-6 glow-primary animate-glow"
              >
                Join Presale Now
              </Button>
            </a>
            <a
              key={"whitepaper_hero"}
              href={"https://tally.so/r/nPoN9d"}
            >
              <Button 
                variant="outline" 
                size="lg"
                className="gradient-border text-lg px-8 py-6 hover:bg-gradient-primary hover:text-primary-foreground"
              >
                View Whitepaper
              </Button>
            </a>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.6s'}}>
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary mb-3 glow-primary">
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-2xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;