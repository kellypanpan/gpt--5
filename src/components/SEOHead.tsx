import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  structuredData?: object;
  canonical?: string;
  robots?: string; // e.g., "index, follow" or "noindex, nofollow"
  googleSiteVerification?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: 'website' | 'article';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  articlePublishedTime?: string; // ISO
  articleModifiedTime?: string; // ISO
  articleSection?: string;
  articleTags?: string[];
  prevUrl?: string;
  nextUrl?: string;
}

export const SEOHead = ({ title, description, keywords, structuredData, canonical, robots, googleSiteVerification, ogTitle, ogDescription, ogImage, ogUrl, ogType = 'website', twitterTitle, twitterDescription, twitterImage, articlePublishedTime, articleModifiedTime, articleSection, articleTags, prevUrl, nextUrl }: SEOHeadProps) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Update title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      } else {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        metaDesc.setAttribute('content', description);
        document.head.appendChild(metaDesc);
      }
    }

    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      } else {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        metaKeywords.setAttribute('content', keywords);
        document.head.appendChild(metaKeywords);
      }
    }

    // Robots control
    if (robots) {
      let metaRobots = document.querySelector('meta[name="robots"]');
      if (metaRobots) {
        metaRobots.setAttribute('content', robots);
      } else {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        metaRobots.setAttribute('content', robots);
        document.head.appendChild(metaRobots);
      }
    }

    // Canonical link
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (linkCanonical) {
        linkCanonical.setAttribute('href', canonical);
      } else {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        linkCanonical.setAttribute('href', canonical);
        document.head.appendChild(linkCanonical);
      }
    }

    // Prev/Next links
    const setLinkRel = (rel: 'prev' | 'next', href?: string) => {
      const selector = `link[rel="${rel}"]`;
      let el = document.querySelector(selector) as HTMLLinkElement | null;
      if (href) {
        if (el) {
          el.setAttribute('href', href);
        } else {
          el = document.createElement('link');
          el.setAttribute('rel', rel);
          el.setAttribute('href', href);
          document.head.appendChild(el);
        }
      } else if (el) {
        document.head.removeChild(el);
      }
    };
    setLinkRel('prev', prevUrl);
    setLinkRel('next', nextUrl);

    // OpenGraph
    const setOG = (property: string, content?: string) => {
      if (!content) return;
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };
    setOG('og:title', ogTitle || title || undefined);
    setOG('og:description', ogDescription || description || undefined);
    setOG('og:image', ogImage);
    setOG('og:url', ogUrl || canonical);
    setOG('og:type', ogType);

    // Article-specific OG
    if (ogType === 'article') {
      setOG('article:published_time', articlePublishedTime);
      setOG('article:modified_time', articleModifiedTime || articlePublishedTime);
      if (articleSection) setOG('article:section', articleSection);
      if (articleTags && articleTags.length) {
        document.querySelectorAll('meta[property="article:tag"]').forEach((el) => el.parentElement?.removeChild(el));
        articleTags.forEach((tag) => setOG('article:tag', tag));
      }
    }

    // Twitter
    const setTwitter = (name: string, content?: string) => {
      if (!content) return;
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };
    setTwitter('twitter:card', 'summary_large_image');
    setTwitter('twitter:title', twitterTitle || ogTitle || title || undefined);
    setTwitter('twitter:description', twitterDescription || ogDescription || description || undefined);
    setTwitter('twitter:image', twitterImage || ogImage);

    // Optional Google Search Console verification override
    if (googleSiteVerification) {
      let metaGSC = document.querySelector('meta[name="google-site-verification"]');
      if (metaGSC) {
        metaGSC.setAttribute('content', googleSiteVerification);
      } else {
        metaGSC = document.createElement('meta');
        metaGSC.setAttribute('name', 'google-site-verification');
        metaGSC.setAttribute('content', googleSiteVerification);
        document.head.appendChild(metaGSC);
      }
    }

    // Add structured data
    let script: HTMLScriptElement | null = null;
    if (structuredData) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
      
      return () => {
      if (script) {
        document.head.removeChild(script);
      }
      };
  }, [title, description, keywords, structuredData, canonical, robots, googleSiteVerification, ogTitle, ogDescription, ogImage, ogUrl, ogType, twitterTitle, twitterDescription, twitterImage, articlePublishedTime, articleModifiedTime, articleSection, articleTags, prevUrl, nextUrl]);

  return null;
};