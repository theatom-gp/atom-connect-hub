// Domain Configuration for Atom Conferences
export const DOMAIN_CONFIG = {
  // Main domain
  DOMAIN: 'theatomconferences.com',
  
  // Full URLs
  BASE_URL: 'https://www.theatomconferences.com',
  WWW_URL: 'https://www.theatomconferences.com',
  
  // Social Media
  TWITTER: 'https://twitter.com/atomconferences',
  LINKEDIN: 'https://linkedin.com/company/atomconferences',
  FACEBOOK: 'https://facebook.com/atomconferences',
  
  // Contact
  EMAIL: 'info@theatomconferences.com',
  SUPPORT_EMAIL: 'support@theatomconferences.com',
  
  // SEO
  SITE_NAME: 'Atom Conferences',
  SITE_DESCRIPTION: 'Leading international conference platform connecting professionals across disciplines',
  
  // Analytics (add your tracking IDs here)
  GOOGLE_ANALYTICS_ID: '', // Add your GA4 ID
  GOOGLE_TAG_MANAGER_ID: '', // Add your GTM ID
  
  // Search Console
  GOOGLE_SITE_VERIFICATION: '', // Add your verification code
  
  // Bing Webmaster Tools
  BING_SITE_VERIFICATION: '', // Add your verification code
} as const;

// Helper function to get full URL
export const getFullUrl = (path: string = '') => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${DOMAIN_CONFIG.BASE_URL}${cleanPath}`;
};

// Helper function to get canonical URL
export const getCanonicalUrl = (path: string = '') => {
  return getFullUrl(path);
};

// Helper function to get image URL
export const getImageUrl = (imagePath: string) => {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `${DOMAIN_CONFIG.BASE_URL}${imagePath}`;
};
