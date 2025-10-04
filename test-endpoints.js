// Test script to verify all IntelliRoute Africa endpoints
const baseUrl = 'http://localhost:5002/api';

async function testEndpoint(method, endpoint, data = null, headers = {}) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };
    
    if (data) {
      options.body = JSON.stringify(data);
    }
    
    const response = await fetch(`${baseUrl}${endpoint}`, options);
    const result = await response.json();
    
    console.log(`✅ ${method} ${endpoint} - Status: ${response.status}`);
    return { success: true, data: result };
  } catch (error) {
    console.log(`❌ ${method} ${endpoint} - Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('🚀 Testing IntelliRoute Africa API Endpoints\n');
  
  // Test health endpoint
  await testEndpoint('GET', '/health');
  
  // Test login
  const loginResult = await testEndpoint('POST', '/auth/login', {
    email: 'samwest.admin@intelliroute.africa',
    password: 'admin123'
  });
  
  if (!loginResult.success) {
    console.log('❌ Login failed - cannot continue with authenticated tests');
    return;
  }
  
  const token = loginResult.data.token;
  const authHeaders = { 'Authorization': `Bearer ${token}` };
  
  console.log('\n📊 Testing Analytics Endpoints...');
  await testEndpoint('GET', '/analytics/dashboard?role=admin', null, authHeaders);
  await testEndpoint('GET', '/analytics/delivery?period=week', null, authHeaders);
  await testEndpoint('GET', '/analytics/inventory?period=week', null, authHeaders);
  await testEndpoint('GET', '/analytics/financial?period=month', null, authHeaders);
  await testEndpoint('GET', '/analytics/supply-chain', null, authHeaders);
  await testEndpoint('GET', '/analytics/live-vehicles', null, authHeaders);
  await testEndpoint('GET', '/analytics/kenyan-routes', null, authHeaders);
  
  console.log('\n🗺️ Testing Route Optimization...');
  await testEndpoint('POST', '/logistics/route-optimization', {
    origin: { lat: -1.2921, lng: 36.8219 },
    destination: { lat: -4.0435, lng: 39.6682 },
    options: { vehicleType: 'truck' }
  }, authHeaders);
  
  await testEndpoint('POST', '/logistics/optimize-deliveries', {
    deliveries: [
      { lat: -1.2921, lng: 36.8219, address: 'Nairobi CBD' },
      { lat: -1.2921, lng: 36.8219, address: 'Nairobi West' }
    ],
    startLocation: { lat: -1.2921, lng: 36.8219 }
  }, authHeaders);
  
  console.log('\n📦 Testing Inventory Management...');
  await testEndpoint('GET', '/inventory', null, authHeaders);
  await testEndpoint('POST', '/products', {
    name: 'Test Product',
    sku: 'TEST001',
    price: 100
  }, authHeaders);
  await testEndpoint('GET', '/products', null, authHeaders);
  
  console.log('\n🚚 Testing Delivery & Tracking...');
  await testEndpoint('GET', '/deliveries', null, authHeaders);
  await testEndpoint('GET', '/tracking/analytics', null, authHeaders);
  
  console.log('\n👥 Testing User Management...');
  await testEndpoint('GET', '/users', null, authHeaders);
  await testEndpoint('GET', '/auth/me', null, authHeaders);
  
  console.log('\n🚗 Testing Vehicle Management...');
  await testEndpoint('GET', '/vehicles', null, authHeaders);
  await testEndpoint('POST', '/vehicles', {
    license_plate: 'KCA 123A',
    model: 'Isuzu Truck',
    capacity: 5000
  }, authHeaders);
  
  console.log('\n📈 Testing Real-time Data...');
  await testEndpoint('POST', '/realtime/traffic', { route: 'test' }, authHeaders);
  await testEndpoint('POST', '/realtime/weather', { locations: ['Nairobi'] }, authHeaders);
  
  console.log('\n🎉 All tests completed!');
  console.log('\n📱 WebSocket Test:');
  console.log('   Notifications: ws://localhost:5001/ws');
  console.log('   Mobile: ws://localhost:3001/mobile');
  console.log('\n🌐 Frontend: http://localhost:5173');
  console.log('🔑 Login: samwest.admin@intelliroute.africa / admin123');
}

// Run tests if this script is executed directly
if (typeof window === 'undefined') {
  // Node.js environment
  const fetch = require('node-fetch');
  runTests().catch(console.error);
} else {
  // Browser environment
  runTests().catch(console.error);
}
