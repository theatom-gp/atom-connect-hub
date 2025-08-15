import aboutImage from '@/assets/about-us.jpg';

const AboutUs = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              About <span className="text-primary">Atom Conferences</span>
            </h2>
            
            <div className="space-y-4 text-lg text-muted-foreground">
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
            
            {/* Key Features */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Global Reach</h4>
                <p className="text-muted-foreground text-sm">
                  Connecting professionals across 6 continents and 100+ countries
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Expert Network</h4>
                <p className="text-muted-foreground text-sm">
                  Access to world-renowned speakers and industry leaders
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Innovation Focus</h4>
                <p className="text-muted-foreground text-sm">
                  Cutting-edge topics that shape tomorrow's industries
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Community Driven</h4>
                <p className="text-muted-foreground text-sm">
                  Built by professionals, for professionals seeking excellence
                </p>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div 
              className="rounded-2xl overflow-hidden"
              style={{ boxShadow: 'var(--shadow-conference)' }}
            >
              <img 
                src={aboutImage} 
                alt="Professional team collaborating on conference planning"
                className="w-full h-[600px] object-cover"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;