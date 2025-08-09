import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie, Settings, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const COOKIE_CONSENT_KEY = 'gpt5ai-cookie-consent';

interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  timestamp: number;
}

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always required
    functional: true,
    analytics: false,
    timestamp: Date.now()
  });

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!savedConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(savedConsent) as CookiePreferences;
        setPreferences(saved);
      } catch (error) {
        console.error('Error loading cookie preferences:', error);
      }
    }
  }, []);

  const savePreferences = (newPreferences: CookiePreferences) => {
    const prefsWithTimestamp = {
      ...newPreferences,
      timestamp: Date.now()
    };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefsWithTimestamp));
    setPreferences(prefsWithTimestamp);
    setShowBanner(false);
    setShowSettings(false);

    // Apply cookie preferences
    applyCookiePreferences(prefsWithTimestamp);
  };

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Handle Google Analytics
    if (prefs.analytics && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    } else if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }

    // Store preferences in localStorage for other components to read
    localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
  };

  const handleAcceptAll = () => {
    savePreferences({
      essential: true,
      functional: true,
      analytics: true,
      timestamp: Date.now()
    });
  };

  const handleRejectNonEssential = () => {
    savePreferences({
      essential: true,
      functional: false,
      analytics: false,
      timestamp: Date.now()
    });
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
  };

  const updatePreference = (type: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => setShowBanner(false)}
      />
      
      {/* Cookie Banner */}
      <Card className="relative w-full max-w-2xl shadow-2xl border-2">
        <CardContent className="p-6">
          {!showSettings ? (
            // Main Banner
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Cookie className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    We use cookies to enhance your experience
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We use essential cookies to make our service work, and optional cookies to enhance your experience 
                    and understand how you use our platform. You can choose which cookies to accept.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBanner(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleAcceptAll}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Accept All Cookies
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleRejectNonEssential}
                  className="flex-1"
                >
                  Accept Essential Only
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowSettings(true)}
                  className="flex-1"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Customize
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                <Link to="/cookies" className="hover:text-blue-600 hover:underline">
                  Cookie Policy
                </Link>
                <span>•</span>
                <Link to="/privacy" className="hover:text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </div>
          ) : (
            // Settings Panel
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Cookie Preferences
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4 mb-6">
                {/* Essential Cookies */}
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex-1">
                    <h4 className="font-medium text-red-800 mb-1">Essential Cookies</h4>
                    <p className="text-sm text-red-600">
                      Required for basic website functionality. Cannot be disabled.
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className="w-12 h-6 bg-red-600 rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Functional Cookies */}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-800 mb-1">Functional Cookies</h4>
                    <p className="text-sm text-blue-600">
                      Remember your preferences and enhance your experience.
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => updatePreference('functional', !preferences.functional)}
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                        preferences.functional 
                          ? 'bg-blue-600 justify-end' 
                          : 'bg-gray-300 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                </div>
                
                {/* Analytics Cookies */}
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex-1">
                    <h4 className="font-medium text-green-800 mb-1">Analytics Cookies</h4>
                    <p className="text-sm text-green-600">
                      Help us understand how you use our service to improve it.
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => updatePreference('analytics', !preferences.analytics)}
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                        preferences.analytics 
                          ? 'bg-green-600 justify-end' 
                          : 'bg-gray-300 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleSaveCustom}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Save Preferences
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowSettings(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Hook to access cookie preferences
export const useCookiePreferences = (): CookiePreferences => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    functional: true,
    analytics: false,
    timestamp: Date.now()
  });

  useEffect(() => {
    const saved = localStorage.getItem('cookie-preferences');
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading cookie preferences:', error);
      }
    }
  }, []);

  return preferences;
};

export default CookieConsent;