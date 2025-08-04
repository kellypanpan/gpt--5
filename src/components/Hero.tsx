import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Brain, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card/20 backdrop-blur-sm border border-border/20 rounded-full px-4 py-2 mb-8 animate-slide-up">
            <Sparkles className="h-4 w-4 text-primary animate-glow-pulse" />
            <span className="text-sm text-muted-foreground">Experience GPT-5 AI Tools</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="bg-gradient-primary bg-clip-text text-transparent">GPT-5 AI</span>
            <br />
            <span className="text-foreground">Tools Hub</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Powerful GPT-5 tools for writing, image generation, and content creation. Advanced AI capabilities for creators, businesses, and professionals who demand excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/tools">
              <Button variant="hero" size="xl" className="group">
                Try GPT-5 Tools Now
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-smooth" />
              </Button>
            </Link>
            <Link to="/blog/what-is-gpt-5">
              <Button variant="glass" size="xl">
                What is GPT-5?
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-card/10 backdrop-blur-sm border border-border/20 rounded-lg p-6 hover:bg-card/20 transition-smooth">
              <div className="bg-gradient-primary rounded-lg w-12 h-12 flex items-center justify-center mb-4 shadow-glow-sm">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">GPT-5 Writing Tool</h3>
              <p className="text-muted-foreground">Advanced GPT-5 writing capabilities for content creators, blogs, and business communications.</p>
            </div>

            <div className="bg-card/10 backdrop-blur-sm border border-border/20 rounded-lg p-6 hover:bg-card/20 transition-smooth">
              <div className="bg-gradient-secondary rounded-lg w-12 h-12 flex items-center justify-center mb-4 shadow-glow-accent">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">GPT-5 Image Generator</h3>
              <p className="text-muted-foreground">Create stunning visuals with GPT-5 AI image generation technology for any creative project.</p>
            </div>

            <div className="bg-card/10 backdrop-blur-sm border border-border/20 rounded-lg p-6 hover:bg-card/20 transition-smooth">
              <div className="bg-gradient-primary rounded-lg w-12 h-12 flex items-center justify-center mb-4 shadow-glow-sm">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">GPT-5 Features</h3>
              <p className="text-muted-foreground">Experience cutting-edge GPT-5 capabilities with professional-grade AI tools and features.</p>
            </div>
          </div>

          {/* Trust Indicator */}
          <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <p className="text-sm text-muted-foreground mb-4">Best GPT-5 tools for content creators and businesses</p>
            <div className="text-xs text-muted-foreground/60">
              Professional GPT-5 AI tools. Experience the future of content creation.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;