import React from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Wrench, 
  BookOpen, 
  DollarSign, 
  BarChart3, 
  ExternalLink,
  Calendar
} from 'lucide-react';

const Sitemap = () => {
  const siteStructure = {
    main: [
      { name: 'Home', path: '/', icon: Home },
      { name: 'Tools', path: '/tools', icon: Wrench },
      { name: 'Blog', path: '/blog', icon: BookOpen },
      { name: 'Pricing', path: '/pricing', icon: DollarSign },
      { name: 'Use Cases', path: '/use-cases', icon: BarChart3 },
      { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    ],
    tools: [
      { name: 'AI Writer', path: '/tools/writer' },
      { name: 'PDF Analyzer', path: '/tools/pdf' },
      { name: 'Script Generator', path: '/tools/script' },
      { name: 'Image Generator', path: '/tools/image' },
      { name: 'Prompt Lab', path: '/tools/prompts' },
    ],
    blog: [
      { name: 'What is GPT-5?', path: '/blog/what-is-gpt-5', category: 'Core Introduction' },
      { name: 'GPT-5 vs Claude 3', path: '/blog/gpt-5-vs-claude-3', category: 'Comparison' },
      { name: 'GPT-5 vs Gemini', path: '/blog/gpt-5-vs-gemini', category: 'Comparison' },
      { name: 'GPT-5 vs Open Source Models', path: '/blog/open-source-ai-models-comparison', category: 'Comparison' },
      { name: 'GPT-5 Release Tracker', path: '/blog/gpt-5-release-tracker', category: 'News & Updates' },
      { name: 'GPT-5 for Business', path: '/blog/gpt-5-for-business', category: 'Business Guide' },
      { name: 'GPT-5 Technical Deep Dive', path: '/blog/gpt-5-technical-deep-dive', category: 'Technical Analysis' },
      { name: 'Prompt Engineering Guide', path: '/blog/prompt-engineering-guide', category: 'Practical Guide' },
      { name: 'Agent Building Tutorial', path: '/blog/gpt-5-agent-building-tutorial', category: 'Practical Guide' },
      { name: 'Industry Implementation Guides', path: '/blog/gpt-5-industry-guides', category: 'Industry Guide' },
      { name: 'AI Ethics & Safety', path: '/blog/gpt-5-ai-ethics-safety', category: 'Ethics & Safety' },
    ]
  };

  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Sitemap
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete overview of all pages and resources available on GPT-5 Tools. 
            Find everything you need to explore our AI-powered platform.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Last updated: {currentDate}</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Main Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Main Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {siteStructure.main.map(page => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <page.icon className="h-4 w-4 text-primary" />
                    <span className="font-medium">{page.name}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                AI Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {siteStructure.tools.map(tool => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 text-primary" />
                    <span className="font-medium">{tool.name}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Blog Articles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Blog Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Group by category */}
                {Array.from(new Set(siteStructure.blog.map(post => post.category))).map(category => (
                  <div key={category}>
                    <h3 className="font-semibold text-lg mb-3 text-primary">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {siteStructure.blog
                        .filter(post => post.category === category)
                        .map(post => (
                          <Link
                            key={post.path}
                            to={post.path}
                            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4 text-primary" />
                            <span className="font-medium">{post.name}</span>
                          </Link>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technical Information */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Site Statistics</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Total Pages: {siteStructure.main.length + siteStructure.tools.length + siteStructure.blog.length}</li>
                      <li>• Blog Articles: {siteStructure.blog.length}</li>
                      <li>• AI Tools: {siteStructure.tools.length}</li>
                      <li>• Main Sections: {siteStructure.main.length}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Content Categories</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {Array.from(new Set(siteStructure.blog.map(post => post.category))).map(category => (
                        <li key={category}>
                          • {category}: {siteStructure.blog.filter(post => post.category === category).length} articles
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2">XML Sitemap</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Machine-readable sitemap for search engines
                  </p>
                  <Link to="/sitemap.xml" className="text-primary text-sm hover:underline">
                    View XML Sitemap
                  </Link>
                </div>
                <div className="p-3 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2">RSS Feed</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Subscribe to our latest blog posts
                  </p>
                  <Link to="/rss.xml" className="text-primary text-sm hover:underline">
                    Subscribe to RSS
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;