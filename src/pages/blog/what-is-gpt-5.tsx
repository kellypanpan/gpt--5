import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Zap, Brain, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const WhatIsGPT5 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* SEO Meta Content */}
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">AI Technology</Badge>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-6">
              What Is GPT-5 and How Is It Different from GPT-4?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the revolutionary capabilities of GPT-5, OpenAI's latest AI model that promises to transform how we interact with artificial intelligence.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
              <span>Published: July 2025</span>
              <span>•</span>
              <span>Updated: July 2025</span>
              <span>•</span>
              <span>Reading time: 8 min</span>
            </div>
          </div>

          {/* Table of Contents */}
          <Card className="mb-8 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Table of Contents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <a href="#what-is-gpt5" className="block text-primary hover:underline">What is GPT-5?</a>
                <a href="#key-features" className="block text-primary hover:underline">Key Features & Capabilities</a>
                <a href="#gpt5-vs-gpt4" className="block text-primary hover:underline">GPT-5 vs GPT-4: What's New?</a>
                <a href="#use-cases" className="block text-primary hover:underline">Real-World Use Cases</a>
                <a href="#try-gpt5" className="block text-primary hover:underline">Try GPT-5 Tools</a>
              </nav>
            </CardContent>
          </Card>

          {/* Main Content */}
          <article className="prose prose-lg max-w-none">
            <section id="what-is-gpt5" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">What is GPT-5?</h2>
              <p className="text-lg leading-relaxed mb-6">
                GPT-5 (Generative Pre-trained Transformer 5) is OpenAI's most advanced language model to date, representing a significant leap forward in artificial intelligence capabilities. Building upon the success of GPT-4, this new iteration introduces groundbreaking improvements in reasoning, creativity, and multimodal understanding.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Unlike its predecessors, GPT-5 demonstrates enhanced capabilities across multiple domains, from complex problem-solving to creative content generation, making it a versatile tool for both personal and professional applications.
              </p>
            </section>

            <section id="key-features" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Key Features & Capabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      Enhanced Reasoning
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Advanced logical reasoning and problem-solving capabilities that can handle complex multi-step tasks with improved accuracy.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Creative Excellence
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Superior creative writing, storytelling, and content generation with more nuanced and engaging outputs.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Multimodal Mastery
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Seamless integration of text, image, and audio processing for comprehensive AI interactions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Speed & Efficiency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Optimized performance with faster response times and more efficient resource utilization.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="gpt5-vs-gpt4" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">GPT-5 vs GPT-4: What's New?</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border p-4 text-left">Feature</th>
                      <th className="border border-border p-4 text-left">GPT-4</th>
                      <th className="border border-border p-4 text-left">GPT-5</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-4 font-medium">Reasoning Ability</td>
                      <td className="border border-border p-4">Advanced</td>
                      <td className="border border-border p-4 text-primary font-semibold">Superior</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-4 font-medium">Creative Writing</td>
                      <td className="border border-border p-4">Excellent</td>
                      <td className="border border-border p-4 text-primary font-semibold">Exceptional</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-4 font-medium">Code Generation</td>
                      <td className="border border-border p-4">Proficient</td>
                      <td className="border border-border p-4 text-primary font-semibold">Expert</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-4 font-medium">Context Understanding</td>
                      <td className="border border-border p-4">Good</td>
                      <td className="border border-border p-4 text-primary font-semibold">Outstanding</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-4 font-medium">Response Speed</td>
                      <td className="border border-border p-4">Standard</td>
                      <td className="border border-border p-4 text-primary font-semibold">Enhanced</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="use-cases" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Real-World Use Cases</h2>
              <div className="space-y-6">
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">Content Creation</h3>
                  <p className="text-muted-foreground mb-4">
                    GPT-5 excels at creating high-quality blog posts, marketing copy, and social media content with improved engagement and SEO optimization.
                  </p>
                  <Link to="/tools/writer">
                    <Button variant="outline" size="sm">
                      Try GPT-5 Writer
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">Image Generation</h3>
                  <p className="text-muted-foreground mb-4">
                    Create stunning visuals with enhanced DALL-E integration, perfect for marketing materials, social media, and creative projects.
                  </p>
                  <Link to="/tools/image">
                    <Button variant="outline" size="sm">
                      Try GPT-5 Image Generator
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">Document Analysis</h3>
                  <p className="text-muted-foreground mb-4">
                    Advanced PDF analysis capabilities for extracting insights, summarizing content, and answering questions about complex documents.
                  </p>
                  <Link to="/tools/pdf">
                    <Button variant="outline" size="sm">
                      Try GPT-5 PDF Analyzer
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section id="try-gpt5" className="mb-12">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-8 text-center">
                  <h2 className="text-3xl font-bold mb-4">Ready to Experience GPT-5?</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Don't just read about GPT-5 - try it yourself with our powerful AI tools. Start creating amazing content today!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/tools/writer">
                      <Button size="lg" className="w-full sm:w-auto">
                        <Sparkles className="h-5 w-5 mr-2" />
                        Start Writing with GPT-5
                      </Button>
                    </Link>
                    <Link to="/tools">
                      <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        Explore All Tools
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* FAQ Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">When will GPT-5 be released?</h3>
                  <p className="text-muted-foreground">
                    GPT-5 is expected to be released in late 2025. OpenAI has been working on this advanced model with significant improvements over GPT-4.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">How much will GPT-5 cost?</h3>
                  <p className="text-muted-foreground">
                    Pricing details haven't been officially announced yet, but it's expected to be competitive with current AI model pricing while offering superior capabilities.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Will GPT-5 be available through API?</h3>
                  <p className="text-muted-foreground">
                    Yes, GPT-5 will be available through OpenAI's API, allowing developers and businesses to integrate it into their applications and services.
                  </p>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
};

export default WhatIsGPT5; 