import { useState, useCallback, useRef, useEffect } from 'react';
import { showToast } from '../components/Toast';

const useApi = (apiFunction, options = {}) => {
  const {
    immediate = false,
    onSuccess,
    onError,
    showSuccessToast = false,
    showErrorToast = true,
    successMessage,
    errorMessage,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const abortControllerRef = useRef(null);

  const execute = useCallback(async (...args) => {
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const result = await apiFunction(...args, { signal });
      setData(result);
      setIsSuccess(true);
      
      if (showSuccessToast && successMessage) {
        showToast.success(successMessage);
      }
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      // Don't set error if request was aborted
      if (err.name === 'AbortError') {
        return;
      }

      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      
      if (showErrorToast) {
        showToast.error(errorMessage);
      }
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, onSuccess, onError, showSuccessToast, showErrorToast, successMessage]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsSuccess(false);
    setLoading(false);
  }, []);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // Execute immediately if requested
  useEffect(() => {
    if (immediate) {
      execute();
    }

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [immediate, execute]);

  return {
    data,
    loading,
    error,
    isSuccess,
    execute,
    reset,
    cancel,
  };
};

// Hook for paginated data
export const usePaginatedApi = (apiFunction, options = {}) => {
  const {
    pageSize = 10,
    initialPage = 1,
    ...apiOptions
  } = options;

  const [page, setPage] = useState(initialPage);
  const [allData, setAllData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const {
    data,
    loading,
    error,
    execute,
    reset: resetApi,
  } = useApi(apiFunction, {
    ...apiOptions,
    onSuccess: (result) => {
      if (result.data) {
        if (page === initialPage) {
          setAllData(result.data);
        } else {
          setAllData(prev => [...prev, ...result.data]);
        }
        setHasMore(result.hasMore || false);
        setTotalCount(result.totalCount || result.data.length);
      }
      
      if (apiOptions.onSuccess) {
        apiOptions.onSuccess(result);
      }
    },
  });

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      execute(page + 1, pageSize);
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore, execute, page, pageSize]);

  const refresh = useCallback(() => {
    setPage(initialPage);
    setAllData([]);
    setHasMore(true);
    execute(initialPage, pageSize);
  }, [execute, initialPage, pageSize]);

  const reset = useCallback(() => {
    resetApi();
    setPage(initialPage);
    setAllData([]);
    setHasMore(true);
    setTotalCount(0);
  }, [resetApi, initialPage]);

  return {
    data: allData,
    loading,
    error,
    hasMore,
    totalCount,
    page,
    loadMore,
    refresh,
    reset,
  };
};

// Hook for real-time data
export const useRealtimeApi = (apiFunction, interval = 30000, options = {}) => {
  const intervalRef = useRef(null);

  const {
    data,
    loading,
    error,
    execute,
    reset,
  } = useApi(apiFunction, options);

  const start = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Execute immediately
    execute();

    // Set up interval
    intervalRef.current = setInterval(() => {
      execute();
    }, interval);
  }, [execute, interval]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    start,
    stop,
  };
};

export default useApi;
