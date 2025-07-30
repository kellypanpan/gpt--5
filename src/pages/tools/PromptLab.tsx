import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Heart, 
  Lock, 
  Sparkles,
  Plus,
  Filter,
  BookOpen,
  Code,
  Image,
  Megaphone,
  Star
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Header } from "@/components/Header";

const PromptLab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state

  const categories = [
    { value: "writing", label: "Writing", icon: BookOpen },
    { value: "programming", label: "Programming", icon: Code },
    { value: "image", label: "Image", icon: Image },
    { value: "marketing", label: "Marketing", icon: Megaphone }
  ];

  const mockPrompts = [
    {
      id: 1,
      title: "Professional Blog Writing Assistant",
      content: "Write a comprehensive blog post about [topic] that includes an engaging introduction, detailed analysis, and actionable takeaways...",
      category: "writing",
      likes: 1247,
      isLiked: false,
      isLocked: false
    },
    {
      id: 2,
      title: "Python Code Optimization Expert",
      content: "Analyze and optimize this Python code for better performance and readability. Focus on best practices and efficiency...",
      category: "programming",
      likes: 892,
      isLiked: true,
      isLocked: false
    },
    {
      id: 3,
      title: "Social Media Marketing Copy",
      content: "Create engaging social media posts for [platform] that will increase engagement and drive conversions...",
      category: "marketing",
      likes: 1563,
      isLiked: false,
      isLocked: true
    },
    {
      id: 4,
      title: "AI Art Style Transfer",
      content: "Transform this image into [art style] while maintaining the original composition and key elements...",
      category: "image",
      likes: 734,
      isLiked: false,
      isLocked: true
    },
    {
      id: 5,
      title: "Technical Documentation Writing",
      content: "Write clear and comprehensive technical documentation for [software/tool] that is easy to understand...",
      category: "writing",
      likes: 445,
      isLiked: false,
      isLocked: false
    },
    {
      id: 6,
      title: "JavaScript Debugging Assistant",
      content: "Help me debug this JavaScript code. Identify potential issues and provide solutions with explanations...",
      category: "programming",
      likes: 678,
      isLiked: false,
      isLocked: false
    }
  ];

  const filteredPrompts = mockPrompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUsePrompt = (prompt: any) => {
    if (prompt.isLocked && !isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in and subscribe to use this prompt.",
        variant: "destructive",
      });
      return;
    }
    
    // 跳转到对应工具页面
    toast({
      title: "Redirecting...",
      description: `Taking you to ${prompt.category} tool with this prompt.`,
    });
  };

  const handleLike = (promptId: number) => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to like prompts.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Liked!",
      description: "Prompt added to your favorites.",
    });
  };

  const handleUpload = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to upload prompts.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Upload Feature",
      description: "Prompt upload feature coming soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      <div className="pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-glow-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Prompt Lab
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Discover and Share AI Prompts
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Search and Filter */}
          <Card className="border-border/50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search prompts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <SelectItem key={category.value} value={category.value}>
                            <span className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              <span>{category.label}</span>
                            </span>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleUpload} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prompts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((prompt) => {
              const category = categories.find(c => c.value === prompt.category);
              const CategoryIcon = category?.icon || BookOpen;
              
              return (
                <Card key={prompt.id} className="border-border/50 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="h-4 w-4 text-primary" />
                        <Badge variant="outline" className="text-xs">
                          {category?.label}
                        </Badge>
                      </div>
                      {prompt.isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <CardTitle className="text-lg">{prompt.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {prompt.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLike(prompt.id)}
                          className={`flex items-center gap-1 text-sm transition-colors ${
                            prompt.isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${prompt.isLiked ? 'fill-current' : ''}`} />
                          <span>{prompt.likes}</span>
                        </button>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-4 w-4" />
                          <span>4.8</span>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => handleUsePrompt(prompt)}
                        size="sm"
                        variant={prompt.isLocked ? "outline" : "default"}
                        disabled={prompt.isLocked && !isLoggedIn}
                      >
                        {prompt.isLocked ? (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            Unlock
                          </>
                        ) : (
                          "Use Prompt"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredPrompts.length === 0 && (
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No prompts found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="text-center p-4">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Browse All</h3>
              <p className="text-sm text-muted-foreground">
                Free browsing of all prompts
              </p>
            </Card>
            <Card className="text-center p-4">
              <Lock className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Premium Access</h3>
              <p className="text-sm text-muted-foreground">
                Login and subscribe to use prompts
              </p>
            </Card>
            <Card className="text-center p-4">
              <Plus className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Share Your Own</h3>
              <p className="text-sm text-muted-foreground">
                Upload and share your prompts
              </p>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PromptLab; 