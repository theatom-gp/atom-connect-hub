import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Calendar, Users, Award, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Upcoming Conferences', href: '/meetings' },
    { name: 'About Us', href: '/#about' },
    { name: 'Our Mission', href: '/#mission' },
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
    { icon: MapPin, text: '123 Conference Avenue, New York, NY 10001' },
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: Mail, text: 'info@atomconferences.com' },
  ];

  const achievements = [
    { icon: Users, number: '50,000+', label: 'Global Attendees' },
    { icon: Calendar, number: '200+', label: 'Events Organized' },
    { icon: Award, number: '98%', label: 'Satisfaction Rate' },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-3">Atom Conferences</h3>
              <p className="text-slate-300 leading-relaxed">
                Connecting minds, shaping futures. We create world-class conferences that bring together 
                industry leaders, innovators, and change-makers to drive meaningful progress across all sectors.
              </p>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-3">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <IconComponent className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-sm font-semibold text-white">{achievement.number}</div>
                    <div className="text-xs text-slate-400">{achievement.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Conference Categories */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Conference Categories</h4>
            <ul className="space-y-3">
              {conferenceCategories.map((category, index) => (
                <li key={index}>
                  <a 
                    href={category.href}
                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Get In Touch</h4>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <IconComponent className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{info.text}</span>
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
                      className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
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

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-slate-400 text-sm">
            © {currentYear} Atom Conferences. All rights reserved. Empowering global knowledge exchange since 2020.
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-slate-400">
            <span>Follow the conversation:</span>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                LinkedIn
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200" aria-label="Twitter">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200" aria-label="YouTube">
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