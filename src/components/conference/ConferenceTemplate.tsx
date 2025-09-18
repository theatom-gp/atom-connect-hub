import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Users, DollarSign, Star } from 'lucide-react';
import { getImagePath } from '@/lib/imageUtils';
import SEO from '@/components/SEO';
import { generateConferenceStructuredData } from '@/lib/structuredData';
import { Conference } from '@/lib/conferences';

interface ConferenceTemplateProps {
  conference: Conference;
  children?: React.ReactNode;
}

const ConferenceTemplate = ({ conference, children }: ConferenceTemplateProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = new Date(conference.date).getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [conference.date]);

  // Generate structured data
  const structuredData = generateConferenceStructuredData({
    id: conference.id,
    title: conference.title,
    description: conference.description,
    date: conference.date,
    location: conference.location,
    price: conference.price,
    currency: 'USD',
    image: conference.image,
    organizer: 'Atom Conferences',
    url: `/conference/${conference.id}`,
    category: conference.category,
    speakers: conference.speakers || []
  });

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={conference.title}
        description={conference.description}
        keywords={conference.keywords}
        image={conference.image}
        url={`/conference/${conference.id}`}
        type="conference"
        publishedTime={conference.date}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={getImagePath(conference.image)}
            alt={conference.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/40" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-4 text-sm">
              {conference.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {conference.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {conference.description}
            </p>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-8">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <Card key={unit} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="text-sm capitalize">{unit}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                Register Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Submit Abstract
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Conference Details */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Event Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="font-medium">Date:</span>
                  <span>{new Date(conference.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-medium">Location:</span>
                  <span>{conference.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">Duration:</span>
                  <span>{conference.duration || '3 days'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium">Expected Attendees:</span>
                  <span>{conference.attendees || '500+'}</span>
                </div>
                {conference.price && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span className="font-medium">Price:</span>
                    <span>${conference.price}</span>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={getImagePath(conference.image)}
                alt={conference.title}
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      {conference.speakers && conference.speakers.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Featured Speakers</h2>
              <p className="text-gray-600">Meet the industry leaders and experts</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {conference.speakers.map((speaker, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <img
                        src={getImagePath(speaker.image)}
                        alt={speaker.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="font-semibold mb-2">{speaker.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{speaker.title}</p>
                      <p className="text-xs text-gray-500">{speaker.organization}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Custom Content */}
      {children}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
            <p className="text-xl mb-8 text-white/90">
              Don't miss this opportunity to connect with industry leaders and advance your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Register Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ConferenceTemplate;
