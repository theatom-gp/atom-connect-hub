import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Upload, Download, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const AbstractSubmission = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (uploadedFile: File) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(uploadedFile.type)) {
      toast({
        title: "Invalid file format",
        description: "Please upload only .doc, .docx, or .pdf files",
        variant: "destructive",
      });
      return;
    }

    if (uploadedFile.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    setFile(uploadedFile);
    toast({
      title: "File uploaded successfully",
      description: `${uploadedFile.name} is ready for submission`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Abstract submitted successfully!",
        description: "You will receive a confirmation email within 24 hours.",
      });
    }, 2000);
  };

  const downloadSampleAbstract = () => {
    const link = document.createElement('a');
    link.href = '/sample-abstract.pdf';
    link.download = 'sample-abstract.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: "Sample abstract is being downloaded",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Submit Your Abstract
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join the world's leading experts at Tech Innovation Expo 2025. Share your research, 
            connect with pioneers, and shape the future of technology.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Global Recognition</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Present to 2,000+ industry leaders and researchers</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Published Proceedings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Get published in our peer-reviewed conference proceedings</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Networking Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Connect with investors, collaborators, and thought leaders</p>
            </CardContent>
          </Card>
        </div>

        {/* Submission Form */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Abstract Submission Form</CardTitle>
              <CardDescription>
                Complete all required fields to submit your abstract for review. 
                Deadline: <strong>March 15, 2025</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="Enter your first name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Enter your last name" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" required />
                  </div>
                </div>

                {/* Professional Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="affiliation">Institution/Organization *</Label>
                    <Input id="affiliation" placeholder="University or Company Name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position/Title *</Label>
                    <Input id="position" placeholder="Professor, Researcher, Engineer, etc." required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input id="country" placeholder="Your country" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11-15">11-15 years</SelectItem>
                        <SelectItem value="16+">16+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Abstract Information */}
                <div className="space-y-2">
                  <Label htmlFor="title">Abstract Title *</Label>
                  <Input id="title" placeholder="Enter your abstract title (max 150 characters)" required maxLength={150} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="track">Conference Track *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select conference track" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai-ml">Artificial Intelligence & Machine Learning</SelectItem>
                      <SelectItem value="blockchain">Blockchain & Cryptocurrency</SelectItem>
                      <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                      <SelectItem value="data-science">Data Science & Analytics</SelectItem>
                      <SelectItem value="iot">Internet of Things (IoT)</SelectItem>
                      <SelectItem value="cloud">Cloud Computing</SelectItem>
                      <SelectItem value="mobile">Mobile Development</SelectItem>
                      <SelectItem value="web">Web Technologies</SelectItem>
                      <SelectItem value="ar-vr">AR/VR & Metaverse</SelectItem>
                      <SelectItem value="sustainability">Green Technology & Sustainability</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="presentation">Presentation Type *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select presentation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oral">Oral Presentation (20 minutes)</SelectItem>
                      <SelectItem value="poster">Poster Presentation</SelectItem>
                      <SelectItem value="workshop">Workshop Session (60 minutes)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords *</Label>
                  <Input id="keywords" placeholder="Enter 3-5 keywords separated by commas" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Brief Summary (Optional)</Label>
                  <Textarea 
                    id="summary" 
                    placeholder="Provide a brief summary of your research (max 500 characters)" 
                    maxLength={500}
                    rows={4}
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Abstract Document *</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={downloadSampleAbstract}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Sample
                    </Button>
                  </div>
                  
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                    } ${file ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept=".doc,.docx,.pdf"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      required
                    />
                    
                    {file ? (
                      <div className="flex items-center justify-center gap-3">
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                        <div>
                          <p className="font-medium text-green-600">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-medium mb-2">
                          Drag and drop your abstract here
                        </p>
                        <p className="text-muted-foreground mb-4">
                          or click to browse files
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Accepted formats: .doc, .docx, .pdf (max 10MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Agreement */}
                <div className="flex items-start space-x-3">
                  <Checkbox id="agreement" required />
                  <div className="grid gap-1.5 leading-none">
                    <Label 
                      htmlFor="agreement"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the terms and conditions *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      By submitting, you agree to our review process and publication guidelines.
                      You also consent to receive conference updates and notifications.
                    </p>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                        Review Process & Timeline
                      </p>
                      <ul className="text-blue-800 dark:text-blue-200 space-y-1">
                        <li>• Abstracts are reviewed by our expert panel within 2-3 weeks</li>
                        <li>• You'll receive notification by email about acceptance status</li>
                        <li>• Early bird registration discount available until April 1, 2025</li>
                        <li>• Final papers due 30 days after acceptance notification</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Abstract"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Need help with your submission? 
            <a href="/contact" className="text-primary hover:underline ml-1">
              Contact our support team
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default AbstractSubmission;