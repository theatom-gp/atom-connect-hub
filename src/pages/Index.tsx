import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Mission from '@/components/Mission';
import Vision from '@/components/Vision';
import Conferences from '@/components/Conferences';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <AboutUs />
      <Mission />
      <Vision />
      <Conferences />
    </div>
  );
};

export default Index;
