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

const ChatGPT5Prompts: React.FC = () => {
  const articleMetadata = {
    title: '50 Best ChatGPT-5 Prompts for Everyday Use',
    description:
      "A curated list of 50 powerful ChatGPT-5 prompts to boost creativity, productivity, and problem-solving in daily life.",
    author: 'GPT-5 AI Team',
    datePublished: '2025-08-08',
    dateModified: '2025-08-08',
    coverImage: '/images/blog/chatgpt5-prompts.jpg',
    readTime: '10 min read',
    section: 'Practical Guide',
    slug: '50-best-chatgpt5-prompts',
  } as const;

  const { prev, next } = getPrevNext('50-best-chatgpt5-prompts');
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://gpt-5ai.com';
  const canonical = `${origin}/blog/${articleMetadata.slug}`;

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
        articleTags={["ChatGPT-5", "GPT-5", "Prompts", "Productivity"]}
        prevUrl={prev ? `${origin}${prev.path}` : undefined}
        nextUrl={next ? `${origin}${next.path}` : undefined}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: articleMetadata.title,
            datePublished: articleMetadata.datePublished,
            dateModified: articleMetadata.dateModified,
            author: { '@type': 'Person', name: articleMetadata.author },
            publisher: {
              '@type': 'Organization',
              name: 'GPT-5 AI',
              logo: { '@type': 'ImageObject', url: 'https://gpt-5ai.com/g5-logo.png' },
            },
            image: articleMetadata.coverImage,
            description: articleMetadata.description,
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
          }),
        }}
      />

      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-20">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              50 Best ChatGPT-5 Prompts for Everyday Use
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {articleMetadata.description}
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
            {/* Intro */}
            <Card className="border-border/50">
              <CardContent className="prose prose-neutral dark:prose-invert max-w-none p-6">
                <p>
                  <strong>ChatGPT-5</strong> isn’t just for developers — it’s a personal assistant, brainstorming partner, and
                  productivity booster. With its 400K token context and advanced reasoning, you can turn simple ideas into
                  polished output in seconds.
                </p>
                <p>Here’s our curated list of <strong>50 prompts</strong> to inspire your daily use of ChatGPT-5.</p>
              </CardContent>
            </Card>

            {/* Sections */}
            <Card>
              <CardHeader>
                <CardTitle>1. Personal Productivity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-base text-foreground/90">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Plan my week with a focus on work-life balance.</li>
                  <li>Create a daily 2-hour deep work schedule.</li>
                  <li>Summarize my unread emails in bullet points.</li>
                  <li>Organize my notes from this meeting: [paste meeting transcript].</li>
                  <li>Generate a shopping list based on this week’s meal plan.</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Content Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-base text-foreground/90">
                  <li>Write a 1-minute TikTok script about [topic].</li>
                  <li>Generate 10 YouTube video ideas in the [niche] niche.</li>
                  <li>Rewrite this blog intro to make it more engaging: [paste text].</li>
                  <li>Create 5 click-worthy email subject lines for a [product] launch.</li>
                  <li>Suggest 20 trending hashtags for [topic] on Instagram.</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Learning & Research</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-base text-foreground/90">
                  <li>Explain [complex concept] in simple terms for a beginner.</li>
                  <li>Create a study guide for [subject] with key points and examples.</li>
                  <li>Summarize this 20-page research paper: [paste text or link].</li>
                  <li>Generate 5 practice questions on [topic] with answers.</li>
                  <li>Compare the pros and cons of [two technologies].</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Creative Writing</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-base text-foreground/90">
                  <li>Write a short story about a time-traveling chef.</li>
                  <li>Generate a 10-line poem about summer rain.</li>
                  <li>Brainstorm 15 fantasy world names.</li>
                  <li>Write a dialogue between Sherlock Holmes and Iron Man.</li>
                  <li>Describe a magical city using all five senses.</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Career & Job Search</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-base text-foreground/90">
                  <li>Rewrite my resume to highlight leadership skills.</li>
                  <li>Draft a professional LinkedIn summary for a [job title].</li>
                  <li>Prepare 10 interview questions for a [position].</li>
                  <li>Write a polite follow-up email after a job interview.</li>
                  <li>Analyze this job description and suggest key skills: [paste JD].</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Business & Marketing</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-base text-foreground/90">
                  <li>Create a SWOT analysis for [company/product].</li>
                  <li>Suggest 5 upsell ideas for my online store.</li>
                  <li>Write a persuasive product description for [item].</li>
                  <li>Plan a 7-day social media campaign for [brand].</li>
                  <li>Generate 10 blog post titles for a [industry] website.</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Travel & Lifestyle</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-base text-foreground/90">
                  <li>Plan a 5-day trip to [destination] with a $1500 budget.</li>
                  <li>List must-try local foods in [city/country].</li>
                  <li>Suggest the best travel apps for [travel type].</li>
                  <li>Create a weekend itinerary for a nature getaway.</li>
                  <li>Recommend hidden gems in [destination] for photographers.</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Tech & Coding</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-base text-foreground/90">
                  <li>Write a Python function to convert CSV to JSON.</li>
                  <li>Explain how blockchain works in 5 bullet points.</li>
                  <li>Debug this JavaScript error: [paste code].</li>
                  <li>Suggest database structures for a task management app.</li>
                  <li>Optimize this SQL query for speed: [paste query].</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Fun & Entertainment</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-base text-foreground/90">
                  <li>Invent a new cocktail recipe based on [flavor profile].</li>
                  <li>Generate 10 fun icebreaker questions for a team meeting.</li>
                  <li>Create a trivia quiz about [topic].</li>
                  <li>Write a fake news headline about cats ruling the world.</li>
                  <li>Suggest 5 weekend activities for introverts.</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Health & Wellness</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-base text-foreground/90">
                  <li>Create a beginner-friendly workout plan for 3 days a week.</li>
                  <li>Suggest healthy snacks for office workers.</li>
                  <li>Generate a 15-minute morning yoga routine.</li>
                  <li>Explain the benefits of intermittent fasting.</li>
                  <li>Plan a balanced vegetarian meal plan for one week.</li>
                </ol>
              </CardContent>
            </Card>

            {/* How to Use */}
            <Card>
              <CardHeader>
                <CardTitle>How to Use These Prompts</CardTitle>
              </CardHeader>
              <CardContent className="text-base text-foreground/90">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Be specific</strong>: Replace placeholders like [topic] or [paste text] with your own.</li>
                  <li><strong>Iterate</strong>: Ask ChatGPT-5 to refine or expand answers.</li>
                  <li><strong>Save</strong>: Keep your best prompts in a personal library for quick reuse.</li>
                </ul>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Try ChatGPT-5 Now</h2>
                <p className="text-muted-foreground mb-6">
                  Skip the setup — use these prompts instantly at gpt-5ai.com and experience the full power of GPT-5.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/chat">
                    <Button size="lg" className="w-full sm:w-auto">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Start Chatting with ChatGPT-5
                    </Button>
                  </Link>
                  <Link to="/tools/writer">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Explore GPT-5 Writer
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <PrevNext currentId="50-best-chatgpt5-prompts" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatGPT5Prompts; 