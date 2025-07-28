import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  MessageSquare, 
  Tag, 
  Loader2, 
  Lock, 
  Download,
  Sparkles
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const PDFAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 模拟登录状态
  const [credits, setCredits] = useState(5); // 模拟剩余credits

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB限制
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      if (selectedFile.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Please select a PDF file.",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a PDF file first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    // 模拟API调用
    setTimeout(() => {
      setAnalysisResult({
        summary: "This document discusses the implementation of GPT-5 technology in modern AI applications. It covers key features, performance improvements, and practical use cases across various industries.",
        qa: [
          {
            question: "What are the main features of GPT-5?",
            answer: "GPT-5 features enhanced reasoning capabilities, improved context understanding, and more accurate responses compared to previous versions."
          },
          {
            question: "How does GPT-5 improve performance?",
            answer: "GPT-5 achieves better performance through advanced training methods, larger model size, and optimized architecture."
          }
        ],
        keywords: ["GPT-5", "AI", "Machine Learning", "Natural Language Processing", "Technology", "Innovation"]
      });
      setIsAnalyzing(false);
      setCredits(credits - 1);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="h-8 w-8 text-primary animate-glow-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              PDF Analyzer
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            AI-Powered PDF Analysis Tool
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
          {/* Upload Section */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Upload PDF</span>
                {!isLoggedIn && <Lock className="h-4 w-4 text-muted-foreground" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">
                  Drag and drop your PDF here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Maximum file size: 10MB
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={!isLoggedIn}
                  className="hidden"
                  id="pdf-upload"
                />
                <label htmlFor="pdf-upload">
                  <Button variant="outline" disabled={!isLoggedIn} asChild>
                    <span>Choose File</span>
                  </Button>
                </label>
              </div>
              
              {file && (
                <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              )}

              {!isLoggedIn ? (
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    Only available for paid users
                  </p>
                  <Button variant="hero" className="w-full sm:w-auto">
                    <Lock className="h-4 w-4 mr-2" />
                    Subscribe to Unlock
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing || !file}
                  className="w-full sm:w-auto"
                  variant="hero"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing with GPT-5...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Analyze with GPT-5
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {isAnalyzing && (
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
                  <p className="text-muted-foreground">Analyzing your PDF...</p>
                  <Progress value={60} className="w-full max-w-md mx-auto" />
                </div>
              </CardContent>
            </Card>
          )}

          {analysisResult && (
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="summary" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="summary" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Summary
                    </TabsTrigger>
                    <TabsTrigger value="qa" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Q&A
                    </TabsTrigger>
                    <TabsTrigger value="keywords" className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Keywords
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="summary" className="mt-6">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <p className="text-sm leading-relaxed">{analysisResult.summary}</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="qa" className="mt-6">
                    <div className="space-y-4">
                      {analysisResult.qa.map((item: any, index: number) => (
                        <div key={index} className="bg-muted/30 rounded-lg p-4">
                          <h4 className="font-semibold mb-2 text-sm">Q: {item.question}</h4>
                          <p className="text-sm text-muted-foreground">A: {item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="keywords" className="mt-6">
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.keywords.map((keyword: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="text-center p-4">
              <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Smart Summary</h3>
              <p className="text-sm text-muted-foreground">
                Get concise summaries of complex documents
              </p>
            </Card>
            <Card className="text-center p-4">
              <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Q&A Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Ask questions about your PDF content
              </p>
            </Card>
            <Card className="text-center p-4">
              <Tag className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Keyword Extraction</h3>
              <p className="text-sm text-muted-foreground">
                Identify key topics and themes
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFAnalyzer; 