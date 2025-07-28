import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, PenTool, Image, FileText, Video, Code, Brain, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const UseCases = () => {
  const useCases = [
    {
      id: "content-creation",
      title: "Content Creation",
      description: "Create engaging blog posts, articles, and marketing copy with GPT-5's advanced writing capabilities.",
      icon: PenTool,
      tools: ["Writer", "Script Generator"],
      benefits: ["SEO-optimized content", "Multiple writing styles", "Fast generation"],
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: "image-generation",
      title: "Image Generation",
      description: "Generate stunning visuals for marketing, social media, and creative projects with DALL-E 3 integration.",
      icon: Image,
      tools: ["Image Generator"],
      benefits: ["High-quality images", "Multiple styles", "Custom prompts"],
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      id: "document-analysis",
      title: "Document Analysis",
      description: "Analyze PDFs, extract insights, and get intelligent summaries with advanced document processing.",
      icon: FileText,
      tools: ["PDF Analyzer"],
      benefits: ["Smart summaries", "Q&A extraction", "Keyword analysis"],
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      id: "video-scripts",
      title: "Video Scripts",
      description: "Create engaging TikTok and YouTube scripts with viral-worthy content and platform optimization.",
      icon: Video,
      tools: ["Script Generator"],
      benefits: ["Platform-specific", "Multiple styles", "Production notes"],
      color: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      id: "code-generation",
      title: "Code Generation",
      description: "Generate, debug, and optimize code across multiple programming languages with AI assistance.",
      icon: Code,
      tools: ["Code Assistant"],
      benefits: ["Multiple languages", "Debug support", "Best practices"],
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      id: "business-automation",
      title: "Business Automation",
      description: "Automate repetitive tasks, generate reports, and streamline business processes with AI.",
      icon: TrendingUp,
      tools: ["Business Assistant"],
      benefits: ["Process automation", "Report generation", "Data analysis"],
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    }
  ];

  const industries = [
    {
      name: "Marketing & Advertising",
      description: "Create compelling campaigns, social media content, and marketing materials.",
      tools: ["Writer", "Image Generator", "Script Generator"]
    },
    {
      name: "Education",
      description: "Generate educational content, create study materials, and assist with research.",
      tools: ["Writer", "PDF Analyzer", "Code Assistant"]
    },
    {
      name: "E-commerce",
      description: "Create product descriptions, marketing copy, and visual content for online stores.",
      tools: ["Writer", "Image Generator"]
    },
    {
      name: "Content Creation",
      description: "Produce high-quality content for blogs, social media, and digital platforms.",
      tools: ["Writer", "Script Generator", "Image Generator"]
    },
    {
      name: "Research & Analysis",
      description: "Analyze documents, extract insights, and generate research reports.",
      tools: ["PDF Analyzer", "Business Assistant"]
    },
    {
      name: "Software Development",
      description: "Generate code, debug issues, and create technical documentation.",
      tools: ["Code Assistant", "Writer"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">GPT-5 Use Cases</Badge>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-6">
            GPT-5 Use Cases & Applications
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how GPT-5 can transform your workflow across various industries and use cases. From content creation to business automation, explore the endless possibilities.
          </p>
        </div>

        {/* Use Cases Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;
              return (
                <Card key={useCase.id} className={`border-2 ${useCase.borderColor} hover:shadow-lg transition-shadow`}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${useCase.bgColor}`}>
                        <Icon className={`h-6 w-6 ${useCase.color}`} />
                      </div>
                      <CardTitle className="text-xl">{useCase.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Available Tools:</h4>
                      <div className="flex flex-wrap gap-2">
                        {useCase.tools.map((tool) => (
                          <Badge key={tool} variant="secondary">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Key Benefits:</h4>
                      <ul className="space-y-1">
                        {useCase.benefits.map((benefit) => (
                          <li key={benefit} className="text-sm text-muted-foreground flex items-center gap-2">
                            <Sparkles className="h-3 w-3 text-primary" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link to={`/tools/${useCase.tools[0].toLowerCase().replace(' ', '-')}`}>
                      <Button className="w-full" variant="outline">
                        Try {useCase.tools[0]}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Industry Applications */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Industry Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((industry) => (
              <Card key={industry.name} className="border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{industry.name}</CardTitle>
                  <p className="text-muted-foreground">{industry.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {industry.tools.map((tool) => (
                      <Badge key={tool} variant="outline">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Marketing Agency</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    "GPT-5 helped us increase content production by 300% while maintaining quality."
                  </p>
                  <Badge variant="secondary">+300% Production</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Research Team</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    "Document analysis time reduced from hours to minutes with GPT-5."
                  </p>
                  <Badge variant="secondary">90% Time Saved</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Development Team</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    "Code generation and debugging efficiency improved dramatically."
                  </p>
                  <Badge variant="secondary">50% Faster Development</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Workflow?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Start using GPT-5 today and experience the power of next-generation AI. Choose from our comprehensive suite of tools designed for every use case.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/tools">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Explore All Tools
                  </Button>
                </Link>
                <Link to="/blog/what-is-gpt-5">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn More About GPT-5
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">What industries can benefit from GPT-5?</h3>
              <p className="text-muted-foreground">
                GPT-5 is versatile and can benefit virtually any industry, from marketing and education to healthcare and finance. Its applications are limited only by your imagination.
              </p>
            </div>
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">How much does it cost to use GPT-5 tools?</h3>
              <p className="text-muted-foreground">
                Our GPT-5 tools use a credit-based system. Each tool has different credit costs, and we offer various subscription plans to suit different needs and budgets.
              </p>
            </div>
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Is GPT-5 safe for business use?</h3>
              <p className="text-muted-foreground">
                Yes, GPT-5 includes advanced safety measures and content filtering. All generated content is reviewed and filtered to ensure it meets business standards.
              </p>
            </div>
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Can I integrate GPT-5 with my existing tools?</h3>
              <p className="text-muted-foreground">
                Absolutely! Our GPT-5 tools are designed to work seamlessly with your existing workflow. We offer API access and integrations for enterprise users.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UseCases; 