import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { showToast } from './Toast';
import { cn } from '../utils';
import { 
  AlertTriangle, 
  RefreshCw, 
  Home, 
  Bug, 
  Copy, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

class ModernErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
      errorId: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
      errorId: `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }

    // Show toast notification
    showToast.error('Something went wrong. Please try again.', {
      title: 'Application Error',
      duration: 5000,
    });
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleCopyError = () => {
    const { error, errorInfo, errorId } = this.state;
    const errorDetails = `
Error ID: ${errorId}
Timestamp: ${new Date().toISOString()}
User Agent: ${navigator.userAgent}
URL: ${window.location.href}

Error: ${error?.toString()}
Stack: ${error?.stack}

Component Stack: ${errorInfo?.componentStack}
    `.trim();

    navigator.clipboard.writeText(errorDetails).then(() => {
      showToast.success('Error details copied to clipboard');
    }).catch(() => {
      showToast.error('Failed to copy error details');
    });
  };

  handleReportBug = () => {
    const { errorId } = this.state;
    const bugReportUrl = `mailto:support@intelliroute.africa?subject=Bug Report - ${errorId}&body=Please describe the issue you encountered...`;
    window.open(bugReportUrl);
  };

  toggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails,
    }));
  };

  render() {
    const { hasError, error, errorInfo, showDetails, errorId } = this.state;
    const { theme } = this.props;

    if (hasError) {
      return (
        <div className={cn(
          "min-h-screen flex items-center justify-center p-4 transition-colors duration-300",
          theme === 'dark' ? "bg-gray-900" : "bg-gray-50"
        )}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "max-w-2xl w-full p-8 rounded-2xl shadow-xl border transition-colors duration-300",
              theme === 'dark' 
                ? "bg-gray-800 border-gray-700" 
                : "bg-white border-gray-200"
            )}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4",
                  theme === 'dark' 
                    ? "bg-red-900/20 border border-red-800" 
                    : "bg-red-100 border border-red-200"
                )}
              >
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </motion.div>
              
              <h1 className={cn(
                "text-2xl font-bold mb-2",
                theme === 'dark' ? "text-white" : "text-gray-900"
              )}>
                Oops! Something went wrong
              </h1>
              
              <p className={cn(
                "text-lg",
                theme === 'dark' ? "text-gray-300" : "text-gray-600"
              )}>
                We encountered an unexpected error. Our team has been notified.
              </p>
              
              {errorId && (
                <p className={cn(
                  "text-sm mt-2 font-mono",
                  theme === 'dark' ? "text-gray-400" : "text-gray-500"
                )}>
                  Error ID: {errorId}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={this.handleRetry}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={this.handleGoHome}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg transition-colors",
                  theme === 'dark' 
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                )}
              >
                <Home className="w-5 h-5" />
                Go Home
              </motion.button>
            </div>

            {/* Additional Actions */}
            <div className="flex flex-wrap gap-2 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.handleCopyError}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  theme === 'dark' 
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                )}
              >
                <Copy className="w-4 h-4" />
                Copy Details
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.handleReportBug}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  theme === 'dark' 
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                )}
              >
                <Bug className="w-4 h-4" />
                Report Bug
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.toggleDetails}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  theme === 'dark' 
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                )}
              >
                {showDetails ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Show Details
                  </>
                )}
              </motion.button>
            </div>

            {/* Error Details */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "overflow-hidden rounded-lg border",
                    theme === 'dark' 
                      ? "bg-gray-900 border-gray-700" 
                      : "bg-gray-50 border-gray-200"
                  )}
                >
                  <div className="p-4">
                    <h3 className={cn(
                      "font-semibold mb-3",
                      theme === 'dark' ? "text-white" : "text-gray-900"
                    )}>
                      Technical Details
                    </h3>
                    
                    <div className="space-y-4">
                      {error && (
                        <div>
                          <h4 className={cn(
                            "text-sm font-medium mb-2",
                            theme === 'dark' ? "text-gray-300" : "text-gray-600"
                          )}>
                            Error Message:
                          </h4>
                          <pre className={cn(
                            "text-xs p-3 rounded border overflow-x-auto",
                            theme === 'dark' 
                              ? "bg-gray-800 border-gray-600 text-red-400" 
                              : "bg-gray-100 border-gray-300 text-red-600"
                          )}>
                            {error.toString()}
                          </pre>
                        </div>
                      )}
                      
                      {error?.stack && (
                        <div>
                          <h4 className={cn(
                            "text-sm font-medium mb-2",
                            theme === 'dark' ? "text-gray-300" : "text-gray-600"
                          )}>
                            Stack Trace:
                          </h4>
                          <pre className={cn(
                            "text-xs p-3 rounded border overflow-x-auto max-h-32",
                            theme === 'dark' 
                              ? "bg-gray-800 border-gray-600 text-gray-300" 
                              : "bg-gray-100 border-gray-300 text-gray-700"
                          )}>
                            {error.stack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Help Text */}
            <div className={cn(
              "text-center text-sm mt-6 p-4 rounded-lg",
              theme === 'dark' 
                ? "bg-gray-700/50" 
                : "bg-gray-100"
            )}>
              <p className={cn(
                theme === 'dark' ? "text-gray-300" : "text-gray-600"
              )}>
                If this problem persists, please contact our support team at{' '}
                <a 
                  href="mailto:support@intelliroute.africa" 
                  className="text-emerald-600 hover:text-emerald-700 underline"
                >
                  support@intelliroute.africa
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook wrapper for functional components
export const useErrorBoundary = () => {
  const { theme } = useTheme();
  
  return (props) => (
    <ModernErrorBoundary theme={theme} {...props} />
  );
};

export default ModernErrorBoundary;
