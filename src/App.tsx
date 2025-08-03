import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { config } from "@/lib/config";
import { ClerkProviderWrapper } from "@/lib/clerk";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Writer from "./pages/tools/Writer";
import PDFAnalyzer from "./pages/tools/PDFAnalyzer";
import ScriptGenerator from "./pages/tools/ScriptGenerator";
import ImageGenerator from "./pages/tools/ImageGenerator";
import PromptLab from "./pages/tools/PromptLab";
import TestPage from "./pages/tools/TestPage";
import ToolsIndex from "./pages/tools/index";

// Blog pages
import BlogIndex from "./pages/blog/index";
import WhatIsGPT5 from "./pages/blog/what-is-gpt-5";
import GPT5VsClaude3 from "./pages/blog/gpt-5-vs-claude-3";
import GPT5VsGemini from "./pages/blog/gpt-5-vs-gemini";
import GPT5ReleaseTracker from "./pages/blog/gpt-5-release-tracker";
import GPT5ForBusiness from "./pages/blog/gpt-5-for-business";

// Use cases pages
import UseCases from "./pages/use-cases/index";

const queryClient = new QueryClient();

// 验证环境变量
config.validate();

const App = () => (
  <ClerkProviderWrapper>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header />
            <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Tools Routes */}
            <Route path="/tools" element={<ToolsIndex />} />
            <Route path="/tools/test" element={<TestPage />} />
            <Route path="/tools/writer" element={<Writer />} />
            <Route path="/tools/pdf" element={<PDFAnalyzer />} />
            <Route path="/tools/script" element={<ScriptGenerator />} />
            <Route path="/tools/image" element={<ImageGenerator />} />
            <Route path="/tools/prompts" element={<PromptLab />} />
            
            {/* Blog Routes */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/what-is-gpt-5" element={<WhatIsGPT5 />} />
            <Route path="/blog/gpt-5-vs-claude-3" element={<GPT5VsClaude3 />} />
            <Route path="/blog/gpt-5-vs-gemini" element={<GPT5VsGemini />} />
            <Route path="/blog/gpt-5-release-tracker" element={<GPT5ReleaseTracker />} />
            <Route path="/blog/gpt-5-for-business" element={<GPT5ForBusiness />} />
            
            {/* Use Cases Routes */}
            <Route path="/use-cases" element={<UseCases />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ClerkProviderWrapper>
);

export default App;
