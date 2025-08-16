import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, X, Send, ThumbsUp, ThumbsDown, 
  Star, Accessibility, Volume2, Eye, Keyboard,
  HelpCircle, Settings, ChevronRight, Image, Smile, Frown, Meh,
  Type, Contrast, ZoomIn, ZoomOut, Move, AlertCircle
} from 'lucide-react';

const AccessibilityFeedback = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('general');
  const [activeTab, setActiveTab] = useState('settings');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [screenshot, setScreenshot] = useState(null);

  // Accessibility features
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: 'medium',
    contrast: 'normal',
    screenReader: false,
    keyboardNav: true,
    animations: true,
    zoomLevel: 100,
    motionReduction: false,
    highlightFocus: true
  });

  useEffect(() => {
    // Apply saved settings on load
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      setAccessibilitySettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem('accessibilitySettings', JSON.stringify(accessibilitySettings));
    
    // Apply accessibility changes to document
    if (accessibilitySettings.fontSize === 'large') {
      document.documentElement.style.fontSize = '120%';
    } else if (accessibilitySettings.fontSize === 'small') {
      document.documentElement.style.fontSize = '90%';
    } else {
      document.documentElement.style.fontSize = '100%';
    }
    
    if (accessibilitySettings.contrast === 'high') {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    if (accessibilitySettings.motionReduction) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    
    if (accessibilitySettings.highlightFocus) {
      document.documentElement.classList.add('highlight-focus');
    } else {
      document.documentElement.classList.remove('highlight-focus');
    }
  }, [accessibilitySettings]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Feedback submitted:', { rating, feedback, feedbackType, screenshot });
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after submission
      setTimeout(() => {
        setFeedback('');
        setRating(0);
        setScreenshot(null);
        setSubmitted(false);
        setFeedbackOpen(false);
      }, 2000);
    }, 1500);
  };

  const updateAccessibilitySetting = (setting, value) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const resetToDefaults = () => {
    setAccessibilitySettings({
      fontSize: 'medium',
      contrast: 'normal',
      screenReader: false,
      keyboardNav: true,
      animations: true,
      zoomLevel: 100,
      motionReduction: false,
      highlightFocus: true
    });
  };

  const handleScreenshotUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        setScreenshot(e.target.result);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const removeScreenshot = () => {
    setScreenshot(null);
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Accessibility Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAccessibilityOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors flex items-center justify-center relative"
          aria-label="Accessibility Settings"
        >
          <Accessibility className="w-6 h-6" />
          {accessibilitySettings.screenReader && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></span>
          )}
        </motion.button>

        {/* Feedback Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFeedbackOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-colors flex items-center justify-center"
          aria-label="Send Feedback"
        >
          <MessageSquare className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {accessibilityOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setAccessibilityOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
              aria-modal="true"
              aria-labelledby="accessibility-panel-title"
              role="dialog"
            >
              <div className="flex items-center justify-between p-5 border-b dark:border-gray-700">
                <h2 
                  id="accessibility-panel-title"
                  className="text-xl font-bold text-gray-900 dark:text-white flex items-center"
                >
                  <Accessibility className="w-5 h-5 mr-2 text-blue-600" />
                  Accessibility Settings
                </h2>
                <button
                  onClick={() => setAccessibilityOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full p-1"
                  aria-label="Close accessibility settings"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Tabs */}
              <div className="border-b dark:border-gray-700 flex">
                <button
                  className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === 'settings' 
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('settings')}
                >
                  Settings
                  {accessibilitySettings.screenReader && activeTab !== 'settings' && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'help' 
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('help')}
                >
                  Help & Resources
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'keyboard' 
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('keyboard')}
                >
                  Keyboard Shortcuts
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-5">
                {activeTab === 'settings' ? (
                  <div className="space-y-6">
                    {/* Visual Settings */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 flex items-center mb-3">
                        <Eye className="w-5 h-5 mr-2" />
                        Visual Settings
                      </h3>
                      
                      <div className="space-y-4">
                        {/* Font Size */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                            <Type className="w-4 h-4 mr-2" />
                            Font Size
                          </label>
                          <div className="flex gap-2">
                            {['small', 'medium', 'large'].map((size) => (
                              <button
                                key={size}
                                onClick={() => updateAccessibilitySetting('fontSize', size)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 flex flex-col items-center ${
                                  accessibilitySettings.fontSize === size
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                              >
                                {size === 'small' ? <ZoomOut className="w-5 h-5 mb-1" /> : 
                                 size === 'medium' ? <Type className="w-5 h-5 mb-1" /> : 
                                 <ZoomIn className="w-5 h-5 mb-1" />}
                                {size.charAt(0).toUpperCase() + size.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Contrast */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                            <Contrast className="w-4 h-4 mr-2" />
                            Contrast
                          </label>
                          <div className="flex gap-2">
                            {['normal', 'high'].map((contrast) => (
                              <button
                                key={contrast}
                                onClick={() => updateAccessibilitySetting('contrast', contrast)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 flex flex-col items-center ${
                                  accessibilitySettings.contrast === contrast
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                              >
                                {contrast === 'normal' ? 
                                  <Contrast className="w-5 h-5 mb-1" /> : 
                                  <Contrast className="w-5 h-5 mb-1" />}
                                {contrast.charAt(0).toUpperCase() + contrast.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interaction Settings */}
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-purple-800 dark:text-purple-200 flex items-center mb-3">
                        <Move className="w-5 h-5 mr-2" />
                        Interaction Settings
                      </h3>
                      
                      <div className="space-y-4">
                        {/* Toggle Options */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-white dark:bg-gray-700/50 p-3 rounded-lg">
                            <div className="flex items-center">
                              <Volume2 className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Screen Reader Support</span>
                            </div>
                            <button
                              onClick={() => updateAccessibilitySetting('screenReader', !accessibilitySettings.screenReader)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                accessibilitySettings.screenReader ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                              aria-label={`Turn screen reader ${accessibilitySettings.screenReader ? 'off' : 'on'}`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  accessibilitySettings.screenReader ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>

                          <div className="flex items-center justify-between bg-white dark:bg-gray-700/50 p-3 rounded-lg">
                            <div className="flex items-center">
                              <Keyboard className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Keyboard Navigation</span>
                            </div>
                            <button
                              onClick={() => updateAccessibilitySetting('keyboardNav', !accessibilitySettings.keyboardNav)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                accessibilitySettings.keyboardNav ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                              aria-label={`Turn keyboard navigation ${accessibilitySettings.keyboardNav ? 'off' : 'on'}`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  accessibilitySettings.keyboardNav ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>

                          <div className="flex items-center justify-between bg-white dark:bg-gray-700/50 p-3 rounded-lg">
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Animations</span>
                            </div>
                            <button
                              onClick={() => updateAccessibilitySetting('animations', !accessibilitySettings.animations)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                accessibilitySettings.animations ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                              aria-label={`Turn animations ${accessibilitySettings.animations ? 'off' : 'on'}`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  accessibilitySettings.animations ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>

                          <div className="flex items-center justify-between bg-white dark:bg-gray-700/50 p-3 rounded-lg">
                            <div className="flex items-center">
                              <Move className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Reduce Motion</span>
                            </div>
                            <button
                              onClick={() => updateAccessibilitySetting('motionReduction', !accessibilitySettings.motionReduction)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                accessibilitySettings.motionReduction ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                              aria-label={`Reduce motion ${accessibilitySettings.motionReduction ? 'off' : 'on'}`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  accessibilitySettings.motionReduction ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>

                          <div className="flex items-center justify-between bg-white dark:bg-gray-700/50 p-3 rounded-lg">
                            <div className="flex items-center">
                              <AlertCircle className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Highlight Focus</span>
                            </div>
                            <button
                              onClick={() => updateAccessibilitySetting('highlightFocus', !accessibilitySettings.highlightFocus)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                accessibilitySettings.highlightFocus ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                              aria-label={`Highlight focus ${accessibilitySettings.highlightFocus ? 'off' : 'on'}`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  accessibilitySettings.highlightFocus ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Reset Button */}
                    <div className="flex justify-center pt-2">
                      <button
                        onClick={resetToDefaults}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Reset to Default Settings
                      </button>
                    </div>
                  </div>
                ) : activeTab === 'help' ? (
                  <div className="space-y-6">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-5">
                      <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 flex items-center mb-3">
                        <HelpCircle className="w-5 h-5 mr-2" />
                        Accessibility Resources
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-700/50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Getting Started Guide</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            Learn how to make the most of our accessibility features with our comprehensive guide.
                          </p>
                          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                            Read Guide
                          </button>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-700/50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Keyboard Shortcuts</h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                            <li className="flex">
                              <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mr-2">Tab</span>
                              <span>Navigate through interactive elements</span>
                            </li>
                            <li className="flex">
                              <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mr-2">Shift + Tab</span>
                              <span>Navigate backwards</span>
                            </li>
                            <li className="flex">
                              <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mr-2">Enter</span>
                              <span>Activate selected element</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-700/50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Need More Help?</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            Contact our support team for personalized assistance with accessibility features.
                          </p>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                            Contact Support
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-5">
                      <h3 className="text-lg font-medium text-green-800 dark:text-green-200 flex items-center mb-3">
                        <Keyboard className="w-5 h-5 mr-2" />
                        Keyboard Shortcuts
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { keys: 'Ctrl + /', action: 'Open accessibility panel' },
                          { keys: 'Esc', action: 'Close active panel' },
                          { keys: 'Tab', action: 'Next element' },
                          { keys: 'Shift + Tab', action: 'Previous element' },
                          { keys: 'Enter', action: 'Select/activate' },
                          { keys: 'Arrow Keys', action: 'Navigate menus' },
                          { keys: 'Space', action: 'Toggle checkboxes' },
                          { keys: 'F1', action: 'Open help center' },
                        ].map((shortcut, index) => (
                          <div 
                            key={index} 
                            className="bg-white dark:bg-gray-700/50 p-4 rounded-lg flex items-start"
                          >
                            <div className="font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md text-sm mr-4">
                              {shortcut.keys}
                            </div>
                            <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                              {shortcut.action}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Accessibility Documentation
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Panel */}
      <AnimatePresence>
        {feedbackOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => !isSubmitting && !submitted && setFeedbackOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              aria-modal="true"
              aria-labelledby="feedback-panel-title"
              role="dialog"
            >
              <div className="flex items-center justify-between p-5 border-b dark:border-gray-700">
                <h2 
                  id="feedback-panel-title"
                  className="text-xl font-bold text-gray-900 dark:text-white flex items-center"
                >
                  <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                  Share Your Feedback
                </h2>
                <button
                  onClick={() => !isSubmitting && !submitted && setFeedbackOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full p-1"
                  aria-label="Close feedback form"
                  disabled={isSubmitting}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {submitted ? (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-5"
                  >
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                      <ThumbsUp className="w-8 h-8 text-green-600" />
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your feedback has been submitted successfully. We appreciate your input!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="p-5 space-y-6">
                  {/* Feedback Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      What type of feedback do you have?
                    </label>
                    <select
                      value={feedbackType}
                      onChange={(e) => setFeedbackType(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      disabled={isSubmitting}
                    >
                      <option value="general">General Feedback</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="improvement">Improvement Suggestion</option>
                      <option value="accessibility">Accessibility Issue</option>
                    </select>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      How would you rate your experience?
                    </label>
                    <div className="flex justify-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="text-2xl transition-transform hover:scale-110 disabled:opacity-50"
                          disabled={isSubmitting}
                          aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-2">
                      <span className="flex items-center">
                        <Frown className="w-4 h-4 mr-1" /> Poor
                      </span>
                      <span className="flex items-center">
                        <Meh className="w-4 h-4 mr-1" /> Okay
                      </span>
                      <span className="flex items-center">
                        <Smile className="w-4 h-4 mr-1" /> Great
                      </span>
                    </div>
                  </div>

                  {/* Feedback Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Feedback
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                      placeholder="Tell us what you think, what you'd like to see, or any issues you encountered..."
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Screenshot */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <Image className="w-4 h-4 mr-2" />
                      Attach Screenshot (Optional)
                    </label>
                    {screenshot ? (
                      <div className="relative">
                        <img 
                          src={screenshot} 
                          alt="Screenshot preview" 
                          className="rounded-lg border border-gray-300 dark:border-gray-600 max-h-48 object-contain w-full"
                        />
                        <button
                          type="button"
                          onClick={removeScreenshot}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          aria-label="Remove screenshot"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors bg-gray-50 dark:bg-gray-700/50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Image className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload screenshot</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG (Max 5MB)</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleScreenshotUpload}
                          disabled={isSubmitting}
                        />
                      </label>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3.5 px-4 rounded-lg text-white font-medium flex items-center justify-center transition-colors ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg'
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Feedback
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityFeedback;