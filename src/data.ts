import { WorkExperience, Education, SkillCategory, ProjectShowcase, Achievement } from "./types";

export const profileSummary = {
  name: "Sophorn Lim",
  title: "IT Lead & Data Systems Specialist",
  tagline: "Turning complex data into clear decisions.",
  aboutBrief: "I am a Cambodian IT and Data Management professional with over two decades of experience spanning health information systems, geospatial analysis, full-stack development, and humanitarian project management.",
  aboutFull: [
    "Over my 20-year career across the Greater Mekong Subregion, I have bridged the gap between information technology, geospatial intelligence, and public health systems.",
    "From training computer networks in Siem Reap to managing WHO's Mekong Malaria Elimination surveillance systems across six countries, I build secure databases, custom DHIS2 platforms, mobile apps, and ArcGIS dashboards that support life-saving decision making.",
    "My background blends deep technical expertise (network administration, systems architecture, full-stack development, and database mapping) with hands-on field operations leadership, managing international teams and building national capacity."
  ],
  nationality: "Cambodian",
  basedIn: "Phnom Penh, Cambodia (Origin: Kampong Thom Province)",
  languages: [
    { name: "Khmer", level: "Native / Mother Tongue", percent: 100 },
    { name: "English", level: "Proficient — Read, Write, Speak", percent: 80 }
  ],
  contact: {
    emails: ["sophornlimnpa@gmail.com"],
    phones: ["069 767 696", "012 964 495", "0717 111 007"],
    location: "Phnom Penh, Cambodia",
    references: [
      {
        name: "Mr. IENG Vanra",
        title: "Technical Officer, Information System & Surveillance",
        org: "WHO Health Emergencies (WHE), Cambodia",
        tel: "+855 12 905 530",
        email: "iengv@who.int"
      },
      {
        name: "Mr. TRY Rady",
        title: "Technical Officer, Database Manager",
        org: "WHO Mekong Malaria Elimination (MME), Cambodia",
        tel: "+855 17 891 415",
        email: "tryr@who.int"
      },
      {
        name: "Mr. NOU Panharith",
        title: "Emergency Operations Center Project Manager",
        org: "PSI Cambodia",
        tel: "+855 12 662 268",
        email: "npanharith@psi.org.kh"
      }
    ]
  }
};

