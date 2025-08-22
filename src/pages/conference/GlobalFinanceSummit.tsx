import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check as CheckIcon, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import heroBackground from '@/assets/globalfinancesummit/bg.jpg';
import venueInterior from '@/assets/globalfinancesummit/venue-interior.jpg';
import venueConference from '@/assets/globalfinancesummit/venue-conference-room.jpg';
import venueNetworking from '@/assets/globalfinancesummit/venue-networking.jpg';
import venueExhibition from '@/assets/globalfinancesummit/venue-exhibition.jpg';
import chairpersonImage from '@/assets/globalfinancesummit/chairperson.jpg';
import speaker1 from '@/assets/globalfinancesummit/speaker-1.jpg';
import speaker2 from '@/assets/globalfinancesummit/speaker-2.jpg';
import speaker3 from '@/assets/globalfinancesummit/speaker-3.jpg';
import speaker4 from '@/assets/globalfinancesummit/speaker-4.jpg';
import partner1 from '@/assets/globalfinancesummit/partner-1.jpg';
import partner2 from '@/assets/globalfinancesummit/partner-2.jpg';
import partner3 from '@/assets/globalfinancesummit/partner-3.jpg';
import partner4 from '@/assets/globalfinancesummit/partner-4.jpg';

const GlobalFinanceSummit = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [isSpeakerModalOpen, setIsSpeakerModalOpen] = useState(false);

  const targetDate = new Date('2026-01-12T09:00:00');
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
      alt: "Financial District Convention Hall - Main Hall",
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
      alt: "Finance Exhibition Hall",
      title: "Exhibition Area"
    }
  ];

  const speakers = [
    {
      name: "Dr. Emily Carter",
      title: "Chief Economist, Global Finance Institute",
      country: "United States",
      image: speaker1,
      expertise: "Global Markets",
      biography: "Dr. Emily Carter is recognized as 'The Global Markets Expert'. With over 15 years of experience in international finance, she has advised central banks and financial institutions across 40 countries. Dr. Carter has published extensively on monetary policy and global market dynamics, with her research cited in over 200 academic papers. She has served as a consultant for the International Monetary Fund and the World Bank, providing expert analysis on emerging market risks and opportunities. Dr. Carter holds a PhD in Economics from Harvard University and has been featured in major financial publications including The Economist and Financial Times."
    },
    {
      name: "Prof. Rajesh Gupta",
      title: "Director of Financial Research, Mumbai School of Economics",
      country: "India",
      image: speaker2,
      expertise: "Emerging Economies",
      biography: "Professor Rajesh Gupta is acclaimed as 'The Emerging Markets Specialist'. He has conducted groundbreaking research on financial inclusion and digital banking in developing economies, with his work influencing policy decisions in over 25 countries. Professor Gupta has authored three bestselling books on emerging market finance and has trained over 1,000 financial professionals. He serves on the advisory board of the Reserve Bank of India and has been instrumental in developing financial literacy programs across South Asia. His research on microfinance and fintech innovations has received international recognition and numerous awards."
    },
    {
      name: "Ms. Clara Zhang",
      title: "Senior VP of Investments, Shanghai Financial Group",
      country: "China",
      image: speaker3,
      expertise: "Investment Strategies",
      biography: "Ms. Clara Zhang is distinguished as 'The Investment Strategy Master'. She has managed portfolios worth over $50 billion and has consistently outperformed market benchmarks for the past decade. Ms. Zhang specializes in cross-border investments and has successfully navigated complex regulatory environments in Asia, Europe, and North America. She has been named one of the 'Top 50 Women in Finance' by Forbes Asia and has received the 'Excellence in Investment Management' award from the Asian Financial Association. Ms. Zhang holds an MBA from Stanford University and is a certified Chartered Financial Analyst."
    },
    {
      name: "Mr. Michael O'Connor",
      title: "CEO, European Banking Alliance",
      country: "Ireland",
      image: speaker4,
      expertise: "Banking Innovations",
      biography: "Mr. Michael O'Connor is celebrated as 'The Banking Innovation Pioneer'. He has led digital transformation initiatives that have revolutionized banking services across Europe, serving over 100 million customers. Mr. O'Connor has pioneered the implementation of blockchain technology in traditional banking and has been at the forefront of sustainable finance initiatives. He has received the 'European Banking Leader of the Year' award and has been recognized by the European Central Bank for his contributions to financial stability. Mr. O'Connor serves on the board of the European Banking Federation and is a frequent speaker at international banking conferences."
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
      date: "December 12, 2025",
      sessions: [
        { time: "08:00-09:30", activity: "Registrations & Introduction" },
        { time: "09:30-11:30", activity: "Plenary Session" },
        { time: "11:30-11:45", activity: "Networking Break" },
        { time: "11:45-13:15", activity: "Keynote Session" },
        { time: "13:15-14:00", activity: "Group Photo & Network Lunch" },
        { time: "14:00-16:00", activity: "Keynote Session" },
        { time: "16:00-16:15", activity: "Networking Break" },
        { time: "16:15-18:00", activity: "Financial Sessions" }
      ]
    },
    {
      day: "Day 2", 
      date: "December 13, 2025",
      sessions: [
        { time: "09:00-11:30", activity: "Plenary Session" },
        { time: "11:30-11:45", activity: "Networking Break" },
        { time: "11:45-13:45", activity: "Financial Sessions" },
        { time: "13:45-14:30", activity: "Networking Lunch Break" },
        { time: "14:30-16:30", activity: "Financial Sessions" },
        { time: "16:30-16:45", activity: "Networking Break" },
        { time: "16:45-18:30", activity: "Financial Sessions" },
        { time: "18:45-19:00", activity: "Certification" }
      ]
    },
    {
      day: "Day 3",
      date: "December 14, 2025", 
      sessions: [
        { time: "09:00-11:30", activity: "Financial Sessions" },
        { time: "11:30-11:45", activity: "Networking Break" },
        { time: "11:45-13:45", activity: "Financial Sessions" },
        { time: "13:45-14:30", activity: "Networking Lunch Break" },
        { time: "14:30-16:30", activity: "Financial Sessions" },
        { time: "16:30-16:45", activity: "Networking Break" },
        { time: "16:45-18:30", activity: "Financial Sessions" },
        { time: "18:30-19:00", activity: "Closing Ceremony" }
      ]
    }
  ];

  const publishingPartners = [
    { 
      name: "Financial Times", 
      description: "Global Financial News", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Financial_Times_logo.svg/320px-Financial_Times_logo.svg.png",
      fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRkYxRTAiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzFBMUExQSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RlQ8L3RleHQ+PC9zdmc+"
    },
    { 
      name: "The Economist", 
      description: "Economic Analysis", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/The_Economist_Logo.svg/320px-The_Economist_Logo.svg.png",
      fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmNGY0ZjQiLz48dGV4dCB4PSI1MCIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI4IiBmaWxsPSIjMzMzMzMzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5UaGU8L3RleHQ+PHRleHQgeD0iNTAiIHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iOCIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RWNvbm9taXN0PC90ZXh0Pjwvc3ZnPg=="
    },
    { 
      name: "Bloomberg", 
      description: "Financial Information", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Bloomberg_logo.svg/320px-Bloomberg_logo.svg.png",
      fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiMwMDAwMDAiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJsb29tYmVyZzwvdGV4dD48L3N2Zz4="
    },
    { 
      name: "Wall Street Journal", 
      description: "Business & Markets", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/WSJ_Logo.svg/320px-WSJ_Logo.svg.png",
      fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmNGY0ZjQiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+V1NKPC90ZXh0Pjwvc3ZnPg=="
    }
  ];

  const mediaPartners = [
    { 
      name: "CNBC", 
      description: "Business News", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/CNBC_logo.svg/320px-CNBC_logo.svg.png",
      fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiMwMDVGQkYiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNOQkM8L3RleHQ+PC9zdmc+"
    },
    { 
      name: "Reuters", 
      description: "Financial News", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Reuters_logo.svg/320px-Reuters_logo.svg.png",
      fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHRleHQgeD0iNTAiIHk9IjI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMwMDAwMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlJldXRlcnM8L3RleHQ+PC9zdmc+"
    },
    { 
      name: "Forbes", 
      description: "Business Magazine", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Forbes_logo.svg/320px-Forbes_logo.svg.png",
      fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiMwMDAwMDAiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvcmJlczwvdGV4dD48L3N2Zz4="
    },
    { 
      name: "Financial Review", 
      description: "Business Analysis", 
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/94/Australian_Financial_Review_logo.svg/320px-Australian_Financial_Review_logo.svg.png",
      fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiMwNTI5NjIiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZpbmFuY2lhbCBSZXZpZXc8L3RleHQ+PC9zdmc+"
    },
    { 
      name: "Barron's", 
      description: "Investment News", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Barrons_logo.svg/320px-Barrons_logo.svg.png",
      fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRjI0MDAiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJhcnJvbidzPC90ZXh0Pjwvc3ZnPg=="
    }
  ];

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
              backgroundImage: `url(${heroBackground})`,
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
                  <span className="tracking-wider uppercase">Finance • Research • Innovation</span>
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
              <h1 className="text-6xl lg:text-8xl xl:text-9xl font-extralight text-white leading-[0.9] tracking-tight">
                <div className="animate-[staggerUp_1s_ease-out_0.4s_both]">
                  <span className="inline-block font-light">Global</span>
                </div>
                <div className="animate-[staggerUp_1s_ease-out_0.6s_both] mt-4">
                  <span className="inline-block font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-secondary bg-size-200 animate-[gradientShift_4s_ease-in-out_infinite]">
                    Finance Summit
                  </span>
                </div>
                <div className="animate-[staggerUp_1s_ease-out_0.8s_both] mt-4">
                  <span className="inline-block font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-secondary to-accent bg-size-200 animate-[gradientShift_4s_ease-in-out_infinite]">
                    2026
                  </span>
                </div>
              </h1>
              
              {/* Professional Subtitle */}
              <div className="animate-[staggerUp_1s_ease-out_1s_both] mt-8">
                <p className="text-xl lg:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed">
                  Navigate the future of finance, 
                  <span className="text-white font-medium"> with innovations </span>
                </p>
              </div>
            </div>
            
            {/* Professional Info Cards with Advanced Animations */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-16">
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
                      <div className="text-xl font-semibold text-white">Jan 12-14, 2026</div>
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
                      <div className="text-xl font-semibold text-white">New York, NY</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ultra-Professional Countdown Timer */}
            <div className="flex justify-center gap-4 mb-16 animate-[staggerUp_1s_ease-out_1.6s_both]">
              {Object.entries(timeLeft).map(([unit, value], index) => (
                <div key={unit} className="group">
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-700 scale-110" />
                    
                    {/* Main Card */}
                    <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 min-w-[110px] border border-white/10 transition-all duration-700 hover:bg-white/8 hover:border-white/20 hover:scale-105 hover:shadow-2xl">
                      {/* Animated Border */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="w-full h-full bg-white/5 rounded-3xl" />
                      </div>
                      
                      {/* Content */}
                      <div className="relative text-center">
                        <div className="text-4xl lg:text-5xl font-bold text-white mb-2 transition-all duration-500 group-hover:scale-110 tabular-nums">
                          {value.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs uppercase tracking-widest text-white/60 font-medium">{unit}</div>
                        
                        {/* Micro Animation Dot */}
                        <div className="absolute -top-2 -right-2 w-2 h-2 bg-primary rounded-full animate-[techPulse_2s_ease-in-out_infinite] opacity-60" 
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
                onClick={() => navigate('/registration')}
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
                variant="outline"
                className={`group relative overflow-hidden px-10 py-4 text-lg font-semibold rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  isEarlyBird 
                    ? "border-accent text-accent hover:bg-accent hover:text-white hover:shadow-2xl hover:shadow-accent/25" 
                    : "opacity-50 cursor-not-allowed border-muted text-muted-foreground"
                }`}
                disabled={!isEarlyBird}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isEarlyBird ? (
                    <>
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                      Early Bird Special
                    </>
                  ) : (
                    "Early Bird Expired"
                  )}
                </span>
                {isEarlyBird && (
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
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
                          src={image.src} 
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
                Shaping the Future of <span className="text-primary">Global Finance</span>
              </h2>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Join the most influential financial conference of 2025, where industry leaders, policymakers, and innovators converge to discuss the future of global finance. Connect with financial pioneers, explore emerging trends, and discover solutions that will define the next decade of financial transformation.
              </p>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                From sustainable finance and digital currencies to financial inclusion and regulatory frameworks, this three-day immersive experience brings together thought leaders, researchers, and innovators from across the globe to share insights, forge partnerships, and accelerate financial innovation.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">150+</div>
                  <div className="text-muted-foreground">Expert Speakers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">40+</div>
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
                src={chairpersonImage} 
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
                "Financial innovation is not just about creating new instruments—it's about transforming how we approach global economic challenges and opportunities. The Global Finance Summit 2025 represents a unique opportunity to witness the convergence of brilliant minds and revolutionary ideas in finance."
              </blockquote>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                As we stand at the threshold of unprecedented financial transformation, this conference serves as a catalyst for meaningful collaboration and groundbreaking discoveries. Join us in New York as we explore the innovations that will shape our financial future and create lasting impact across industries worldwide.
              </p>
              
              <div className="mb-8">
                <p className="font-semibold text-foreground">Dr. Jonathan Reynolds</p>
                <p className="text-muted-foreground">Conference Chair & Director of Financial Innovation, Global Finance Institute</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Abstract Submission Section - Now Separate */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary/10 rounded-lg p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-4">
                Call for Papers
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Submit Your Abstract</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Share your research and insights with the global financial community. We welcome abstracts on all aspects of finance and economics.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-3">Key Topics</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Sustainable Finance & ESG Investing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Digital Currencies & Blockchain
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Financial Inclusion & Emerging Markets
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Regulatory Frameworks & Compliance
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    AI & Machine Learning in Finance
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-3">Submission Guidelines</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold min-w-[120px]">Deadline:</span>
                    <span>September 30, 2025</span>
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
                    <span>October 31, 2025</span>
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
                  link.href = '/sample-abstract.pdf';
                  link.download = 'sample-abstract.pdf';
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
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Curly lines pattern */}
            <path d="M50 100 Q150 50 250 100 T450 100" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
            <path d="M600 150 Q700 100 800 150 T1000 150" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
            <path d="M100 300 Q200 250 300 300 T500 300" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
            <path d="M700 350 Q800 300 900 350 T1100 350" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
            <path d="M200 500 Q300 450 400 500 T600 500" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
            <path d="M800 550 Q900 500 1000 550 T1200 550" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
            <path d="M150 650 Q250 600 350 650 T550 650" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
            <path d="M750 700 Q850 650 950 700 T1150 700" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/20 text-secondary rounded-full text-sm font-semibold mb-6">
              International Experts
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Meet Our Distinguished <span className="text-primary">Speakers</span>
            </h2>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Learn from industry pioneers and thought leaders representing financial hubs across the globe.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
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
                        src={speaker.image} 
                        alt={speaker.name}
                        className="w-full h-full object-cover rounded-full border-3 border-white/30 shadow-lg"
                      />
                    </div>
                  </div>
                  
                  {/* Speaker Information */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300 drop-shadow-sm">
                      {speaker.name}
                    </h3>
                    <p className="text-violet-500 font-semibold text-sm mb-2 drop-shadow-sm">
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
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Speaker Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-48 h-64">
                      <img 
                        src={selectedSpeaker.image} 
                        alt={selectedSpeaker.name}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                  
                  {/* Speaker Information */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-3xl font-bold text-foreground mb-2">
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
      <motion.section 
        className="py-20 bg-muted/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Registration Options
            </motion.div>
            
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Choose Your <span className="text-primary">Pricing Plan</span>
            </motion.h2>
            
            <motion.p 
              className="text-muted-foreground text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Select the registration option that best suits your needs and budget.
              Early bird discounts available until {earlyBirdDate.toLocaleDateString()}.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {pricingTiers.map((tier, index) => (
              <motion.div 
                key={index}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border relative group ${
                  tier.title === "Speaker" 
                    ? "border-blue-300 shadow-blue-100/50 ring-2 ring-blue-200/50" 
                    : "border-gray-100"
                }`}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                {tier.title === "Speaker" && (
                  <motion.div
                    className="absolute top-4 right-4 z-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <motion.div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                      animate={{ 
                        boxShadow: [
                          "0 0 0 0 rgba(59, 130, 246, 0.7)",
                          "0 0 0 10px rgba(59, 130, 246, 0)",
                          "0 0 0 0 rgba(59, 130, 246, 0)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    >
                      ⭐ Most Popular
                    </motion.div>
                  </motion.div>
                )}
                <div className="p-6 border-b border-border relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h3 className="text-xl font-bold text-foreground group-hover:text-blue-600 transition-colors duration-300">{tier.title}</h3>
                    {tier.subtitle && <p className="text-muted-foreground text-sm mt-1">{tier.subtitle}</p>}
                  </motion.div>
                  <motion.div 
                    className="mt-4 flex items-baseline"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <span className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">${tier.price}</span>
                    <span className="ml-1 text-muted-foreground">/person</span>
                  </motion.div>
                </div>
                
                <div className="p-6 flex flex-col h-full relative z-10 min-h-[300px]">
                  <ul className="space-y-3 flex-grow mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex} 
                        className="flex items-center group/feature"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 * featureIndex }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <CheckIcon className="h-5 w-5 text-green-500 mr-2 group-hover/feature:text-green-600 transition-colors duration-200" />
                        </motion.div>
                        <span className="text-muted-foreground group-hover/feature:text-gray-700 transition-colors duration-200">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.div 
                    className="mt-6 relative z-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      animate={{
                        y: [0, -3, 0],
                        boxShadow: [
                          "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                          "0 15px 20px -3px rgba(0, 0, 0, 0.15)",
                          "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                        ]
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 17,
                        y: {
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        },
                        boxShadow: {
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }
                      }}
                    >
                      <Button 
                        className="w-full py-6 text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-purple-600 hover:to-blue-800 text-white border-0 relative overflow-hidden group animate-pulse" 
                        variant="default"
                        onClick={() => navigate('/registration')}
                      >
                        <motion.span
                          className="relative font-extrabold tracking-wide"
                          initial={{ opacity: 1 }}
                          whileHover={{ 
                            opacity: 1,
                            scale: 1.05,
                            textShadow: "0 0 10px rgba(255,255,255,0.8)"
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          🚀 Register Now
                        </motion.span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-purple-600 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-500 group-hover:duration-200"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(59, 130, 246, 0.7)",
                              "0 0 0 10px rgba(59, 130, 246, 0)",
                              "0 0 0 0 rgba(59, 130, 246, 0)"
                            ]
                          }}
                          transition={{
                            boxShadow: {
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "loop"
                            }
                          }}
                        />
                        <motion.div
                          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Group discounts available for 5+ registrations. Contact us for more information.
            </p>
            <Button variant="outline" onClick={() => navigate('/contact')}>Contact for Group Rates</Button>
          </div>
        </div>
      </motion.section>

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
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Tabs defaultValue="Day 1" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                {scheduleData.map((day) => (
                  <TabsTrigger key={day.day} value={day.day}>{day.day} <span className="hidden sm:inline ml-2">({day.date})</span></TabsTrigger>
                ))}
              </TabsList>
              
              {scheduleData.map((day) => (
                <TabsContent key={day.day} value={day.day} className="p-0">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">{day.day}: {day.date}</h3>
                    <p className="text-muted-foreground mb-6">All times are in Eastern Standard Time (EST)</p>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[150px]">Time</TableHead>
                          <TableHead>Activity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {day.sessions.map((session, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{session.time}</TableCell>
                            <TableCell>{session.activity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              The detailed program with specific sessions and speakers will be available closer to the event date.
            </p>
            <Button variant="outline" onClick={() => navigate('/program')}>View Full Program</Button>
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
              We're proud to collaborate with leading financial publications and media organizations.
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
          
          <div className="mt-12 text-center">
            <Button variant="outline" onClick={() => navigate('/partners')}>Become a Partner</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlobalFinanceSummit;