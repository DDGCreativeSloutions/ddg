
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
  faqSchema?: Array<{
    question: string;
    answer: string;
  }>;
  reviewSchema?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
  localBusinessSchema?: {
    address?: string;
    telephone?: string;
    priceRange?: string;
    openingHours?: string[];
  };
  productSchema?: {
    name: string;
    price: string;
    currency: string;
    availability: string;
    condition: string;
  };
  courseSchema?: {
    name: string;
    description: string;
    provider: string;
    courseMode: string;
    duration: string;
  };
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
  breadcrumbs,
  faqSchema,
  reviewSchema,
  localBusinessSchema,
  productSchema,
  courseSchema
}: SEOProps) => {
  const siteUrl = "https://www.designdelivergrow.store";
  const fullTitle = title.includes("DesignDeliverGrow") ? title : `${title} | DesignDeliverGrow`;
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : siteUrl);

  // Enhanced Schema.org markup
  const enhancedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization Schema
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "DesignDeliverGrow",
        "alternateName": "DDG",
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
          "https://www.instagram.com/designdelivergrow",
          "https://github.com/designdelivergrow",
          "https://www.youtube.com/@designdelivergrow"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91-9876543210",
            "contactType": "customer service",
            "email": "info@designdelivergrow.store",
            "availableLanguage": ["English", "Hindi"],
            "areaServed": "IN"
          },
          {
            "@type": "ContactPoint",
            "contactType": "technical support",
            "email": "support@designdelivergrow.store",
            "availableLanguage": ["English", "Hindi"]
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN",
          "addressRegion": "India",
          "addressLocality": "India"
        },
        "foundingDate": "2023",
        "description": "Professional web design, student project assistance, social media marketing, and educational workshops for digital growth.",
        "knowsAbout": [
          "Web Development",
          "React Development",
          "Node.js Development",
          "Student Project Assistance",
          "Social Media Marketing",
          "Digital Marketing",
          "Educational Workshops",
          "AI/ML Projects",
          "Full Stack Development",
          "UI/UX Design"
        ],
        "serviceArea": {
          "@type": "Country",
          "name": "India"
        },
        "aggregateRating": reviewSchema ? {
          "@type": "AggregateRating",
          "ratingValue": reviewSchema.ratingValue,
          "reviewCount": reviewSchema.reviewCount,
          "bestRating": reviewSchema.bestRating || 5,
          "worstRating": reviewSchema.worstRating || 1
        } : undefined
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
        },
        "inLanguage": "en-IN",
        "copyrightYear": "2024",
        "copyrightHolder": {
          "@id": `${siteUrl}/#organization`
        }
      },
      // Local Business Schema (if provided)
      ...(localBusinessSchema ? [{
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        "name": "DesignDeliverGrow",
        "image": `${siteUrl}/logo.png`,
        "telephone": localBusinessSchema.telephone || "+91-9876543210",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": localBusinessSchema.address || "",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "28.6139",
          "longitude": "77.2090"
        },
        "url": siteUrl,
        "priceRange": localBusinessSchema.priceRange || "₹₹",
        "openingHoursSpecification": localBusinessSchema.openingHours?.map(hours => ({
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": hours.split(":")[0],
          "opens": hours.split(":")[1]?.split("-")[0],
          "closes": hours.split(":")[1]?.split("-")[1]
        })) || []
      }] : []),
      // FAQ Schema (if provided)
      ...(faqSchema ? [{
        "@type": "FAQPage",
        "mainEntity": faqSchema.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }] : []),
      // Product Schema (if provided)
      ...(productSchema ? [{
        "@type": "Product",
        "name": productSchema.name,
        "description": description,
        "offers": {
          "@type": "Offer",
          "price": productSchema.price,
          "priceCurrency": productSchema.currency,
          "availability": `https://schema.org/${productSchema.availability}`,
          "itemCondition": `https://schema.org/${productSchema.condition}`,
          "seller": {
            "@id": `${siteUrl}/#organization`
          }
        }
      }] : []),
      // Course Schema (if provided)
      ...(courseSchema ? [{
        "@type": "Course",
        "name": courseSchema.name,
        "description": courseSchema.description,
        "provider": {
          "@type": "Organization",
          "name": courseSchema.provider,
          "sameAs": siteUrl
        },
        "courseMode": courseSchema.courseMode,
        "duration": courseSchema.duration,
        "inLanguage": "en-IN"
      }] : []),
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
    ].filter(Boolean)
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Enhanced Language and Locale */}
      <html lang="en-IN" />
      <meta httpEquiv="content-language" content="en-IN" />
      <meta name="language" content="en-IN" />
      
      {/* Robots Meta - Enhanced */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <meta name="bingbot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="slurp" content={noindex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Open Graph Meta Tags - Enhanced */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:site_name" content="DesignDeliverGrow" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="hi_IN" />
      <meta property="fb:app_id" content="your-facebook-app-id" />
      
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
      
      {/* Twitter Card Meta Tags - Enhanced */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@designdelivergrow" />
      <meta name="twitter:creator" content="@designdelivergrow" />
      <meta name="twitter:domain" content="designdelivergrow.store" />
      
      {/* LinkedIn Meta Tags */}
      <meta property="linkedin:owner" content="designdelivergrow" />
      
      {/* Additional SEO Meta Tags - Enhanced */}
      <meta name="author" content="DesignDeliverGrow" />
      <meta name="publisher" content="DesignDeliverGrow" />
      <meta name="copyright" content="© 2024 DesignDeliverGrow. All rights reserved." />
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      <meta name="geo.placename" content="India" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="3 days" />
      <meta name="expires" content="never" />
      <meta name="cache-control" content="public" />
      
      {/* Theme and Brand Colors */}
      <meta name="theme-color" content="#9333ea" />
      <meta name="msapplication-TileColor" content="#9333ea" />
      <meta name="msapplication-navbutton-color" content="#9333ea" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Mobile Optimization - Enhanced */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      <meta name="format-detection" content="telephone=yes, date=no, email=no, address=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="DesignDeliverGrow" />
      <meta name="application-name" content="DesignDeliverGrow" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Alternate Language Links */}
      {alternateLanguages && alternateLanguages.map(lang => (
        <link key={lang.hreflang} rel="alternate" hrefLang={lang.hreflang} href={lang.href} />
      ))}
      
      {/* Enhanced Performance Optimization */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      <link rel="preconnect" href="https://unpkg.com" />
      
      {/* DNS Prefetch - Enhanced */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
      <link rel="dns-prefetch" href="//unpkg.com" />
      
      {/* Preload Critical Resources */}
      <link rel="preload" href="/logo.png" as="image" type="image/png" />
      <link rel="preload" href={ogImage} as="image" type="image/jpeg" />
      
      {/* Manifest and Icons */}
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#9333ea" />
      
      {/* Microsoft Tiles */}
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Enhanced Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(enhancedSchema)}
      </script>
      
      {/* Google Site Verification */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      
      {/* Bing Site Verification */}
      <meta name="msvalidate.01" content="your-bing-verification-code" />
      
      {/* Yandex Site Verification */}
      <meta name="yandex-verification" content="your-yandex-verification-code" />
      
      {/* Pinterest Site Verification */}
      <meta name="p:domain_verify" content="your-pinterest-verification-code" />
    </Helmet>
  );
};

export default SEO;
