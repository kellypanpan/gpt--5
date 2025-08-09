import React, { useMemo, useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, TrendingUp, BookOpen, Users, Search } from 'lucide-react';
import { BlogSearch } from '@/components/BlogSearch';
import { SocialShare } from '@/components/SocialShare';
import { SEOHead } from '@/components/SEOHead';
import { blogPosts as allPosts } from '@/data/blogPosts';

const BlogIndex = () => {
  const [showSearch, setShowSearch] = useState(false);
  const featured = allPosts.find((p) => p.featured) || allPosts[0];
  const rest = allPosts.filter((p) => p.id !== featured.id);

  const pageTitle = 'GPT-5 Blog - Expert AI Insights';
  const pageDesc = 'Your ultimate resource for everything GPT-5. From comprehensive guides to latest updates, stay informed about the future of AI.';

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    allPosts.forEach((p) => counts.set(p.category, (counts.get(p.category) || 0) + 1));
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
  }, []);

  return (
    <Layout>
      <SEOHead 
        title={pageTitle}
        description={pageDesc}
        canonical={typeof window !== 'undefined' ? window.location.origin + '/blog' : 'https://gpt-5ai.com/blog'}
        ogTitle={pageTitle}
        ogDescription={pageDesc}
        ogUrl={typeof window !== 'undefined' ? window.location.href : 'https://gpt-5ai.com/blog'}
        twitterTitle={pageTitle}
        twitterDescription={pageDesc}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "GPT-5 Tools Blog",
            description: pageDesc,
            url: "https://gpt-5ai.com/blog",
            publisher: {
              "@type": "Organization",
              name: "GPT-5 AI",
              logo: {
                "@type": "ImageObject",
                url: "https://gpt-5ai.com/g5-logo.png"
              }
            }
          })
        }}
      />
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
              {allPosts.length} Articles
            </Badge>
            <Badge variant="outline" className="text-sm">
              <Users className="h-3 w-3 mr-1" />
              Expert Insights
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowSearch(!showSearch)}
              className="text-sm"
            >
              <Search className="h-3 w-3 mr-1" />
              Search Articles
            </Button>
            <SocialShare 
              url={typeof window !== 'undefined' ? window.location.href : 'https://gpt-5ai.com/blog'}
              title="GPT-5 Blog - Expert AI Insights"
              description="Your ultimate resource for everything GPT-5. From comprehensive guides to latest updates."
            />
          </div>
        </div>

        {/* Search Interface */}
        {showSearch && (
          <div className="max-w-6xl mx-auto mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Search Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <BlogSearch
                  posts={allPosts.map((p) => ({
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    category: p.category,
                    readTime: p.readTime,
                    date: new Date(p.dateModified).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
                    path: p.path,
                  }))}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {!showSearch && (
          <>
        {/* Featured Article */}
        {featured && (
          <Card className="max-w-4xl mx-auto mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="default" className="text-xs">
                  Featured
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {featured.category}
                </Badge>
              </div>
              <CardTitle className="text-2xl md:text-3xl">
                <Link to={featured.path} className="hover:text-primary transition-colors">
                  {featured.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-lg">
                {featured.description}
              </p>
              <div className="flex items-center gap-4 text-base text-foreground/85 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {featured.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="h-4 w-4" />
                  {new Date(featured.dateModified).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </div>
              </div>
              <Link to={featured.path}>
                <Button size="lg">
                  Read Full Article
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* All Articles */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(post => (
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
        </>
        )}

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
    </Layout>
  );
};

export default BlogIndex; 