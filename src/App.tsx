import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Meetings from "./pages/Meetings";
import CancellationPolicy from "./pages/CancellationPolicy";
import TechInnovationExpo from "./pages/conference/TechInnovationExpo";
import AISummit from "./pages/conference/AISummit";
import GlobalHealthcareRevolution from "./pages/conference/GlobalHealthcareRevolution";
// import SustainableFutureConference from "./pages/SustainableFutureConference";
import GlobalFinanceSummit from "./pages/conference/GlobalFinanceSummit";
import ForensicScience from "./pages/conference/ForensicScience";
// import EducationTransformConference from "./pages/EducationTransformConference";
// import DigitalMarketingMasters from "./pages/DigitalMarketingMasters";
// import LegalInnovationForum from "./pages/LegalInnovationForum";
// import EngineeringExcellenceSummit from "./pages/EngineeringExcellenceSummit";
// import MentalHealthPsychologyCongress from "./pages/MentalHealthPsychologyCongress";
// import CreativeArtsDesignFestival from "./pages/CreativeArtsDesignFestival";
// import ScientificResearchSymposium from "./pages/ScientificResearchSymposium";
// import GlobalForensicScienceResearch from "./pages/GlobalForensicScienceResearch";
import AbstractSubmission from "./pages/AbstractSubmission";
import Registration from "./pages/Registration";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/submit-abstract" element={<AbstractSubmission />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/conference/tech-innovation-expo-2025" element={<TechInnovationExpo />} />
          <Route path="/conference/aisummit" element={<AISummit />} />
          <Route path="/conference/globalhealthcarerevolution" element={<GlobalHealthcareRevolution />} />
          <Route path="/conference/globalfinancesummit" element={<GlobalFinanceSummit />} />
          <Route path="/conference/forensicscience" element={<ForensicScience />} />
          {/* <Route path="/conference/sustainablefutureconference" element={<SustainableFutureConference />} />
          <Route path="/conference/globalfinancesummit" element={<GlobalFinancesummit />} />
          <Route path="/conference/educationtransformconference" element={<EducationTransformConference />} />
          <Route path="/conference/digitalmarketingmasters" element={<DigitalMarketingMasters />} /> 
          <Route path="/conference/legalinnovationforum" element={<LegalInnovationForum />} /> 
          <Route path="/conference/engineeringexcellencesummit" element={<EngineeringExcellenceSummit />} />
          <Route path="/conference/mentalhealthpsychologycongress" element={<MentalHealthPsychologyCongress />} />
          <Route path="/conference/creativeartsdesignfestival" element={<CreativeArtsDesignFestival />} />
          <Route path="/conference/scientificresearchsymposium" element={<ScientificResearchSymposium />} />
          <Route path="/conference/globalforensicscienceresearch" element={<GlobalForensicScienceResearch />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
