import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import venueImage from '@/assets/venue-tech-expo.jpg';
import chairpersonImage from '@/assets/chairperson-tech.jpg';
import speaker1 from '@/assets/speaker-1.jpg';
import speaker2 from '@/assets/speaker-2.jpg';
import speaker3 from '@/assets/speaker-3.jpg';
import speaker4 from '@/assets/speaker-4.jpg';

const ConferenceDetail = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-11-05T09:00:00');
    
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

  const speakers = [
    {
      name: "Dr. Kenji Nakamura",
      title: "Chief Technology Officer, Tokyo Innovation Labs",
      country: "Japan",
      image: speaker1,
      expertise: "AI & Machine Learning"
    },
    {
      name: "Prof. Elena Rodriguez",
      title: "Director of Digital Transformation, Barcelona Tech Institute",
      country: "Spain", 
      image: speaker2,
      expertise: "Digital Innovation"
    },
    {
      name: "Marcus Thompson",
      title: "Senior VP of Engineering, Silicon Valley Dynamics",
      country: "United States",
      image: speaker3,
      expertise: "Cloud Architecture"
    },
    {
      name: "Dr. Amara Okafor",
      title: "Research Lead, African Tech Foundation",
      country: "Nigeria",
      image: speaker4,
      expertise: "Emerging Technologies"
    }
  ];

  const pricingTiers = [
    {
      title: "Delegate/Listener",
      subtitle: "(In-Person)",
      price: 749,
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
      price: 699,
      features: [
        "Entry to all session and workshops",
        "Lunch & Coffee breaks",
        "Conference schedule handout",
        "Certificate of Attendance",
        "E-Abstract Book"
      ],
      featured: true
    },
    {
      title: "Student",
      subtitle: "",
      price: 449,
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
      price: 349,
      features: [
        "conference recorded video access",
        "Conference schedule handout",
        "Certificate of Attendance",
        "E-Abstract Book"
      ]
    }
  ];

  const scheduleData = [
    {
      day: "Day 1",
      date: "November 5, 2025",
      sessions: [
        { time: "08:00-09:30", activity: "Registrations & Introduction" },
        { time: "09:30-11:30", activity: "Plenary Session" },
        { time: "11:30-11:45", activity: "Networking Break" },
        { time: "11:15-13:15", activity: "Keynote Session" },
        { time: "13:15-14:00", activity: "Group Photo & Network Lunch" },
        { time: "14:00-16:00", activity: "Keynote Session" },
        { time: "16:00-16:15", activity: "Networking Break" },
        { time: "16:15-18:00", activity: "Scientific Sessions" }
      ]
    },
    {
      day: "Day 2", 
      date: "November 6, 2025",
      sessions: [
        { time: "09:00-11:30", activity: "Plenary Session" },
        { time: "11:30-11:45", activity: "Networking Break" },
        { time: "11:45-13:45", activity: "Scientific Sessions" },
        { time: "13:45-14:30", activity: "Networking Lunch Break" },
        { time: "14:30-16:30", activity: "Scientific Sessions" },
        { time: "16:30-16:45", activity: "Networking Break" },
        { time: "16:45-18:30", activity: "Scientific Sessions" },
        { time: "18:45-19:00", activity: "Certification" }
      ]
    },
    {
      day: "Day 3",
      date: "November 7, 2025", 
      sessions: [
        { time: "09:00-11:30", activity: "Scientific Sessions" },
        { time: "11:30-11:45", activity: "Networking Break" },
        { time: "11:45-13:45", activity: "Scientific Sessions" },
        { time: "13:45-14:30", activity: "Networking Lunch Break" },
        { time: "14:30-16:30", activity: "Scientific Sessions" },
        { time: "16:30-16:45", activity: "Networking Break" },
        { time: "16:45-18:30", activity: "Scientific Sessions" },
        { time: "18:30-19:00", activity: "Closing Ceremony" }
      ]
    }
  ];

  const publishingPartners = [
    "IEEE Computer Society",
    "ACM Digital Library", 
    "SpringerLink",
    "ScienceDirect",
    "ResearchGate"
  ];

  const mediaPartners = [
    "TechCrunch",
    "MIT Technology Review",
    "IEEE Spectrum",
    "Wired Magazine",
    "VentureBeat"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-6">
              Innovation • Technology • Future
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Tech Innovation <span className="text-primary">Expo 2025</span>
            </h1>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8 text-lg text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
                <span>November 5-7, 2025</span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span>Technology Convention Center, Austin, TX</span>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex justify-center gap-4 mb-8">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-primary/10 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                  <div className="text-2xl font-bold text-primary">{value}</div>
                  <div className="text-sm text-muted-foreground capitalize">{unit}</div>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
            >
              Register Now - Early Bird Special
            </Button>
          </div>
        </div>
      </section>

      {/* Conference Summary */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={venueImage} 
                alt="Technology Convention Center Austin"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-semibold mb-6">
                Conference Overview
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Shaping Tomorrow's <span className="text-primary">Digital Landscape</span>
              </h2>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Join the most influential technology conference of 2025, where groundbreaking innovations meet practical applications. Connect with industry pioneers, explore cutting-edge technologies, and discover solutions that will define the next decade of digital transformation.
              </p>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                From artificial intelligence and quantum computing to sustainable tech solutions, this three-day immersive experience brings together thought leaders, researchers, and innovators from across the globe to share insights, forge partnerships, and accelerate technological advancement.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">200+</div>
                  <div className="text-muted-foreground">Expert Speakers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
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
                "Innovation is not just about creating new technologies—it's about transforming how we live, work, and connect with one another. The Tech Innovation Expo 2025 represents a unique opportunity to witness the convergence of brilliant minds and revolutionary ideas."
              </blockquote>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                As we stand at the threshold of unprecedented technological advancement, this conference serves as a catalyst for meaningful collaboration and groundbreaking discoveries. Join us in Austin as we explore the innovations that will shape our digital future and create lasting impact across industries worldwide.
              </p>
              
              <div className="mb-8">
                <p className="font-semibold text-foreground">Dr. Sarah Mitchell</p>
                <p className="text-muted-foreground">Conference Chair & Director of Innovation, Global Tech Institute</p>
              </div>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Submit Your Abstract
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              International Experts
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Meet Our Distinguished <span className="text-primary">Speakers</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn from industry pioneers and thought leaders representing innovation hubs across the globe.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {speakers.map((speaker, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={speaker.image} 
                      alt={speaker.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      {speaker.country}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{speaker.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{speaker.title}</p>
                  <div className="inline-block px-3 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-semibold">
                    {speaker.expertise}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-6">
              Registration Slots
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Explore Our <span className="text-primary">Flexible Prices</span>
            </h2>
            
            <div className="flex justify-center mb-6">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  tier.featured ? 'ring-2 ring-primary scale-105' : ''
                }`}
              >
                <CardHeader className="p-6 pb-4">
                  <h3 className="text-xl font-bold text-foreground mb-1">{tier.title}</h3>
                  {tier.subtitle && (
                    <p className="text-muted-foreground text-sm">{tier.subtitle}</p>
                  )}
                  <div className="mt-4">
                    <span className="text-sm text-accent">$</span>
                    <span className="text-4xl font-bold text-accent">{tier.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">USD</span>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 pt-0">
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className={`w-full ${
                      tier.featured 
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                    size="lg"
                  >
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Conference Schedule */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-6">
              Our Schedule
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Conference <span className="text-primary">Schedule</span>
            </h2>
            
            <div className="flex justify-center mb-8">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {scheduleData.map((day, dayIndex) => (
              <Card key={dayIndex} className="overflow-hidden">
                <CardHeader className="bg-slate-700 text-white p-4">
                  <h3 className="text-lg font-bold text-center">{day.day}</h3>
                  <p className="text-sm text-center opacity-90">{day.date}</p>
                </CardHeader>
                
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {day.sessions.map((session, sessionIndex) => (
                      <div 
                        key={sessionIndex} 
                        className={`flex justify-between items-center p-4 border-b border-border ${
                          sessionIndex % 2 === 0 ? 'bg-background' : 'bg-secondary/10'
                        }`}
                      >
                        <span className="text-sm font-medium text-muted-foreground">{session.time}</span>
                        <span className="text-sm text-foreground text-right flex-1 ml-4">{session.activity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Publishing Partners */}
      <section className="py-20 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Publishing <span className="text-primary">Partners</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Showcasing research through leading academic and industry publications
            </p>
          </div>

          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-8">
            {publishingPartners.map((partner, index) => (
              <div 
                key={index}
                className="bg-background p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center h-24"
              >
                <span className="text-sm font-semibold text-foreground text-center">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Partners */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Media <span className="text-primary">Partners</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Amplifying innovation stories across global technology media platforms
            </p>
          </div>

          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-8">
            {mediaPartners.map((partner, index) => (
              <div 
                key={index}
                className="bg-secondary/10 p-6 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center h-24"
              >
                <span className="text-sm font-semibold text-foreground text-center">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Ready to Shape the <span className="text-primary">Future of Technology?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Secure your spot at the most influential technology conference of 2025. Early bird pricing ends soon!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
            >
              Register Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg font-semibold"
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConferenceDetail;