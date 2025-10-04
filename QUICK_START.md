# 🚀 IntelliRoute Africa - Quick Start Guide

## Get Started in 5 Minutes!

### **Prerequisites**
- Node.js 18+ installed
- Modern web browser
- Internet connection

---

## 🏃‍♂️ **Quick Start**

### **1. Start the Application**
```bash
# In project root directory
npm run dev
```

### **2. Access the Platform**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5002/api/health

### **3. Login**
- **Email**: `samwest.admin@intelliroute.africa`
- **Password**: `admin123`

---

## 🎯 **What You Can Do Immediately**

### **✅ Test Route Optimization**
1. Go to **Route Optimizer** page
2. Enter origin: `Nairobi, Kenya`
3. Enter destination: `Mombasa, Kenya`
4. Click **Optimize Route**
5. View optimized route with cost calculations

### **✅ Track Deliveries**
1. Go to **Live Tracking** page
2. View active deliveries
3. See real-time location updates
4. Monitor delivery progress

### **✅ Manage Inventory**
1. Go to **Inventory** page
2. Add new products
3. Set stock levels
4. View reorder alerts

### **✅ View Analytics**
1. Go to **Analytics** page
2. View dashboard metrics
3. Check performance trends
4. Monitor KPIs

---

## 🔧 **Troubleshooting**

### **Port Already in Use**
```bash
# Kill existing processes
taskkill /f /im node.exe

# Restart
npm run dev
```

### **Login Issues**
- Verify credentials: `samwest.admin@intelliroute.africa` / `admin123`
- Check browser console for errors
- Ensure backend is running on port 5002

### **API Not Responding**
- Check backend logs in terminal
- Verify port 5002 is available
- Restart backend: `cd backend && npm run dev`

---

## 📱 **Mobile Testing**

### **WebSocket Connection**
- **Notifications**: ws://localhost:5001/ws
- **Mobile**: ws://localhost:3001/mobile

### **Test Mobile Integration**
```javascript
// Open browser console and test
const ws = new WebSocket('ws://localhost:3001/mobile');
ws.onopen = () => console.log('Connected to mobile WebSocket');
ws.send(JSON.stringify({type: 'auth', driverId: 'test-driver'}));
```

---

## 🎯 **Key Features to Test**

### **1. Route Optimization**
- Multiple vehicle types
- Traffic-aware routing
- Cost calculations
- Waypoint optimization

### **2. Real-Time Tracking**
- Live location updates
- Delivery progress
- ETA calculations
- Status updates

### **3. Inventory Management**
- Stock monitoring
- Reorder alerts
- Product analytics
- Cost tracking

### **4. Analytics Dashboard**
- Performance metrics
- Trend analysis
- Role-based views
- Real-time KPIs

---

## 📊 **Sample Data Included**

### **Products**
- Coca Cola, Bread, Milk, Rice
- Sugar, Cooking Oil, Soap, Toothpaste

### **Routes**
- Nairobi-Mombasa
- Nairobi-Kisumu
- Mombasa-Kampala

### **Vehicles**
- Trucks, Vans, Motorcycles
- Different capacity levels

---

## 🚀 **Next Steps**

1. **Explore Features**: Test all functionality
2. **Customize Data**: Add your own products/routes
3. **User Training**: Train your team
4. **Pilot Launch**: Begin Sam West pilot
5. **Production Deploy**: Scale to full production

---

## 📞 **Need Help?**

- **Documentation**: See SAM_WEST_PILOT_GUIDE.md
- **Deployment**: See DEPLOYMENT_GUIDE.md
- **Support**: support@intelliroute.africa
- **Phone**: +254 700 123 456

---

**🎉 You're ready to revolutionize logistics in Africa!**

*IntelliRoute Africa - Connecting Africa, One Delivery at a Time* 🌍🚚
