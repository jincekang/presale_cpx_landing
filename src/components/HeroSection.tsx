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
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 pb-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0"></div>
      <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-secondary rounded-full blur-3xl opacity-15 animate-float" style={{animationDelay: '3s'}}></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          {/* Badge - Independent Part */}
          <div className="text-center mt-8 sm:mb-12">
            <Badge variant="outline" className="px-3 py-2 sm:px-4 text-xs sm:text-sm glow-accent animate-pulse-glow">
              <Rocket className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Presale Live Now - Limited Time
            </Badge>
          </div>

          {/* Main Headline - Top of Component */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in leading-tight">
              <span className="text-gradient">Carbon Pepe X</span>{" "}
              <span className="block sm:inline">Climate Revolution</span>
            </h1>
            
            
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Subheadline */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up">
                The first climate-focused meme token combining viral culture with real climate impact. Join the presale with minimum investment of $10 and get 25% bonus tokens.
              </p>
              
              {/* Countdown Timer */}
              <div className="mb-8 sm:mb-12 animate-slide-up" style={{animationDelay: '0.2s'}}>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4 text-muted-foreground">Presale Ends In:</h3>
                <div className="flex justify-center lg:justify-start space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Minutes", value: timeLeft.minutes },
                    { label: "Seconds", value: timeLeft.seconds },
                  ].map((item, index) => (
                    <div key={item.label} className="text-center">
                      <div className="bg-card border rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-card-3 glow-primary min-w-[60px] sm:min-w-[80px] md:min-w-[100px] glow-primary animate-glow">
                        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gradient mb-1 sm:mb-2">
                          {item.value.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12 animate-slide-up" style={{animationDelay: '0.5s'}}>
                <a
                  key={"joinpresalenow_hero"}
                  href={"#presale"}
                >
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-primary hover:bg-gradient-primary hover:shadow-glow-primary transition-all duration-300 text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 glow-primary animate-glow"
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
                    className="w-full sm:w-auto gradient-border text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 hover:bg-gradient-primary hover:text-primary-foreground"
                  >
                    View Whitepaper
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto lg:mx-0 animate-slide-up" style={{animationDelay: '0.6s'}}>
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-primary mb-2 sm:mb-3 glow-primary animate-pulse-glow">
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                    </div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gradient mb-1">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="/images/frog-cut.png" 
                  alt="Carbon Pepe X Character"
                  className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto animate-float"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;