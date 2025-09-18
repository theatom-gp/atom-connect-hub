// Shared conference data for the application
// This file serves as a single source of truth for all conference information

// Speaker interface
export interface Speaker {
  name: string;
  title: string;
  organization: string;
  image: string;
}

// Basic interface for conference data used in Meetings page
export interface Conference {
  id: string;
  title: string;
  date: string;
  venue: string;
  location: string;
  image: string;
  description: string;
  category: string;
  abstractDeadline?: string;
  registrationDeadline?: string;
  notificationDeadline?: string;
  price?: number;
  speakers?: Speaker[];
  keywords?: string;
  duration?: string;
  attendees?: string;
}

// export const conferences: Conference[] = [
//   {
//     id: 'aisummit',
//     title: "AI Innovation Summit 2025",
//     date: "November 15-17, 2025",
//     venue: "Silicon Valley Convention Center",
//     location: "San Francisco, CA",
//     image: "aisummit/bg.avif",
//     description: "Join leading AI researchers, tech executives, and innovators as they unveil the future of artificial intelligence.",
//     category: "Technology",
//     abstractDeadline: "October 15, 2025",
//     registrationDeadline: "November 1, 2025",
//     notificationDeadline: "November 5, 2025",
    
//     // Extended conference data
//     heroSubtitle: "Advancing AI Through Innovation, Research and International Collaboration",
//     heroBadgeText: "AI • Research • Innovation",
//     conferenceOverview: "Advancing AI Through Innovation",
//     conferencepara1: "Join the most influential AI conference of 2025, where cutting-edge research meets practical applications. Connect with AI experts, explore breakthrough technologies, and discover solutions that will define the future of AI and innovation.",
//     conferencepara2: "From AI research and development to AI ethics and policy, this three-day immersive experience brings together leading AI experts, researchers, and professionals from across the globe to share insights, forge partnerships, and accelerate AI innovation.",
//     expertSpeakers: "150+",
//     sessions: "40+",
//     charipersonheader: "A Message from Our Conference Chair",
//     chairpersonpara1: "AI is the bridge between innovation and progress. The AI Innovation Summit 2025 represents a unique opportunity to witness the convergence of brilliant minds and revolutionary techniques in AI research and development.",
//     chairpersonpara2: "As we stand at the forefront of AI innovation, this conference serves as a catalyst for meaningful collaboration and groundbreaking discoveries. Join us in San Francisco as we explore the technologies and methodologies that will shape the future of AI and create lasting impact across the world.",
//     chairperson: "Dr. Carlos Mendes",
//     chairpersonDescription: "Conference Chair & Director of AI, University of California, San Francisco",
//     abstractkeytopics: [
//       "Machine Learning & Deep Learning",
//       "Natural Language Processing",
//       "Computer Vision & Robotics",
//       "AI Ethics & Governance",
//       "AI in Healthcare & Finance",
//       "Quantum AI & Future Technologies"
//     ],
//     speakerheader: "Learn from AI pioneers and thought leaders representing AI institutions across the globe.",
//     // Speakers
//     speakers: [
//       {
//         name: "Dr. Maria Santos",
//         title: "Chief AI Scientist, San Francisco Institute of Technology",
//         country: "Portugal",
//         image: "aisummit/speaker-1.jpg",
//         expertise: "AI Innovation",
//         biography: "Dr. Maria Santos is known as 'The AI Pioneer'. A title earned throughout her 15 years serving as the lead AI scientist for the Lisbon Crime Lab, where she has processed over 2,000 criminal cases and developed innovative AI extraction techniques. She has pioneered the use of next-generation sequencing in AI analysis and has been instrumental in solving numerous high-profile cases across Europe. Dr. Santos has published over 50 peer-reviewed papers on AI analysis and has trained over 200 AI scientists worldwide. She is a member of the European Network of AI Science Institutes and serves as a consultant for INTERPOL on AI analysis protocols."
//         },
//       {
//         name: "Prof. James Wilson",
//         title: "Director of AI Research, San Francisco Institute of Technology",
//         country: "United States",
//         image: "aisummit/speaker-2.jpg",
//         expertise: "AI Ethics",
//         biography: "Professor James Wilson is recognized as 'The AI Master'. With over 20 years of experience in cybersecurity and AI research, he has led investigations into major cybercrimes and has developed cutting-edge tools for AI evidence recovery. As Director of AI Research at San Francisco Institute of Technology, he has established one of the most advanced AI laboratories in the world. Professor Wilson has authored three textbooks on AI research and has trained law enforcement agencies in over 30 countries. He is a certified expert witness in AI research and has testified in numerous high-profile cybercrime cases."
//       },
//       {
//         name: "Dr. Elena Rodriguez",
//         title: "Senior AI Scientist, San Francisco Institute of Technology",
//         country: "United States",
//         image: "aisummit/speaker-3.jpg",
//         expertise: "AI Ethics",
//         biography: "Dr. Elena Rodriguez is acclaimed as 'The AI Research Expert'. She has conducted over 1,500 autopsies and has been instrumental in developing new protocols for AI research in the United States. Dr. Rodriguez specializes in trauma analysis and has worked on cases involving mass disasters, homicides, and suspicious deaths. She has published extensively on AI research techniques and has been a key figure in establishing international standards for AI research practice. Dr. Rodriguez serves on the editorial board of the Journal of AI Research and is a member of the International Association of AI Researchists."
//       },
//       {
//         name: "Prof. Hans Mueller",
//         title: "Head of AI Research, San Francisco Institute of Technology",
//         country: "United States",
//         image: "aisummit/speaker-4.jpg",
//         expertise: "AI Ethics",
//         biography: "Professor Hans Mueller is distinguished as 'The AI/ML Specialist'. With 25 years of experience in AI/ML research, he has analyzed over 3,000 cases involving drug-related deaths, poisonings, and substance abuse. Professor Mueller has developed innovative analytical methods for detecting novel psychoactive substances and has been at the forefront of research into emerging drug trends. He has published over 80 scientific papers and has received numerous awards for his contributions to AI/ML research. Professor Mueller is a member of the American Society of AI/ML Researchists and serves as a consultant for the European Monitoring Centre for Drugs and Drug Addiction."
//       },
//       {
//         name: "Dr. Sarah Johnson",
//         title: "AI Ethicist, San Francisco Institute of Technology",
//         country: "United States",
//         image: "aisummit/speaker-1.jpg",
//         expertise: "AI Ethics",
//         biography: "Dr. Sarah Johnson is renowned as 'The AI/ML Expert'. She has examined over 500 sets of human remains and has been instrumental in identifying victims of mass disasters and historical cases. Dr. Johnson specializes in age estimation, sex determination, and trauma analysis from skeletal remains. She has worked on cases ranging from archaeological discoveries to modern criminal investigations. Dr. Johnson has published extensively on AI/ML methods and has developed new techniques for analyzing fragmented remains. She is a fellow of the Royal Anthropological Institute and serves as a consultant for the International Commission on Missing Persons."
//       },
//       {
//         name: "Dr. Carlos Fernandez",
//         title: "AI Ethicist, San Francisco Institute of Technology",
//         country: "United States",
//         image: "aisummit/speaker-2.jpg",
//         expertise: "AI Ethics",
//         biography: "Dr. Carlos Fernandez is celebrated as 'The AI in Robotics Specialist'. He has used AI/ML evidence to solve over 200 criminal cases and has pioneered the use of DNA analysis in AI/ML research. Dr. Fernandez has developed databases of AI/ML species distribution across the Mediterranean region and has created new methods for estimating time of death using AI/ML development patterns. He has published over 40 papers on AI/ML research and has trained investigators in 15 countries. Dr. Fernandez is the founder of the Mediterranean AI/ML Research Network and serves as an expert witness in cases involving AI/ML evidence."
//       }
//     ],
    