export const workExperiences: WorkExperience[] = [
  {
    id: "who-mme-2025",
    period: "Jan – Nov 2025",
    organization: "World Health Organization (WHO)",
    role: "National Consultant – Mekong Malaria Elimination",
    location: "Phnom Penh, Cambodia",
    badge: "WHO MME",
    description: [
      "Support surveillance data collection, analysis, and interpretation in Greater Mekong Subregion (GMS)/country level and working on report development and customization in Malaria Elimination Database (MEDB) on DHIS2 and countries' surveillance systems to support accelerating malaria elimination.",
      "Do data analyses including data analyses on GIS maps and update on presentations, bulletins, monthly/quarterly epidemiology summary, monthly MME’s update, other analyses requested by National Malaria Control Programmes (NMCPs), Regional Steering Committee (RSC), Independent Monitoring Panel (IMP), donors, etc.",
      "Import data and update existing GMS country dashboards on Malaria Elimination Database (MEDB), District Health Information Software 2 (DHIS2).",
      "Interpret data, analysis results using statistical techniques and provide ongoing reports.",
      "Develop HTML report/App in MEDB, DHIS2 and other countries’ surveillance systems.",
      "Support development of mobile application to connect with MEDB and other countries’ surveillance systems.",
      "Generate reports with required data for presentations/meetings.",
      "Support in other ad hoc tasks i.e. GPS coordinates collection from the field and some other ad hoc analyses."
    ],
    tags: ["Surveillance Systems", "DHIS2", "GIS Mapping", "MEDB Database", "Mekong Health Initiative"]
  },
  {
    id: "who-data-2021",
    period: "Sep 2021 – Dec 2024",
    organization: "World Health Organization (WHO)",
    role: "Data Management Officer",
    location: "Phnom Penh, Cambodia",
    badge: "WHO Officer",
    description: [
      "Coordinate and work with the data management team at the CDC department to ensure data are entered and cleaned into Go.Data Platform.",
      "Support the Department of Planning and Health Information (DPHI) in Developing a Health Financing System on DHIS2.",
      "Support MoH to develop a Human Resource Information System on DHIS2 to track and capture all Moh Information Staff.",
      "Support CDC/Surveillance teams to develop tracker capture for the Hepatitis Surveillance system on the DHIS2 system to track and capture Hepatitis data for all health facilities in Cambodia.",
      "Support CDC/ Surveillance teams to develop tracker capture for the Rabies Surveillance system on DHIS2 to collect and capture Rabie data.",
      "Support the Department of Planning and Health Information (DPHI) in Developing a full map of all Health Facilities in Cambodia using ArcGIS.",
      "Provide technical assistance to the CDC Department to strengthen the collection of laboratory data from different laboratories and stores in Go.Data.",
      "Provide technical support to the surveillance and contact tracing team to extract and analyze data as requested.",
      "Develop training materials related to Go.Data and CamLIS and provide training to national and sub-national rapid response teams as needed.",
      "Develop a Mobile App to support the teams in collecting all relevant data from the field.",
      "Develop and produce a dashboard for all COVID-19 data for any request.",
      "Conduct quality assurance and quality control for all data as daily before uploading into the system.",
      "Support the CDC department and teams with all issues regarding Information Technology problems.",
      "Any other activities assigned by WHO and CDC department."
    ],
    tags: ["WHO Go.Data", "ArcGIS Map", "Epidemiology Tracking", "CamLIS", "Rapid Response Training"]
  },
  {
    id: "npa-pm-2016",
    period: "Nov 2016 – Aug 2021",
    organization: "Norwegian People's Aid (NPA)",
    role: "Project Manager",
    location: "Ratanakiri, Cambodia",
    badge: "Humanitarian PM",
    description: [
      "Daily follow-up the development and monitoring of survey teams. This shall include the NPA office support staff.",
      "Provide ongoing support to field operations, aimed towards strengthening the organizational capacity to implement survey, clearance, use of EDD, EOD operations and training.",
      "Development of work plans and organization procedures, according to SOP.",
      "Assist ops in the preparation of progress reports, case studies and other documents.",
      "Assist Ops in the continued development and documentation of the SOP with a special focus on IA, LR, CMRS and EDD procedures.",
      "Ensure that monitoring and quality assurance systems are in place and conducted/updated in a regular manner.",
      "Ensure that project requirements for productivity, efficiency and relevance are met. This includes: Follow up work progress according to the planned activities and expected outputs, Monthly conduct monitoring, Suggest necessary training, Follow up on reporting requirements.",
      "Ensure accountability and transparency principles are upheld in all implement activities.",
      "Ensure that management and support staff are focused on the survey (NTS and CMRS) and in the continual qualitative analysis of land release and survey operations and managerial activities in all CMRS teams to promote best practices and continually feed in the capacity building process.",
      "Ensure that appropriate QA systems of survey/clearance and EDD are in place and conducted in a functioning and proactive manner.",
      "Monitor and correct field operations to ensure a high standard of work is maintained.",
      "Keep monitoring and training records updated on all operations at the field level.",
      "Contribute to the assessment of the cost-effectiveness, impact and relevance of the field operations.",
      "Prepare monitoring reports on operation findings including lessons learnt and documented analysis and recommendations for improvement.",
      "Over time follow up and supervise continued capacity building, selection, training, SOP and operational accreditation of new NPA multi-skilled teams.",
      "Prepare detailed training plans with ops and follow up on all training activity in NPA HD RTK.",
      "Carry out other relevant tasks as required by the supervisor."
    ],
    tags: ["Operations Leadership", "Humanitarian Demining", "Survey123", "IMSMA Database", "SharePoint"]
  },
  {
    id: "npa-imo-2015",
    period: "Oct 2015 – Oct 2016",
    organization: "Norwegian People's Aid (NPA)",
    role: "Information Management Officer",
    location: "Ratanakiri, Cambodia",
    badge: "NPA GIS Lead",
    description: [
      "Coordinate with CMAC database staff on information management and quality control of available data.",
      "Mentoring and assist CMAC DBU when required.",
      "Co-ordinate and summarizing of programme operational data (survey/clearance).",
      "Presenting information in easy to comprehensive maps, tables, charts and presentations based on requirement of the PM.",
      "Prepare figures and submit monthly progress reports to NPA Head office through SharePoint.",
      "Maintain and strictly follow up a schedule of the updated data-set within NPA program.",
      "Provide support and guidance on usage of the data and updated data-set to the external stakeholders, if it has been approved by PM.",
      "Work with IM assistant on information management and quality control of available data at CMAC DU5 USDOS Project and Ratanakiri.",
      "Produce a good quality of map using ArcGIS desktop to update all operation progress from the field and display in the office.",
      "Develop field data collection tool using Survey123 to collect all result from the field via mobile phone and conduct data quality check every update on ArcGIS online through feature layer.",
      "Develop operational dashboard using ArcGIS online dashboard for the Senior management to track all progress update from the field.",
      "Provide training to field staff on basic computer, ArcGIS, GPS, Map Reading, compass, google earth, internet, email and other reporting system.",
      "Mentoring and assist IM Assistant when required.",
      "Co-ordinate and summarizing of programme operational data (survey/clearance).",
      "Presenting information in easy to comprehensive maps, tables, charts and presentations based on requirement of the PM.",
      "Prepare figures and submit monthly progress reports to NPA Head office through SharePoint.",
      "Maintain and strictly follow up a schedule of the updated data-set within NPA program.",
      "Provide support and guidance on usage of the data and updated data-set to the external stakeholders, if it has been approved by PM.",
      "Provide training and advisory services for IM.",
      "Coordinator between CMAA capacity building to NPA to make sure that the project will followed the agreed proposal and expected output.",
      "Report to PM about the implementation, progress, problems…",
      "Manage the overall delivery of the Information and IT services in an effective and efficient manner and working closely with the RIMA.",
      "Any other relevant tasks assigned to by PM and RIMA."
    ],
    tags: ["ArcGIS Desktop", "Cartography", "Staff Training", "GPS Navigation", "Mobile Field Reporting"]
  },
  {
    id: "npa-ima-2014",
    period: "Nov 2014 – Oct 2015",
    organization: "Norwegian People's Aid (NPA)",
    role: "Information Management Assistant",
    location: "Ratanakiri, Cambodia",
    badge: "Information QA",
    description: [
      "Coordinate with CMAC database staff on information management and quality control of available data.",
      "Mentoring and assist CMAC DBU when required.",
      "Co-ordinate and summarizing of programme operational data (survey/clearance).",
      "Presenting information in easy to comprehensive maps, tables, charts and presentations based on requirement of the PM.",
      "Prepare figures and submit monthly progress reports to NPA Head office through SharePoint.",
      "Maintain and strictly follow up a schedule of the updated data-set within NPA program.",
      "Provide support and guidance on usage of the data and updated data-set to the external stakeholders, if it has been approved by PM.",
      "Work with IM assistant on information management and data quality control at CMAC DU5 USDOS Project and Ratanakiri.",
      "Provide training to field staff on basic computer, GPS, Map Reading, compass, google earth, internet, email and other reporting system."
    ],
    tags: ["Data Auditing", "Quality Assurance", "CMAC Coordination", "SharePoint Management"]
  },
  {
    id: "bgp-po-2012",
    period: "Feb 2012 – Oct 2014",
    organization: "BGP Gas and Oil Explorer",
    role: "Project Officer",
    location: "Kampong Thom, Cambodia",
    badge: "Field Operations",
    description: [
      "Daily data entry and compile monthly report submit to supervisor.",
      "Daily worker attendant supervision and report to supervisor.",
      "Collect report from day to day from workers with review and develop report.",
      "English translation when Chinese Supervisor needed during in office and field work.",
      "Check and Control all Equipment that provide to all labor during working time.",
      "Computer Maintenance and Network Control in office.",
      "Ensure safety's equipment must be wear correctly with all workers during working time."
    ],
    tags: ["Technical Logistics", "Network Maintenance", "Asset Tracking", "Cross-cultural Translation"]
  },
  {
    id: "camict-instructor-2010",
    period: "Jan 2010 – Jan 2012",
    organization: "CamICT Solution Institute",
    role: "Computer Network Administration Instructor",
    location: "Siem Reap, Cambodia",
    badge: "Academic IT",
    description: [
      "Develop operational teaching plan.",
      "Monitoring daily student attendant.",
      "Prepare home work for student everyday.",
      "Organize weekly examination.",
      "Conduct student real practice in lab every week.",
      "Coordinate and cooperate with the academic office to organize mid-term and final Examination.",
      "Control all website project, network and computer maintenance.",
      "Customer relationship for new project.",
      "Set up team work for support all customer with maintenance service.",
      "Lead the team for Project Design, data base analyze, implementation and coding.",
      "Coordinate with team for meeting for new computer network project."
    ],
    tags: ["CCNA Network Prep", "Linux/UNIX Admin", "Database Consulting", "Curriculum Design"]
  },
  {
    id: "solution-pda-2007",
    period: "Jan 2007 – Dec 2009",
    organization: "Solution for Personalize Digital Assistant",
    role: "IT Service Coordinator",
    location: "Siem Reap, Cambodia",
    badge: "IT Service Lead",
    description: [
      "Check Attendant and Report to Manager.",
      "Set up Technician for Standby all client places.",
      "Set up Technician for help and support with new customer.",
      "Make appointment with new customer for New IT Services.",
      "Find out for new technology and new product for Support to customer on Future.",
      "Training for new technology and provide support to customer.",
      "Resolve and fix problem as soon as possible when customer needed.",
      "Weekly and Monthly Report to Supervisor.",
      "Conduct weekly meeting for all challenges and find solution."
    ],
    tags: ["Service Coordination", "IT Support Dispatch", "Corporate SLA Management", "Technical Training"]
  },
  {
    id: "world-bridge-2005",
    period: "Feb 2005 – Dec 2006",
    organization: "World Bridge International School",
    role: "IT Technician and Logistic Controller",
    location: "Siem Reap, Cambodia",
    badge: "IT & Logistics",
    description: [
      "Daily Check and Control Student Attendant.",
      "Check and control Stock and Library System.",
      "Check and control Student enroll and Payment System.",
      "Teaching Microsoft Office (Word, Excel, Power Point, Access).",
      "Call inform and alert email to student’s parent about absents.",
      "Data Entry and control new student register in system every day.",
      "Make Weekly and monthly Report to Academic Manager.",
      "Monthly Report meeting.",
      "Weekly and monthly report all equipment.",
      "Prepare and Maintenance for all computer network system.",
      "Update and control website and email."
    ],
    tags: ["Network Support", "Systems Administration", "Inventory Management", "Microsoft Office Instruction"]
  },
  {
    id: "bamboo-shoot-2004",
    period: "Mar 2004 – Dec 2005",
    organization: "Bamboo Shoot Foundation",
    role: "Teacher of Computer Administrator",
    location: "Siem Reap, Cambodia",
    badge: "Community IT",
    description: [
      "Teaching Microsoft Office (Word, Excel, Power Point, Access).",
      "Prepare the book for Teaching.",
      "Manage and Control Data on Server.",
      "Make Exam Test and Home work.",
      "Help and support for Technical during working time.",
      "Prepare and Maintenance all computer network system."
    ],
    tags: ["Computing Basics", "Server Management", "Syllabus Creation", "Computer Network Maintenance"]
  }
];

