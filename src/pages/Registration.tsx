import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

interface RegistrationData {
  // Participant Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  country: string;
  dietaryRestrictions: string;
  specialRequirements: string;
  
  // Registration Type
  registrationType: string;
  pricingTier: string;
  
  // Accommodation
  accommodationType: string;
  occupancyType: string;
  nights: string;
  
  // Additional Info
  abstractSubmission: boolean;
  posterSubmission: boolean;
  accompanyingPerson: boolean;
}

const Registration = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    designation: '',
    country: '',
    dietaryRestrictions: '',
    specialRequirements: '',
    registrationType: '',
    pricingTier: '',
    accommodationType: '',
    occupancyType: '',
    nights: '',
    abstractSubmission: false,
    posterSubmission: false,
    accompanyingPerson: false,
  });

  const [selectedRegistration, setSelectedRegistration] = useState<{
    type: string;
    tier: string;
    price: number;
  } | null>(null);

  const [selectedAccommodation, setSelectedAccommodation] = useState<{
    type: string;
    occupancy: string;
    nights: string;
    price: number;
  } | null>(null);

  const registrationOptions = [
    {
      type: 'SPEAKER (IN PERSON)',
      tiers: [
        { name: 'Pre Earlybird on/before May 25, 2025', price: 699.00 },
        { name: 'Earlybird on/before August 22, 2025', price: 749.00 },
        { name: 'Standard on/before August 28, 2025', price: 849.00 },
        { name: 'Final Registration November 01, 2025', price: 949.00 },
      ]
    },
    {
      type: 'PACKAGE A (REGISTRATION + 2 NIGHTS ACCOMMODATION)',
      tiers: [
        { name: 'Pre Earlybird on/before May 25, 2025', price: 1049.00 },
        { name: 'Earlybird on/before August 22, 2025', price: 1099.00 },
        { name: 'Standard on/before August 28, 2025', price: 1199.00 },
        { name: 'Final Registration November 01, 2025', price: 1299.00 },
      ]
    },
    {
      type: 'PACKAGE B (REGISTRATION + 3 NIGHTS ACCOMMODATION)',
      tiers: [
        { name: 'Pre Earlybird on/before May 25, 2025', price: 1249.00 },
        { name: 'Earlybird on/before August 22, 2025', price: 1299.00 },
        { name: 'Standard on/before August 28, 2025', price: 1399.00 },
        { name: 'Final Registration November 01, 2025', price: 1499.00 },
      ]
    },
    {
      type: 'VIRTUAL (SPEAKER/DELEGATE)',
      tiers: [
        { name: 'Pre Earlybird on/before May 25, 2025', price: 349.00 },
        { name: 'Earlybird on/before August 22, 2025', price: 399.00 },
        { name: 'Standard on/before August 28, 2025', price: 499.00 },
        { name: 'Final Registration November 01, 2025', price: 599.00 },
      ]
    },
    {
      type: 'DELEGATE/LISTENER (IN-PERSON)',
      tiers: [
        { name: 'Pre Earlybird on/before May 25, 2025', price: 749.00 },
        { name: 'Earlybird on/before August 22, 2025', price: 849.00 },
        { name: 'Standard on/before August 28, 2025', price: 949.00 },
        { name: 'Final Registration November 01, 2025', price: 1049.00 },
      ]
    },
    {
      type: 'POSTER/STUDENT',
      tiers: [
        { name: 'Pre Earlybird on/before May 25, 2025', price: 449.00 },
        { name: 'Earlybird on/before August 22, 2025', price: 549.00 },
        { name: 'Standard on/before August 28, 2025', price: 649.00 },
        { name: 'Final Registration November 01, 2025', price: 749.00 },
      ]
    },
    {
      type: 'SPONSOR',
      tiers: [
        { name: 'Platinum', price: 5999.00 },
        { name: 'Gold', price: 4999.00 },
        { name: 'Silver', price: 3999.00 },
        { name: 'Exhibitor', price: 2999.00 },
      ]
    }
  ];

  const accommodationOptions = [
    { nights: '1 night', single: 200.00, double: 230.00, triple: 270.00 },
    { nights: '2 nights', single: 400.00, double: 460.00, triple: 520.00 },
    { nights: '3 nights', single: 600.00, double: 690.00, triple: 780.00 },
    { nights: '4 nights', single: 800.00, double: 920.00, triple: 1040.00 },
    { nights: 'Accompanying Person', single: 299.00, double: null, triple: null },
  ];

  const handleInputChange = (field: keyof RegistrationData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegistrationSelect = (type: string, tier: string, price: number) => {
    setSelectedRegistration({ type, tier, price });
    setFormData(prev => ({ ...prev, registrationType: type, pricingTier: tier }));
  };

  const handleAccommodationSelect = (nights: string, occupancy: string, price: number) => {
    setSelectedAccommodation({ type: 'accommodation', occupancy, nights, price });
    setFormData(prev => ({ ...prev, accommodationType: 'accommodation', occupancyType: occupancy, nights }));
  };

  const calculateTotal = () => {
    let total = 0;
    if (selectedRegistration) total += selectedRegistration.price;
    if (selectedAccommodation) total += selectedAccommodation.price;
    return total;
  };

  const calculateProcessingFee = () => {
    const total = calculateTotal();
    return total * 0.035;
  };

  const handleSubmit = () => {
    if (!selectedRegistration) {
      toast({
        title: "Selection Required",
        description: "Please select a registration type and pricing tier.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Registration Data:', formData);
    console.log('Selected Registration:', selectedRegistration);
    console.log('Selected Accommodation:', selectedAccommodation);
    
    toast({
      title: "Registration Submitted",
      description: "Your registration has been submitted successfully!",
    });
  };

  const nextStep = () => {
    if (currentStep === 1 && (!formData.firstName || !formData.lastName || !formData.email || !formData.organization)) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Conference Registration</h1>
          <p className="text-lg text-gray-600">Join us for an exciting conference experience</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                                 <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                   currentStep >= step 
                     ? 'bg-blue-600 text-white' 
                     : 'bg-gray-200 text-gray-600'
                 }`}>
                  {step}
                </div>
                {step < 3 && (
                                     <div className={`w-16 h-1 mx-2 ${
                     currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                   }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-4">
            {/* Step 1: Participant Details */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600">Step 1: Participant Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="organization">Organization/Institution *</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => handleInputChange('organization', e.target.value)}
                        placeholder="Enter organization name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="designation">Designation/Title</Label>
                      <Input
                        id="designation"
                        value={formData.designation}
                        onChange={(e) => handleInputChange('designation', e.target.value)}
                        placeholder="Enter designation"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="in">India</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                    <Textarea
                      id="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                      placeholder="Any dietary restrictions or preferences?"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialRequirements">Special Requirements</Label>
                    <Textarea
                      id="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                      placeholder="Any special requirements or accessibility needs?"
                      rows={2}
                    />
                  </div>


                </CardContent>
              </Card>
            )}

            {/* Step 2: Registration Type Selection */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600">Step 2: Registration Type & Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 min-w-[1200px]">
                      <thead>
                        <tr className="bg-blue-600 text-white">
                          <th className="border border-gray-300 p-4 text-left w-1/5">REGISTRATION TYPE</th>
                          <th className="border border-gray-300 p-4 text-center w-1/5">Pre Earlybird<br />on/before May 25, 2025</th>
                          <th className="border border-gray-300 p-4 text-center w-1/5">Earlybird<br />on/before August 22, 2025</th>
                          <th className="border border-gray-300 p-4 text-center w-1/5">Standard<br />on/before August 28, 2025</th>
                          <th className="border border-gray-300 p-4 text-center w-1/5">Final Registration<br />November 01, 2025</th>
                        </tr>
                      </thead>
                                              <tbody>
                          {registrationOptions.map((option, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-4 font-medium">
                                {option.type}
                              </td>
                              {option.tiers.map((tier, tierIndex) => (
                                <td key={tierIndex} className="border border-gray-300 p-4 text-center">
                                  <div className="flex flex-col items-center space-y-3">
                                    <span className="font-semibold text-lg">${tier.price.toFixed(2)}</span>
                                    <RadioGroup
                                      value={selectedRegistration?.type === option.type && selectedRegistration?.tier === tier.name ? `${index}-${tierIndex}` : ''}
                                      onValueChange={() => handleRegistrationSelect(option.type, tier.name, tier.price)}
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={`${index}-${tierIndex}`} id={`${index}-${tierIndex}`} />
                                        <Label htmlFor={`${index}-${tierIndex}`} className="text-sm">Select</Label>
                                      </div>
                                    </RadioGroup>
                                  </div>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                    </table>
                  </div>

                  {/* Addons Section */}
                  <div className="mt-8">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg">
                      <h3 className="text-lg font-semibold">ADDONS</h3>
                      <p className="text-sm">Accommodation</p>
                    </div>
                    <div className="overflow-x-auto border border-gray-300 rounded-b-lg">
                      <table className="w-full min-w-[900px]">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-4 text-left w-1/4">Accommodation</th>
                            <th className="border border-gray-300 p-4 text-center w-1/4">Single occupancy</th>
                            <th className="border border-gray-300 p-4 text-center w-1/4">Double occupancy</th>
                            <th className="border border-gray-300 p-4 text-center w-1/4">Triple occupancy</th>
                          </tr>
                        </thead>
                        <tbody>
                          {accommodationOptions.map((option, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-4 font-medium">
                                {option.nights}
                              </td>
                              <td className="border border-gray-300 p-4 text-center">
                                {option.single && (
                                  <div className="flex flex-col items-center space-y-3">
                                    <span className="font-semibold text-lg">${option.single.toFixed(2)}</span>
                                    <RadioGroup
                                      value={selectedAccommodation?.nights === option.nights && selectedAccommodation?.occupancy === 'single' ? `acc-${index}-single` : ''}
                                      onValueChange={() => handleAccommodationSelect(option.nights, 'single', option.single!)}
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={`acc-${index}-single`} id={`acc-${index}-single`} />
                                        <Label htmlFor={`acc-${index}-single`} className="text-sm">Select</Label>
                                      </div>
                                    </RadioGroup>
                                  </div>
                                )}
                              </td>
                              <td className="border border-gray-300 p-4 text-center">
                                {option.double && (
                                  <div className="flex flex-col items-center space-y-3">
                                    <span className="font-semibold text-lg">${option.double.toFixed(2)}</span>
                                    <RadioGroup
                                      value={selectedAccommodation?.nights === option.nights && selectedAccommodation?.occupancy === 'double' ? `acc-${index}-double` : ''}
                                      onValueChange={() => handleAccommodationSelect(option.nights, 'double', option.double!)}
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={`acc-${index}-double`} id={`acc-${index}-double`} />
                                        <Label htmlFor={`acc-${index}-double`} className="text-sm">Select</Label>
                                      </div>
                                    </RadioGroup>
                                  </div>
                                )}
                              </td>
                              <td className="border border-gray-300 p-4 text-center">
                                {option.triple && (
                                  <div className="flex flex-col items-center space-y-3">
                                    <span className="font-semibold text-lg">${option.triple.toFixed(2)}</span>
                                    <RadioGroup
                                      value={selectedAccommodation?.nights === option.nights && selectedAccommodation?.occupancy === 'triple' ? `acc-${index}-triple` : ''}
                                      onValueChange={() => handleAccommodationSelect(option.nights, 'triple', option.triple!)}
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={`acc-${index}-triple`} id={`acc-${index}-triple`} />
                                        <Label htmlFor={`acc-${index}-triple`} className="text-sm">Select</Label>
                                      </div>
                                    </RadioGroup>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Review & Submit */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600">Step 3: Review & Submit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> A 3.5% processing fee will be added for all online/wire transfer payments
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Selected Registration</h3>
                    {selectedRegistration && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p><strong>Type:</strong> {selectedRegistration.type}</p>
                        <p><strong>Tier:</strong> {selectedRegistration.tier}</p>
                        <p><strong>Price:</strong> ${selectedRegistration.price.toFixed(2)}</p>
                      </div>
                    )}

                    {selectedAccommodation && (
                      <>
                        <h3 className="text-lg font-semibold">Selected Accommodation</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p><strong>Nights:</strong> {selectedAccommodation.nights}</p>
                          <p><strong>Occupancy:</strong> {selectedAccommodation.occupancy}</p>
                          <p><strong>Price:</strong> ${selectedAccommodation.price.toFixed(2)}</p>
                        </div>
                      </>
                    )}

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-800">Cost Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Registration:</span>
                          <span>${selectedRegistration?.price.toFixed(2) || '0.00'}</span>
                        </div>
                        {selectedAccommodation && (
                          <div className="flex justify-between">
                            <span>Accommodation:</span>
                            <span>${selectedAccommodation.price.toFixed(2)}</span>
                          </div>
                        )}
                        <Separator />
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>${calculateTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Processing Fee (3.5%):</span>
                          <span>${calculateProcessingFee().toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total:</span>
                          <span>${(calculateTotal() + calculateProcessingFee()).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      By proceeding you agree to the{' '}
                      <a href="/privacy-policy" className="text-blue-600 hover:underline">privacy policy</a>
                      ,{' '}
                      <a href="/terms-and-conditions" className="text-blue-600 hover:underline">terms and conditions</a>
                      , and{' '}
                      <a href="/cancellation-policy" className="text-blue-600 hover:underline">Cancellation Policy</a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {currentStep > 1 && (
                <Button onClick={prevStep} variant="outline">
                  Previous
                </Button>
              )}
              {currentStep < 3 ? (
                <Button onClick={nextStep} className="ml-auto">
                  Next
                </Button>
              ) : (
                                 <Button onClick={handleSubmit} className="ml-auto bg-blue-600 hover:bg-blue-700">
                   Register Now
                 </Button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Payment Options */}
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Accepted Payments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PayPal</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">PayPal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-6 bg-gradient-to-r from-purple-500 to-purple-700 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Stripe</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Stripe</span>
                </div>
                <div className="pt-2">
                  <p className="text-xs text-gray-600 mb-2">Credit Cards Accepted:</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-5 bg-blue-900 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">V</span>
                    </div>
                    <div className="w-8 h-5 bg-red-600 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">M</span>
                    </div>
                    <div className="w-8 h-5 bg-blue-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">A</span>
                    </div>
                    <div className="w-8 h-5 bg-orange-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">D</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Visa, Mastercard, Amex, Discover</p>
                </div>
              </CardContent>
            </Card>

            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">Registration Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Current Step</h4>
                                   <Badge variant="outline" className="text-blue-600 border-blue-600">
                   Step {currentStep} of 3
                 </Badge>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Selected Items</h4>
                  {selectedRegistration && (
                    <div className="text-sm space-y-1">
                      <p><strong>Registration:</strong></p>
                      <p className="text-gray-600">{selectedRegistration.type}</p>
                      <p className="text-gray-600">{selectedRegistration.tier}</p>
                                             <p className="text-blue-600 font-semibold">${selectedRegistration.price.toFixed(2)}</p>
                    </div>
                  )}

                  {selectedAccommodation && (
                    <div className="text-sm space-y-1 mt-3">
                      <p><strong>Accommodation:</strong></p>
                      <p className="text-gray-600">{selectedAccommodation.nights}</p>
                      <p className="text-gray-600">{selectedAccommodation.occupancy} occupancy</p>
                                             <p className="text-blue-600 font-semibold">${selectedAccommodation.price.toFixed(2)}</p>
                    </div>
                  )}

                  {!selectedRegistration && !selectedAccommodation && (
                    <p className="text-gray-500 text-sm">No items selected yet</p>
                  )}
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Total Cost</h4>
                                     <div className="text-2xl font-bold text-blue-600">
                     ${(calculateTotal() + calculateProcessingFee()).toFixed(2)}
                   </div>
                  <p className="text-xs text-gray-500">Includes 3.5% processing fee</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
