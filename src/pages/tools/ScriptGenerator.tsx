import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  Loader2, 
  Copy, 
  Download, 
  Lock, 
  Sparkles,
  Heart,
  Zap,
  Eye
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ScriptGenerator = () => {
  const [scene, setScene] = useState("");
  const [style, setStyle] = useState("");
  const [generatedScript, setGeneratedScript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state

  const scriptStyles = [
    { value: "romance", label: "Romance", icon: "💕" },
    { value: "comedy", label: "Comedy", icon: "😂" },
    { value: "thriller", label: "Thriller", icon: "😱" },
    { value: "drama", label: "Drama", icon: "🎭" },
    { value: "action", label: "Action", icon: "💥" }
  ];

  const handleGenerate = async () => {
    if (!scene.trim()) {
      toast({
        title: "Error",
        description: "Please enter a script scene.",
        variant: "destructive",
      });
      return;
    }

    if (!style) {
      toast({
        title: "Error",
        description: "Please select a script style.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const selectedStyle = scriptStyles.find(s => s.value === style);
      setGeneratedScript(`🎬 ${selectedStyle?.label} Short Script: "${scene}"

📱 Scene 1: School Hallway
📹 Camera: Medium shot, following shot
🎭 Characters: Female lead Amy, Male lead Mike
💬 Dialogue:
Amy: (Walking with head down, bumps into Mike) Oh! I'm sorry...
Mike: (Catches Amy) It's okay, are you alright?
Amy: (Blushing) I...I'm fine, thank you.
Mike: I'm Mike, what's your name?
Amy: I'm Amy...

📱 Scene 2: Library
📹 Camera: Close-up, over-the-shoulder shot
🎭 Characters: Amy, Mike
💬 Dialogue:
Mike: (Whispering) Amy, do you know how to solve this problem?
Amy: (Softly) Yes, let me teach you...
Mike: (Moving closer) Thank you, you're so kind.
Amy: (Heart racing) You're...you're welcome...

📱 Scene 3: Under the Cherry Blossom Tree
📹 Camera: Wide shot, backlit
🎭 Characters: Amy, Mike
💬 Dialogue:
Mike: Amy, I like you.
Amy: (Surprised) Really?
Mike: Really, I've liked you since we first met.
Amy: (Touched) Me too...
Mike: So shall we be together?
Amy: (Nodding) Yes!

🎵 Background Music: Warm romantic piano music
🎨 Filter: Warm tones, soft light effect
⏱️ Duration: About 60 seconds

💡 Shooting Tips:
- Ensure sufficient lighting
- Keep expressions natural and authentic
- Add slow motion effects
- Add heart effects at the ending`);
      setIsLoading(false);
    }, 2500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedScript);
    toast({
      title: "Copied!",
      description: "Script copied to clipboard.",
    });
  };

  const handleExport = () => {
    const blob = new Blob([generatedScript], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tiktok-script.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Exported!",
      description: "Script downloaded as text file.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Video className="h-8 w-8 text-primary animate-glow-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Script Generator
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            TikTok/YouTube Video Script Creator
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Input Section */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Script Details</span>
                {!isLoggedIn && <Lock className="h-4 w-4 text-muted-foreground" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Script Scene</label>
                <Textarea
                  placeholder="School romance short drama..."
                  value={scene}
                  onChange={(e) => setScene(e.target.value)}
                  className="min-h-[100px] resize-none"
                  disabled={!isLoggedIn}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Script Style</label>
                <Select value={style} onValueChange={setStyle} disabled={!isLoggedIn}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select script type" />
                  </SelectTrigger>
                  <SelectContent>
                    {scriptStyles.map((styleOption) => (
                      <SelectItem key={styleOption.value} value={styleOption.value}>
                        <span className="flex items-center gap-2">
                          <span>{styleOption.icon}</span>
                          <span>{styleOption.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {!isLoggedIn ? (
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    Subscription required
                  </p>
                  <Button variant="hero" className="w-full sm:w-auto">
                    <Lock className="h-4 w-4 mr-2" />
                    Subscribe to Unlock
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleGenerate} 
                  disabled={isLoading || !scene.trim() || !style}
                  className="w-full sm:w-auto"
                  variant="hero"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Script...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Script
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Output Section */}
          {generatedScript && (
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Generated Script</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExport}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-4 min-h-[300px] whitespace-pre-wrap font-mono text-sm">
                  {generatedScript}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="text-center p-4">
              <Video className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Video Scripts</h3>
              <p className="text-sm text-muted-foreground">
                Generate scripts for TikTok and YouTube
              </p>
            </Card>
            <Card className="text-center p-4">
              <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Multiple Styles</h3>
              <p className="text-sm text-muted-foreground">
                Choose from romance, comedy, thriller and more
              </p>
            </Card>
            <Card className="text-center p-4">
              <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Quick Export</h3>
              <p className="text-sm text-muted-foreground">
                Copy or download your scripts instantly
              </p>
            </Card>
          </div>

          {/* Platform Icons */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-4">Compatible with:</p>
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">T</span>
                </div>
                <span className="text-sm font-medium">TikTok</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">YT</span>
                </div>
                <span className="text-sm font-medium">YouTube</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">IG</span>
                </div>
                <span className="text-sm font-medium">Instagram</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptGenerator; 