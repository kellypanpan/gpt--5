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
            <span className="text-sm text-muted-foreground">The Next Leap of AI: GPT-5</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="bg-gradient-primary bg-clip-text text-transparent">Beyond Answers</span>
            <br />
            <span className="text-foreground">Into Action</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Your thinking, creating, doing assistant. GPT-5AI doesn't just answer questions—it executes complex tasks, calls external tools, and delivers results that matter.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/tools">
              <Button variant="hero" size="xl" className="group">
                Get Access Now
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-smooth" />
              </Button>
            </Link>
            <Link to="/tools">
              <Button variant="glass" size="xl">
                View Demo
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-card/10 backdrop-blur-sm border border-border/20 rounded-lg p-6 hover:bg-card/20 transition-smooth">
              <div className="bg-gradient-primary rounded-lg w-12 h-12 flex items-center justify-center mb-4 shadow-glow-sm">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Task Understanding</h3>
              <p className="text-muted-foreground">Comprehends complex multi-step instructions and breaks them down into actionable plans.</p>
            </div>

            <div className="bg-card/10 backdrop-blur-sm border border-border/20 rounded-lg p-6 hover:bg-card/20 transition-smooth">
              <div className="bg-gradient-secondary rounded-lg w-12 h-12 flex items-center justify-center mb-4 shadow-glow-accent">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Tool Integration</h3>
              <p className="text-muted-foreground">Seamlessly connects with external APIs, databases, and specialized tools for real results.</p>
            </div>

            <div className="bg-card/10 backdrop-blur-sm border border-border/20 rounded-lg p-6 hover:bg-card/20 transition-smooth">
              <div className="bg-gradient-primary rounded-lg w-12 h-12 flex items-center justify-center mb-4 shadow-glow-sm">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Output</h3>
              <p className="text-muted-foreground">Delivers professional-grade content, analysis, and solutions ready for immediate use.</p>
            </div>
          </div>

          {/* Trust Indicator */}
          <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <p className="text-sm text-muted-foreground mb-4">Trusted by professionals worldwide</p>
            <div className="text-xs text-muted-foreground/60">
              Only serious creators allowed. Get access, get things done.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;