import React from 'react';
import { Helmet } from 'react-helmet';

interface BlogSchemaProps {
  title: string;
  description: string;
  authorName: string;
  publishDate: string; // ISO 8601 format: "YYYY-MM-DD"
  updateDate?: string; // ISO 8601 format: "YYYY-MM-DD"
  imageUrl: string; // Absolute URL to the article's main image
  url: string; // Absolute URL to the blog post
}

export const BlogSchema: React.FC<BlogSchemaProps> = ({
  title,
  description,
  authorName,
  publishDate,
  updateDate,
  imageUrl,
  url,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    description: description,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'GPT-5 AI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://gpt5hub.com/logo.png', // 使用新的域名
      },
    },
    datePublished: publishDate,
    dateModified: updateDate || publishDate,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}; 