export const educationList: Education[] = [
  {
    id: "bbu-msc-current",
    period: "2025 – Present",
    degree: "Master of Science in Information Technology (M.Sc. IT)",
    institution: "Build Bright University · Phnom Penh"
  },
  {
    id: "bbu-bsc-2011",
    period: "2007 – 2011",
    degree: "Bachelor of Science in Information Technology (B.Sc. IT)",
    institution: "Build Bright University · Siem Reap"
  },
  {
    id: "high-school-2003",
    period: "2001 – 2003",
    degree: "Baccalaureate — Grade 12",
    institution: "Kampong Thom High School · Kampong Thom"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Health Information Systems",
    icon: "🏥",
    items: [
      "DHIS2 Tracker & Analytics",
      "WHO Go.Data Platform",
      "MEDB Database Implementation",
      "Epidemiological Surveillance Dashboards",
      "Point-of-Entry Tracking Architecture"
    ]
  },
  {
    category: "Geospatial & Field Data",
    icon: "🗺️",
    items: [
      "ArcGIS Desktop & ArcGIS Pro",
      "ArcGIS Online & StoryMaps",
      "QGIS Analysis & Custom Plugins",
      "Survey123 / Tracker Forms Creation",
      "GPS Navigation & UAV Drone Mapping"
    ]
  },
  {
    category: "Software Development",
    icon: "💻",
    items: [
      "Full-stack Web Dev (HTML/CSS/JS)",
      "Database Modeling & SQL Queries",
      "API Integration & Custom Proxies",
      "Mobile Field Apps Development",
      "AI-Assisted Fast Prototyping"
    ]
  },
  {
    category: "IT Infrastructure",
    icon: "🌐",
    items: [
      "CCNA 2 Cisco Network Engineering",
      "Cisco Router & Switch Configuration",
      "Active Directory & Linux Servers",
      "MS SharePoint Administration",
      "Network Cabling & Technical Security"
    ]
  },
  {
    category: "Field Data Collection",
    icon: "📊",
    items: [
      "Kobo Toolbox Integration",
      "Epicollect5 Deployment",
      "Google & Microsoft Forms Design",
      "Quality Assurance (QA/QC) Pipelines",
      "Automated Excel Spreadsheet Modelling"
    ]
  },
  {
    category: "Leadership & Strategy",
    icon: "🤝",
    items: [
      "Technical Project Management",
      "SOP Development & Audit Trails",
      "Stakeholder Representation (WHO/NPA)",
      "Multi-country Resource Management",
      "Bilingual Technical Instruction"
    ]
  }
];

