'use client';

import { Check, CheckCircle, Circle, Smartphone, SquareArrowOutUpRight, Star } from "lucide-react"
import Image from "next/image"
import { motion } from 'framer-motion'
import { OrgProjectCard } from "@/lib/card-utils";
interface projectCardProps {
  project:OrgProjectCard
}

export function EnhancedProjectCard({project}:projectCardProps) {
  return (
    <motion.div
      className="relative group max-w-74 max-h-94 flex justify-center overflow-hidden cursor-pointer"
      style={{
        padding: 16,
        borderRadius: 30,
        boxShadow: '0 1px 3px hsla(var(--shadow-color), var(--shadow-opacity))',
        borderStyle: 'solid',
      }}
      // Hover animations
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      // Tap animation
      whileTap={{ scale: 0.98 }}
      // Initial animation when component mounts
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={project.display_photo_url as string}
        alt="card image"
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <div className="absolute bg-black/60 inset-0" />
      
      <div className="relative w-70 h-90 p-2 flex justify-between flex-col">
        {/* Top Section with Staggered Children */}
        <motion.div 
          className="text-white"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 }
            }}
            className="flex justify-end"
          >
            <Star height={18} width={18} />
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex flex-col items-center w-full justify-center"
          >
            <h1 className="text-3xl font-medium">{project.proj_name}</h1>
            <div className="flex gap-1">
              <Smartphone height={16} width={16} />
              <h3 className="text-xs">{project.project_type}</h3>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="text-white"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            className="p-2 mb-2"
          >
            <p className="text-xs">
              {project.project_description}
            </p>
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex justify-between"
          >
            <motion.div 
              className="flex gap-1 justify-center items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CheckCircle color="#32ed0c" height={16} width={16} />
              <p className="text-xs">Completed</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="flex gap-1 bg-white text-black p-2 max-h-9 rounded-xl text-sm cursor-pointer hover:bg-amber-100">
                <p className="text-xs font-bold">Check it out</p>
                <SquareArrowOutUpRight color="#000000" height={16} width={16} />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}