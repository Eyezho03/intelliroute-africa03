// Integration Test Script for Frontend-Backend Connection
// Run this with: node test-integration.js

import axios from 'axios';

const FRONTEND_URL = 'http://localhost:5175';
const BACKEND_URL = 'http://localhost:5001';

async function testIntegration() {
  console.log('🔍 Testing IntelliRoute Africa Frontend-Backend Integration\n');

  // 1. Test Backend Health
  console.log('1. Testing Backend Health...');
  try {
    const healthResponse = await axios.get(`${BACKEND_URL}/health`);
    console.log(`✅ Backend Health: ${healthResponse.data.status} - ${healthResponse.data.message}`);
  } catch (error) {
    console.log(`❌ Backend Health Failed: ${error.message}`);
    return;
  }

  // 2. Test Backend API Endpoints
  console.log('\n2. Testing Backend API Endpoints...');
  try {
    // Test login with demo admin account
    const loginResponse = await axios.post(`${BACKEND_URL}/api/auth/login`, {
      email: 'admin@intelliroute.com',
      password: 'admin123'
    });
    console.log('✅ Admin Login: Success');
    
    const token = loginResponse.data.token;
    const headers = { Authorization: `Bearer ${token}` };

    // Test protected endpoints
    const userResponse = await axios.get(`${BACKEND_URL}/api/auth/me`, { headers });
    console.log(`✅ Get Current User: ${userResponse.data.data.fullName} (${userResponse.data.data.role})`);

    // Test vehicles endpoint
    const vehiclesResponse = await axios.get(`${BACKEND_URL}/api/vehicles`, { headers });
    console.log(`✅ Get Vehicles: ${vehiclesResponse.data.count} vehicles found`);

    // Test inventory endpoint
    const inventoryResponse = await axios.get(`${BACKEND_URL}/api/inventory`, { headers });
    console.log(`✅ Get Inventory: ${inventoryResponse.data.count} items found`);

  } catch (error) {
    console.log(`❌ API Test Failed: ${error.response?.data?.message || error.message}`);
  }

  // 3. Test Frontend Accessibility
  console.log('\n3. Testing Frontend Accessibility...');
  try {
    const frontendResponse = await axios.get(FRONTEND_URL);
    if (frontendResponse.status === 200) {
      console.log('✅ Frontend: Accessible');
    }
  } catch (error) {
    console.log(`❌ Frontend Test Failed: ${error.message}`);
  }

  // 4. Test Integration Route
  console.log('\n4. Testing Integration Route...');
  try {
    const demoResponse = await axios.get(`${FRONTEND_URL}/demo`);
    if (demoResponse.status === 200) {
      console.log('✅ Demo Integration Route: Accessible');
    }
  } catch (error) {
    console.log(`❌ Demo Route Failed: ${error.message}`);
  }

  console.log('\n🎉 Integration Test Summary:');
  console.log(`   Backend API: ${BACKEND_URL}`);
  console.log(`   Frontend App: ${FRONTEND_URL}`);
  console.log(`   Demo Route: ${FRONTEND_URL}/demo`);
  console.log('\n📝 Test Accounts Available:');
  console.log('   Admin: admin@intelliroute.com / admin123');
  console.log('   Driver: driver@intelliroute.com / driver123');
  console.log('   Fleet Manager: fleet@intelliroute.com / fleet123');
  console.log('   Producer: producer@intelliroute.com / producer123');
  console.log('   Customer: customer@intelliroute.com / customer123');
}

// Check if axios is available
if (typeof axios === 'undefined') {
  console.log('❌ axios is required for this test. Install it with: npm install axios');
  process.exit(1);
}

// Run the test
testIntegration().catch(error => {
  console.error('Test runner failed:', error.message);
  process.exit(1);
});