export const certifications = [
  "CISCO CCNA2 – Network Engineering",
  "Microsoft SharePoint Management",
  "Full Stack Web Development",
  "Mobile App Development (AI-powered)",
  "ArcGIS – Geographic Information Systems",
  "QGIS – Open Source GIS",
  "Advanced Drone Operation & Mapping",
  "Terrain & Imagery Spatial Analysis",
  "Operational Efficiency Management",
  "Leadership Development Programs",
  "General English – Academic Level IV",
  "Data Visualization & Executive Dashboards"
];

export const operationalMilestones: ProjectShowcase[] = [
  {
    id: "milestone-1",
    title: "Mekong Malaria Surveillance Integration (DHIS2)",
    description: "Successfully oversaw integration workflows linking national systems across 6 countries in the subregion to unify epidemiological surveillance indicators.",
    tags: ["WHO", "DHIS2", "Surveillance"],
    metric: "6",
    metricLabel: "GMS Countries Connected"
  },
  {
    id: "milestone-2",
    title: "Cambodia ArcGIS Health Facility Mapping",
    description: "Built and finalized a digital map pinpointing healthcare locations, clinics, and resources across the country for public spatial querying.",
    tags: ["WHO", "ArcGIS", "Cartography"],
    metric: "Web Map",
    metricLabel: "Interactive Dashboard"
  },
  {
    id: "milestone-3",
    title: "Humanitarian Safe-Land Releasing (NPA)",
    description: "Spearheaded survey operations and real-time mapping dashboards to coordinate land clearing, transferring safe land back to agrarian communities.",
    tags: ["NPA", "Survey123", "IMSMA"],
    metric: "Real-time",
    metricLabel: "Survey Dispatch Tracking"
  },
  {
    id: "milestone-4",
    title: "Outbreak Tracking via WHO's Go.Data",
    description: "Launched mobile field contact tracing forms and deployed instant dashboard indicators to train sub-national field epidemiology response groups.",
    tags: ["WHO", "Go.Data", "RRT"],
    metric: "Rapid Response",
    metricLabel: "Outbreak Deployed Engine"
  }
];

