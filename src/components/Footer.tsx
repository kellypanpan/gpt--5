import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

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
              <li><Link to="/tools/writer" className="hover:text-foreground transition-smooth">Writer</Link></li>
              <li><Link to="/tools/pdf" className="hover:text-foreground transition-smooth">PDF</Link></li>
              <li><Link to="/tools/script" className="hover:text-foreground transition-smooth">Script</Link></li>
              <li><Link to="/tools/image" className="hover:text-foreground transition-smooth">Image</Link></li>
              <li><Link to="/chat" className="hover:text-foreground transition-smooth">AI Chat</Link></li>
              <li><Link to="/tools/prompts" className="hover:text-foreground transition-smooth">Prompts</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link></li>
              <li><Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <div>© 2025 AI Tools Hub. All rights reserved. Professional AI tools platform for creators and businesses.</div>
          <div className="mt-3 max-w-4xl mx-auto leading-relaxed">
            <div className="font-medium">Secure Payments:</div>
            <div>Your security is our priority. All payments are securely processed by Creem. We never handle or store your credit card information. This site is protected by SSL encryption.</div>
          </div>
          <div className="mt-3 max-w-5xl mx-auto text-xs text-muted-foreground/70">
            <div className="font-medium">Legal Disclaimer:</div>
            <div>
              This platform is an independent AI tools service and is not affiliated with, endorsed, or sponsored by OpenAI, Google, Anthropic, or any AI model provider. All tools provided here are for lawful, educational, and productivity purposes only. We do not request, collect, or store any sensitive personal data without explicit consent.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;