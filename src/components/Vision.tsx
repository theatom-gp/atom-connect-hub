import visionImage from '@/assets/vision.jpg';

const Vision = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-accent/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
              Our Vision
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              A World Where Knowledge 
              <span className="text-secondary"> Knows No Boundaries</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground">
              <p className="text-xl leading-relaxed">
                We envision a future where every professional, regardless of their field or location, 
                has seamless access to the collective wisdom of humanity's greatest minds, fostering 
                unprecedented collaboration that solves global challenges.
              </p>
              
              <p>
                By 2030, Atom Conferences will be the cornerstone of professional development worldwide, 
                having facilitated connections that led to breakthrough medical treatments, sustainable 
                technologies, educational innovations, and solutions we haven't yet imagined.
              </p>
              
            </div>
            
            {/* Vision Metrics */}
            <div className="grid grid-cols-2 gap-6 mt-8 p-6 bg-white rounded-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1M+</div>
                <div className="text-sm text-muted-foreground">Global Professionals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">24/7</div>
                <div className="text-sm text-muted-foreground">Knowledge Exchange</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">200+</div>
                <div className="text-sm text-muted-foreground">Countries Connected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">∞</div>
                <div className="text-sm text-muted-foreground">Possibilities Created</div>
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
                src={visionImage} 
                alt="Futuristic vision of global professional connections"
                className="w-full h-[500px] object-cover"
              />
            </div>
            
            {/* Future Badge */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-secondary to-secondary/80 text-white rounded-xl p-4">
              <div className="text-center">
                <div className="text-2xl font-bold">2030</div>
                <div className="text-sm opacity-90">Vision Goal</div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -top-8 left-8 w-20 h-20 bg-secondary/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;