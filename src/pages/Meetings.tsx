import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import conferenceAI from '@/assets/conference-ai.jpg';
import conferenceMedical from '@/assets/conference-medical.jpg';
import conferenceSustainability from '@/assets/conference-sustainability.jpg';
import conferenceTech from '@/assets/conference-tech.jpg';
import conferenceFinance from '@/assets/conference-finance.jpg';
import conferenceEducation from '@/assets/conference-education.jpg';
import conferenceMarketing from '@/assets/conference-marketing.jpg';
import conferenceLegal from '@/assets/conference-legal.jpg';
import conferenceEngineering from '@/assets/conference-engineering.jpg';
import conferencePsychology from '@/assets/conference-psychology.jpg';
import conferenceArts from '@/assets/conference-arts.jpg';
import conferenceScience from '@/assets/conference-science.jpg';

const Meetings = () => {
  const conferences = [
    {
      id: 1,
      title: "AI Innovation Summit 2024",
      date: "March 15-17, 2024",
      venue: "Silicon Valley Convention Center",
      location: "San Francisco, CA",
      image: conferenceAI,
      description: "Join leading AI researchers, tech executives, and innovators as they unveil the future of artificial intelligence."
    },
    {
      id: 2,
      title: "Global Healthcare Revolution",
      date: "April 22-24, 2024",
      venue: "Medical Innovation Hub",
      location: "Boston, MA",
      image: conferenceMedical,
      description: "Discover breakthrough medical technologies and treatment innovations shaping the future of healthcare."
    },
    {
      id: 3,
      title: "Sustainable Future Conference",
      date: "May 10-12, 2024",
      venue: "Green Technology Center",
      location: "Seattle, WA",
      image: conferenceSustainability,
      description: "Unite with environmental leaders and green tech pioneers driving sustainable development worldwide."
    },
    {
      id: 4,
      title: "Tech Innovation Expo 2025",
      date: "November 5-7, 2025",
      venue: "Technology Convention Center",
      location: "Austin, TX",
      image: conferenceTech,
      description: "Explore cutting-edge technologies and connect with industry leaders shaping tomorrow's digital landscape."
    },
    {
      id: 5,
      title: "Global Finance Summit",
      date: "December 12-14, 2025",
      venue: "Financial District Convention Hall",
      location: "New York, NY",
      image: conferenceFinance,
      description: "Navigate the future of finance with expert insights on blockchain, fintech, and digital banking innovations."
    },
    {
      id: 6,
      title: "Education Transform Conference",
      date: "January 18-20, 2026",
      venue: "Academic Excellence Center",
      location: "Chicago, IL",
      image: conferenceEducation,
      description: "Revolutionize learning with innovative teaching methods and educational technology breakthroughs."
    },
    {
      id: 7,
      title: "Digital Marketing Masters",
      date: "February 8-10, 2026",
      venue: "Creative Innovation Hub",
      location: "Los Angeles, CA",
      image: conferenceMarketing,
      description: "Master the latest digital marketing strategies and tools driving successful brand transformations."
    },
    {
      id: 8,
      title: "Legal Innovation Forum",
      date: "March 15-17, 2026",
      venue: "Justice Center Conference Hall",
      location: "Washington, DC",
      image: conferenceLegal,
      description: "Explore how technology is reshaping legal practice and discover new approaches to justice delivery."
    },
    {
      id: 9,
      title: "Engineering Excellence Summit",
      date: "April 5-7, 2026",
      venue: "Industrial Innovation Center",
      location: "Detroit, MI",
      image: conferenceEngineering,
      description: "Advance engineering practices with breakthrough technologies and sustainable design methodologies."
    },
    {
      id: 10,
      title: "Mental Health & Psychology Congress",
      date: "May 12-14, 2026",
      venue: "Wellness Convention Center",
      location: "Denver, CO",
      image: conferencePsychology,
      description: "Transform mental healthcare with innovative therapeutic approaches and psychological research findings."
    },
    {
      id: 11,
      title: "Creative Arts & Design Festival",
      date: "May 26-28, 2026",
      venue: "Arts & Culture Center",
      location: "Miami, FL",
      image: conferenceArts,
      description: "Celebrate creativity and innovation in arts, design, and digital media with industry visionaries."
    },
    {
      id: 12,
      title: "Scientific Research Symposium",
      date: "June 9-11, 2026",
      venue: "Research Innovation Campus",
      location: "San Diego, CA",
      image: conferenceScience,
      description: "Advance scientific knowledge through collaborative research and breakthrough discoveries across disciplines."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              All Events
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              All <span className="text-primary">Conferences & Meetings</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover comprehensive professional development opportunities across diverse industries and disciplines.
            </p>
          </div>

          {/* Conference Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
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