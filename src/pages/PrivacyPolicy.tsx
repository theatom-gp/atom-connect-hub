import Navigation from '@/components/Navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Database, Eye, Lock, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "personal-data",
      icon: <Users className="h-6 w-6" />,
      title: "Personal Data We Collect",
      content: [
        "Contact Information: Name, email address, phone number, mailing address",
        "Professional Information: Job title, company name, industry, professional interests",
        "Registration Data: Conference preferences, dietary requirements, accessibility needs",
        "Payment Information: Billing address, payment method details (processed securely by third-party providers)",
        "Communication Data: Messages, feedback, survey responses, and support requests",
        "Technical Data: IP address, browser type, device information, usage patterns",
        "Location Data: Venue check-ins, networking event participation",
        "Marketing Preferences: Communication preferences, subscription choices"
      ]
    },
    {
      id: "data-usage",
      icon: <Database className="h-6 w-6" />,
      title: "How We Use Personal Data",
      content: [
        "Event Management: Registration processing, badge creation, venue access control",
        "Communication: Conference updates, schedule changes, networking opportunities",
        "Personalization: Customized content recommendations, relevant session suggestions",
        "Service Improvement: Analytics to enhance user experience and platform functionality",
        "Marketing: Promotional materials about upcoming conferences and related services (with consent)",
        "Legal Compliance: Meeting regulatory requirements and resolving disputes",
        "Security: Fraud prevention, account protection, and platform security",
        "Research: Anonymous statistical analysis for industry insights and trends"
      ]
    },
    {
      id: "data-disclosure",
      icon: <Eye className="h-6 w-6" />,
      title: "How We Disclose Personal Data",
      content: [
        "Service Providers: Trusted third-party vendors for payment processing, email delivery, and technical services",
        "Conference Partners: Sponsors and exhibitors (only with explicit consent for networking purposes)",
        "Legal Requirements: When required by law, court order, or government regulations",
        "Business Transfers: In case of merger, acquisition, or sale of business assets",
        "Consent-Based Sharing: When you explicitly authorize us to share information",
        "Emergency Situations: To protect health, safety, or legal rights of individuals",
        "Anonymous Data: Aggregated, non-identifiable information for research and analytics",
        "Platform Integration: Social media and professional networking platforms (with your permission)"
      ]
    },
    {
      id: "rights-choices",
      icon: <Shield className="h-6 w-6" />,
      title: "Your Rights and Choices",
      content: [
        "Access Rights: Request copies of your personal data and information about our processing",
        "Correction Rights: Update or correct inaccurate personal information",
        "Deletion Rights: Request deletion of your personal data (subject to legal obligations)",
        "Portability Rights: Receive your data in a structured, machine-readable format",
        "Objection Rights: Object to processing for marketing or legitimate interest purposes",
        "Restriction Rights: Limit how we process your personal data in certain circumstances",
        "Withdrawal of Consent: Revoke previously given consent at any time",
        "Opt-Out Options: Unsubscribe from marketing communications and newsletters",
        "Data Protection Authority: File complaints with relevant supervisory authorities"
      ]
    },
    {
      id: "security-retention",
      icon: <Lock className="h-6 w-6" />,
      title: "Data Security and Retention",
      content: [
        "Encryption: All data transmissions are encrypted using industry-standard SSL/TLS protocols",
        "Access Controls: Strict authentication and authorization measures for staff access",
        "Regular Audits: Periodic security assessments and vulnerability testing",
        "Data Minimization: We collect and retain only necessary personal information",
        "Retention Periods: Active conference data for 3 years, marketing data until opt-out",
        "Secure Deletion: Systematic removal of data when retention periods expire",
        "Incident Response: Comprehensive procedures for data breach notification and response",
        "Staff Training: Regular privacy and security training for all personnel",
        "Third-Party Security: Verification of security standards for all service providers"
      ]
    },
    {
      id: "contact-us",
      icon: <Mail className="h-6 w-6" />,
      title: "Contact Us",
      content: [
        "Data Protection Officer: privacy@atomconferences.com",
        "General Inquiries: support@atomconferences.com",
        "Mailing Address: Atom Conferences, 123 Business District, Austin, TX 78701",
        "Phone: +1 (555) 123-4567 (Monday-Friday, 9 AM - 6 PM CST)",
        "Response Time: We aim to respond to all privacy requests within 30 days",
        "Emergency Contact: For urgent security matters, call +1 (555) 123-4568",
        "EU Representative: eu-privacy@atomconferences.com (for GDPR matters)",
        "Feedback: We welcome suggestions for improving our privacy practices"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Shield className="h-5 w-5 mr-2" />
                Privacy Policy
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Privacy Matters
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              We are committed to protecting your personal data and ensuring transparency 
              in how we collect, use, and safeguard your information.
            </p>
            <div className="mt-6 text-sm text-primary-foreground/80">
              Last Updated: January 2025 | Effective Date: January 1, 2025
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <Card className="mb-8 border-2 border-primary/10">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4 text-center">About This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed text-center">
                This Privacy Policy describes how Atom Conferences ("we," "our," or "us") collects, 
                uses, and protects your personal information when you use our conference platform, 
                attend our events, or interact with our services. This policy applies to all users 
                worldwide and complies with GDPR, CCPA, and other applicable privacy regulations.
              </p>
            </CardContent>
          </Card>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={section.id} className="border-l-4 border-l-primary hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-semibold">{section.title}</h2>
                  </div>
                  
                  <div className="grid gap-4">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div className="text-sm leading-relaxed">
                          <span className="font-medium text-foreground">
                            {item.split(':')[0]}:
                          </span>
                          <span className="text-muted-foreground ml-1">
                            {item.split(':').slice(1).join(':')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer Information */}
          <Card className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Questions or Concerns?</h3>
              <p className="text-muted-foreground mb-6">
                If you have any questions about this Privacy Policy or our data practices, 
                please don't hesitate to contact our Data Protection Team.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="mailto:privacy@atomconferences.com" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Privacy Team
                </a>
                <a 
                  href="/cancellation-policy" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  View Cancellation Policy
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;