import Navigation from '@/components/Navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Globe, Mail, Phone, MapPin, CheckCircle, Clock, AlertCircle, Info, Download, Send, Building, Users, Award } from "lucide-react";

const VisaInvitation = () => {
  const visaTypes = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Tourist Visa",
      description: "For conference attendees and visitors",
      duration: "Up to 90 days"
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "Business Visa",
      description: "For business meetings and conferences",
      duration: "Up to 90 days"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Student Visa",
      description: "For academic participants and researchers",
      duration: "Varies by country"
    }
  ];

  const invitationLetterFeatures = [
    "Official conference letterhead",
    "Detailed conference information",
    "Participant's role and contribution",
    "Conference dates and venue",
    "Contact information for verification",
    "Digital and physical copies available"
  ];

  const spainVisaInfo = {
    cities: ["Valencia", "Barcelona", "Madrid"],
    visaType: "Schengen Visa",
    processingTime: "15-30 days",
    requirements: [
      "Valid passport (3 months beyond stay)",
      "Completed visa application form",
      "2 recent passport photos",
      "Travel insurance (€30,000 coverage)",
      "Proof of accommodation",
      "Return flight tickets",
      "Financial means proof (€100/day)",
      "Conference invitation letter"
    ],
    fees: "€80 for adults, €40 for children 6-12",
    notes: "Spain is part of the Schengen Area. Visa allows travel to 26 European countries."
  };

  const franceVisaInfo = {
    cities: ["Paris"],
    visaType: "Schengen Visa",
    processingTime: "15-30 days",
    requirements: [
      "Valid passport (3 months beyond stay)",
      "Completed visa application form",
      "2 recent passport photos",
      "Travel insurance (€30,000 coverage)",
      "Proof of accommodation",
      "Return flight tickets",
      "Financial means proof (€120/day)",
      "Conference invitation letter",
      "Employment letter or student status"
    ],
    fees: "€80 for adults, €40 for children 6-12",
    notes: "France is part of the Schengen Area. Processing may take longer during peak seasons."
  };

  const portugalVisaInfo = {
    cities: ["Lisbon"],
    visaType: "Schengen Visa",
    processingTime: "15-30 days",
    requirements: [
      "Valid passport (3 months beyond stay)",
      "Completed visa application form",
      "2 recent passport photos",
      "Travel insurance (€30,000 coverage)",
      "Proof of accommodation",
      "Return flight tickets",
      "Financial means proof (€75/day)",
      "Conference invitation letter",
      "Bank statements (last 3 months)"
    ],
    fees: "€80 for adults, €40 for children 6-12",
    notes: "Portugal is part of the Schengen Area. Beautiful coastal country with rich history."
  };

  const uaeVisaInfo = {
    cities: ["Dubai"],
    visaType: "Tourist Visa",
    processingTime: "3-7 days",
    requirements: [
      "Valid passport (6 months beyond stay)",
      "Completed visa application form",
      "Recent passport photo",
      "Travel insurance",
      "Return flight tickets",
      "Proof of accommodation",
      "Conference invitation letter",
      "Bank statements (last 3 months)",
      "Employment letter"
    ],
    fees: "Varies by duration: $95-$350",
    notes: "UAE offers visa on arrival for some nationalities. Check eligibility before applying."
  };

  const usaVisaInfo = {
    cities: ["Various cities"],
    visaType: "B1/B2 Visa",
    processingTime: "3-5 weeks",
    requirements: [
      "Valid passport (6 months beyond stay)",
      "DS-160 confirmation page",
      "Visa application fee receipt",
      "Recent passport photo",
      "Conference invitation letter",
      "Employment letter",
      "Bank statements (last 6 months)",
      "Travel itinerary",
      "Proof of ties to home country"
    ],
    fees: "$160 USD",
    notes: "B1 for business, B2 for tourism. Interview required at US Embassy/Consulate."
  };

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
              <Globe className="h-5 w-5 mr-2" />
              Visa & Invitation Letter
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Travel with <span className="text-yellow-300">Confidence</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              Comprehensive visa information and official invitation letters to facilitate 
              your journey to our international conferences.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                <Download className="h-5 w-5 mr-2" />
                Download Invitation Letter
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Send className="h-5 w-5 mr-2" />
                Request Custom Letter
              </Button>
            </div> */}
            <p className="text-sm text-primary-foreground/70 mt-6">
              Last Updated: January 2025 • Processing Time: 2-3 business days
            </p>
          </div>
        </div>
      </div>

      {/* Visa Types */}
      <div className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Visa Types & Requirements</h2>
            <p className="text-muted-foreground text-lg">Choose the appropriate visa type for your conference participation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visaTypes.map((type, index) => (
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
            <h2 className="text-4xl font-bold mb-6">Official Invitation Letters</h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We provide official invitation letters to support your visa application process. 
              Our letters include all necessary details for embassy and consulate requirements.
            </p>
          </div>

          {/* Important Notice */}
          <div className="mb-12">
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">Important Notice</h3>
                    <p className="text-sm text-orange-700">
                      <strong>Visa requirements and processing times are subject to change by respective countries.</strong> 
                      The information provided on this page is for general guidance only. We strongly recommend checking the 
                      official embassy/consulate websites for the most current and accurate visa requirements before applying. 
                      We cannot guarantee the accuracy of visa information as policies change frequently.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Invitation Letter Features */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-4">What's Included in Your Invitation Letter</h3>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Professional invitation letters designed to meet international visa requirements.
            </p>
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {invitationLetterFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Invitation letters are provided free of charge to registered conference participants. 
                    Processing time is 2-3 business days after registration confirmation.
                  </p>
                </div>
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800 font-semibold">
                    <strong>Important Disclaimer:</strong> We can only provide Invitation letter but not guarantee visa approval. 
                    Visa decisions are made by respective embassies and consulates based on their own criteria and requirements.
                  </p>
                </div>
                {/* <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-800 font-semibold">
                    <strong>Visa Information Notice:</strong> Visa requirements and processing times are subject to change by respective countries. 
                    We recommend checking the official embassy/consulate websites for the most current information before applying.
                  </p>
                </div> */}
              </CardContent>
            </Card>
          </div>

          {/* Spain Visa Information */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-4">Spain Visa Information</h3>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Comprehensive visa information for Valencia, Barcelona, and Madrid conferences.
            </p>
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-red-500" />
                      Cities Covered
                    </h4>
                    <div className="space-y-2">
                      {spainVisaInfo.cities.map((city, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="font-medium">{city}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 space-y-3">
                      <div className="p-3 bg-red-50 rounded-lg">
                        <p className="text-sm"><strong>Visa Type:</strong> {spainVisaInfo.visaType}</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <p className="text-sm"><strong>Processing Time:</strong> {spainVisaInfo.processingTime}</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <p className="text-sm"><strong>Fees:</strong> {spainVisaInfo.fees}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold mb-4">Required Documents</h4>
                    <ul className="space-y-2">
                      {spainVisaInfo.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Important:</strong> {spainVisaInfo.notes}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* France Visa Information */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-4">France Visa Information</h3>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Visa requirements for conferences in Paris, the City of Light.
            </p>
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      Cities Covered
                    </h4>
                    <div className="space-y-2">
                      {franceVisaInfo.cities.map((city, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="font-medium">{city}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm"><strong>Visa Type:</strong> {franceVisaInfo.visaType}</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm"><strong>Processing Time:</strong> {franceVisaInfo.processingTime}</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm"><strong>Fees:</strong> {franceVisaInfo.fees}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold mb-4">Required Documents</h4>
                    <ul className="space-y-2">
                      {franceVisaInfo.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Important:</strong> {franceVisaInfo.notes}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Portugal Visa Information */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-4">Portugal Visa Information</h3>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Visa requirements for conferences in Lisbon, Portugal.
            </p>
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-green-500" />
                      Cities Covered
                    </h4>
                    <div className="space-y-2">
                      {portugalVisaInfo.cities.map((city, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="font-medium">{city}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm"><strong>Visa Type:</strong> {portugalVisaInfo.visaType}</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm"><strong>Processing Time:</strong> {portugalVisaInfo.processingTime}</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm"><strong>Fees:</strong> {portugalVisaInfo.fees}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold mb-4">Required Documents</h4>
                    <ul className="space-y-2">
                      {portugalVisaInfo.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Important:</strong> {portugalVisaInfo.notes}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* UAE Visa Information */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-4">UAE Visa Information</h3>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Visa requirements for conferences in Dubai, UAE.
            </p>
            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-yellow-500" />
                      Cities Covered
                    </h4>
                    <div className="space-y-2">
                      {uaeVisaInfo.cities.map((city, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="font-medium">{city}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 space-y-3">
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <p className="text-sm"><strong>Visa Type:</strong> {uaeVisaInfo.visaType}</p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <p className="text-sm"><strong>Processing Time:</strong> {uaeVisaInfo.processingTime}</p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <p className="text-sm"><strong>Fees:</strong> {uaeVisaInfo.fees}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold mb-4">Required Documents</h4>
                    <ul className="space-y-2">
                      {uaeVisaInfo.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Important:</strong> {uaeVisaInfo.notes}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* USA Visa Information */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-4">USA Visa Information</h3>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Visa requirements for conferences across the United States.
            </p>
            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-purple-500" />
                      Cities Covered
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Various cities across USA</span>
                      </div>
                    </div>
                    <div className="mt-6 space-y-3">
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm"><strong>Visa Type:</strong> {usaVisaInfo.visaType}</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm"><strong>Processing Time:</strong> {usaVisaInfo.processingTime}</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm"><strong>Fees:</strong> {usaVisaInfo.fees}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold mb-4">Required Documents</h4>
                    <ul className="space-y-2">
                      {usaVisaInfo.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Important:</strong> {usaVisaInfo.notes}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Process */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-4">How to Request an Invitation Letter</h3>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Simple steps to get your official invitation letter for visa application.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center border-2 border-primary/20">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full text-primary mb-4">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Register for Conference</h4>
                  <p className="text-sm text-muted-foreground">Complete your conference registration and receive confirmation</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 border-primary/20">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full text-primary mb-4">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Request Letter</h4>
                  <p className="text-sm text-muted-foreground">Email us with your registration details</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 border-primary/20">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full text-primary mb-4">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Receive Letter</h4>
                  <p className="text-sm text-muted-foreground">Get your official invitation letter within 2-3 business days</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mb-20">
            <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                  Important Notes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                                         <h4 className="text-lg font-semibold mb-3">General Requirements</h4>
                     <ul className="space-y-2 text-sm text-muted-foreground">
                       <li className="flex items-start gap-2">
                         <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                         <span>Apply for visa at least 6-8 weeks before travel</span>
                       </li>
                       <li className="flex items-start gap-2">
                         <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                         <span>Check embassy/consulate websites for latest requirements</span>
                       </li>
                       <li className="flex items-start gap-2">
                         <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                         <span>Ensure all documents are in English or translated</span>
                       </li>
                       <li className="flex items-start gap-2">
                         <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                         <span>Verify current visa information as requirements change frequently</span>
                       </li>
                     </ul>
                  </div>
                  <div>
                                         <h4 className="text-lg font-semibold mb-3">Our Support</h4>
                     <ul className="space-y-2 text-sm text-muted-foreground">
                       <li className="flex items-start gap-2">
                         <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                         <span>Free invitation letters for registered participants</span>
                       </li>
                       {/* <li className="flex items-start gap-2">
                         <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                         <span>Visa application guidance and support</span>
                       </li> */}
                       <li className="flex items-start gap-2">
                         <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                         <span>24/7 email support for urgent requests</span>
                       </li>
                     </ul>
                     {/* <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                       <p className="text-sm text-red-800 font-semibold">
                         <strong>Service Limitation:</strong> We provide invitation letters only. We cannot guarantee visa approval as visa decisions are made by respective embassies and consulates.
                       </p>
                     </div> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-8">Need Visa Support? Contact Us</h3>
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
                <p className="text-muted-foreground text-sm">visa@atomconferences.org</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <h4 className="font-semibold">Response Time</h4>
                <p className="text-muted-foreground text-sm">Within 24 hours</p>
              </div>
            </div> */}
            <Button 
              size="lg" 
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                const emailSubject = "Visa Support & Invitation Letter Request";
                const emailBody = `
Dear Support Team,

I would like to request assistance with visa support and invitation letter for conference participation.

Please provide me with the necessary information and documents.

Best regards,
[Your Name]
`.trim();
// ---
// This request was sent from the Atom Conferences Visa & Invitation Letter page.
//                 `.trim();
                
                const mailtoLink = `mailto:support@atomconferences.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                window.location.href = mailtoLink;
              }}
            >
              <Mail className="h-5 w-5 mr-2" />
              Request Invitation Letter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaInvitation;
