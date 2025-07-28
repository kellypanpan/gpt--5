import React from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Brain, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';

const GPT5VsGemini = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            GPT-5 vs Gemini 1.5: Battle of the AI Titans
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive comparison of OpenAI's GPT-5 and Google's Gemini 1.5 - two of the most advanced AI models available today.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="outline" className="text-sm">
              <Clock className="h-3 w-3 mr-1" />
              Updated: January 2025
            </Badge>
            <Badge variant="outline" className="text-sm">
              <Brain className="h-3 w-3 mr-1" />
              AI Comparison
            </Badge>
          </div>
        </div>

        {/* Quick Summary */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Quick Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">GPT-5 (OpenAI)</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Superior text generation and reasoning
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Better code generation capabilities
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    More consistent output quality
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Gemini 1.5 (Google)</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Larger context window (1M tokens)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Better multimodal understanding
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    More cost-effective for long documents
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Comparison Table */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle>Feature-by-Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Feature</th>
                    <th className="text-left p-3 font-semibold">GPT-5</th>
                    <th className="text-left p-3 font-semibold">Gemini 1.5</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b">
                    <td className="p-3 font-medium">Context Window</td>
                    <td className="p-3">128K tokens</td>
                    <td className="p-3">1M tokens</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Text Generation</td>
                    <td className="p-3">
                      <Badge variant="default" className="text-xs">Excellent</Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="secondary" className="text-xs">Very Good</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Code Generation</td>
                    <td className="p-3">
                      <Badge variant="default" className="text-xs">Superior</Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="secondary" className="text-xs">Good</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Multimodal</td>
                    <td className="p-3">
                      <Badge variant="secondary" className="text-xs">Good</Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="default" className="text-xs">Excellent</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Reasoning</td>
                    <td className="p-3">
                      <Badge variant="default" className="text-xs">Superior</Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="secondary" className="text-xs">Very Good</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Cost (per 1M tokens)</td>
                    <td className="p-3">$15-30</td>
                    <td className="p-3">$3.50-14</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Use Case Recommendations */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle>Which AI Should You Choose?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Choose GPT-5 for:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• High-quality content writing and copywriting</li>
                  <li>• Complex code generation and debugging</li>
                  <li>• Creative writing and storytelling</li>
                  <li>• Business analysis and strategy</li>
                  <li>• When consistency and reliability matter most</li>
                </ul>
                <Link to="/tools/writer">
                  <Button className="w-full">
                    Try GPT-5 Writer
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-500" />
                  Choose Gemini 1.5 for:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Processing very long documents</li>
                  <li>• Multimodal tasks (text + images)</li>
                  <li>• Cost-sensitive applications</li>
                  <li>• Research and analysis of large datasets</li>
                  <li>• When you need maximum context window</li>
                </ul>
                <Button variant="outline" className="w-full">
                  Coming Soon: Gemini Tools
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Which AI is better for writing?</h4>
                <p className="text-sm text-muted-foreground">
                  GPT-5 generally produces higher quality, more consistent writing with better flow and creativity. It's particularly strong in creative writing, copywriting, and technical documentation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Which is more cost-effective?</h4>
                <p className="text-sm text-muted-foreground">
                  Gemini 1.5 is significantly more cost-effective, especially for processing large documents. However, GPT-5 may provide better value for high-quality content generation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Can I use both?</h4>
                <p className="text-sm text-muted-foreground">
                  Absolutely! Many users choose to use both models for different tasks. Use GPT-5 for high-quality content creation and Gemini 1.5 for processing large documents or multimodal tasks.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Ready to Experience GPT-5?</h2>
          <p className="text-muted-foreground mb-6">
            Try our GPT-5-powered tools and see the difference for yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tools/writer">
              <Button size="lg" className="w-full sm:w-auto">
                <Sparkles className="h-4 w-4 mr-2" />
                Try GPT-5 Writer
              </Button>
            </Link>
            <Link to="/tools">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore All Tools
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPT5VsGemini; 