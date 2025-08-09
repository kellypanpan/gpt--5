import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Brain, Sparkles, MessageSquare, Star } from "lucide-react";
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
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-6 py-3 mb-8 animate-slide-up">
            <MessageSquare className="h-4 w-4 text-blue-400 animate-glow-pulse" />
            <span className="text-sm text-blue-200 font-medium">🚀 Trusted by 50,000+ professionals worldwide</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Experience True</span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">GPT-5 Conversation</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Professional AI tools + intelligent conversation, all in one platform. 
            <br className="hidden md:block" />
            Chat with GPT-5, create content, analyze documents – everything you need to succeed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/chat">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                💬 Start Chatting Now
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-smooth" />
              </Button>
            </Link>
            <Link to="/tools">
              <Button variant="outline" className="border-2 border-gray-700 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg rounded-xl">
                Explore AI Tools
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
            <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-lg text-gray-300 font-semibold mb-2">⭐ 4.9/5 from 2,847+ reviews</p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div>💳 No credit card required</div>
              <div>🔒 30-day money-back guarantee</div>
              <div>⚡ Instant access</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;