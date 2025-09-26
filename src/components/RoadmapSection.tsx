import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Clock, Rocket, Users, Shield, TrendingUp, Zap } from "lucide-react";

const RoadmapSection = () => {
  const roadmapData = [
    {
      phase: "Q3/Q4 2025",
      title: "Foundation",
      status: "completed",
      timeframe: "Q3/Q4 2025",
      items: [
        "Smart contract development",
        "Security audit completion", 
        "Ethereum Mainnet deployment",
        "Etherscan verification"
      ],
      icon: Shield
    },
    {
      phase: "Q4 2025", 
      title: "Launch",
      status: "current",
      timeframe: "Q4 2025",
      items: [
        "Official presale (In Progress)",
        "Website development",
        "Community building",
        "Whitepaper publication"
      ],
      icon: Rocket
    },
    {
      phase: "Q1 2026",
      title: "Expansion",
      status: "upcoming",
      timeframe: "Q1 2026",
      items: [
        "DEX listing (Uniswap)",
        "CoinMarketCap/CoinGecko listing",
        "Strategic partnerships",
        "Marketing campaigns"
      ],
      icon: TrendingUp
    },
    {
      phase: "Q2 2026",
      title: "Utility",
      status: "upcoming", 
      timeframe: "Q2 2026",
      items: [
        "Climate project launches",
        "Ecological NFT marketplace",
        "Gamification and rewards",
        "Staking and yield farming"
      ],
      icon: Users
    },
    {
      phase: "Q3 2026",
      title: "Ecosystem",
      status: "upcoming",
      timeframe: "Q3 2026 & Beyond",
      items: [
        "DAO and governance",
        "Multi-chain expansion",
        "CEX listings", 
        "Advanced DeFi products"
      ],
      icon: Zap
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-success";
      case "current":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "current":
        return Clock;
      default:
        return Circle;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="glow-success">Completed</Badge>;
      case "current":
        return <Badge variant="outline" className="glow-primary animate-pulse-glow">Current</Badge>;
      default:
        return <Badge variant="outline">Upcoming</Badge>;
    }
  };

  return (
    <section id="roadmap" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2 glow-accent animate-pulse-glow">
            <Rocket className="w-4 h-4 mr-2" />
            Roadmap
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Journey to <span className="text-gradient">Success</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Follow our strategic roadmap as we build the future of decentralized finance, one milestone at a time.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-primary opacity-20"></div>
            
            {roadmapData.map((item, index) => {
              const StatusIcon = getStatusIcon(item.status);
              const PhaseIcon = item.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={item.phase} className="relative mb-16 last:mb-0">
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
                    <div className="w-4 h-4 rounded-full bg-gradient-primary glow-primary border-4 border-background"></div>
                  </div>

                  <div className={`flex items-center ${isEven ? 'flex-row-reverse' : ''}`}>
                    <div className="w-1/2"></div>
                    <div className={`w-1/2 ${isEven ? 'pr-12' : 'pl-12'}`}>
                      <Card className="gradient-border bg-gradient-card shadow-elevated animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center glow-primary`}>
                                <PhaseIcon className="w-5 h-5 text-primary-foreground" />
                              </div>
                              <div>
                                <div className="font-semibold text-md text-primary">{item.phase}</div>
                                <h3 className="text-xl font-bold">{item.title}</h3>
                              </div>
                            </div>
                            {getStatusBadge(item.status)}
                          </div>
                          
                          <div className="mb-4">
                            <div className="text-sm text-muted-foreground mb-2">{item.timeframe}</div>
                          </div>

                          <ul className="space-y-2">
                            {item.items.map((task, taskIndex) => (
                              <li key={taskIndex} className="flex items-start space-x-2">
                                <StatusIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${getStatusColor(item.status)}`} />
                                <span className="text-sm">{task}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-8">
            {roadmapData.map((item, index) => {
              const StatusIcon = getStatusIcon(item.status);
              const PhaseIcon = item.icon;
              
              return (
                <Card key={item.phase} className="gradient-border bg-gradient-card shadow-elevated animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center glow-primary">
                          <PhaseIcon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-primary">{item.phase}</div>
                          <h3 className="text-lg font-bold">{item.title}</h3>
                        </div>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm text-muted-foreground">{item.timeframe}</div>
                    </div>

                    <ul className="space-y-2">
                      {item.items.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start space-x-2">
                          <StatusIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${getStatusColor(item.status)}`} />
                          <span className="text-sm">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;