import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Mission from '@/components/Mission';
import Vision from '@/components/Vision';
import Conferences from '@/components/Conferences';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
