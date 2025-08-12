import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

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
            <h3 className="font-semibold mb-4">{t("tools")}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/tools/writer" className="hover:text-foreground transition-smooth">{t("toolWriter")}</Link></li>
              <li><Link to="/tools/pdf" className="hover:text-foreground transition-smooth">{t("toolPDF")}</Link></li>
              <li><Link to="/tools/script" className="hover:text-foreground transition-smooth">{t("toolScript")}</Link></li>
              <li><Link to="/tools/image" className="hover:text-foreground transition-smooth">{t("toolImage")}</Link></li>
              <li><Link to="/tools/agent" className="hover:text-foreground transition-smooth">{t("toolAgent")}</Link></li>
              <li><Link to="/tools/prompts" className="hover:text-foreground transition-smooth">{t("toolPrompts")}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">{t("company")}</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">{t("about")}</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">{t("contact")}</Link></li>
              <li><Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">{t("pricing")}</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">{t("blog")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t("legal")}</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">{t("privacy")}</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">{t("terms")}</Link></li>
              <li><Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground">{t("cookies")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 AI Tools Hub. All rights reserved. Professional AI tools platform for creators and businesses.
          </p>
          
          {/* Secure Payments Notice */}
          <div className="mt-6 text-xs text-muted-foreground/80 max-w-4xl mx-auto">
            <strong className="text-muted-foreground">Secure Payments:</strong> Your security is our priority. All payments are securely processed by Creem. We never handle or store your credit card information. This site is protected by SSL encryption.
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-4 text-xs text-muted-foreground/70 max-w-4xl mx-auto">
            <strong className="text-muted-foreground">Legal Disclaimer:</strong> This platform is an independent AI tools service and is not affiliated with, endorsed, or sponsored by OpenAI, Google, Anthropic, or any AI model provider. 
            All tools provided here are for lawful, educational, and productivity purposes only. 
            We do not request, collect, or store any sensitive personal information such as banking credentials or official account passwords. 
            Users are solely responsible for how they use the tools and content generated on this website. All trademarks belong to their respective owners.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;