import fs from 'fs';
import path from 'path';

// This script generates a sitemap.xml file for SEO purposes.
// It is intended to be run during the build process.

const generateSitemap = () => {
  const domain = 'https://gpt5hub.com';
  const today = new Date().toISOString().split('T')[0];

  // List of all pages to include in the sitemap
  // This should be kept in sync with the routes in src/App.tsx
  const pages = [
    // Main Pages
    { path: '/', priority: '1.0' },
    { path: '/chat', priority: '0.9' },
    { path: '/pricing', priority: '0.8' },
    { path: '/about', priority: '0.7' },
    { path: '/contact', priority: '0.7' },
    { path: '/sitemap', priority: '0.6' },

    // Tools
    { path: '/tools', priority: '0.9' },
    { path: '/tools/writer', priority: '0.8' },
    { path: '/tools/script', priority: '0.8' },
    { path: '/tools/image', priority: '0.8' },
    { path: '/tools/pdf', priority: '0.8' },
    { path: '/tools/prompts', priority: '0.8' },

    // Legal
    { path: '/privacy', priority: '0.5' },
    { path: '/terms', priority: '0.5' },
    { path: '/cookies', priority: '0.5' },
    
    // Blog
    { path: '/blog', priority: '0.9' },
    { path: '/blog/what-is-gpt-5', priority: '0.8' },
    { path: '/blog/gpt-5-vs-claude-3', priority: '0.8' },
    { path: '/blog/gpt-5-vs-gemini', priority: '0.8' },
    { path: '/blog/gpt-5-release-tracker', priority: '0.8' },
    { path: '/blog/gpt-5-for-business', priority: '0.8' },
    { path: '/blog/gpt-5-technical-deep-dive', priority: '0.8' },
    { path: '/blog/prompt-engineering-guide', priority: '0.8' },
    { path: '/blog/open-source-ai-models-comparison', priority: '0.8' },
    { path: '/blog/gpt-5-industry-guides', priority: '0.8' },
    { path: '/blog/gpt-5-ai-ethics-safety', priority: '0.8' },
    { path: '/blog/50-best-chatgpt5-prompts', priority: '0.8' },
    { path: '/blog/reduce-chatgpt5-api-costs', priority: '0.8' },
    { path: '/blog/can-gpt-5-generate-videos', priority: '0.8' },
    { path: '/blog/gpt-5-use-cases', priority: '0.8' },

    // Use Cases
    { path: '/use-cases', priority: '0.7' },
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>${domain}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;

  try {
    const publicPath = path.resolve('./public');
    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath, { recursive: true });
    }
    fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemapXml);
    console.log('✅ sitemap.xml generated successfully!');
  } catch (error) {
    console.error('❌ Error generating sitemap.xml:', error);
  }
};

generateSitemap(); 