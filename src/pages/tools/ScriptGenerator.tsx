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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 模拟登录状态

  const scriptStyles = [
    { value: "romance", label: "爱情", icon: "💕" },
    { value: "comedy", label: "搞笑", icon: "😂" },
    { value: "thriller", label: "悬疑", icon: "😱" },
    { value: "drama", label: "剧情", icon: "🎭" },
    { value: "action", label: "动作", icon: "💥" }
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
    // 模拟API调用
    setTimeout(() => {
      const selectedStyle = scriptStyles.find(s => s.value === style);
      setGeneratedScript(`🎬 ${selectedStyle?.label}短剧剧本: "${scene}"

📱 场景1: 校园走廊
📹 镜头: 中景，跟随镜头
🎭 角色: 女主角小美，男主角小明
💬 台词:
小美: (低头走路，撞到小明) 啊！对不起...
小明: (扶住小美) 没关系，你没事吧？
小美: (脸红) 我...我没事，谢谢。
小明: 我叫小明，你呢？
小美: 我叫小美...

📱 场景2: 图书馆
📹 镜头: 特写，过肩镜头
🎭 角色: 小美，小明
💬 台词:
小明: (轻声) 小美，这道题你会做吗？
小美: (小声) 嗯，我教你...
小明: (靠近) 谢谢，你真好。
小美: (心跳加速) 不...不客气...

📱 场景3: 校园樱花树下
📹 镜头: 远景，逆光
🎭 角色: 小美，小明
💬 台词:
小明: 小美，我喜欢你。
小美: (惊讶) 真的吗？
小明: 真的，从第一次见面就喜欢你了。
小美: (感动) 我也是...
小明: 那我们在一起吧？
小美: (点头) 嗯！

🎵 背景音乐: 温馨浪漫的钢琴曲
🎨 滤镜: 温暖色调，柔光效果
⏱️ 时长: 约60秒

💡 拍摄建议:
- 注意光线充足
- 表情要自然真实
- 可以加入慢动作效果
- 结尾可以加爱心特效`);
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
                  placeholder="校园恋爱短剧..."
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
                    <SelectValue placeholder="选择剧本类型" />
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
                    需订阅才能使用
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