// Structured Data utilities for SEO optimization

export interface ConferenceData {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price?: number;
  currency?: string;
  image?: string;
  organizer: string;
  url: string;
  category: string;
  speakers?: Array<{
    name: string;
    title: string;
    organization: string;
    image?: string;
  }>;
  agenda?: Array<{
    time: string;
    title: string;
    description: string;
    speaker?: string;
  }>;
}

export const generateConferenceStructuredData = (conference: ConferenceData) => {
  const baseUrl = 'https://www.theatomconferences.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": conference.title,
    "description": conference.description,
    "startDate": conference.date,
    "endDate": conference.date, // Assuming single day events
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": conference.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": conference.location,
        "addressCountry": "US"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": conference.organizer,
      "url": baseUrl,
      "logo": `${baseUrl}/src/assets/atom-logo.png`
    },
    "offers": conference.price ? {
      "@type": "Offer",
      "price": conference.price,
      "priceCurrency": conference.currency || "USD",
      "availability": "https://schema.org/InStock",
      "url": `${baseUrl}${conference.url}`
    } : undefined,
    "image": conference.image ? `${baseUrl}${conference.image}` : `${baseUrl}/src/assets/atom-logo.png`,
    "url": `${baseUrl}${conference.url}`,
    "category": conference.category,
    "audience": {
      "@type": "Audience",
      "audienceType": "Professionals, Researchers, Academics"
    },
    "speaker": conference.speakers?.map(speaker => ({
      "@type": "Person",
      "name": speaker.name,
      "jobTitle": speaker.title,
      "worksFor": {
        "@type": "Organization",
        "name": speaker.organization
      },
      "image": speaker.image ? `${baseUrl}${speaker.image}` : undefined
    })),
    "eventSchedule": conference.agenda?.map(item => ({
      "@type": "Schedule",
      "startTime": item.time,
      "name": item.title,
      "description": item.description,
      "performer": item.speaker ? {
        "@type": "Person",
        "name": item.speaker
      } : undefined
    }))
  };
};

export const generateOrganizationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Atom Conferences",
    "url": "https://www.theatomconferences.com",
    "logo": "https://www.theatomconferences.com/src/assets/atom-logo.png",
    "description": "Leading international conference platform connecting professionals across disciplines including AI, Healthcare, Finance, Technology, and more.",
    "foundingDate": "2020",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0123",
      "contactType": "customer service",
      "email": "info@atomconferences.com",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://twitter.com/atomconferences",
      "https://linkedin.com/company/atomconferences",
      "https://facebook.com/atomconferences"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Conference Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Innovation Summit",
            "description": "Leading AI conference for professionals and researchers"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Global Healthcare Revolution",
            "description": "Healthcare innovation and research conference"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Global Finance Summit",
            "description": "Finance and fintech innovation conference"
          }
        }
      ]
    }
  };
};

export const generateWebSiteStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Atom Conferences",
    "url": "https://www.theatomconferences.com",
    "description": "Leading international conference platform connecting professionals across disciplines",
    "publisher": {
      "@type": "Organization",
      "name": "Atom Conferences",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.theatomconferences.com/src/assets/atom-logo.png"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.theatomconferences.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Conference List",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "AI Innovation Summit",
          "url": "https://www.theatomconferences.com/conference/aisummit"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Global Healthcare Revolution",
          "url": "https://www.theatomconferences.com/conference/globalhealthcarerevolution"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Global Finance Summit",
          "url": "https://www.theatomconferences.com/conference/globalfinancesummit"
        }
      ]
    }
  };
};

export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://www.theatomconferences.com${crumb.url}`
    }))
  };
};

export const generateFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};
