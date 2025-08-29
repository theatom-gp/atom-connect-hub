import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { getImagePath } from '@/lib/imageUtils';

const CancellationPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat text-primary-foreground py-20 px-4 text-center overflow-hidden" style={{backgroundImage: "url('" + getImagePath("hero-conference.jpg") + "')"}}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60"></div>
        <div className="relative container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Cancellation <span className="text-yellow-300">Policy</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              Please review our comprehensive cancellation and refund policies before registering for any conference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                <FileText className="h-5 w-5 mr-2" />
                <a href="/cancellation-policy.pdf" download>Download PDF Version</a>
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/70 mt-6">
              Last Updated: January 2025 • Effective: January 1, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Policy Content */}
          <div className="space-y-12">
            {/* Registration Cancellation */}
            <div className="bg-card rounded-lg p-8 shadow-sm border">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">1</div>
                Registration Cancellation
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <div className="border-l-4 border-primary/20 pl-4">
                  <h3 className="font-semibold text-foreground mb-2">Before 60 days of the conference</h3>
                  <p>75% refund of registration fee</p>
                </div>
                
                <div className="border-l-4 border-amber-400/20 pl-4">
                  <h3 className="font-semibold text-foreground mb-2">Between 60 to 30 days prior to the conference</h3>
                  <p>25% refund of registration fee</p>
                </div>
                
                <div className="border-l-4 border-red-400/20 pl-4">
                  <h3 className="font-semibold text-foreground mb-2">Within 30 days of the conference</h3>
                  <p>No refund of both registration & accommodation fee</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Important:</strong> Notice of cancellation must be made in writing by email to the respective conference secretary. 
                  The cancellation will not be effective until a written acknowledgment is received. The date of email receipt will be the basis for considering refunds.
                </p>
              </div>
            </div>

            {/* Conference Cancellation */}
            <div className="bg-card rounded-lg p-8 shadow-sm border">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">2</div>
                Conference Cancellation/Postpone by Organizer
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>In the event that the congress cannot be held or is postponed due to situation(s) beyond the control of the Conference organizers or due to events that are not attributable to wrongful intent or gross negligence of the congress organizers:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The congress organizers will refund 100% of the registration fee</li>
                  <li>Organizers cannot be held liable for any damages, costs, or losses incurred</li>
                  <li>This includes transportation costs, flight booking cancellation charges, accommodation costs, and financial losses</li>
                </ul>
              </div>
            </div>

            {/* Transfer Policy */}
            <div className="bg-card rounded-lg p-8 shadow-sm border">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">3</div>
                Registration Transfer Policy
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>A fully paid registration can be transferred to other related conferences within the Organization, only if the participant has a reason for their absence:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Transfers are only initiated by requests through emails</li>
                  <li>If there is a replacement of a registered person, details must include: Full name, Contact number, Email address, and presenting Abstract along with Title</li>
                  <li>Registration fee cannot be transferred if not intimated a month prior to the conference</li>
                  <li>A registered fee can only be transferred to one conference and is not eligible for refund</li>
                </ul>
              </div>
            </div>

            {/* Force Majeure */}
            <div className="bg-card rounded-lg p-8 shadow-sm border">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">4</div>
                Force Majeure Events
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>In cases of force majeure events (natural disasters, government restrictions, public health emergencies):</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Virtual conference alternatives will be provided when possible</li>
                  <li>Conference credits valid for 24 months will be issued</li>
                </ul>
              </div>
            </div>

            {/* Insurance & Payment Information */}
            <div className="bg-card rounded-lg p-8 shadow-sm border">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">5</div>
                Insurance & Payment Information
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <div className="border-l-4 border-blue-400/20 pl-4">
                  <h3 className="font-semibold text-foreground mb-2">Insurance</h3>
                  <p>The registration fee does not include the participant's insurance against accidents, sickness, cancellation, theft, property damage, or loss. Participants are advised to take adequate personal insurance.</p>
                </div>
                
                <div className="border-l-4 border-green-400/20 pl-4">
                  <h3 className="font-semibold text-foreground mb-2">Payment Processing</h3>
                  <p>A charge of 3.5% processing fee is applicable on all registration and/or accommodation payments. Payments should be made in advance and in USD/INR only, using a credit card or bank transfer.</p>
                </div>
                
                <div className="border-l-4 border-purple-400/20 pl-4">
                  <h3 className="font-semibold text-foreground mb-2">Bank Fees</h3>
                  <p>All bank fees and money transfer costs must be paid by the transmitter with no additional fees for the beneficiary.</p>
                </div>
              </div>
            </div>

            {/* Refund Process */}
            <div className="bg-card rounded-lg p-8 shadow-sm border">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">6</div>
                Refund Process
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>Refunds will be made in the following ways:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>For payments received by credit or debit cards, the same credit/debit card will be refunded</li>
                  <li>For all other payments, a bank transfer will be made to the payee-nominated account and all bank charges will be for the registrant's account</li>
                </ul>
                
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> In the case of a VISA refusal, the paid amount can be transferred to another conference as per your choice. 
                    Participants who availed of discounts on registration fees are not eligible for refunds.
                  </p>
                </div>
              </div>
            </div>

            {/* Authorization Policy */}
            <div className="bg-card rounded-lg p-8 shadow-sm border">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">7</div>
                Authorization Policy
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>By registering for the conference you grant permission to Atom Conferences to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Photograph, film, or record and use your name, likeness, image, voice, and comments</li>
                  <li>Publish, reproduce, exhibit, distribute, broadcast, edit, and/or digitize the resulting images and materials</li>
                  <li>Use materials in publications, advertising materials, or in any other form worldwide without compensation</li>
                </ul>
                
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Important:</strong> Photography and/or videotaping during any session is prohibited.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-primary/5 rounded-lg p-8 border border-primary/10">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Need Assistance?
              </h2>
              
              <p className="text-muted-foreground mb-4">
                For cancellation requests or policy questions, please contact our support team:
              </p>
              
              <div className="space-y-2 text-muted-foreground">
                <p><strong className="text-foreground">Email:</strong> support@atomconferences.com</p>
                <p><strong className="text-foreground">Phone:</strong> 1-800-ATOM-CONF (1-800-286-6266)</p>
                <p><strong className="text-foreground">Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST</p>
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-sm">
                  <strong>Important:</strong> All cancellation requests must be submitted in writing via email. 
                  Verbal cancellations will not be processed.
                </p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-center pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Last Updated: December 2024 | This policy is subject to change with 30 days notice
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CancellationPolicy;