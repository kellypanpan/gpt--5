import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Image, Code, Zap, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const ToolsSection = () => {
  const tools = [
    {
      icon: FileText,
      title: "GPT-5 Writing Tool",
      description: "How to use GPT-5 for writing: Professional content creation with advanced AI capabilities",
      credits: "1 Credit/use",
      path: "/tools/writer",
      gradient: "bg-gradient-primary",
    },
    {
      icon: FileText,
      title: "GPT-5 PDF Summarizer",
      description: "GPT-5 PDF analysis and document processing with intelligent summaries and insights",
      credits: "3 Credits/use",
      path: "/tools/pdf",
      gradient: "bg-gradient-secondary",
    },
    {
      icon: Code,
      title: "GPT-5 Script Generator",
      description: "Create engaging video scripts and content with GPT-5 AI for all platforms",
      credits: "2 Credits/use",
      path: "/tools/script",
      gradient: "bg-gradient-primary",
    },
    {
      icon: Image,
      title: "GPT-5 Image Generator",
      description: "Generate stunning visuals with GPT-5 AI image creation technology",
      credits: "5 Credits/image",
      path: "/tools/image",
      gradient: "bg-gradient-secondary",
    },
    {
      icon: Zap,
      title: "GPT-5 Agent",
      description: "GPT-5 business use cases: Advanced AI agent for complex task automation",
      credits: "5-15 Credits/task",
      path: "/agent",
      gradient: "bg-gradient-primary",
      featured: true,
    },
    {
      icon: Code,
      title: "GPT-5 Prompt Examples",
      description: "GPT-5 prompt examples and templates for optimal AI performance and results",
      credits: "Browse free, execute costs credits",
      path: "/prompts",
      gradient: "bg-gradient-secondary",
    },
  ];

  return (
    <section id="tools" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">GPT-5 Tools</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive GPT-5 AI tools for writing, image generation, and content creation. Best GPT-5 tools for content creators and professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border/20 hover:bg-card/80 hover:border-border/40 transition-smooth group relative overflow-hidden"
              >
                {tool.featured && (
                  <Badge className="absolute top-3 right-3 bg-gradient-primary text-primary-foreground border-0">
                    Featured
                  </Badge>
                )}
                
                <CardHeader>
                  <div className={`${tool.gradient} rounded-lg w-12 h-12 flex items-center justify-center mb-4 shadow-glow-sm group-hover:shadow-glow transition-smooth`}>
                    <IconComponent className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {tool.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-xs">
                      {tool.credits}
                    </Badge>
                  </div>
                  
                  <Link to={tool.path}>
                    <Button 
                      variant="ghost" 
                      className="w-full group-hover:bg-accent/10 justify-between"
                    >
                      Try Tool
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-smooth" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Experience the best GPT-5 tools for content creators. Professional AI tools for every need.
          </p>
          <Link to="/tools">
            <Button variant="hero" size="lg">
              Explore All GPT-5 Tools
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;