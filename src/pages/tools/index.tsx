import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PenTool, 
  FileText, 
  Camera, 
  MessageSquare, 
  Lightbulb,
  Zap
} from 'lucide-react';

const ToolsIndex = () => {
  const tools = [
    {
      title: 'AI Writer',
      description: 'Generate high-quality articles, blogs and creative content with AI',
      icon: <PenTool className="w-8 h-8" />,
      path: '/tools/writer',
      color: 'bg-blue-500'
    },
    {
      title: 'Script Generator',
      description: 'Create professional scripts for videos, podcasts and presentations',
      icon: <FileText className="w-8 h-8" />,
      path: '/tools/script',
      color: 'bg-green-500'
    },
    {
      title: 'Image Generator',
      description: 'Generate creative images and artwork with AI technology',
      icon: <Camera className="w-8 h-8" />,
      path: '/tools/image',
      color: 'bg-purple-500'
    },
    {
      title: 'PDF Analyzer',
      description: 'Analyze PDF documents, extract key information and summaries',
      icon: <FileText className="w-8 h-8" />,
      path: '/tools/pdf',
      color: 'bg-orange-500'
    },
    {
      title: 'Prompt Lab',
      description: 'Create and optimize AI prompts for better results',
      icon: <Lightbulb className="w-8 h-8" />,
      path: '/tools/prompts',
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI Tools Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our powerful AI tools to enhance your creativity and productivity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className={`w-16 h-16 ${tool.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                  {tool.icon}
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 h-12">
                  {tool.description}
                </p>
                <Link to={tool.path}>
                  <Button className="w-full">
                    <Zap className="w-4 h-4 mr-2" />
                    Try Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            All tools powered by cutting-edge AI technology for the best experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolsIndex;