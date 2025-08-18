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
            <span className="text-sm text-blue-200 font-medium">🚀 Advanced AI Tools Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">ChatGPT-5</span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">AI Assistant</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Experience the power of ChatGPT-5 with advanced reasoning capabilities.
            <br className="hidden md:block" />
            Professional AI chat, document analysis, and content creation in one platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/chat">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                🚀 Try ChatGPT-5 Now
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-smooth" />
              </Button>
            </Link>
            <Link to="/tools">
              <Button variant="outline" className="border-2 border-gray-700 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg rounded-xl">
                View AI Tools
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-card/10 backdrop-blur-sm border border-border/20 rounded-lg p-6 hover:bg-card/20 transition-smooth">
              <div className="bg-gradient-primary rounded-lg w-12 h-12 flex items-center justify-center mb-4 shadow-glow-sm">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Advanced Reasoning</h3>
              <p className="text-muted-foreground">ChatGPT-5's enhanced reasoning capabilities for complex problem-solving and analysis.</p>
            </div>

            <div className="bg-card/10 backdrop-blur-sm border border-border/20 rounded-lg p-6 hover:bg-card/20 transition-smooth">
              <div className="bg-gradient-secondary rounded-lg w-12 h-12 flex items-center justify-center mb-4 shadow-glow-accent">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Document Analysis</h3>
              <p className="text-muted-foreground">Upload PDFs and images for intelligent analysis with ChatGPT-5's advanced understanding.</p>
            </div>

            <div className="bg-card/10 backdrop-blur-sm border border-border/20 rounded-lg p-6 hover:bg-card/20 transition-smooth">
              <div className="bg-gradient-primary rounded-lg w-12 h-12 flex items-center justify-center mb-4 shadow-glow-sm">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Professional Content</h3>
              <p className="text-muted-foreground">Create high-quality content with ChatGPT-5's superior language generation capabilities.</p>
            </div>
          </div>

          {/* Trust Indicator */}
          <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400 mb-4">
              <div>💳 No credit card required</div>
              <div>🔒 7-day money-back guarantee</div>
              <div>⚡ Instant access</div>
            </div>
            
            {/* Important Disclaimer */}
            <div className="border-t border-gray-700 pt-6 mt-8">
              <p className="text-xs text-gray-500 max-w-2xl mx-auto">
                <strong className="text-gray-400">Important:</strong> This platform is independently operated and not affiliated with OpenAI, Google, Anthropic, or any AI model provider. 
                All AI technologies are integrated for educational and professional use. All trademarks belong to their respective owners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;