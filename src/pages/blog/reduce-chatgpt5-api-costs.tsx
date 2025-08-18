import React from 'react';
import { Header } from '@/components/Header';
import { SEOHead } from '@/components/SEOHead';
import { PrevNext } from '@/components/PrevNext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, User, Sparkles } from 'lucide-react';
import { getPrevNext } from '@/data/blogPosts';
import { BlogSchema } from '@/components/BlogSchema';

const ReduceChatGPT5Costs: React.FC = () => {
  const articleMetadata = {
    title: 'How to Reduce ChatGPT-5 API Costs Without Losing Quality',
    description:
      'Practical strategies for developers and businesses to cut ChatGPT-5 API expenses while keeping output quality high.',
    author: 'GPT-5 AI Team',
    datePublished: '2025-08-08',
    dateModified: '2025-08-08',
    coverImage: '/images/blog/reduce-chatgpt5-cost.jpg',
    readTime: '9 min read',
    section: 'Business Guide',
    slug: 'reduce-chatgpt5-api-costs',
  } as const;

  const { prev, next } = getPrevNext('reduce-chatgpt5-api-costs');
  const origin = 'https://gpt5hub.com';
  const canonical = `${origin}/blog/${articleMetadata.slug}`;

  const codeTokenCounter = String.raw`import { encoding_for_model } from "tiktoken";
const enc = encoding_for_model("gpt-5");
const tokens = enc.encode("Your text here");
console.log(\`Token count: \${tokens.length}\`);`;

  const codeMaxTokens = String.raw`const res = await fetch("https://api.gpt-5ai.com/v1/chat", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.GPT5_API_KEY}\`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "gpt-5",
    max_tokens: 500,
    messages: [{ role: "user", content: "Summarize this 10-page report." }]
  })
});`;

  return (
    <>
      <SEOHead
        title={`${articleMetadata.title} | GPT-5 Tools`}
        description={articleMetadata.description}
        canonical={canonical}
        ogTitle={articleMetadata.title}
        ogDescription={articleMetadata.description}
        ogImage={articleMetadata.coverImage}
        ogUrl={canonical}
        ogType="article"
        twitterTitle={articleMetadata.title}
        twitterDescription={articleMetadata.description}
        twitterImage={articleMetadata.coverImage}
        articlePublishedTime={articleMetadata.datePublished}
        articleModifiedTime={articleMetadata.dateModified}
        articleSection={articleMetadata.section}
        articleTags={["ChatGPT-5", "GPT-5 API", "Cost Optimization", "AI Development"]}
        prevUrl={prev ? `${origin}${prev.path}` : undefined}
        nextUrl={next ? `${origin}${next.path}` : undefined}
      />
      <BlogSchema
        title={articleMetadata.title}
        description={articleMetadata.description}
        authorName={articleMetadata.author}
        publishDate={articleMetadata.datePublished}
        updateDate={articleMetadata.dateModified}
        imageUrl={origin + articleMetadata.coverImage}
        url={canonical}
      />

      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-20">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {articleMetadata.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The <strong>ChatGPT-5 API</strong> is incredibly powerful, but its output cost (often <strong>$10 per million tokens</strong>) can add up fast. These field-tested tactics help you save 30–60% while keeping quality high.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span className="text-sm">Written by {articleMetadata.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span className="text-sm">
                  Updated {new Date(articleMetadata.dateModified).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <span>•</span>
              <span className="text-sm">{articleMetadata.readTime}</span>
              <Badge variant="outline" className="text-sm">{articleMetadata.section}</Badge>
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {/* 1) Understand Tokens */}
            <Card>
              <CardHeader>
                <CardTitle>1) Understand Your Token Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base text-foreground/90">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Input tokens</strong> = prompt + context</li>
                  <li><strong>Output tokens</strong> = model’s response (<strong>the expensive part</strong>)</li>
                </ul>
                <div className="bg-muted/50 rounded-md p-4 overflow-x-auto">
                  <pre className="text-sm"><code>{codeTokenCounter}</code></pre>
                </div>
              </CardContent>
            </Card>

            {/* 2) Optimize Prompts */}
            <Card>
              <CardHeader>
                <CardTitle>2) Optimize Prompts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-base text-foreground/90">
                <p>Shorter input = lower cost.</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Remove filler and repeated context</li>
                  <li>Use bullet points / structured fields</li>
                  <li>Cache reusable <strong>system prompts</strong> instead of resending every call</li>
                </ul>
                <div className="space-y-2">
                  <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200">
                    ❌ “Can you please kindly write me a short blog post about productivity tips for working from home, making sure you use a friendly tone and include at least five examples?”
                  </div>
                  <div className="p-3 rounded-md bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200">
                    ✅ “Write a friendly blog post with <strong>5</strong> work-from-home productivity tips.”
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3) Cap Output */}
            <Card>
              <CardHeader>
                <CardTitle>3) Cap Output Length</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-base text-foreground/90">
                <p>Since output is pricey, control it with <code>max_tokens</code>:</p>
                <div className="bg-muted/50 rounded-md p-4 overflow-x-auto">
                  <pre className="text-sm"><code>{codeMaxTokens}</code></pre>
                </div>
              </CardContent>
            </Card>

            {/* 4) Use Strategically */}
            <Card>
              <CardHeader>
                <CardTitle>4) Use GPT-5 Strategically</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-base text-foreground/90">
                  <li>Draft with <strong>GPT-4.1</strong> → polish with <strong>GPT-5</strong></li>
                  <li>Simple Q&amp;A / extraction → cheaper model</li>
                  <li>Reserve <strong>ChatGPT-5</strong> for complex reasoning and premium features</li>
                </ul>
              </CardContent>
            </Card>

            {/* 5) Batch Requests */}
            <Card>
              <CardHeader>
                <CardTitle>5) Batch Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-base text-foreground/90">
                  <li>❌ 10 calls for 10 product descriptions</li>
                  <li>✅ 1 call: “Write <strong>10</strong> product descriptions for these items: …”</li>
                </ul>
              </CardContent>
            </Card>

            {/* 6) Cache */}
            <Card>
              <CardHeader>
                <CardTitle>6) Cache High-Value Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-base text-foreground/90">
                  <li>Cache FAQs, templates, popular prompts</li>
                  <li>Use Redis for speed; set expiries for freshness</li>
                  <li>Serve from cache first, then fall back to API</li>
                </ul>
              </CardContent>
            </Card>

            {/* 7) Monitor */}
            <Card>
              <CardHeader>
                <CardTitle>7) Monitor & Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-base text-foreground/90">
                  <li>Track tokens per user/tenant</li>
                  <li>Throttle abusers automatically</li>
                  <li>Trigger Slack/email alerts on spikes</li>
                </ul>
              </CardContent>
            </Card>

            {/* Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>✅ Quick Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-none space-y-1 text-base text-foreground/90">
                  <li>[ ] Shorten prompts & context</li>
                  <li>[ ] Limit <code>max_tokens</code></li>
                  <li>[ ] Hybrid model routing</li>
                  <li>[ ] Batch related tasks</li>
                  <li>[ ] Cache reusable answers</li>
                  <li>[ ] Monitor usage & set alerts</li>
                </ul>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Start Optimizing Today</h2>
                <p className="text-muted-foreground mb-6">
                  Implement these strategies with the <a className="underline" href="https://gpt-5ai.com/api" target="_blank" rel="noreferrer">GPT-5 API</a> and keep your app powerful and profitable.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="https://gpt-5ai.com/api" target="_blank" rel="noreferrer">
                    <Button size="lg" className="w-full sm:w-auto">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Get Your GPT-5 API Key
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            <PrevNext currentId="reduce-chatgpt5-api-costs" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReduceChatGPT5Costs; 