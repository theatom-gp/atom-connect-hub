import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Clock, Send, Users, Calendar, Award } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const contactFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  organization: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  inquiryType: z.string().min(1, 'Please select an inquiry type'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      organization: '',
      subject: '',
      message: '',
      inquiryType: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Prepare email content
      const emailSubject = `Contact Form Inquiry: ${data.subject}`;
      const emailBody = `
Dear Support Team,

A new inquiry has been submitted through the contact form:

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Organization: ${data.organization || 'Not specified'}
Inquiry Type: ${data.inquiryType}
Subject: ${data.subject}

Message:
${data.message}

---
This message was sent from the Atom Conferences contact form.
      `.trim();

      // Create mailto link
      const mailtoLink = `mailto:support@atomconferences.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      toast.success('Email client opened! Please send the email to complete your inquiry. We\'ll get back to you within 24 hours.');
      
      // Reset form
      form.reset();
      
    } catch (error) {
      console.error('Error opening email client:', error);
      toast.error('Unable to open email client. Please send your inquiry directly to support@atomconferences.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Location',
      // details: ['123 Conference Avenue', 'Financial District', 'Austin, TX 78701', 'United States'],
      details: ['123 Conference Avenue', 'Financial District', 'Vijayawada, AP 520010', 'India'],
    },
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: ['+91 (90000) (94024)', '+91 (81792) (66745)'],
    },
    {
      icon: Mail,
      title: 'Email Addresses',
      details: ['info@atomconferences.com', 'support@atomconferences.com', 'partnerships@atomconferences.com', 'privacy@atomconferences.com'],
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM', 'Sunday: Closed', 'EST (UTC-5)'],
    },
  ];

  const inquiryTypes = [
    'General Information',
    'Conference Registration',
    'Speaker Opportunities',
    'Sponsorship & Exhibition',
    'Media & Press',
    'Partnership Inquiry',
    'Technical Support',
    'Venue & Logistics',
    'Other',
  ];

  const trustSignals = [
    {
      icon: Users,
      metric: '50,000+',
      label: 'Attendees Served',
    },
    {
      icon: Calendar,
      metric: '200+',
      label: 'Events Organized',
    },
    {
      icon: Award,
      metric: '98%',
      label: 'Satisfaction Rate',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section - Mobile optimized */}
      <section className="relative bg-cover bg-center bg-no-repeat text-primary-foreground py-20 px-4 text-center overflow-hidden" style={{backgroundImage: "url('/src/assets/hero-conference.jpg')"}}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4 sm:mb-6">
            Get in Touch with Our Team
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-6 sm:mb-8">
            Have questions about our conferences? Need support with registration? Want to explore speaking or sponsorship opportunities? 
            We're here to help you every step of the way.
          </p>
          
          {/* Trust Signals - Mobile optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
            {trustSignals.map((signal, index) => {
              const IconComponent = signal.icon;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{signal.metric}</div>
                  <div className="text-sm sm:text-base text-white/90">{signal.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content - Mobile optimized */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Contact Information */}
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 text-center lg:text-left">Contact Information</h2>
              <p className="text-muted-foreground mb-6 sm:mb-8 text-center lg:text-left">
                We're committed to providing exceptional service and support. Reach out to us through any of the following channels, 
                and our dedicated team will respond promptly to assist you.
              </p>
              
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{info.title}</h3>
                            <div className="space-y-1">
                              {info.details.map((detail, detailIndex) => (
                                <p key={detailIndex} className="text-muted-foreground text-sm sm:text-base break-words">{detail}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Quick Response Promise */}
              <Card className="mt-6 sm:mt-8 bg-primary/5 border-primary/20">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Our Response Promise</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    We understand that timing is crucial for conference planning. Our team commits to responding to all inquiries within 
                    <span className="font-semibold text-primary"> 24 hours during business days</span>, often much sooner.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form - Mobile optimized */}
            <div className="order-1 lg:order-2">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl text-center lg:text-left">Send Us a Message</CardTitle>
                  <p className="text-muted-foreground text-sm sm:text-base text-center lg:text-left">
                    Fill out the form below and we'll get back to you as soon as possible. The more details you provide, 
                    the better we can assist you.
                  </p>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                      {/* Name Fields - Stack on mobile */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base">First Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="John" className="h-12 touch-manipulation" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base">Last Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" className="h-12 touch-manipulation" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Contact Fields - Stack on mobile */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base">Email Address *</FormLabel>
                              <FormControl>
                                <Input placeholder="john.doe@example.com" type="email" className="h-12 touch-manipulation" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base">Phone Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (555) 123-4567" className="h-12 touch-manipulation" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Organization */}
                      <FormField
                        control={form.control}
                        name="organization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">Organization</FormLabel>
                            <FormControl>
                              <Input placeholder="Your company or institution" className="h-12 touch-manipulation" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Inquiry Type - Larger touch target */}
                      <FormField
                        control={form.control}
                        name="inquiryType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">Inquiry Type *</FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                className="w-full h-12 px-3 py-2 text-sm sm:text-base border border-input bg-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
                              >
                                <option value="">Select inquiry type</option>
                                {inquiryTypes.map((type) => (
                                  <option key={type} value={type}>{type}</option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Subject */}
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">Subject *</FormLabel>
                            <FormControl>
                              <Input placeholder="Brief description of your inquiry" className="h-12 touch-manipulation" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Message - Larger on mobile */}
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">Message *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please provide detailed information about your inquiry. Include any specific dates, requirements, or questions you may have."
                                className="min-h-[100px] sm:min-h-[120px] text-sm sm:text-base touch-manipulation"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Submit Button - Larger touch target */}
                      <Button 
                        type="submit" 
                        className="w-full h-12 sm:h-auto touch-manipulation" 
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Opening Email...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message via Email
                          </>
                        )}
                      </Button>

                      <p className="text-xs sm:text-sm text-muted-foreground text-center">
                        By submitting this form, you agree to our Privacy Policy and consent to being contacted regarding your inquiry.
                      </p>
                      
                      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-blue-800 dark:text-blue-200">
                            <p className="font-semibold mb-1">How it works:</p>
                            <p>When you click "Send Message via Email", your default email client will open with a pre-filled message to our support team. Simply click send to complete your inquiry.</p>
                            <p className="mt-2 text-xs">
                              <strong>Alternative:</strong> You can also email us directly at{' '}
                              <a href="mailto:support@atomconferences.com" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300">
                                support@atomconferences.com
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile optimized */}
      <section className="bg-primary/5 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Ready to Join Our Next Conference?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
            Don't miss out on our upcoming events. Browse our conference calendar and secure your spot today.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
            <Button size="lg" className="h-12 touch-manipulation" asChild>
              <a href="/meetings">View Upcoming Conferences</a>
            </Button>
            <Button variant="outline" size="lg" className="h-12 touch-manipulation" asChild>
              <a href="/">Learn More About Us</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;