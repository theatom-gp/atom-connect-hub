// Image Utility for handling images in development and production
// Includes cache-busting and proper path resolution

export interface ImageConfig {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  cacheBust?: boolean;
}

// Cache-busting parameter (increment this when you update images)
const CACHE_BUST_VERSION = '1.0.0';

/**
 * Smart image path resolver that handles both development and production paths
 * Automatically maps source paths to build output paths with proper caching
 * @param imagePath - Path relative to src/assets
 * @param cacheBust - Whether to add cache-busting
 * @returns URL string for the image
 */
export const getImagePath = (imagePath: string, cacheBust: boolean = true): string => {
  // Remove any leading slashes or src/assets prefixes
  const cleanPath = imagePath.replace(/^\/?(src\/assets\/)?/, '');
  
  // Check if we're in development by looking for Vite's dev server
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isDev) {
    // Development: Use Vite's asset handling
    return `/src/assets/${cleanPath}`;
  } else {
    // Production: Smart path resolution with proper caching
    const resolvedPath = resolveProductionPath(cleanPath);
    if (cacheBust) {
      return `/assets/images/${resolvedPath}?v=${CACHE_BUST_VERSION}`;
    }
    return `/assets/images/${resolvedPath}`;
  }
};

/**
 * Smart production path resolver
 * Maps source paths to actual build output paths with hashed filenames
 * @param sourcePath - Source image path (e.g., "aisummit/bg.avif")
 * @returns Resolved path for production
 */
const resolveProductionPath = (sourcePath: string): string => {
  // Extract filename from path (Vite flattens the structure)
  const pathParts = sourcePath.split('/');
  const filename = pathParts[pathParts.length - 1]; // e.g., "bg.avif"
  const nameWithoutExt = filename.split('.')[0]; // e.g., "bg"
  const extension = filename.split('.').slice(1).join('.'); // e.g., "avif"
  
  // Map common patterns to their hashed equivalents
  const imageMapping: Record<string, string> = {
    // Conference background images
    'aisummit/bg.avif': 'bg-Cv16uIU5.avif',
    'forensicscience/bg.jpeg': 'bg-BGW95BAm.jpeg',
    'powerandenergy/bg.jpeg': 'bg-CJHBq38j.jpeg',
    'quantumcomputing/bg.jpg': 'bg-CsxxGvWw.jpg',
    'globalhealthcarerevolution/bg.jpg': 'bg-C6ZJ-S08.jpg',
    'biomaterials/bg.jpeg': 'bg-DuJmZQLc.jpeg',
    'surgeryandanesthesia/bg.jpeg': 'bg-DsHtk3pp.jpeg',
    'neurology/bg.jpeg': 'bg-DUP8yPgh.jpeg',
    
    // Conference images
    'conference-ai.jpg': 'hero-conference-BJPAZ91T.jpg',
    'conference-sustainability.jpg': 'bg-2-CM2vepbU.webp',
    
    // Speaker images
    'aisummit/speaker-1.jpg': 'speaker-1-CdcMzd_R.jpg',
    'aisummit/speaker-2.jpg': 'speaker-2-Dx5bl-PQ.jpg',
    'aisummit/speaker-3.jpg': 'speaker-3-7QRnQnoy.jpg',
    'aisummit/speaker-4.jpg': 'speaker-4-D6d6KBYY.jpg',
    
    // Venue images
    'aisummit/aisummit-venue.jpg': 'venue-conference-room-CbjRkVRr.jpg',
    'aisummit/conference.png': 'venue-exhibition-DJu2JRq-.jpg',
    'aisummit/lobby.jpg': 'venue-interior-Dn8n9XxD.jpg',
    'aisummit/city.jpg': 'venue-networking-D6hR5MfV.jpg',
    
    // Other images
    'about-us.jpg': 'about-us-BhN4udhJ.jpg',
    'mission.jpg': 'mission-ClZkuCMs.jpg',
    'vision.jpg': 'vision-zPSz0Yb7.jpg',
    'chairperson-tech.jpg': 'chairperson-DBVK5k6u.jpg',
    'hero-conference.jpg': 'hero-conference-BJPAZ91T.jpg',
    
    // Fallback images
    'placeholder.svg': 'placeholder.svg',
    'favicon.ico': 'favicon.ico'
  };
  
  // Return mapped path if exists, otherwise return filename (fallback)
  return imageMapping[sourcePath] || filename;
};

