import React from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Clock, AlertTriangle, CheckCircle, TrendingUp, Users } from 'lucide-react';

const GPT5ReleaseTracker = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            GPT-5 Release Tracker
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest news, rumors, and official announcements about GPT-5's release timeline.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="outline" className="text-sm">
              <Clock className="h-3 w-3 mr-1" />
              Last Updated: January 2025
            </Badge>
            <Badge variant="outline" className="text-sm">
              <TrendingUp className="h-3 w-3 mr-1" />
              Live Updates
            </Badge>
          </div>
        </div>

        {/* Current Status */}
        <Card className="max-w-4xl mx-auto mb-8 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              Current Status: Development Phase
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-orange-700">
                GPT-5 is currently in active development by OpenAI. While no official release date has been announced, 
                we're tracking all available information and will update this page as new details emerge.
              </p>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="bg-orange-100">
                  <Clock className="h-3 w-3 mr-1" />
                  Expected: Q2-Q3 2025
                </Badge>
                <Badge variant="outline" className="bg-orange-100">
                  <Users className="h-3 w-3 mr-1" />
                  Beta Testing: TBA
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              GPT-5 Development Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-semibold">GPT-4 Release (March 2023)</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    OpenAI released GPT-4, setting the foundation for future models.
                  </p>
                  <Badge variant="outline" className="text-xs">Completed</Badge>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-semibold">GPT-4 Turbo (November 2023)</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Enhanced version with improved performance and lower costs.
                  </p>
                  <Badge variant="outline" className="text-xs">Completed</Badge>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-semibold">GPT-5 Development (2024-2025)</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Active development phase with significant improvements in reasoning, safety, and capabilities.
                  </p>
                  <Badge variant="outline" className="text-xs bg-blue-100">In Progress</Badge>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-semibold">Beta Testing (Expected: Q2 2025)</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Limited beta release for select users and partners.
                  </p>
                  <Badge variant="outline" className="text-xs bg-gray-100">Pending</Badge>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-semibold">Public Release (Expected: Q3 2025)</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Full public release with API access and ChatGPT integration.
                  </p>
                  <Badge variant="outline" className="text-xs bg-gray-100">Pending</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expected Features */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle>Expected GPT-5 Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Performance Improvements</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Enhanced reasoning capabilities
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Improved code generation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Better mathematical reasoning
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Reduced hallucinations
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">New Capabilities</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Multimodal understanding
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Tool use and function calling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Enhanced safety measures
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Better context understanding
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Latest News */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle>Latest News & Rumors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold mb-2">OpenAI CEO Sam Altman Hints at GPT-5 Progress</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  In recent interviews, Altman has mentioned significant progress on the next generation model, 
                  emphasizing improvements in reasoning and safety.
                </p>
                <Badge variant="outline" className="text-xs">January 2025</Badge>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold mb-2">Research Papers Suggest Major Breakthroughs</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Recent publications from OpenAI researchers indicate substantial improvements in 
                  mathematical reasoning and logical consistency.
                </p>
                <Badge variant="outline" className="text-xs">December 2024</Badge>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-2">Competition from Google and Anthropic</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  The release of Gemini 1.5 and Claude 3 Opus has increased pressure on OpenAI 
                  to deliver GPT-5 with significant improvements.
                </p>
                <Badge variant="outline" className="text-xs">November 2024</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Stay Updated */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle>How to Stay Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Follow Official Channels</h4>
                <p className="text-sm text-muted-foreground">
                  OpenAI's blog, Twitter, and official announcements
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Join Waitlists</h4>
                <p className="text-sm text-muted-foreground">
                  Sign up for early access and beta testing opportunities
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Try Current Tools</h4>
                <p className="text-sm text-muted-foreground">
                  Experience GPT-4 capabilities while waiting for GPT-5
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Experience GPT-4 While You Wait</h2>
          <p className="text-muted-foreground mb-6">
            Try our GPT-4-powered tools and get ready for the next generation of AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tools/writer">
              <Button size="lg" className="w-full sm:w-auto">
                <Sparkles className="h-4 w-4 mr-2" />
                Try GPT-4 Writer
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

export default GPT5ReleaseTracker; 