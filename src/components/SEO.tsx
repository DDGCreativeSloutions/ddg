
import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  schema?: object;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noindex?: boolean;
  alternateLanguages?: Array<{
    hreflang: string;
    href: string;
  }>;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

const SEO = ({ 
  title, 
  description, 
  schema, 
  keywords,
  canonical,
  ogImage = "https://www.designdelivergrow.store/og-image.jpg",
  ogType = "website",
  article,
  noindex = false,
  alternateLanguages,
  breadcrumbs
}: SEOProps) => {
  const siteUrl = "https://www.designdelivergrow.store";
  const fullTitle = title.includes("DesignDeliverGrow") ? title : `${title} | DesignDeliverGrow`;
  const canonicalUrl = canonical || window.location.href;

  // Enhanced Schema.org markup
  const enhancedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization Schema
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "DesignDeliverGrow",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo.png`,
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://www.linkedin.com/company/designdelivergrow",
          "https://www.facebook.com/designdelivergrow",
          "https://twitter.com/designdelivergrow",
          "https://www.instagram.com/designdelivergrow"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-9876543210",
          "contactType": "customer service",
          "email": "info@designdelivergrow.store",
          "availableLanguage": ["English", "Hindi"]
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN",
          "addressRegion": "India"
        },
        "foundingDate": "2023",
        "description": "Professional web design, student project assistance, social media marketing, and educational workshops for digital growth."
      },
      // Website Schema
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "DesignDeliverGrow",
        "description": "Empowering students, startups, and professionals to design, deliver, and grow in the digital world.",
        "publisher": {
          "@id": `${siteUrl}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${siteUrl}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      // Breadcrumb Schema
      ...(breadcrumbs ? [{
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      }] : []),
      // Custom schema if provided
      ...(schema ? [schema] : [])
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots Meta */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="DesignDeliverGrow" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Article specific OG tags */}
      {article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags && article.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@designdelivergrow" />
      <meta name="twitter:creator" content="@designdelivergrow" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="DesignDeliverGrow" />
      <meta name="publisher" content="DesignDeliverGrow" />
      <meta name="copyright" content="© 2024 DesignDeliverGrow. All rights reserved." />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Alternate Language Links */}
      {alternateLanguages && alternateLanguages.map(lang => (
        <link key={lang.hreflang} rel="alternate" hrefLang={lang.hreflang} href={lang.href} />
      ))}
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Enhanced Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(enhancedSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
