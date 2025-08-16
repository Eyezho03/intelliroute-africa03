import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, Send, X, Bot, User, Lightbulb, AlertTriangle, 
  Package, ShoppingCart, Factory, Store, TrendingUp, BarChart3,
  Clock, DollarSign, Truck, RefreshCw, Brain, Zap
} from 'lucide-react';

const EnhancedAIChat = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMode, setChatMode] = useState('general'); // general, inventory, orders, analytics
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Enhanced supply chain context responses
  const supplyChainResponses = {
    inventory: {
      low_stock: [
        {
          type: 'alert',
          message: "⚠️ Critical inventory alert detected! I found 3 products with critically low stock levels:",
          data: {
            items: [
              { name: "Maize (White)", current: 245, minimum: 1000, supplier: "Nakuru Grains Ltd" },
              { name: "Coffee Beans (Arabica)", current: 89, minimum: 500, supplier: "Meru Coffee Co-op" },
              { name: "Personal Care Bundle", current: 156, minimum: 800, supplier: "Nairobi Distributors" }
            ]
          },
          suggestions: [
            "Place emergency restocking orders",
            "Contact alternative suppliers",
            "Adjust pricing to manage demand",
            "Set up automated reorder alerts"
          ]
        }
      ],
      demand_forecast: [
        {
          type: 'analysis',
          message: "📊 Based on seasonal trends and current market data, here's the demand forecast for the next 30 days:",
          data: {
            categories: [
              { name: "Personal Care", predicted_increase: "35%", reason: "Holiday season approaching" },
              { name: "Food & Beverages", predicted_increase: "22%", reason: "Festival season demand" },
              { name: "Agricultural Tools", predicted_increase: "18%", reason: "Planting season" }
            ]
          },
          recommendations: [
            "Increase inventory by 25-30% for high-demand categories",
            "Negotiate bulk pricing with wholesalers",
            "Consider promotional pricing for slow-moving items"
          ]
        }
      ]
    },
    orders: {
      status_inquiry: [
        {
          type: 'status',
          message: "📦 Here's a summary of recent order activities across your supply chain:",
          data: {
            producers: { pending: 12, processing: 8, shipped: 24, delivered: 156 },
            wholesalers: { pending: 35, processing: 28, shipped: 67, delivered: 234 },
            retailers: { pending: 189, processing: 145, shipped: 298, delivered: 1567 }
          },
          insights: [
            "Retailer orders are 15% higher than last month",
            "Average processing time has improved by 2.3 days",
            "Delivery success rate is currently 94.8%"
          ]
        }
      ],
      optimization: [
        {
          type: 'recommendation',
          message: "🚀 I've identified several optimization opportunities for your order management:",
          suggestions: [
            {
              title: "Bulk Order Consolidation",
              description: "Combine 12 small orders from Nairobi region into 3 bulk deliveries",
              savings: "KES 15,400 in delivery costs"
            },
            {
              title: "Supplier Route Optimization",
              description: "Adjust pickup sequence from Mombasa suppliers",
              savings: "2.5 hours delivery time, KES 3,200 fuel costs"
            }
          ]
        }
      ]
    },
    analytics: {
      performance: [
        {
          type: 'metrics',
          message: "📈 Current supply chain performance metrics show strong growth:",
          data: {
            revenue_growth: "18.7%",
            efficiency_improvement: "12.3%",
            customer_satisfaction: "94.2%",
            cost_reduction: "8.9%"
          },
          trends: [
            "Revenue growth accelerating (+3.2% vs last month)",
            "Inventory turnover improved by 15%",
            "Customer retention rate at all-time high of 89%"
          ]
        }
      ]
    },
    disruptions: {
      alerts: [
        {
          type: 'alert',
          message: "🚨 Supply chain disruption detected! Here are the active issues:",
          disruptions: [
            {
              severity: 'high',
              location: 'Uganda Border',
              product: 'Coffee Beans',
              description: 'Customs delays affecting 3 shipments',
              estimated_delay: '2-3 days',
              alternative_actions: ['Contact local suppliers', 'Expedite Tanzania route']
            },
            {
              severity: 'medium',
              location: 'Mombasa Port',
              product: 'Electronics',
              description: 'Port congestion affecting container processing',
              estimated_delay: '1-2 days',
              alternative_actions: ['Use Dar es Salaam port', 'Switch to air freight for urgent orders']
            }
          ]
        }
      ]
    }
  };

  // Sample supply chain focused quick actions
  const quickActions = [
    { 
      id: 'inventory_status', 
      label: 'Check Inventory Status', 
      icon: Package,
      category: 'inventory',
      query: 'Show me current inventory levels and any critical alerts'
    },
    { 
      id: 'order_summary', 
      label: 'Order Summary', 
      icon: ShoppingCart,
      category: 'orders', 
      query: 'Give me a summary of recent orders and their status'
    },
    { 
      id: 'demand_forecast', 
      label: 'Demand Forecasting', 
      icon: TrendingUp,
      category: 'analytics',
      query: 'Show demand forecasts for the next month'
    },
    { 
      id: 'supply_disruptions', 
      label: 'Supply Disruptions', 
      icon: AlertTriangle,
      category: 'disruptions',
      query: 'Are there any active supply chain disruptions?'
    },
    { 
      id: 'cost_optimization', 
      label: 'Cost Optimization', 
      icon: DollarSign,
      category: 'analytics',
      query: 'Suggest cost optimization opportunities'
    },
    { 
      id: 'partner_performance', 
      label: 'Partner Performance', 
      icon: BarChart3,
      category: 'analytics',
      query: 'How are our supply chain partners performing?'
    }
  ];

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: Date.now(),
          type: 'bot',
          content: "👋 Hello! I'm your IntelliRoute Africa AI Assistant, specialized in supply chain management. I can help you with inventory monitoring, order optimization, demand forecasting, and supply chain analytics across Kenya and East Africa.",
          timestamp: new Date()
        },
        {
          id: Date.now() + 1,
          type: 'bot',
          content: "What would you like to know about your supply chain today?",
          timestamp: new Date(),
          showQuickActions: true
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  const getAIResponse = async (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Simulate typing delay
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    setIsTyping(false);

    // Enhanced context-aware responses
    if (message.includes('inventory') || message.includes('stock') || message.includes('shortage')) {
      if (message.includes('low') || message.includes('critical') || message.includes('shortage')) {
        return supplyChainResponses.inventory.low_stock[0];
      } else if (message.includes('forecast') || message.includes('predict') || message.includes('demand')) {
        return supplyChainResponses.inventory.demand_forecast[0];
      }
      return {
        type: 'response',
        message: "📦 I can help you with inventory management, including stock levels, reorder points, demand forecasting, and supplier management. What specific aspect would you like to explore?"
      };
    }

    if (message.includes('order') || message.includes('delivery') || message.includes('shipment')) {
      if (message.includes('status') || message.includes('track')) {
        return supplyChainResponses.orders.status_inquiry[0];
      } else if (message.includes('optimize') || message.includes('improve')) {
        return supplyChainResponses.orders.optimization[0];
      }
      return {
        type: 'response',
        message: "🚚 I can provide insights on order management, delivery tracking, route optimization, and logistics coordination. How can I assist with your orders?"
      };
    }

    if (message.includes('performance') || message.includes('analytics') || message.includes('metrics')) {
      return supplyChainResponses.analytics.performance[0];
    }

    if (message.includes('disruption') || message.includes('delay') || message.includes('problem')) {
      return supplyChainResponses.disruptions.alerts[0];
    }

    if (message.includes('cost') || message.includes('savings') || message.includes('optimize')) {
      return {
        type: 'optimization',
        message: "💰 Here are cost optimization opportunities I've identified:",
        suggestions: [
          {
            category: "Transportation",
            opportunity: "Route consolidation for Nairobi-Mombasa corridor",
            potential_savings: "KES 45,000/month"
          },
          {
            category: "Inventory",
            opportunity: "Reduce excess stock in slow-moving categories",
            potential_savings: "KES 120,000 working capital release"
          },
          {
            category: "Supplier Management",
            opportunity: "Negotiate volume discounts with top 5 suppliers",
            potential_savings: "8-12% on procurement costs"
          }
        ]
      };
    }

    if (message.includes('producer') || message.includes('farmer') || message.includes('grower')) {
      return {
        type: 'tier_info',
        message: "🌾 Producer Tier Overview:",
        data: {
          active_producers: 42,
          total_capacity: "125,000 units/month",
          top_categories: ["Maize", "Coffee Beans", "Tea Leaves", "Rice", "Wheat"],
          recent_onboarding: "3 new producers this month",
          performance_metrics: {
            average_quality_score: "87%",
            delivery_reliability: "91%",
            price_competitiveness: "Good"
          }
        }
      };
    }

    if (message.includes('wholesaler') || message.includes('distributor')) {
      return {
        type: 'tier_info',
        message: "🏢 Wholesaler Tier Overview:",
        data: {
          active_wholesalers: 119,
          total_capacity: "85,000 units/month",
          coverage_areas: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
          recent_activity: "28 active orders being processed",
          performance_metrics: {
            fulfillment_rate: "94%",
            average_margin: "15-18%",
            customer_satisfaction: "92%"
          }
        }
      };
    }

    if (message.includes('retailer') || message.includes('shop') || message.includes('store')) {
      return {
        type: 'tier_info',
        message: "🛍️ Retailer Tier Overview:",
        data: {
          active_retailers: 2280,
          total_orders: "1,567 completed this month",
          geographic_spread: "15 counties across Kenya",
          trending_products: ["Consumer Goods", "Fresh Produce", "Household Items"],
          performance_metrics: {
            order_frequency: "2.3x per week",
            payment_reliability: "89%",
            growth_rate: "+12% month-over-month"
          }
        }
      };
    }

    // Default intelligent response
    return {
      type: 'response',
      message: `🤖 I understand you're asking about "${userMessage}". As your supply chain AI assistant, I can help with:

• **Inventory Management** - Stock levels, reorder alerts, demand forecasting
• **Order Processing** - Status tracking, optimization, delivery coordination  
• **Supply Chain Analytics** - Performance metrics, cost analysis, trend insights
• **Partner Management** - Producer, wholesaler, and retailer coordination
• **Disruption Alerts** - Early warning system for supply chain issues

What specific aspect would you like to explore?`,
      suggestions: [
        "Show me inventory status",
        "What's my order pipeline?",
        "Analyze supply chain performance",
        "Check for any disruptions"
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    const aiResponse = await getAIResponse(inputValue);
    
    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      ...aiResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleQuickAction = async (action) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: action.query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setChatMode(action.category);

    const aiResponse = await getAIResponse(action.query);
    
    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      ...aiResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessage = (message) => {
    if (message.type === 'user') {
      return (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex justify-end mb-4"
        >
          <div className="bg-emerald-600 text-white rounded-lg px-4 py-2 max-w-xs lg:max-w-sm">
            <p className="text-sm">{message.content}</p>
            <span className="text-xs opacity-75">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-start mb-4"
      >
        <div className="bg-blue-600 rounded-full p-2 mr-3 mt-1">
          <Bot size={16} className="text-white" />
        </div>
        <div className="bg-gray-800 rounded-lg px-4 py-3 max-w-xs lg:max-w-sm flex-1">
          <div className="text-sm text-gray-200 whitespace-pre-line">{message.message}</div>
          
          {/* Render structured data */}
          {message.data && (
            <div className="mt-3 p-3 bg-gray-700 rounded-lg">
              {message.data.items && (
                <div className="space-y-2">
                  {message.data.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-xs">
                      <span className="text-gray-300">{item.name}</span>
                      <span className={`px-2 py-1 rounded ${item.current < item.minimum ? 'bg-red-600' : 'bg-green-600'}`}>
                        {item.current}/{item.minimum}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              
              {message.data.categories && (
                <div className="space-y-2">
                  {message.data.categories.map((cat, index) => (
                    <div key={index} className="text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-300">{cat.name}</span>
                        <span className="text-green-400">+{cat.predicted_increase}</span>
                      </div>
                      <div className="text-gray-500 text-[10px]">{cat.reason}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Render suggestions */}
          {message.suggestions && (
            <div className="mt-3 space-y-1">
              {message.suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction({ query: suggestion, category: 'general' })}
                  className="block w-full text-left text-xs bg-gray-700 hover:bg-gray-600 rounded px-2 py-1 transition"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Render quick actions */}
          {message.showQuickActions && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {quickActions.slice(0, 4).map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action)}
                  className="flex items-center gap-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-xs"
                >
                  <action.icon size={14} className="text-emerald-400" />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          )}

          <span className="text-xs text-gray-500 mt-2 block">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </motion.div>
    );
  };

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-lg z-50 transition"
      >
        <MessageCircle size={24} />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 right-6 w-96 h-[500px] bg-gray-900 rounded-lg shadow-2xl border border-gray-700 flex flex-col z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 rounded-full p-2">
            <Brain size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">IntelliRoute AI</h3>
            <p className="text-xs text-gray-400">Supply Chain Assistant</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-white p-1"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <div key={message.id}>
              {renderMessage(message)}
            </div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="bg-blue-600 rounded-full p-2">
              <Bot size={16} className="text-white" />
            </div>
            <div className="bg-gray-800 rounded-lg px-4 py-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about inventory, orders, analytics..."
            className="flex-1 bg-gray-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-700 text-white rounded-lg p-2 transition"
          >
            <Send size={16} />
          </button>
        </div>
        
        {/* Quick action hints */}
        <div className="mt-2 flex flex-wrap gap-1">
          {quickActions.slice(0, 3).map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action)}
              className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-1 rounded transition"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedAIChat;