//     // Venue images
//     venueImages: [
//       {
//         src: "aisummit/aisummit-venue.jpg",
//         alt: "AI Convention Center - Main Hall",
//         title: "Main Convention Hall"
//       },
//       {
//         src: "aisummit/conference.png",
//         alt: "Professional Conference Room Setup",
//         title: "Conference Rooms"
//       },
//       {
//         src: "aisummit/lobby.jpg",
//         alt: "Networking Area",
//         title: "Networking Spaces"
//       },
//       {
//         src: "aisummit/city.jpg",
//         alt: "AI Exhibition Hall",
//         title: "Exhibition Area"
//       }
//     ],
    
//     // Pricing tiers
//     pricingTiers: [
//       {
//         title: "Delegate/Listener",
//         subtitle: "(In-Person)",
//         price: 899,
//         features: [
//           "Entry to all session and workshops",
//           "Lunch & Coffee breaks",
//           "Conference schedule handout",
//           "Certificate of Attendance",
//           "E-Abstract Book"
//         ]
//       },
//       {
//         title: "Speaker",
//         subtitle: "(In-person)",
//         price: 799,
//         features: [
//           "Entry to all session and workshops",
//           "Lunch & Coffee breaks",
//           "Conference schedule handout",
//           "Certificate of Attendance",
//           "E-Abstract Book"
//         ]
//       },
//       {
//         title: "Student",
//         subtitle: "",
//         price: 549,
//         features: [
//           "Entry to all session and workshops",
//           "Lunch & Coffee breaks",
//           "Conference schedule handout",
//           "Certificate of Attendance",
//           "E-Abstract Book"
//         ]
//       },
//       {
//         title: "Virtual",
//         subtitle: "(Speaker/Delegate)",
//         price: 399,
//         features: [
//           "Conference recorded video access",
//           "Conference schedule handout",
//           "Certificate of Attendance",
//           "E-Abstract Book"
//         ]
//       }
//     ],
    
