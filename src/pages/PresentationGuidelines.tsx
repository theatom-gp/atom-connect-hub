import Navigation from '@/components/Navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Clock, Users, Monitor, Award, CheckCircle, Presentation, Globe, Mail, Phone, MapPin } from "lucide-react";

const PresentationGuidelines = () => {
  const presentationTypes = [
    {
      icon: <Presentation className="h-8 w-8" />,
      title: "Oral Presentations",
      description: "Live presentations with Q&A sessions",
      duration: "20-50 minutes depending on type"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Poster Presentations",
      description: "Visual displays with interactive discussions",
      duration: "1 hour poster session"
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Virtual Presentations",
      description: "Online presentations from anywhere",
      duration: "Same as oral presentations"
    }
  ];

  const technicalRequirements = [
    "Submit presentations 15 days before conference",
    "Bring backup copy on flash drive or storage device",
    "Check compatibility with MAC system (Windows users)",
    "Ensure clear and legible visuals",
    "Test presentations before session starts",
    "Use provided equipment (laptop, projector, microphone)"
  ];

  const equipmentProvided = [
    "Digital projector and screen",
    "Laptop with presentation software",
    "Slider with pointer",
    "Cordless and desktop microphones",
    "Basic sound system",
    "Poster display boards and materials"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-cover bg-center bg-no-repeat text-primary-foreground overflow-hidden" style={{backgroundImage: "url('/src/assets/hero-conference.jpg')"}}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="text-lg px-6 py-3 mb-6 bg-white/20 backdrop-blur-sm">
              <FileText className="h-5 w-5 mr-2" />
              Presentation Guidelines
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Present with <span className="text-yellow-300">Confidence</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              Comprehensive guidelines to ensure your presentation runs smoothly and professionally. 
              From technical requirements to presentation formats, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                <FileText className="h-5 w-5 mr-2" />
                {/* Download Guidelines PDF */}
                <a href="/presentation-guidelines.pdf" download>Download PDF Version</a>
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/70 mt-6">
              Last Updated: January 2025 • Conference Language: English
            </p>
          </div>
        </div>
      </div>

      {/* Presentation Types */}
      <div className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Presentation Formats</h2>
            <p className="text-muted-foreground text-lg">Choose the format that best suits your research and presentation style</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {presentationTypes.map((type, index) => (
              <Card key={index} className="text-center border-2 hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full text-primary mb-4">
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                  <p className="text-muted-foreground mb-3">{type.description}</p>
                  <Badge variant="outline" className="text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {type.duration}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Essential Information for Presenters</h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              These guidelines ensure a smooth and professional presentation experience for all participants. 
              Please review carefully and prepare accordingly.
            </p>
          </div>

          {/* Registration Section */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-4">Registration & Check-in</h3>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Important information about conference registration and what you'll receive.
            </p>
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Registration Schedule
                    </h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Conference registration starts at 8:00 AM</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Registration desk open from 8 AM onwards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>On-site coordinators available for questions</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      What You'll Receive
                    </h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Conference badge and folder</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Abstract book and conference program</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Lunch vouchers for restaurant use</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Oral Presentation Guidelines */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-4">Oral Presentation Guidelines</h3>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Essential guidelines for delivering successful oral presentations.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h4 className="text-2xl font-bold mb-6">Timing & Schedule</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h5 className="font-semibold mb-2">Plenary Presentations</h5>
                    <p className="text-sm text-muted-foreground">45-50 minutes including Q&A session</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h5 className="font-semibold mb-2">Keynote Presentations</h5>
                    <p className="text-sm text-muted-foreground">30-35 minutes including Q&A session</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h5 className="font-semibold mb-2">Featured Presentations</h5>
                    <p className="text-sm text-muted-foreground">20-25 minutes including Q&A session</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-2xl font-bold mb-6">Technical Requirements</h4>
                <div className="space-y-3">
                  {technicalRequirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Equipment & Facilities */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-4">Equipment & Facilities</h3>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              All necessary equipment is provided to ensure professional presentations.
            </p>
            <Card className="bg-secondary/30">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {equipmentProvided.map((equipment, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{equipment}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Personal laptops are not recommended unless under unavoidable conditions. 
                    The meeting room is fully equipped with all necessary presentation equipment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Poster Presentation Guidelines */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-4">Poster Presentation Guidelines</h3>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Guidelines for creating and displaying effective poster presentations.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h4 className="text-2xl font-bold mb-6">Poster Specifications</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h5 className="font-semibold mb-2">Dimensions</h5>
                    <p className="text-sm text-muted-foreground">1 meter wide by 1 meter high display area</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h5 className="font-semibold mb-2">Materials</h5>
                    <p className="text-sm text-muted-foreground">Pasting and hanging materials provided on-site</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h5 className="font-semibold mb-2">Preparation</h5>
                    <p className="text-sm text-muted-foreground">All posters must be prepared in advance</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-2xl font-bold mb-6">Important Notes</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Hang posters 1 hour before session starts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Be available during full poster session</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Collect posters by end of day</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Best Poster awards announced at session end</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Important:</strong> On-site printing is NOT facilitated. All posters must be prepared in advance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Virtual Presentation Guidelines */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-4">Virtual Presentation Guidelines</h3>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Guidelines for participants presenting virtually from home or work.
            </p>
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      Virtual Participation
                    </h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Join meeting 30 minutes early</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Have presentation slides ready</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Use screen sharing for presentations</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-4 text-blue-500" />
                      Recorded Presentations
                    </h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Submit 10 days before event</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Include PowerPoint presentation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Ensure high-quality recording</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certification */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-4">Certification</h3>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Information about conference certificates and how to receive them.
            </p>
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      Certificate Details
                    </h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Signed by organizing committee members</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Name and affiliation printed as per records</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>E-certificate sent via email in 2-3 working days</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-4 text-blue-600" />
                      Important Notes
                    </h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Be present until session ends for physical certificates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Contact us one month before for any changes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Co-authors must register to receive certificates</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-8">Need Help? Contact Us</h3>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <h4 className="font-semibold">Call Us</h4>
                <p className="text-muted-foreground text-sm">+1 662 339 4984</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <h4 className="font-semibold">Email Us</h4>
                <p className="text-muted-foreground text-sm">conference@atomconferences.org</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <h4 className="font-semibold">Address</h4>
                <p className="text-muted-foreground text-sm">Conference Venue, Lisbon, Portugal</p>
              </div>
            </div> */}
            <Button size="lg" className="px-8 py-4">
              <Mail className="h-5 w-5 mr-2" />
              <a href="/contact">        
              Contact Support Team
                </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationGuidelines;
