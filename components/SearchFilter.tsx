'use client';

import { useCallback, useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchFilter({ onSearch, placeholder = 'Search...' }: SearchFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get('q') || '');

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

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
