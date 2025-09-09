import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import heroImage from '@/assets/hero-conference.jpg';
import aboutImage from '@/assets/about-us.jpg';
import missionImage from '@/assets/mission.jpg';
import visionImage from '@/assets/vision.jpg';

const StorytellingHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeSection, setActiveSection] = useState(0);

  // Story sections data
  const storySections = [
    {
      id: 'hero',
      title: 'Connecting Professionals Across Disciplines',
      subtitle: 'Join the world\'s brightest minds across disciplines to solve challenges and accelerate progress.',
      cta: 'Explore Conferences',
      ctaLink: '/meetings',
      background: heroImage,
      theme: 'primary'
    },
    {
      id: 'about',
      title: 'About The Atom Conferences',
      subtitle: 'We believe that groundbreaking discoveries happen when brilliant minds from different disciplines collide. Since our founding, we\'ve been the catalyst that brings together the world\'s leading experts.',
      cta: 'Learn More',
      ctaLink: '#about-us',
      background: aboutImage,
      theme: 'secondary'
    },
    {
      id: 'mission',
      title: 'Our Mission',
      subtitle: 'To create transformative experiences that bridge disciplines, foster innovation, and accelerate the pace of discovery. We believe that the most profound breakthroughs happen at the intersection of different fields.',
      cta: 'Join Us',
      ctaLink: '#mission',
      background: missionImage,
      theme: 'accent'
    },
    {
      id: 'vision',
      title: 'Our Vision',
      subtitle: 'A world where knowledge flows freely across boundaries, where every expert can connect with their peers, and where collaboration drives the next generation of breakthroughs.',
      cta: 'Be Part of It',
      ctaLink: '#vision',
      background: visionImage,
      theme: 'primary'
    }
  ];

  // Transform values for parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.3, 0]);

  // Create transforms for each section
  const section0Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const section1Opacity = useTransform(scrollYProgress, [0.25, 0.5], [1, 0]);
  const section2Opacity = useTransform(scrollYProgress, [0.5, 0.75], [1, 0]);
  const section3Opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  
  const sectionTransforms = [section0Opacity, section1Opacity, section2Opacity, section3Opacity];

  // Update active section based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const sectionIndex = Math.floor(latest * storySections.length);
      setActiveSection(Math.min(sectionIndex, storySections.length - 1));
    });

    return unsubscribe;
  }, [scrollYProgress, storySections.length]);

  return (
    <div ref={containerRef} className="relative">
      {/* Pinned Background */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full blur-sm"
        //   style={{ y: backgroundY }}
        >
          <div className="relative w-full h-full">
            {/* Dynamic Background Images */}
            {storySections.map((section, index) => (
              <motion.div
                key={section.id}
                className="absolute inset-0"
                style={{ opacity: sectionTransforms[index] }}
              >
                <img
                  src={section.background}
                  alt={section.title}
                  className="w-full h-full object-fill"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 ${
                  section.theme === 'primary' ? 'bg-gradient-to-br from-primary/80 via-primary/60 to-primary/40' :
                  section.theme === 'secondary' ? 'bg-gradient-to-br from-secondary/80 via-secondary/60 to-secondary/40' :
                  'bg-gradient-to-br from-accent/80 via-accent/60 to-accent/40'
                }`} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content */}
              <div className="text-center lg:text-left">
                {/* Animated Badge */}
                <motion.div
                  className="inline-block mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="group relative px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full text-sm font-medium transition-all duration-500 hover:bg-white/20 hover:border-white/40 hover:scale-105">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="tracking-wider uppercase">Global Conference Hub</span>
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                    </span>
                  </div>
                </motion.div>

                {/* Dynamic Title */}
                <motion.div
                  className="overflow-hidden mb-6"
                  key={activeSection}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    {storySections[activeSection].title}
                  </h1>
                </motion.div>
                
                {/* Dynamic Subtitle */}
                <motion.p 
                  className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                  key={`subtitle-${activeSection}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {storySections[activeSection].subtitle}
                </motion.p>
                
                {/* Dynamic CTA Button */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 sm:mb-12"
                  key={`cta-${activeSection}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a href={storySections[activeSection].ctaLink}>
                      <Button 
                        size="lg" 
                        className="group relative overflow-hidden bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-semibold px-8 py-4 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/30 backdrop-blur-sm"
                      >
                        <motion.span
                          className="relative z-10 flex items-center gap-2"
                          initial={{ opacity: 1 }}
                          whileHover={{ opacity: 1 }}
                        >
                          {storySections[activeSection].cta}
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
                </motion.div>
              </div>
              
              {/* Hero Image with Enhanced Animations */}
              <motion.div 
                className="relative"
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
                    src={storySections[activeSection].background} 
                    alt={storySections[activeSection].title}
                    className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                    key={`image-${activeSection}`}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
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
                      className="w-12 h-12 bg-gradient-to-r from-white/20 to-white/10 rounded-full flex items-center justify-center flex-shrink-0"
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
                            className="font-bold text-foreground text-base leading-tight group-hover:text-white transition-colors duration-300"
                            animate={{ color: ["#374151", "#ffffff", "#374151"] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            Next Conference
                          </motion.div>
                          <div className="text-sm text-muted-foreground leading-tight group-hover:text-white/80 transition-colors duration-300">
                            AI Innovation Summit
                          </div>
                          <motion.div
                            className="w-full h-1 bg-gradient-to-r from-white/40 to-white/20 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 1.5 }}
                          />
                        </div>
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
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
      </div>

      {/* Spacer for scroll effect */}
      <div className="h-[400vh]"></div>
    </div>
  );
};

export default StorytellingHero;
