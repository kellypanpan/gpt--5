import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { SEOHead } from '@/components/SEOHead';

const Sitemap = () => {
  const today = new Date().toISOString().split('T')[0];

  const pages = [
    // Main Pages
    { path: '/', priority: '1.0', lastMod: today },
    { path: '/chat', priority: '0.9', lastMod: today },
    { path: '/pricing', priority: '0.8', lastMod: today },
    { path: '/about', priority: '0.7', lastMod: today },
    { path: '/contact', priority: '0.7', lastMod: today },

    // Tools
    { path: '/tools', priority: '0.9', lastMod: today },
    { path: '/tools/writer', priority: '0.8', lastMod: today },
    { path: '/tools/script', priority: '0.8', lastMod: today },
    { path: '/tools/image', priority: '0.8', lastMod: today },
    { path: '/tools/pdf', priority: '0.8', lastMod: today },
    { path: '/tools/prompts', priority: '0.8', lastMod: today },

    // Legal
    { path: '/privacy', priority: '0.5', lastMod: today },
    { path: '/terms', priority: '0.5', lastMod: today },
    { path: '/cookies', priority: '0.5', lastMod: today },
    
    // Blog
    { path: '/blog', priority: '0.9', lastMod: today },
    { path: '/blog/what-is-gpt-5', priority: '0.8', lastMod: today },
    { path: '/blog/gpt-5-vs-claude-3', priority: '0.8', lastMod: today },
    { path: '/blog/gpt-5-vs-gemini', priority: '0.8', lastMod: today },
    { path: '/blog/gpt-5-release-tracker', priority: '0.8', lastMod: today },
    { path: '/blog/gpt-5-for-business', priority: '0.8', lastMod: today },
    { path: '/blog/gpt-5-technical-deep-dive', priority: '0.8', lastMod: today },
    { path: '/blog/prompt-engineering-guide', priority: '0.8', lastMod: today },
    { path: '/blog/open-source-ai-models-comparison', priority: '0.8', lastMod: today },
    { path: '/blog/gpt-5-industry-guides', priority: '0.8', lastMod: today },
    { path: '/blog/gpt-5-ai-ethics-safety', priority: '0.8', lastMod: today },
    { path: '/blog/50-best-chatgpt5-prompts', priority: '0.8', lastMod: today },
    { path: '/blog/reduce-chatgpt5-api-costs', priority: '0.8', lastMod: today },
    { path: '/blog/can-gpt-5-generate-videos', priority: '0.8', lastMod: today },
    { path: '/blog/gpt-5-use-cases', priority: '0.8', lastMod: today },
    { path: '/blog/is-gpt-5-a-letdown', priority: '0.8', lastMod: today },

    // Use Cases
    { path: '/use-cases', priority: '0.7', lastMod: today },
  ];

  const renderSection = (title: string, links: { path: string; priority: string, lastMod: string }[]) => (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-primary">{title}</h2>
      <ul className="space-y-2">
        {links.map(page => (
          <li key={page.path}>
            <Link to={page.path} className="text-muted-foreground hover:text-foreground hover:underline">
              {page.path}
            </Link>
            <span className="ml-4 text-sm text-gray-500">(Priority: {page.priority})</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Layout>
      <SEOHead
        title="Sitemap - GPT-5 AI"
        description="Explore all pages on the GPT-5 AI platform. Find links to our tools, blog articles, and company information."
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 pt-20">
          <h1 className="text-4xl font-bold mb-8 text-center">Sitemap</h1>
          <p className="text-center text-muted-foreground mb-12">
            Last Updated: {today}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              {renderSection('Main Pages', pages.filter(p => !p.path.includes('/') || p.path.length < 2))}
              {renderSection('Core Features', pages.filter(p => ['/chat', '/pricing', '/about', '/contact'].includes(p.path)))}
            </div>
            <div>
              {renderSection('Tools', pages.filter(p => p.path.startsWith('/tools')))}
              {renderSection('Legal', pages.filter(p => p.path.startsWith('/privacy') || p.path.startsWith('/terms') || p.path.startsWith('/cookies')))}
            </div>
            <div>
              {renderSection('Blog & Use Cases', pages.filter(p => p.path.startsWith('/blog') || p.path.startsWith('/use-cases')))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sitemap;