'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Menu, 
  X, 
  Home, 
  Code, 
  Briefcase, 
  Award, 
  FileText, 
  Mail,
  ChevronRight,
  AlertCircle,
  User,
  AlignEndHorizontal
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  color: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', icon: Home, color: 'amber' },
  { id: 'skills', label: 'Skills', icon: Code, color: 'blue' },
  { id: 'projects', label: 'Projects', icon: Briefcase, color: 'green' },
  { id: 'certificates', label: 'Certificates', icon: Award, color: 'purple' },
  { id: 'experience', label: 'Experience', icon: Briefcase, color: 'orange' },
  { id: 'documents', label: 'Documents', icon: FileText, color: 'amber' },
  { id: 'contact', label: 'Contact', icon: Mail, color: 'emerald' }
];

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NavItem[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const results = navItems.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setShowSearchResults(true);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSelect = (itemId: string) => {
    const element = document.getElementById(itemId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setSearchQuery('');
      setShowSearchResults(false);
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled 
            ? 'bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 shadow-2xl' 
            : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo/Name - Appears on scroll */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isScrolled ? 1 : 0,
                x: isScrolled ? 0 : -20
              }}
              className="flex items-center gap-2"
            >
            
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-amber-500 to-amber-600">
              <Image 
                src={'/profile/maleh.png'}
                width={40}
                height={40}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            </div>
              <span className="text-white font-semibold text-lg sm:block">
                Malcom David
              </span>
            </motion.div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search sections... (e.g., Projects, Skills)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery && setShowSearchResults(true)}
                    className={`
                      w-full pl-10 pr-4 py-2 rounded-lg transition-all duration-300
                      ${isScrolled
                        ? 'bg-gray-800/50 border border-gray-700 focus:bg-gray-800'
                        : 'bg-white/10 backdrop-blur-sm border border-white/20 focus:bg-white/20'
                      }
                      text-white placeholder-gray-400 focus:outline-none focus:border-amber-400
                    `}
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>

                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {showSearchResults && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg border border-gray-700 shadow-2xl overflow-hidden"
                    >
                      {searchResults.length > 0 ? (
                        <div className="py-2">
                          {searchResults.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleSearchSelect(item.id)}
                              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-700/50 transition-colors text-left group"
                            >
                              <div className={`p-1.5 rounded-lg bg-${item.color}-500/20`}>
                                <item.icon className={`w-4 h-4 text-${item.color}-400`} />
                              </div>
                              <span className="text-white flex-1">{item.label}</span>
                              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-amber-400 transition-colors" />
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="px-4 py-6 text-center">
                          <AlertCircle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                          <p className="text-gray-400 text-sm">No sections found matching "{searchQuery}"</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    flex items-center gap-2
                    ${isScrolled
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                      : 'text-gray-300/80 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <item.icon className={`w-4 h-4 text-${item.color}-400`} />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
          >
            <div className="bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 shadow-2xl">
              <div className="px-4 py-4 space-y-4">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search sections..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Mobile Search Results */}
                {searchQuery && (
                  <div className="max-h-60 overflow-y-auto">
                    {navItems.filter(item => 
                      item.label.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length > 0 ? (
                      navItems
                        .filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleSearchSelect(item.id)}
                            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-800 rounded-lg transition-colors"
                          >
                            <div className={`p-1.5 rounded-lg bg-${item.color}-500/20`}>
                              <item.icon className={`w-4 h-4 text-${item.color}-400`} />
                            </div>
                            <span className="text-white flex-1 text-left">{item.label}</span>
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                          </button>
                        ))
                    ) : (
                      <div className="px-4 py-6 text-center">
                        <p className="text-gray-400 text-sm">No sections found</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Mobile Navigation Links */}
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-800 rounded-lg transition-colors group"
                    >
                      <div className={`p-1.5 rounded-lg bg-${item.color}-500/20`}>
                        <item.icon className={`w-4 h-4 text-${item.color}-400`} />
                      </div>
                      <span className="text-white flex-1 text-left">{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-amber-400 transition-colors" />
                    </button>
                  ))}
                </nav>

                {/* Profile Summary */}
                <div className="pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Malcom David</p>
                      <p className="text-xs text-gray-400">Senior Software Engineer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from hiding under header */}
      <div className="h-16 md:h-20" />
    </>
  );
}