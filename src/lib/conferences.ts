// Shared conference data for the application
// This file serves as a single source of truth for all conference information

export interface Conference {
  id: string;
  title: string;
  date: string;
  venue: string;
  location: string;
  image: string;
  description: string;
  category: string;
  abstractDeadline?: string; // Optional abstract submission deadline
  registrationDeadline?: string; // Optional registration deadline
}

export const conferences: Conference[] = [
  {
    id: 'aisummit',
    title: "AI Innovation Summit 2025",
    date: "November 15-17, 2025",
    venue: "Silicon Valley Convention Center",
    location: "San Francisco, CA",
    image: "/src/assets/aisummit/bg.avif",
    description: "Join leading AI researchers, tech executives, and innovators as they unveil the future of artificial intelligence.",
    category: "Technology",
    abstractDeadline: "October 15, 2025",
    registrationDeadline: "November 1, 2025"
  },
  {
    id: 'forensicscience',
    title: "Global Congress on Forensic Science and Research",
    date: "November 22-24, 2025",
    venue: "Academic Excellence Center",
    location: "Lisbon, Portugal",
    image: "/src/assets/forensicscience/bg.jpeg",
    description: "Discover breakthrough Forensic Science technologies and innovations.",
    category: "Education",
    abstractDeadline: "October 22, 2025",
    registrationDeadline: "November 8, 2025"
  },
  {
    id: 'powerandenergy',
    title: "Global Congress on Power and Energy Engineering",
    date: "December 10-12, 2025",
    venue: "Green Technology Center",
    location: "Seattle, WA",
    image: "/src/assets/powerandenergy/bg.jpeg",
    description: "Unite with environmental leaders and Power tech pioneers driving development worldwide.",
    category: "Engineering",
    abstractDeadline: "November 10, 2025",
    registrationDeadline: "November 25, 2025"
  },
  {
    id: 'quantumcomputing',
    title: "Global Congress on Quantum Computing and Applications",
    date: "Jan 15-17, 2026",
    venue: "Quantum Computing Center",
    location: "San Francisco, CA",
    image: "/src/assets/quantumcomputing/bg.jpg",
    description: "Explore the latest quantum computing technologies and applications driving successful brand transformations.",
    category: "Technology",
    abstractDeadline: "December 15, 2025",
    registrationDeadline: "January 1, 2026"
  },
  {
    id: 'globalhealthcarerevolution',
    title: "Global Healthcare Revolution",
    date: "Feb 10-12, 2026",
    venue: "Medical Innovation Hub",
    location: "Boston, MA",
    image: "/src/assets/globalhealthcarerevolution/bg.jpg",
    description: "Discover breakthrough medical technologies and treatment innovations shaping the future of healthcare.",
    category: "Healthcare",
    abstractDeadline: "January 10, 2026",
    registrationDeadline: "January 25, 2026"
  },
  {
    id: 'biomaterials',
    title: "Global Congress on Biomaterials and Regenerative Medicine",
    date: "Feb 22-24, 2026",
    venue: "Green Technology Center",
    location: "Seattle, WA",
    image: "/src/assets/biomaterials/bg.jpeg",
    description: "Unite with industry experts and Regenerative Medicine pioneers driving sustainable development worldwide.",
    category: "Education",
    abstractDeadline: "January 22, 2026",
    registrationDeadline: "February 8, 2026"
  },
  {
    id: 'techinnovationexpo',
    title: "Tech Innovation Expo 2026",
    date: "Mar 15-17, 2026",
    venue: "Technology Convention Center",
    location: "Austin, TX",
    image: "/src/assets/conference-ai.jpg",
    description: "Explore cutting-edge technologies and connect with industry leaders shaping tomorrow's digital landscape.",
    category: "Technology",
    abstractDeadline: "February 15, 2026",
    registrationDeadline: "March 1, 2026"
  },
  {
    id: 'surgeryandanesthesia',
    title: "International Experts Summit on Surgery and Anesthesia",
    date: "Mar 16-18, 2026",
    venue: "Medical Innovation Hub",
    location: "Boston, MA",
    image: "/src/assets/surgeryandanesthesia/bg.jpeg",
    description: "Connect with Global experts in Surgery and Anesthesia.",
    category: "Healthcare",
    abstractDeadline: "February 16, 2026",
    registrationDeadline: "March 2, 2026"
  },
  {
    id: 'neurology',
    title: "International Experts Summit on Neurology and Neurological Disorders",
    date: "Mar 25-27, 2026",
    venue: "Neurology Center",
    location: "San Francisco, CA",
    image: "/src/assets/neurology/bg.jpeg",
    description: "Explore how technology is reshaping Neurology and discover new approaches to Neurological Disorders.",
    category: "Healthcare",
    abstractDeadline: "February 25, 2026",
    registrationDeadline: "March 10, 2026"
  },
  {
    id: 'sustainability',
    title: "Global Sustainability and Green Technology Summit",
    date: "Apr 15-17, 2026",
    venue: "Eco Innovation Center",
    location: "Portland, OR",
    image: "/src/assets/conference-sustainability.jpg",
    description: "Join environmental leaders and sustainability experts to explore green technologies and sustainable development solutions.",
    category: "Sustainability",
    abstractDeadline: "March 15, 2026",
    registrationDeadline: "April 1, 2026"
  }
];

// Helper functions
export const getConferenceById = (id: string): Conference | undefined => {
  return conferences.find(conference => conference.id === id);
};

export const getConferencesByCategory = (category: string): Conference[] => {
  if (category === 'All Events') return conferences;
  return conferences.filter(conference => conference.category === category);
};

export const getActiveConferences = (): Conference[] => {
  const now = new Date();
  return conferences.filter(conference => {
    const conferenceDate = new Date(conference.date.split('-')[0]); // Get start date
    return conferenceDate > now;
  });
};

export const getConferencesForAbstractSubmission = (): Conference[] => {
  const now = new Date();
  return conferences.filter(conference => {
    if (!conference.abstractDeadline) return false;
    const deadline = new Date(conference.abstractDeadline);
    return deadline > now;
  });
};

// Get unique categories from conferences
export const getUniqueCategories = (): string[] => {
  const categories = conferences.map(conference => conference.category);
  return ['All Events', ...Array.from(new Set(categories))];
};

// Get conference count by category
export const getConferenceCountByCategory = (): { [key: string]: number } => {
  const counts: { [key: string]: number } = {};
  conferences.forEach(conference => {
    counts[conference.category] = (counts[conference.category] || 0) + 1;
  });
  return counts;
};
