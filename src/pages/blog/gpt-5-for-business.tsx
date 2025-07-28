import React from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, DollarSign, Users, Zap, Target, BarChart3, Lightbulb } from 'lucide-react';

const GPT5ForBusiness = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            GPT-5 for Business: Transform Your Operations
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how GPT-5 can revolutionize your business processes, boost productivity, and drive growth across all departments.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="outline" className="text-sm">
              <DollarSign className="h-3 w-3 mr-1" />
              Business Guide
            </Badge>
            <Badge variant="outline" className="text-sm">
              <TrendingUp className="h-3 w-3 mr-1" />
              ROI Focused
            </Badge>
          </div>
        </div>

        {/* Key Benefits */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Key Business Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <Target className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">80% Time Savings</h3>
                <p className="text-sm text-muted-foreground">
                  Automate repetitive tasks and focus on strategic decisions
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <BarChart3 className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">3x Productivity</h3>
                <p className="text-sm text-muted-foreground">
                  Generate content, analyze data, and solve problems faster
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">60% Cost Reduction</h3>
                <p className="text-sm text-muted-foreground">
                  Reduce operational costs while improving quality
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department Applications */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle>Department-Specific Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    Marketing & Sales
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Generate compelling ad copy and marketing materials</li>
                    <li>• Create personalized email campaigns</li>
                    <li>• Analyze customer feedback and sentiment</li>
                    <li>• Develop sales scripts and pitch decks</li>
                    <li>• Optimize landing pages and CTAs</li>
                  </ul>
                  <Link to="/tools/writer">
                    <Button size="sm" className="w-full">
                      Try Content Generator
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-500" />
                    Operations & HR
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Automate document processing and analysis</li>
                    <li>• Generate reports and presentations</li>
                    <li>• Create training materials and SOPs</li>
                    <li>• Draft job descriptions and policies</li>
                    <li>• Analyze performance data</li>
                  </ul>
                  <Link to="/tools/pdf">
                    <Button size="sm" variant="outline" className="w-full">
                      Try PDF Analyzer
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-purple-500" />
                    Product & Development
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Generate code and debug issues</li>
                    <li>• Create technical documentation</li>
                    <li>• Analyze user feedback and requirements</li>
                    <li>• Generate test cases and scenarios</li>
                    <li>• Optimize user experience</li>
                  </ul>
                  <Link to="/tools/script">
                    <Button size="sm" variant="outline" className="w-full">
                      Try Script Generator
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    Customer Service
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Generate response templates</li>
                    <li>• Analyze customer inquiries</li>
                    <li>• Create FAQ content</li>
                    <li>• Draft support documentation</li>
                    <li>• Improve response quality</li>
                  </ul>
                  <Link to="/tools/prompts">
                    <Button size="sm" variant="outline" className="w-full">
                      Try Prompt Lab
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Implementation Guide */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle>Implementation Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">Assessment & Planning (Week 1-2)</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Identify high-impact use cases, assess current processes, and create implementation timeline.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Audit current workflows and pain points</li>
                    <li>• Define success metrics and KPIs</li>
                    <li>• Select pilot departments or processes</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">Pilot Program (Week 3-6)</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Start with small-scale implementations in selected departments.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Train team members on GPT-5 tools</li>
                    <li>• Implement basic automation workflows</li>
                    <li>• Collect feedback and measure results</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">Scale & Optimize (Week 7-12)</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Expand successful implementations across the organization.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Roll out to additional departments</li>
                    <li>• Integrate with existing systems</li>
                    <li>• Optimize workflows based on learnings</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">Continuous Improvement (Ongoing)</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Monitor performance, gather feedback, and continuously enhance AI integration.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Regular performance reviews</li>
                    <li>• Update processes and workflows</li>
                    <li>• Explore new use cases and opportunities</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ROI Calculator */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle>ROI Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Cost Savings</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Content Creation</span>
                    <span className="text-sm font-semibold">$2,000/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Data Analysis</span>
                    <span className="text-sm font-semibold">$1,500/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Customer Support</span>
                    <span className="text-sm font-semibold">$3,000/month</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total Monthly Savings</span>
                      <span className="text-green-600">$6,500</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Investment</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">GPT-5 API Costs</span>
                    <span className="text-sm font-semibold">$500/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Implementation</span>
                    <span className="text-sm font-semibold">$2,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Training</span>
                    <span className="text-sm font-semibold">$1,000</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Monthly ROI</span>
                      <span className="text-green-600">1,200%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Stories */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle>Success Stories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold mb-2">Marketing Agency - 300% Increase in Content Output</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  "We've increased our content production by 300% while maintaining quality. GPT-5 helps us create 
                  compelling copy for multiple clients simultaneously."
                </p>
                <Badge variant="outline" className="text-xs">Marketing</Badge>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-2">E-commerce Company - 50% Reduction in Support Tickets</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  "By using GPT-5 to generate FAQ content and support responses, we've reduced customer support 
                  tickets by 50% and improved customer satisfaction scores."
                </p>
                <Badge variant="outline" className="text-xs">Customer Service</Badge>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold mb-2">Tech Startup - 80% Faster Product Documentation</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  "GPT-5 has revolutionized our documentation process. What used to take weeks now takes days, 
                  and the quality is consistently high."
                </p>
                <Badge variant="outline" className="text-xs">Product Development</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-muted-foreground mb-6">
            Start with our GPT-5-powered tools and see the impact on your bottom line.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tools/writer">
              <Button size="lg" className="w-full sm:w-auto">
                <Sparkles className="h-4 w-4 mr-2" />
                Start Free Trial
              </Button>
            </Link>
            <Link to="/use-cases">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Use Cases
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPT5ForBusiness; 