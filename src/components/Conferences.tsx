import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import aisummit from '@/assets/aisummit/bg.avif';
import forensicscience from '@/assets/forensicscience/bg.jpeg';
import powerandenergy from '@/assets/powerandenergy/bg.jpeg';

const Conferences = () => {
  const navigate = useNavigate();
  
  const conferences = [
    {
      id: 1,
      title: "AI Innovation Summit 2025",
      date: "Nov 15-17, 2025",
      venue: "Silicon Valley Convention Center",
      location: "San Francisco, CA",
      image: aisummit,
      description: "Join leading AI researchers, tech executives, and innovators as they unveil the future of artificial intelligence.",
      attendees: 500,
      speakers: 25,
      route: "/conference/aisummit"
    },
    {
      id: 2,
      title: "Global Congress on Forensic Science and Research",
      date: "Nov 22-24, 2025",
      venue: "Academic Excellence Center",
      location: "Lisbon, Portugal",
      image: forensicscience,
      description: "Discover breakthrough Forensic Science technologies and innovations.",
      attendees: 350,
      speakers: 18,
      route: "/conference/forensicscience"
    },
    {
      id: 3,
      title: "Global Congress on Power and Energy Engineering",
      date: "Dec 10-12, 2025",
      venue: "Green Technology Center",
      location: "Seattle, WA",
      image: powerandenergy,
      description: "Unite with environmental leaders and Power tech pioneers driving development worldwide.",
      attendees: 400,
      speakers: 22,
      route: "/conference/powerandenergy"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
            Upcoming Events
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Featured <span className="text-primary">Conferences</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't miss these transformative events where industry leaders share cutting-edge insights 
            and forge the connections that drive tomorrow's breakthroughs.
          </p>
        </div>

        {/* Conference Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {conferences.map((conference) => (
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
                  onClick={() => navigate(conference.route)}
                >
                  View Details & Register
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="/meetings">
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.span
                  className="relative z-10 flex items-center gap-2"
                  initial={{ opacity: 1 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
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
                  More Conferences
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
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
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
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                />
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-secondary/50 to-secondary/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(139, 92, 246, 0.7)",
                      "0 0 0 10px rgba(139, 92, 246, 0)",
                      "0 0 0 0 rgba(139, 92, 246, 0)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </Button>
            </a>
          </motion.div>
          
          <motion.p 
            className="text-muted-foreground mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join over{" "}
            <motion.span 
              className="font-bold text-primary"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              50,000+
            </motion.span>{" "}
            professionals transforming their careers through knowledge exchange
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Conferences;