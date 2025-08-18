import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check as CheckIcon, Mail, Bell, Calendar, Globe, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import heroBackground from '@/assets/tech-innovation/bg.jpg';
import venueInterior from '@/assets/tech-innovation/venue-interior-1.jpg';
import venueConference from '@/assets/tech-innovation/venue-conference-room.jpg';
import venueNetworking from '@/assets/tech-innovation/venue-networking.jpg';
import venueExhibition from '@/assets/tech-innovation/venue-exhibition.jpg';
import chairpersonImage from '@/assets/tech-innovation/chairperson-tech.jpg';
import speaker1 from '@/assets/tech-innovation/speaker-1.jpg';
import speaker2 from '@/assets/tech-innovation/speaker-2.jpg';
import speaker3 from '@/assets/tech-innovation/speaker-3.jpg';
import speaker4 from '@/assets/tech-innovation/speaker-4.jpg';

const ForensicScience = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [expandedDays, setExpandedDays] = useState<{ [key: string]: boolean }>({
    'Day 1': true,
    'Day 2': false,
    'Day 3': false
  });

  const targetDate = new Date('2025-11-13T09:00:00');
  const earlyBirdDate = new Date(targetDate.getTime() - (100 * 24 * 60 * 60 * 1000));
  const now = new Date();
  const daysToEvent = Math.floor((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const isEarlyBird = daysToEvent > 100;

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(timer);
  }, []);

  const venueImages = [
    {
      src: venueInterior,
      alt: "Forensic Science Convention Center - Main Hall",
      title: "Main Convention Hall"
    },
    {
      src: venueConference,
      alt: "Professional Conference Room Setup",
      title: "Conference Rooms"
    },
    {
      src: venueNetworking,
      alt: "Networking Area",
      title: "Networking Spaces"
    },
    {
      src: venueExhibition,
      alt: "Forensic Science Exhibition Hall",
      title: "Exhibition Area"
    }
  ];

  const speakers = [
    {
      name: "Dr. Maria Santos",
      title: "Chief Forensic Scientist, Lisbon Crime Lab",
      country: "Portugal",
      image: speaker1,
      expertise: "DNA Analysis"
    },
    {
      name: "Prof. James Wilson",
      title: "Director of Forensic Research, London Metropolitan University",
      country: "United Kingdom",
      image: speaker2,
      expertise: "Digital Forensics"
    },
    {
      name: "Dr. Elena Rodriguez",
      title: "Senior Forensic Pathologist, Madrid Institute",
      country: "Spain",
      image: speaker3,
      expertise: "Forensic Pathology"
    },
    {
      name: "Prof. Hans Mueller",
      title: "Head of Forensic Chemistry, Berlin University",
      country: "Germany",
      image: speaker4,
      expertise: "Toxicology"
    }
  ];

  const pricingTiers = [
    {
      title: "Delegate/Listener",
      subtitle: "(In-Person)",
      price: 899,
      features: [
        "Entry to all session and workshops",
        "Lunch & Coffee breaks",
        "Conference schedule handout",
        "Certificate of Attendance",
        "E-Abstract Book"
      ]
    },
    {
      title: "Speaker",
      subtitle: "(In-person)",
      price: 799,
      features: [
        "Entry to all session and workshops",
        "Lunch & Coffee breaks",
        "Conference schedule handout",
        "Certificate of Attendance",
        "E-Abstract Book"
      ]
    },
    {
      title: "Student",
      subtitle: "",
      price: 499,
      features: [
        "Entry to all session and workshops",
        "Lunch & Coffee breaks",
        "Conference schedule handout",
        "Certificate of Attendance",
        "E-Abstract Book"
      ]
    },
    {
      title: "Virtual",
      subtitle: "(Speaker/Delegate)",
      price: 449,
      features: [
        "Conference recorded video access",
        "Conference schedule handout",
        "Certificate of Attendance",
        "E-Abstract Book"
      ]
    }
  ];

  const scheduleData = [
    {
      day: "Day 1",
      date: "November 13, 2025",
      sessions: [
        { time: "08:00-09:30", activity: "Registrations & Introduction" },
        { time: "09:30-11:30", activity: "Plenary Session" },
        { time: "11:30-11:45", activity: "Networking Break" },
        { time: "11:45-13:15", activity: "Keynote Session" },
        { time: "13:15-14:00", activity: "Group Photo & Network Lunch" },
        { time: "14:00-16:00", activity: "Keynote Session" },
        { time: "16:00-16:15", activity: "Networking Break" },
        { time: "16:15-18:00", activity: "Forensic Sessions" }
      ]
    },
    {
      day: "Day 2", 
      date: "November 14, 2025",
      sessions: [
        { time: "09:00-11:30", activity: "Plenary Session" },
        { time: "11:30-11:45", activity: "Networking Break" },
        { time: "11:45-13:45", activity: "Forensic Sessions" },
        { time: "13:45-14:30", activity: "Networking Lunch Break" },
        { time: "14:30-16:30", activity: "Forensic Sessions" },
        { time: "16:30-16:45", activity: "Networking Break" },
        { time: "16:45-18:30", activity: "Forensic Sessions" },
        { time: "18:45-19:00", activity: "Certification" }
      ]
    },
    {
      day: "Day 3",
      date: "November 15, 2025", 
      sessions: [
        { time: "09:00-11:30", activity: "Forensic Sessions" },
        { time: "11:30-11:45", activity: "Networking Break" },
        { time: "11:45-13:45", activity: "Forensic Sessions" },
        { time: "13:45-14:30", activity: "Networking Lunch Break" },
        { time: "14:30-16:30", activity: "Forensic Sessions" },
        { time: "16:30-16:45", activity: "Networking Break" },
        { time: "16:45-18:30", activity: "Forensic Sessions" },
        { time: "18:30-19:00", activity: "Closing Ceremony" }
      ]
    }
  ];

  const publishingPartners = [
    { 
      name: "Forensic Science International", 
      description: "Leading Forensic Journal", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/MDPI_logo.svg/320px-MDPI_logo.svg.png",
      fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmNGY0ZjQiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Rm9yZW5zaWMgU2NpZW5jZTwvdGV4dD48L3N2Zz4="
    },
    { 
      name: "Journal of Forensic Sciences", 
      description: "Academic Forensic Research", 
      logo: "https://www.cambridgescholars.com/assets/img/logo.png",
      fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmNGY0ZjQiLz48dGV4dCB4PSI1MCIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI4IiBmaWxsPSIjMzMzMzMzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Kb3VybmFsPC90ZXh0Pjx0ZXh0IHg9IjUwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjgiIGZpbGw9IiMzMzMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvcmVuc2ljczwvdGV4dD48L3N2Zz4="
    },
    { 
      name: "Forensic Science Review", 
      description: "Forensic Research Database", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Scopus_logo.svg/320px-Scopus_logo.svg.png",
      fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRjZGMDAiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvcmVuc2ljIFJldmlldzwvdGV4dD48L3N2Zz4="
    },
    { 
      name: "International Journal of Legal Medicine", 
      description: "Legal Medicine Research", 
      logo: "https://www.bonviewglobal.com/assets/images/logo.png",
      fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmNGY0ZjQiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TGVnYWwgTWVkaWNpbmU8L3RleHQ+PC9zdmc+"
    }
  ];

  const mediaPartners = [
    { 
      name: "Forensic Magazine", 
      description: "Forensic Science News", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/TechCrunch_logo.svg",
      fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiMwMENGNjQiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvcmVuc2ljIE1hZzwvdGV4dD48L3N2Zz4="
    },
    { 
      name: "Crime Scene Investigation", 
      description: "CSI Magazine", 
      logo: "https://www.technologyreview.com/wp-content/uploads/2020/02/mit-logo-2020-web.png",
      fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNBMzE2MjEiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNTSTwvdGV4dD48L3N2Zz4="
    },
    { 
      name: "Forensic Science Today", 
      description: "Forensic Research Publication", 
      logo: "https://spectrum.ieee.org/media/logo/IEEE-spectrum-logo.svg",
      fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiMwMDU1RkYiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvcmVuc2ljIFRvZGF5PC90ZXh0Pjwvc3ZnPg=="
    },
    { 
      name: "Legal Medicine Today", 
      description: "Legal Medicine News", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Wired_logo.svg",
      fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHRleHQgeD0iNTAiIHk9IjI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMwMDAwMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxlZ2FsIE1lZGljaW5lPC90ZXh0Pjwvc3ZnPg=="
    },
    { 
      name: "Forensic Research Network", 
      description: "Forensic Research News", 
      logo: "https://venturebeat.com/wp-content/uploads/2020/06/VB_logo_2020.png",
      fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRjI0MDAiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvcmVuc2ljIFJlc2VhcmNoPC90ZXh0Pjwvc3ZnPg=="
    }
  ];

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle subscription
  const handleSubscribe = async () => {
    setEmailError('');
    
    if (!email.trim()) {
      setEmailError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in localStorage for demo purposes
      const subscribers = JSON.parse(localStorage.getItem('forensicScienceSubscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('forensicScienceSubscribers', JSON.stringify(subscribers));
      }
      
      setIsSubscribed(true);
      setEmail('');
      
      // Reset subscription status after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
      
    } catch (error) {
      setEmailError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  // Toggle day expansion
  const toggleDayExpansion = (day: string) => {
    setExpandedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  // Expand all days
  const expandAllDays = () => {
    setExpandedDays({
      'Day 1': true,
      'Day 2': true,
      'Day 3': true
    });
  };

  // Collapse all days
  const collapseAllDays = () => {
    setExpandedDays({
      'Day 1': false,
      'Day 2': false,
      'Day 3': false
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${heroBackground})`,
              filter: 'brightness(0.4) contrast(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/80 to-slate-900/95" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              International Conference on <span className="text-primary">Forensic Science</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Join leading forensic experts from around the world in Lisbon, Portugal for groundbreaking research presentations and networking opportunities.
            </motion.p>

            {/* Countdown Timer */}
            <motion.div 
              className="flex justify-center space-x-8 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-primary">{value}</div>
                  <div className="text-sm text-gray-300 uppercase">{unit}</div>
                </div>
              ))}
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg"
                onClick={() => navigate('/registration')}
              >
                Register Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-slate-900"
                onClick={() => navigate('/abstract-submission')}
              >
                Submit Abstract
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conference Overview */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              World-Class <span className="text-primary">Venue</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Experience cutting-edge forensic science in Lisbon's premier conference facilities
            </p>
          </motion.div>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {venueImages.map((image, index) => (
                <CarouselItem key={index}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img 
                          src={image.src} 
                          alt={image.alt}
                          className="w-full h-96 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                          <h3 className="text-white text-xl font-semibold">{image.title}</h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Chairperson Welcome */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <img 
                  src={chairpersonImage} 
                  alt="Conference Chairperson"
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
                  <div className="text-sm font-semibold">Conference Chair</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Welcome from the <span className="text-primary">Chairperson</span>
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p>
                  "I am delighted to welcome you to the International Conference on Forensic Science. This premier event brings together the world's leading forensic experts, researchers, and practitioners to share groundbreaking discoveries and innovative methodologies."
                </p>
                <p>
                  "Join us in Lisbon for three days of intensive learning, networking, and collaboration that will shape the future of forensic science."
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-foreground">Dr. Maria Santos</p>
                  <p className="text-sm">Conference Chairperson</p>
                  <p className="text-sm">Chief Forensic Scientist, Lisbon Crime Lab</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Abstract Submission CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Share Your Research
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Present your latest forensic science research to an international audience of peers and experts.
            </p>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg"
              onClick={() => navigate('/abstract-submission')}
            >
              Submit Your Abstract
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Keynote <span className="text-primary">Speakers</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Learn from distinguished experts who are advancing the field of forensic science globally.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {speakers.map((speaker, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden">
                      <img 
                        src={speaker.image} 
                        alt={speaker.name}
                        className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="text-white font-semibold">{speaker.country}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <h3 className="text-xl font-bold text-foreground">{speaker.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{speaker.title}</p>
                  </CardContent>
                  <CardFooter className="border-t border-border pt-4">
                    <div className="text-sm text-primary font-medium">{speaker.expertise}</div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Registration <span className="text-primary">Options</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Choose the registration option that best suits your needs and budget.
            </p>
            
            {isEarlyBird && (
              <div className="mt-6 bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 rounded-xl p-4 max-w-2xl mx-auto">
                <p className="font-bold text-orange-800 text-lg">🔥 EARLY BIRD SPECIAL ACTIVE!</p>
                <p className="text-orange-700 text-sm">Save up to 30% - Ends {earlyBirdDate.toLocaleDateString()}</p>
              </div>
            )}
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`h-full flex flex-col ${
                  tier.title === "Speaker" 
                    ? "border-primary shadow-lg ring-2 ring-primary/20" 
                    : ""
                }`}>
                  {tier.title === "Speaker" && (
                    <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                      ⭐ Most Popular
                    </div>
                  )}
                  
                  <CardHeader>
                    <h3 className="text-xl font-bold text-foreground">{tier.title}</h3>
                    {tier.subtitle && <p className="text-muted-foreground text-sm">{tier.subtitle}</p>}
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-primary">${tier.price}</span>
                      <span className="text-muted-foreground">/person</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={tier.title === "Speaker" ? "default" : "outline"}
                      onClick={() => navigate('/registration')}
                    >
                      Register Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Group discounts available for 5+ registrations. Contact us for more information.
            </p>
            <Button variant="outline" onClick={() => navigate('/contact')}>
              Contact for Group Rates
            </Button>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Conference <span className="text-primary">Schedule</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Detailed agenda for three intensive days of forensic science presentations and networking.
            </p>
          </motion.div>

          <div className="space-y-6">
            {scheduleData.map((dayData, dayIndex) => (
              <motion.div
                key={dayIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
              >
                <Card>
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => toggleDayExpansion(dayData.day)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{dayData.day}</h3>
                        <p className="text-muted-foreground">{dayData.date}</p>
                      </div>
                      {expandedDays[dayData.day] ? <ChevronUp /> : <ChevronDown />}
                    </div>
                  </CardHeader>
                  
                  <AnimatePresence>
                    {expandedDays[dayData.day] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Time</TableHead>
                                <TableHead>Activity</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {dayData.sessions.map((session, sessionIndex) => (
                                <TableRow key={sessionIndex}>
                                  <TableCell className="font-medium">{session.time}</TableCell>
                                  <TableCell>{session.activity}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 space-x-4">
            <Button variant="outline" onClick={expandAllDays}>
              Expand All
            </Button>
            <Button variant="outline" onClick={collapseAllDays}>
              Collapse All
            </Button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Our <span className="text-primary">Partners</span>
            </h2>
          </motion.div>

          <Tabs defaultValue="publishing" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="publishing">Publishing Partners</TabsTrigger>
              <TabsTrigger value="media">Media Partners</TabsTrigger>
            </TabsList>
            
            <TabsContent value="publishing" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {publishingPartners.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="h-12 mx-auto mb-4 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = partner.fallbackLogo;
                        }}
                      />
                      <h3 className="font-semibold text-foreground">{partner.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{partner.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="media" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
                {mediaPartners.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="h-12 mx-auto mb-4 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = partner.fallbackLogo;
                        }}
                      />
                      <h3 className="font-semibold text-foreground">{partner.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{partner.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to receive the latest updates about the conference, speakers, and program changes.
            </p>
            
            {!isSubscribed ? (
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-white text-slate-900"
                  disabled={isLoading}
                />
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary"
                  onClick={handleSubscribe}
                  disabled={isLoading}
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <CheckIcon className="h-16 w-16 mx-auto mb-4 text-green-400" />
                <p className="text-xl font-semibold">Thank you for subscribing!</p>
                <p className="opacity-90">You'll receive our latest updates soon.</p>
              </div>
            )}
            
            {emailError && (
              <p className="text-red-300 mt-2">{emailError}</p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ForensicScience;