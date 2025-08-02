import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, X, Send, Bot, User, Minimize2, Maximize2,
  Sparkles, ArrowRight, HelpCircle, Settings, MapPin,
  Truck, BarChart3, Shield, Clock, Globe
} from 'lucide-react';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm eyezho, your IntelliRoute Africa AI assistant. I'm here to help you navigate our platform, set up your account, and answer any questions about our logistics solutions. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        "Tell me about IntelliRoute Africa",
        "How do I set up my account?",
        "What features do you offer?",
        "Help with fleet management"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Comprehensive knowledge base about IntelliRoute Africa
  const knowledgeBase = {
    company: {
      name: "IntelliRoute Africa",
      description: "Leading AI-powered logistics platform transforming African supply chains",
      mission: "To revolutionize logistics across Africa using cutting-edge technology",
      coverage: "35+ African countries",
      users: "50,000+ active users",
      founded: "2020",
      awards: ["2024 Africa Tech Pioneer Award", "Best Logistics Innovation 2023"]
    },
    features: {
      aiRouting: "AI-powered route optimization that reduces delivery times by up to 85%",
      fleetTracking: "Real-time GPS tracking with 99.8% accuracy",
      predictiveMaintenance: "AI predicts vehicle maintenance needs, reducing downtime by 70%",
      borderOptimization: "Automated customs documentation and border crossing optimization",
      geoFencing: "Smart alerts for zone entries/exits and security monitoring",
      sustainability: "Carbon footprint tracking with eco-routing options"
    },
    roles: {
      admin: "Full system access, user management, analytics, and configuration",
      fleet_manager: "Fleet oversight, route planning, driver management, and performance analytics",
      driver: "Trip management, navigation, delivery confirmations, and performance tracking",
      operations_manager: "Operations oversight, dispatch management, and efficiency monitoring"
    },
    pricing: {
      basic: "Free tier with basic tracking for up to 5 vehicles",
      professional: "$49/month per vehicle with advanced analytics",
      enterprise: "Custom pricing for large fleets with dedicated support"
    }
  };

  // AI response generator
  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Company information
    if (message.includes('what is') || message.includes('tell me about') || message.includes('company')) {
      return {
        content: `IntelliRoute Africa is a leading AI-powered logistics platform that's transforming supply chains across Africa. We serve ${knowledgeBase.company.coverage} with ${knowledgeBase.company.users}, helping businesses reduce delivery times by up to 85% and cut operational costs by 75%. Our mission is to revolutionize logistics using cutting-edge technology specifically designed for African challenges.`,
        suggestions: ["What features do you offer?", "How do I get started?", "Tell me about pricing", "Show me the dashboard"]
      };
    }

    // Features
    if (message.includes('feature') || message.includes('what can') || message.includes('capabilities')) {
      return {
        content: `Our platform offers comprehensive logistics solutions:\n\n🚛 **AI Route Optimization** - Reduces delivery times by 85%\n📍 **Real-time Fleet Tracking** - 99.8% GPS accuracy\n🔧 **Predictive Maintenance** - 70% less downtime\n🌍 **Border Crossing Optimization** - Automated customs\n🎯 **Geo-fencing & Alerts** - Smart security monitoring\n🌱 **Sustainability Analytics** - Carbon footprint tracking\n\nWhich feature would you like to learn more about?`,
        suggestions: ["Route optimization details", "Fleet tracking setup", "Maintenance alerts", "Border crossing help"]
      };
    }

    // Account setup
    if (message.includes('setup') || message.includes('account') || message.includes('get started') || message.includes('register')) {
      return {
        content: `Setting up your IntelliRoute Africa account is easy! Here's how:\n\n1️⃣ **Choose Your Role**:\n   • Admin - Full system access\n   • Fleet Manager - Fleet oversight\n   • Driver - Trip management\n   • Operations Manager - Dispatch control\n\n2️⃣ **Registration Process**:\n   • Click 'Register' in the top navigation\n   • Fill in your details and select your role\n   • Verify your email\n   • Complete your profile\n\n3️⃣ **Dashboard Setup**:\n   • Add your vehicles and drivers\n   • Configure your routes\n   • Set up notifications\n\nWould you like me to guide you through any specific step?`,
        suggestions: ["Help with registration", "Dashboard walkthrough", "Add vehicles", "User roles explained"]
      };
    }

    // Dashboard help
    if (message.includes('dashboard') || message.includes('navigate') || message.includes('interface')) {
      return {
        content: `Your dashboard is personalized based on your role:\n\n📊 **Key Sections**:\n   • Overview - Key metrics and alerts\n   • Fleet Management - Vehicle tracking and status\n   • Route Planning - AI-optimized routing\n   • Analytics - Performance insights\n   • Settings - Account configuration\n\n🎯 **Quick Actions**:\n   • View real-time vehicle locations\n   • Create and optimize routes\n   • Monitor driver performance\n   • Access maintenance alerts\n   • Generate reports\n\nNeed help with a specific dashboard feature?`,
        suggestions: ["Fleet tracking", "Route planning", "Analytics", "Settings help"]
      };
    }

    // Pricing
    if (message.includes('price') || message.includes('cost') || message.includes('plan')) {
      return {
        content: `We offer flexible pricing to suit every business size:\n\n🆓 **Basic Plan** - FREE\n   • Up to 5 vehicles\n   • Basic tracking\n   • Standard support\n\n💼 **Professional** - $49/vehicle/month\n   • Advanced analytics\n   • AI route optimization\n   • Priority support\n   • Maintenance alerts\n\n🏢 **Enterprise** - Custom pricing\n   • Unlimited vehicles\n   • Dedicated support\n   • Custom integrations\n   • Advanced reporting\n\nReady to start your free trial?`,
        suggestions: ["Start free trial", "Compare plans", "Contact sales", "Custom quote"]
      };
    }

    // Troubleshooting
    if (message.includes('problem') || message.includes('issue') || message.includes('help') || message.includes('error')) {
      return {
        content: `I'm here to help! Here are common solutions:\n\n🔧 **Login Issues**:\n   • Check your email and password\n   • Try password reset\n   • Clear browser cache\n\n📱 **Dashboard Problems**:\n   • Refresh the page\n   • Check internet connection\n   • Try a different browser\n\n🚛 **Tracking Issues**:\n   • Verify GPS permissions\n   • Check device connectivity\n   • Update location settings\n\nWhat specific issue are you experiencing?`,
        suggestions: ["Login problems", "Dashboard not loading", "GPS tracking issues", "Contact support"]
      };
    }

    // Default response
    return {
      content: `I understand you're asking about "${userMessage}". While I don't have specific information on that topic, I can help you with:\n\n• IntelliRoute Africa platform overview\n• Account setup and registration\n• Dashboard navigation\n• Feature explanations\n• Troubleshooting\n• Pricing information\n\nWhat would you like to know more about?`,
      suggestions: ["Platform overview", "Get started guide", "Feature tour", "Contact human support"]
    };
  };

  const handleSendMessage = async (messageText = null) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(text);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions || []
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg z-50 hover:shadow-xl transition-shadow"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
            />
          </div>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 60 : 600
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 left-6 w-96 bg-white rounded-lg shadow-2xl z-50 border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot className="w-8 h-8" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Zara AI Assistant</h3>
                  <p className="text-xs opacity-90">IntelliRoute Africa Guide</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                  aria-label={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-xs ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        }`}>
                          {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={`p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-500 text-white rounded-br-none'
                            : 'bg-white border rounded-bl-none shadow-sm'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          {message.suggestions && message.suggestions.length > 0 && (
                            <div className="mt-3 space-y-1">
                              {message.suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSendMessage(suggestion)}
                                  className="block w-full text-left text-xs p-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2 max-w-xs">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="p-3 bg-white border rounded-lg rounded-bl-none shadow-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask me anything about IntelliRoute Africa..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim() || isTyping}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Powered by IntelliRoute AI • Available 24/7
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
