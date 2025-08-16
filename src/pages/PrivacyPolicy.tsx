import Navigation from '@/components/Navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Users, Database, Eye, Lock, Mail, CheckCircle, FileText, Heart, Award } from "lucide-react";

const PrivacyPolicy = () => {
  const trustSignals = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "GDPR Compliant",
      description: "Full compliance with global privacy standards"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Bank-Level Security",
      description: "Military-grade encryption protects your data"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Industry Leader",
      description: "Trusted by 50,000+ professionals worldwide"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Your Privacy First",
      description: "We never sell your personal information"
    }
  ];

  const privacyRights = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Complete Transparency",
      description: "Know exactly what data we collect and why",
      benefit: "Full control and visibility over your information"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Your Data, Your Choice",
      description: "Access, update, or delete your data anytime",
      benefit: "Immediate response to all privacy requests"
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Minimal Data Collection",
      description: "We only collect what's essential for great service",
      benefit: "Less data stored means better privacy protection"
    }
  ];

  const securityFeatures = [
    "End-to-end encryption for all data transfers",
    "Regular third-party security audits",
    "ISO 27001 certified data centers",
    "24/7 threat monitoring and response",
    "Automatic data backup and recovery",
    "Staff background checks and training"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="text-lg px-6 py-3 mb-6 bg-white/20 backdrop-blur-sm">
              <Shield className="h-5 w-5 mr-2" />
              Privacy Policy
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Trust is Our <span className="text-yellow-300">Foundation</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              We believe privacy isn't just a policy—it's a fundamental right. 
              Discover how we protect, respect, and empower your data choices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                <FileText className="h-5 w-5 mr-2" />
                Download PDF Version
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/70 mt-6">
              Last Updated: January 2025 • Effective: January 1, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why 50,000+ Professionals Trust Us</h2>
            <p className="text-muted-foreground text-lg">Industry-leading privacy and security standards</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustSignals.map((signal, index) => (
              <Card key={index} className="text-center border-2 hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full text-primary mb-4">
                    {signal.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{signal.title}</h3>
                  <p className="text-muted-foreground">{signal.description}</p>
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
            <h2 className="text-4xl font-bold mb-6">Privacy Made Simple</h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We've written this privacy policy in plain English because transparency 
              shouldn't require a law degree. Here's exactly how we handle your information.
            </p>
          </div>

          {/* Your Rights Section */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-4">Your Privacy Rights</h3>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              These aren't just legal requirements—they're your fundamental rights we're committed to protecting.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {privacyRights.map((right, index) => (
                <Card key={index} className="relative overflow-hidden border-l-4 border-l-primary">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-full text-primary">
                        {right.icon}
                      </div>
                      <h4 className="text-xl font-semibold">{right.title}</h4>
                    </div>
                    <p className="text-muted-foreground mb-4">{right.description}</p>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium text-green-700">{right.benefit}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Data Collection Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h3 className="text-3xl font-bold mb-6">What We Collect (And Why)</h3>
              <p className="text-lg text-muted-foreground mb-8">
                We believe in data minimalism—collecting only what enhances your conference experience.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg">
                  <Users className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Essential Information</h4>
                    <p className="text-sm text-muted-foreground">Name, email, and professional details for registration and networking</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg">
                  <Database className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Preference Data</h4>
                    <p className="text-sm text-muted-foreground">Session interests and dietary needs to personalize your experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg">
                  <Shield className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Security Information</h4>
                    <p className="text-sm text-muted-foreground">Technical data to protect your account and prevent fraud</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold mb-6">Enterprise Security</h3>
              <p className="text-lg text-muted-foreground mb-8">
                Your data is protected by the same security standards used by Fortune 500 companies.
              </p>
              <div className="space-y-3">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Lock className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Our Promise</h4>
                      <p className="text-sm text-green-700">
                        We never sell, rent, or share your personal information with third parties for marketing purposes. Ever.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Data Usage & Sharing */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">How We Use Your Information</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every piece of data serves a purpose—improving your conference experience or keeping your account secure.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-lg">Event Management</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Registration processing and badge creation</li>
                    <li>• Venue access and security management</li>
                    <li>• Schedule personalization and updates</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-lg">Communication</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Important conference updates</li>
                    <li>• Networking opportunity alerts</li>
                    <li>• Emergency notifications and changes</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-lg">Service Improvement</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Anonymous analytics for better events</li>
                    <li>• Platform performance optimization</li>
                    <li>• Feature development insights</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact & Action Section */}
          <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-2 border-primary/20">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Questions About Your Privacy?</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our dedicated Privacy Team is here to help. Get answers to your questions 
                or exercise your rights—we typically respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-4">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Privacy Team
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  <FileText className="h-5 w-5 mr-2" />
                  Download Full Policy
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-primary/20">
                <div>
                  <h4 className="font-semibold mb-2">Email Response</h4>
                  <p className="text-sm text-muted-foreground">privacy@atomconferences.com</p>
                  <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Phone Support</h4>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-xs text-muted-foreground">Mon-Fri, 9 AM - 6 PM CST</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">EU Representative</h4>
                  <p className="text-sm text-muted-foreground">eu-privacy@atomconferences.com</p>
                  <p className="text-xs text-muted-foreground">GDPR compliance matters</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;