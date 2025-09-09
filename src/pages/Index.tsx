import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Mission from '@/components/Mission';
import Vision from '@/components/Vision';
import Conferences from '@/components/Conferences';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { generateOrganizationStructuredData, generateWebSiteStructuredData } from '@/lib/structuredData';
// import StorytellingHero from '@/components/StorytellingHero';

const Index = () => {
  // Enhanced structured data for the homepage
  const organizationData = generateOrganizationStructuredData();
  const websiteData = generateWebSiteStructuredData();
  
  // Combine structured data
  const structuredData = [organizationData, websiteData];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Leading International Conferences - AI, Healthcare, Finance & Technology"
        description="Join Atom Conferences for world-class international conferences in AI, Healthcare, Finance, Technology, and more. Connect with industry leaders, submit abstracts, and advance your career. Register now for early bird discounts!"
        keywords="international conferences, AI conferences, healthcare conferences, finance conferences, technology conferences, research conferences, academic conferences, professional development, conference registration, abstract submission, networking events, industry leaders, research collaboration, innovation summit, global conferences"
        image="/assets/images/hero-conference-BJPAZ91T.jpg"
        url="/"
        type="website"
        structuredData={structuredData}
        breadcrumbs={[
          { name: "Home", url: "/" }
        ]}
      />
      <Navigation />
      <Hero />
      {/* <StorytellingHero /> */}
      <AboutUs />
      <Mission />
      <Vision />
      <Conferences />
      <Footer />
    </div>
  );
};

export default Index;
