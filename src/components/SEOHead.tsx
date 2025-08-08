import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  structuredData?: object;
  canonical?: string;
  robots?: string; // e.g., "index, follow" or "noindex, nofollow"
  googleSiteVerification?: string;
}

export const SEOHead = ({ title, description, keywords, structuredData, canonical, robots, googleSiteVerification }: SEOHeadProps) => {
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
  }, [title, description, keywords, structuredData, canonical, robots, googleSiteVerification]);

  return null;
};