import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Info, Cookie, Shield, Settings, X } from 'lucide-react';
import CookieManager from '@/lib/cookieManager';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = CookieManager.getConsent();
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    
    setPreferences(allAccepted);
    saveConsent(allAccepted);
    setShowConsent(false);
  };

  const handleAcceptSelected = () => {
    saveConsent(preferences);
    setShowConsent(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    
    setPreferences(onlyNecessary);
    saveConsent(onlyNecessary);
    setShowConsent(false);
  };

  const saveConsent = (consent: CookiePreferences) => {
    CookieManager.saveConsent(consent);
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cookie className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-lg">Cookie Preferences</CardTitle>
                <CardDescription>
                  We use cookies to enhance your experience and analyze site usage
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConsent(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Cookie Categories */}
          <div className="space-y-3">
            {/* Necessary Cookies */}
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <Label className="font-medium">Necessary Cookies</Label>
                  <p className="text-sm text-muted-foreground">
                    Essential for the website to function properly
                  </p>
                </div>
              </div>
              <Checkbox checked={preferences.necessary} disabled />
            </div>

            {/* Functional Cookies */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-blue-600" />
                <div>
                  <Label className="font-medium">Functional Cookies</Label>
                  <p className="text-sm text-muted-foreground">
                    Remember your preferences and settings
                  </p>
                </div>
              </div>
              <Checkbox 
                checked={preferences.functional}
                onCheckedChange={(checked) => updatePreference('functional', checked as boolean)}
              />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-purple-600" />
                <div>
                  <Label className="font-medium">Analytics Cookies</Label>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how visitors use our website
                  </p>
                </div>
              </div>
              <Checkbox 
                checked={preferences.analytics}
                onCheckedChange={(checked) => updatePreference('analytics', checked as boolean)}
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Cookie className="h-5 w-5 text-orange-600" />
                <div>
                  <Label className="font-medium">Marketing Cookies</Label>
                  <p className="text-sm text-muted-foreground">
                    Used to deliver personalized content and ads
                  </p>
                </div>
              </div>
              <Checkbox 
                checked={preferences.marketing}
                onCheckedChange={(checked) => updatePreference('marketing', checked as boolean)}
              />
            </div>
          </div>

          {/* Details Toggle */}
          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
          </div>

          {/* Detailed Information */}
          {showDetails && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium">What are cookies?</h4>
              <p className="text-sm text-muted-foreground">
                Cookies are small text files stored on your device that help us provide and improve our services. 
                They enable certain features and remember your preferences.
              </p>
              
              <Separator />
              
              <div className="space-y-2">
                <h5 className="font-medium text-sm">Necessary Cookies:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Session management and security</li>
                  <li>• Basic website functionality</li>
                  <li>• Cannot be disabled</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-sm">Functional Cookies:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Remember your sidebar preferences</li>
                  <li>• Store form data temporarily</li>
                  <li>• Enhance user experience</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-sm">Analytics Cookies:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Website usage statistics</li>
                  <li>• Performance monitoring</li>
                  <li>• User behavior insights</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-sm">Marketing Cookies:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Personalized content delivery</li>
                  <li>• Targeted advertising</li>
                  <li>• Social media integration</li>
                </ul>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={handleAcceptAll}
              className="flex-1"
            >
              Accept All Cookies
            </Button>
            
            <Button 
              onClick={handleAcceptSelected}
              variant="outline"
              className="flex-1"
            >
              Accept Selected
            </Button>
            
            <Button 
              onClick={handleRejectAll}
              variant="outline"
              className="flex-1"
            >
              Reject All
            </Button>
          </div>

          {/* Privacy Policy Link */}
          <div className="text-center text-sm text-muted-foreground">
            By using our website, you agree to our{' '}
            <a href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms-and-conditions" className="text-primary hover:underline">
              Terms of Service
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;
