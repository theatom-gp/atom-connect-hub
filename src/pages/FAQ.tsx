import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Users, Clock, Globe, Coffee, Bed, MessageCircle, Award, Mail } from "lucide-react";

const FAQ = () => {
  const faqCategories = [
    {
      title: "Registration & Costs",
      icon: <Users className="h-5 w-5" />,
      faqs: [
        {
          question: "What does my registration cost cover?",
          answer: "Your registration includes comprehensive conference benefits: refreshment breaks (coffee/tea and snacks), lunch during all conference days, e-abstract book, certificate of attendance, notebook and pen, conference schedule handout, eligibility for all technical sessions and workshops, and professional conference photo coverage."
        },
        {
          question: "Are there any discounts for group registration?",
          answer: "Yes! We offer attractive discounts for group participants. Whether you're bringing a team from your organization or registering multiple colleagues, you can save significantly. Contact our conference secretary by email for discount codes and detailed information about group pricing tiers."
        }
      ]
    },
    {
      title: "Accommodation & Facilities",
      icon: <Bed className="h-5 w-5" />,
      faqs: [
        {
          question: "What does my accommodation package cover?",
          answer: "Our accommodation package provides exceptional value with comfortable lodging, complimentary breakfast to fuel your conference days, and high-speed Wi-Fi to keep you connected. All accommodations are carefully selected for quality and convenience to the conference venue."
        }
      ]
    },
    {
      title: "Presentations & Speaking",
      icon: <Clock className="h-5 w-5" />,
      faqs: [
        {
          question: "How much time is allocated for different types of presentations?",
          answer: "We've carefully structured presentation times to maximize impact: Plenary presentations receive 45-50 minutes including Q&A sessions for comprehensive deep-dives, Keynote speakers get 30-35 minutes for focused insights, and Featured speakers have 20-25 minutes for targeted presentations."
        },
        {
          question: "How much time do poster presenters get?",
          answer: "Each poster presenter receives 10-15 minutes for their presentation, including a dedicated Q&A session. This timing allows for meaningful interaction with attendees while maintaining the conference schedule."
        },
        {
          question: "What language should I use during my presentation?",
          answer: "The official working language of the conference is English. All presentations, discussions, and materials should be in English to ensure maximum accessibility and engagement for our international audience."
        },
        {
          question: "Are translators available during presentations?",
          answer: "Translators are not provided as part of our conference services. However, if you require translation services, you're welcome to arrange your own translator. We recommend confirming any special arrangements in advance."
        }
      ]
    },
    {
      title: "Exhibition & Sponsorship",
      icon: <Award className="h-5 w-5" />,
      faqs: [
        {
          question: "How can I reserve exhibitor space in the exhibit hall?",
          answer: "Join us as an exhibitor to showcase your products and services to our engaged audience! Simply fill out our exhibitor form or contact our conference manager directly via email. For comprehensive information about sponsorship packages and exhibition opportunities, visit our dedicated Sponsors and Exhibitors page."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <HelpCircle className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="text-sm font-medium">
              Get Answers
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about Atom Conferences. Can't find your answer? 
            Our support team is here to help.
          </p>
          <Button size="lg" className="mb-8">
            <MessageCircle className="h-5 w-5 mr-2" />
            Ask a Question
          </Button>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-secondary/20">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    {category.icon}
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`} className="border-b last:border-b-0">
                        <AccordionTrigger className="px-6 py-4 text-left hover:bg-secondary/10 hover:no-underline">
                          <span className="font-medium">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <Card className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our dedicated support team is ready to help you with any questions about registration, 
                presentations, or conference logistics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Support
                </Button>
                <Button size="lg" variant="outline">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Live Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FAQ;