export const achievements: Achievement[] = [
  {
    id: "advance-pos",
    title: "Advance Point Of Sale — Neary Khmer Restaurant",
    description: "A comprehensive point-of-sale system built for Neary Khmer Restaurant in Siem Reap to manage sales, inventory, products, warehouses, and multi-language support. Features real-time reporting dashboards and role-based access control.",
    images: [
      "/assets/images/Advance POS/Dashboard.png",
      "/assets/images/Advance POS/POS.png",
      "/assets/images/Advance POS/Products.png",
      "/assets/images/Advance POS/Warehouse.png",
      "/assets/images/Advance POS/Menu.png",
      "/assets/images/Advance POS/Sale Report.png",
      "/assets/images/Advance POS/Product Report.png",
      "/assets/images/Advance POS/Translate.png",
      "/assets/images/Advance POS/Login.png"
    ],
    techStack: ["React", "TypeScript", "Express", "PostgreSQL", "Tailwind CSS"],
    link: "http://178.128.120.38/login"
  },
  {
    id: "hrm-afd",
    title: "Human Resource Management System — Action for Development",
    description: "A full-featured HRM system built for Action for Development organization in Kampong Thom Province to manage and control projects, program activities, staff records, performance reviews, payroll, and asset management.",
    images: [
      "/assets/images/Human Resource Management/Dashboard.png",
      "/assets/images/Human Resource Management/Employee.png",
      "/assets/images/Human Resource Management/Performance.png",
      "/assets/images/Human Resource Management/Reports.png",
      "/assets/images/Human Resource Management/Login.png"
    ],
    techStack: ["React", "TypeScript", "Express", "PostgreSQL", "Tailwind CSS"],
    link: "http://162.0.228.121/hrm"
  },
  {
    id: "barcode-generator",
    title: "Barcode Generator System — Fish Farm",
    description: "Built for a fish farm in Battambang to generate barcodes with fish name, weight, price, and expiry date for each fish before delivery to supermarkets.",
    images: [
      "/assets/images/Barcode Generator/Login.png",
      "/assets/images/Barcode Generator/New Fish.png",
      "/assets/images/Barcode Generator/Barcode printing.png",
      "/assets/images/Barcode Generator/Generated barcode.png",
      "/assets/images/Barcode Generator/Report.png",
      "/assets/images/Barcode Generator/User Permission.png",
      "/assets/images/Barcode Generator/App Branding.png"
    ],
    techStack: ["React", "TypeScript", "Express", "PostgreSQL", "Tailwind CSS"],
    link: "http://localhost:5173/permissions"
  },
  {
    id: "romdoul-hotel",
    title: "Romdoul Hotel Management System",
    description: "A large-scale 5-star hotel management system built for a premier hotel in Phnom Penh. Features a landing page website for guest registration and direct booking, a web admin panel to manage/control all website content (text, photos, layout), and a main admin panel to manage the entire hotel system end-to-end. Currently 45% complete with an estimated 8 months remaining to full deployment.",
    images: [
      "/assets/images/Romdoul Hotel Management/Overview Dashboard.png",
      "/assets/images/Romdoul Hotel Management/Operational Dashboard.png",
      "/assets/images/Romdoul Hotel Management/Occupancy.png",
      "/assets/images/Romdoul Hotel Management/Website.png"
    ],
    techStack: ["React", "TypeScript", "Express", "PostgreSQL", "Tailwind CSS"],
    link: "http://localhost:5173/admin/dashboard/dashboard1"
  },
  {
    id: "meal-system",
    title: "DHIS2: MEAL System — Project Activity Management",
    description: "A Monitoring, Evaluation, Accountability, and Learning system built on DHIS2 platform to manage and control all project activities in the field. Designed for a development organization operating in Preah Vihear, Kampong Cham, and Kampong Thom provinces. Includes an external data entry app for easier data entry compared to the default DHIS2 app. Manages participation from NGO staff, donors, government staff, and community members.",
    images: [
      "/assets/images/MEAL System/Dashboard.png",
      "/assets/images/MEAL System/Data Entry.png",
      "/assets/images/MEAL System/Data Entry App.png"
    ],
    techStack: ["React", "Java", "Spring Boot", "PostgreSQL", "DHIS2"],
    link: "http://162.0.228.121:8080/apps/dashboard#/"
  },
  {
    id: "smart-pos",
    title: "Smart POS — Restaurant Management Mobile App",
    description: "A mobile point-of-sale system for large restaurant operations. Manages sales, order operations, kitchen screen, bartender screen, sold product tracking, inventory transactions, reporting, and invoice printing directly from a mobile device. Built with React Native for cross-platform deployment.",
    images: [
      "/assets/images/Smart POS/Login.png",
      "/assets/images/Smart POS/Main Menu.png",
      "/assets/images/Smart POS/Food.png",
      "/assets/images/Smart POS/Food Category.png",
      "/assets/images/Smart POS/Food Subcategory.png",
      "/assets/images/Smart POS/Table Management.png",
      "/assets/images/Smart POS/Inventory.png",
      "/assets/images/Smart POS/Sold Record.png",
      "/assets/images/Smart POS/Invoice Checkout.png",
      "/assets/images/Smart POS/Invoice Payment.png",
      "/assets/images/Smart POS/Print Invoice.png",
      "/assets/images/Smart POS/Report.png",
      "/assets/images/Smart POS/Setting.png"
    ],
    techStack: ["React Native", "Node JS", "Tailwind", "PostgreSQL"],
    link: ""
  },
  {
    id: "arcgis-health-map",
    title: "Health Financing — DHIS2 Government Funding Management",
    description: "Developed on the DHIS2 platform to support the Department of Planning and Health Information at the Ministry of Health. Manages and controls government funding including daily, monthly, and yearly income from each health facility, expenses, and payments.",
    images: [
      "/assets/images/Health Financing/Case Report.png",
      "/assets/images/Health Financing/Data Entry.png",
      "/assets/images/Health Financing/Report.png"
    ],
    techStack: ["DHIS2", "React", "Java", "PostgreSQL"],
    link: ""
  },
  {
    id: "field-data-app",
    title: "Geographic Data — Health Facility GIS Mapping",
    description: "Supported the Ministry of Health under WHO funding to collect and map all health facility locations across the entire country. Produced a comprehensive GIS map published on Google Maps to support the health coverage plan project of the Ministry of Health.",
    images: [
      "/assets/images/Geographic Data/BanteayMeanchey.jpg",
      "/assets/images/Geographic Data/Battambang.jpg",
      "/assets/images/Geographic Data/Kampong Cham.jpg",
      "/assets/images/Geographic Data/OD Area.jpg",
      "/assets/images/Geographic Data/Phnom Penh.jpg",
      "/assets/images/Geographic Data/Siem Reap.jpg"
    ],
    techStack: ["ArcGIS", "QGIS", "Google Maps"],
    link: ""
  }
];