//     // Schedule
//     schedule: [
//       {
//         day: "Day 1",
//         date: "November 13, 2025",
//         sessions: [
//           { time: "08:00-09:30", activity: "Registrations & Introduction" },
//           { time: "09:30-11:30", activity: "Plenary Session" },
//           { time: "11:30-11:45", activity: "Networking Break" },
//           { time: "11:45-13:15", activity: "Keynote Session" },
//           { time: "13:15-14:00", activity: "Group Photo & Network Lunch" },
//           { time: "14:00-16:00", activity: "Keynote Session" },
//           { time: "16:00-16:15", activity: "Networking Break" },
//           { time: "16:15-18:00", activity: "AI Sessions" }
//         ]
//       },
//       {
//         day: "Day 2",
//         date: "November 14, 2025",
//         sessions: [
//           { time: "09:00-11:30", activity: "Plenary Session" },
//           { time: "11:30-11:45", activity: "Networking Break" },
//           { time: "11:45-13:45", activity: "AI Sessions" },
//           { time: "13:45-14:30", activity: "Networking Lunch Break" },
//           { time: "14:30-16:30", activity: "AI Sessions" },
//           { time: "16:30-16:45", activity: "Networking Break" },
//           { time: "16:45-18:30", activity: "AI Sessions" },
//           { time: "18:45-19:00", activity: "Certification" }
//         ]
//       },
//       {
//         day: "Day 3",
//         date: "November 15, 2025",
//         sessions: [
//           { time: "09:00-11:30", activity: "AI Sessions" },
//           { time: "11:30-11:45", activity: "Networking Break" },
//           { time: "11:45-13:45", activity: "AI Sessions" },
//           { time: "13:45-14:30", activity: "Networking Lunch Break" },
//           { time: "14:30-16:30", activity: "AI Sessions" },
//           { time: "16:30-16:45", activity: "Networking Break" },
//           { time: "16:45-18:30", activity: "AI Sessions" },
//           { time: "18:30-19:00", activity: "Closing Ceremony" }
//         ]
//       }
//     ],
    
