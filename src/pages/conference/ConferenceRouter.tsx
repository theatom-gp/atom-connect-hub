import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { conferences } from '@/lib/conferences';
import AISummit from './AISummit';
import TechInnovationExpo from './TechInnovationExpo';
import GlobalHealthcareRevolution from './GlobalHealthcareRevolution';
import GlobalFinanceSummit from './GlobalFinanceSummit';
import ForensicScience from './ForensicScience';
import PowerandEnergy from './PowerandEnergy';
import QuantumComputing from './QuantumComputing';
import Biomaterials from './Biomaterials';
import SurgeryandAnesthesia from './SurgeryandAnesthesia';
import Neurology from './Neurology';

// Conference component mapping
const conferenceComponents = {
  'aisummit': AISummit,
  'techinnovationexpo': TechInnovationExpo,
  'globalhealthcarerevolution': GlobalHealthcareRevolution,
  'globalfinancesummit': GlobalFinanceSummit,
  'forensicscience': ForensicScience,
  'powerandenergy': PowerandEnergy,
  'quantumcomputing': QuantumComputing,
  'biomaterials': Biomaterials,
  'surgeryandanesthesia': SurgeryandAnesthesia,
  'neurology': Neurology,
} as const;

type ConferenceId = keyof typeof conferenceComponents;

const ConferenceRouter = () => {
  const { conferenceId } = useParams<{ conferenceId: string }>();
  const [isValidConference, setIsValidConference] = useState<boolean | null>(null);

  useEffect(() => {
    if (conferenceId) {
      // Check if conference exists in our data
      const conferenceExists = conferences.some(conf => conf.id === conferenceId);
      setIsValidConference(conferenceExists);
    }
  }, [conferenceId]);

  // Loading state
  if (isValidConference === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Conference not found
  if (isValidConference === false) {
    return <Navigate to="/404" replace />;
  }

  // Get the conference component
  const ConferenceComponent = conferenceComponents[conferenceId as ConferenceId];

  if (!ConferenceComponent) {
    return <Navigate to="/404" replace />;
  }

  // Render the specific conference component
  return <ConferenceComponent />;
};

export default ConferenceRouter;
