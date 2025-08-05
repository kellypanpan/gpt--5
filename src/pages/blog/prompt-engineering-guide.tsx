import React from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Brain, 
  Target, 
  Lightbulb, 
  Code, 
  ArrowRight, 
  User, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  Copy,
  Zap
} from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

const PromptEngineeringGuide = () => {
  const articleMetadata = {
    title: "GPT-5 Prompt Engineering Guide: Master AI Communication | Best Practices 2025",
    description: "Complete guide to prompt engineering for GPT-5. Learn advanced techniques, best practices, and proven frameworks to maximize AI performance and get better results.",
    author: "GPT-5 Tools Team",
    datePublished: "2025-01-15",
    dateModified: "2025-01-15",
    coverImage: "/images/prompt-engineering-guide-cover.jpg",
    excerpt: "Master the art of prompt engineering for GPT-5 with proven techniques and frameworks for optimal AI performance.",
    readTime: "18 min read"
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
            headline: "GPT-5 Prompt Engineering Guide: Master AI Communication",
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
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-20">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              GPT-5 Prompt Engineering Guide
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master the art of communicating with GPT-5. Learn advanced techniques, proven frameworks, 
              and best practices to maximize AI performance and achieve exceptional results.
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

          {/* Table of Contents */}
          <Card className="max-w-4xl mx-auto mb-8 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Complete Guide Contents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <a href="#fundamentals" className="block text-primary hover:underline">Prompt Engineering Fundamentals</a>
                <a href="#advanced-techniques" className="block text-primary hover:underline">Advanced Techniques</a>
                <a href="#frameworks" className="block text-primary hover:underline">Proven Frameworks</a>
                <a href="#examples" className="block text-primary hover:underline">Practical Examples</a>
                <a href="#optimization" className="block text-primary hover:underline">Performance Optimization</a>
                <a href="#best-practices" className="block text-primary hover:underline">Best Practices & Tips</a>
              </nav>
            </CardContent>
          </Card>

          <div className="max-w-4xl mx-auto">
            {/* Fundamentals */}
            <section id="fundamentals" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Prompt Engineering Fundamentals</h2>
              
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  Prompt engineering is the art and science of crafting instructions that guide AI models to produce 
                  desired outputs. With GPT-5's enhanced reasoning capabilities, effective prompting becomes even more crucial 
                  for unlocking the model's full potential.
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Core Principles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Target className="h-4 w-4 text-blue-600" />
                        Clarity & Specificity
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Be precise about what you want. Vague prompts lead to inconsistent results.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Brain className="h-4 w-4 text-green-600" />
                        Context Provision
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Provide relevant background information and constraints to guide responses.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-yellow-600" />
                        Structure & Format
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Organize prompts logically and specify desired output formats.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-purple-600" />
                        Iterative Refinement
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Test and refine prompts based on output quality and consistency.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Anatomy of an Effective Prompt</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-medium mb-2">1. Context Setting</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Establish the scenario, role, or background information.
                      </p>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                        "You are a marketing expert helping a SaaS startup..."
                      </div>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium mb-2">2. Task Definition</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Clearly state what you want the AI to do.
                      </p>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                        "Create a content marketing strategy that..."
                      </div>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium mb-2">3. Constraints & Requirements</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Specify limitations, format, length, or style requirements.
                      </p>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                        "Format as a bullet-point list, maximum 10 items..."
                      </div>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-medium mb-2">4. Examples (Optional)</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Provide examples of desired output format or style.
                      </p>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                        "Example format: '1. Strategy: [Name] - Description: [Details]'"
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Advanced Techniques */}
            <section id="advanced-techniques" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Advanced Prompting Techniques</h2>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Chain-of-Thought Prompting</h3>
                  <p className="text-muted-foreground mb-4">
                    Guide GPT-5 through step-by-step reasoning to improve accuracy on complex problems.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-sm">Good Example:</span>
                      </div>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono mb-2">
                        "Solve this step by step: A company's revenue increased by 25% in Q1, then decreased by 15% in Q2. 
                        If Q1 revenue was $100,000, what's the Q2 revenue?
                        
                        Step 1: Calculate Q1 revenue after increase
                        Step 2: Calculate Q2 revenue after decrease
                        Step 3: Provide final answer"
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Few-Shot Learning</h3>
                  <p className="text-muted-foreground mb-4">
                    Provide examples to establish patterns and guide GPT-5's responses.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                      {`Input: "The weather is nice today"
Sentiment: Positive
Confidence: 0.8

Input: "Traffic was terrible this morning"  
Sentiment: Negative
Confidence: 0.9

Input: "The presentation went okay"
Sentiment: Neutral
Confidence: 0.7

Input: "I'm excited about the new project"
Sentiment: ?`}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Role-Based Prompting</h3>
                  <p className="text-muted-foreground mb-4">
                    Assign specific roles to influence GPT-5's perspective and expertise.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Expert Roles</h4>
                      <ul className="text-sm space-y-1">
                        <li>• "As a senior software architect..."</li>
                        <li>• "Acting as a marketing consultant..."</li>
                        <li>• "From a data scientist's perspective..."</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Persona Roles</h4>
                      <ul className="text-sm space-y-1">
                        <li>• "You are a helpful teacher..."</li>
                        <li>• "Act as a skeptical reviewer..."</li>
                        <li>• "Take the role of a creative writer..."</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Frameworks */}
            <section id="frameworks" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Proven Prompt Frameworks</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        STAR Framework
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="font-medium text-sm">Situation</div>
                          <div className="text-xs text-muted-foreground">Set context and background</div>
                        </div>
                        <div>
                          <div className="font-medium text-sm">Task</div>
                          <div className="text-xs text-muted-foreground">Define what needs to be done</div>
                        </div>
                        <div>
                          <div className="font-medium text-sm">Action</div>
                          <div className="text-xs text-muted-foreground">Specify desired approach</div>
                        </div>
                        <div>
                          <div className="font-medium text-sm">Result</div>
                          <div className="text-xs text-muted-foreground">Describe expected outcome</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        CLEAR Framework
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="font-medium text-sm">Context</div>
                          <div className="text-xs text-muted-foreground">Provide relevant background</div>
                        </div>
                        <div>
                          <div className="font-medium text-sm">Length</div>
                          <div className="text-xs text-muted-foreground">Specify output length</div>
                        </div>
                        <div>
                          <div className="font-medium text-sm">Examples</div>
                          <div className="text-xs text-muted-foreground">Show desired format</div>
                        </div>
                        <div>
                          <div className="font-medium text-sm">Audience</div>
                          <div className="text-xs text-muted-foreground">Define target audience</div>
                        </div>
                        <div>
                          <div className="font-medium text-sm">Role</div>
                          <div className="text-xs text-muted-foreground">Assign AI perspective</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">CARE Framework Example</h3>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="font-mono text-sm space-y-3">
                      <div>
                        <span className="font-semibold text-blue-600">Context:</span> You're a social media manager for a B2B SaaS company
                      </div>
                      <div>
                        <span className="font-semibold text-green-600">Action:</span> Create 5 LinkedIn post ideas about AI productivity tools
                      </div>
                      <div>
                        <span className="font-semibold text-purple-600">Result:</span> Each post should drive engagement and showcase expertise
                      </div>
                      <div>
                        <span className="font-semibold text-orange-600">Example:</span> "Post 1: [Hook] - [Value] - [CTA]"
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Practical Examples */}
            <section id="examples" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Practical Examples by Use Case</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Content Creation</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Blog Post Outline</span>
                        <Button size="sm" variant="outline">
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                        {`Create a detailed blog post outline for "AI in Healthcare":
- Target audience: Healthcare professionals
- Tone: Professional but accessible
- Length: 2000 words
- Include: Introduction, 5 main benefits, case studies, conclusion
- SEO focus: "AI healthcare applications"
- Format each section with estimated word count`}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Code Generation</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Python Function</span>
                        <Button size="sm" variant="outline">
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                        {`Write a Python function that:
1. Takes a list of user data (name, email, age)
2. Validates email format using regex
3. Filters users over 18
4. Returns sorted list by age
5. Include error handling and type hints
6. Add docstring with examples
7. Follow PEP 8 style guidelines`}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Data Analysis</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Sales Report Analysis</span>
                        <Button size="sm" variant="outline">
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                        {`Analyze this sales data and provide insights:
[DATA: Monthly sales figures for 12 months]

Provide:
1. Key performance metrics (growth rate, average, trends)
2. Seasonal patterns identification
3. Top 3 performing months and reasons why
4. Recommendations for underperforming periods
5. Visual description of ideal chart type
6. Actionable next steps for sales team`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Optimization */}
            <section id="optimization" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Performance Optimization</h2>
              
              <div className="space-y-6">
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Common Issues & Solutions</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium mb-2">Issue: Inconsistent Outputs</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          GPT-5 provides different responses for the same prompt.
                        </p>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="font-medium text-sm text-green-800 mb-1">Solutions:</div>
                          <ul className="text-xs text-green-700 space-y-1">
                            <li>• Add more specific constraints and examples</li>
                            <li>• Use temperature settings (0.1-0.3 for consistency)</li>
                            <li>• Include format templates in prompts</li>
                            <li>• Test with multiple prompt variations</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium mb-2">Issue: Verbose or Unfocused Responses</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          AI provides too much information or goes off-topic.
                        </p>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="font-medium text-sm text-blue-800 mb-1">Solutions:</div>
                          <ul className="text-xs text-blue-700 space-y-1">
                            <li>• Set clear length limits ("in 100 words or less")</li>
                            <li>• Use bullet points or numbered lists</li>
                            <li>• Add "focus only on..." constraints</li>
                            <li>• Request summaries or key points only</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Response Accuracy</span>
                          <span className="font-semibold">95%+</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Consistency Rate</span>
                          <span className="font-semibold">90%+</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Task Completion</span>
                          <span className="font-semibold">98%+</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Format Adherence</span>
                          <span className="font-semibold">92%+</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle>Testing Strategy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Test with 5+ variations</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Measure consistency across runs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Document successful patterns</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>A/B test prompt versions</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section id="best-practices" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Best Practices & Tips</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-600">Do's</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">Be Specific and Clear</div>
                        <div className="text-xs text-muted-foreground">Use precise language and avoid ambiguity</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">Provide Context</div>
                        <div className="text-xs text-muted-foreground">Give background information and constraints</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">Use Examples</div>
                        <div className="text-xs text-muted-foreground">Show desired format and style</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">Iterate and Refine</div>
                        <div className="text-xs text-muted-foreground">Test and improve prompts continuously</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-600">Don'ts</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">Don't Be Vague</div>
                        <div className="text-xs text-muted-foreground">Avoid unclear or overly broad requests</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">Don't Assume Knowledge</div>
                        <div className="text-xs text-muted-foreground">Always provide necessary context</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">Don't Ignore Output Quality</div>
                        <div className="text-xs text-muted-foreground">Monitor and validate AI responses</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">Don't Use Complex Jargon</div>
                        <div className="text-xs text-muted-foreground">Keep prompts accessible and clear</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-primary/10 to-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Prompt Checklist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Clear objective defined</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Context provided</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Format specified</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Constraints included</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Examples provided</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Output tested</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Related Articles */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>You might also like</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Badge variant="outline" className="text-xs w-fit mb-2">Technical Analysis</Badge>
                      <CardTitle className="text-lg">
                        <Link to="/blog/gpt-5-technical-deep-dive" className="hover:text-primary transition-colors">
                          GPT-5 Technical Deep Dive
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">
                        Understand GPT-5's architecture and capabilities in depth.
                      </p>
                      <Link to="/blog/gpt-5-technical-deep-dive">
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
                          GPT-5 for Business
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">
                        Learn how to implement GPT-5 in business workflows.
                      </p>
                      <Link to="/blog/gpt-5-for-business">
                        <Button variant="outline" size="sm">
                          Read More
                          <ArrowRight className="h-3 w-3 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Badge variant="outline" className="text-xs w-fit mb-2">Core Introduction</Badge>
                      <CardTitle className="text-lg">
                        <Link to="/blog/what-is-gpt-5" className="hover:text-primary transition-colors">
                          What Is GPT-5?
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">
                        Complete guide to GPT-5's features and capabilities.
                      </p>
                      <Link to="/blog/what-is-gpt-5">
                        <Button variant="outline" size="sm">
                          Read More
                          <ArrowRight className="h-3 w-3 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Practice Your Prompt Engineering Skills</h2>
              <p className="text-muted-foreground mb-6">
                Apply these techniques with our GPT-5-powered tools and see the difference effective prompting makes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/tools/prompts">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Try Prompt Lab
                  </Button>
                </Link>
                <Link to="/tools">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore All Tools
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptEngineeringGuide;