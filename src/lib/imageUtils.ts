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
 * Get the correct image path for both development and production
 * @param imagePath - Path relative to src/assets (e.g., 'conference-ai.jpg')
 * @returns Proper image path with cache-busting
 */
export const getImagePath = (imagePath: string, cacheBust: boolean = true): string => {
  // Remove any leading slashes or src/assets prefixes
  const cleanPath = imagePath.replace(/^\/?(src\/assets\/)?/, '');
  
  if (import.meta.env.DEV) {
    // Development: Use Vite's asset handling
    return `/src/assets/${cleanPath}`;
  } else {
    // Production: Use build output paths - Vite puts images in /assets/images/
    if (cacheBust) {
      return `/assets/${cleanPath}?v=${CACHE_BUST_VERSION}`;
    }
    return `/assets/${cleanPath}`;
  }
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
