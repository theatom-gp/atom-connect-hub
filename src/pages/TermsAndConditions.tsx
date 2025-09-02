import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Clock, BookOpen, AlertCircle, CheckCircle, FileText } from "lucide-react";
import { getImagePath } from "@/lib/imageUtils";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat text-primary-foreground py-20 px-4 text-center overflow-hidden" style={{backgroundImage: "url('" + getImagePath("hero-conference.jpg") + "')"}}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10"></div>
        <div className="relative container mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-primary-foreground" />
            <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/20 backdrop-blur-sm">
              Legal Framework
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Terms & <span className="text-yellow-300">Conditions</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Clear, fair terms that protect both you and Atom Conferences. 
            Last updated: January 2025
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                <FileText className="h-5 w-5 mr-2" />
                <a href="/terms-and-conditions.pdf" download>Download PDF Version</a>
              </Button>
            </div>
          <div className="flex items-center justify-center gap-4 text-sm text-primary-foreground/80 mt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-yellow-300" />
              <span>Transparent</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-yellow-300" />
              <span>Fair to All</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-300" />
              <span>Regularly Updated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid gap-8">
            
            {/* Acceptance of Terms */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                  1. Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using the Atom Conferences website and services, you accept and agree to be bound by these Terms and Conditions in their entirety. If you disagree with any part of these terms, you must not use our services.
                </p>
                <div className="bg-secondary/20 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Key Points:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• You must be at least 18 years of age to use our services</li>
                    <li>• Registration requires express agreement to these terms</li>
                    <li>• Continued use constitutes ongoing acceptance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Use of Services */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  2. Use of Our Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Our services are designed for professional conference and event management. You may use our platform for legitimate business and personal purposes only.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">Permitted Uses:</h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• Conference registration and management</li>
                      <li>• Accessing event information</li>
                      <li>• Networking with attendees</li>
                      <li>• Downloading provided materials</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-400 mb-2">Prohibited Uses:</h4>
                    <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                      <li>• Unauthorized commercial activities</li>
                      <li>• Spam or unsolicited communications</li>
                      <li>• Harmful or malicious content</li>
                      <li>• Violation of intellectual property</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Registration and Accounts */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  3. Registration and User Accounts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials.
                </p>
                <div className="bg-secondary/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Your Responsibilities:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Provide accurate and complete information</li>
                    <li>• Keep your login credentials secure</li>
                    <li>• Notify us immediately of any unauthorized access</li>
                    <li>• Update your information as needed</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Payment and Refunds */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-primary" />
                  4. Payment Terms and Refunds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Conference fees are due at the time of registration. All payments are processed securely through our trusted payment partners.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Payment Policy:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Payment required for registration completion</li>
                      <li>• Multiple payment methods accepted</li>
                      <li>• Receipts provided automatically</li>
                      <li>• Corporate billing available</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Refund Policy:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Full refund: 30+ days before event</li>
                      <li>• 50% refund: 14-29 days before event</li>
                      <li>• No refund: Less than 14 days before</li>
                      <li>• Event cancellation: Full refund guaranteed</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                  5. Intellectual Property Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  All content, trademarks, and intellectual property on our platform are protected by applicable laws and remain the property of Atom Conferences or their respective owners.
                </p>
                <div className="bg-secondary/20 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Protected Content Includes:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Website design and functionality</li>
                    <li>• Conference materials and presentations</li>
                    <li>• Logos, trademarks, and branding</li>
                    <li>• Software and technical implementations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  6. Limitation of Liability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  While we strive to provide excellent service, our liability is limited as outlined below to ensure fair and reasonable terms for all parties.
                </p>
                <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-400 mb-2">Important Notice:</p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Our total liability for any claims arising from our services shall not exceed the amount paid by you for the specific service in question. This limitation applies to all types of damages, whether direct, indirect, or consequential.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-primary" />
                  7. Termination of Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to terminate or suspend access to our services at our discretion, particularly in cases of terms violations.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Grounds for Termination:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Violation of these terms</li>
                      <li>• Fraudulent activity</li>
                      <li>• Abuse of our services</li>
                      <li>• Legal requirements</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Effect of Termination:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Immediate access suspension</li>
                      <li>• Data retention as per privacy policy</li>
                      <li>• Refunds per cancellation policy</li>
                      <li>• Survival of certain provisions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                  8. Governing Law and Disputes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  These terms are governed by applicable laws, and any disputes will be resolved through appropriate legal channels with preference for mediation when possible.
                </p>
                <div className="bg-secondary/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Dispute Resolution Process:</h4>
                  <ol className="text-sm text-muted-foreground space-y-1">
                    <li>1. Direct communication and negotiation</li>
                    <li>2. Mediation through agreed mediator</li>
                    <li>3. Arbitration if mediation fails</li>
                    <li>4. Legal proceedings as last resort</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="hover:shadow-lg transition-shadow border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  Questions About These Terms?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  We're here to help clarify any questions you may have about these terms and conditions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="default" className="flex-1">
                    <a href="/contact">Contact Team</a>
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <a href="/terms-and-conditions.pdf" download>Download PDF Version</a>
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground text-center pt-4 border-t">
                  <p>Last updated: January 2025 | These terms are reviewed regularly to ensure fairness and compliance</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;