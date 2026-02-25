'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUp, XCircle } from 'lucide-react';
import { ProjectCardSkeleton } from '@/components/skeletons/ProjectCardSkeleton';
import { SearchFilter } from '@/components/SearchFilter';
import { EnhancedProjectCard } from '@/components/cards/EnhancedProjectCard';
import { OrgProjectCard } from '@/lib/card-utils';
import { useProjectCard } from '@/hooks/project/useProjectCard';


function ProjectsGrid({ searchQuery, setSearchQuery }: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  const {loading,filteredProjects} = useProjectCard();
   const gridRef = useRef(null);
  // Loading skeletons with animation
  if (loading) {
    return (
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <ProjectCardSkeleton />
          </motion.div>
        ))}
      </motion.div>
    );
  }
// if(error){
//   return(
//   <div className='bg-amber-100 text-red-600 p-3'>
//     {error}
//   </div>)
// }
  // Empty state with clear button
  if (filteredProjects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="py-12 text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="flex justify-center mb-4"
        >
          <XCircle className="h-16 w-16 text-muted-foreground" />
        </motion.div>
        <p className="text-lg text-muted-foreground">
          {searchQuery ? 'No projects found matching your search' : 'No projects found'}
        </p>
        {searchQuery && (
          <motion.button
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSearchQuery('');
              window.history.pushState({}, '', window.location.pathname);
            }}
          >
            <XCircle className="h-4 w-4" />
            Clear search
          </motion.button>
        )}
      </motion.div>
    );
  }

  // Projects grid – always visible, with staggered entrance animation
  return (
    <motion.div
      ref={gridRef}
      className="grid justify-items-center grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
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
      {filteredProjects.map((project) => (
        <motion.div
          key={String(project.project_id)}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 100, damping: 12 }
            }
          }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <EnhancedProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setShowBackToTop(latest > 0.3);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.2 }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.main
      className="min-h-screen bg-background overflow-x-hidden"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background gradient */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb, 0,0,0), 0.05), transparent 50%)',
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
          opacity: useTransform(scrollYProgress, [0, 0.5], [0.5, 0]),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          style={{ y: headerY, opacity: headerOpacity, scale: headerScale }}
          className="mb-8 text-center md:text-left"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-foreground"
            variants={childVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Our Projects
          </motion.h1>
          <motion.p
            className="mt-2 text-muted-foreground text-lg"
            variants={childVariants}
          >
            Explore our innovative solutions and successful deliveries
          </motion.p>
          <motion.div
            className="h-1 bg-primary mt-4 rounded-full mx-auto md:mx-0"
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>

        {/* Search */}
        <motion.div
          variants={childVariants}
          className="mb-8"
          animate={{ scale: isSearchFocused ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div whileHover={{ scale: 1.01 }} className="relative">
            <SearchFilter
              onSearch={setSearchQuery}
              placeholder="Search by project name, technology..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </motion.div>
          <AnimatePresence>
            {searchQuery && (
              <motion.p
                className="text-sm text-muted-foreground mt-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Searching for: "{searchQuery}"
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Projects Grid */}
        <motion.div variants={childVariants}>
          <Suspense
            fallback={
              <motion.div
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <ProjectCardSkeleton />
                  </motion.div>
                ))}
              </motion.div>
            }
          >
            <ProjectsGrid searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </Suspense>
        </motion.div>

        {/* Back to top */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg z-50 hover:bg-primary/90"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleBackToTop}
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}