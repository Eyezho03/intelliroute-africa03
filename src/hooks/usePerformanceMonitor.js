import { useEffect, useRef, useState } from 'react';

/**
 * Performance monitoring hook for IntelliRoute Africa
 * Tracks page load times, user interactions, and system performance
 */
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({});
  const metricsRef = useRef({});
  const observerRef = useRef(null);

  useEffect(() => {
    // Initialize performance monitoring
    initializePerformanceMonitoring();
    
    return () => {
      // Cleanup observers
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const initializePerformanceMonitoring = () => {
    // 1. Core Web Vitals Monitoring
    measureWebVitals();
    
    // 2. Custom Performance Metrics
    measureCustomMetrics();
    
    // 3. User Interaction Tracking
    trackUserInteractions();
    
    // 4. Resource Loading Performance
    monitorResourceLoading();
    
    // 5. Memory Usage Monitoring
    monitorMemoryUsage();
  };

  const measureWebVitals = () => {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          updateMetric('LCP', {
            value: Math.round(lastEntry.startTime),
            rating: getLCPRating(lastEntry.startTime),
            timestamp: Date.now()
          });
        });
        
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (error) {
        console.warn('LCP monitoring not supported');
      }
    }

    // First Input Delay (FID)
    if ('PerformanceObserver' in window) {
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const firstInput = list.getEntries()[0];
          
          updateMetric('FID', {
            value: Math.round(firstInput.processingStart - firstInput.startTime),
            rating: getFIDRating(firstInput.processingStart - firstInput.startTime),
            timestamp: Date.now()
          });
        });
        
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (error) {
        console.warn('FID monitoring not supported');
      }
    }

    // Cumulative Layout Shift (CLS)
    if ('PerformanceObserver' in window) {
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          
          updateMetric('CLS', {
            value: Math.round(clsValue * 1000) / 1000,
            rating: getCLSRating(clsValue),
            timestamp: Date.now()
          });
        });
        
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        observerRef.current = clsObserver;
      } catch (error) {
        console.warn('CLS monitoring not supported');
      }
    }
  };

  const measureCustomMetrics = () => {
    // Time to Interactive (TTI) approximation
    window.addEventListener('load', () => {
      setTimeout(() => {
        const tti = performance.now();
        updateMetric('TTI', {
          value: Math.round(tti),
          rating: getTTIRating(tti),
          timestamp: Date.now()
        });
      }, 0);
    });

    // Navigation timing metrics
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      
      if (navigation) {
        updateMetric('pageLoad', {
          domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
          loadComplete: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
          domInteractive: Math.round(navigation.domInteractive - navigation.navigationStart),
          timestamp: Date.now()
        });
      }
    });

    // First Contentful Paint (FCP)
    if ('PerformanceObserver' in window) {
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcp = entries[entries.length - 1];
          
          updateMetric('FCP', {
            value: Math.round(fcp.startTime),
            rating: getFCPRating(fcp.startTime),
            timestamp: Date.now()
          });
        });
        
        fcpObserver.observe({ entryTypes: ['paint'] });
      } catch (error) {
        console.warn('FCP monitoring not supported');
      }
    }
  };

  const trackUserInteractions = () => {
    // Track clicks with performance impact
    document.addEventListener('click', (event) => {
      const startTime = performance.now();
      
      requestAnimationFrame(() => {
        const duration = performance.now() - startTime;
        
        if (duration > 16) { // Over 16ms indicates potential performance issue
          logInteractionDelay('click', {
            element: event.target.tagName,
            duration: Math.round(duration),
            timestamp: Date.now()
          });
        }
      });
    });

    // Track form submissions
    document.addEventListener('submit', (event) => {
      trackEvent('form_submit', {
        form: event.target.id || 'unknown',
        timestamp: Date.now()
      });
    });

    // Track navigation
    let navigationStartTime = performance.now();
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function() {
      navigationStartTime = performance.now();
      originalPushState.apply(history, arguments);
    };

    history.replaceState = function() {
      navigationStartTime = performance.now();
      originalReplaceState.apply(history, arguments);
    };

    window.addEventListener('popstate', () => {
      navigationStartTime = performance.now();
    });
  };

  const monitorResourceLoading = () => {
    if ('PerformanceObserver' in window) {
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          
          entries.forEach((entry) => {
            if (entry.duration > 1000) { // Resources taking over 1 second
              logSlowResource({
                name: entry.name,
                duration: Math.round(entry.duration),
                size: entry.transferSize || 0,
                type: entry.initiatorType,
                timestamp: Date.now()
              });
            }
          });
        });
        
        resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (error) {
        console.warn('Resource monitoring not supported');
      }
    }
  };

  const monitorMemoryUsage = () => {
    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = performance.memory;
        
        updateMetric('memory', {
          used: Math.round(memory.usedJSHeapSize / 1048576), // MB
          total: Math.round(memory.totalJSHeapSize / 1048576), // MB
          limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
          timestamp: Date.now()
        });

        // Warn if memory usage is high
        const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        if (usagePercent > 80) {
          console.warn('High memory usage detected:', usagePercent + '%');
        }
      };

      // Check memory usage every 30 seconds
      checkMemory();
      setInterval(checkMemory, 30000);
    }
  };

  const updateMetric = (key, value) => {
    metricsRef.current[key] = value;
    setMetrics(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const trackEvent = (eventName, data) => {
    // Track custom events (can be sent to analytics service)
    const event = {
      name: eventName,
      data,
      timestamp: Date.now(),
      url: window.location.pathname,
      userAgent: navigator.userAgent
    };

    // Store locally and send to analytics when available
    const events = JSON.parse(localStorage.getItem('performance_events') || '[]');
    events.push(event);
    
    // Keep only last 100 events to prevent storage bloat
    if (events.length > 100) {
      events.shift();
    }
    
    localStorage.setItem('performance_events', JSON.stringify(events));

    // Send to analytics service if available
    if (window.gtag) {
      window.gtag('event', eventName, data);
    }
  };

  const logInteractionDelay = (interaction, data) => {
    console.warn(`Slow ${interaction} interaction:`, data);
    trackEvent('interaction_delay', { interaction, ...data });
  };

  const logSlowResource = (resource) => {
    console.warn('Slow resource loading:', resource);
    trackEvent('slow_resource', resource);
  };

  // Rating functions based on Web Vitals thresholds
  const getLCPRating = (value) => {
    if (value <= 2500) return 'good';
    if (value <= 4000) return 'needs-improvement';
    return 'poor';
  };

  const getFIDRating = (value) => {
    if (value <= 100) return 'good';
    if (value <= 300) return 'needs-improvement';
    return 'poor';
  };

  const getCLSRating = (value) => {
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  };

  const getFCPRating = (value) => {
    if (value <= 1800) return 'good';
    if (value <= 3000) return 'needs-improvement';
    return 'poor';
  };

  const getTTIRating = (value) => {
    if (value <= 3800) return 'good';
    if (value <= 7300) return 'needs-improvement';
    return 'poor';
  };

  // Get performance summary
  const getPerformanceSummary = () => {
    const summary = {
      timestamp: Date.now(),
      url: window.location.pathname,
      userAgent: navigator.userAgent,
      connection: navigator.connection?.effectiveType || 'unknown',
      metrics: { ...metricsRef.current }
    };

    return summary;
  };

  // Send performance data to analytics
  const sendPerformanceData = async () => {
    const summary = getPerformanceSummary();
    
    try {
      // Send to your analytics endpoint
      await fetch('/api/analytics/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(summary)
      });
    } catch (error) {
      // Fallback: store locally for later sync
      const stored = JSON.parse(localStorage.getItem('offline_analytics') || '[]');
      stored.push(summary);
      localStorage.setItem('offline_analytics', JSON.stringify(stored));
    }
  };

  // Measure specific operations
  const measureOperation = (name, operation) => {
    const start = performance.now();
    
    const result = operation();
    
    if (result instanceof Promise) {
      return result.then((value) => {
        const duration = performance.now() - start;
        trackEvent('async_operation', { name, duration: Math.round(duration) });
        return value;
      });
    } else {
      const duration = performance.now() - start;
      trackEvent('sync_operation', { name, duration: Math.round(duration) });
      return result;
    }
  };

  return {
    metrics,
    getPerformanceSummary,
    sendPerformanceData,
    measureOperation,
    trackEvent
  };
};

export default usePerformanceMonitor;
