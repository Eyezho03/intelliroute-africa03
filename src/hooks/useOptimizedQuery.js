import { useState, useEffect, useCallback, useRef } from 'react';
import { debounce } from '../utils/performance';

/**
 * Optimized data fetching hook with caching and debouncing
 */
export const useOptimizedQuery = (queryFn, dependencies = [], options = {}) => {
  const {
    debounceMs = 300,
    cacheTime = 5 * 60 * 1000, // 5 minutes
    staleTime = 1 * 60 * 1000,  // 1 minute
    retry = 3,
    retryDelay = 1000
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  
  const cacheRef = useRef(new Map());
  const abortControllerRef = useRef(null);
  const retryCountRef = useRef(0);

  // Generate cache key from dependencies
  const cacheKey = JSON.stringify(dependencies);

  // Check if data is stale
  const isStale = useCallback(() => {
    if (!lastFetch) return true;
    return Date.now() - lastFetch > staleTime;
  }, [lastFetch, staleTime]);

  // Get cached data
  const getCachedData = useCallback(() => {
    const cached = cacheRef.current.get(cacheKey);
    if (!cached) return null;
    
    const isExpired = Date.now() - cached.timestamp > cacheTime;
    if (isExpired) {
      cacheRef.current.delete(cacheKey);
      return null;
    }
    
    return cached.data;
  }, [cacheKey, cacheTime]);

  // Set cached data
  const setCachedData = useCallback((newData) => {
    cacheRef.current.set(cacheKey, {
      data: newData,
      timestamp: Date.now()
    });
  }, [cacheKey]);

  // Execute query with retry logic
  const executeQuery = useCallback(async () => {
    try {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setLoading(true);
      setError(null);

      const result = await queryFn({
        signal: abortControllerRef.current.signal
      });

      setData(result);
      setCachedData(result);
      setLastFetch(Date.now());
      retryCountRef.current = 0;
      
    } catch (err) {
      if (err.name === 'AbortError') return;
      
      setError(err);
      
      // Retry logic
      if (retryCountRef.current < retry) {
        retryCountRef.current++;
        setTimeout(() => {
          executeQuery();
        }, retryDelay * retryCountRef.current);
      }
    } finally {
      setLoading(false);
    }
  }, [queryFn, retry, retryDelay, setCachedData]);

  // Debounced query execution
  const debouncedExecuteQuery = useCallback(
    debounce(executeQuery, debounceMs),
    [executeQuery, debounceMs]
  );

  // Main effect
  useEffect(() => {
    const cachedData = getCachedData();
    
    if (cachedData && !isStale()) {
      setData(cachedData);
      setLastFetch(Date.now());
      return;
    }

    debouncedExecuteQuery();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, dependencies);

  // Manual refetch
  const refetch = useCallback(() => {
    executeQuery();
  }, [executeQuery]);

  // Clear cache
  const clearCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
    clearCache,
    isStale: isStale()
  };
};
