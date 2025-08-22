import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInformationOpen, setIsInformationOpen] = useState(false);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Meetings', href: '/meetings' },
  ];

  const policiesItems = [
    { name: 'Cancellation Policy', href: '/cancellation-policy' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms and Conditions', href: '/terms-and-conditions' },
  ];

  const moreItems = [
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  const informationItems = [
    { name: 'Presentation Guidelines', href: '/presentation-guidelines' },
    { name: 'Visa and Invitation Letter', href: '/visa-invitation' },
  ];

  const isConferencePage = currentPath.includes('/conference/');
  const isVisaInvitationPage = currentPath.includes('/visa-invitation');
  const isPresentationGuidelinesPage = currentPath.includes('/presentation-guidelines');

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0 min-w-0">
            <a href="/" className="flex items-center gap-3 group">
              {/* Logo Icon */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                <img 
                  src="/src/assets/atom-logo-1.png" 
                  alt="The Atom Conferences Logo"
                  className="w-full h-full object-contain filter drop-shadow-sm hover:drop-shadow-md transition-all duration-300"
                  style={{
                    imageRendering: 'crisp-edges'
                  }}
                  onError={(e) => {
                    // Fallback to a simple SVG if image fails to load
                    const target = e.currentTarget as HTMLImageElement;
                    const nextElement = target.nextElementSibling as HTMLElement;
                    if (target && nextElement) {
                      target.style.display = 'none';
                      nextElement.style.display = 'block';
                    }
                  }}
                />
                {/* Fallback SVG */}
                <svg 
                  viewBox="0 0 40 40" 
                  className="w-full h-full hidden"
                  fill="none"
                >
                  {/* Central nucleus point */}
                  <circle cx="20" cy="20" r="1.5" fill="url(#logoGradient)" />
                  
                  {/* Intertwined curved lines forming atomic structure */}
                  <path 
                    d="M20 8 Q28 12 32 20 Q28 28 20 32 Q12 28 8 20 Q12 12 20 8" 
                    stroke="url(#logoGradient)" 
                    strokeWidth="2" 
                    fill="none"
                    opacity="0.9"
                  />
                  
                  <path 
                    d="M20 6 Q30 15 30 20 Q30 25 20 34 Q10 25 10 20 Q10 15 20 6" 
                    stroke="url(#logoGradient)" 
                    strokeWidth="1.5" 
                    fill="none"
                    opacity="0.7"
                  />
                  
                  <path 
                    d="M20 4 Q32 18 32 20 Q32 22 20 36 Q8 22 8 20 Q8 18 20 4" 
                    stroke="url(#logoGradient)" 
                    strokeWidth="1" 
                    fill="none"
                    opacity="0.5"
                  />
                  
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06B6D4" />
                      <stop offset="50%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              {/* Vertical Separator Line */}
              <div className="w-0.5 h-8 sm:h-10 bg-gray-400 group-hover:bg-primary transition-colors duration-300" />
              
              {/* App Name */}
              <div className="flex flex-col gap-0">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent group-hover:from-primary/80 group-hover:via-blue-600/80 group-hover:to-secondary/80 transition-all duration-300 leading-tight">
                  The Atom
                </span>
                <span className="text-sm sm:text-base lg:text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-tight">
                  Conferences
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center ml-16">
            <div className="flex items-center space-x-8 xl:space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary px-4 py-2 text-base font-bold transition-colors duration-200 rounded-lg hover:bg-secondary/10 whitespace-nowrap"
                >
                  {item.name}
                </a>
              ))}
              
              {/* POLICIES Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsPoliciesOpen(!isPoliciesOpen)}
                  onBlur={() => setTimeout(() => setIsPoliciesOpen(false), 200)}
                  className="text-foreground hover:text-primary px-4 py-2 text-base font-bold transition-colors duration-200 rounded-lg hover:bg-secondary/10 whitespace-nowrap flex items-center gap-1"
                >
                  Policies
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isPoliciesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isPoliciesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      {policiesItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-200"
                          onClick={() => setIsPoliciesOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* MORE Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  onBlur={() => setTimeout(() => setIsMoreOpen(false), 200)}
                  className="text-foreground hover:text-primary px-4 py-2 text-base font-bold transition-colors duration-200 rounded-lg hover:bg-secondary/10 whitespace-nowrap flex items-center gap-1"
                >
                  More
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isMoreOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      {moreItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-200"
                          onClick={() => setIsMoreOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* INFORMATION Dropdown - Only show on Conference pages */}
              {(isConferencePage || isVisaInvitationPage || isPresentationGuidelinesPage) && (
                <div className="relative">
                  <button
                    onClick={() => setIsInformationOpen(!isInformationOpen)}
                    onBlur={() => setTimeout(() => setIsInformationOpen(false), 200)}
                    className="text-foreground hover:text-primary px-4 py-2 text-base font-bold transition-colors duration-200 rounded-lg hover:bg-secondary/10 whitespace-nowrap flex items-center gap-1"
                  >
                    Information
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isInformationOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isInformationOpen && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        {informationItems.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-200"
                            onClick={() => setIsInformationOpen(false)}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button with larger touch target */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary p-3 -mr-2 touch-manipulation"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation with improved spacing and touch targets */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-3 pt-3 pb-4 space-y-2 bg-background border-t border-border">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary hover:bg-secondary/10 block px-4 py-3 text-lg font-bold rounded-lg transition-colors duration-200 touch-manipulation"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* POLICIES Dropdown for Mobile */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsPoliciesOpen(!isPoliciesOpen)}
                  className="text-foreground hover:text-primary hover:bg-secondary/10 block w-full text-left px-4 py-3 text-lg font-bold rounded-lg transition-colors duration-200 touch-manipulation flex items-center justify-between"
                >
                  <span>POLICIES</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isPoliciesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isPoliciesOpen && (
                  <div className="ml-4 space-y-1">
                    {policiesItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-foreground hover:text-primary hover:bg-secondary/10 block px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 touch-manipulation"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsPoliciesOpen(false);
                        }}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* MORE Dropdown for Mobile */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className="text-foreground hover:text-primary hover:bg-secondary/10 block w-full text-left px-4 py-3 text-lg font-bold rounded-lg transition-colors duration-200 touch-manipulation flex items-center justify-between"
                >
                  <span>MORE</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isMoreOpen && (
                  <div className="ml-4 space-y-1">
                    {moreItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-foreground hover:text-primary hover:bg-secondary/10 block px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 touch-manipulation"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsMoreOpen(false);
                        }}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              
              {/* INFORMATION Dropdown for Mobile - Only show on Conference pages */}
              {(isConferencePage || isVisaInvitationPage || isPresentationGuidelinesPage) && (
                <div className="space-y-1">
                  <button
                    onClick={() => setIsInformationOpen(!isInformationOpen)}
                    className="text-foreground hover:text-primary hover:bg-secondary/10 block w-full text-left px-4 py-3 text-lg font-bold rounded-lg transition-colors duration-200 touch-manipulation flex items-center justify-between"
                  >
                    <span>INFORMATION</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isInformationOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isInformationOpen && (
                    <div className="ml-4 space-y-1">
                      {informationItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="text-foreground hover:text-primary hover:bg-secondary/10 block px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 touch-manipulation"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsInformationOpen(false);
                          }}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;