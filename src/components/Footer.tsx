import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Sparkles className="h-6 w-6 text-primary animate-glow-pulse" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                GPT-5 AI
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Discover powerful GPT-5 AI tools for writing, image generation, and content creation. Best GPT-5 AI platform for content creators and businesses.
            </p>
            <div className="text-sm text-muted-foreground/60">
              Professional GPT-5 AI for creators and businesses worldwide.
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/tools/writer" className="hover:text-foreground transition-smooth">GPT-5 Writing Tool</a></li>
              <li><a href="/tools/pdf" className="hover:text-foreground transition-smooth">GPT-5 PDF Summarizer</a></li>
              <li><a href="/tools/script" className="hover:text-foreground transition-smooth">GPT-5 Script Generator</a></li>
              <li><a href="/tools/image" className="hover:text-foreground transition-smooth">GPT-5 Image Generator</a></li>
              <li><a href="/tools/agent" className="hover:text-foreground transition-smooth">GPT-5 Agent</a></li>
              <li><a href="/tools/prompts" className="hover:text-foreground transition-smooth">GPT-5 Prompt Examples</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/about" className="hover:text-foreground transition-smooth">About</a></li>
              <li><a href="/pricing" className="hover:text-foreground transition-smooth">Pricing</a></li>
              <li><a href="/blog" className="hover:text-foreground transition-smooth">Blog</a></li>
              <li><a href="/contact" className="hover:text-foreground transition-smooth">Contact</a></li>
              <li><a href="/privacy" className="hover:text-foreground transition-smooth">Privacy</a></li>
              <li><a href="/terms" className="hover:text-foreground transition-smooth">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 GPT-5 AI. All rights reserved. Best GPT-5 AI platform for content creators and professionals worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;