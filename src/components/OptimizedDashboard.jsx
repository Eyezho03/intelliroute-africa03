import React, { memo, useMemo, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useOptimizedQuery } from '../hooks/useOptimizedQuery';
import { performanceMonitor } from '../utils/performance';

// Lazy load heavy components
const ChartComponent = React.lazy(() => import('./ChartComponent'));
const MapComponent = React.lazy(() => import('./MapComponent'));
const DataTable = React.lazy(() => import('./DataTable'));

// Loading fallback component
const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-2 text-gray-600">Loading...</span>
  </div>
));

// Error fallback component
const ErrorFallback = memo(({ error, resetErrorBoundary }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
    <h3 className="text-red-800 font-semibold">Something went wrong</h3>
    <p className="text-red-600 text-sm mt-1">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
    >
      Try again
    </button>
  </div>
));

// Memoized metric card component
const MetricCard = memo(({ title, value, change, icon: Icon }) => {
  const changeColor = change >= 0 ? 'text-green-600' : 'text-red-600';
  const changeIcon = change >= 0 ? '↗' : '↘';

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className={`text-sm ${changeColor} flex items-center mt-1`}>
            <span>{changeIcon}</span>
            <span className="ml-1">{Math.abs(change)}%</span>
          </p>
        </div>
        {Icon && (
          <div className="p-3 bg-blue-50 rounded-full">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        )}
      </div>
    </div>
  );
});

// Main optimized dashboard component
const OptimizedDashboard = memo(({ userRole, filters = {} }) => {
  // Performance monitoring
  React.useEffect(() => {
    performanceMonitor.mark('dashboard-start');
    return () => {
      performanceMonitor.mark('dashboard-end');
      performanceMonitor.measure('dashboard-render', 'dashboard-start', 'dashboard-end');
    };
  }, []);

  // Optimized data fetching with caching
  const { data: dashboardData, loading, error, refetch } = useOptimizedQuery(
    async ({ signal }) => {
      const response = await fetch(`/api/dashboard/${userRole}?${new URLSearchParams(filters)}`, {
        signal,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Dashboard data fetch failed: ${response.statusText}`);
      }
      
      return response.json();
    },
    [userRole, JSON.stringify(filters)],
    {
      debounceMs: 500,
      cacheTime: 10 * 60 * 1000, // 10 minutes
      staleTime: 2 * 60 * 1000,   // 2 minutes
      retry: 2
    }
  );

  // Memoized metrics calculation
  const metrics = useMemo(() => {
    if (!dashboardData?.data) return [];

    const data = dashboardData.data;
    return [
      {
        title: 'Total Orders',
        value: data.totalOrders || 0,
        change: data.ordersChange || 0,
        icon: null
      },
      {
        title: 'Active Deliveries',
        value: data.activeDeliveries || 0,
        change: data.deliveriesChange || 0,
        icon: null
      },
      {
        title: 'Revenue',
        value: `$${(data.revenue || 0).toLocaleString()}`,
        change: data.revenueChange || 0,
        icon: null
      },
      {
        title: 'Efficiency',
        value: `${data.efficiency || 0}%`,
        change: data.efficiencyChange || 0,
        icon: null
      }
    ];
  }, [dashboardData]);

  // Memoized chart data
  const chartData = useMemo(() => {
    if (!dashboardData?.data?.chartData) return null;
    
    return {
      labels: dashboardData.data.chartData.labels || [],
      datasets: dashboardData.data.chartData.datasets || []
    };
  }, [dashboardData]);

  // Error handling
  if (error) {
    return (
      <div className="p-6">
        <ErrorFallback 
          error={error} 
          resetErrorBoundary={refetch}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
            </h1>
            <button
              onClick={refetch}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))
          ) : (
            metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))
          )}
        </div>

        {/* Charts and Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Chart Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<LoadingSpinner />}>
                {chartData && <ChartComponent data={chartData} />}
              </Suspense>
            </ErrorBoundary>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Tracking</h3>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<LoadingSpinner />}>
                <MapComponent data={dashboardData?.data?.mapData} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingSpinner />}>
              <DataTable 
                data={dashboardData?.data?.tableData || []}
                loading={loading}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
});

OptimizedDashboard.displayName = 'OptimizedDashboard';

export default OptimizedDashboard;
