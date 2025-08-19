import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInformationOpen, setIsInformationOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Meetings', href: '/meetings' },
    { name: 'Cancellation Policy', href: '/cancellation-policy' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms and Conditions', href: '/terms-and-conditions' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
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
            <a href="/" className="text-lg sm:text-xl lg:text-2xl font-bold text-primary hover:text-primary/80 transition-colors truncate">
              <span className="sm:hidden">Atom</span>
              <span className="hidden sm:inline">Atom Conferences</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-secondary/10 whitespace-nowrap"
                >
                  {item.name}
                </a>
              ))}
              
              {/* INFORMATION Dropdown - Only show on Conference pages */}
              {(isConferencePage || isVisaInvitationPage || isPresentationGuidelinesPage) && (
                <div className="relative">
                  <button
                    onClick={() => setIsInformationOpen(!isInformationOpen)}
                    onBlur={() => setTimeout(() => setIsInformationOpen(false), 200)}
                    className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-secondary/10 whitespace-nowrap flex items-center gap-1"
                  >
                    INFORMATION
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
                  className="text-foreground hover:text-primary hover:bg-secondary/10 block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 touch-manipulation"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* INFORMATION Dropdown for Mobile - Only show on Conference pages */}
              {(isConferencePage || isVisaInvitationPage || isPresentationGuidelinesPage) && (
                <div className="space-y-1">
                  <button
                    onClick={() => setIsInformationOpen(!isInformationOpen)}
                    className="text-foreground hover:text-primary hover:bg-secondary/10 block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 touch-manipulation flex items-center justify-between"
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