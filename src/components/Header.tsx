import { Button } from "@/components/ui/button";
import { Menu, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Sparkles className="h-6 w-6 text-primary animate-glow-pulse" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm"></div>
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            GPT-5AI.com
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#tools" className="text-muted-foreground hover:text-foreground transition-smooth">
            Tools
          </a>
          <a href="#agent" className="text-muted-foreground hover:text-foreground transition-smooth">
            Agent
          </a>
          <a href="#prompts" className="text-muted-foreground hover:text-foreground transition-smooth">
            Prompts
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-smooth">
            Pricing
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button variant="hero" className="hidden md:inline-flex">
            Get Access
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;