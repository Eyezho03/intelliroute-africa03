import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, X, Send, Bot, User, Minimize2, Maximize2,
  Truck, BarChart3, MapPin, ShoppingBag, Route, Globe, 
  HelpCircle, Settings, ArrowRight, Sparkles, Package, 
  Factory, Store, TrendingUp, AlertTriangle, DollarSign,
  Clock, CheckCircle, RefreshCw, Brain, Zap, Star
} from 'lucide-react';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm IntelliBot, your IntelliRoute Africa AI assistant. I'm here to help you navigate our platform, onboard your business, and answer logistics questions. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        "Tell me about IntelliRoute Africa",
        "How do I sign up my business?",
        "What features do you offer?",
        "Explain your pricing"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [activeForm, setActiveForm] = useState(null);

  // Updated knowledge base for IntelliRoute Africa
  const knowledgeBase = {
    company: {
      name: "IntelliRoute Africa",
      description: "AI-powered logistics platform transforming African supply chains",
      mission: "To revolutionize logistics across Africa using cutting-edge technology",
      vision: "Become Africa's leading logistics optimization platform",
      coverage: "Kenya, Tanzania, Uganda, Rwanda, Nigeria",
      founded: "2020"
    },
    features: {
      smeDashboard: "Manage inventory, orders, and deliveries in one place",
      driverApp: "Real-time driver updates and optimized routes",
      routeEngine: "AI-powered optimization for best time/distance routes",
      retailWholesale: "Connect retailers and wholesalers directly",
      analytics: "Performance insights and delivery metrics"
    },
    businessTypes: ["Producer", "Wholesaler", "Retailer", "Driver"],
    pricing: {
      basic: "KSh 2,500/month - Up to 5 vehicles",
      pro: "KSh 5,000/month - Up to 20 vehicles",
      enterprise: "Custom pricing - Unlimited vehicles and features"
    },
    onboarding: {
      steps: [
        "1. Fill out the business information form",
        "2. Verify your email address",
        "3. Complete your profile setup",
        "4. Add your vehicles and drivers",
        "5. Start optimizing your routes!"
      ],
      time: "Onboarding takes less than 15 minutes"
    }
  };

  // Onboarding form component
  const renderOnboardingForm = () => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-2">
      <h3 className="font-medium text-gray-800 mb-3">Business Onboarding</h3>
      <form className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Business Name</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="Your business name"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Contact Person</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
            <input 
              type="tel" 
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              placeholder="+254 xxx xxx xxx"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
          <input 
            type="email" 
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="business@email.com"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Business Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white">
              {knowledgeBase.businessTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Fleet Size</label>
            <input 
              type="number" 
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              placeholder="Number of vehicles"
              min="1"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
          <div className="grid grid-cols-2 gap-3">
            <select className="px-3 py-2 border border-gray-300 rounded text-sm">
              <option>Select County</option>
              <option>Nairobi</option>
              <option>Mombasa</option>
              <option>Kisumu</option>
              <option>Nakuru</option>
            </select>
            <input 
              type="text" 
              className="px-3 py-2 border border-gray-300 rounded text-sm"
              placeholder="Town"
            />
          </div>
        </div>
        
        <div className="flex items-center">
          <input type="checkbox" id="demo-request" className="mr-2" />
          <label htmlFor="demo-request" className="text-sm text-gray-700">I want a personalized demo</label>
        </div>
        
        <div className="flex justify-between pt-2">
          <button 
            type="button" 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded text-sm"
            onClick={() => setActiveForm(null)}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded text-sm"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );

  // Enhanced AI response generator with comprehensive responses
  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Platform Overview
    if (message.includes('platform overview') || message.includes('what is intelliroute') || message.includes('tell me about') || message.includes('company')) {
      const liveStats = {
        activeVehicles: Math.floor(Math.random() * 500) + 1200,
        dailyDeliveries: Math.floor(Math.random() * 5000) + 15000,
        savedCosts: Math.floor(Math.random() * 1000000) + 2500000
      };
      return {
        content: `🌍 **IntelliRoute Africa Platform Overview**

**IntelliRoute Africa** is East Africa's premier AI-powered supply chain and logistics optimization platform, serving ${knowledgeBase.company.coverage}.

📊 **Live Platform Statistics:**
🚚 Active Vehicles: ${liveStats.activeVehicles.toLocaleString()}
📦 Daily Deliveries: ${liveStats.dailyDeliveries.toLocaleString()}
💰 Monthly Cost Savings: KES ${liveStats.savedCosts.toLocaleString()}
🏢 Active Partners: 2,623+ across all tiers

🎯 **What We Do:**
• **Supply Chain Management** - End-to-end visibility from Producers to Consumers
• **Route Optimization** - AI-powered logistics with 85% delivery time reduction
• **Inventory Intelligence** - Real-time tracking with predictive analytics
• **Multi-Tier Integration** - Seamlessly connect Producers, Wholesalers, Retailers
• **Cost Reduction** - Average 75% operational cost savings

Founded in ${knowledgeBase.company.founded}, we've revolutionized how African businesses manage their supply chains.`,
        suggestions: ["See our features", "View pricing plans", "Start onboarding", "Request demo"]
      };
    }

    // Requirements for signing up
    if (message.includes('requirements') || message.includes('see requirements') || message.includes('what do i need') || message.includes('qualification')) {
      return {
        content: `📋 **Business Registration Requirements**

**Required Documents & Information:**

🏢 **Business Details:**
• Valid Business Registration Certificate
• KRA PIN Certificate
• Business Permit/License
• Company Profile or Business Plan

👥 **Contact Information:**
• Primary Contact Person (Full Name & ID)
• Business Phone Number
• Official Business Email
• Physical Business Address

🚛 **Fleet Information (if applicable):**
• Vehicle Registration Details
• Driver License Information
• Insurance Certificates
• Vehicle Inspection Certificates

💰 **Financial Requirements:**
• Bank Account Details
• Recent Bank Statements (3 months)
• Tax Compliance Certificate

📱 **Technical Requirements:**
• Smartphone/Computer with Internet
• GPS-enabled devices for tracking
• Basic digital literacy for platform use

✅ **Eligibility Criteria:**
• Registered business in Kenya/East Africa
• Active operations for minimum 6 months
• Valid business documentation
• Commitment to digital transformation`,
        suggestions: ["Start application", "Schedule consultation", "Contact support", "View pricing"]
      };
    }

    // Features and capabilities
    if (message.includes('feature') || message.includes('what can') || message.includes('capabilities') || message.includes('services') || message.includes('see our features')) {
      return {
        content: `🚀 **IntelliRoute Africa Features & Capabilities**

📊 **Supply Chain Management Dashboard:**
• Real-time inventory tracking across all tiers
• Demand forecasting with AI predictions
• Supply chain flow visualization
• Partner performance analytics
• Critical alerts and notifications

🚚 **Smart Logistics & Route Optimization:**
• AI-powered route planning
• Real-time traffic integration
• Fuel cost optimization
• Delivery time predictions
• Driver performance tracking

📱 **Mobile Applications:**
• Driver mobile app with GPS tracking
• Real-time delivery updates
• Photo proof of delivery
• Emergency assistance features
• Offline capability

🛒 **B2B Marketplace Integration:**
• Direct Producer-Wholesaler-Retailer connections
• Automated order processing
• Bulk pricing negotiations
• Payment integration
• Credit management

📈 **Advanced Analytics:**
• Cost analysis and optimization
• Performance benchmarking
• Predictive maintenance
• Market trend analysis
• ROI tracking

🔔 **Smart Notifications:**
• Inventory low-stock alerts
• Delivery status updates
• Supply chain disruption warnings
• Performance milestone notifications`,
        suggestions: ["SME Dashboard details", "Driver App features", "Route optimization", "Analytics platform"]
      };
    }

    // SME Dashboard details
    if (message.includes('sme dashboard') || message.includes('dashboard details')) {
      return {
        content: `📊 **SME Dashboard - Complete Overview**

**Main Dashboard Features:**

🏠 **Overview Panel:**
• Live business metrics and KPIs
• Today's deliveries and orders
• Revenue tracking and forecasts
• Quick action buttons

📦 **Inventory Management:**
• Real-time stock levels
• Low stock alerts and reorder points
• Product categorization
• Supplier tracking
• Demand forecasting

🚚 **Logistics Control:**
• Vehicle tracking and status
• Route optimization tools
• Driver assignment and management
• Fuel cost monitoring
• Delivery scheduling

📋 **Order Management:**
• Order processing workflow
• Status tracking and updates
• Customer communication
• Invoice generation
• Payment tracking

📈 **Analytics & Reports:**
• Performance dashboards
• Cost analysis reports
• Trend analysis
• Custom report generation
• Export capabilities

⚙️ **Settings & Configuration:**
• User management
• Notification preferences
• System integrations
• Security settings

**Access Levels:** Admin, Manager, Operator, Viewer`,
        suggestions: ["View live demo", "See pricing", "Start trial", "Contact support"]
      };
    }

    // Driver App features
    if (message.includes('driver app') || message.includes('mobile app')) {
      return {
        content: `📱 **Driver Mobile App Features**

**Core Functionality:**

🗺️ **Navigation & Routing:**
• Turn-by-turn GPS navigation
• Real-time traffic updates
• Alternative route suggestions
• Fuel-efficient route optimization
• Offline map capability

📋 **Delivery Management:**
• Digital delivery manifest
• Customer signature capture
• Photo proof of delivery
• Delivery status updates
• Failed delivery reporting

💬 **Communication Tools:**
• Direct chat with dispatch
• Customer notification system
• Emergency contact features
• Voice messages support

📊 **Performance Tracking:**
• Daily earnings summary
• Delivery completion rates
• Fuel consumption tracking
• Performance ratings
• Achievement badges

🛡️ **Safety Features:**
• Emergency panic button
• Breakdown assistance
• Safety check-ins
• Weather alerts
• Speed monitoring

⚙️ **Vehicle Management:**
• Vehicle inspection checklists
• Maintenance reminders
• Fuel logging
• Expense tracking

**Compatible with:** Android & iOS
**Offline Mode:** Available for core functions`,
        suggestions: ["Download driver app", "Driver requirements", "Training program", "Support contact"]
      };
    }

    // Route optimization details
    if (message.includes('route optimization') || message.includes('ai route')) {
      return {
        content: `🧠 **AI Route Optimization Engine**

**Advanced Optimization Features:**

🎯 **Smart Route Planning:**
• Multi-stop optimization algorithms
• Dynamic rerouting based on traffic
• Delivery time window optimization
• Vehicle capacity optimization
• Driver skill-based assignment

📊 **Real-Time Data Integration:**
• Live traffic conditions
• Weather impact analysis
• Road closure notifications
• Fuel price optimization
• Customer availability

💰 **Cost Optimization:**
• Fuel consumption minimization
• Toll road optimization
• Vehicle wear reduction
• Time efficiency maximization
• Driver overtime minimization

📈 **Performance Metrics:**
• Route efficiency scores
• Delivery time accuracy
• Cost per kilometer
• Customer satisfaction ratings
• Environmental impact tracking

🔮 **Predictive Analytics:**
• Traffic pattern learning
• Seasonal demand forecasting
• Optimal delivery windows
• Resource planning
• Capacity optimization

**Results Achieved:**
• 85% reduction in delivery times
• 75% decrease in fuel costs
• 92% improvement in on-time delivery
• 60% reduction in vehicle wear

**AI Technologies Used:** Machine Learning, Predictive Analytics, Real-time Processing`,
        suggestions: ["See demo", "Implementation process", "ROI calculator", "Technical specs"]
      };
    }

    // Analytics platform
    if (message.includes('analytics') || message.includes('reports') || message.includes('analytics platform')) {
      return {
        content: `📈 **Advanced Analytics Platform**

**Business Intelligence Dashboard:**

📊 **Supply Chain Analytics:**
• End-to-end visibility metrics
• Partner performance scorecards
• Inventory turnover analysis
• Cost breakdown analysis
• Efficiency benchmarking

🚚 **Logistics Analytics:**
• Delivery performance metrics
• Route efficiency analysis
• Vehicle utilization reports
• Driver productivity tracking
• Fuel consumption analytics

💰 **Financial Analytics:**
• Revenue trend analysis
• Cost optimization opportunities
• Profit margin tracking
• ROI measurement
• Budget vs. actual reporting

📋 **Operational Analytics:**
• Order fulfillment metrics
• Customer satisfaction scores
• Service level achievements
• Process efficiency analysis
• Quality control metrics

🔮 **Predictive Analytics:**
• Demand forecasting
• Capacity planning
• Risk assessment
• Market trend predictions
• Maintenance scheduling

**Custom Reporting:**
• Drag-and-drop report builder
• Scheduled report delivery
• Export to multiple formats
• Real-time data updates
• Mobile-responsive dashboards

**Data Integration:** ERP, WMS, TMS, Accounting Systems`,
        suggestions: ["View sample reports", "Custom analytics", "API integration", "Training sessions"]
      };
    }

    // Pricing plans
    if (message.includes('price') || message.includes('cost') || message.includes('plan') || message.includes('pricing') || message.includes('view pricing')) {
      return {
        content: `💰 **IntelliRoute Africa Pricing Plans**

**💎 Basic Plan - ${knowledgeBase.pricing.basic}**
✅ Up to 5 vehicles
✅ Basic route optimization
✅ Real-time tracking
✅ Mobile driver app
✅ Basic reporting
✅ Email support

**🚀 Professional Plan - ${knowledgeBase.pricing.pro}**
✅ Up to 20 vehicles
✅ Advanced AI optimization
✅ Supply chain analytics
✅ Inventory management
✅ Custom reports
✅ Priority support
✅ API access

**🏢 Enterprise Plan - ${knowledgeBase.pricing.enterprise}**
✅ Unlimited vehicles
✅ Multi-location support
✅ Advanced analytics
✅ Custom integrations
✅ Dedicated account manager
✅ White-label options
✅ 24/7 phone support

**🎁 All Plans Include:**
• 14-day free trial
• Setup and training
• Regular updates
• Data security
• Mobile apps

**💳 Payment Options:**
• Monthly or annual billing
• Mobile money (M-Pesa, Airtel)
• Bank transfer
• Credit card

**🎯 ROI Guarantee:** Most customers see 200%+ ROI within 6 months`,
        suggestions: ["Start free trial", "Compare features", "Request quote", "Schedule demo"]
      };
    }

    // Compare plans
    if (message.includes('compare') || message.includes('difference') || message.includes('compare plans')) {
      return {
        content: `📊 **Plan Comparison Matrix**

| Feature | Basic | Pro | Enterprise |
|---------|-------|-----|------------|
| **Vehicles** | 5 | 20 | Unlimited |
| **Route Optimization** | ✅ Basic | ✅ Advanced | ✅ AI-Powered |
| **Real-time Tracking** | ✅ | ✅ | ✅ |
| **Mobile Apps** | ✅ | ✅ | ✅ |
| **Inventory Management** | ❌ | ✅ | ✅ |
| **Advanced Analytics** | ❌ | ✅ | ✅ |
| **API Access** | ❌ | ✅ | ✅ |
| **Custom Reports** | ❌ | ✅ | ✅ |
| **Multi-location** | ❌ | ❌ | ✅ |
| **White-label** | ❌ | ❌ | ✅ |
| **Support** | Email | Priority | 24/7 Phone |
| **Training** | Online | Live | Dedicated |

**🎯 Recommendations:**
• **Basic:** Small businesses, 1-5 vehicles
• **Professional:** Growing companies, 6-20 vehicles
• **Enterprise:** Large operations, 20+ vehicles

**💡 Most Popular:** Professional Plan (60% of customers)
**🏆 Best Value:** Annual payment (20% discount)`,
        suggestions: ["Start with Basic", "Try Professional", "Enterprise demo", "Contact sales"]
      };
    }

    // Contact support
    if (message.includes('contact') || message.includes('support') || message.includes('help')) {
      return {
        content: `📞 **Contact IntelliRoute Africa Support**

**📱 Phone Support:**
• Kenya: +254 700 123 456
• Tanzania: +255 700 123 456
• Uganda: +256 700 123 456
• Hours: Mon-Fri 8AM-8PM, Sat 9AM-5PM

**📧 Email Support:**
• General: support@intellirouteafrica.com
• Sales: sales@intellirouteafrica.com
• Technical: tech@intellirouteafrica.com
• Partnership: partners@intellirouteafrica.com

**💬 Live Chat:**
• Available 24/7 through our website
• Average response time: 2 minutes
• Multi-language support

**🏢 Physical Offices:**
• **Nairobi HQ:** Westlands, Nairobi, Kenya
• **Kampala:** Nakasero, Kampala, Uganda
• **Dar es Salaam:** Kivukoni, Tanzania

**📱 Social Media:**
• Twitter: @IntelliRouteAfrica
• LinkedIn: IntelliRoute Africa
• Facebook: IntelliRoute Africa

**🎓 Training & Resources:**
• Online knowledge base
• Video tutorials
• Webinar training sessions
• User community forum

**⚡ Emergency Support:**
• 24/7 emergency hotline for critical issues
• Dedicated enterprise support team`,
        suggestions: ["Schedule call", "Send email", "Live chat", "Visit office"]
      };
    }

    // Schedule demo
    if (message.includes('demo') || message.includes('schedule') || message.includes('request demo')) {
      return {
        content: `🎥 **Schedule Your IntelliRoute Africa Demo**

**📅 Available Demo Types:**

**🖥️ Live Online Demo (30 minutes):**
• Personalized platform walkthrough
• Feature demonstration
• Q&A session
• ROI calculation
• Next steps discussion

**🏢 On-site Demo (1-2 hours):**
• Full system demonstration
• Integration planning
• Team training overview
• Custom solution design

**📱 Self-Service Demo:**
• Interactive online tour
• Sample data playground
• Feature exploration
• Available 24/7

**🕐 Available Time Slots:**
• Morning: 9:00 AM - 12:00 PM
• Afternoon: 2:00 PM - 5:00 PM
• Evening: 6:00 PM - 8:00 PM
• Weekend slots available

**👥 Who Should Attend:**
• Business owner/CEO
• Operations manager
• IT/Tech team member
• Finance representative

**📋 Demo Agenda:**
• Business needs assessment (5 min)
• Platform overview (15 min)
• Feature deep-dive (20 min)
• Implementation planning (10 min)
• Q&A and next steps (10 min)

**🎁 Demo Bonus:**
• Extended 30-day free trial
• Free setup consultation
• Custom ROI report

**To schedule, please provide:**
• Preferred date and time
• Number of attendees
• Specific areas of interest
• Current challenges`,
        suggestions: ["Schedule now", "Self-service demo", "Contact sales", "Download brochure"]
      };
    }

    // Account setup and onboarding
    if (message.includes('setup') || message.includes('account') || message.includes('sign up') || message.includes('register') || message.includes('onboard') || message.includes('get started') || message.includes('begin onboarding') || message.includes('start onboarding')) {
      return {
        content: `🚀 **Business Onboarding Process**

**Step-by-Step Registration:**

**📋 Step 1: Business Information (5 minutes)**
• Company details and registration
• Contact information
• Business type selection
• Fleet size and operations

**📧 Step 2: Email Verification (2 minutes)**
• Verify your business email
• Activate your account
• Receive welcome materials

**🔧 Step 3: System Setup (10 minutes)**
• Configure business settings
• Upload business documents
• Set up user roles and permissions
• Payment method setup

**🚛 Step 4: Fleet Integration (15 minutes)**
• Add vehicles to system
• Register drivers
• Install mobile apps
• Configure tracking devices

**🎓 Step 5: Training & Launch (30 minutes)**
• Platform training session
• Best practices guide
• Test runs and validation
• Go-live support

**⏱️ Total Time: Less than 1 hour**
**🆓 Setup Cost: Free with all plans**
**👥 Dedicated Support: Personal onboarding specialist**

**✅ What You'll Receive:**
• Complete system setup
• Team training materials
• 30-day success guarantee
• Ongoing support access`,
        suggestions: ["Start registration", "See requirements", "Schedule setup call", "Download checklist"]
      };
    }

    // Start registration/onboarding form
    if (message.includes('start registration') || message.includes('begin registration') || message.includes('start application')) {
      return {
        content: `Great! Let's get your business set up on IntelliRoute Africa. I'll guide you through our quick registration process.`,
        form: "onboarding",
        suggestions: []
      };
    }

    // Default comprehensive response
    return {
      content: `🤖 **IntelliRoute Africa AI Assistant**

I can help you with detailed information about:

🏢 **Platform & Business:**
• Complete platform overview
• Business registration requirements
• Onboarding process
• Success stories

💰 **Pricing & Plans:**
• Detailed pricing breakdown
• Plan comparisons
• ROI calculations
• Free trial options

🚀 **Features & Capabilities:**
• SME Dashboard walkthrough
• Driver mobile app features
• AI route optimization
• Advanced analytics

📞 **Support & Demos:**
• Contact information
• Demo scheduling
• Training resources
• Technical support

**Just ask me anything specific, like:**
• "Show me the requirements for signing up"
• "What features does the SME dashboard have?"
• "How much does the Professional plan cost?"
• "Schedule a demo for my business"`,
      suggestions: ["Platform overview", "Registration requirements", "View all features", "See pricing plans", "Schedule demo", "Contact support"]
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
        suggestions: aiResponse.suggestions || [],
        form: aiResponse.form || null
      };

      setMessages(prev => [...prev, botMessage]);
      if (aiResponse.form) setActiveForm(aiResponse.form);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeForm]);

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
          className="fixed bottom-6 right-6 bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-full shadow-lg z-50 hover:shadow-xl transition-shadow flex items-center"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
            />
          </div>
          <span className="ml-2 font-medium">Help Center</span>
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
            className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-2xl z-50 border border-gray-200 overflow-hidden flex flex-col"
            style={{ height: isMinimized ? '60px' : '600px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot className="w-8 h-8" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="font-semibold">IntelliBot Assistant</h3>
                  <p className="text-xs opacity-90">IntelliRoute Africa Support</p>
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
              <div className="flex flex-col" style={{ height: '536px' }}>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" style={{ scrollBehavior: 'smooth', minHeight: '0px' }}>
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
                            : 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                        }`}>
                          {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={`p-3 rounded-lg max-w-[70%] ${
                          message.type === 'user'
                            ? 'bg-blue-500 text-white rounded-br-none'
                            : 'bg-white border rounded-bl-none shadow-sm'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          
                          {/* Render form if present */}
                          {message.form === "onboarding" && renderOnboardingForm()}
                          
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
                          <p className="text-xs opacity-70 mt-1 text-right">
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
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white flex items-center justify-center">
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
                      placeholder="Ask about IntelliRoute Africa..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim() || isTyping}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Powered by IntelliRoute AI • Available 24/7
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;