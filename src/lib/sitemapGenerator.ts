// Dynamic Sitemap Generator for Atom Conferences
import { conferences } from './conferences';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface DynamicSitemapData {
  conferences: Array<{
    id: string;
    title: string;
    lastModified: string;
    priority: number;
  }>;
  abstracts?: Array<{
    id: string;
    conferenceId: string;
    title: string;
    lastModified: string;
  }>;
  speakers?: Array<{
    id: string;
    name: string;
    lastModified: string;
  }>;
}

// Generate sitemap URLs from static pages
const getStaticPages = (): SitemapUrl[] => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return [
    {
      loc: 'https://www.theatomconferences.com/',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: 'https://www.theatomconferences.com/meetings',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: 'https://www.theatomconferences.com/submit-abstract',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: 'https://www.theatomconferences.com/registration',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: 'https://www.theatomconferences.com/contact',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: 'https://www.theatomconferences.com/faq',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: 'https://www.theatomconferences.com/privacy-policy',
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: 'https://www.theatomconferences.com/terms-and-conditions',
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: 'https://www.theatomconferences.com/cancellation-policy',
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: 'https://www.theatomconferences.com/presentation-guidelines',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      loc: 'https://www.theatomconferences.com/visa-invitation',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6
    }
  ];
};

// Generate conference pages from conferences data
const getConferencePages = (): SitemapUrl[] => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return conferences.map(conference => ({
    loc: `https://www.theatomconferences.com/conference/${conference.id}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: 0.9
  }));
};

// Generate dynamic content pages (for future use)
const getDynamicPages = (data: DynamicSitemapData): SitemapUrl[] => {
  const urls: SitemapUrl[] = [];
  
  // Conference pages with dynamic data
  if (data.conferences) {
    data.conferences.forEach(conference => {
      urls.push({
        loc: `https://www.theatomconferences.com/conference/${conference.id}`,
        lastmod: conference.lastModified,
        changefreq: 'weekly',
        priority: conference.priority
      });
    });
  }
  
  // Abstract pages (if you want to make them public)
  if (data.abstracts) {
    data.abstracts.forEach(abstract => {
      urls.push({
        loc: `https://www.theatomconferences.com/abstract/${abstract.id}`,
        lastmod: abstract.lastModified,
        changefreq: 'monthly',
        priority: 0.5
      });
    });
  }
  
  // Speaker pages (if you want to create them)
  if (data.speakers) {
    data.speakers.forEach(speaker => {
      urls.push({
        loc: `https://www.theatomconferences.com/speaker/${speaker.id}`,
        lastmod: speaker.lastModified,
        changefreq: 'monthly',
        priority: 0.6
      });
    });
  }
  
  return urls;
};

// Generate complete sitemap XML
export const generateSitemap = (dynamicData?: DynamicSitemapData): string => {
  const staticPages = getStaticPages();
  const conferencePages = getConferencePages();
  const dynamicPages = dynamicData ? getDynamicPages(dynamicData) : [];
  
  const allUrls = [...staticPages, ...conferencePages, ...dynamicPages];
  
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemapXml;
};

// Generate sitemap index for multiple sitemaps (for large sites)
export const generateSitemapIndex = (sitemaps: Array<{ url: string; lastmod: string }>): string => {
  const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${sitemap.url}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return sitemapIndexXml;
};

// Utility to update sitemap when content changes
export const updateSitemap = async (dynamicData: DynamicSitemapData) => {
  try {
    const sitemapXml = generateSitemap(dynamicData);
    
    // In a real implementation, you would:
    // 1. Save to Firebase Storage
    // 2. Update Firebase Hosting
    // 3. Notify search engines
    
    console.log('Sitemap updated with dynamic data');
    return sitemapXml;
  } catch (error) {
    console.error('Failed to update sitemap:', error);
    throw error;
  }
};

// Check if sitemap needs updating
export const shouldUpdateSitemap = (lastUpdate: Date, contentLastModified: Date): boolean => {
  const hoursSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60);
  const contentIsNewer = contentLastModified > lastUpdate;
  
  return hoursSinceUpdate > 24 || contentIsNewer;
};
