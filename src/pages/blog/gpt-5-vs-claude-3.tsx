import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Trophy, Target, CheckCircle, XCircle, User, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";

const GPT5VsClaude3 = () => {
  const articleMetadata = {
    title: "GPT-5 vs Claude 3 Opus: Which AI is Better in 2025? | Complete Comparison",
    description: "Comprehensive comparison of GPT-5 and Claude 3 Opus performance, features, and pricing. Find out which AI model is best for your specific needs in 2025.",
    author: "GPT-5 Tools Team",
    datePublished: "2025-01-15",
    dateModified: "2025-01-15",
    coverImage: "/images/gpt5-vs-claude3-cover.jpg",
    excerpt: "Comprehensive comparison of OpenAI's GPT-5 and Anthropic's Claude 3 Opus. Find out which AI model is best for your specific needs.",
    readTime: "10 min read"
  };
  return (
    <>
      <SEOHead 
        title={articleMetadata.title}
        description={articleMetadata.description}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "GPT-5 vs Claude 3 Opus: Which AI is Better in 2025?",
            datePublished: articleMetadata.datePublished,
            dateModified: articleMetadata.dateModified,
            author: { "@type": "Person", name: articleMetadata.author },
            publisher: {
              "@type": "Organization",
              name: "GPT-5 Tools",
              logo: {
                "@type": "ImageObject",
                url: "https://gpt-5ai.com/g5-logo.png",
              },
            },
            image: articleMetadata.coverImage,
            description: articleMetadata.description,
          }),
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">AI Comparison</Badge>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-6">
              GPT-5 vs Claude 3 Opus: Which AI is Better in 2025?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive comparison of OpenAI's GPT-5 and Anthropic's Claude 3 Opus. Find out which AI model is best for your specific needs.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>Written by {articleMetadata.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Updated {new Date(articleMetadata.dateModified).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <span>•</span>
              <span>{articleMetadata.readTime}</span>
            </div>
          </div>

          {/* Quick Summary */}
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">GPT-5</h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Best for: Creative Writing</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Superior creative capabilities and multimodal features
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Claude 3 Opus</h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Best for: Analysis & Research</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Excellent reasoning and analytical capabilities
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <article className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Executive Summary</h2>
              <p className="text-lg leading-relaxed mb-6">
                Both GPT-5 and Claude 3 Opus represent the cutting edge of AI technology, but they excel in different areas. GPT-5 shines in creative tasks and multimodal interactions, while Claude 3 Opus demonstrates superior reasoning and analytical capabilities.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                The choice between these two models depends largely on your specific use case and requirements. Let's dive deep into the comparison to help you make an informed decision.
              </p>
            </section>

            {/* Feature Comparison Table */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Feature-by-Feature Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border p-4 text-left">Feature</th>
                      <th className="border border-border p-4 text-center">GPT-5</th>
                      <th className="border border-border p-4 text-center">Claude 3 Opus</th>
                      <th className="border border-border p-4 text-center">Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-4 font-medium">Creative Writing</td>
                      <td className="border border-border p-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        <span className="text-sm">Exceptional</span>
                      </td>
                      <td className="border border-border p-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        <span className="text-sm">Excellent</span>
                      </td>
                      <td className="border border-border p-4 text-center">
                        <span className="text-primary font-semibold">GPT-5</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border p-4 font-medium">Code Generation</td>
                      <td className="border border-border p-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        <span className="text-sm">Expert</span>
                      </td>
                      <td className="border border-border p-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        <span className="text-sm">Expert</span>
                      </td>
                      <td className="border border-border p-4 text-center">
                        <span className="text-muted-foreground">Tie</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border p-4 font-medium">Reasoning & Analysis</td>
                      <td className="border border-border p-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        <span className="text-sm">Advanced</span>
                      </td>
                      <td className="border border-border p-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        <span className="text-sm">Superior</span>
                      </td>
                      <td className="border border-border p-4 text-center">
                        <span className="text-primary font-semibold">Claude 3</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border p-4 font-medium">Multimodal Capabilities</td>
                      <td className="border border-border p-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        <span className="text-sm">Comprehensive</span>
                      </td>
                      <td className="border border-border p-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        <span className="text-sm">Good</span>
                      </td>
                      <td className="border border-border p-4 text-center">
                        <span className="text-primary font-semibold">GPT-5</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border p-4 font-medium">Context Window</td>
                      <td className="border border-border p-4 text-center">
                        <span className="text-sm font-semibold text-primary">256K tokens</span>
                      </td>
                      <td className="border border-border p-4 text-center">
                        <span className="text-sm">200K tokens</span>
                      </td>
                      <td className="border border-border p-4 text-center">
                        <span className="text-primary font-semibold">GPT-5</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border p-4 font-medium">Response Speed</td>
                      <td className="border border-border p-4 text-center">
                        <span className="text-sm">Fast</span>
                      </td>
                      <td className="border border-border p-4 text-center">
                        <span className="text-sm">Moderate</span>
                      </td>
                      <td className="border border-border p-4 text-center">
                        <span className="text-primary font-semibold">GPT-5</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border p-4 font-medium">Safety & Alignment</td>
                      <td className="border border-border p-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        <span className="text-sm">Good</span>
                      </td>
                      <td className="border border-border p-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        <span className="text-sm">Excellent</span>
                      </td>
                      <td className="border border-border p-4 text-center">
                        <span className="text-primary font-semibold">Claude 3</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Use Case Recommendations */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Which AI Should You Choose?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Choose GPT-5 if you need:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>Creative writing and content generation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>Multimodal tasks (text + image + audio)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>Fast response times</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>Marketing and social media content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>Code generation and debugging</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-500" />
                      Choose Claude 3 Opus if you need:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>Complex reasoning and analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>Research and academic writing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>High safety and ethical considerations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>Legal or medical document analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>Detailed explanations and tutorials</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Pricing Comparison */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Pricing Comparison</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>GPT-5 Pricing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Input (per 1M tokens)</span>
                        <span className="font-medium">$5.00*</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Output (per 1M tokens)</span>
                        <span className="font-medium">$15.00*</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Image Generation</span>
                        <span className="font-medium">$0.040*</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        *Expected pricing - not yet officially announced
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Claude 3 Opus Pricing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Input (per 1M tokens)</span>
                        <span className="font-medium">$15.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Output (per 1M tokens)</span>
                        <span className="font-medium">$75.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Image Analysis</span>
                        <span className="font-medium">Included</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CTA Section */}
            <section className="mb-12">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-8 text-center">
                  <h2 className="text-3xl font-bold mb-4">Ready to Try GPT-5?</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Experience the power of GPT-5 firsthand with our comprehensive suite of AI tools. Start creating amazing content today!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/tools/writer">
                      <Button size="lg" className="w-full sm:w-auto">
                        <Sparkles className="h-5 w-5 mr-2" />
                        Try GPT-5 Writer
                      </Button>
                    </Link>
                    <Link to="/tools">
                      <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        Explore All GPT-5 Tools
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
                  <h3 className="text-lg font-semibold mb-2">Is GPT-5 better than Claude 3 Opus?</h3>
                  <p className="text-muted-foreground">
                    It depends on your specific needs. GPT-5 excels in creative tasks and multimodal capabilities, while Claude 3 Opus is superior in reasoning and analysis. Both are excellent models with different strengths.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Which is more cost-effective?</h3>
                  <p className="text-muted-foreground">
                    GPT-5 generally offers better value for creative tasks and multimodal features. Claude 3 Opus may be more cost-effective for heavy analytical work due to its superior reasoning capabilities.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Can I use both models?</h3>
                  <p className="text-muted-foreground">
                    Absolutely! Many users leverage both models for different tasks. Use GPT-5 for creative content and multimodal tasks, and Claude 3 Opus for analysis and research.
                  </p>
                </div>
              </div>
            </section>

            {/* Related Articles */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">You might also like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Badge variant="outline" className="text-xs w-fit mb-2">Core Introduction</Badge>
                    <CardTitle className="text-lg">
                      <Link to="/blog/what-is-gpt-5" className="hover:text-primary transition-colors">
                        What Is GPT-5? Complete Guide
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      Learn about GPT-5's capabilities, features, and how it differs from previous models.
                    </p>
                    <Link to="/blog/what-is-gpt-5">
                      <Button variant="outline" size="sm">
                        Read More
                        <ArrowRight className="h-3 w-3 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Badge variant="outline" className="text-xs w-fit mb-2">Comparison</Badge>
                    <CardTitle className="text-lg">
                      <Link to="/blog/gpt-5-vs-gemini" className="hover:text-primary transition-colors">
                        GPT-5 vs Gemini 1.5 Comparison
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      Compare OpenAI's GPT-5 with Google's Gemini 1.5 AI model.
                    </p>
                    <Link to="/blog/gpt-5-vs-gemini">
                      <Button variant="outline" size="sm">
                        Read More
                        <ArrowRight className="h-3 w-3 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Badge variant="outline" className="text-xs w-fit mb-2">Business Guide</Badge>
                    <CardTitle className="text-lg">
                      <Link to="/blog/gpt-5-for-business" className="hover:text-primary transition-colors">
                        GPT-5 for Business Applications
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      Discover how to leverage GPT-5 for business transformation and growth.
                    </p>
                    <Link to="/blog/gpt-5-for-business">
                      <Button variant="outline" size="sm">
                        Read More
                        <ArrowRight className="h-3 w-3 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
};

export default GPT5VsClaude3; 