import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/SEOHead";
import { Sparkles, Shield, Users, Target, CheckCircle, AlertTriangle } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <SEOHead 
        title="About GPT-5 AI - Independent AI Tools Platform | Legal Information"
        description="GPT-5AI.com is an independent AI tools platform, not affiliated with OpenAI. Learn about our mission, legal compliance, and commitment to responsible AI usage."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/about' : 'https://gpt-5ai.com/about'}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">About Us</Badge>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-6">
                About GPT-5 AI
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                An independent AI tools platform dedicated to providing cutting-edge GPT-5 capabilities for creators, businesses, and professionals worldwide.
              </p>
            </div>

            {/* Mission Section */}
            <Card className="mb-8 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed mb-4">
                  GPT-5 AI is committed to democratizing access to advanced AI capabilities by providing a comprehensive suite of tools that leverage the latest GPT-5 technology. Our platform serves as a bridge between cutting-edge AI research and practical, everyday applications.
                </p>
                <p className="text-lg leading-relaxed">
                  We believe in responsible AI usage and are dedicated to helping users understand and implement AI solutions ethically and effectively.
                </p>
              </CardContent>
            </Card>

            {/* Legal Compliance Section */}
            <Card className="mb-8 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Legal Compliance & Independence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      Important Legal Disclaimer
                    </h3>
                    <div className="space-y-3 text-sm">
                      <p><strong>Independent Platform:</strong> GPT-5AI.com is an independent AI tools platform and is not affiliated with, endorsed, or sponsored by OpenAI or any other company mentioned on this site.</p>
                      <p><strong>Educational Purpose:</strong> All tools provided here are for lawful, educational, and productivity purposes only.</p>
                      <p><strong>Privacy Protection:</strong> We do not request, collect, or store any sensitive personal information such as banking credentials or official account passwords.</p>
                      <p><strong>User Responsibility:</strong> Users are solely responsible for how they use the tools and content generated on this website.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Compliance Focused</h4>
                        <p className="text-sm text-muted-foreground">All tools comply with applicable laws and regulations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Privacy First</h4>
                        <p className="text-sm text-muted-foreground">We prioritize user privacy and data protection</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Transparent Operations</h4>
                        <p className="text-sm text-muted-foreground">Clear disclosure of our independent status</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Ethical AI Usage</h4>
                        <p className="text-sm text-muted-foreground">Promoting responsible AI implementation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What We Offer */}
            <Card className="mb-8 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  What We Offer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">AI Writing Tools</h4>
                    <p className="text-muted-foreground text-sm">
                      Advanced content generation, blog writing, and creative writing assistance powered by GPT-5 technology.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Image Generation</h4>
                    <p className="text-muted-foreground text-sm">
                      Create stunning visuals and graphics using state-of-the-art AI image generation capabilities.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">PDF Analysis</h4>
                    <p className="text-muted-foreground text-sm">
                      Intelligent document processing, summarization, and content extraction from PDF files.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Script Generation</h4>
                    <p className="text-muted-foreground text-sm">
                      Professional script writing tools for videos, podcasts, and multimedia content creation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Contact & Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For questions about our platform, legal compliance, or technical support, please visit our contact page or reach out through our support channels.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="/contact" className="text-primary hover:underline">Contact Us</a>
                  <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                  <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About; 