/**
 * Get image path for CSS background images
 * @param imagePath - Path relative to src/assets
 * @param cacheBust - Whether to add cache-busting
 * @returns URL string for CSS background-image
 */
export const getBackgroundImageUrl = (imagePath: string, cacheBust: boolean = true): string => {
  const path = getImagePath(imagePath, cacheBust);
  return `url('${path}')`;
};

/**
 * Get image path for img src attributes
 * @param imagePath - Path relative to src/assets
 * @param cacheBust - Whether to add cache-busting
 * @returns URL string for img src
 */
export const getImageSrc = (imagePath: string, cacheBust: boolean = true): string => {
  return getImagePath(imagePath, cacheBust);
};

/**
 * Get image path for conference images
 * @param conferenceId - Conference identifier
 * @param imageName - Image filename
 * @param cacheBust - Whether to add cache-busting
 * @returns Full image path
 */
export const getConferenceImage = (conferenceId: string, imageName: string, cacheBust: boolean = true): string => {
  return getImagePath(`${conferenceId}/${imageName}`, cacheBust);
};

/**
 * Get image path for general assets
 * @param imageName - Image filename
 * @param cacheBust - Whether to add cache-busting
 * @returns Full image path
 */
export const getAssetImage = (imageName: string, cacheBust: boolean = true): string => {
  return getImagePath(imageName, cacheBust);
};

/**
 * Preload image for better performance
 * @param imagePath - Path relative to src/assets
 */
export const preloadImage = (imagePath: string): void => {
  const img = new Image();
  img.src = getImagePath(imagePath, true);
};

/**
 * Get image dimensions (placeholder for future implementation)
 * @param imagePath - Path relative to src/assets
 * @returns Promise with image dimensions
 */
export const getImageDimensions = async (imagePath: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = getImagePath(imagePath, false);
  });
};

/**
 * Check if image exists
 * @param imagePath - Path relative to src/assets
 * @returns Promise with boolean
 */
export const imageExists = async (imagePath: string): Promise<boolean> => {
  try {
    const response = await fetch(getImagePath(imagePath, false), { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Get fallback image path
 * @param primaryPath - Primary image path
 * @param fallbackPath - Fallback image path
 * @returns Fallback path if primary doesn't exist
 */
export const getImageWithFallback = async (
  primaryPath: string, 
  fallbackPath: string = 'placeholder.svg'
): Promise<string> => {
  const exists = await imageExists(primaryPath);
  return exists ? getImagePath(primaryPath) : getImagePath(fallbackPath);
};

// Export commonly used image paths
export const COMMON_IMAGES = {
  // Hero images
  HERO_CONFERENCE: 'hero-conference.jpg',
  HERO_TECH_BACKGROUND: 'hero-tech-background.jpg',
  
  // Conference backgrounds
  CONFERENCE_AI: 'conference-ai.jpg',
  CONFERENCE_SUSTAINABILITY: 'conference-sustainability.jpg',
  
  // Logos
  ATOM_LOGO: 'atom-logo.png',
  ATOM_LOGO_1: 'atom-logo-1.png',
  
  // Payment methods
  PAYPAL: 'paypal-1.png',
  STRIPE: 'stripe-1.png',
  
  // Placeholder
  PLACEHOLDER: 'placeholder.svg'
} as const;

// Type for common image keys
export type CommonImageKey = keyof typeof COMMON_IMAGES;

/**
 * Get common image by key
 * @param key - Common image key
 * @param cacheBust - Whether to add cache-busting
 * @returns Image path
 */
export const getCommonImage = (key: CommonImageKey, cacheBust: boolean = true): string => {
  return getImagePath(COMMON_IMAGES[key], cacheBust);
};

export default {
  getImagePath,
  getBackgroundImageUrl,
  getImageSrc,
  getConferenceImage,
  getAssetImage,
  preloadImage,
  getImageDimensions,
  imageExists,
  getImageWithFallback,
  getCommonImage,
  COMMON_IMAGES
};
