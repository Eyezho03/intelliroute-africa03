import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Monitor, Zap, Wifi, Bell } from 'lucide-react';
import usePWA from '../hooks/usePWA';

const PWAInstallBanner = () => {
  const {
    isInstallable,
    isInstalled,
    isOnline,
    installPWA,
    requestNotificationPermission
  } = usePWA();

  const [showBanner, setShowBanner] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [userDismissed, setUserDismissed] = useState(false);
  const [installStep, setInstallStep] = useState('prompt'); // 'prompt', 'installing', 'success'

  // Show banner logic with smart timing
  useEffect(() => {
    // Don't show if already installed, dismissed, or not installable
    if (isInstalled || userDismissed || !isInstallable) {
      setShowBanner(false);
      return;
    }

    // Check if user has visited multiple times (returning user)
    const visitCount = parseInt(localStorage.getItem('intelliroute_visit_count') || '0') + 1;
    localStorage.setItem('intelliroute_visit_count', visitCount.toString());

    // Smart timing: show after user has shown some engagement
    const showTimer = setTimeout(() => {
      // Show to returning users (visited 2+ times) or after 30 seconds for new users
      if (visitCount >= 2) {
        setShowBanner(true);
      } else {
        // For new users, wait longer to avoid interrupting first experience
        const newUserTimer = setTimeout(() => {
          setShowBanner(true);
        }, 30000); // 30 seconds

        return () => clearTimeout(newUserTimer);
      }
    }, visitCount >= 2 ? 5000 : 45000); // 5s for returning users, 45s for new users

    return () => clearTimeout(showTimer);
  }, [isInstallable, isInstalled, userDismissed]);

  // Handle PWA installation
  const handleInstall = async () => {
    if (isInstalling) return;

    try {
      setIsInstalling(true);
      setInstallStep('installing');

      const success = await installPWA();
      
      if (success) {
        setInstallStep('success');
        // Request notification permission after installation
        try {
          await requestNotificationPermission();
        } catch (error) {
          console.log('Notification permission not granted');
        }
        
        // Hide banner after short success message
        setTimeout(() => {
          setShowBanner(false);
        }, 3000);
      } else {
        setIsInstalling(false);
        setInstallStep('prompt');
      }
    } catch (error) {
      console.error('Installation failed:', error);
      setIsInstalling(false);
      setInstallStep('prompt');
    }
  };

  // Handle banner dismissal
  const handleDismiss = () => {
    setUserDismissed(true);
    setShowBanner(false);
    
    // Remember dismissal for this session
    sessionStorage.setItem('pwa_banner_dismissed', 'true');
  };

  // Don't render if conditions not met
  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
      >
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl shadow-2xl border border-emerald-500/20 overflow-hidden">
          <div className="p-6">
            {/* Success State */}
            {installStep === 'success' && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    ✅
                  </motion.div>
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Welcome to IntelliRoute!
                </h3>
                <p className="text-white/90 text-sm">
                  App installed successfully. You can now access IntelliRoute from your home screen!
                </p>
              </motion.div>
            )}

            {/* Installing State */}
            {installStep === 'installing' && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Download className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Installing IntelliRoute...
                </h3>
                <p className="text-white/90 text-sm">
                  Please wait while we set up your app
                </p>
              </motion.div>
            )}

            {/* Prompt State */}
            {installStep === 'prompt' && (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        Install IntelliRoute
                      </h3>
                      <p className="text-white/80 text-sm">
                        Get the full app experience
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleDismiss}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Dismiss installation prompt"
                  >
                    <X className="w-5 h-5 text-white/80" />
                  </button>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-1">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs text-white/90">Faster Access</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-1">
                      <Wifi className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs text-white/90">Works Offline</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-1">
                      <Bell className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs text-white/90">Push Alerts</p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleInstall}
                    disabled={isInstalling}
                    className="flex-1 bg-white hover:bg-gray-100 text-emerald-600 font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    Install App
                  </motion.button>
                  
                  <button
                    onClick={handleDismiss}
                    className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium"
                  >
                    Later
                  </button>
                </div>

                {/* Additional info */}
                <div className="mt-3 pt-3 border-t border-white/20">
                  <p className="text-xs text-white/70 text-center">
                    Free • No app store required • Install directly from browser
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Progress indicator for installing state */}
          {installStep === 'installing' && (
            <div className="h-1 bg-white/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-full bg-white"
              />
            </div>
          )}
        </div>

        {/* Device-specific install hints */}
        {installStep === 'prompt' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-center"
          >
            <p className="text-xs text-gray-400 bg-gray-900/80 px-3 py-2 rounded-lg backdrop-blur-sm">
              💡 Tip: Add to home screen for quick access to your logistics dashboard
            </p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default PWAInstallBanner;
