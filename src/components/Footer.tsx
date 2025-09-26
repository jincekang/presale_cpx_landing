import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Twitter, MessageCircle, Github, FileText, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: MessageCircle, label: "Telegram", href: "#" },
    { icon: Github, label: "Github", href: "#" },
  ];

  const footerLinks = {
    "Project": [
      { label: "Whitepaper", href: "https://tally.so/r/nPoN9d", icon: FileText },
      { label: "Presale", href: "#presale", icon: ExternalLink },
      { label: "Tokenomics", href: "#tokenomics", icon: ExternalLink },
      { label: "Roadmap", href: "#roadmap", icon: ExternalLink },
    ],
    "Community": [
      { label: "Discord", href: "https://discord.com" },
      { label: "Reddit", href: "https://reddit.com" },
      { label: "Medium", href: "#https://medium.com" },
      { label: "YouTube", href: "https://youtube.com" },
    ],
    "Support": [
      { label: "contact@carbonpepex.io", href: "#", icon: Mail },
      { label: "www.carbonpepex.io", href: "#faqs", icon: FileText },
      { label: "https://tally.so/r/nPoN9d", href: "#", icon: FileText },
      { label: "Privacy Policy", href: "#", icon: FileText },
    ],
  };

  return (
    <footer className="relative mt-20 border-t border-border bg-background-secondary">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background-secondary to-background opacity-50"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex-shrink-0 flex items-center">          
              <img src="/favicon.ico" alt="CPX_logo" className="w-10 mr-1" />
              <div className="text-2xl font-bold text-gradient">
                Carbon Pepe X
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-sm">
              The first climate-focused meme token combining viral culture with real environmental impact and sustainable blockchain solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 rounded-full border border-border hover:border-primary hover:glow-primary transition-all duration-300"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm flex items-center"
                    >
                      {link.icon && <link.icon className="w-3 h-3 mr-2" />}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2025 Carbon Pepe X. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <span className="text-muted-foreground">Contrato Token</span>
            </div>
            <div>
            <div className="text-muted-foreground">
              Presale: 
              <button className="ml-1 text-primary hover:text-primary-glow transition-colors font-mono text-xs">
                0x85Cc28038D1ab2Bb6873636d8c0451Aa292BFC00
              </button>
            </div>
            <div className="text-muted-foreground">
              Carbon Pepe X: 
              <button className="ml-1 text-primary hover:text-primary-glow transition-colors font-mono text-xs">
                0x0005abdBbC9A739Bb3254BD79F293cDE333ab367
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-primary rounded-full blur-3xl opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-32 bg-gradient-secondary rounded-full blur-3xl opacity-5"></div>
    </footer>
  );
};

export default Footer;