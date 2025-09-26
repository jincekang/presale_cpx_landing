import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";

type Tier = {
  tier: number;
  collection: string;
  pricePerWei: string;
  pricePerCpxEth: string;
  priceUsd: string;
  tokensPerEth: string;
};

const TIERS: Tier[] = [
  { tier: 1, collection: "0 - 100 ETH", pricePerWei: "590000000000000", pricePerCpxEth: "0.00059", priceUsd: "$0.000590", tokensPerEth: "1,694,915 CPX" },
  { tier: 2, collection: "100 - 300 ETH", pricePerWei: "1180000000000000", pricePerCpxEth: "0.00118", priceUsd: "$0.001180", tokensPerEth: "847,458 CPX" },
  { tier: 3, collection: "300 - 600 ETH", pricePerWei: "2360000000000000", pricePerCpxEth: "0.00236", priceUsd: "$0.002360", tokensPerEth: "423,729 CPX" },
  { tier: 4, collection: "600 - 1,000 ETH", pricePerWei: "3540000000000000", pricePerCpxEth: "0.00354", priceUsd: "$0.003540", tokensPerEth: "282,486 CPX" },
  { tier: 5, collection: "1,000 - 1,500 ETH", pricePerWei: "4720000000000000", pricePerCpxEth: "0.00472", priceUsd: "$0.004720", tokensPerEth: "211,864 CPX" },
  { tier: 6, collection: "1,500 - 2,200 ETH", pricePerWei: "5900000000000000", pricePerCpxEth: "0.00590", priceUsd: "$0.005900", tokensPerEth: "169,492 CPX" },
  { tier: 7, collection: "2,200 - 3,000 ETH", pricePerWei: "11800000000000000", pricePerCpxEth: "0.01180", priceUsd: "$0.011800", tokensPerEth: "84,746 CPX" },
  { tier: 8, collection: "3,000 - 4,000 ETH", pricePerWei: "1770000000000000", pricePerCpxEth: "0.01770", priceUsd: "$0.017700", tokensPerEth: "56,497 CPX" },
  { tier: 9, collection: "4,000 - 6,000 ETH", pricePerWei: "2183000000000000", pricePerCpxEth: "0.02183", priceUsd: "$0.021830", tokensPerEth: "45,808 CPX" },
  { tier: 10, collection: "6,000 - 10,000 ETH", pricePerWei: "2183000000000000", pricePerCpxEth: "0.02183", priceUsd: "$0.021830", tokensPerEth: "45,808 CPX" },
];

const PricingTable = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Pricing Table - <span className="text-gradient">10 Tiers</span></h2>
          </div>

          <Card className="gradient-border bg-gradient-card shadow-elevated">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Token Pricing by Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="text-[9px] sm:text-[11px] md:text-sm lg:text-sm">
                <TableHeader>
                  <TableRow className="bg-primary/15 font-semibold">
                    <TableHead className="w-[60px]">Tier</TableHead>
                    <TableHead>Collection (ETH)</TableHead>
                    <TableHead>Price in Wei</TableHead>
                    <TableHead>Price in ETH</TableHead>
                    <TableHead>Price in USD*</TableHead>
                    <TableHead className="text-right">Tokens for 1 ETH</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TIERS.map((row, idx) => (
                    <TableRow
                      key={row.tier}
                      className={
                        idx === 0
                          ? "bg-primary/5 hover:bg-primary/15"
                          : "bg-primary/5 hover:bg-primary/15"
                      }
                    >
                      <TableCell>
                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold">
                          {row.tier}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{row.collection}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.pricePerWei}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.pricePerCpxEth}</TableCell>
                      <TableCell className="font-semibold">{row.priceUsd}</TableCell>
                      <TableCell className="text-right font-medium text-green-200">{row.tokensPerEth}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption>
                  *Based on ETH ≈ $2,400 (approximate). Prices increase automatically as the presale progresses.
                </TableCaption>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;


