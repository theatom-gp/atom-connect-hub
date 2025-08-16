import aboutImage from '@/assets/about-us.jpg';

const AboutUs = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background to-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 text-center lg:text-left">
              About <span className="text-primary">Atom Conferences</span>
            </h2>
            
            <div className="space-y-4 text-base sm:text-lg text-muted-foreground text-center lg:text-left">
              <p>
                At Atom Conferences, we believe that groundbreaking discoveries happen when brilliant minds 
                from different disciplines collide. Since our founding, we've been the catalyst that brings 
                together professionals, academics, and students in an ecosystem designed for knowledge exchange 
                and innovation.
              </p>
              
              <p>
                Our platform transcends traditional conference boundaries, creating interdisciplinary 
                conversations that spark new ideas, forge lasting partnerships, and accelerate progress 
                across industries. From cutting-edge technology to sustainable development, from healthcare 
                innovation to educational transformation – we're where the future takes shape.
              </p>
              
              <p>
                With a community of over 50,000 professionals worldwide, Atom Conferences has become 
                the premier destination for those who dare to think differently, challenge conventions, 
                and build the world of tomorrow.
              </p>
            </div>
            
            {/* Key Features - Mobile optimized grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
              <div className="text-center lg:text-left">
                <h4 className="font-semibold text-foreground mb-2">Global Reach</h4>
                <p className="text-muted-foreground text-sm">
                  Connecting professionals across 6 continents and 100+ countries
                </p>
              </div>
              <div className="text-center lg:text-left">
                <h4 className="font-semibold text-foreground mb-2">Expert Network</h4>
                <p className="text-muted-foreground text-sm">
                  Access to world-renowned speakers and industry leaders
                </p>
              </div>
              <div className="text-center lg:text-left">
                <h4 className="font-semibold text-foreground mb-2">Innovation Focus</h4>
                <p className="text-muted-foreground text-sm">
                  Cutting-edge topics that shape tomorrow's industries
                </p>
              </div>
              <div className="text-center lg:text-left">
                <h4 className="font-semibold text-foreground mb-2">Community Driven</h4>
                <p className="text-muted-foreground text-sm">
                  Built by professionals, for professionals seeking excellence
                </p>
              </div>
            </div>
          </div>
          
          {/* Image - Mobile first approach */}
          <div className="relative order-1 lg:order-2">
            <div 
              className="rounded-xl sm:rounded-2xl overflow-hidden"
              style={{ boxShadow: 'var(--shadow-conference)' }}
            >
              <img 
                src={aboutImage} 
                alt="Professional team collaborating on conference planning"
                className="w-full h-[250px] sm:h-[400px] lg:h-[600px] object-cover"
              />
            </div>
            
            {/* Decorative Elements - Adjusted for mobile */}
            <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-secondary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-3 sm:-bottom-6 -left-3 sm:-left-6 w-20 h-20 sm:w-32 sm:h-32 bg-primary/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;