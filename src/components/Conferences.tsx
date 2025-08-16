import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import conferenceAI from '@/assets/conference-ai.jpg';
import conferenceMedical from '@/assets/conference-medical.jpg';
import conferenceSustainability from '@/assets/conference-sustainability.jpg';

const Conferences = () => {
  const conferences = [
    {
      id: 1,
      title: "AI Innovation Summit 2025",
      date: "Nov 15-17, 2025",
      venue: "Silicon Valley Convention Center",
      location: "San Francisco, CA",
      image: conferenceAI,
      description: "Join leading AI researchers, tech executives, and innovators as they unveil the future of artificial intelligence.",
      attendees: 500,
      speakers: 25
    },
    {
      id: 2,
      title: "Global Healthcare Revolution",
      date: "Dec 22-24, 2025",
      venue: "Medical Innovation Hub",
      location: "Boston, MA",
      image: conferenceMedical,
      description: "Discover breakthrough medical technologies and treatment innovations shaping the future of healthcare.",
      attendees: 350,
      speakers: 18
    },
    {
      id: 3,
      title: "Sustainable Future Conference",
      date: "Jan 10-12, 2026",
      venue: "Green Technology Center",
      location: "Seattle, WA",
      image: conferenceSustainability,
      description: "Unite with environmental leaders and green tech pioneers driving sustainable development worldwide.",
      attendees: 400,
      speakers: 22
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
                >
                  View Details & Register
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <a href="/meetings">
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-4 text-lg"
            >
              Explore Conferences
            </Button>
          </a>
          
          <p className="text-muted-foreground mt-4">
            Join over 50,000 professionals transforming their careers through knowledge exchange
          </p>
        </div>
      </div>
    </section>
  );
};

export default Conferences;