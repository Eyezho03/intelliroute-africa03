# 🚀 IntelliRoute Africa - Deployment Guide

## Production Deployment Instructions

This guide covers deploying IntelliRoute Africa to production environments including Vercel, Docker, and traditional VPS hosting.

---

## 📋 Prerequisites

### System Requirements
- **Node.js**: 18+ (LTS recommended)
- **Database**: PostgreSQL (production) or SQLite (development)
- **Memory**: 2GB+ RAM
- **Storage**: 10GB+ available space
- **Network**: Stable internet connection

### Required Accounts
- **Vercel Account**: For frontend deployment
- **Database Provider**: PostgreSQL (Supabase, Railway, or AWS RDS)
- **Domain**: Custom domain (optional)
- **SSL Certificate**: Automatic with Vercel

---

## 🌐 Vercel Deployment (Recommended)

### Frontend Deployment
1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy from project root
   vercel
   ```

2. **Environment Variables**
   ```bash
   # Set in Vercel dashboard or via CLI
   vercel env add VITE_API_BASE_URL
   vercel env add VITE_WS_NOTIFICATIONS_URL
   vercel env add VITE_WS_URL
   ```

3. **Build Configuration**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "installCommand": "npm install"
   }
   ```

### Backend Deployment (Railway/Render)
1. **Railway Deployment**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and deploy
   railway login
   railway init
   railway up
   ```

2. **Environment Variables**
   ```bash
   PORT=5002
   WS_NOTIFICATIONS_PORT=5001
   WS_MOBILE_PORT=3001
   JWT_SECRET=your-production-secret
   DATABASE_URL=postgresql://user:pass@host:port/db
   NODE_ENV=production
   ```

---

## 🐳 Docker Deployment

### Dockerfile Configuration
```dockerfile
# Multi-stage build for production
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 80
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    depends_on:
      - backend
      - database

  backend:
    build: ./backend
    ports:
      - "5002:5002"
      - "5001:5001"
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/intelliroute
    depends_on:
      - database

  database:
    image: postgres:15
    environment:
      - POSTGRES_DB=intelliroute
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Deployment Commands
```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 🗄️ Database Setup

### PostgreSQL Production Setup
1. **Create Database**
   ```sql
   CREATE DATABASE intelliroute_production;
   CREATE USER intelliroute_user WITH PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE intelliroute_production TO intelliroute_user;
   ```

2. **Run Migrations**
   ```bash
   # Connect to production database
   psql -h your-host -U intelliroute_user -d intelliroute_production
   
   # Run schema creation
   \i backend/src/db-schema.sql
   ```

3. **Seed Data**
   ```bash
   # Run seed script
   node backend/src/seed-production.js
   ```

### Database Schema
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'business',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100),
    price DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory table
CREATE TABLE inventory (
    product_id UUID PRIMARY KEY REFERENCES products(id),
    quantity INTEGER DEFAULT 0,
    reorder_level INTEGER DEFAULT 0,
    location VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name VARCHAR(255),
    status VARCHAR(50) DEFAULT 'created',
    total DECIMAL(10,2) DEFAULT 0,
    assigned_driver_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles table
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_plate VARCHAR(20),
    model VARCHAR(100),
    capacity DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Routes table
CREATE TABLE routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    origin TEXT,
    destination TEXT,
    waypoints TEXT,
    estimated_time INTEGER,
    distance_km DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 Security Configuration

### Environment Security
```bash
# Generate secure JWT secret
openssl rand -base64 32

# Set secure database password
# Use environment variables for all secrets
# Never commit secrets to version control
```

### CORS Configuration
```javascript
// backend/src/index.js
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com', 'https://www.yourdomain.com']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

### Rate Limiting
```javascript
// Add rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

---

## 📊 Monitoring & Logging

### Application Monitoring
```javascript
// Add monitoring middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

### Error Tracking
```javascript
// Add error tracking (Sentry example)
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

app.use(Sentry.requestHandler());
```

### Health Checks
```javascript
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version
  });
});
```

---

## 🚀 Performance Optimization

### Frontend Optimization
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['chart.js', 'react-chartjs-2'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'lucide-react']
        }
      }
    }
  }
});
```

### Backend Optimization
```javascript
// Enable compression
import compression from 'compression';
app.use(compression());

// Enable caching
app.use((req, res, next) => {
  if (req.method === 'GET') {
    res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
  }
  next();
});
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build application
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📱 Mobile App Deployment

### React Native Setup
```bash
# Install React Native CLI
npm install -g react-native-cli

# Initialize mobile app
npx react-native init IntelliRouteDriver

# Install dependencies
cd IntelliRouteDriver
npm install socket.io-client axios react-native-maps
```

### Mobile Configuration
```javascript
// Mobile app configuration
const config = {
  apiUrl: 'https://api.intelliroute.africa',
  wsUrl: 'wss://api.intelliroute.africa/mobile',
  mapApiKey: process.env.GOOGLE_MAPS_API_KEY
};
```

---

## 🧪 Testing

### Unit Tests
```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage
```

### Integration Tests
```bash
# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

### Load Testing
```bash
# Install artillery
npm install -g artillery

# Run load test
artillery run load-test.yml
```

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] SSL certificates configured
- [ ] Domain DNS configured
- [ ] Monitoring setup complete

### Deployment
- [ ] Deploy backend services
- [ ] Deploy frontend application
- [ ] Run database migrations
- [ ] Verify all endpoints working
- [ ] Test WebSocket connections
- [ ] Verify mobile app connectivity

### Post-Deployment
- [ ] Monitor application logs
- [ ] Check performance metrics
- [ ] Verify user access
- [ ] Test all features
- [ ] Monitor error rates
- [ ] Set up alerts

---

## 🆘 Troubleshooting

### Common Issues
1. **CORS Errors**: Check origin configuration
2. **Database Connection**: Verify connection string
3. **WebSocket Issues**: Check firewall settings
4. **Performance Issues**: Monitor memory usage
5. **SSL Issues**: Verify certificate configuration

### Debug Commands
```bash
# Check application status
curl https://api.intelliroute.africa/health

# Check WebSocket connection
wscat -c wss://api.intelliroute.africa/ws

# View application logs
docker logs intelliroute-backend

# Check database connection
psql $DATABASE_URL -c "SELECT 1;"
```

---

## 📞 Support

**Technical Support**
- Email: support@intelliroute.africa
- Phone: +254 700 123 456
- Documentation: https://docs.intelliroute.africa

**Emergency Support**
- Available 24/7 for production issues
- Response time: < 1 hour for critical issues

---

*This deployment guide ensures a smooth transition from development to production. Follow all steps carefully and test thoroughly before going live.*

**Last Updated**: September 2024  
**Version**: 1.0  
**Status**: Production Ready
