'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUp, ChevronUp, ChevronDown } from "lucide-react";
import SkillsCard from "./skillCard";
import NavigationButtons from "./navigationButtons";
// import NavigationButtons from "./navigationButtons";

// Sample skills data - replace with your actual data
const skillsData = [
  { skillName: "React", description: "Building modern, reactive user interfaces with hooks and context" },
  { skillName: "TypeScript", description: "Type-safe development with advanced generic patterns" },
  { skillName: "Node.js", description: "Scalable backend services and RESTful API design" },
  { skillName: "Python", description: "Data processing, automation, and Django applications" },
  { skillName: "PostgreSQL", description: "Database design, optimization, and complex queries" },
  { skillName: "Docker", description: "Containerization and orchestration of microservices" },
  { skillName: "AWS", description: "Cloud infrastructure, Lambda functions, and S3 storage" },
  { skillName: "GraphQL", description: "API design with Apollo and type generation" },
  { skillName: "Next.js", description: "Full-stack React applications with SSR and SSG" },
  { skillName: "Tailwind CSS", description: "Utility-first styling for rapid UI development" },
  { skillName: "Git", description: "Version control and collaborative workflows" },
  { skillName: "Jest", description: "Unit testing and test-driven development" },
];

export default function Skills() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSkills, setFilteredSkills] = useState(skillsData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = skillsData.filter(
      skill => 
        skill.skillName.toLowerCase().includes(term) || 
        skill.description.toLowerCase().includes(term)
    );
    setFilteredSkills(filtered);
  };

  return (
    <section id="skills" className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4 md:px-8 relative">
      {/* Navigation Buttons */}
      <NavigationButtons />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical <span className="text-amber-400">Skills</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A collection of technologies and tools I work with
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          {filteredSkills.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredSkills.map((skill, index) => (
                <SkillsCard
                  key={skill.skillName}
                  skillName={skill.skillName}
                  description={skill.description}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 text-lg">No skills found matching "{searchTerm}"</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skills Count */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-gray-400 text-sm"
        >
          Showing {filteredSkills.length} of {skillsData.length} skills
        </motion.div>
      </div>
    </section>
  );
}