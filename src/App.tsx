import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Sparkles, 
  MapPin, 
  Globe, 
  Compass, 
  CheckCircle2, 
  Mail, 
  Phone, 
  Award, 
  BookOpen, 
  Users, 
  Menu, 
  X, 
  Printer, 
  ChevronRight,
  Info,
  Layers,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  FileText,
  RefreshCw
} from "lucide-react";

import { db, handleFirestoreError, OperationType } from "./firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { 
  profileSummary, 
  workExperiences, 
  educationList, 
  skillCategories, 
  certifications,
  operationalMilestones,
  coverLetterData
} from "./data";

import AiChatbot from "./components/AiChatbot";
// @ts-ignore
import sophornAvatar from "./assets/images/sophorn_real_profile_1779780775096.png";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [printType, setPrintType] = useState<"cv" | "cover_letter">("cv");

  // Dynamic Cover Letter customizer states
  const [clOrg, setClOrg] = useState("Cambodia Development Resource Institute");
  const [clRole, setClRole] = useState("IT System and Support Officer");
  const [clDate, setClDate] = useState("26 May 2026");
  const [clRecipient, setClRecipient] = useState("Hiring Manager");
  const [clAddress, setClAddress] = useState("Phnom Penh, Cambodia");

  // New customizable contact/header fields
  const [clSenderName, setClSenderName] = useState("SOPHORN LIM");
  const [clSenderTitle, setClSenderTitle] = useState("IT Support Lead | Data Management & Information Systems");
  const [clSenderPhone, setClSenderPhone] = useState("069 767 696 / 012 964 495 / 0717 111 007");
  const [clSenderEmail, setClSenderEmail] = useState("sophornlimnpa@gmail.com");
  const [clSenderLoc, setClSenderLoc] = useState("Phnom Penh, Cambodia");

  // Customizable body paragraphs
  const [clSalutation, setClSalutation] = useState("Dear Hiring Manager,");
  const [clPara1, setClPara1] = useState("I am writing to express my strong interest in the IT System and Support Officer position at Cambodia Development Resource Institute, as advertised on LinkedIn. With over 20 years of progressive experience in IT infrastructure, data management, geospatial systems, and full-stack development across public health and humanitarian sectors, I am confident in my ability to deliver meaningful technical leadership for your regional operations.");
  const [clPara2, setClPara2] = useState("Most recently, as a National Consultant with the World Health Organization supporting Greater Mekong Subregion countries — including Cambodia, Lao PDR, Myanmar, Thailand, and Vietnam — I led the validation, analysis, and interpretation of malaria surveillance data through DHIS2 platforms. I developed HTML-based reports and mobile applications integrated with the Malaria Elimination Database (MEDB), and produced epidemiological summaries for national programs, regional steering committees, and international donors. In my preceding role as Data Management Officer at WHO, I built end-to-end digital surveillance systems for Hepatitis and Rabies on DHIS2, developed a comprehensive ArcGIS health facility map for Cambodia, and managed daily data quality assurance across national health datasets.");
  const [clPara3, setClPara3] = useState("At Norwegian People's Aid (NPA), I served as Project Manager for the Humanitarian Disarmament Project in Ratanakiri Province, overseeing field survey teams, developing SOPs, and ensuring rigorous quality assurance across all operations. I designed and deployed ArcGIS Online dashboards, Survey123 tools, and GPS-integrated workflows that enabled real-time field data tracking and senior management reporting. My experience managing cross-functional teams and coordinating with national authorities has sharpened my ability to lead in complex, multi-stakeholder environments.");
  const [clPara4, setClPara4] = useState("My technical toolkit includes DHIS2, ArcGIS (Desktop & Online), QGIS, Survey123, Go.Data, SharePoint, Kobo Toolbox, GPS technology, and full-stack web and mobile application development. I hold a CISCO CCNA2 certification in network engineering and have extensive hands-on experience in IT infrastructure support, system maintenance, and user training — including four years as an IT instructor and network administrator. I am currently completing a Master of Science in Information Technology at Build Bright University.");
  const [clPara5, setClPara5] = useState("I am drawn to Cambodia Development Resource Institute's mission-driven approach and its commitment to using technology and data to address complex development challenges. The IT System and Support Officer role aligns directly with my passion for leveraging digital tools to strengthen operational effectiveness across diverse, geographically distributed teams. I am eager to bring my regional experience, multilingual capabilities, and technical depth to support your based programs.");
  const [clPara6, setClPara6] = useState("I would welcome the opportunity to discuss how my background and skills align with Cambodia Development Resource Institute's needs. I am available for an interview at your earliest convenience and can be reached by email at sophornlimnpa@gmail.com or by phone at +855 12 964 495 / +855 69 767 696.");
  const [clClosing, setClClosing] = useState("Thank you sincerely for your time and consideration. I look forward to the opportunity to contribute to your team's success.");
  const [clSignOff, setClSignOff] = useState("Yours sincerely,");
  const [clSignOffName, setClSignOffName] = useState("Sophorn Lim");
  const [clSignOffTitle, setClSignOffTitle] = useState("Applicant – IT Support Lead, Asia");

  const [clTitle2, setClTitle2] = useState("Data Management & Analytical Expertise");
  const [clTitle3, setClTitle3] = useState("Project Leadership & Field Operations");
  const [clTitle4, setClTitle4] = useState("Technical Proficiency");
  const [clTitle5, setClTitle5] = useState("Why");

  const [isClEditing, setIsClEditing] = useState(false);
  const [clActiveTab, setClActiveTab] = useState<"header" | "recipient" | "body" | "signoff">("recipient");

  // Interactive feature states
  const [showFloatingChat, setShowFloatingChat] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Form states
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Auto-launch printer if redirecting with print=true query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("print") === "true") {
      const typeParam = params.get("type");
      if (typeParam === "cover_letter") {
        setPrintType("cover_letter");
      } else {
        setPrintType("cv");
      }
      // Clean up the URL query parameter so page reloads do not trigger it repeatedly
      const url = new URL(window.location.href);
      url.searchParams.delete("print");
      url.searchParams.delete("type");
      window.history.replaceState({}, document.title, url.pathname + url.search);
      
      const timer = setTimeout(() => {
        window.focus();
        window.print();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Monitor scrolling to shrink header navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  // Form handling -> writes to Firestore, alerts user via clean state indicators with mailto fallback
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(false);

    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      const missing = [];
      if (!formName.trim()) missing.push("Your Name");
      if (!formEmail.trim()) missing.push("Your Email");
      if (!formMessage.trim()) missing.push("Message");
      setFormError("Please fill in: " + missing.join(", "));
      return;
    }

    setFormSubmitting(true);
    const inquiryId = "inquiry_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
    
    try {
      const inquiryDocRef = doc(db, "inquiries", inquiryId);
      await setDoc(inquiryDocRef, {
        id: inquiryId,
        name: formName.trim(),
        email: formEmail.trim(),
        subject: formSubject.trim() || "General Inquiry",
        message: formMessage.trim(),
        createdAt: serverTimestamp()
      });

      setFormSuccess(true);
      setFormName("");
      setFormPhone("");
      setFormEmail("");
      setFormSubject("");
      setFormMessage("");
    } catch (err) {
      console.warn("Firestore save failed, invoking mailto fallback", err);
      setFormError("Direct DB sync is limited. Triggering native email client...");

      // Fallback: Trigger native mailto link
      const body = [
        "Hi Sophorn,",
        "",
        formMessage,
        "",
        "---",
        "From: " + formName,
        formPhone ? "Phone: " + formPhone : "",
        "Reply to: " + formEmail,
      ].filter(Boolean).join("\n");

      const mailto = "mailto:sophornlimnpa@gmail.com"
        + "?subject=" + encodeURIComponent(formSubject || "Portfolio Inquiry")
        + "&body=" + encodeURIComponent(body);

      window.location.href = mailto;
      setFormSuccess(true);
      
      try {
        handleFirestoreError(err, OperationType.WRITE, `inquiries/${inquiryId}`);
      } catch (logErr) {
        // Suppress thrown error so UI has smooth fallback UX
      }
    } finally {
      setFormSubmitting(false);
    }
  };

  const handlePrint = (type: "cv" | "cover_letter" = "cv") => {
    setPrintType(type);
    
    // Use a short delay to allow React to update the state-controlled
    // visibility of the print blocks before invoking the browser print dialog.
    setTimeout(() => {
      try {
        window.focus();
        if (window.self !== window.top) {
          setShowPrintModal(true);
        } else {
          window.print();
        }
      } catch (e) {
        console.warn("Direct window.print() failed or was blocked:", e);
        setShowPrintModal(true);
      }
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#071529] text-[#e8e4dc] font-sans antialiased relative">
      
      {/* ── NAVIGATION (Shrinks on scroll) ── */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-300 print:hidden ${
          scrolled 
            ? "py-3 px-6 md:px-16 bg-[#071529]/95 backdrop-blur-md" 
            : "py-5 px-6 md:px-16 bg-[#071529]/85 backdrop-blur-md"
        }`}
      >
        <div 
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-3 font-sans font-medium text-lg text-gold tracking-wide cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img 
            src={sophornAvatar} 
            alt="Sophorn Lim" 
            className="w-8 h-8 rounded-full object-cover border border-[#2e9bbf]/30"
            referrerPolicy="no-referrer"
          />
          Sophorn Lim
        </div>
        
        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10 list-none">
          <li>
            <button 
              onClick={() => scrollToSection("about")} 
              className="font-sans text-[11px] tracking-widest uppercase text-[#8a9bb0] hover:text-[#2e9bbf] transition-colors cursor-pointer"
            >
              About
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection("skills")} 
              className="font-sans text-[11px] tracking-widest uppercase text-[#8a9bb0] hover:text-[#2e9bbf] transition-colors cursor-pointer"
            >
              Skills
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection("experience")} 
              className="font-sans text-[11px] tracking-widest uppercase text-[#8a9bb0] hover:text-[#2e9bbf] transition-colors cursor-pointer"
            >
              Experience
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection("education")} 
              className="font-sans text-[11px] tracking-widest uppercase text-[#8a9bb0] hover:text-[#2e9bbf] transition-colors cursor-pointer"
            >
              Education
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection("coverletter")} 
              className="font-sans text-[11px] tracking-widest uppercase text-[#8a9bb0] hover:text-[#2e9bbf] transition-colors cursor-pointer"
            >
              Cover Letter
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="font-sans text-[11px] tracking-widest uppercase text-[#8a9bb0] hover:text-[#2e9bbf] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </li>
        </ul>

        {/* Action button bar */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => handlePrint("cv")}
            title="Download PDF or Print CV"
            className="p-2 border border-teal-dark/30 rounded-full text-teal-light hover:text-gold hover:border-gold transition-colors"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center gap-1.5 cursor-pointer p-1"
          aria-label="Toggle navigation menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}></span>
        </button>
      </nav>

      {/* MOBILE DRAWER DRAWER */}
      <div className={`fixed inset-0 bg-[#071529]/98 z-[99] flex flex-col items-center justify-center gap-10 transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <button 
          onClick={() => scrollToSection("about")} 
          className="font-sans text-xl font-medium text-off-white hover:text-teal-light cursor-pointer"
        >
          About
        </button>
        <button 
          onClick={() => scrollToSection("skills")} 
          className="font-sans text-xl font-medium text-off-white hover:text-teal-light cursor-pointer"
        >
          Skills
        </button>
        <button 
          onClick={() => scrollToSection("experience")} 
          className="font-sans text-xl font-medium text-off-white hover:text-teal-light cursor-pointer"
        >
          Experience
        </button>
        <button 
          onClick={() => scrollToSection("education")} 
          className="font-sans text-xl font-medium text-off-white hover:text-teal-light cursor-pointer"
        >
          Education
        </button>
        <button 
          onClick={() => scrollToSection("coverletter")} 
          className="font-sans text-xl font-medium text-off-white hover:text-teal-light cursor-pointer"
        >
          Cover Letter
        </button>
        <button 
          onClick={() => scrollToSection("contact")} 
          className="font-sans text-xl font-medium text-off-white hover:text-teal-light cursor-pointer"
        >
          Contact
        </button>
        <button
          onClick={() => {
            setMenuOpen(false);
            handlePrint();
          }}
          className="p-2 border border-[#c9a84c]/50 hover:border-gold rounded-full text-gold hover:bg-[#c9a84c]/20 transition-all duration-200"
        >
          <Printer className="w-6 h-6" />
        </button>
      </div>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-center px-6 md:px-16 pt-32 pb-16 overflow-hidden hero-glow-bg print:hidden">
        
        <div className="relative z-10 max-w-[1100px] w-full text-left flex flex-col items-start">
          <div className="font-sans text-[11px] tracking-[0.2em] uppercase text-teal-light mb-5 flex items-center justify-start gap-3">
            <span className="block w-8 h-[1px] bg-teal-light"></span>
            IT Lead &amp; Data Systems Specialist
          </div>
          
          <h1 className="font-sans font-bold text-5xl sm:text-7xl lg:text-8xl leading-[1.05] text-off-white mb-2 text-left">
            Sophorn Lim
          </h1>
          
          <div className="font-sans italic text-lg sm:text-2xl text-gold mb-8 text-left">
            Turning complex data into clear decisions.
          </div>
          
          <p className="text-sm sm:text-base text-muted-blue max-w-[580px] leading-relaxed mb-10 text-left">
            20+ years bridging information technology, geospatial intelligence, and public health systems across Southeast Asia — from WHO surveillance platforms to humanitarian field operations.
          </p>
          
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mt-4 border-t border-teal-dark/15 pt-8 w-full">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-start">
              <button 
                onClick={() => scrollToSection("experience")} 
                className="btn-primary-style font-medium text-[13px] tracking-wider uppercase cursor-pointer text-left justify-start sm:justify-center whitespace-nowrap"
              >
                ↓ View Experience
              </button>
              <button 
                onClick={() => scrollToSection("contact")} 
                className="btn-outline-style font-medium text-[13px] tracking-wider uppercase cursor-pointer text-left justify-start sm:justify-center whitespace-nowrap"
              >
                Get in Touch
              </button>
              <a 
                href="https://www.linkedin.com/messaging/thread/2-MjQyYTEwNzQtYzlmYy00ZTQ0LTk4MmYtMmUzYTFlNWY2ZDM1XzEwMA==/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-style border-gold/45 text-gold hover:bg-[#0077b5]/20 hover:border-[#0077b5] hover:text-white font-medium text-[13px] tracking-wider uppercase cursor-pointer text-left justify-start sm:justify-center flex items-center gap-2 whitespace-nowrap"
              >
                <Linkedin className="w-3.5 h-3.5 text-gold" />
                Online Chat
              </a>
            </div>

            {/* Stats indicators aligned side-by-side and vertically centered with numbers, stacking vertically on mobile */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 md:gap-12 pt-6 xl:pt-0 items-start sm:items-center justify-start">
              <div className="flex flex-row items-center gap-3">
                <div className="font-sans font-bold text-3xl sm:text-4xl text-gold leading-none">20+</div>
                <div className="font-sans text-[11px] sm:text-xs tracking-wider uppercase text-muted-blue leading-tight uppercase font-medium">Years Experience</div>
              </div>
              <div className="flex flex-row items-center gap-3 border-l-0 pl-0 sm:border-l sm:border-teal-dark/20 sm:pl-10 md:pl-12">
                <div className="font-sans font-bold text-3xl sm:text-4xl text-gold leading-none">8</div>
                <div className="font-sans text-[11px] sm:text-xs tracking-wider uppercase text-muted-blue leading-tight uppercase font-medium">Organisations</div>
              </div>
              <div className="flex flex-row items-center gap-3 border-l-0 pl-0 sm:border-l sm:border-teal-dark/20 sm:pl-10 md:pl-12">
                <div className="font-sans font-bold text-3xl sm:text-4xl text-gold leading-none">6</div>
                <div className="font-sans text-[11px] sm:text-xs tracking-wider uppercase text-muted-blue leading-tight uppercase font-medium">GMS Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative scroll-margin-top-[72px] bg-[#071529] print:hidden">
        <div className="w-full py-16 sm:py-24 px-4 sm:px-6 md:px-12">
          <div className="bg-[#0f2540] border border-[#2e9bbf]/20 rounded-2xl p-6 sm:p-10 lg:p-12">
          <div className="font-sans text-[11px] tracking-[0.2em] uppercase text-teal-light mb-4 flex items-center justify-start gap-3">
            <span className="block w-6 h-[1px] bg-teal-light"></span>
            Who I Am
          </div>
          
          <h2 className="font-sans font-bold text-3xl sm:text-5xl text-off-white mb-10 text-left">
            About Me
          </h2>
 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-5 text-sm sm:text-base text-muted-blue leading-relaxed text-left">
              <p>
                I am a <strong>Cambodian IT and Data Management professional</strong> with over two decades of experience spanning health information systems, geospatial analysis, full-stack development, and humanitarian project management.
              </p>
              <p>
                My career has taken me from teaching computer networks in Siem Reap to managing <strong>WHO's Mekong Malaria Elimination surveillance systems</strong> across six countries, building DHIS2 platforms, mobile applications, and ArcGIS dashboards that support life-saving decisions every day.
              </p>
              <p>
                I bring a rare combination of <strong>deep technical expertise</strong> and <strong>field-level operational leadership</strong> — able to write code in the morning and brief senior stakeholders in the afternoon.
              </p>
              <p>
                Currently pursuing a <strong>Master of Science in Information Technology</strong> at Build Bright University, Phnom Penh, and open to new challenges in IT leadership across the Asia region.
              </p>
            </div>
 
            <div className="flex flex-col gap-4 text-left">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline py-3 border-b border-teal-dark/25 gap-1 sm:gap-4 text-left">
                <span className="font-sans text-[11px] uppercase tracking-wider text-muted-blue shrink-0 text-left">Nationality</span>
                <span className="text-sm font-medium text-off-white text-left sm:text-right">{profileSummary.nationality}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline py-3 border-b border-teal-dark/25 gap-1 sm:gap-4 text-left">
                <span className="font-sans text-[11px] uppercase tracking-wider text-muted-blue shrink-0 text-left">Based In</span>
                <span className="text-sm font-medium text-off-white text-left sm:text-right">{profileSummary.basedIn}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline py-3 border-b border-teal-dark/25 gap-1 sm:gap-4 text-left">
                <span className="font-sans text-[11px] uppercase tracking-wider text-muted-blue shrink-0 text-left">Languages</span>
                <span className="text-sm font-medium text-off-white text-left sm:text-right">Khmer (Native) · English (Proficient)</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline py-3 border-b border-teal-dark/25 gap-1 sm:gap-4 text-left">
                <span className="font-sans text-[11px] uppercase tracking-wider text-muted-blue shrink-0 text-left">Current Study</span>
                <span className="text-sm font-medium text-off-white text-left sm:text-right font-medium">M.Sc. Information Technology</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline py-3 border-b border-teal-dark/25 gap-1 sm:gap-4 text-left">
                <span className="font-sans text-[11px] uppercase tracking-wider text-muted-blue shrink-0 text-left">Open To</span>
                <span className="text-sm font-medium text-off-white text-left sm:text-right">IT Leadership · Data Systems · Regional Roles</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline py-3 border-b border-teal-dark/25 gap-1 sm:gap-4 text-left">
                <span className="font-sans text-[11px] uppercase tracking-wider text-muted-blue shrink-0 text-left">Email</span>
                <span className="text-base font-medium text-off-white text-left sm:text-right break-all"><a href="mailto:sophornlimnpa@gmail.com" className="text-teal-light hover:underline">sophornlimnpa@gmail.com</a></span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline py-3 border-b border-teal-dark/25 gap-1 sm:gap-4 text-left">
                <span className="font-sans text-[11px] uppercase tracking-wider text-muted-blue shrink-0 text-left">Phone</span>
                <span className="text-sm font-medium text-off-white text-left sm:text-right">069 767 696 / 012 964 495 / 0717 111 007</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
 
      <hr className="divider-line print:hidden" />
 
      {/* ── SKILLS ── */}
      <section id="skills" className="relative scroll-margin-top-[72px] bg-[#071529] print:hidden">
        <div className="max-w-[1100px] mx-auto py-28 px-6 md:px-16 space-y-12">
          
          <div className="text-left flex flex-col items-start">
            <div className="font-sans text-[11px] tracking-[0.2em] uppercase text-teal-light mb-4 flex items-center justify-start gap-3">
              <span className="block w-6 h-[1px] bg-teal-light"></span>
              What I Do
            </div>
            
            <h2 className="font-sans font-bold text-3xl sm:text-5xl text-off-white mb-4 text-left">
              Core Skills
            </h2>
            
            <p className="text-sm sm:text-base text-muted-blue max-w-[560px] text-left">
              A practitioner across the full data lifecycle — from field collection to executive dashboards.
            </p>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="skill-card-style text-left flex flex-col items-start">
                <div className="text-3xl mb-4">{cat.icon}</div>
                <div className="font-sans font-medium text-[#c9a84c] text-base mb-4">{cat.category}</div>
                <ul className="list-none space-y-2 text-left w-full">
                  {cat.items.map((it, idx2) => (
                    <li key={idx2} className="text-[13px] text-muted-blue flex items-center gap-3">
                      <span className="text-teal-light text-[10px]">▸</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
 
        </div>
      </section>
 
      <hr className="divider-line print:hidden" />

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="relative scroll-margin-top-[72px] bg-[#071529] print:hidden">
        <div className="w-full py-16 sm:py-24 px-4 sm:px-6 md:px-12">
          <div className="bg-[#0f2540] border border-[#2e9bbf]/20 rounded-2xl p-6 sm:p-10 lg:p-12">
          <div className="font-sans text-[11px] tracking-[0.2em] uppercase text-teal-light mb-4 flex items-center justify-start gap-3">
            <span className="block w-6 h-[1px] bg-teal-light"></span>
            Career Path
          </div>
          
          <h2 className="font-sans font-bold text-3xl sm:text-5xl text-off-white mb-4 text-left">
            Professional Experience
          </h2>
          
          <p className="text-sm sm:text-base text-muted-blue max-w-[560px] text-left mb-12">
            Two decades of progressive responsibility across health, humanitarian, and technology sectors.
          </p>

          <div className="timeline-line pl-8 ml-4 space-y-14">
            {workExperiences.map((exp) => (
              <div key={exp.id} className="relative">
                {/* Custom timeline dot matcher */}
                <div className="timeline-dot-style"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3 justify-start items-start text-left">
                  <span className="font-sans text-xs tracking-wider text-gold bg-[#c9a84c]/10 border border-[#c9a84c]/25 px-2.5 py-0.5 whitespace-nowrap align-middle self-start rounded-full">
                    {exp.period}
                  </span>
                  <span className="text-[#2e9bbf] font-medium text-sm sm:pl-3">
                    {exp.organization}
                  </span>
                </div>

                <h3 className="font-sans text-lg sm:text-xl text-off-white mb-4 text-left">
                  {exp.role}
                </h3>

                <ul className="space-y-2 list-none text-left">
                  {exp.description.map((bullet, idx) => (
                    <li key={idx} className="text-sm text-muted-blue pl-4 py-0.5 relative">
                      <span className="absolute left-0 text-teal-light font-bold">–</span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tech Skills Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4 justify-start">
                  {exp.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-[9px] font-mono uppercase bg-[#071529]/60 px-2.5 py-1 border border-teal-light/5 text-teal-light rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      <hr className="divider-line print:hidden" />

      {/* ── EDUCATION ── */}
      <section id="education" className="relative scroll-margin-top-[72px] bg-[#071529] print:hidden">
        <div className="max-w-[1100px] mx-auto py-28 px-6 md:px-16 space-y-12">
          
          <div className="text-left flex flex-col items-start">
            <div className="font-sans text-[11px] tracking-[0.2em] uppercase text-teal-light mb-4 flex items-center justify-start gap-3">
              <span className="block w-6 h-[1px] bg-teal-light"></span>
              Academic Background
            </div>
            
            <h2 className="font-sans font-bold text-3xl sm:text-5xl text-off-white text-left">
              Education
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {educationList.map((edu) => (
              <div 
                key={edu.id} 
                className="bg-[#0f2540] border border-teal-dark/25 p-8 transition-colors hover:border-gold duration-300 rounded-2xl text-left flex flex-col items-start"
              >
                <div className="font-sans text-xs text-gold tracking-wide mb-3">
                  {edu.period}
                </div>
                <h3 className="font-sans font-bold text-base text-off-white mb-2 leading-snug">
                  {edu.degree}
                </h3>
                <p className="text-[13px] text-muted-blue">
                  {edu.institution}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <hr className="divider-line print:hidden" />

      {/* ── CERTIFICATIONS & LANGUAGES ── */}
      <section className="relative bg-[#071529] print:hidden" id="credentials">
        <div className="w-full py-16 sm:py-24 px-4 sm:px-6 md:px-12">
          <div className="bg-[#0f2540] border border-[#2e9bbf]/20 rounded-2xl p-6 sm:p-10 lg:p-12">
          <div className="text-left flex flex-col items-start">
            <div className="font-sans text-[11px] tracking-[0.2em] uppercase text-teal-light mb-4 flex items-center justify-start gap-3">
              <span className="block w-6 h-[1px] bg-teal-light"></span>
              Credentials
            </div>
            
            <h2 className="font-sans font-bold text-3xl sm:text-5xl text-off-white text-left mb-6">
              Certifications &amp; Training
            </h2>
            
            <p className="text-sm text-muted-blue text-left mb-12">
              Continuously expanding expertise through professional development.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-start mb-16">
            {certifications.map((cert, idx) => (
              <span key={idx} className="cert-badge-style">
                {cert}
              </span>
            ))}
          </div>

          {/* Languages Segment */}
          <div className="pt-8 text-left flex flex-col items-start">
            <div className="font-sans text-[11px] tracking-[0.2em] uppercase text-teal-light mb-6 flex items-center justify-start gap-3">
              <span className="block w-6 h-[1px] bg-teal-light"></span>
              Languages
            </div>

            <div className="flex flex-col sm:flex-row gap-16 max-w-[680px] w-full justify-start text-left items-start">
              <div className="flex-1 space-y-2 flex flex-col items-start">
                <div className="font-sans font-medium text-lg text-off-white">Khmer</div>
                <div className="font-sans text-[11px] uppercase tracking-wider text-teal-light">Native / Mother Tongue</div>
                <div className="w-[180px] h-[3px] bg-teal-dark/30 relative">
                  <div className="absolute top-0 left-0 h-full bg-[#2e9bbf] w-full"></div>
                </div>
              </div>

              <div className="flex-1 space-y-2 flex flex-col items-start">
                <div className="font-sans font-medium text-lg text-off-white">English</div>
                <div className="font-sans text-[11px] uppercase tracking-wider text-teal-light">Proficient — Read, Write, Speak</div>
                <div className="w-[180px] h-[3px] bg-[#24a1de]/30 relative">
                  <div className="absolute top-0 left-0 h-full bg-[#2e9bbf] w-[80%]"></div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <hr className="divider-line print:hidden" />

      {/* ── COVER LETTER SECTION ── */}
      <section id="coverletter" className="relative scroll-margin-top-[72px] bg-[#071529] print:hidden text-left">
        <div className="w-full py-16 sm:py-24 px-4 sm:px-6 md:px-12">
          <div className="bg-[#0f2540] border border-[#2e9bbf]/20 rounded-2xl p-6 sm:p-10 lg:p-12 relative group text-left">
              <div className="font-sans text-[11px] tracking-[0.2em] uppercase text-teal-light mb-4 flex items-center justify-start gap-3">
                <span className="block w-6 h-[1px] bg-teal-light"></span>
                Professional Document
              </div>
              
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-10 text-left">
                <h2 className="font-sans font-bold text-3xl sm:text-5xl text-off-white">
                  Cover Letter
                </h2>
                <p className="text-sm text-muted-blue max-w-sm">
                  Tailored application letter for specific organizations and positions. Fully interactive and printable.
                </p>
              </div>

              {/* Edit Toggle Icon */}
              <div className="absolute top-4 right-4 flex gap-2 z-20">
                <button 
                  onClick={() => handlePrint("cover_letter")}
                  title="Print / Export CL PDF"
                  className="p-2 bg-[#071529] rounded-full text-teal-light hover:text-gold border border-[#2e9bbf]/30 hover:border-gold transition-colors"
                >
                  <Printer className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsClEditing(!isClEditing)}
                  className="p-2 bg-[#071529] rounded-full text-teal-light hover:text-white border border-[#2e9bbf]/30"
                >
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>

              {/* Edit Form Modal/Overlay when active */}
              {isClEditing && (
                <div className="absolute inset-0 bg-[#071529]/95 z-30 p-6 rounded-2xl overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-off-white font-bold text-lg">Edit Cover Letter</h3>
                        <button onClick={() => setIsClEditing(false)} className="text-muted-blue hover:text-white">Close</button>
                    </div>
                  <div className="flex bg-[#0d1e36] rounded-lg p-1 mb-4">
                    {(['header', 'recipient', 'body', 'signoff'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setClActiveTab(tab)}
                        className={`flex-1 text-[10px] uppercase tracking-wider font-bold py-2 px-1 rounded-md transition-all ${clActiveTab === tab ? 'bg-[#2e9bbf]/20 text-teal-light' : 'text-muted-blue hover:text-off-white'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>


                  <div className="space-y-4 text-xs font-sans text-left">
                    {clActiveTab === 'header' && (
                      <div className="space-y-4">
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Sender Name</label><input type="text" value={clSenderName} onChange={(e) => setClSenderName(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Sender Title</label><input type="text" value={clSenderTitle} onChange={(e) => setClSenderTitle(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Phone</label><input type="text" value={clSenderPhone} onChange={(e) => setClSenderPhone(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Email</label><input type="text" value={clSenderEmail} onChange={(e) => setClSenderEmail(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Location</label><input type="text" value={clSenderLoc} onChange={(e) => setClSenderLoc(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white" /></div>
                      </div>
                    )}
                    
                    {clActiveTab === 'recipient' && (
                      <div className="space-y-4">
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Date</label><input type="text" value={clDate} onChange={(e) => setClDate(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Recipient</label><input type="text" value={clRecipient} onChange={(e) => setClRecipient(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Organization</label><input type="text" value={clOrg} onChange={(e) => setClOrg(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Address</label><input type="text" value={clAddress} onChange={(e) => setClAddress(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Role</label><input type="text" value={clRole} onChange={(e) => setClRole(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white" /></div>
                      </div>
                    )}
                    
                    {clActiveTab === 'body' && (
                      <div className="space-y-4">
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Salutation</label><input type="text" value={clSalutation} onChange={(e) => setClSalutation(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Para 1</label><textarea value={clPara1} onChange={(e) => setClPara1(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white h-20" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Title 2</label><input type="text" value={clTitle2} onChange={(e) => setClTitle2(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Para 2</label><textarea value={clPara2} onChange={(e) => setClPara2(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white h-20" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Title 3</label><input type="text" value={clTitle3} onChange={(e) => setClTitle3(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Para 3</label><textarea value={clPara3} onChange={(e) => setClPara3(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white h-20" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Title 4</label><input type="text" value={clTitle4} onChange={(e) => setClTitle4(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Para 4</label><textarea value={clPara4} onChange={(e) => setClPara4(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white h-20" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Title 5</label><input type="text" value={clTitle5} onChange={(e) => setClTitle5(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Para 5</label><textarea value={clPara5} onChange={(e) => setClPara5(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white h-20" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Para 6</label><textarea value={clPara6} onChange={(e) => setClPara6(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white h-20" /></div>
                      </div>
                    )}

                    {clActiveTab === 'signoff' && (
                      <div className="space-y-4">
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Closing</label><textarea value={clClosing} onChange={(e) => setClClosing(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white h-20" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Sign Off Text</label><input type="text" value={clSignOff} onChange={(e) => setClSignOff(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Sign Off Name</label><input type="text" value={clSignOffName} onChange={(e) => setClSignOffName(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white" /></div>
                        <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider text-muted-blue font-medium">Sign Off Title</label><input type="text" value={clSignOffTitle} onChange={(e) => setClSignOffTitle(e.target.value)} className="w-full bg-[#071529] border border-[#2e9bbf]/25 rounded-xl px-4 py-2 text-off-white" /></div>
                      </div>
                    )}
                    <button onClick={() => setIsClEditing(false)} className="w-full py-2 bg-teal-dark/50 text-white font-bold rounded-xl">Save & Close</button>
                  </div>
                </div>
              )}
              
              {/* Letter contents with dark aesthetics */}
              <div className="space-y-5">
                {/* Letter contents */}
                <div className="pt-4 text-justify space-y-5 text-muted-blue text-xs sm:text-sm leading-relaxed font-sans">
                  <p>
                    {clSalutation}
                  </p>

                  <p>
                    {clPara1}
                  </p>

                  <div className="space-y-1.5">
                    <strong className="text-teal-light font-sans font-bold block text-xs tracking-wider uppercase">{clTitle2}</strong>
                    <p>{clPara2}</p>
                  </div>

                  <div className="space-y-1.5">
                    <strong className="text-teal-light font-sans font-bold block text-xs tracking-wider uppercase">{clTitle3}</strong>
                    <p>{clPara3}</p>
                  </div>

                  <div className="space-y-1.5">
                    <strong className="text-teal-light font-sans font-bold block text-xs tracking-wider uppercase">{clTitle4}</strong>
                    <p>{clPara4}</p>
                  </div>

                  <div className="space-y-1.5">
                    <strong className="text-teal-light font-sans font-bold block text-xs tracking-wider uppercase">{clTitle5} {clOrg}</strong>
                    <p>{clPara5}</p>
                  </div>

                  <p>{clPara6}</p>

                  <p className="pt-2 text-off-white/80">
                    {clClosing}
                  </p>

                  <div className="pt-4 space-y-1 flex flex-col items-start">
                    <div>{clSignOff}</div>
                    <div className="font-bold text-off-white pt-4 text-base">{clSignOffName}</div>
                    <div className="text-teal-light text-[10px] sm:text-xs leading-none uppercase tracking-wide">{clSignOffTitle}</div>
                  </div>

                  <div className="pt-6 flex justify-center mt-8">
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      <hr className="divider-line print:hidden" />

      {/* ── CONTACT ── */}
      <section id="contact" className="relative scroll-margin-top-[72px] bg-[#071529] print:hidden">
        <div className="max-w-[1100px] mx-auto py-28 px-6 md:px-16 space-y-12">
          
          <div className="text-left flex flex-col items-start">
            <div className="font-sans text-[11px] tracking-[0.2em] uppercase text-teal-light mb-4 flex items-center justify-start gap-3">
              <span className="block w-6 h-[1px] bg-teal-light"></span>
              Get In Touch
            </div>
            
            <h2 className="font-sans font-bold text-3xl sm:text-5xl text-off-white mb-4 text-left">
              Contact
            </h2>
            
            <p className="text-sm text-muted-blue max-w-[560px] text-left">
              Available for IT leadership roles, data systems consultancies, and regional project opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Column: Contact details & References stacked */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-start">
              
              {/* Contact details */}
              <div className="bg-[#0f2540] border border-teal-dark/30 p-8 sm:p-10 space-y-6 rounded-2xl flex flex-col justify-between text-left items-stretch">
                <div>
                  <div className="flex flex-col items-start">
                    <h3 className="font-sans text-xl font-medium text-off-white mb-2">Contact Details</h3>
                    <p className="text-xs text-muted-blue">Get in touch directly via my email or phone numbers.</p>
                  </div>

                  <div className="space-y-6 pt-6 flex flex-col items-stretch">
                    <div className="flex flex-row gap-2 sm:gap-5 items-center sm:items-start w-full overflow-hidden">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 hover:bg-white/10">
                        <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* High Fidelity Google Gmail Brand Logo paths */}
                          <path d="M4 20h2V10L2 7v11c0 1.1.9 2 2 2z" fill="#4285F4"/>
                          <path d="M20 20h-2V10l4-3v11c0 1.1-.9 2-2 2z" fill="#34A853"/>
                          <path d="M18 6v4l-6 4.5L6 10V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2z" fill="#FBBC05"/>
                          <path d="M20 6.5L12 12.5 4 6.5v11.5c0 .3.1.5.2.7L12 12l7.8 6.7c.1-.2.2-.4.2-.7V6.5z" fill="#EA4335"/>
                          <path d="M18 4h-2l-4 3-4-3H6c-1.1 0-2 .9-2 2v.5l8 6 8-6V6c0-1.1-.9-2-2-2z" fill="#C5221F"/>
                        </svg>
                      </div>
                      <div className="flex flex-col items-start min-w-0">
                        <div className="font-sans text-[10px] uppercase tracking-wider text-muted-blue mb-1">Email</div>
                        <div className="text-xs sm:text-base md:text-lg font-semibold tracking-wide truncate w-full"><a href="mailto:sophornlimnpa@gmail.com" className="text-teal-light hover:underline break-all">sophornlimnpa@gmail.com</a></div>
                      </div>
                    </div>

                    <div className="flex flex-row gap-2 sm:gap-5 items-center sm:items-start w-full overflow-hidden">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-[#2e9bbf]/10 border border-[#2e9bbf]/30 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 text-teal-light hover:text-gold hover:border-gold hover:bg-gold/10">
                        <Phone className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex flex-col items-start min-w-0">
                        <div className="font-sans text-[10px] uppercase tracking-wider text-muted-blue mb-1">Phone</div>
                        <div className="text-[11px] xs:text-xs sm:text-sm font-medium tracking-wide">069 767 696 &nbsp;·&nbsp; 012 964 495 &nbsp;·&nbsp; 0717 111 007</div>
                      </div>
                    </div>

                    <div className="flex flex-row gap-2 sm:gap-5 items-center sm:items-start w-full overflow-hidden">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 text-gold hover:text-teal-light hover:border-teal-light hover:bg-[#2e9bbf]/10">
                        <MapPin className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex flex-col items-start min-w-0">
                        <div className="font-sans text-[10px] uppercase tracking-wider text-muted-blue mb-1">Location</div>
                        <div className="text-xs sm:text-sm font-medium text-left">Phnom Penh, Cambodia<br/><span className="text-[10px] sm:text-xs text-muted-blue block mt-0.5">Origin: Kampong Thom Province</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media Section */}
                <div className="pt-6 border-t border-teal-dark/15 mt-auto flex flex-col items-start w-full">
                  <div className="font-sans text-[10px] uppercase tracking-wider text-muted-blue mb-3 text-left">Social Profiles</div>
                  <div className="flex gap-2 sm:gap-3 flex-wrap justify-start">
                    <a 
                      href="https://www.linkedin.com/in/limsophorn/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 sm:p-2.5 bg-white/5 hover:bg-[#0077b5]/10 text-[#8a9bb0] hover:text-[#0077b5] border border-[#2e9bbf]/15 hover:border-[#0077b5] rounded-full transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center animate-pulse-slow"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                    <a 
                      href="https://web.facebook.com/Sophronl007" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 sm:p-2.5 bg-white/5 hover:bg-[#1877f2]/10 text-[#8a9bb0] hover:text-[#1877f2] border border-[#2e9bbf]/15 hover:border-[#1877f2] rounded-full transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center animate-pulse-slow"
                      title="Facebook"
                    >
                      <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                    <a 
                      href="https://x.com/sophornlim" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 sm:p-2.5 bg-white/5 hover:bg-white/10 text-[#8a9bb0] hover:text-white border border-[#2e9bbf]/15 hover:border-white rounded-full transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center animate-pulse-slow"
                      title="X (Twitter)"
                    >
                      {/* Modern Official X platform (formerly Twitter) SVG Vector */}
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.youtube.com/@sharenewtips" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 sm:p-2.5 bg-white/5 hover:bg-[#ff0000]/10 text-[#8a9bb0] hover:text-[#ff0000] border border-[#2e9bbf]/15 hover:border-[#ff0000] rounded-full transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center animate-pulse-slow"
                      title="YouTube"
                    >
                      <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                    <a 
                      href="https://www.instagram.com/sophornlimnpa" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 sm:p-2.5 bg-white/5 hover:bg-[#e1306c]/10 text-[#8a9bb0] hover:text-[#e1306c] border border-[#2e9bbf]/15 hover:border-[#e1306c] rounded-full transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center animate-pulse-slow"
                      title="Instagram"
                    >
                      <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* References list stacked */}
              <div className="bg-[#0f2540] border border-teal-dark/30 p-8 sm:p-10 space-y-6 rounded-2xl flex flex-col justify-start text-left items-stretch">
                <div className="flex flex-col items-start">
                  <h3 className="font-sans text-xl font-medium text-off-white mb-2">References</h3>
                  <p className="text-xs text-muted-blue">Feel free to contact these individuals for information regarding my career and contributions.</p>
                </div>
                <div className="flex flex-col gap-6 text-left w-full">
                  {profileSummary.contact.references.map((ref, idx) => (
                    <div key={idx} className="border-l-2 border-[#2e9bbf]/60 pl-4 py-1 text-xs space-y-1">
                      <strong className="text-off-white block text-sm font-medium">{ref.name}</strong>
                      <span className="text-teal-light/95 text-[11px] font-medium block">{ref.title}</span>
                      {ref.org && <span className="text-muted-blue text-[10.5px] block leading-tight">{ref.org}</span>}
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 pt-1.5 text-[11px] font-mono">
                        {ref.tel && (
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-muted-blue/60">📞</span>
                            <a href={`tel:${ref.tel.replace(/\s+/g, '')}`} className="text-gold hover:underline">{ref.tel}</a>
                          </div>
                        )}
                        
                        {ref.tel && ref.email && <span className="hidden sm:inline text-muted-blue/30">|</span>}
                        
                        {ref.email && (
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-muted-blue/60">✉️</span>
                            <a href={`mailto:${ref.email}`} className="text-[#2e9bbf] hover:underline hover:text-teal-light">{ref.email}</a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Secure Inquiries Contact form */}
            <div className="lg:col-span-7 bg-[#0f2540] border border-teal-dark/30 p-8 sm:p-10 rounded-2xl flex flex-col justify-between text-left items-stretch relative overflow-hidden h-full">
              <div>
                <div className="flex items-center justify-between border-b border-teal-dark/20 pb-4 mb-6">
                  <div className="flex flex-col items-start">
                    <h3 className="font-sans text-xl font-medium text-off-white mb-1">Send a Message</h3>
                    <p className="text-xs text-muted-blue">Directly write to Sophorn. Your inquiry is securely saved.</p>
                  </div>
                  <div className="text-[9px] text-teal-light font-mono bg-teal-dark/20 border border-teal-light/10 rounded px-2 py-0.5 uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Firebase Cloud Secured
                  </div>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col items-start gap-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-mono text-muted-blue">Your Name <span className="text-red-400">*</span></label>
                      <input 
                        type="text" 
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-[#0a1b2f] border border-teal-dark/40 rounded-xl px-4 py-2.5 text-xs text-off-white placeholder:text-muted-blue/40 outline-none focus:border-teal-light transition-all"
                        required
                      />
                    </div>
                    <div className="flex flex-col items-start gap-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-mono text-muted-blue">Your Email <span className="text-red-400">*</span></label>
                      <input 
                        type="email" 
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-[#0a1b2f] border border-teal-dark/40 rounded-xl px-4 py-2.5 text-xs text-off-white placeholder:text-muted-blue/40 outline-none focus:border-teal-light transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col items-start gap-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-mono text-muted-blue">Phone (Optional)</label>
                      <input 
                        type="tel" 
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+855 ..."
                        className="w-full bg-[#0a1b2f] border border-teal-dark/40 rounded-xl px-4 py-2.5 text-xs text-off-white placeholder:text-muted-blue/40 outline-none focus:border-teal-light transition-all"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-mono text-muted-blue">Subject (Optional)</label>
                      <input 
                        type="text" 
                        value={formSubject}
                        onChange={(e) => setFormSubject(e.target.value)}
                        placeholder="Consultancy Proposal"
                        className="w-full bg-[#0a1b2f] border border-teal-dark/40 rounded-xl px-4 py-2.5 text-xs text-off-white placeholder:text-muted-blue/40 outline-none focus:border-teal-light transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-mono text-muted-blue">Message Body <span className="text-red-400">*</span></label>
                    <textarea 
                      rows={5}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Discuss career opportunities, project consultancies, or send simple greetings..."
                      className="w-full bg-[#0a1b2f] border border-teal-dark/40 rounded-xl px-4 py-2.5 text-xs text-off-white placeholder:text-muted-blue/40 outline-none focus:border-teal-light transition-all resize-none"
                      required
                    />
                  </div>

                  {/* Operational indicators */}
                  {formError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-xs rounded-xl p-3 text-left">
                      {formError}
                    </div>
                  )}

                  {formSuccess && (
                    <div className="bg-green-500/10 border border-green-500/25 text-teal-light text-xs rounded-xl p-3 text-left flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>Inquiry Dispatched Successfully!</strong>
                        <p className="mt-0.5 text-[11px] text-muted-blue">Your message was written directly into FireStore. Sophorn will contact you shortly.</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-teal-dark hover:bg-teal-light text-white text-xs font-semibold flex items-center gap-2 border border-teal-light/25 disabled:bg-deep disabled:text-muted-blue/30 disabled:border-teal-dark/30 transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer"
                    >
                      {formSubmitting ? (
                        <>
                          <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Send Secure Inquiry
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ── FOOTER ── */}
      <footer className="bg-[#071529] border-t border-teal-dark/25 py-8 px-6 md:px-16 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-blue shrink-0 print:hidden">
        <div className="flex items-center gap-2.5 text-gold font-sans">
          <img 
            src={sophornAvatar} 
            alt="Sophorn Lim" 
            className="w-6 h-6 rounded-full object-cover border border-[#2e9bbf]/30"
            referrerPolicy="no-referrer"
          />
          Sophorn Lim
        </div>
        <div className="font-sans text-[10px] tracking-wide text-right">
          © 2026 · IT Lead &amp; Data Systems Specialist · Phnom Penh, Cambodia
        </div>
      </footer>

      {/* ── FLOATING CONTROLS FOR DIRECT TELEGRAM CHAT ── */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none print:hidden">
        
        {/* Floating circular button */}
        <a
          href="https://t.me/sophornlim"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto bg-[#24A1DE] hover:bg-[#208ebd] text-white w-14 h-14 rounded-full flex items-center justify-center border-2 border-white/20 shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Chat directly on Telegram"
        >
          <div className="relative">
            <svg className="w-7 h-7 fill-current text-white" viewBox="0 0 24 24">
              <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.578.192l-8.533 7.701-.332 4.97c.488 0 .704-.224.977-.489l2.345-2.28 4.88 3.605c.899.496 1.543.24 1.767-.83l3.203-15.093c.328-1.31-.497-1.898-1.353-1.55h-.001z"/>
            </svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#071529]"></span>
          </div>
        </a>

      </div>

      {/* ── HIGH FIDELITY PRINT-ONLY EXECUTIVE DETAILED CV LAYOUT ── */}
      <div className={`${printType === "cv" ? "print:block" : ""} hidden text-[#1e293b] bg-white p-4 md:p-8 font-sans leading-relaxed text-[9.5pt]`}>
        
        {/* 1. HEADER */}
        <div className="flex justify-between items-start border-b-[2.5px] border-[#111] pb-3.5 mb-5">
          <div className="space-y-1 max-w-[65%]">
            <h1 className="text-[22pt] font-extrabold text-[#111] uppercase tracking-wide leading-none">
              SOPHORN LIM
            </h1>
            <p className="text-[10pt] font-semibold text-[#111] tracking-wide leading-snug">
              IT Support Lead | Data Management & Information Systems
            </p>
          </div>
          <div className="text-right text-[8.5pt] text-[#111] space-y-0.5 font-medium leading-normal">
            <div>069 767 696 / 012 964 495 / 0717 111 007</div>
            <div className="text-[#111] font-semibold">sophornlimnpa@gmail.com</div>
            <div>Phnom Penh, Cambodia</div>
          </div>
        </div>

        {/* 2. PROFESSIONAL SUMMARY */}
        <div className="space-y-2 mb-5">
          <h2 className="text-[11pt] font-bold text-[#111] border-b-[1.5px] border-[#111] pb-0.5 tracking-wider uppercase">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-[9pt] text-[#111] leading-relaxed text-justify">
            Dedicated IT and Data Management professional with over 20 years of experience spanning health information systems, geospatial data management, humanitarian operations, and IT infrastructure. Proven track record with the World Health Organization (WHO) in developing surveillance systems, mobile applications, and dashboards using DHIS2, ArcGIS, and Go.Data. Adept at leading technical teams, building capacity, and driving data-driven decision-making in complex environments.
          </p>
        </div>

        {/* 3. EXPERIENCE */}
        <div className="space-y-3 mb-5">
          <h2 className="text-[11pt] font-bold text-[#111] border-b-[1.5px] border-[#111] pb-0.5 tracking-wider uppercase">
            PROFESSIONAL EXPERIENCE
          </h2>

          <div className="space-y-4">
            {workExperiences.map((exp) => (
              <div key={exp.id} className="space-y-1 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[9.5pt] font-bold text-[#111]">
                    {exp.organization} <span className="text-[#111]/70 font-normal">| {exp.location}</span>
                  </h3>
                  <span className="text-[8.5pt] font-semibold text-[#111] whitespace-nowrap">{exp.period}</span>
                </div>
                <div className="text-[9pt] font-bold text-[#111] italic">
                  {exp.role}
                </div>
                <ul className="list-disc pl-5 text-[8.5pt] text-[#111] space-y-0.5">
                  {exp.description.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 4. EDUCATION */}
        <div className="space-y-2 mb-5">
          <h2 className="text-[11pt] font-bold text-[#111] border-b-[1.5px] border-[#111] pb-0.5 tracking-wider uppercase">
            EDUCATION
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="font-bold text-[#111] text-[9pt]">Master of Science in Information Technology (M.Sc. IT)</span>
                <span className="text-[#111] text-[8.5pt]"> | Build Bright University, Phnom Penh</span>
              </div>
              <span className="text-[8.5pt] font-semibold text-[#111]">2025 – Present</span>
            </div>
            <div className="flex justify-between items-baseline">
              <div>
                <span className="font-bold text-[#111] text-[9pt]">Bachelor of Science in Information Technology (B.Sc. IT)</span>
                <span className="text-[#111] text-[8.5pt]"> | Build Bright University, Siem Reap</span>
              </div>
              <span className="text-[8.5pt] font-semibold text-[#111]">2007 – 2011</span>
            </div>
            <div className="flex justify-between items-baseline">
              <div>
                <span className="font-bold text-[#111] text-[9pt]">Baccalaureate (Grade 12)</span>
                <span className="text-[#111] text-[8.5pt]"> | Kampong Thom High School, Kampong Thom Province</span>
              </div>
              <span className="text-[8.5pt] font-semibold text-[#111]">2001 – 2003</span>
            </div>
          </div>
        </div>

        {/* 5. CERTIFICATIONS */}
        <div className="space-y-2 mb-5">
          <h2 className="text-[11pt] font-bold text-[#111] border-b-[1.5px] border-[#111] pb-0.5 tracking-wider uppercase">
            CERTIFICATIONS & PROFESSIONAL TRAINING
          </h2>
          <ul className="list-disc pl-5 text-[8.5pt] text-[#111] space-y-0.5">
            <li>CISCO CCNA2 – Network Engineering Certificate</li>
            <li>Microsoft SharePoint Management & Data Visualization</li>
            <li>Full Stack Web Application Development</li>
            <li>Mobile Application Development Using AI</li>
            <li>Geographic Information Systems (GIS) – ArcGIS & QGIS</li>
            <li>Advanced Drone Operation with Terrain and Imagery Analysis</li>
            <li>Operation Efficiency Management & Leadership</li>
            <li>General English Training (Level IV) – Learn for Life International School, Siem Reap</li>
          </ul>
        </div>

        {/* 6. TECHNICAL SKILLS */}
        <div className="space-y-2 mb-5">
          <h2 className="text-[11pt] font-bold text-[#111] border-b-[1.5px] border-[#111] pb-0.5 tracking-wider uppercase">
            TECHNICAL SKILLS
          </h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3.5">
            <div className="space-y-1">
              <h4 className="font-bold text-[#111] text-[9pt] uppercase tracking-wide">Health Information Systems</h4>
              <ul className="list-disc pl-4 text-[#111] text-[8.5pt] space-y-0.5">
                <li>DHIS2 (Tracker, Dashboards, Analytics)</li>
                <li>Go.Data Platform</li>
                <li>MEDB / Malaria Elimination Database</li>
                <li>Surveillance & Epidemiology Reporting</li>
              </ul>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-[#111] text-[9pt] uppercase tracking-wide">Software Development</h4>
              <ul className="list-disc pl-4 text-[#111] text-[8.5pt] space-y-0.5">
                <li>HTML / Web Application Development</li>
                <li>Mobile Application Development</li>
                <li>Full Stack Development</li>
                <li>Database Design & Management</li>
              </ul>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-[#111] text-[9pt] uppercase tracking-wide">Geospatial & Data Tools</h4>
              <ul className="list-disc pl-4 text-[#111] text-[8.5pt] space-y-0.5">
                <li>ArcGIS Desktop & Online</li>
                <li>QGIS</li>
                <li>Survey123</li>
                <li>GPS & Field Data Collection</li>
              </ul>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-[#111] text-[9pt] uppercase tracking-wide">IT & Infrastructure</h4>
              <ul className="list-disc pl-4 text-[#111] text-[8.5pt] space-y-0.5">
                <li>Network Administration (CCNA)</li>
                <li>Microsoft SharePoint</li>
                <li>Computer Maintenance & Support</li>
                <li>IT Team Leadership</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 7. LANGUAGES */}
        <div className="space-y-2 mb-5">
          <h2 className="text-[11pt] font-bold text-[#113a70] border-b-[1.5px] border-slate-300 pb-0.5 tracking-wider uppercase">
            LANGUAGES
          </h2>
          <div className="flex gap-x-16 text-[9.5pt]">
            <div>
              <span className="font-bold text-slate-900">Khmer</span>
              <span className="text-slate-600 font-normal"> – Native / Mother Tongue</span>
            </div>
            <div>
              <span className="font-bold text-slate-900">English</span>
              <span className="text-slate-600 font-normal"> – Proficient (Read, Write, Speak)</span>
            </div>
          </div>
        </div>

        {/* 8. REFERENCES */}
        <div className="space-y-2 mb-2">
          <h2 className="text-[11pt] font-bold text-[#113a70] border-b-[1.5px] border-slate-300 pb-0.5 tracking-wider uppercase">
            REFERENCES
          </h2>
          <div className="grid grid-cols-3 gap-3 text-[8pt] leading-normal pt-1.5">
            <div className="border-l-[1.5px] border-[#113a70]/50 pl-3 space-y-0.5">
              <p className="font-bold text-slate-900 text-[8.5pt]">Mr. IENG Vanra</p>
              <p className="text-slate-600 font-semibold leading-tight">Technical Officer, Information System & Surveillance</p>
              <p className="text-slate-500 text-[7.5pt]">WHO Health Emergencies (WHE), Cambodia</p>
              <p className="text-[#1a6b8a] font-semibold mt-1">Tel: +855 12 905 530</p>
              <p className="text-[#113a70] font-medium">iengv@who.int</p>
            </div>
            <div className="border-l-[1.5px] border-[#113a70]/50 pl-3 space-y-0.5">
              <p className="font-bold text-slate-900 text-[8.5pt]">Mr. TRY Rady</p>
              <p className="text-slate-600 font-semibold leading-tight">Technical Officer, Database Manager</p>
              <p className="text-slate-500 text-[7.5pt]">WHO Mekong Malaria Elimination (MME), Cambodia</p>
              <p className="text-[#1a6b8a] font-semibold mt-1">Tel: +855 17 891 415</p>
              <p className="text-[#113a70] font-medium">tryr@who.int</p>
            </div>
            <div className="border-l-[1.5px] border-[#113a70]/50 pl-3 space-y-0.5">
              <p className="font-bold text-slate-900 text-[8.5pt]">Mr. NOU Panharith</p>
              <p className="text-slate-600 font-semibold leading-tight">Emergency Operations Center Project Manager</p>
              <p className="text-slate-500 text-[7.5pt]">PSI Cambodia</p>
              <p className="text-[#1a6b8a] font-semibold mt-1">Tel: +855 12 662 268</p>
              <p className="text-[#113a70] font-medium">npanharith@psi.org.kh</p>
            </div>
          </div>
        </div>

      </div>

      {/* ── HIGH FIDELITY PRINT-ONLY COVER LETTER LAYOUT ── */}
      <div className={`${printType === "cover_letter" ? "print:block" : ""} hidden text-[#000] bg-white p-8 font-sans leading-relaxed text-[11pt] max-w-[700px] print:max-w-none mx-auto print:mx-0`}>
        {/* Header matching PDF structure */}
        <div className="mb-6">
          <h1 className="text-[20pt] font-extrabold uppercase text-[#000] tracking-wide leading-none mb-1">
            {clSenderName}
          </h1>
          <p className="text-[10pt] font-semibold text-[#000] tracking-wide leading-snug mb-1">
            {clSenderTitle}
          </p>
          <div className="text-[10pt] text-[#000] space-y-0.5 font-medium">
            <div>☎ {clSenderPhone}</div>
            <div>✉ {clSenderEmail}</div>
            <div>{clSenderLoc}</div>
          </div>
        </div>

        {/* Date */}
        <div className="mb-6 font-medium text-[#000]">
          {clDate}
        </div>

        {/* Recipient */}
        <div className="space-y-0.5 mb-6">
          <div className="font-bold text-[#000]">{clRecipient}</div>
          <div className="font-bold text-[#000]">{clOrg}</div>
          <div className="text-[#000]">{clAddress}</div>
        </div>

        {/* Re */}
        <div className="font-bold text-[#000] mb-6">
          Re: Application for <span className="text-[#000]">{clRole}</span>
        </div>

        {/* Body */}
        <div className="text-justify space-y-4 text-[#000]">
          <p>Dear Hiring Manager,</p>
          <p>{clPara1}</p>
          
          <h3 className="font-bold text-[#000] underline uppercase text-[11pt] mt-4">{clTitle2}</h3>
          <p>{clPara2}</p>
          
          <h3 className="font-bold text-[#000] underline uppercase text-[11pt] mt-4">{clTitle3}</h3>
          <p>{clPara3}</p>
          
          <h3 className="font-bold text-[#000] underline uppercase text-[11pt] mt-4">{clTitle4}</h3>
          <p>{clPara4}</p>
          
          <h3 className="font-bold text-[#000] underline uppercase text-[11pt] mt-4">{clTitle5} {clOrg}</h3>
          <p>{clPara5}</p>

          <p>{clPara6}</p>
          
          <p className="pt-2">{clClosing}</p>

          <div className="pt-3">
            <p>{clSignOff}</p>
            <div className="font-bold text-[#000] pt-4">{clSignOffName}</div>
            <div className="text-[#000] font-medium">{clSignOffTitle}</div>
          </div>
        </div>
      </div>

      {/* ── PRINT INSTRUCTION MODAL (GUARANTEED IFRAME PRINT WORKAROUND) ── */}
      <AnimatePresence>
        {showPrintModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            {/* Backdrop close clicker */}
            <div 
              className="absolute inset-x-0 inset-y-0 cursor-default" 
              onClick={() => setShowPrintModal(false)}
            />
            
            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-md bg-[#0d1e36] border border-[#2e9bbf]/40 rounded-2xl p-6 md:p-8 shadow-2xl z-10 text-left overflow-hidden no-print"
            >
              {/* Animated top spotlight decoration */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-light via-gold to-teal-dark"></div>

              {/* Close Button */}
              <button 
                onClick={() => setShowPrintModal(false)}
                className="absolute top-4 right-4 text-[#8a9bb0] hover:text-white transition-colors p-1 rounded-full hover:bg-white/5 cursor-pointer"
                title="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold">
                  <Printer className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-off-white">Print / Save PDF Guide</h3>
              </div>

              <div className="space-y-4 text-xs md:text-sm text-muted-blue leading-relaxed">
                <p>
                  Because this application is running within a secured browser preview frame (iframe), direct button printing is restricted by browser sandbox constraints.
                </p>
                
                <div className="bg-[#071529]/60 border border-[#2e9bbf]/10 rounded-xl p-4 space-y-3 font-sans">
                  <strong className="text-gold block font-medium uppercase tracking-wider text-[11px]">👉 Recommended Action</strong>
                  <p className="text-[#e8e4dc] leading-relaxed text-xs">
                    Click the button below to secure a clean, standalone tab and auto-trigger your system's native Print/PDF saving engine.
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="font-semibold text-off-white block text-[11px] uppercase tracking-wider text-muted-blue">Or print manually:</span>
                  <p>
                    Open in a new tab, then press <span className="font-mono bg-white/5 px-1.5 py-0.5 rounded text-gold">Ctrl + P</span> (Windows) or <span className="font-mono bg-white/5 px-1.5 py-0.5 rounded text-gold">Cmd + P</span> (Mac).
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={() => {
                    const printUrl = window.location.origin + window.location.pathname + "?print=true&type=" + printType;
                    window.open(printUrl, "_blank");
                    setShowPrintModal(false);
                  }}
                  className="flex-1 py-3 px-5 bg-gold hover:bg-gold-light text-[#071529] font-semibold rounded-xl text-center text-xs tracking-wider uppercase transition-all hover:shadow-lg hover:shadow-gold/10 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Print Automatically
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="py-3 px-5 border border-white/10 hover:border-white/20 hover:bg-white/5 text-[#8a9bb0] hover:text-white font-medium rounded-xl text-center text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
