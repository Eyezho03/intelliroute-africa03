import React from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { ErrorHandler } from '../utils/errorHandler';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(_error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Enhanced error logging
    ErrorHandler.logError(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true
    });
  }

  handleReload = () => {
    window.location.reload();
  }

  handleGoHome = () => {
    window.location.href = '/';
  }

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;
      const isDevelopment = import.meta.env.MODE === 'development';

      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Something went wrong
            </h1>

            {/* Description */}
            <p className="text-gray-600 mb-6">
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>

            {/* Development Error Details */}
            {isDevelopment && error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg text-left">
                <h3 className="font-medium text-red-800 mb-2">Error Details:</h3>
                <p className="text-sm text-red-700 font-mono break-words">
                  {error.toString()}
                </p>
                {errorInfo && (
                  <details className="mt-2">
                    <summary className="text-sm text-red-700 cursor-pointer">
                      Stack Trace
                    </summary>
                    <pre className="mt-2 text-xs text-red-600 whitespace-pre-wrap break-words">
                      {errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reload Page
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Toast Error Component
export const ErrorToast = ({ error, onClose, onRetry }) => {
  const errorInfo = ErrorHandler.getErrorMessage(error);

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg max-w-sm z-50">
      <div className="flex items-start">
        <AlertTriangle className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-medium mb-1">{errorInfo.title}</h4>
          <p className="text-sm opacity-90">{errorInfo.message}</p>
          {onRetry && errorInfo.action === 'Retry' && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try Again
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          className="ml-3 text-white hover:bg-red-600 rounded p-1"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Inline Error Component
export const InlineError = ({ error, onRetry, className = '' }) => {
  const errorInfo = ErrorHandler.getErrorMessage(error);

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-medium text-red-800 mb-1">{errorInfo.title}</h4>
          <p className="text-red-700 text-sm">{errorInfo.message}</p>
          {onRetry && errorInfo.action === 'Retry' && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm text-red-800 underline hover:no-underline"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