// Rich curriculum guidelines & sample Q&As to prompt the AI on Sophorn's CV
export const PROMPT_KNOWLEDGE_BASE = `
SOPHORN LIM PORTFOLIO RESUME KNOWLEDGE BASE:

Profile Summary:
- Name: Sophorn Lim
- Title: IT Lead & Data Systems Specialist
- Subheading: Over 2 decades of professional experience bridging information technology, geospatial systems, and public health across Southeast Asia.
- Long Bio: Over 20 years of experience starting as an IT Coordinator and Computer Network Instructor. Progressed into geospatial information management for landmine clearance under Norwegian People's Aid (NPA) in Ratanakiri. Subsequently worked in WHO Cambodia as a Data Management Officer and National Consultant for Mekong Malaria Elimination across 6 Greater Mekong Subregion (GMS) nations (Cambodia, China, Lao PDR, Myanmar, Thailand, Vietnam).

Skills Breakdown:
- Health Information Systems: DHIS2 (Tracker, Dashboards, Mobile), WHO Go.Data Outbreak platform, MEDB Database, Point-of-Entry indicators.
- Geospatial Tech: ArcGIS (Desktop, Pro, Online, StoryMaps), QGIS, Survey123, GPS receiver arrays, UAV Drones (terrain modelling).
- Software Engineering: HTML, CSS, JavaScript, SQLite, PostreSQL, mobile app prototyping, custom API links.
- IT Infrastructure: CISCO Router configuration, active directory servers, MS SharePoint automation, network administration.
- Field Data Acquisition: Kobo Toolbox, Epicollect5, quality assurance controls.
- Leadership: Project operations, cross-border multi-stakeholder representation.

Certifications:
- CISCO CCNA2
- Advanced Drone Aerial Mapping
- ESRI ArcGIS & QGIS Analytics 
- Microsoft SharePoint Management
- English Literacy Level IV Academic
- Operational Efficiency Program

History Timeline:
- Jan - Nov 2025: WHO National Consultant - Greater Mekong Subregion Malaria Tracker and DHIS2/MEDB integration.
- Sep 2021 - Dec 2024: WHO Data Management Officer - Hepatitis and Rabies DHIS2 trackers, nation-wide ArcGIS facility mapping, COVID-19 Go.Data contact logs, and RRT capacity training.
- Nov 2016 - Aug 2021: Norwegian People's Aid (NPA) Humanitarian Disarmament Project Manager - Directed clearance operations in Ratanakiri province, deployed Survey123 + ArcGIS dashboards, governed CMAC QA/QC, managed SharePoint systems.
- Oct 2015 - Oct 2016: NPA Information Management Officer - Generated maps, Survey123 collection setups, training field teams.
- Nov 2014 - Oct 2015: NPA Information Assistant - Field records validation against CMAC database, SharePoint metrics updating.
- Feb 2012 - Oct 2014: BGP Gas & Oil Explorer Project Officer - Site logistics, network administration in the field, multilanguage Chinese/Khmer/English.
- Jan 2010 - Jan 2012: CamICT Siem Reap Network Instructor - Classes on switching, routing, subnets, database coding and customer network consulting.
- Jan 2007 - Dec 2009: Solution for Personalize Digital Assistant IT Service Coordinator - Scheduling standby technicians, research, corporate support, and SLA reporting.
- Feb 2005 - Dec 2006: World Bridge International School IT Technician & Logistics Controller - Network cabling, student database logs, stock systems, and MS Office teaching.
- Mar 2004 - Dec 2005: Bamboo Shoot Foundation Computer Administrator & Instructor - Hardware server support, textbook drafting, student database maintenance, and computing basics lessons.

Education:
- 2025 - Present: Master of Science in IT, Build Bright University Phnom Penh.
- 2007 - 2011: Bachelor of Science in IT, Build Bright University Siem Reap.
- 2001 - 2003: Baccalaureate Grade 12, Kampong Thom High School.
`;

