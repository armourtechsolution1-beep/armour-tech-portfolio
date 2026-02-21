'use client';

import { useCallback, useState, useEffect, Suspense, forwardRef } from 'react';
import { Search, X } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

// Inner component that uses useSearchParams
function SearchFilterContent({ onSearch, placeholder, onFocus, onBlur }: SearchFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
      if (query) {
        router.push(`?q=${encodeURIComponent(query)}`, { scroll: false });
      } else {
        router.push('', { scroll: false });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch, router]);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    router.push('', { scroll: false });
  };

  return (
    <motion.div 
      className="relative w-full max-w-md"
      animate={{ 
        scale: isFocused ? 1.02 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        animate={{ 
          rotate: isFocused ? 90 : 0,
          scale: isFocused ? 1.1 : 1
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-3 top-1/2 -translate-y-1/2"
      >
        <Search className="h-4 w-4 text-muted-foreground" />
      </motion.div>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="h-12 w-full rounded-[20px] border border-border bg-background pl-10 pr-10 text-sm 
                   focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                   transition-all duration-200"
        style={{
          boxShadow: isFocused 
            ? '0 4px 12px hsla(var(--shadow-color), 0.15)' 
            : '0 1px 3px hsla(var(--shadow-color), var(--shadow-opacity))',
        }}
      />
      
      <AnimatePresence>
        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Animated underline for focus state */}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-primary"
        initial={{ width: 0 }}
        animate={{ width: isFocused ? '100%' : 0 }}
        transition={{ duration: 0.3 }}
        style={{ borderRadius: '0 0 20px 20px' }}
      />
    </motion.div>
  );
}

// Main export with Suspense wrapper
export function SearchFilter(props: SearchFilterProps) {
  return (
    <Suspense fallback={
      <motion.div 
        className="relative w-full max-w-md"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
      >
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder={props.placeholder}
          disabled
          className="h-12 w-full rounded-[20px] border border-border bg-background pl-10 pr-10 text-sm opacity-50 cursor-not-allowed"
        />
      </motion.div>
    }>
      <SearchFilterContent {...props} />
    </Suspense>
  );
}