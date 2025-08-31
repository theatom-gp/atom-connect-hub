import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Mission from '@/components/Mission';
import Vision from '@/components/Vision';
import Conferences from '@/components/Conferences';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Index = () => {
  // Structured data for the homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Atom Conferences",
    "url": "https://www.theatomconferences.com",
    "logo": "https://www.theatomconferences.com/assets/images/hero-conference-BJPAZ91T.jpg",
    "description": "Leading international conference platform connecting professionals across disciplines including AI, Healthcare, Finance, Technology, and more.",
    "sameAs": [
      "https://twitter.com/atomconferences",
      "https://linkedin.com/company/atomconferences"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0123",
      "contactType": "customer service",
      "email": "info@atomconferences.com"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Leading International Conferences - AI, Healthcare, Finance & Technology"
        description="Join Atom Conferences for world-class international conferences in AI, Healthcare, Finance, Technology, and more. Connect with industry leaders, submit abstracts, and advance your career."
        keywords="international conferences, AI conferences, healthcare conferences, finance conferences, technology conferences, research conferences, academic conferences, professional development"
        image="/assets/images/hero-conference-BJPAZ91T.jpg"
        url="/"
        type="website"
        structuredData={structuredData}
      />
      <Navigation />
      <Hero />
      <AboutUs />
      <Mission />
      <Vision />
      <Conferences />
      <Footer />
    </div>
  );
};

export default Index;
