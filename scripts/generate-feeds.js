const fs = require('fs');
const path = require('path');

const SITE = 'https://gpt-5ai.com';
const blogPosts = require(path.join(__dirname, '../src/data/blogPosts.json'));

function formatRfc822(dateStr) {
  const d = new Date(dateStr);
  return d.toUTCString();
}

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function generateRSS() {
  const items = blogPosts
    .slice()
    .reverse()
    .map((p) => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <description>${escapeXml(p.description)}</description>
      <link>${SITE}${p.path}</link>
      <guid>${SITE}${p.path}</guid>
      <pubDate>${formatRfc822(p.datePublished)}</pubDate>
      <category>${escapeXml(p.category)}</category>
    </item>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GPT-5 AI Blog</title>
    <description>Your ultimate resource for everything GPT-5. From comprehensive guides to latest updates, stay informed about the future of AI.</description>
    <link>${SITE}/blog</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
}

function generateSitemap() {
  const urls = [
    '/', '/tools', '/blog', '/pricing', '/use-cases', '/sitemap',
    ...blogPosts.map((p) => p.path),
  ];
  const entries = urls.map((u) => `
  <url>
    <loc>${SITE}${u}</loc>
    <lastmod>${todayISO()}</lastmod>
    <changefreq>${u.startsWith('/blog') ? 'weekly' : 'daily'}</changefreq>
    <priority>${u === '/' ? '1.0' : u.startsWith('/blog') ? '0.8' : '0.9'}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function writePublic(filename, content) {
  const out = path.join(__dirname, '../public', filename);
  fs.writeFileSync(out, content.trim() + '\n');
  console.log('wrote', out);
}

writePublic('rss.xml', generateRSS());
writePublic('sitemap.xml', generateSitemap()); 