import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, ArrowRight, Star, TrendingUp } from 'lucide-react';
import conferenceAI from '@/assets/conference-ai.jpg';
import conferenceMedical from '@/assets/conference-medical.jpg';
import conferenceSustainability from '@/assets/conference-sustainability.jpg';
import aisummit from '@/assets/aisummit/bg.avif'; 
import forensicscience from '@/assets/forensicscience/bg.jpeg'; 
import powerandenergy from '@/assets/powerandenergy/bg.jpeg';
import quantumcomputing from '@/assets/quantumcomputing/bg.jpg';
import globalhealthcarerevolution from '@/assets/globalhealthcarerevolution/bg.jpg';
import biomaterials from '@/assets/biomaterials/bg.jpeg';
import techinnovationexpo from '@/assets/techinnovationexpo/bg.jpeg';
import surgeryandanesthesia from '@/assets/surgeryandanesthesia/bg.jpeg';
import neurology from '@/assets/neurology/bg.jpeg';  
import conferenceFinance from '@/assets/conference-finance.jpg';
import conferenceEducation from '@/assets/conference-education.jpg';
import conferenceMarketing from '@/assets/conference-marketing.jpg';
import conferenceLegal from '@/assets/conference-legal.jpg';
import conferenceEngineering from '@/assets/conference-engineering.jpg';
import conferencePsychology from '@/assets/conference-psychology.jpg';
import conferenceArts from '@/assets/conference-arts.jpg';
import conferenceScience from '@/assets/conference-science.jpg';

