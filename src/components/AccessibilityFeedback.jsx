import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, X, Send, ThumbsUp, ThumbsDown, 
  Star, Accessibility, Volume2, Eye, Keyboard,
  HelpCircle, Settings, ChevronRight
} from 'lucide-react';

const AccessibilityFeedback = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('general');

  // Accessibility features
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: 'medium',
    contrast: 'normal',
    screenReader: false,
    keyboardNav: true,
    animations: true
  });

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Mock feedback submission
    console.log('Feedback submitted:', { rating, feedback, feedbackType });
    alert('Thank you for your feedback! We appreciate your input.');
    setFeedback('');
    setRating(0);
    setFeedbackOpen(false);
  };

  const updateAccessibilitySetting = (setting, value) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    // Apply accessibility changes to document
    if (setting === 'fontSize') {
      document.documentElement.style.fontSize = value === 'large' ? '120%' : value === 'small' ? '90%' : '100%';
    }
    if (setting === 'contrast') {
      document.documentElement.className = value === 'high' ? 'high-contrast' : '';
    }
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
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
          aria-label="Accessibility Settings"
        >
          <Accessibility className="w-6 h-6" />
        </motion.button>

        {/* Feedback Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFeedbackOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-colors"
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
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setAccessibilityOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Accessibility className="w-5 h-5 mr-2 text-blue-600" />
                  Accessibility Settings
                </h2>
                <button
                  onClick={() => setAccessibilityOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close accessibility settings"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size
                  </label>
                  <div className="flex gap-2">
                    {['small', 'medium', 'large'].map((size) => (
                      <button
                        key={size}
                        onClick={() => updateAccessibilitySetting('fontSize', size)}
                        className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                          accessibilitySettings.fontSize === size
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contrast */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contrast
                  </label>
                  <div className="flex gap-2">
                    {['normal', 'high'].map((contrast) => (
                      <button
                        key={contrast}
                        onClick={() => updateAccessibilitySetting('contrast', contrast)}
                        className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                          accessibilitySettings.contrast === contrast
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {contrast.charAt(0).toUpperCase() + contrast.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggle Options */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Volume2 className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Screen Reader Support</span>
                    </div>
                    <button
                      onClick={() => updateAccessibilitySetting('screenReader', !accessibilitySettings.screenReader)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        accessibilitySettings.screenReader ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          accessibilitySettings.screenReader ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Keyboard className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Keyboard Navigation</span>
                    </div>
                    <button
                      onClick={() => updateAccessibilitySetting('keyboardNav', !accessibilitySettings.keyboardNav)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        accessibilitySettings.keyboardNav ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          accessibilitySettings.keyboardNav ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Animations</span>
                    </div>
                    <button
                      onClick={() => updateAccessibilitySetting('animations', !accessibilitySettings.animations)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        accessibilitySettings.animations ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          accessibilitySettings.animations ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 mr-1" />
                  Learn more about accessibility
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
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setFeedbackOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                  Share Your Feedback
                </h2>
                <button
                  onClick={() => setFeedbackOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close feedback form"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                {/* Feedback Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback Type
                  </label>
                  <select
                    value={feedbackType}
                    onChange={(e) => setFeedbackType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="general">General Feedback</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="improvement">Improvement Suggestion</option>
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rate Your Experience
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-2xl transition-colors"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Feedback
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Tell us what you think..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Feedback
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityFeedback;