export const coverLetterData = {
  date: "26 May 2026",
  recipientName: "Hiring Manager",
  recipientOrg: "Cambodia Development Resource Institute",
  recipientAddress: "Phnom Penh, Cambodia",
  subject: "IT System and Support Officer",
  salutation: "Dear Hiring Manager,",
  paragraphs: [
    "I am writing to express my strong interest in the IT System and Support Officer position at Cambodia Development Resource Institute, as advertised on LinkedIn. With over 20 years of progressive experience in IT infrastructure, data management, geospatial systems, and full-stack development across public health and humanitarian sectors, I am confident in my ability to deliver meaningful technical leadership for your regional operations.",
    "Data Management & Analytical Expertise:\nMost recently, as a National Consultant with the World Health Organization supporting Greater Mekong Subregion countries — including Cambodia, Lao PDR, Myanmar, Thailand, and Vietnam — I led the validation, analysis, and interpretation of malaria surveillance data through DHIS2 platforms. I developed HTML-based reports and mobile applications integrated with the Malaria Elimination Database (MEDB), and produced epidemiological summaries for national programs, regional steering committees, and international donors. In my preceding role as Data Management Officer at WHO, I built end-to-end digital surveillance systems for Hepatitis and Rabies on DHIS2, developed a comprehensive ArcGIS health facility map for Cambodia, and managed daily data quality assurance across national health datasets.",
    "Project Leadership & Field Operations:\nAt Norwegian People's Aid (NPA), I served as Project Manager for the Humanitarian Disarmament Project in Ratanakiri Province, overseeing field survey teams, developing SOPs, and ensuring rigorous quality assurance across all operations. I designed and deployed ArcGIS Online dashboards, Survey123 tools, and GPS-integrated workflows that enabled real-time field data tracking and senior management reporting. My experience managing cross-functional teams and coordinating with national authorities has sharpened my ability to lead in complex, multi-stakeholder environments.",
    "Technical Proficiency:\nMy technical toolkit includes DHIS2, ArcGIS (Desktop & Online), QGIS, Survey123, Go.Data, SharePoint, Kobo Toolbox, GPS technology, and full-stack web and mobile application development. I hold a CISCO CCNA2 certification in network engineering and have extensive hands-on experience in IT infrastructure support, system maintenance, and user training — including four years as an IT instructor and network administrator. I am currently completing a Master of Science in Information Technology at Build Bright University.",
    "Why Cambodia Development Resource Institute:\nI am drawn to Cambodia Development Resource Institute's mission-driven approach and its commitment to using technology and data to address complex development challenges. The IT System and Support Officer role aligns directly with my passion for leveraging digital tools to strengthen operational effectiveness across diverse, geographically distributed teams. I am eager to bring my regional experience, multilingual capabilities, and technical depth to support your based programs.",
    "I would welcome the opportunity to discuss how my background and skills align with Cambodia Development Resource Institute's needs. I am available for an interview at your earliest convenience and can be reached by email at sophornlimnpa@gmail.com or by phone at +855 12 964 495 / +855 69 767 696."
  ],
  closing: "Thank you sincerely for your time and consideration. I look forward to the opportunity to contribute to your team's success.",
  signOff: "Yours sincerely,",
  signOffName: "Sophorn Lim",
  signOffTitle: "Applicant – IT Support Lead, Asia",
  signOffContacts: "sophornlimnpa@gmail.com | +855 12 964 495 | +855 69 767 696 | +855 717 111 007"
};
