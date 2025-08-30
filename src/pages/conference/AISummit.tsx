import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check as CheckIcon, Mail, Bell, Calendar, Globe, ChevronDown, ChevronUp, Eye, EyeOff, X, MapPin, Users, ArrowRight, Star, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getConferenceWithDetails } from '@/lib/conferences';
import type { Conference, Speaker, VenueImage, PricingTier, ScheduleSession, ScheduleDay, PublishingPartner, MediaPartner } from '@/lib/conferences';
import { getImagePath } from '@/lib/imageUtils';

const AISummit = () => {
  const navigate = useNavigate();
  
  // Get conference data dynamically
  const conference = getConferenceWithDetails('aisummit');
  
  // Fallback if conference not found
  if (!conference) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Conference Not Found</h1>
          <p className="text-muted-foreground">The requested conference could not be found.</p>
        </div>
      </div>
    );
  }

  // Extract conference data
  const {
    id,
    title,
    date,
    venue,
    location,
    image,
    description,
    heroSubtitle,
    heroBadgeText,
    expertSpeakers,
    sessions,
    chairperson,
    chairpersonDescription,
    conferenceOverview,
    conferencepara1,
    conferencepara2,
    speakerheader,
    abstractkeytopics,
    charipersonheader,
    chairpersonpara1,
    chairpersonpara2,
    speakers,
    venueImages,
    pricingTiers,
    schedule,
    publishingPartners,
    mediaPartners,
    abstractDeadline,
    registrationDeadline,
    notificationDeadline
  } = conference;

  // State management
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
    'Day 1': true, // First day expanded by default
    'Day 2': false,
    'Day 3': false
  });
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isSpeakerModalOpen, setIsSpeakerModalOpen] = useState(false);

  // Parse conference date for countdown
  const parseConferenceDate = (dateString: string) => {
    // Handle format like "November 15-17, 2025"
    const match = dateString.match(/(\w+)\s+(\d+)-(\d+),\s+(\d+)/);
    if (match) {
      const [, month, startDay, endDay, year] = match;
      const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
      // Use the start date for countdown
      return new Date(parseInt(year), monthIndex, parseInt(startDay));
    }
    // Fallback to direct parsing
    return new Date(dateString);
  };
  
  const targetDate = parseConferenceDate(date);
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
  }, [targetDate]);

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
      const subscribers = JSON.parse(localStorage.getItem('aiSummitSubscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('aiSummitSubscribers', JSON.stringify(subscribers));
      }
      
      setIsSubscribed(true);
      setEmail('');
      
      // Reset subscription status after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
      
    } catch (error) {
      setEmailError('Failed to subscribe. Please try again.');
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
  const toggleDay = (day: string) => {
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
      {/* Professional Hero Section with Sophisticated Animations */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Multi-layered Background with Parallax Effect */}
        <div className="absolute inset-0">
          {/* Base Image Layer */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[20s] ease-out"
            style={{
              backgroundImage: `url(${getImagePath(image)})`,
              transform: 'scale(1.05)',
              filter: 'brightness(0.4) contrast(1.1) saturate(1.2)'
            }}
          />
          
          {/* Gradient Overlay with Professional Look */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/80 to-slate-900/95" />
          
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        {/* Advanced Floating Elements with Professional Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large Ambient Orb */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full animate-[orbital_25s_linear_infinite]" />
          
          {/* Medium Tech Particles */}
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary/60 rounded-full animate-[techFloat_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-secondary/80 rounded-full animate-[techFloat_6s_ease-in-out_infinite_1s]" />
          <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-accent/70 rounded-full animate-[techFloat_10s_ease-in-out_infinite_2s]" />
          
          {/* Geometric Grid Lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-[slideRight_12s_ease-in-out_infinite]" />
            <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary to-transparent animate-[slideLeft_15s_ease-in-out_infinite]" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            {/* Early Bird Special Banner */}
            {/* {isEarlyBird && (
              <motion.div 
                className="mb-8 animate-[staggerUp_0.6s_ease-out_0.1s_both]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl p-6 shadow-2xl border-2 border-yellow-300">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="text-4xl"
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        🔥
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">EARLY BIRD SPECIAL</h3>
                        <p className="text-white/90 font-medium">Limited Time Offer - Save up to 20% on Registration!</p>
                      </div>
                    </div>
                    <motion.div
                      className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
                      animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: ["0 0 0 0 rgba(255, 255, 255, 0.7)", "0 0 0 10px rgba(255, 255, 255, 0)", "0 0 0 0 rgba(255, 255, 255, 0)"]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    >
                      <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
                      <span className="text-white font-bold">ENDS SOON</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )} */}

            {/* Professional Animated Badge */}
            <div className="inline-block animate-[staggerUp_0.8s_ease-out_0.2s_both]">
              <div className="group relative px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-full text-sm font-medium mb-12 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative inline-flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-[techPulse_2s_ease-in-out_infinite]" />
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-[techPulse_2s_ease-in-out_infinite_0.3s]" />
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-[techPulse_2s_ease-in-out_infinite_0.6s]" />
                  </div>
                                     <span className="tracking-wider uppercase">{heroBadgeText}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-[techPulse_2s_ease-in-out_infinite_0.9s]" />
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-[techPulse_2s_ease-in-out_infinite_1.2s]" />
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-[techPulse_2s_ease-in-out_infinite_1.5s]" />
                  </div>
                </span>
              </div>
            </div>
            
            {/* Professional Animated Title */}
            <div className="overflow-hidden mb-16">
              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-extralight text-white leading-[0.9] tracking-tight">
                <div className="animate-[staggerUp_1s_ease-out_0.4s_both]">
                  <span className="inline-block font-light"> AI Innovation </span>
                </div>
                <div className="animate-[staggerUp_1s_ease-out_0.6s_both] mt-4">
                  <span className="inline-block font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-secondary bg-size-200 animate-[gradientShift_4s_ease-in-out_infinite]">
                    Summit 
                  </span>
                </div>
                <div className="animate-[staggerUp_1s_ease-out_0.8s_both] mt-4">
                  <span className="inline-block font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-secondary to-accent bg-size-200 animate-[gradientShift_4s_ease-in-out_infinite]">
                    2025
                  </span>
                </div>
              </h1>
              
              {/* Professional Subtitle */}
              <div className="animate-[staggerUp_1s_ease-out_1s_both] mt-8">
                <p className="text-xl lg:text-xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed">
                  {heroSubtitle.split(',')[0]} , 
                  <span className="text-white font-medium"> {heroSubtitle.split(',')[1]}</span>
                </p>
              </div>
            </div>
            
            {/* Professional Info Cards with Advanced Animations */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:p-6 lg:p-8 mb-16">
              <div className="group animate-[staggerUp_1s_ease-out_1.2s_both]">
                <div className="relative overflow-hidden bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 transition-all duration-700 hover:bg-white/8 hover:border-white/20 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10 p-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                        <svg className="w-6 h-6 text-white transition-transform duration-500 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-[techPulse_2s_ease-in-out_infinite]" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-white/60 font-medium uppercase tracking-wider mb-1">Event Dates</div>
                      <div className="text-xl font-semibold text-white">{date}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="group animate-[staggerUp_1s_ease-out_1.4s_both]">
                <div className="relative overflow-hidden bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 transition-all duration-700 hover:bg-white/8 hover:border-white/20 hover:scale-105 hover:shadow-2xl hover:shadow-secondary/10 p-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                        <svg className="w-6 h-6 text-white transition-transform duration-500 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-[techPulse_2s_ease-in-out_infinite_0.5s]" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-white/60 font-medium uppercase tracking-wider mb-1">Location</div>
                      <div className="text-xl font-semibold text-white">{location}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ultra-Professional Countdown Timer */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-16 animate-[staggerUp_1s_ease-out_1.6s_both] px-4">
              {Object.entries(timeLeft).map(([unit, value], index) => (
                <div key={unit} className="group">
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-700 scale-110" />
                    
                    {/* Main Card */}
                    <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8 min-w-[80px] sm:min-w-[100px] lg:min-w-[80px] sm:min-w-[100px] lg:min-w-[110px] border border-white/10 transition-all duration-700 hover:bg-white/8 hover:border-white/20 hover:scale-105 hover:shadow-2xl">
                      {/* Animated Border */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="w-full h-full bg-white/5 rounded-3xl" />
                      </div>
                      
                      {/* Content */}
                      <div className="relative text-center">
                        <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-1 sm:mb-1 sm:mb-2 transition-all duration-500 group-hover:scale-110 tabular-nums">
                          {value.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs sm:text-xs sm:text-xs uppercase tracking-widest text-white/60 font-medium leading-tight leading-tight">{unit}</div>
                        
                        {/* Micro Animation Dot */}
                        <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-primary rounded-full animate-[techPulse_2s_ease-out_infinite] opacity-60" 
                             style={{ animationDelay: `${index * 0.2}s` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Animated Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in animation-delay-1200">
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-10 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25"
                onClick={() => navigate('/registration?conference=aisummit')}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Register Now
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
              
              <Button 
                size="lg" 
                className={`group relative overflow-hidden px-10 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isEarlyBird 
                    ? "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white border-0 shadow-2xl hover:shadow-3xl animate-pulse" 
                    : "opacity-50 cursor-not-allowed border-muted text-muted-foreground bg-muted"
                }`}
                disabled={!isEarlyBird}
                onClick={() => isEarlyBird && navigate('/registration?conference=aisummit')}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {isEarlyBird ? (
                    <>
                      <motion.div 
                        className="w-3 h-3 bg-yellow-300 rounded-full"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          boxShadow: ["0 0 0 0 rgba(255, 255, 0, 0.7)", "0 0 0 10px rgba(255, 255, 0, 0)", "0 0 0 0 rgba(255, 255, 0, 0)"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                      />
                      <span className="font-bold text-lg">🔥 EARLY BIRD SPECIAL</span>
                      <motion.div 
                        className="w-3 h-3 bg-yellow-300 rounded-full"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          boxShadow: ["0 0 0 0 rgba(255, 255, 0, 0.7)", "0 0 0 10px rgba(255, 255, 0, 0)", "0 0 0 0 rgba(255, 255, 0, 0)"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop",
                          delay: 0.5
                        }}
                      />
                    </>
                  ) : (
                    "Early Bird Expired"
                  )}
                </span>
                {isEarlyBird && (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-orange-400/30 to-red-400/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                    />
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-500"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(255, 193, 7, 0.7)",
                          "0 0 0 15px rgba(255, 193, 7, 0)",
                          "0 0 0 0 rgba(255, 193, 7, 0)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                  </>
                )}
              </Button>

              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-10 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25"
                onClick={() => navigate('/submit-abstract')}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Submit Abstract
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Conference Summary */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Carousel className="w-full">
                <CarouselContent>
                  {venueImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative">
                        <img 
                          src={getImagePath(image.src)} 
                          alt={image.alt}
                          className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                        />
                        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg">
                          <span className="text-sm font-semibold">{image.title}</span>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-semibold mb-6">
                Conference Overview
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Advancing <span className="text-primary">AI</span> Through Innovation
              </h2>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {conferencepara1}
              </p>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {conferencepara2}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{expertSpeakers}</div>
                  <div className="text-muted-foreground">Expert Speakers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{sessions}</div>
                  <div className="text-muted-foreground">Sessions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chairperson Welcome */}
      <section className="py-20 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={getImagePath("aisummit/chairperson-tech.jpg")} 
                alt="Conference Chairperson"
                className="w-full max-w-md mx-auto h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>
            
            <div>
              <div className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-6">
                Welcome Message
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                A Message from Our <span className="text-primary">Conference Chair</span>
              </h2>
              
              <blockquote className="text-muted-foreground text-lg leading-relaxed mb-6 italic">
                "{chairpersonpara1}"
              </blockquote>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {chairpersonpara2}
              </p>
              
              <div className="mb-8">
                <p className="font-semibold text-foreground">{chairperson}</p>
                <p className="text-muted-foreground">{chairpersonDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Abstract Submission Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary/10 rounded-lg p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-4">
                Call for Papers
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Submit Your Abstract</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Share your research and insights with the global AI community. We welcome abstracts on all aspects of AI research and development.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 sm:p-6 lg:p-8 mb-8">
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-3">Key Topics</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {abstractkeytopics[0]}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {abstractkeytopics[1]}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {abstractkeytopics[2]}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {abstractkeytopics[3]}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {abstractkeytopics[4]}
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-3">Submission Guidelines</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold min-w-[120px]">Deadline:</span>
                    <span>{abstractDeadline}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold min-w-[120px]">Format:</span>
                    <span>300-500 words, PDF format</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold min-w-[120px]">Requirements:</span>
                    <span>Original research, clear methodology, significant findings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold min-w-[120px]">Notification:</span>
                    <span>{notificationDeadline}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => window.location.href = '/submit-abstract'}
              >
                Submit Your Abstract
              </Button>
              <Button 
                variant="secondary"
                size="lg"
                onClick={() => {
                  const link = document.createElement('a');
                  // link.href = '/sample-abstract.pdf';
                  // link.download = 'sample-abstract.pdf';
                  link.href = '/abstract-sample-template.pdf';
                  link.download = 'abstract-sample-template.pdf';
                  link.click();
                }}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                📄 Download Sample Abstract
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/20 text-secondary rounded-full text-sm font-semibold mb-6">
              International Experts
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Meet Our Distinguished <span className="text-primary">Speakers</span>
            </h2>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {speakerheader}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 sm:p-6 lg:p-8">
            {speakers.map((speaker, index) => (
              <button
                key={index}
                className="text-left w-full group"
                onClick={() => {
                  setSelectedSpeaker(speaker);
                  setIsSpeakerModalOpen(true);
                }}
              >
                <div className="flex items-center gap-6">
                  {/* Circular Speaker Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                      <img 
                        src={getImagePath(speaker.image)} 
                        alt={speaker.name}
                        className="w-full h-full object-cover rounded-full border-3 border-white/30 shadow-lg"
                      />
                      {/* Country badge */}
                      {/* <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        {speaker.country}
                      </div> */}
                    </div>
                  </div>
                  
                  {/* Speaker Information */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white mb-1 sm:mb-2 group-hover:text-primary transition-colors duration-300 drop-shadow-sm">
                      {speaker.name}
                    </h3>
                    <p className="text-violet-500 font-semibold text-sm mb-1 sm:mb-2 drop-shadow-sm">
                      {speaker.title}
                    </p>
                    <p className="text-white/90 text-sm leading-relaxed drop-shadow-sm">
                      {speaker.expertise}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Speaker Modal */}
          <Dialog open={isSpeakerModalOpen} onOpenChange={setIsSpeakerModalOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  Speaker Profile
                </DialogTitle>
              </DialogHeader>
              
              {selectedSpeaker && (
                <div className="flex flex-col lg:flex-row gap-4 sm:p-6 lg:p-8">
                  {/* Speaker Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-48 h-64">
                      <img 
                        src={getImagePath(selectedSpeaker.image)} 
                        alt={selectedSpeaker.name}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                      />
                      {/* <div className="absolute top-4 left-4 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                        {selectedSpeaker.country}
                      </div> */}
                    </div>
                  </div>
                  
                  {/* Speaker Information */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-3xl font-bold text-foreground mb-1 sm:mb-2">
                      {selectedSpeaker.name}
                    </h3>
                    <p className="text-violet-500 font-semibold text-lg mb-6">
                      {selectedSpeaker.title}
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <p className="text-sm font-semibold text-gray-600 mb-1">Expertise</p>
                      <p className="text-violet-500 font-medium">{selectedSpeaker.expertise}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-3">Biography</p>
                      <p className="text-foreground leading-relaxed text-base">
                        {selectedSpeaker.biography}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Registration Options
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Choose Your <span className="text-primary">Pricing Plan</span>
            </h2>
            
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Select the registration option that best suits your needs and budget.
            </p>
            
            {/* {isEarlyBird && (
              <div className="mt-6 max-w-2xl mx-auto">
                <div className="bg-gradient-to-r from-orange-100 via-red-100 to-pink-100 border-2 border-orange-300 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center justify-center gap-3">
                    <div className="text-2xl">⏰</div>
                    <div className="text-center">
                      <p className="font-bold text-orange-800 text-lg">🔥 EARLY BIRD SPECIAL ACTIVE!</p>
                      <p className="text-orange-700 text-sm">Save up to 30% - Ends {earlyBirdDate.toLocaleDateString()}</p>
                    </div>
                    <div className="text-2xl">🔥</div>
                  </div>
                </div>
              </div>
            )} */}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:p-6 lg:p-8 mb-12">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border relative ${
                  tier.title === "Speaker" 
                    ? "border-blue-300 shadow-blue-100/50 ring-2 ring-blue-200/50" 
                    : "border-gray-100"
                }`}
              >
                {tier.title === "Speaker" && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      ⭐ Most Popular
                    </div>
                  </div>
                )}
                
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-bold text-foreground">{tier.title}</h3>
                  {tier.subtitle && <p className="text-muted-foreground text-sm mt-1">{tier.subtitle}</p>}
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">${tier.price}</span>
                    <span className="ml-1 text-muted-foreground">/person</span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col h-full">
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full py-3 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200" 
                    variant="default"
                    onClick={() => navigate('/registration?conference=forensicscience')}
                  >
                    Register Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Group discounts available for 5+ registrations. Contact us for more information.
            </p>
            <Button variant="outline" onClick={() => navigate('/contact')}>Contact for Group Rates</Button>
          </div>
        </div>
      </section>

            {/* Conference Schedule */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Program Overview
            </motion.div>

            <motion.h2
              className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Conference <span className="text-primary">Agenda</span>
            </motion.h2>

            <motion.p
              className="text-muted-foreground text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore our comprehensive three-day program featuring keynotes, panel discussions, and networking opportunities.
            </motion.p>
          </div>

          {/* Schedule Controls */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={expandAllDays}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Expand All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={collapseAllDays}
                className="flex items-center gap-2"
              >
                <EyeOff className="w-4 h-4" />
                Collapse All
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Click on any day to expand/collapse the schedule
            </div>
          </motion.div>

          <div className="space-y-6">
                              {schedule.map((day, dayIndex) => (
              <motion.div
                key={day.day}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * dayIndex }}
              >
                {/* Day Header */}
                <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{day.day}</h3>
                        <p className="text-muted-foreground text-sm">{day.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium text-muted-foreground">Western European Time (WET)</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleDay(day.day)}
                      className="flex items-center gap-2 hover:bg-white/20 transition-colors duration-200"
                    >
                      <span className="text-sm font-medium text-foreground">
                        {expandedDays[day.day] ? 'Hide Schedule' : 'Show Schedule'}
                      </span>
                      <motion.div
                        animate={{ rotate: expandedDays[day.day] ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </Button>
                  </div>
                </div>

                {/* Schedule Table */}
                <AnimatePresence>
                  {expandedDays[day.day] && (
                    <motion.div
                      className="overflow-x-auto"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50">
                        <TableHead className="w-[120px] font-semibold text-gray-700">Time</TableHead>
                        <TableHead className="font-semibold text-gray-700">Activity</TableHead>
                        <TableHead className="w-[100px] font-semibold text-gray-700 text-center">Duration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {day.sessions.map((session, sessionIndex) => {
                        const [startTime, endTime] = session.time.split('-');
                        const start = new Date(`2000-01-01T${startTime.trim()}`);
                        const end = new Date(`2000-01-01T${endTime.trim()}`);
                        const durationMinutes = Math.round((end.getTime() - start.getTime()) / (1000 * 60));
                        const duration = durationMinutes >= 60 
                          ? `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`
                          : `${durationMinutes}m`;

                        return (
                          <TableRow 
                            key={sessionIndex}
                            className={`hover:bg-gray-50/50 transition-colors duration-200 ${
                              session.activity.toLowerCase().includes('break') 
                                ? 'bg-blue-50/30' 
                                : session.activity.toLowerCase().includes('lunch') 
                                ? 'bg-orange-50/30'
                                : session.activity.toLowerCase().includes('session') 
                                ? 'bg-green-50/30'
                                : ''
                            }`}
                          >
                            <TableCell className="font-medium text-gray-900">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                {session.time}
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-800">
                              <div className="flex items-center gap-3">
                                <div className="flex-shrink-0">
                                  {session.activity.toLowerCase().includes('break') && (
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                      <span className="text-blue-600 text-xs">☕</span>
                                    </div>
                                  )}
                                  {session.activity.toLowerCase().includes('lunch') && (
                                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                      <span className="text-orange-600 text-xs">🍽️</span>
                                    </div>
                                  )}
                                  {session.activity.toLowerCase().includes('session') && (
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                      <span className="text-green-600 text-xs">📋</span>
                                    </div>
                                  )}
                                  {!session.activity.toLowerCase().includes('break') && 
                                   !session.activity.toLowerCase().includes('lunch') && 
                                   !session.activity.toLowerCase().includes('session') && (
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                      <span className="text-gray-600 text-xs">📅</span>
                                    </div>
                                  )}
                                </div>
                                <span className="font-medium">{session.activity}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center text-sm text-gray-600 font-medium">
                              {duration}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.div
              className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <p className="text-muted-foreground font-medium">Program Updates</p>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              </div>
              <p className="text-muted-foreground">
                The detailed program with specific sessions and speakers will be available closer to the event date.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Publishing & Media Partners */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Partners
            </motion.div>
            
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Publishing & Media <span className="text-primary">Partners</span>
            </motion.h2>
            
            <motion.p 
              className="text-muted-foreground text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We're proud to collaborate with leading AI publications and media organizations.
            </motion.p>
          </div>
          
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-foreground mb-8 text-center">Publishing Partners</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
              {publishingPartners.map((partner, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center justify-center h-32 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-12 object-contain mb-3"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = partner.fallbackLogo;
                    }}
                  />
                  <p className="text-xs text-center text-muted-foreground">{partner.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-8 text-center">Media Partners</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
              {mediaPartners.map((partner, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-md flex flex-col items-center justify-center h-24 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-10 object-contain"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = partner.fallbackLogo;
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center text-primary rounded-full text-sm font-semibold mb-6">
            <Button variant="outline" onClick={() => navigate('/contact')}>Become a Partner</Button>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/60 rounded-full animate-[techFloat_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-secondary/80 rounded-full animate-[techFloat_6s_ease-in-out_infinite_1s]" />
          <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-accent/70 rounded-full animate-[techFloat_10s_ease-in-out_infinite_2s]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 bg-white text-secondary rounded-full text-sm font-semibold mb-6">
              Stay Updated
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Never Miss a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Conference Opportunity</span>
            </h2>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Subscribe to our newsletter and be the first to know about upcoming conferences, 
              early bird specials, and exclusive research opportunities.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid lg:grid-cols-2 gap-4 sm:p-6 lg:p-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">What You'll Receive:</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Bell className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Early Bird Notifications</h4>
                      <p className="text-white/70 text-sm">Get notified before anyone else about registration openings</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Conference Updates</h4>
                      <p className="text-white/70 text-sm">Stay informed about schedule changes and new speakers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                      <Globe className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Global Opportunities</h4>
                      <p className="text-white/70 text-sm">Discover AI events worldwide</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <Mail className="w-5 h-5 text-primary" />
                    <label htmlFor="email" className="text-white font-medium">Email Address</label>
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 ${
                      emailError ? 'border-red-400 focus:ring-red-400/50' : ''
                    }`}
                    disabled={isLoading || isSubscribed}
                  />
                  {emailError && (
                    <motion.p
                      className="text-red-400 text-sm mt-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {emailError}
                    </motion.p>
                  )}
                </div>

                <Button
                  onClick={handleSubscribe}
                  disabled={isLoading || isSubscribed}
                  className={`w-full py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
                    isSubscribed
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Subscribing...
                    </div>
                  ) : isSubscribed ? (
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5" />
                      Successfully Subscribed!
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Subscribe Now
                    </div>
                  )}
                </Button>

                {isSubscribed && (
                  <motion.div
                    className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <p className="text-green-300 font-medium">
                      🎉 Welcome aboard! You'll receive updates about future AI Innovation Summit conferences.
                    </p>
                  </motion.div>
                )}

                <p className="text-white/60 text-sm text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AISummit;
