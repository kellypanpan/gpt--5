import React from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, TrendingUp, BookOpen, Users, DollarSign } from 'lucide-react';

const BlogIndex = () => {
  const blogPosts = [
    {
      id: 'what-is-gpt-5',
      title: 'What is GPT-5? Complete Guide to OpenAI\'s Latest AI',
      description: 'Everything you need to know about GPT-5, including its capabilities, features, and how it compares to previous models.',
      category: 'Core Introduction',
      readTime: '8 min read',
      date: 'January 2025',
      path: '/blog/what-is-gpt-5',
      icon: Sparkles,
      featured: true
    },
    {
      id: 'gpt-5-vs-claude-3',
      title: 'GPT-5 vs Claude 3 Opus: Which AI is Better in 2025?',
      description: 'A comprehensive comparison of GPT-5 and Claude 3 Opus, helping you choose the right AI for your needs.',
      category: 'Comparison',
      readTime: '10 min read',
      date: 'January 2025',
      path: '/blog/gpt-5-vs-claude-3',
      icon: TrendingUp
    },
    {
      id: 'gpt-5-vs-gemini',
      title: 'GPT-5 vs Gemini 1.5: Battle of the AI Titans',
      description: 'Compare OpenAI\'s GPT-5 with Google\'s Gemini 1.5 - two of the most advanced AI models available today.',
      category: 'Comparison',
      readTime: '12 min read',
      date: 'January 2025',
      path: '/blog/gpt-5-vs-gemini',
      icon: TrendingUp
    },
    {
      id: 'gpt-5-release-tracker',
      title: 'GPT-5 Release Tracker: Latest News and Updates',
      description: 'Stay updated with the latest news, rumors, and official announcements about GPT-5\'s release timeline.',
      category: 'News & Updates',
      readTime: '6 min read',
      date: 'January 2025',
      path: '/blog/gpt-5-release-tracker',
      icon: Clock
    },
    {
      id: 'gpt-5-for-business',
      title: 'GPT-5 for Business: Transform Your Operations',
      description: 'Discover how GPT-5 can revolutionize your business processes, boost productivity, and drive growth.',
      category: 'Business Guide',
      readTime: '15 min read',
      date: 'January 2025',
      path: '/blog/gpt-5-for-business',
      icon: DollarSign
    }
  ];

  const categories = [
    { name: 'All', count: blogPosts.length },
    { name: 'Core Introduction', count: 1 },
    { name: 'Comparison', count: 2 },
    { name: 'News & Updates', count: 1 },
    { name: 'Business Guide', count: 1 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            GPT-5 Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your ultimate resource for everything GPT-5. From comprehensive guides to latest updates, 
            stay informed about the future of AI.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="outline" className="text-sm">
              <BookOpen className="h-3 w-3 mr-1" />
              {blogPosts.length} Articles
            </Badge>
            <Badge variant="outline" className="text-sm">
              <Users className="h-3 w-3 mr-1" />
              Expert Insights
            </Badge>
          </div>
        </div>

        {/* Featured Article */}
        {blogPosts.filter(post => post.featured).map(post => (
          <Card key={post.id} className="max-w-4xl mx-auto mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="default" className="text-xs">
                  Featured
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {post.category}
                </Badge>
              </div>
              <CardTitle className="text-2xl md:text-3xl">
                <Link to={post.path} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-lg">
                {post.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="h-4 w-4" />
                  {post.date}
                </div>
              </div>
              <Link to={post.path}>
                <Button size="lg">
                  Read Full Article
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}

        {/* All Articles */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.filter(post => !post.featured).map(post => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">
                    <Link to={post.path} className="hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                    <Link to={post.path}>
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="max-w-2xl mx-auto mt-12">
          <CardHeader className="text-center">
            <CardTitle>Stay Updated</CardTitle>
            <p className="text-muted-foreground">
              Get the latest GPT-5 news and updates delivered to your inbox.
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center max-w-2xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Try GPT-5?</h2>
          <p className="text-muted-foreground mb-6">
            Experience the power of GPT-5 with our comprehensive suite of AI tools.
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

export default BlogIndex; 