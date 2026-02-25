'use client'
import { motion } from "framer-motion";

interface SkillsCardProps {
  skillName: string;
  description: string;
  index: number;
}

export default function SkillsCard({ skillName, description, index }: SkillsCardProps) {
  // Generate random rotation for sticky note effect
  const rotation = Math.random() * 2 - 1; // Random between -1 and 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.05,
        type: "spring",
        stiffness: 100,
        damping: 12
      }}
      whileHover={{ 
        rotate: 0,
        scale: 1.05,
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
        transition: { type: "spring", stiffness: 400, damping: 17 }
      }}
      style={{ rotate: `${rotation}deg` }}
      className="bg-gradient-to-br from-amber-50 to-yellow-100 p-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200/50 relative overflow-hidden group"
    >
      {/* Sticky note corner fold effect */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-amber-300/20 to-transparent rounded-bl-2xl" />
      
      {/* Push pin effect on hover */}
      <motion.div 
        className="absolute -top-1 -right-1 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ rotate: -45 }}
        whileHover={{ rotate: 0 }}
      >
        <div className="w-3 h-3 bg-red-400 rounded-full shadow-md border border-red-300" />
      </motion.div>

      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-800 border-b-2 border-amber-300/50 pb-2">
          {skillName}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Paper texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20100%20100%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noise%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.65%22%20numOctaves=%221%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%22%20height=%22100%22%20filter=%22url(%23noise)%22%20opacity=%220.08%22/%3E%3C/svg%3E')] opacity-20 pointer-events-none mix-blend-multiply" />
    </motion.div>
  );
}