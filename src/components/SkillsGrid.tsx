import React, { useState } from "react";
import { skillCategories, certifications } from "../data";
import { Search, Trophy, CheckSquare, Award } from "lucide-react";
import { motion } from "motion/react";

export default function SkillsGrid() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = skillCategories.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="space-y-8" id="skills-grid-component">
      {/* Search Input HUD */}
      <div className="bg-navy/55 border border-teal-dark/30 rounded-xl p-4 flex flex-col sm:flex-row gap-4 justify-between items-center backdrop-blur-sm">
        <div className="text-center sm:text-left">
          <h4 className="font-sans font-bold text-sm text-off-white">Skills Matrix Filter Grid</h4>
          <p className="text-muted-blue text-[11px] mt-0.5">Filter items dynamically using the real-time search utility below.</p>
        </div>
        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-muted-blue" />
          <input
            type="text"
            placeholder="Search competencies (e.g. DHIS2, ArcGIS)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-deep border border-teal-dark/40 rounded-lg pl-10 pr-4 py-2 text-xs text-off-white focus:border-gold transition-all outline-none"
          />
        </div>
      </div>

      {/* Dynamic Skill Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat, idx) => (
            <motion.div
              layout
              key={cat.category}
              className="bg-navy/80 border border-teal-dark/25 rounded-xl p-5 hover:border-teal-light/45 transition-all shadow-md group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-teal-dark to-gold opacity-30 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-xl">{cat.icon}</span>
                <h4 className="font-display font-bold text-[14px] text-gold uppercase tracking-wider">
                  {cat.category}
                </h4>
              </div>

              <ul className="space-y-2.5">
                {cat.items.map((item, idy) => (
                  <li key={idy} className="text-xs text-muted-blue/90 flex items-start gap-2 leading-relaxed">
                    <span className="text-teal-light font-bold text-[10px] mt-0.5 shrink-0">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-muted-blue border border-dashed border-teal-dark/20 rounded-xl bg-navy/20">
            No matching capabilities discovered in the profile directory. Just try another search indicator.
          </div>
        )}
      </div>

      {/* Specialized Certification Badges */}
      <div className="bg-navy/70 border border-teal-dark/30 rounded-2xl p-6 shadow-lg">
        <h4 className="font-display font-bold text-sm text-off-white uppercase tracking-widest flex items-center gap-2 mb-4 border-b border-teal-dark/25 pb-3">
          <Award className="w-4 h-4 text-gold" />
          Credentials &amp; Training Badges List
        </h4>
        <div className="flex flex-wrap gap-2.5">
          {certifications.map((cert, idx) => {
            const isMatch = cert.toLowerCase().includes(searchQuery.toLowerCase());
            return (
              <span
                key={idx}
                className={`text-[11px] font-sans px-3.5 py-1.5 rounded-md border transition-all cursor-default ${
                  isMatch
                    ? "bg-teal-dark/15 text-teal-light border-teal-light/35 shadow-sm shadow-teal-light/5"
                    : "opacity-35 text-muted-blue/50 border-teal-dark/15"
                }`}
              >
                {cert}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
