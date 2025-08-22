import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import { useSearchParams } from 'react-router-dom';

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  country: string;
  dietaryRestrictions: string;
  specialRequirements: string;
  registrationType: string;
  pricingTier: string;
  accommodationType: string;
  occupancyType: string;
  nights: string;
  abstractSubmission: boolean;
  posterSubmission: boolean;
  accompanyingPerson: boolean;
}

interface PricingTier {
  name: string;
  price: number;
  deadline: Date;
  isAvailable: boolean;
}

interface RegistrationOption {
  type: string;
  tiers: PricingTier[];
}

const Registration = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [conferenceTargetDate, setConferenceTargetDate] = useState<Date | null>(null);
  const [registrationOptions, setRegistrationOptions] = useState<RegistrationOption[]>([]);
  const [selectedConference, setSelectedConference] = useState<string>('forensicscience');
  
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

  const calculateRegistrationDates = (targetDate: Date) => {
    const preEarlyBird = new Date(targetDate);
    preEarlyBird.setMonth(targetDate.getMonth() - 5);
    
    const earlyBird = new Date(targetDate);
    earlyBird.setMonth(targetDate.getMonth() - 3);
    
    const standard = new Date(targetDate);
    standard.setMonth(targetDate.getMonth() - 2);
    
    const finalRegistration = new Date(targetDate);
    finalRegistration.setDate(targetDate.getDate() - 10);
    
    return { preEarlyBird, earlyBird, standard, finalRegistration };
  };

  const isTierAvailable = (deadline: Date) => {
    return new Date() <= deadline;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const generateRegistrationOptions = (targetDate: Date) => {
    const { preEarlyBird, earlyBird, standard, finalRegistration } = calculateRegistrationDates(targetDate);
    
    return [
      {
        type: 'SPEAKER (IN PERSON)',
        tiers: [
          { name: 'Pre Earlybird', price: 699, deadline: preEarlyBird, isAvailable: isTierAvailable(preEarlyBird) },
          { name: 'Earlybird', price: 799, deadline: earlyBird, isAvailable: isTierAvailable(earlyBird) },
          { name: 'Standard', price: 899, deadline: standard, isAvailable: isTierAvailable(standard) },
          { name: 'Final Registration', price: 999, deadline: finalRegistration, isAvailable: isTierAvailable(finalRegistration) }
        ]
      },
      {
        type: 'Package A (Registration + 2 Nights Accommodation)',
        tiers: [
          { name: 'Pre Earlybird', price: 1099, deadline: preEarlyBird, isAvailable: isTierAvailable(preEarlyBird) },
          { name: 'Earlybird', price: 1149, deadline: earlyBird, isAvailable: isTierAvailable(earlyBird) },
          { name: 'Standard', price: 1199, deadline: standard, isAvailable: isTierAvailable(standard) },
          { name: 'Final Registration', price: 1249, deadline: finalRegistration, isAvailable: isTierAvailable(finalRegistration) }
        ]
      },
      {
        type: 'Package B (Registration + 3 Nights Accommodation)',
        tiers: [
          { name: 'Pre Earlybird', price: 1249, deadline: preEarlyBird, isAvailable: isTierAvailable(preEarlyBird) },
          { name: 'Earlybird', price: 1299, deadline: earlyBird, isAvailable: isTierAvailable(earlyBird) },
          { name: 'Standard', price: 1399, deadline: standard, isAvailable: isTierAvailable(standard) },
          { name: 'Final Registration', price: 1449, deadline: finalRegistration, isAvailable: isTierAvailable(finalRegistration) }
        ]
      },
      {
        type: 'Virtual (Speaker/Delegate)',
        tiers: [
          { name: 'Pre Earlybird', price: 349, deadline: preEarlyBird, isAvailable: isTierAvailable(preEarlyBird) },
          { name: 'Earlybird', price: 399, deadline: earlyBird, isAvailable: isTierAvailable(earlyBird) },
          { name: 'Standard', price: 499, deadline: standard, isAvailable: isTierAvailable(standard) },
          { name: 'Final Registration', price: 599, deadline: finalRegistration, isAvailable: isTierAvailable(finalRegistration) }
        ]
      },
      {
        type: 'Delegate/Listener (In-Person)',
        tiers: [
          { name: 'Pre Earlybird', price: 749, deadline: preEarlyBird, isAvailable: isTierAvailable(preEarlyBird) },
          { name: 'Earlybird', price: 849, deadline: earlyBird, isAvailable: isTierAvailable(earlyBird) },
          { name: 'Standard', price: 999, deadline: standard, isAvailable: isTierAvailable(standard) },
          { name: 'Final Registration', price: 1049, deadline: finalRegistration, isAvailable: isTierAvailable(finalRegistration) }
        ]
      },
      {
        type: 'Student/Poster',
        tiers: [
          { name: 'Pre Earlybird', price: 449, deadline: preEarlyBird, isAvailable: isTierAvailable(preEarlyBird) },
          { name: 'Earlybird', price: 549, deadline: earlyBird, isAvailable: isTierAvailable(earlyBird) },
          { name: 'Standard', price: 649, deadline: standard, isAvailable: isTierAvailable(standard) },
          { name: 'Final Registration', price: 749, deadline: finalRegistration, isAvailable: isTierAvailable(finalRegistration) }
        ]
      },
      {
        type: 'Sponsor',
        tiers: [
          { name: 'Pre Earlybird', price: 5999, deadline: preEarlyBird, isAvailable: isTierAvailable(preEarlyBird) },
          { name: 'Earlybird', price: 4999, deadline: earlyBird, isAvailable: isTierAvailable(earlyBird) },
          { name: 'Standard', price: 3999, deadline: standard, isAvailable: isTierAvailable(standard) },
          { name: 'Final Registration', price: 2999, deadline: finalRegistration, isAvailable: isTierAvailable(finalRegistration) }
        ]
      }
    ];
  };

  useEffect(() => {
    const conferenceParam = searchParams.get('conference');
    let targetDate: Date;
    let conferenceValue: string;

    const conferenceDateMap: { [key: string]: Date } = {
      'forensicscience': new Date('2025-11-22'),
      'globalfinancesummit': new Date('2026-01-12'),
      'biomaterials': new Date('2026-02-22'),
      'neurology': new Date('2026-03-25'),
      'techinnovation': new Date('2026-04-15'),
      'quantumcomputing': new Date('2026-05-20'),
      'powerandenergy': new Date('2026-06-10'),
      'globalhealthcare': new Date('2026-07-05'),
      'surgeryandanesthesia': new Date('2026-08-15'),
    };

    const conferenceKey = Object.keys(conferenceDateMap).find(key => 
      conferenceParam === key || 
      conferenceParam === key.replace(/([A-Z])/g, '-$1').toLowerCase() ||
      conferenceParam === key.replace(/([A-Z])/g, ' $1').toLowerCase()
    );

    if (conferenceKey && conferenceDateMap[conferenceKey]) {
      targetDate = conferenceDateMap[conferenceKey];
      conferenceValue = conferenceKey;
    } else {
      targetDate = new Date('2025-11-22');
      conferenceValue = 'forensicscience';
    }

    setConferenceTargetDate(targetDate);
    setSelectedConference(conferenceValue);
    setRegistrationOptions(generateRegistrationOptions(targetDate));
  }, [searchParams]);

  const handleInputChange = (field: keyof RegistrationData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegistrationSelect = (type: string, tier: string, price: number) => {
    setSelectedRegistration({ type, tier, price });
    setFormData(prev => ({ 
      ...prev, 
      registrationType: type, 
      pricingTier: tier 
    }));
  };

  const handleAccommodationSelect = (nights: string, occupancy: string, price: number) => {
    setSelectedAccommodation({ nights, occupancy, price, type: 'Hotel' });
    setFormData(prev => ({ 
      ...prev, 
      accommodationType: 'Hotel', 
      occupancyType: occupancy, 
      nights 
    }));
  };

  const calculateTotal = () => {
    const registrationCost = selectedRegistration?.price || 0;
    const accommodationCost = selectedAccommodation?.price || 0;
    return registrationCost + accommodationCost;
  };

  const calculateProcessingFee = () => {
    return calculateTotal() * 0.035;
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    toast({
      title: "Registration Submitted!",
      description: "Thank you for registering. You will receive a confirmation email shortly.",
    });
  };

  const accommodationOptions = [
    { nights: '1 Night', single: 200, double: 230, triple: 280 },
    { nights: '2 Nights', single: 400, double: 460, triple: 550 },
    { nights: '3 Nights', single: 600, double: 690, triple: 820 },
    { nights: '4 Nights', single: 800, double: 920, triple: 1090 },
    { nights: 'For Accompanying Person', single: 299 }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Conference Registration</h1>
          <p className="text-lg text-gray-600">Join us for an exciting conference experience</p>
        </div>

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
          <div className="lg:col-span-4">
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
                      />
                    </div>
                    <div>
                      <Label htmlFor="designation">Designation/Title</Label>
                      <Input
                        id="designation"
                        value={formData.designation}
                        onChange={(e) => handleInputChange('designation', e.target.value)}
                        placeholder="Enter your designation"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      placeholder="Enter your country"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                    <Textarea
                      id="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                      placeholder="Any dietary restrictions or preferences"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialRequirements">Special Requirements</Label>
                    <Textarea
                      id="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                      placeholder="Any special requirements or accessibility needs"
                      rows={3}
                    />
                  </div>

                  {/* <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="abstractSubmission"
                        checked={formData.abstractSubmission}
                        onCheckedChange={(checked) => handleInputChange('abstractSubmission', checked as boolean)}
                      />
                      <Label htmlFor="abstractSubmission">I will submit an abstract</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="posterSubmission"
                        checked={formData.posterSubmission}
                        onCheckedChange={(checked) => handleInputChange('posterSubmission', checked as boolean)}
                      />
                      <Label htmlFor="posterSubmission">I will present a poster</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="accompanyingPerson"
                        checked={formData.accompanyingPerson}
                        onCheckedChange={(checked) => handleInputChange('accompanyingPerson', checked as boolean)}
                      />
                      <Label htmlFor="accompanyingPerson">I will bring an accompanying person</Label>
                    </div>
                  </div> */}
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600">Step 2: Registration Type Selection</CardTitle>
                  <p className="text-gray-600">Conference Date: {conferenceTargetDate ? formatDate(conferenceTargetDate) : 'Loading...'}</p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-4 text-left">Registration Type</th>
                          {registrationOptions[0]?.tiers.map((tier, index) => (
                            <th key={index} className="border border-gray-300 p-4 text-center">
                              <div className="font-semibold">{tier.name}</div>
                              <div className="text-sm text-gray-600">on/before {formatDate(tier.deadline)}</div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {registrationOptions.map((option, index) => (
                          <tr key={index}>
                            <td className="border border-gray-300 p-4 font-semibold">{option.type}</td>
                            {option.tiers.map((tier, tierIndex) => (
                              <td key={tierIndex} className={`border border-gray-300 p-4 text-center ${!tier.isAvailable ? 'bg-gray-100 opacity-60' : ''}`}>
                                <div className="flex flex-col items-center space-y-3">
                                  <RadioGroup
                                    value={selectedRegistration?.type === option.type && selectedRegistration?.tier === tier.name ? `${option.type}-${tier.name}` : ''}
                                    onValueChange={() => tier.isAvailable && handleRegistrationSelect(option.type, tier.name, tier.price)}
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem 
                                        value={`${option.type}-${tier.name}`} 
                                        id={`${option.type}-${tier.name}`}
                                        disabled={!tier.isAvailable}
                                      />
                                      <Label 
                                        htmlFor={`${option.type}-${tier.name}`} 
                                        className={`text-sm ${!tier.isAvailable ? 'text-gray-500 cursor-not-allowed' : 'cursor-pointer'}`}
                                      >
                                        {tier.isAvailable ? 'Select' : 'Unavailable'}
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                  <span className="font-semibold text-lg">${tier.price.toFixed(2)}</span>
                                  {!tier.isAvailable && <Badge variant="secondary">Expired</Badge>}
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {selectedRegistration && (
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Accommodation Options</h3>
                      <p className="text-gray-600 mb-4">Select your accommodation preference if you need hotel booking</p>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 p-4 text-left">Accommodation</th>
                              <th className="border border-gray-300 p-4 text-center">Single Occupancy</th>
                              <th className="border border-gray-300 p-4 text-center">Double Occupancy</th>
                              <th className="border border-gray-300 p-4 text-center">Triple Occupancy</th>
                            </tr>
                          </thead>
                          <tbody>
                            {accommodationOptions.map((option, index) => (
                              <tr key={index}>
                                <td className="border border-gray-300 p-4 font-semibold">{option.nights}</td>
                                <td className="border border-gray-300 p-4 text-center">
                                  <div className="flex flex-col items-center space-y-3">
                                    <RadioGroup
                                      value={selectedAccommodation?.nights === option.nights && selectedAccommodation?.occupancy === 'single' ? `acc-${index}-single` : ''}
                                      onValueChange={() => handleAccommodationSelect(option.nights, 'single', option.single)}
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={`acc-${index}-single`} id={`acc-${index}-single`} />
                                        <Label htmlFor={`acc-${index}-single`} className="text-sm">Select</Label>
                                      </div>
                                    </RadioGroup>
                                    <span className="font-semibold text-lg">${option.single.toFixed(2)}</span>
                                  </div>
                                </td>
                                <td className="border border-gray-300 p-4 text-center">
                                  {option.double && (
                                    <div className="flex flex-col items-center space-y-3">
                                      <RadioGroup
                                        value={selectedAccommodation?.nights === option.nights && selectedAccommodation?.occupancy === 'double' ? `acc-${index}-double` : ''}
                                        onValueChange={() => handleAccommodationSelect(option.nights, 'double', option.double!)}
                                      >
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem value={`acc-${index}-double`} id={`acc-${index}-double`} />
                                          <Label htmlFor={`acc-${index}-double`} className="text-sm">Select</Label>
                                        </div>
                                      </RadioGroup>
                                      <span className="font-semibold text-lg">${option.double.toFixed(2)}</span>
                                    </div>
                                  )}
                                </td>
                                <td className="border border-gray-300 p-4 text-center">
                                  {option.triple && (
                                    <div className="flex flex-col items-center space-y-3">
                                      <RadioGroup
                                        value={selectedAccommodation?.nights === option.nights && selectedAccommodation?.occupancy === 'triple' ? `acc-${index}-triple` : ''}
                                        onValueChange={() => handleAccommodationSelect(option.nights, 'triple', option.triple!)}
                                      >
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem value={`acc-${index}-triple`} id={`acc-${index}-triple`} />
                                          <Label htmlFor={`acc-${index}-triple`} className="text-sm">Select</Label>
                                        </div>
                                      </RadioGroup>
                                      <span className="font-semibold text-lg">${option.triple.toFixed(2)}</span>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Note:</strong> Accommodation is optional. You can proceed without selecting accommodation if you prefer to arrange your own.
                        </p>
                      </div>
                      
                      {/* Processing Fee and Terms Agreement */}
                      <div className="mt-6 space-y-4">
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <strong>Note:</strong> A 3.5% processing fee will be added for all online/wire transfer payments.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <p className="text-sm text-gray-700">
                            By proceeding you agree to the{' '}
                            <a href="/privacy-policy" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>
                            ,{' '}
                            <a href="/terms-and-conditions" className="text-blue-600 hover:underline font-medium">Terms and Conditions</a>
                            , and{' '}
                            <a href="/cancellation-policy" className="text-blue-600 hover:underline font-medium">Cancellation Policy</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

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

          <div className="lg:col-span-1">
            <Card className="mb-4">
              <CardHeader className="pb-0">
                <CardTitle className="text-lg">Secure payments by</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {/* PayPal Section */}
                <div className="flex items-center justify-center">
                  {/* <div className="w-full max-w-xs bg-white rounded-lg border border-gray-200 p-4 shadow-sm"> */}
                    <div className="flex items-center justify-center mb-3">
                      <img 
                        src="/src/assets/paypal.png" 
                        alt="PayPal" 
                        className="w-40 h-20 object-contain"
                      />
                    </div>
                  {/* </div>*/}
                </div>

                {/* Stripe Section */}
                <div className="flex items-center justify-center">
                  {/* <div className="w-full max-w-xs bg-white rounded-lg border border-gray-200 p-4 shadow-sm"> */}
                    <div className="flex items-center justify-center mb-1">
                      <img 
                        src="/src/assets/stripe-1.webp" 
                        alt="Stripe" 
                        className="w-70 h-50 object-contain"
                      />
                    </div>
                  {/* </div> */}
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
