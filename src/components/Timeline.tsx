import React, { useState } from "react";
import { workExperiences } from "../data";
import { WorkExperience } from "../types";
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Link as LinkIcon, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Timeline() {
  const [filter, setFilter] = useState<"all" | "who" | "npa" | "gis" | "mgmt">("all");
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    "who-mme-2025": true, // Expand the first item by default
  });

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredExperiences = workExperiences.filter(exp => {
    if (filter === "all") return true;
    if (filter === "who") return exp.organization.toLowerCase().includes("world health");
    if (filter === "npa") return exp.organization.toLowerCase().includes("norwegian");
    if (filter === "gis") return exp.tags.some(t => t.toLowerCase().includes("gis") || t.toLowerCase().includes("arcgis") || t.toLowerCase().includes("map"));
    if (filter === "mgmt") return exp.role.toLowerCase().includes("manager") || exp.tags.some(t => t.toLowerCase().includes("leadership") || t.toLowerCase().includes("operations"));
    return true;
  });

  return (
    <div className="space-y-6" id="history-timeline-component">
      {/* Filters bar */}
      <div className="flex flex-wrap items-center gap-1.5 bg-deep/80 border border-teal-dark/30 p-1.5 rounded-xl justify-center sm:justify-start">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all ${
            filter === "all" ? "bg-teal-dark text-white shadow-md shadow-teal-dark/15" : "text-muted-blue hover:text-white"
          }`}
        >
          All Experience
        </button>
        <button
          onClick={() => setFilter("who")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all ${
            filter === "who" ? "bg-teal-dark text-white shadow-md shadow-teal-dark/15" : "text-muted-blue hover:text-white"
          }`}
        >
          WHO Roles
        </button>
        <button
          onClick={() => setFilter("npa")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all ${
            filter === "npa" ? "bg-teal-dark text-white shadow-md shadow-teal-dark/15" : "text-muted-blue hover:text-white"
          }`}
        >
          NPA Careers
        </button>
        <button
          onClick={() => setFilter("gis")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all ${
            filter === "gis" ? "bg-teal-dark text-white shadow-md shadow-teal-dark/15" : "text-muted-blue hover:text-white"
          }`}
        >
          GIS &amp; Mapping Focus
        </button>
        <button
          onClick={() => setFilter("mgmt")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all ${
            filter === "mgmt" ? "bg-teal-dark text-white shadow-md shadow-teal-dark/15" : "text-muted-blue hover:text-white"
          }`}
        >
          Management &amp; Leadership
        </button>
      </div>

      {/* Vertical Timeline Card Deck */}
      <div className="relative border-l border-teal-dark/25 pl-4 sm:pl-8 ml-2 sm:ml-4 space-y-8">
        <AnimatePresence mode="popLayout">
          {filteredExperiences.map((exp, index) => {
            const isExpanded = !!expandedIds[exp.id];
            return (
              <motion.div
                layout
                key={exp.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="relative bg-navy/60 hover:bg-navy/85 border border-teal-dark/20 hover:border-teal-light/25 rounded-xl p-5 shadow-lg transition-all"
              >
                {/* Visual marker dot on left axis line */}
                <div className="absolute -left-[22px] sm:-left-[38px] top-6 w-3 h-3 rounded-full bg-deep border-2 border-gold flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-gold animate-ping"></span>
                </div>

                {/* Card Title Header */}
                <div
                  className="flex items-start justify-between gap-4 cursor-pointer select-none"
                  onClick={() => toggleExpand(exp.id)}
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase py-0.5 px-2 rounded bg-gold/10 text-gold border border-gold/20">
                        {exp.period}
                      </span>
                      {exp.location && (
                        <span className="text-[10px] font-sans text-muted-blue flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-teal-light" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                    
                    <h4 className="font-display font-bold text-base text-off-white tracking-tight pt-1">
                      {exp.role}
                    </h4>

                    <div className="text-xs font-semibold text-teal-light">
                      {exp.organization}
                    </div>
                  </div>

                  <button className="text-muted-blue hover:text-gold transition-colors shrink-0 mt-2 p-1 rounded hover:bg-teal-dark/10">
                    {isExpanded ? <ChevronUp className="w-4.5 h-4.5" /> : <ChevronDown className="w-4.5 h-4.5" />}
                  </button>
                </div>

                {/* Subheading Bullet items */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-3 border-t border-teal-dark/20 space-y-3">
                        <ul className="space-y-2.5">
                          {exp.description.map((desc, idx) => (
                            <li key={idx} className="text-xs text-muted-blue/90 leading-relaxed flex items-start gap-2">
                              <span className="text-gold font-bold mt-0.5 shrink-0">–</span>
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Interactive Tags matching current role */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {exp.tags.map((tg, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] font-mono tracking-wide bg-deep border border-teal-light/5 text-teal-light px-2.5 py-1 rounded"
                            >
                              {tg}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
