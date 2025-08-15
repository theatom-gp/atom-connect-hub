import Navigation from '@/components/Navigation';

const CancellationPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Cancellation <span className="text-primary">Policy</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Please review our comprehensive cancellation and refund policies before registering for any conference.
            </p>
          </div>

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
                  <h3 className="font-semibold text-foreground mb-2">Full Refund Period</h3>
                  <p>Cancellations made 60+ days before the conference start date are eligible for a full refund minus a $50 administrative fee.</p>
                </div>
                
                <div className="border-l-4 border-amber-400/20 pl-4">
                  <h3 className="font-semibold text-foreground mb-2">Partial Refund Period</h3>
                  <p>Cancellations made 30-59 days before the conference receive a 75% refund of the registration fee.</p>
                </div>
                
                <div className="border-l-4 border-orange-400/20 pl-4">
                  <h3 className="font-semibold text-foreground mb-2">Limited Refund Period</h3>
                  <p>Cancellations made 15-29 days before the conference receive a 50% refund of the registration fee.</p>
                </div>
                
                <div className="border-l-4 border-red-400/20 pl-4">
                  <h3 className="font-semibold text-foreground mb-2">No Refund Period</h3>
                  <p>No refunds are available for cancellations made less than 15 days before the conference start date.</p>
                </div>
              </div>
            </div>

            {/* Conference Cancellation */}
            <div className="bg-card rounded-lg p-8 shadow-sm border">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">2</div>
                Conference Cancellation by Organizer
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>In the unlikely event that Atom Conferences must cancel a conference:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Full refunds will be provided to all registered attendees</li>
                  <li>Alternative conference dates will be offered when possible</li>
                  <li>Credit towards future conferences may be provided as an option</li>
                  <li>Reasonable accommodation and travel expenses may be covered on a case-by-case basis</li>
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
                <p>Registration transfers are permitted under the following conditions:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Transfers to another person must be requested at least 7 days before the conference</li>
                  <li>Transfers to future conferences are subject to a $25 administrative fee</li>
                  <li>Only one transfer per registration is permitted</li>
                  <li>Both original and new attendee information must be provided</li>
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
                  <li>Partial refunds may be available based on circumstances</li>
                  <li>Decision will be made in the best interest of attendee safety and experience</li>
                </ul>
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