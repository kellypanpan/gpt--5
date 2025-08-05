import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Copy, Download, Lock, Sparkles } from "lucide-react";
import { useWriter } from "@/hooks/useAPI";
import { AuthStatus } from "@/components/AuthButton";
import { useAuthState } from "@/lib/clerk";
import { Header } from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";
import { CreditsDisplay } from "@/components/CreditsDisplay";

const Writer = () => {
  // SEO structured data for GPT-5 writing tool
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "GPT-5 Writing Tool",
    "description": "How to use GPT-5 for writing: Professional content creation with advanced AI capabilities",
    "keywords": "gpt-5 writing tool, how to use gpt-5 for writing, gpt-5 content creation",
    "applicationCategory": "AI Writing Assistant"
  };

  // Add structured data to head
  if (typeof document !== 'undefined') {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [type, setType] = useState("blog");

  const { isSignedIn } = useAuthState();
  const { data, loading, error, generateContent } = useWriter();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      return;
    }

    try {
      await generateContent({
        prompt,
        tone,
        length,
        type
      });
    } catch (error) {
      // 错误已在hook中处理
    }
  };

  const handleCopy = () => {
    if (data?.content) {
      navigator.clipboard.writeText(data.content);
    }
  };

  const handleExport = () => {
    if (data?.content) {
      const blob = new Blob([data.content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "gpt5-writer-content.txt";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <SEOHead 
        title="GPT-5 Writing Tool - Advanced AI Content Creation"
        description="How to use GPT-5 for writing: Create professional blog posts, articles, and marketing copy with our advanced GPT-5 writing tool. Best GPT-5 tools for content creators."
        keywords="gpt-5 writing tool, how to use gpt-5 for writing, gpt-5 content creation, best gpt-5 tools for content creators, gpt-5 ai writing"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "GPT-5 Writing Tool",
          "description": "How to use GPT-5 for writing: Professional content creation with advanced AI capabilities",
          "keywords": "gpt-5 writing tool, how to use gpt-5 for writing, gpt-5 content creation",
          "applicationCategory": "AI Writing Assistant"
        }}
      />
      <Header />
      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-glow-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              GPT-5 Writing Tool
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            How to use GPT-5 for writing: Professional AI content creation
          </p>
        </div>

        {/* Auth Status */}
        <div className="max-w-4xl mx-auto mb-6">
          <AuthStatus />
        </div>

        {/* Credits Display */}
        <div className="max-w-4xl mx-auto mb-6">
          <CreditsDisplay />
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Input Section */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Writing Prompt</span>
                {!isSignedIn && <Lock className="h-4 w-4 text-muted-foreground" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Content Type</label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog Post</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="copy">Marketing Copy</SelectItem>
                    <SelectItem value="social">Social Media Post</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tone</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Length</label>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short (300-500 words)</SelectItem>
                    <SelectItem value="medium">Medium (800-1200 words)</SelectItem>
                    <SelectItem value="long">Long (1500-2000 words)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Writing Prompt</label>
                <Textarea
                  placeholder="Write a blog post about GPT-5 advantages..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] resize-none"
                  disabled={false}
                />
              </div>
              
              <div className="text-center">
                {!isSignedIn && (
                  <p className="text-sm text-muted-foreground mb-4">
                    Free trial mode - Sign in to unlock more features
                  </p>
                )}
                <Button 
                  onClick={handleGenerate} 
                  disabled={loading || !prompt.trim()}
                  className="w-full sm:w-auto"
                  variant="hero"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating with GPT-5...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate with GPT-5
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          {data?.content && (
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Generated Content</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Credits used:</span>
                      <Badge variant="outline">{data.creditsUsed}</Badge>
                    </div>
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
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-4 min-h-[200px] whitespace-pre-wrap">
                  {data.content}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Display */}
          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="text-center p-4">
              <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Advanced AI</h3>
              <p className="text-sm text-muted-foreground">
                Powered by the latest GPT-5 technology
              </p>
            </Card>
            <Card className="text-center p-4">
              <Copy className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Easy Export</h3>
              <p className="text-sm text-muted-foreground">
                Copy or download your content instantly
              </p>
            </Card>
            <Card className="text-center p-4">
              <Badge variant="outline" className="mx-auto mb-2">Fast</Badge>
              <h3 className="font-semibold mb-2">Quick Generation</h3>
              <p className="text-sm text-muted-foreground">
                Get high-quality content in seconds
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Writer; 