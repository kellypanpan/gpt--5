import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Image, 
  Loader2, 
  Download, 
  Lock, 
  Sparkles,
  Zap,
  Palette,
  Settings
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("1024x1024");
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 模拟登录状态
  const [credits, setCredits] = useState(10); // 模拟剩余credits

  const imageSizes = [
    { value: "512x512", label: "512x512", description: "Square" },
    { value: "768x512", label: "768x512", description: "Landscape" },
    { value: "1024x1024", label: "1024x1024", description: "High Quality" }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt for image generation.",
        variant: "destructive",
      });
      return;
    }

    if (credits < 5) {
      toast({
        title: "Insufficient Credits",
        description: "You need 5 credits to generate an image.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // 模拟API调用
    setTimeout(() => {
      // 模拟生成的图片URL
      const mockImages = [
        "https://via.placeholder.com/1024x1024/6366f1/ffffff?text=AI+Generated+Image+1",
        "https://via.placeholder.com/1024x1024/8b5cf6/ffffff?text=AI+Generated+Image+2"
      ];
      setGeneratedImages(mockImages);
      setIsLoading(false);
      setCredits(credits - 5);
      toast({
        title: "Success!",
        description: "Images generated successfully.",
      });
    }, 3000);
  };

  const handleDownload = (imageUrl: string, index: number) => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `gpt5-image-${index + 1}.png`;
    a.click();
    toast({
      title: "Downloaded!",
      description: "Image saved to your device.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image className="h-8 w-8 text-primary animate-glow-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Image Generator
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            AI-Powered Text-to-Image Generation
          </p>
        </div>

        {/* Credits Status */}
        <div className="max-w-4xl mx-auto mb-6">
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Credits Remaining:</span>
                  <Badge variant="outline">{credits}</Badge>
                  <span className="text-xs text-muted-foreground ml-2">
                    1 image = 5 credits
                  </span>
                </div>
                {!isLoggedIn && (
                  <Button variant="hero" size="sm">
                    <Lock className="h-4 w-4 mr-2" />
                    Upgrade to Unlock
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Input Section */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Image Generation</span>
                {!isLoggedIn && <Lock className="h-4 w-4 text-muted-foreground" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Prompt</label>
                <Textarea
                  placeholder="A cyberpunk cat in Tokyo, 4K, detailed, vibrant colors..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] resize-none"
                  disabled={!isLoggedIn}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Image Size</label>
                <Select value={size} onValueChange={setSize} disabled={!isLoggedIn}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select image size" />
                  </SelectTrigger>
                  <SelectContent>
                    {imageSizes.map((sizeOption) => (
                      <SelectItem key={sizeOption.value} value={sizeOption.value}>
                        <span className="flex items-center justify-between w-full">
                          <span>{sizeOption.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {sizeOption.description}
                          </span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {!isLoggedIn ? (
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    未登录或未订阅状态下按钮禁用
                  </p>
                  <Button variant="hero" className="w-full sm:w-auto">
                    <Lock className="h-4 w-4 mr-2" />
                    升级 CTA
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleGenerate} 
                  disabled={isLoading || !prompt.trim() || credits < 5}
                  className="w-full sm:w-auto"
                  variant="hero"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Image...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Generated Images */}
          {isLoading && (
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
                  <p className="text-muted-foreground">Generating your images...</p>
                  <div className="flex justify-center gap-4">
                    <div className="w-32 h-32 bg-muted/30 rounded-lg animate-pulse"></div>
                    <div className="w-32 h-32 bg-muted/30 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {generatedImages.length > 0 && (
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle>Generated Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedImages.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imageUrl}
                        alt={`Generated image ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleDownload(imageUrl, index)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="text-center p-4">
              <Image className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-2">High Quality</h3>
              <p className="text-sm text-muted-foreground">
                Generate stunning images with AI
              </p>
            </Card>
            <Card className="text-center p-4">
              <Palette className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Multiple Sizes</h3>
              <p className="text-sm text-muted-foreground">
                Choose from different aspect ratios
              </p>
            </Card>
            <Card className="text-center p-4">
              <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Fast Generation</h3>
              <p className="text-sm text-muted-foreground">
                Get your images in seconds
              </p>
            </Card>
          </div>

          {/* Tips */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Generation Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Good Prompts:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• "A cyberpunk cat in Tokyo, 4K, detailed"</li>
                    <li>• "Sunset over mountains, oil painting style"</li>
                    <li>• "Futuristic cityscape, neon lights, night"</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Tips:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Be specific with details</li>
                    <li>• Include style keywords</li>
                    <li>• Mention lighting and mood</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator; 