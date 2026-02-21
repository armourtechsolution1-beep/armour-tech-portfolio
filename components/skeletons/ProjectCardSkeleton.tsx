'use client';

import { motion } from 'framer-motion';
import { Smartphone, Star } from 'lucide-react';

interface ProjectCardSkeletonProps {
  variant?: 'default' | 'minimal' | 'detailed';
}

export function ProjectCardSkeleton({ variant = 'default' }: ProjectCardSkeletonProps) {
  const skeletonVariants = {
    default: (
      <>
        {/* Image Skeleton */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-muted via-muted/80 to-muted animate-pulse" />
        </div>
        
        {/* Overlay Skeleton */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/10 animate-pulse" />
        
        {/* Content */}
        <div className="relative w-70 h-90 p-2 flex justify-between flex-col">
          {/* Top Section */}
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="h-5 w-5 rounded-full bg-muted/30 animate-pulse" />
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="h-8 w-32 bg-muted/30 rounded-lg animate-pulse" />
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 rounded-full bg-muted/30 animate-pulse" />
                <div className="h-3 w-20 bg-muted/30 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="h-2 w-full bg-muted/30 rounded animate-pulse" />
              <div className="h-2 w-5/6 bg-muted/30 rounded animate-pulse" />
              <div className="h-2 w-4/6 bg-muted/30 rounded animate-pulse" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 rounded-full bg-muted/30 animate-pulse" />
                <div className="h-3 w-14 bg-muted/30 rounded animate-pulse" />
              </div>
              <div className="h-7 w-20 bg-muted/30 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </>
    ),

    minimal: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    ),

    detailed: (
      <>
        {/* More detailed skeleton with icon placeholders */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-muted animate-pulse" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="relative w-70 h-90 p-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="h-6 w-16 bg-muted/40 rounded-full animate-pulse" />
              <div className="h-5 w-5 bg-muted/40 rounded-full animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-8 w-36 bg-muted/40 rounded-lg animate-pulse mx-auto" />
              <div className="flex justify-center gap-2">
                <div className="h-4 w-4 bg-muted/40 rounded-full animate-pulse" />
                <div className="h-3 w-28 bg-muted/40 rounded animate-pulse" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-2 w-full bg-muted/40 rounded animate-pulse" />
              <div className="h-2 w-11/12 bg-muted/40 rounded animate-pulse" />
              <div className="h-2 w-10/12 bg-muted/40 rounded animate-pulse" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-emerald-500/30 rounded-full animate-pulse" />
                <div className="h-3 w-16 bg-muted/40 rounded animate-pulse" />
              </div>
              <div className="h-8 w-24 bg-white/20 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </>
    ),
  };

  return (
    <motion.div
      className="relative max-w-74 max-h-94 flex justify-center overflow-hidden"
      style={{
        padding: 16,
        borderRadius: 30,
        borderStyle: 'solid',
        borderColor: 'hsl(var(--border))',
        backgroundColor: 'hsl(var(--card))',
        boxShadow: '0 1px 3px hsla(var(--shadow-color), var(--shadow-opacity))',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {skeletonVariants[variant]}

      {/* Shimmer overlay for default and detailed variants */}
      {variant !== 'minimal' && (
        <motion.div
          className="absolute inset-0 -translate-x-full"
          animate={{
            translateX: ['100%', '-100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          }}
        />
      )}
    </motion.div>
  );
}