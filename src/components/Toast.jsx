import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  X,
  Bell
} from 'lucide-react';

const toastStyles = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const CustomToast = ({ t, message, type = 'info', title, action }) => {
  const Icon = toastIcons[type] || Bell;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      className={`
        max-w-sm w-full bg-white shadow-lg rounded-lg border pointer-events-auto flex ring-1 ring-black ring-opacity-5
        ${toastStyles[type]}
      `}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={`h-6 w-6 ${type === 'success' ? 'text-emerald-400' : 
              type === 'error' ? 'text-red-400' : 
              type === 'warning' ? 'text-amber-400' : 'text-blue-400'}`} />
          </div>
          <div className="ml-3 flex-1">
            {title && (
              <p className="text-sm font-medium">
                {title}
              </p>
            )}
            <p className="text-sm">
              {message}
            </p>
            {action && (
              <div className="mt-2">
                <button
                  onClick={action.onClick}
                  className="text-sm font-medium underline hover:no-underline"
                >
                  {action.label}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
};

// Toast functions with custom styling
export const showToast = {
  success: (message, options = {}) => {
    return toast.custom((t) => (
      <CustomToast
        t={t}
        message={message}
        type="success"
        title={options.title}
        action={options.action}
      />
    ), {
      duration: options.duration || 4000,
      position: 'top-right',
    });
  },

  error: (message, options = {}) => {
    return toast.custom((t) => (
      <CustomToast
        t={t}
        message={message}
        type="error"
        title={options.title}
        action={options.action}
      />
    ), {
      duration: options.duration || 6000,
      position: 'top-right',
    });
  },

  warning: (message, options = {}) => {
    return toast.custom((t) => (
      <CustomToast
        t={t}
        message={message}
        type="warning"
        title={options.title}
        action={options.action}
      />
    ), {
      duration: options.duration || 5000,
      position: 'top-right',
    });
  },

  info: (message, options = {}) => {
    return toast.custom((t) => (
      <CustomToast
        t={t}
        message={message}
        type="info"
        title={options.title}
        action={options.action}
      />
    ), {
      duration: options.duration || 4000,
      position: 'top-right',
    });
  },
};

export const ToastContainer = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        className: '',
        duration: 4000,
        style: {
          background: 'transparent',
          boxShadow: 'none',
        },
        success: {
          duration: 4000,
        },
        error: {
          duration: 6000,
        },
      }}
    />
  );
};

export default ToastContainer;
