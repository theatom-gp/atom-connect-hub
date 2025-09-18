import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";

// Core pages (loaded immediately - small and essential)
import Index from "./pages/Index";
import Meetings from "./pages/Meetings";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";

// Dynamic conference routing - no need to import individual conference pages
const ConferenceRouter = lazy(() => import("./pages/conference/ConferenceRouter"));

// Lazy load form pages (heavy with validation and UI components)
const AbstractSubmission = lazy(() => import("./pages/AbstractSubmission"));
const Registration = lazy(() => import("./pages/Registration"));

// Lazy load policy pages (less frequently accessed)
const CancellationPolicy = lazy(() => import("./pages/CancellationPolicy"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const PresentationGuidelines = lazy(() => import("./pages/PresentationGuidelines"));
const VisaInvitation = lazy(() => import("./pages/VisaInvitation"));

// Lazy load development/testing components
const FirebaseTest = lazy(() => import("./components/FirebaseTest"));
const ConferenceAdmin = lazy(() => import("./pages/admin/ConferenceAdminFinal"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider>
        <BrowserRouter>
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          }>
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
              <Route path="/presentation-guidelines" element={<PresentationGuidelines />} />
              <Route path="/visa-invitation" element={<VisaInvitation />} />
              <Route path="/firebase-test" element={<FirebaseTest />} />
              <Route path="/admin/conferences" element={<ConferenceAdmin />} />
              {/* Dynamic conference routing - handles all conference pages automatically */}
              <Route path="/conference/:conferenceId" element={<ConferenceRouter />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <CookieConsent />
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
