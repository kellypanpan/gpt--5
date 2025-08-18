import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Image, Code, Zap, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const ToolsSection = () => {
  const tools = [
    {
      icon: FileText,
      title: "AI Writing Assistant",
      description: "Professional content creation with ChatGPT-5's advanced writing capabilities",
      credits: "Included in Chat",
      path: "/tools/writer",
      gradient: "bg-gradient-primary",
    },
    {
      icon: FileText,
      title: "PDF Document Analyzer", 
      description: "Upload and analyze PDF documents with intelligent summaries and insights",
      credits: "3 Credits/use",
      path: "/tools/pdf",
      gradient: "bg-gradient-secondary",
      featured: true,
    },
    {
      icon: Zap,
      title: "Prompt Lab",
      description: "Create and optimize AI prompts for better ChatGPT-5 results and performance",
      credits: "Free to use",
      path: "/tools/prompts",
      gradient: "bg-gradient-primary",
    },
  ];

  return (
    <section id="tools" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">AI Tools</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional AI tools powered by ChatGPT-5 for content creation, document analysis, and productivity.
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
            Start with our ChatGPT-5 chat interface, or explore specialized tools for advanced workflows.
          </p>
          <Link to="/chat">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" size="lg">
              Try ChatGPT-5 Chat
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;