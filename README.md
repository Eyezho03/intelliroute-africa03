# 🚚 IntelliRoute Africa - Multi-Tier B2B Logistics Platform

**Transforming Supply Chain Management Across Africa**

## 🌍 Vision: Complete Supply Chain Network

IntelliRoute Africa is envisioned as a comprehensive **multi-tier B2B logistics and ordering platform** that serves the entire supply chain ecosystem:

```
🏭 Producer/Manufacturer → 🏬 Wholesaler → 🛒 Retailer → 👨‍👩‍👧‍👦 Consumer
```

Our platform enables **ordering + delivery coordination** at every stage, transforming from a simple logistics tool into a **smart supply chain network** that connects and optimizes the entire value chain.

## 🎯 Platform Capabilities

### 🏭 **Producer/Manufacturer Level**
- Production planning and inventory management
- Bulk order fulfillment to wholesalers
- Supply chain visibility and analytics
- Quality control and compliance tracking

### 🏬 **Wholesaler Level**
- Multi-supplier inventory aggregation
- Efficient distribution to retailers
- Route optimization for bulk deliveries
- Demand forecasting and procurement planning

### 🛒 **Retailer Level**
- Streamlined ordering from multiple wholesalers
- Last-mile delivery coordination
- Customer demand management
- Point-of-sale integration

### 👥 **Consumer Level**
- Direct ordering from local retailers
- Real-time delivery tracking
- Multiple payment options
- Customer feedback and ratings

## 🚀 Key Features

### 📊 **Smart Logistics Engine**
- **AI-powered route optimization** across all supply chain levels
- **Real-time tracking** from production to consumer delivery
- **Dynamic pricing** based on demand, distance, and capacity
- **Predictive analytics** for inventory and demand planning

### 🌐 **Multi-Tenant Architecture**
- **Role-based access** for different supply chain participants
- **Customizable dashboards** for each business type
- **API integration** with existing ERP and inventory systems
- **White-label solutions** for enterprise clients

### 📱 **Comprehensive Platform**
- **Web dashboard** for business management
- **Mobile apps** for drivers and field operations
- **Consumer mobile app** for end-user orders
- **Integration APIs** for third-party systems

## 🛠️ Technical Stack

- **Frontend**: React 18.3 + Vite
- **Backend**: Express (REST) + ws (WebSockets)
- **Styling**: Tailwind CSS + Framer Motion
- **Maps**: Google Maps API + Leaflet
- **Charts**: Chart.js for analytics
- **Forms**: React Hook Form
- **Routing**: React Router v6
- **Authentication**: JWT-based auth system

## 🏗️ Project Structure

```
Frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route-based page components
│   ├── contexts/       # React context providers
│   ├── services/       # API and business logic
│   ├── utils/          # Helper functions
│   └── assets/         # Images and static files
├── public/             # Static assets
└── dist/               # Production build
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd intelliroute-africa/Frontend

# Install dependencies (with compatibility fixes)
npm install --legacy-peer-deps

# Start full-stack development (frontend + backend)
npm run dev
# Frontend: http://localhost:5173
# REST API: http://localhost:5002/api
# WS Notifications: ws://localhost:5001/ws
# WS Mobile: ws://localhost:3001/mobile

# Build for production
npm run build

# Run linting
npm run lint

# Run automated code fixes
node fix-eslint.cjs
```

## 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `node fix-eslint.cjs` | Automated code fixes |

## 📈 Platform Benefits

### 🎯 **For Businesses**
- **Reduced logistics costs** through optimized routing
- **Improved inventory management** with demand forecasting
- **Enhanced visibility** across the supply chain
- **Streamlined operations** with automated processes

### 🌍 **For Africa**
- **Economic growth** through efficient supply chains
- **Job creation** in logistics and technology sectors
- **Market access** for small and medium enterprises
- **Reduced waste** through better demand planning

## 🛡️ Quality Assurance

- ✅ **Production-ready foundation** with comprehensive error handling
- ✅ **Automated testing** and code quality tools
- ✅ **Performance optimized** build process
- ✅ **Security best practices** implemented
- ✅ **Responsive design** for all device types

## 📚 Documentation

- [📋 Improvements & Fixes](./IMPROVEMENTS.md) - Detailed technical improvements
- [🎉 Final Summary](./FINAL_SUMMARY.md) - Complete project overview
- [🔧 ESLint Fixes](./fix-eslint.cjs) - Automated code maintenance

## 🤝 Contributing

We welcome contributions to help build the future of African logistics! Please read our contributing guidelines and submit pull requests for any improvements.

## 📞 Support

For technical support or business inquiries, please contact our development team.

---

**IntelliRoute Africa**: *Connecting Africa, One Delivery at a Time* 🌍🚚
