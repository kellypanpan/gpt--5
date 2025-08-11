import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { CookieConsent } from "@/components/CookieConsent";
import { config } from "@/lib/config";
import { I18nProvider } from "@/components/I18nProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Writer from "@/pages/tools/Writer";
import PDFAnalyzer from "@/pages/tools/PDFAnalyzer";
import ScriptGenerator from "@/pages/tools/ScriptGenerator";
import ImageGenerator from "@/pages/tools/ImageGenerator";
import PromptLab from "@/pages/tools/PromptLab";
import Pricing from "@/pages/Pricing";
import Dashboard from "@/pages/Dashboard";
import TestSubscription from "@/pages/TestSubscription";
import TestPage from "./pages/tools/TestPage";
import ToolsIndex from "./pages/tools/index";
import Chat from "./pages/Chat";

// Blog pages
import BlogIndex from "./pages/blog/index";
import WhatIsGPT5 from "./pages/blog/what-is-gpt-5";
import GPT5VsClaude3 from "./pages/blog/gpt-5-vs-claude-3";
import GPT5VsGemini from "./pages/blog/gpt-5-vs-gemini";
import GPT5ReleaseTracker from "./pages/blog/gpt-5-release-tracker";
import GPT5ForBusiness from "./pages/blog/gpt-5-for-business";
import GPT5TechnicalDeepDive from "./pages/blog/gpt-5-technical-deep-dive";
import PromptEngineeringGuide from "./pages/blog/prompt-engineering-guide";
import OpenSourceAIModelsComparison from "./pages/blog/open-source-ai-models-comparison";
import GPT5IndustryGuides from "./pages/blog/gpt-5-industry-guides";
import GPT5AIEthicsSafety from "./pages/blog/gpt-5-ai-ethics-safety";
import ChatGPT5Prompts from "./pages/blog/50-best-chatgpt5-prompts";
import ReduceChatGPT5Costs from "./pages/blog/reduce-chatgpt5-api-costs";
import Sitemap from "./pages/Sitemap";
import CanGPT5GenerateVideos from "./pages/blog/can-gpt-5-generate-videos";
import AuthCallback from "./pages/AuthCallback";
import ErrorPage from "./pages/ErrorPage";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import GPT5UseCases from "./pages/blog/gpt-5-use-cases";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Use cases pages
import UseCases from "./pages/use-cases/index";

const queryClient = new QueryClient();

// 验证环境变量
config.validate();

const App = () => (
  <I18nProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Header />
              <Routes>
            {/* Home - Marketing page */}
            <Route path="/" element={<Index />} />
            
            {/* Chat interface */}
            <Route path="/chat" element={<Chat />} />
            
            {/* Tools */}
            <Route path="/tools" element={<ToolsIndex />} />
            <Route path="/tools/writer" element={<Writer />} />
            <Route path="/tools/script" element={<ScriptGenerator />} />
            <Route path="/tools/image" element={<ImageGenerator />} />
            <Route path="/tools/pdf" element={<PDFAnalyzer />} />
            <Route path="/tools/prompts" element={<PromptLab />} />
            
            {/* Keep pricing and other essential pages */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            
            {/* Blog Routes - keep for SEO */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/what-is-gpt-5" element={<WhatIsGPT5 />} />
            <Route path="/blog/gpt-5-vs-claude-3" element={<GPT5VsClaude3 />} />
            <Route path="/blog/gpt-5-vs-gemini" element={<GPT5VsGemini />} />
            <Route path="/blog/gpt-5-release-tracker" element={<GPT5ReleaseTracker />} />
            <Route path="/blog/gpt-5-for-business" element={<GPT5ForBusiness />} />
            <Route path="/blog/gpt-5-technical-deep-dive" element={<GPT5TechnicalDeepDive />} />
            <Route path="/blog/prompt-engineering-guide" element={<PromptEngineeringGuide />} />
            <Route path="/blog/open-source-ai-models-comparison" element={<OpenSourceAIModelsComparison />} />
            <Route path="/blog/gpt-5-industry-guides" element={<GPT5IndustryGuides />} />
            <Route path="/blog/gpt-5-ai-ethics-safety" element={<GPT5AIEthicsSafety />} />
            <Route path="/blog/50-best-chatgpt5-prompts" element={<ChatGPT5Prompts />} />
            <Route path="/blog/reduce-chatgpt5-api-costs" element={<ReduceChatGPT5Costs />} />
            <Route path="/blog/can-gpt-5-generate-videos" element={<CanGPT5GenerateVideos />} />
            <Route path="/blog/gpt-5-use-cases" element={<GPT5UseCases />} />
            
            {/* Sitemap Route */}
            <Route path="/sitemap" element={<Sitemap />} />
            
            {/* Use Cases Routes */}
            <Route path="/use-cases" element={<UseCases />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Cookie Consent Banner */}
          <CookieConsent />
        </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </AuthProvider>
  </I18nProvider>
);

export default App;