const Meetings = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Events');

  const categories = [
    'All Events',
    'Technology',
    'Finance',
    'Education', 
    'AI & Innovation',
    'Healthcare',
    'Sustainability',
    'Marketing',
    'Legal',
    'Engineering',
    'Psychology',
    'Arts & Design',
    'Science'
  ];

  const conferences = [
    {
      id: 1,
      title: "AI Innovation Summit 2025",
      date: "November 15-17, 2025",
      venue: "Silicon Valley Convention Center",
      location: "San Francisco, CA",
      image: aisummit,
      description: "Join leading AI researchers, tech executives, and innovators as they unveil the future of artificial intelligence.",
      category: "Technology"
    },
    {
      id: 2,
      title: "Global Congress on Forensic Science and Research",
      date: "November 22-24, 2025",
      venue: "Academic Excellence Center",
      location: "Lisbon, Portugal",
      image: forensicscience,
      description: "Discover breakthrough Forensic Science technologies and innovations.",
      category: "Education"
    },
    {
      id: 3,
      title: "Global Congress on Power and Energy Engineering",
      date: "December 10-12, 2025",
      venue: "Green Technology Center",
      location: "Seattle, WA",
      image: powerandenergy,
      description: "Unite with environmental leaders and Power tech pioneers driving development worldwide.",
      category: "Engineering"
    },
    {
      id: 4,
      title: "Global Congress on Quantum Computing and Applications",
      date: "Jan 15-17, 2026",
      venue: "Quantum Computing Center",
      location: "San Francisco, CA",
      image: quantumcomputing,
      description: "Explore the latest quantum computing technologies and applications driving successful brand transformations.",
      category: "Technology"
    },
    {
      id: 5,
      title: "Global Healthcare Revolution",
      date: "Feb 10-12, 2026",
      venue: "Medical Innovation Hub",
      location: "Boston, MA",
      image: globalhealthcarerevolution,
      description: "Discover breakthrough medical technologies and treatment innovations shaping the future of healthcare.",
      category: "Healthcare"
    },
    {
      id: 6,
      title: "Global Congress on Biomaterials and Regenerative Medicine",
      date: "Feb 22-24, 2026",
      venue: "Green Technology Center",
      location: "Seattle, WA",
      image: biomaterials,
      description: "Unite with industry experts and Regenerative Medicine pioneers driving sustainable development worldwide.",
      category: "Education"
    },
    {
      id: 7,
      title: "Tech Innovation Expo 2026",
      date: "Mar 15-17, 2026",
      venue: "Technology Convention Center",
      location: "Austin, TX",
      image: conferenceAI,
      description: "Explore cutting-edge technologies and connect with industry leaders shaping tomorrow's digital landscape.",
      category: "Technology"
    },
    {
      id: 8,
      title: "International Experts Summit on Surgery and Anesthesia",
      date: "Mar 16-18, 2026",
      venue: "Medical Innovation Hub",
      location: "Boston, MA",
      image: surgeryandanesthesia,
      description: "Connect with Global experts in Surgery and Anesthesia.",
      category: "Healthcare"
    },
    {
      id: 9,
      title: "International Experts Summit on Neurology and Neurological Disorders",
      date: "Mar 25-27, 2026",
      venue: "Neurology Center",
      location: "San Francisco, CA",
      image: neurology,
      description: "Explore how technology is reshaping Neurology and discover new approaches to Neurological Disorders.",
      category: "Healthcare"
    },
    // {
    //   id: 9,
    //   title: "Engineering Excellence Summit",
    //   date: "April 25-27, 2026",
    //   venue: "Industrial Innovation Center",
    //   location: "Detroit, MI",
    //   image: conferenceEngineering,
    //   description: "Advance engineering practices with breakthrough technologies and sustainable design methodologies.",
    //   category: "Engineering"
    // },
    // {
    //   id: 10,
    //   title: "Mental Health & Psychology Congress",
    //   date: "May 12-14, 2026",
    //   venue: "Wellness Convention Center",
    //   location: "Denver, CO",
    //   image: conferencePsychology,
    //   description: "Transform mental healthcare with innovative therapeutic approaches and psychological research findings.",
    //   category: "Psychology"
    // },
    // {
    //   id: 11,
    //   title: "Creative Arts & Design Festival",
    //   date: "May 26-28, 2026",
    //   venue: "Arts & Culture Center",
    //   location: "Miami, FL",
    //   image: conferenceArts,
    //   description: "Celebrate creativity and innovation in arts, design, and digital media with industry visionaries.",
    //   category: "Arts & Design"
    // },
    // {
    //   id: 12,
    //   title: "Scientific Research Symposium",
    //   date: "June 9-11, 2026",
    //   venue: "Research Innovation Campus",
    //   location: "San Diego, CA",
    //   image: conferenceScience,
    //   description: "Advance scientific knowledge through collaborative research and breakthrough discoveries across disciplines.",
    //   category: "Science"
    // },
    // {
    //   id: 13,
    //   title: "Global Congress on Forensic Science and Research",
    //   date: "June 19-21, 2026",
    //   venue: "Research Innovation Campus",
    //   location: "San Diego, CA",
    //   image: conferenceScience,
    //   description: "Advance Forensic scientific knowledge through collaborative research and breakthrough discoveries across disciplines.",
    //   category: "Science"
    // }
  ];

  const filteredConferences = selectedCategory === 'All Events' 
    ? conferences 
    : conferences.filter(conference => conference.category === selectedCategory);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingElements = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 3,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5
  }));

  const stats = [
    { icon: <Calendar className="h-5 w-5" />, value: "50+", label: "Events" },
    { icon: <Users className="h-5 w-5" />, value: "25K+", label: "Attendees" },
    { icon: <MapPin className="h-5 w-5" />, value: "15+", label: "Countries" },
    { icon: <Star className="h-5 w-5" />, value: "4.9", label: "Rating" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Enhanced Header Section with Background Image */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url('/src/assets/background.jpg')`
            }}
          />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingElements.map((element) => (
            <motion.div
              key={element.id}
              className="absolute bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-sm"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                width: `${element.size}px`,
                height: `${element.size}px`
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0, 0.4, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: element.duration,
                delay: element.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Mouse-following Mesh Gradient */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header Content */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-semibold mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <TrendingUp className="h-4 w-4" />
                {selectedCategory}
                <motion.div
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {selectedCategory === 'All Events' ? 'All' : selectedCategory}{" "}
              <motion.span 
                className="bg-gradient-to-r from-primary via-blue-400 to-secondary bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Conferences & Meetings
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover comprehensive professional development opportunities across diverse industries and disciplines.
            </motion.p>

            {/* Animated Stats */}
            {/* <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full text-primary mb-3"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    className="text-2xl font-bold text-white mb-1"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div> */}

            {/* CTA Button */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    Explore All Events
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </motion.div> */}
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-4 py-2 text-sm font-medium transition-all duration-200
                    ${selectedCategory === category 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-background text-foreground hover:bg-accent hover:text-accent-foreground border-input'
                    }
                  `}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Conference Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {filteredConferences.map((conference) => (
              <Card 
                key={conference.id} 
                className="overflow-hidden hover:shadow-lg transition-all duration-300 group"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={conference.image} 
                      alt={conference.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {conference.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {conference.description}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                      <span>{conference.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      <span>{conference.venue}, {conference.location}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    size="lg"
                    onClick={() => {
                      if (conference.id === 1) {
                        window.location.href = '/conference/aisummit';
                      } else if (conference.id === 2) {
                        window.location.href = '/conference/forensicscience';
                      } else if (conference.id === 3) {
                        window.location.href = '/conference/powerandenergy';
                      } else if (conference.id === 4) {
                        window.location.href = '/conference/quantumcomputing';
                      } else if (conference.id === 5) {
                        window.location.href = '/conference/globalhealthcarerevolution';
                      } else if (conference.id === 6) {
                        window.location.href = '/conference/biomaterials';
                      } else if (conference.id === 7) {
                        window.location.href = '/conference/techinnovationexpo';
                      } else if (conference.id === 8) {
                        window.location.href = '/conference/surgeryandanesthesia';
                      } else if (conference.id === 9) {
                        window.location.href = '/conference/neurology';
                      } else if (conference.id === 10) {
                        window.location.href = '/conference/mentalhealthpsychologycongress';
                      } else if (conference.id === 11) {
                        window.location.href = '/conference/creativeartsdesignfestival';
                      } else if (conference.id === 12) {
                        window.location.href = '/conference/scientificresearchsymposium';
                      } else if (conference.id === 13) {
                        window.location.href = '/conference/globalforensicscienceresearch';
                      }
                    }}
                  >
                    View Details & Register
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Meetings;