//     // Publishing partners
//     publishingPartners: [
//       {
//         name: "AI International",
//         description: "Leading AI Journal",
//         logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/MDPI_logo.svg/320px-MDPI_logo.svg.png",
//         fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmNGY0ZjQiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Rm9yZW5zaWMgU2NpZW5jZTwvdGV4dD48L3N2Zz4="
//       },
//       {
//         name: "Journal of Forensic Sciences",
//         description: "Academic Forensic Research",
//         logo: "https://www.cambridgescholars.com/assets/img/logo.png",
//         fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmNGY0ZjQiLz48dGV4dCB4PSI1MCIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI4IiBmaWxsPSIjMzMzMzMzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Kb3VybmFsPC90ZXh0Pjx0ZXh0IHg9IjUwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmdW9udC1zaXplPSI4IiBmaWxsPSIjMzMzMzMzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Gb3JlbnNpYyBTY2llbmNlczwvdGV4dD48L3N2Zz4="
//       },
//       {
//         name: "AI Review",
//         description: "AI Research Database",
//         logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Scopus_logo.svg/320px-Scopus_logo.svg.png",
//         fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRjZGMDAiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvcmVuc2ljIFJldmlldzwvdGV4dD48L3N2Zz4="
//       },
//       {
//         name: "AI Review",
//         description: "AI Research Database",
//         logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Scopus_logo.svg/320px-Scopus_logo.svg.png",
//         fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRjZGMDAiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvcmVuc2ljIFJldmlldzwvdGV4dD48L3N2Zz4="
//       },
//       {
//         name: "AI Review",
//         description: "AI Research Database",
//         logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Scopus_logo.svg/320px-Scopus_logo.svg.png",
//         fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRjZGMDAiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvcmVuc2ljIFJldmlldzwvdGV4dD48L3N2Zz4="
//       }
//     ],
//     // Media partners
//     mediaPartners: [
//       { 
//         name: "Biomaterials Today", 
//         description: "Biomaterials Research Publication", 
//         logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/TechCrunch_logo.svg",
//         fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiMwMENGNjQiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvcmVuc2ljIE1hZzwvdGV4dD48L3N2Zz4="
//       },
//       { 
//         name: "Biomaterials Today", 
//         description: "Biomaterials Research Publication", 
//         logo: "https://www.technologyreview.com/wp-content/uploads/2020/02/mit-logo-2020-web.png",
//         fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNBMzE2MjEiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNTSTwvdGV4dD48L3N2Zz4="
//       },
//       { 
//         name: "Biomaterials Today", 
//         description: "Biomaterials Research Publication", 
//         logo: "https://spectrum.ieee.org/media/logo/IEEE-spectrum-logo.svg",
//         fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiMwMDU1RkYiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvcmVuc2ljIFRvZGF5PC90ZXh0Pjwvc3ZnPg=="
//       },
//       { 
//         name: "Biomaterials Today", 
//         description: "Biomaterials Research Publication", 
//         logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Wired_logo.svg",
//         fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHRleHQgeD0iNTAiIHk9IjI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMwMDAwMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxlZ2FsIE1lZGljaW5lPC90ZXh0Pjwvc3ZnPg=="
//       },
//       { 
//         name: "Biomaterials Research Network", 
//         description: "Biomaterials Research News", 
//         logo: "https://venturebeat.com/wp-content/uploads/2020/06/VB_logo_2020.png",
//         fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRjI0MDAiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvcmVuc2ljIFJlc2VhcmNoPC90ZXh0Pjwvc3ZnPg=="
//       },
//       { 
//         name: "Biomaterials Today", 
//         description: "Biomaterials Research Publication", 
//         logo: "https://spectrum.ieee.org/media/logo/IEEE-spectrum-logo.svg",
//         fallbackLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiMwMDU1RkYiLz48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvcmVuc2ljIFRvZGF5PC90ZXh0Pjwvc3ZnPg=="
//       }
//     ]
//   },

export const conferences = [
  {
    id: 'aisummit',
    title: "AI Innovation Summit 2025",
    date: "November 15-17, 2025",
    venue: "Silicon Valley Convention Center",
    location: "San Francisco, CA",
    image: "aisummit/bg.avif",
    description: "Join leading AI researchers, tech executives, and innovators as they unveil the future of artificial intelligence.",
    category: "Technology",
    abstractDeadline: "October 15, 2025",
    registrationDeadline: "November 1, 2025",
    notificationDeadline: "November 5, 2025"
  },

  {
    id: 'forensicscience',
    title: "Global Congress on Forensic Science and Research",
    date: "November 22-24, 2025",
    venue: "Academic Excellence Center",
    location: "Lisbon, Portugal",
    image: "forensicscience/bg.jpeg",
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
    image: "powerandenergy/bg.jpeg",
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
    image: "quantumcomputing/bg.jpg",
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
    image: "globalhealthcarerevolution/bg.jpg",
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
    image: "biomaterials/bg.jpeg",
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
    image: "conference-ai.jpg",
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
    image: "surgeryandanesthesia/bg.jpeg",
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
    image: "neurology/bg.jpeg",
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
    image: "conference-sustainability.jpg",
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

// Get conference with extended data (for detailed pages)
export const getConferenceWithDetails = (id: string): Conference | undefined => {
  return getConferenceById(id);
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
