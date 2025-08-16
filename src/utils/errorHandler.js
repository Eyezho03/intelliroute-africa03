// Enhanced Error Handling Utility
export class AppError extends Error {
  constructor(message, type = 'general', statusCode = null, details = null) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

export const ERROR_TYPES = {
  NETWORK: 'network',
  AUTH: 'authentication',
  VALIDATION: 'validation',
  PERMISSION: 'permission',
  SERVER: 'server',
  CLIENT: 'client',
  TIMEOUT: 'timeout',
  OFFLINE: 'offline'
};

export class ErrorHandler {
  static getErrorMessage(error) {
    // Handle different error types with user-friendly messages
    if (error instanceof AppError) {
      return this.getAppErrorMessage(error);
    }

    if (error.response) {
      // HTTP error response
      return this.getHttpErrorMessage(error);
    }

    if (error.request) {
      // Network error
      return {
        title: 'Connection Problem',
        message: 'Unable to connect to the server. Please check your internet connection.',
        type: ERROR_TYPES.NETWORK,
        action: 'Retry'
      };
    }

    // Generic error
    return {
      title: 'Something went wrong',
      message: error.message || 'An unexpected error occurred. Please try again.',
      type: ERROR_TYPES.CLIENT,
      action: 'Retry'
    };
  }

  static getAppErrorMessage(error) {
    const errorMessages = {
      [ERROR_TYPES.AUTH]: {
        title: 'Authentication Error',
        message: error.message || 'Please log in to continue.',
        action: 'Login'
      },
      [ERROR_TYPES.PERMISSION]: {
        title: 'Access Denied',
        message: error.message || 'You don\'t have permission to perform this action.',
        action: 'Contact Admin'
      },
      [ERROR_TYPES.VALIDATION]: {
        title: 'Invalid Data',
        message: error.message || 'Please check your input and try again.',
        action: 'Fix Input'
      },
      [ERROR_TYPES.NETWORK]: {
        title: 'Connection Error',
        message: error.message || 'Network connection failed.',
        action: 'Retry'
      },
      [ERROR_TYPES.OFFLINE]: {
        title: 'Offline Mode',
        message: 'You\'re currently offline. Some features may be limited.',
        action: 'Check Connection'
      }
    };

    return {
      ...errorMessages[error.type] || errorMessages[ERROR_TYPES.CLIENT],
      type: error.type,
      statusCode: error.statusCode,
      details: error.details
    };
  }

  static getHttpErrorMessage(error) {
    const status = error.response.status;
    const data = error.response.data;

    const statusMessages = {
      400: {
        title: 'Invalid Request',
        message: data?.message || 'The request contains invalid data.',
        type: ERROR_TYPES.VALIDATION
      },
      401: {
        title: 'Authentication Required',
        message: 'Your session has expired. Please log in again.',
        type: ERROR_TYPES.AUTH,
        action: 'Login'
      },
      403: {
        title: 'Access Forbidden',
        message: 'You don\'t have permission to access this resource.',
        type: ERROR_TYPES.PERMISSION
      },
      404: {
        title: 'Not Found',
        message: 'The requested resource was not found.',
        type: ERROR_TYPES.CLIENT
      },
      409: {
        title: 'Conflict',
        message: data?.message || 'This action conflicts with existing data.',
        type: ERROR_TYPES.VALIDATION
      },
      422: {
        title: 'Validation Error',
        message: data?.message || 'Please check your input data.',
        type: ERROR_TYPES.VALIDATION,
        details: data?.errors
      },
      429: {
        title: 'Too Many Requests',
        message: 'Please wait a moment before trying again.',
        type: ERROR_TYPES.CLIENT
      },
      500: {
        title: 'Server Error',
        message: 'An internal server error occurred. Please try again later.',
        type: ERROR_TYPES.SERVER
      },
      502: {
        title: 'Service Unavailable',
        message: 'The service is temporarily unavailable.',
        type: ERROR_TYPES.SERVER
      },
      503: {
        title: 'Service Unavailable',
        message: 'The service is currently under maintenance.',
        type: ERROR_TYPES.SERVER
      }
    };

    return {
      ...statusMessages[status] || statusMessages[500],
      statusCode: status,
      action: status === 401 ? 'Login' : 'Retry'
    };
  }

  static logError(error, context = {}) {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      type: error.type || 'unknown',
      timestamp: new Date().toISOString(),
      context,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('Error logged:', errorInfo);
    }

    // In production, you would send this to your logging service
    // Example: LoggingService.logError(errorInfo);
    
    return errorInfo;
  }

  static isNetworkError(error) {
    return !error.response && error.request;
  }

  static isAuthError(error) {
    return error.response?.status === 401 || error.type === ERROR_TYPES.AUTH;
  }

  static isValidationError(error) {
    return error.response?.status === 422 || error.type === ERROR_TYPES.VALIDATION;
  }

  static shouldRetry(error) {
    const retryableErrors = [500, 502, 503, 504];
    return this.isNetworkError(error) || 
           retryableErrors.includes(error.response?.status);
  }
}

// Retry utility
export class RetryHandler {
  static async withRetry(fn, options = {}) {
    const {
      maxAttempts = 3,
      delay = 1000,
      backoff = 2,
      shouldRetry = ErrorHandler.shouldRetry
    } = options;

    let lastError;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        
        if (attempt === maxAttempts || !shouldRetry(error)) {
          throw error;
        }
        
        // Wait before retry with exponential backoff
        const waitTime = delay * Math.pow(backoff, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    
    throw lastError;
  }
}

// Offline detection
export class OfflineHandler {
  static isOnline() {
    return navigator.onLine;
  }

  static onOnline(callback) {
    window.addEventListener('online', callback);
    return () => window.removeEventListener('online', callback);
  }

  static onOffline(callback) {
    window.addEventListener('offline', callback);
    return () => window.removeEventListener('offline', callback);
  }
}
