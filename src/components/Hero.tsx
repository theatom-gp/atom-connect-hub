import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import heroImage from '@/assets/hero-conference.jpg';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingParticles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  const stats = [
    { value: "50K+", label: "Professionals", icon: "👥" },
    { value: "500+", label: "Conferences", icon: "🎯" },
    { value: "100+", label: "Disciplines", icon: "🌍" }
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-primary/80"
        style={{ background: 'var(--gradient-hero)' }}
        animate={{
          background: [
            'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            'linear-gradient(135deg, #764ba2 0%, #f093fb 50%, #667eea 100%)',
            'linear-gradient(135deg, #f093fb 0%, #667eea 50%, #764ba2 100%)',
            'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Animated Mesh Gradient Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Geometric Patterns */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/30 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-white/20 rounded-full"
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1]
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Animated Badge */}
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="group relative px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full text-sm font-medium transition-all duration-500 hover:bg-white/20 hover:border-white/40 hover:scale-105">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <span className="relative flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 bg-secondary rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="tracking-wider uppercase">Global Conference Hub</span>
                  <motion.div
                    className="w-2 h-2 bg-secondary rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </span>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.div
              className="overflow-hidden mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              >
                <motion.span
                  className="block"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Connecting
                </motion.span>
                                 <motion.span
                   className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary via-accent to-primary"
                   initial={{ opacity: 0, x: 50 }}
                   animate={{ 
                     opacity: 1, 
                     x: 0,
                     backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                   }}
                   transition={{ 
                     duration: 0.8, 
                     delay: 0.6,
                     backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear" }
                   }}
                 >
                  Professionals
                </motion.span>
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Across Disciplines
                </motion.span>
              </motion.h1>
            </motion.div>
            
            {/* Subtitle */}
            <motion.p 
              className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Connect with the world's brightest minds across disciplines to solve challenges and accelerate progress.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
              <a href="/meetings">  
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white font-semibold px-8 py-4 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  <motion.span
                    className="relative z-10 flex items-center gap-2"
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 1 }}
                  >
                    Explore Conferences
                    <motion.svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                  />
                </Button>
                </a>
              </motion.div>

              {/* Learn More button */}
              {/* <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  variant="outline"
                  className="group relative overflow-hidden border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg transition-all duration-300"
                >
                  <motion.span
                    className="relative z-10 flex items-center gap-2"
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 1 }}
                  >
                    Learn More
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.span>
                </Button>
              </motion.div> */}
            </motion.div>
            
            {/* Animated Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="text-3xl sm:text-4xl font-bold text-white mb-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="flex items-center justify-center gap-2">
                    <motion.span
                      className="text-2xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {stat.icon}
                    </motion.span>
                    <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Hero Image with Enhanced Animations */}
          <motion.div 
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img 
                src={heroImage} 
                alt="Professional conference with diverse attendees networking and learning"
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Animated Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                animate={{
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            {/* Enhanced Floating Card */}
            <motion.div 
              className="hidden sm:block absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-xl rounded-2xl p-6 max-w-xs shadow-2xl border border-white/20"
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
            >
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center flex-shrink-0"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <motion.svg 
                    className="w-6 h-6 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </motion.svg>
                </motion.div>
                <div className="min-w-0 flex-1">
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 text-left hover:bg-transparent w-full group"
                    onClick={() => window.location.href = '/conference/aisummit'}
                  >
                    <div className="space-y-2">
                      <motion.div 
                        className="font-bold text-foreground text-base leading-tight group-hover:text-secondary transition-colors duration-300"
                        animate={{ color: ["#374151", "#8b5cf6", "#374151"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        Next Conference
                      </motion.div>
                      <div className="text-sm text-muted-foreground leading-tight group-hover:text-secondary/80 transition-colors duration-300">
                        AI Innovation Summit
                      </div>
                      <motion.div
                        className="w-full h-1 bg-gradient-to-r from-secondary to-accent rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                      />
                    </div>
                  </Button>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-4 right-4 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 360]
              }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
            >
              <motion.div
                className="w-8 h-8 bg-secondary rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.div
              className="absolute bottom-20 right-8 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center"
              animate={{
                y: [0, 10, 0],
                x: [0, 5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <motion.div
                className="w-6 h-6 bg-accent rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => document.getElementById('conferences')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div 
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ 
              scaleY: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;