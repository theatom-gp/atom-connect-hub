import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-conference.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-primary/80"
        style={{ background: 'var(--gradient-hero)' }}
      />
      
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Connecting Professionals 
              <span className="block text-secondary">Across Disciplines</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Join the world's premier platform where professionals, lecturers, and students unite 
              to share knowledge, drive innovation, and shape the future across every industry.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-4 text-lg"
                style={{ boxShadow: 'var(--shadow-hero)' }}
              >
                Explore Conferences
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg"
              >
                Host Your Event
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-white/80 text-sm">Professionals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-white/80 text-sm">Conferences</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-white/80 text-sm">Disciplines</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div 
              className="rounded-2xl overflow-hidden"
              style={{ boxShadow: 'var(--shadow-hero)' }}
            >
              <img 
                src={heroImage} 
                alt="Professional conference with diverse attendees networking and learning"
                className="w-full h-[500px] object-cover"
              />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 max-w-xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Next Conference</div>
                  <div className="text-sm text-muted-foreground">AI Innovation Summit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;