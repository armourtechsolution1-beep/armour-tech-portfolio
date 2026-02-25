'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronUp, 
  ChevronDown,
  Home, 
  Code, 
  Briefcase, 
  Award, 
  FileText,
  Mail,
  Users,
  Circle,
  ChevronsUp
} from "lucide-react";

export default function NavigationButtons() {
  const [activeSection, setActiveSection] = useState('hero');
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    { id: 'hero', icon: Home, label: 'Home', color: 'amber' },
    { id: 'skills', icon: Code, label: 'Skills', color: 'blue' },
    { id: 'projects', icon: Briefcase, label: 'Projects', color: 'green' },
    { id: 'certificates', icon: Award, label: 'Certificates', color: 'purple' },
    { id: 'experience', icon: Briefcase, label: 'Experience', color: 'orange' },
    { id: 'documents', icon: FileText, label: 'Documents', color: 'amber' },
    { id: 'contact', icon: Mail, label: 'Contact', color: 'emerald' }
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Show navigation after scrolling a bit
      setIsVisible(window.scrollY > 300);

      // Find active section
      const scrollPosition = window.scrollY + 200; // Offset for better detection
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update visible sections (previous, current, next)
  useEffect(() => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    const prevSection = sections[currentIndex - 1]?.id;
    const nextSection = sections[currentIndex + 1]?.id;
    
    const visible = [];
    if (prevSection) visible.push(prevSection);
    visible.push(activeSection);
    if (nextSection) visible.push(nextSection);
    
    setVisibleSections(visible);
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSectionIndex = (sectionId: string) => {
    return sections.findIndex(s => s.id === sectionId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3"
    >
      {/* Scroll to Top Button - Always visible when scrolled */}
      <motion.button
        whileHover={{ scale: 1.1, x: 2 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToTop}
        className="group relative"
        title="Back to Top"
      >
        <div className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-amber-400 transition-all duration-300 shadow-lg">
          <ChevronsUp className="w-5 h-5 text-white/70 group-hover:text-amber-400" />
        </div>
        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-gray-700">
          Scroll to Top
        </span>
      </motion.button>

      {/* Divider */}
      <div className="h-px w-8 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto" />

      {/* Dynamic Navigation Buttons - Only 3 at a time */}
      <AnimatePresence mode="wait">
        {visibleSections.map((sectionId, index) => {
          const section = sections.find(s => s.id === sectionId)!;
          const isCurrent = sectionId === activeSection;
          const position = index === 0 ? 'previous' : index === 1 ? 'current' : 'next';
          
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="relative"
            >
              <motion.button
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(section.id)}
                className="group relative"
                title={`Go to ${section.label}`}
              >
                {/* Button with dynamic styling based on position/current */}
                <div className={`
                  p-3 backdrop-blur-sm rounded-lg border transition-all duration-300
                  ${isCurrent 
                    ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20' 
                    : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                  }
                `}>
                  <section.icon className={`
                    w-5 h-5 transition-all duration-300
                    ${isCurrent 
                      ? 'text-amber-400' 
                      : 'text-white/70 group-hover:text-white'
                    }
                  `} />
                </div>

                {/* Position Indicator (for current section) */}
                {isCurrent && (
                  <motion.div 
                    className="absolute -left-1 top-1/2 -translate-y-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="w-2 h-2 bg-amber-400 rounded-full" />
                  </motion.div>
                )}

                {/* Tooltip with section name and position context */}
                <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-gray-700 flex items-center gap-1">
                  {position === 'previous' && <ChevronUp className="w-3 h-3 text-gray-400" />}
                  {position === 'next' && <ChevronDown className="w-3 h-3 text-gray-400" />}
                  <span className={isCurrent ? 'text-amber-400' : ''}>{section.label}</span>
                  {isCurrent && <span className="text-amber-400 text-[10px]">(current)</span>}
                </span>
              </motion.button>

              {/* Section Progress Indicator (for current) */}
              {isCurrent && (
                <motion.div 
                  className="absolute -right-1 top-1/2 -translate-y-1/2 flex flex-col gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-1 h-1 bg-amber-400/50 rounded-full" />
                  <div className="w-1 h-1 bg-amber-400 rounded-full" />
                  <div className="w-1 h-1 bg-amber-400/50 rounded-full" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Scroll to Next Section Button (when at bottom) */}
      {activeSection === sections[sections.length - 1].id && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="group relative mt-2"
          title="Back to Top"
        >
          <div className="p-3 bg-gradient-to-br from-amber-500/10 to-amber-600/10 backdrop-blur-sm rounded-lg border border-amber-500/30 hover:border-amber-400 transition-all duration-300">
            <ChevronUp className="w-5 h-5 text-amber-400" />
          </div>
          <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-gray-700">
            Back to Top
          </span>
        </motion.button>
      )}

      {/* Mini Section Map (for context) */}
      <div className="absolute left-14 top-1/2 -translate-y-1/2 ml-2 hidden lg:block">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-2">
          <div className="space-y-2">
            {sections.map((section, i) => {
              const isActive = section.id === activeSection;
              const isInVisible = visibleSections.includes(section.id);
              
              return (
                <div
                  key={section.id}
                  className={`
                    flex items-center gap-2 transition-all duration-300 cursor-pointer
                    ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'}
                  `}
                  onClick={() => scrollToSection(section.id)}
                >
                  <div className={`
                    w-1.5 h-1.5 rounded-full transition-all duration-300
                    ${isActive 
                      ? 'bg-amber-400 w-3' 
                      : isInVisible 
                        ? 'bg-white' 
                        : 'bg-gray-600'
                    }
                  `} />
                  {isActive && (
                    <span className="text-xs text-amber-400 font-medium whitespace-nowrap">
                      {section.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}