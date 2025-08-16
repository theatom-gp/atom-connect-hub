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
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Connecting Professionals 
              <span className="block text-secondary">Across Disciplines</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
              Join the world's premier platform where professionals, lecturers, and students unite 
              to share knowledge, drive innovation, and shape the future across every industry.
            </p>
            
            <div className="flex justify-center lg:justify-start mb-8 sm:mb-12">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg touch-manipulation"
                style={{ boxShadow: 'var(--shadow-hero)' }}
              >
                Explore Conferences
              </Button>
            </div>
            
            {/* Stats - Mobile optimized */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">50K+</div>
                <div className="text-white/80 text-xs sm:text-sm">Professionals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">500+</div>
                <div className="text-white/80 text-xs sm:text-sm">Conferences</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">100+</div>
                <div className="text-white/80 text-xs sm:text-sm">Disciplines</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image - Mobile first approach */}
          <div className="relative order-1 lg:order-2">
            <div 
              className="rounded-xl sm:rounded-2xl overflow-hidden"
              style={{ boxShadow: 'var(--shadow-hero)' }}
            >
              <img 
                src={heroImage} 
                alt="Professional conference with diverse attendees networking and learning"
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            
            {/* Floating Card - Hidden on small mobile, adjusted for larger screens */}
            <div className="hidden sm:block absolute -bottom-4 sm:-bottom-6 -left-3 sm:-left-6 bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 max-w-[280px] sm:max-w-xs">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-foreground text-sm sm:text-base truncate">Next Conference</div>
                  <div className="text-xs sm:text-sm text-muted-foreground truncate">AI Innovation Summit</div>
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