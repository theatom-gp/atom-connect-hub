import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Calendar, Users, Award, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Upcoming Conferences', href: '/meetings' },
    { name: 'About Us', href: '/#about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms-and-conditions' },
    { name: 'Cancellation Policy', href: '/cancellation-policy' },
    { name: 'FAQ', href: '/faq' },
  ];

  const conferenceCategories = [
    { name: 'Technology & Innovation', href: '/meetings#tech' },
    { name: 'Medical & Healthcare', href: '/meetings#medical' },
    { name: 'Business & Finance', href: '/meetings#finance' },
    { name: 'Education & Research', href: '/meetings#education' },
    { name: 'Sustainability & Environment', href: '/meetings#sustainability' },
  ];

  const contactInfo = [
    // { icon: MapPin, text: '123 Conference Avenue, Financial District, Austin, TX 78701' },
    { icon: MapPin, text: '123 Conference Avenue, Financial District, Vijayawada, AP 520010' },
    { icon: Phone, text: '+91 (90000) (94024), +91 (81792) (66745)' },
    { icon: Mail, text: 'info@atomconferences.com' },
  ];

  const achievements = [
    { icon: Users, number: '10,000+', label: 'Global Attendees' },
    { icon: Calendar, number: '50+', label: 'Events Organized' },
    { icon: Award, number: '98%', label: 'Satisfaction Rate' },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Atom Conferences</h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Connecting minds, shaping futures. We create world-class conferences that bring together 
                industry leaders, innovators, and change-makers to drive meaningful progress across all sectors.
              </p>
            </div>
            
            {/* Trust Indicators - Mobile optimized */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-white">{achievement.number}</div>
                    <div className="text-xs text-slate-400">{achievement.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center justify-center sm:justify-start group touch-manipulation py-1"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="text-sm sm:text-base">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Conference Categories */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Conference Categories</h4>
            <ul className="space-y-2 sm:space-y-3">
              {conferenceCategories.map((category, index) => (
                <li key={index}>
                  <a 
                    href={category.href}
                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center justify-center sm:justify-start group touch-manipulation py-1"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="text-sm sm:text-base">{category.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Get In Touch</h4>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="flex items-start space-x-3 justify-center sm:justify-start">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-xs sm:text-sm text-left">{info.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Legal Links */}
            <div>
              <h5 className="text-sm font-semibold text-white mb-3">Legal & Support</h5>
              <ul className="space-y-2">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm touch-manipulation py-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-slate-700" />

      {/* Bottom Footer - Mobile optimized */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-center sm:text-left">
          <div className="text-slate-400 text-xs sm:text-sm">
            © {currentYear} Atom Conferences. All rights reserved. Empowering global knowledge exchange since 2020.
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-slate-400">
            <span className="hidden sm:inline">Follow the conversation:</span>
            <div className="flex space-x-4 sm:space-x-4">
              <a href="#" className="hover:text-white transition-colors duration-200 touch-manipulation py-2 px-2" aria-label="LinkedIn">
                LinkedIn
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200 touch-manipulation py-2 px-2" aria-label="Twitter">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200 touch-manipulation py-2 px-2" aria-label="YouTube">
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;