// Cookie Management Utility for GDPR/CCPA Compliance

export interface CookieConsent {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
}

export class CookieManager {
  private static readonly CONSENT_KEY = 'cookieConsent';
  private static readonly CONSENT_VERSION = '1.0';
  
  // Get user's cookie consent preferences
  static getConsent(): CookieConsent | null {
    try {
      const consent = localStorage.getItem(this.CONSENT_KEY);
      if (consent) {
        const parsed = JSON.parse(consent);
        // Check if consent is still valid (not older than 1 year)
        const consentDate = new Date(parsed.timestamp);
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        
        if (consentDate > oneYearAgo) {
          return parsed;
        }
      }
      return null;
    } catch (error) {
      console.error('Error reading cookie consent:', error);
      return null;
    }
  }
  
  // Save user's cookie consent preferences
  static saveConsent(consent: Omit<CookieConsent, 'timestamp' | 'version'>): void {
    try {
      const fullConsent: CookieConsent = {
        ...consent,
        timestamp: new Date().toISOString(),
        version: this.CONSENT_VERSION
      };
      
      localStorage.setItem(this.CONSENT_KEY, JSON.stringify(fullConsent));
      
      // Apply consent preferences
      this.applyConsent(fullConsent);
    } catch (error) {
      console.error('Error saving cookie consent:', error);
    }
  }
  
  // Apply consent preferences to disable/enable features
  private static applyConsent(consent: CookieConsent): void {
    if (!consent.functional) {
      // Disable functional cookies
      localStorage.removeItem('sidebar:state');
      localStorage.removeItem('userPreferences');
    }
    
    if (!consent.analytics) {
      // Disable analytics
      localStorage.removeItem('analytics_enabled');
      localStorage.removeItem('google_analytics');
      localStorage.removeItem('mixpanel');
    }
    
    if (!consent.marketing) {
      // Disable marketing cookies
      localStorage.removeItem('marketing_enabled');
      localStorage.removeItem('facebook_pixel');
      localStorage.removeItem('google_ads');
    }
  }
  
  // Check if a specific cookie type is allowed
  static isAllowed(cookieType: keyof Omit<CookieConsent, 'timestamp' | 'version'>): boolean {
    const consent = this.getConsent();
    if (!consent) return false;
    
    // Necessary cookies are always allowed
    if (cookieType === 'necessary') return true;
    
    return consent[cookieType];
  }
  
  // Set a cookie with consent check
  static setCookie(name: string, value: string, cookieType: keyof Omit<CookieConsent, 'timestamp' | 'version'>, options?: {
    expires?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  }): boolean {
    if (!this.isAllowed(cookieType)) {
      console.warn(`Cookie '${name}' not set: ${cookieType} cookies not allowed`);
      return false;
    }
    
    try {
      let cookieString = `${name}=${encodeURIComponent(value)}`;
      
      if (options?.expires) {
        const expires = new Date();
        expires.setTime(expires.getTime() + options.expires * 1000);
        cookieString += `; expires=${expires.toUTCString()}`;
      }
      
      if (options?.path) cookieString += `; path=${options.path}`;
      if (options?.domain) cookieString += `; domain=${options.domain}`;
      if (options?.secure) cookieString += '; secure';
      if (options?.sameSite) cookieString += `; samesite=${options.sameSite}`;
      
      document.cookie = cookieString;
      return true;
    } catch (error) {
      console.error('Error setting cookie:', error);
      return false;
    }
  }
  
  // Get a cookie value
  static getCookie(name: string): string | null {
    try {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
          return decodeURIComponent(cookieValue);
        }
      }
      return null;
    } catch (error) {
      console.error('Error reading cookie:', error);
      return null;
    }
  }
  
  // Delete a cookie
  static deleteCookie(name: string, path?: string, domain?: string): void {
    try {
      let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      if (path) cookieString += `; path=${path}`;
      if (domain) cookieString += `; domain=${domain}`;
      
      document.cookie = cookieString;
    } catch (error) {
      console.error('Error deleting cookie:', error);
    }
  }
  
  // Clear all cookies (except necessary ones)
  static clearAllCookies(): void {
    try {
      const consent = this.getConsent();
      if (!consent) return;
      
      // Get all cookies
      const cookies = document.cookie.split(';');
      
      for (const cookie of cookies) {
        const cookieName = cookie.trim().split('=')[0];
        
        // Don't delete necessary cookies
        if (cookieName !== 'cookieConsent') {
          this.deleteCookie(cookieName);
        }
      }
      
      // Clear localStorage items based on consent
      if (!consent.functional) {
        localStorage.removeItem('sidebar:state');
        localStorage.removeItem('userPreferences');
      }
      
      if (!consent.analytics) {
        localStorage.removeItem('analytics_enabled');
        localStorage.removeItem('google_analytics');
        localStorage.removeItem('mixpanel');
      }
      
      if (!consent.marketing) {
        localStorage.removeItem('marketing_enabled');
        localStorage.removeItem('facebook_pixel');
        localStorage.removeItem('google_ads');
      }
    } catch (error) {
      console.error('Error clearing cookies:', error);
    }
  }
  
  // Check if consent needs renewal (older than 1 year)
  static needsRenewal(): boolean {
    const consent = this.getConsent();
    if (!consent) return true;
    
    const consentDate = new Date(consent.timestamp);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    return consentDate <= oneYearAgo;
  }
  
  // Get consent statistics for analytics
  static getConsentStats(): {
    totalConsent: number;
    functionalConsent: number;
    analyticsConsent: number;
    marketingConsent: number;
    noConsent: number;
  } {
    const consent = this.getConsent();
    
    if (!consent) {
      return {
        totalConsent: 0,
        functionalConsent: 0,
        analyticsConsent: 0,
        marketingConsent: 0,
        noConsent: 1
      };
    }
    
    return {
      totalConsent: 1,
      functionalConsent: consent.functional ? 1 : 0,
      analyticsConsent: consent.analytics ? 1 : 0,
      marketingConsent: consent.marketing ? 1 : 0,
      noConsent: 0
    };
  }
}

export default CookieManager;
