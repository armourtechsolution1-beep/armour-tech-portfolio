'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface SearchOptions {
  debounceMs?: number;
  minChars?: number;
}

export function useSearch<T>(
  items: T[],
  getSearchableText: (item: T) => string,
  options: SearchOptions = {}
) {
  const { debounceMs = 300, minChars = 1 } = options;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>(items);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();

  const performSearch = useCallback(
    (searchQuery: string) => {
      if (searchQuery.length < minChars) {
        setResults(items);
        return;
      }

      const lowerQuery = searchQuery.toLowerCase();
      const filtered = items.filter(item =>
        getSearchableText(item).toLowerCase().includes(lowerQuery)
      );
      setResults(filtered);
    },
    [items, getSearchableText, minChars]
  );

  const handleQueryChange = useCallback(
    (newQuery: string) => {
      setQuery(newQuery);

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        performSearch(newQuery);
      }, debounceMs);
    },
    [debounceMs, performSearch]
  );

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    query,
    results,
    setQuery: handleQueryChange,
    resultCount: results.length,
    isSearching: query.length > 0,
  };
}
