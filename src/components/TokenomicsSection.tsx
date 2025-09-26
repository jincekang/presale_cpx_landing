import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Coins, Users, Rocket, Shield, TrendingUp, Lock } from "lucide-react";

const TokenomicsSection = () => {
  const tokenAllocation = [
    { name: "Presale", value: 40, color: "#8b5cf6", amount: "400M" },
    { name: "Liquidity", value: 25, color: "#06b6d4", amount: "250M" },
    { name: "Team", value: 15, color: "#10b981", amount: "150M" },
    { name: "Marketing", value: 10, color: "#f59e0b", amount: "100M" },
    { name: "Development", value: 7, color: "#ef4444", amount: "70M" },
    { name: "Reserve", value: 3, color: "#6b7280", amount: "30M" },
  ];

  const vestingSchedule = [
    { stage: "TGE", presale: 25, team: 5, marketing: 45 },
    { stage: "Month 1", presale: 25, team: 5, marketing: 25 },
    { stage: "Month 3", presale: 25, team: 10, marketing: 25 },
    { stage: "Month 6", presale: 25, team: 20, marketing: 0 },
    { stage: "Month 12", presale: 0, team: 35, marketing: 0 },
    { stage: "Month 18", presale: 0, team: 35, marketing: 0 },
  ];

  const tokenMetrics = [
    {
      icon: Coins,
      title: "Total Supply",
      value: "1,000,000,000",
      suffix: "CPX",
      description: "Fixed supply, no inflation"
    },
    {
      icon: Users,
      title: "Initial Circulating",
      value: "160,000,000",
      suffix: "CPX",
      description: "16% of total supply at launch"
    },
    {
      icon: Lock,
      title: "Team Tokens Locked",
      value: "18",
      suffix: "Months",
      description: "Ensuring long-term commitment"
    },
    {
      icon: Shield,
      title: "Liquidity Locked",
      value: "24",
      suffix: "Months",
      description: "Providing price stability"
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="tokenomics" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2 glow-accent animate-pulse-glow">
            <TrendingUp className="w-4 h-4 mr-2" />
            Tokenomics
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Transparent</span> Token Distribution
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our carefully designed tokenomics ensure sustainable growth and long-term value creation for all stakeholders.
          </p>
        </div>

        {/* Token Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tokenMetrics.map((metric, index) => (
            <Card key={metric.title} className="gradient-border bg-gradient-card text-center animate-fade-in" style={{animationDelay: `${index * 0.3}s`}}>
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary mb-4 glow-primary">
                  <metric.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-2xl font-bold text-gradient mb-1">
                  {metric.value}{metric.suffix && <span className="text-sm ml-1">{metric.suffix}</span>}
                </div>
                <div className="text-sm font-medium mb-2">{metric.title}</div>
                <div className="text-xs text-muted-foreground">{metric.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Token Allocation Pie Chart */}
          <Card className="gradient-border bg-gradient-card shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Coins className="w-5 h-5 mr-2" />
                Token Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tokenAllocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={120}
                      paddingAngle={0}
                      dataKey="value"
                    >
                      {tokenAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {data.value}% ({data.amount} tokens)
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                {tokenAllocation.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{item.value}%</div>
                      <div className="text-sm text-muted-foreground">{item.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vesting Schedule */}
          <Card className="gradient-border bg-gradient-card shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Vesting Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-6">
                <ResponsiveContainer width="90%" height="100%">
                  <BarChart data={vestingSchedule}>
                    <XAxis 
                      dataKey="stage" 
                      axisLine={true}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={true}
                      tickLine={true}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="presale" stackId="b" fill="#8b5cf6" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="team" stackId="b" fill="#06b6d4" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="marketing" stackId="b" fill="#10b981" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-[#8b5cf6]" />
                    <span className="font-medium">Presale Tokens</span>
                  </div>
                  <span className="text-sm text-muted-foreground">25% every TGE + 3 months</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-[#06b6d4]" />
                    <span className="font-medium">Team Tokens</span>
                  </div>
                  <span className="text-sm text-muted-foreground">18-month linear vesting</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-[#10b981]" />
                    <span className="font-medium">Marketing</span>
                  </div>
                  <span className="text-sm text-muted-foreground">50% TGE, 25% monthly</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <div className="mt-12">
          <Card className="gradient-border bg-gradient-card shadow-elevated">
            <CardHeader>
              <CardTitle>Key Tokenomics Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Shield,
                    title: "Deflationary Mechanism",
                    description: "2% of all transactions are burned, reducing total supply over time"
                  },
                  {
                    icon: Users,
                    title: "Staking Rewards",
                    description: "Earn up to 12% APY by staking your tokens in our platform"
                  },
                  {
                    icon: Rocket,
                    title: "Governance Rights",
                    description: "Token holders can vote on key protocol decisions and upgrades"
                  }
                ].map((feature, index) => (
                  <div key={feature.title} className="text-center p-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-primary mb-3 glow-primary">
                      <feature.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;