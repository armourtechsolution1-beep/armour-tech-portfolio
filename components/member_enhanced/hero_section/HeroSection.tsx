'use client'
import { ArrowDownCircle, Github, Linkedin, Mail, FileText, Award, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  const scrollToSkills = () => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const statCardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0, rotate: -5 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.5,
      },
    },
    hover: {
      scale: 1.02,
      rotate: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const linkVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      x: 5,
      color: "#ffffff",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-[#020202] overflow-hidden">
      {/* Background Image with Overlay */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/profile/bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute inset-0 bg-black/70"
        />
      </motion.div>

      {/* Floating Scroll Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={scrollToSkills}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 group cursor-pointer"
        aria-label="Scroll to skills section"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDownCircle 
              size={32} 
              className="text-white/60 group-hover:text-white transition-colors duration-300" 
            />
          </motion.div>
          <motion.span 
            className="text-white/60 text-xs tracking-widest uppercase group-hover:text-white transition-colors duration-300"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            Explore
          </motion.span>
        </div>
      </motion.button>

      {/* Main Content Container - Scrollable on Mobile with thin scrollbar */}
      <style jsx>{`
        .thin-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .thin-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .thin-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 min-h-screen"
      >
        <div className="min-h-screen px-4 md:px-8 lg:px-12 py-8 flex items-center">
          
          {/* Grid Layout */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 w-full max-w-7xl mx-auto"
          >
            
            {/* Left Column - Name & Title */}
            <motion.div variants={itemVariants} className="lg:col-span-5 space-y-4 md:space-y-6">
              <div className="space-y-2">
                <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                  {["MALCOM", "DAVID", "APUNDA"].map((name, index) => (
                    <motion.span
                      key={name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="block hover:tracking-wider transition-all duration-300"
                      whileHover={{ 
                        color: "#fff",
                        x: 10,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                    >
                      {name}
                    </motion.span>
                  ))}
                </motion.h1>
                <motion.p 
                  variants={itemVariants}
                  className="text-lg md:text-xl text-white/80 font-light tracking-wide"
                >
                  Senior Software Engineer
                </motion.p>
              </div>

              {/* Profile Image - Mobile Only (hidden on desktop) */}
              <motion.div 
                variants={imageVariants}
                whileHover="hover"
                className="lg:hidden relative w-48 h-48 md:w-56 md:h-56 mt-4"
              >
                <motion.div 
                  className="absolute inset-0 rounded-2xl border-4 border-white/20"
                  animate={{ rotate: [0, 1, -1, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                />
                <div className="absolute inset-2 rounded-xl overflow-hidden border-2 border-white/30 shadow-2xl">
                  <Image
                    src="/profile/Maleh.jpeg"
                    alt="Malcom David Apunda"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Objective - Mobile/Tablet */}
              <motion.p 
                variants={itemVariants}
                className="text-white/70 text-sm md:text-base max-w-md lg:hidden"
              >
                <span className="font-semibold text-white">Objective:</span> Software Engineer to drive the economy to a safe place
              </motion.p>
            </motion.div>

            {/* Right Column - Professional Summary & Stats */}
            <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
              <motion.div 
                variants={itemVariants}
                className="space-y-3"
              >
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-sm font-semibold text-white/50 tracking-wider"
                >
                  PROFESSIONAL SUMMARY
                </motion.h2>
                <motion.p 
                  variants={itemVariants}
                  className="text-white/80 text-sm md:text-base leading-relaxed"
                >
                  Innovative Software Engineer with 4+ years of experience architecting scalable solutions. 
                  Passionate about leveraging technology to drive economic growth and create meaningful impact 
                  through robust software systems.
                </motion.p>
              </motion.div>

              {/* Stats Grid */}
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-3 gap-3"
              >
                {[
                  { icon: Briefcase, value: "5", label: "Projects" },
                  { icon: FileText, value: "4+", label: "Years" },
                  { icon: Award, value: "3", label: "Certs" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={statCardVariants}
                    whileHover="hover"
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 cursor-default"
                  >
                    <stat.icon className="w-4 h-4 text-white/60 mb-1" />
                    <motion.div 
                      className="text-xl font-bold text-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + index * 0.1, type: "spring" }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs text-white/50">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Quick Links */}
              <motion.div 
                variants={itemVariants}
                className="space-y-2"
              >
                <h3 className="text-xs font-semibold text-white/50 tracking-wider">EXPLORE</h3>
                <div className="flex flex-wrap gap-4">
                  {['Skills', 'Projects', 'Technologies', 'Experience'].map((item, index) => (
                    <motion.div
                      key={item}
                      variants={linkVariants}
                      whileHover="hover"
                      custom={index}
                    >
                      <Link
                        href={`#${item.toLowerCase()}`}
                        className="text-white/70 hover:text-white text-sm transition-colors duration-200 border-b border-white/20 hover:border-white/30 pb-0.5"
                      >
                        {item}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Third Column - Profile Image (Desktop) & Contact */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-2 space-y-6"
            >
              {/* Profile Image - Desktop Only - Square with border radius */}
              <motion.div 
                variants={imageVariants}
                whileHover="hover"
                className="hidden lg:block relative w-48 h-48 xl:w-56 xl:h-56 ml-auto"
              >
                <motion.div 
                  className="absolute inset-0 rounded-2xl border-4 border-white/20"
                  animate={{ rotate: [0, 1, -1, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                />
                <div className="absolute inset-2 rounded-xl overflow-hidden border-2 border-white/30 shadow-2xl">
                  <Image
                    src="/profile/Maleh.jpeg"
                    alt="Malcom David Apunda"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Contact & Social Links */}
              <motion.div 
                variants={itemVariants}
                className="space-y-3"
              >
                <h3 className="text-xs font-semibold text-white/50 tracking-wider">CONNECT</h3>
                <div className="space-y-2">
                  {[
                    { href: "https://github.com/yourusername", icon: Github, label: "GitHub" },
                    { href: "https://linkedin.com/in/yourusername", icon: Linkedin, label: "LinkedIn" },
                    { href: "mailto:malcomdavid@gmail.com", icon: Mail, label: "malcomdavid@gmail.com" }
                  ].map((social, index) => (
                    <motion.div
                      key={social.label}
                      variants={linkVariants}
                      whileHover="hover"
                      custom={index}
                    >
                      <Link 
                        href={social.href}
                        target={social.href.startsWith('http') ? "_blank" : undefined}
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 group"
                      >
                        <motion.div 
                          className="p-1.5 bg-white/5 rounded-md group-hover:bg-white/10"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <social.icon size={16} />
                        </motion.div>
                        <span className="text-sm">{social.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}