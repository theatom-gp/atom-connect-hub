// Structured data utilities for SEO
import { Conference, Speaker } from './conferences';

interface StructuredDataProps {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price?: number;
  currency: string;
  image: string;
  organizer: string;
  url: string;
  category: string;
  speakers?: Speaker[];
}

export const generateConferenceStructuredData = (props: StructuredDataProps) => {
  const {
    id,
    title,
    description,
    date,
    location,
    price,
    currency,
    image,
    organizer,
    url,
    category,
    speakers = []
  } = props;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": title,
    "description": description,
    "startDate": date,
    "location": {
      "@type": "Place",
      "name": location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": location
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": organizer
    },
    "url": url,
    "image": image,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "category": category
  };

  // Add price if available
  if (price) {
    structuredData["offers"] = {
      "@type": "Offer",
      "price": price,
      "priceCurrency": currency,
      "availability": "https://schema.org/InStock"
    };
  }

  // Add speakers if available
  if (speakers.length > 0) {
    structuredData["performer"] = speakers.map(speaker => ({
      "@type": "Person",
      "name": speaker.name,
      "jobTitle": speaker.title,
      "worksFor": {
        "@type": "Organization",
        "name": speaker.organization
      }
    }));
  }

  return structuredData;
};
