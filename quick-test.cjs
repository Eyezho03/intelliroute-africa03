const http = require('http');

console.log('🔍 Testing IntelliRoute Africa Integration...\n');

// Test backend health
function testBackend() {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 5001,
      path: '/health',
      method: 'GET',
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const health = JSON.parse(data);
          console.log('✅ Backend Health:', health.status, '-', health.message);
          resolve(true);
        } else {
          console.log('❌ Backend Health: Failed with status', res.statusCode);
          resolve(false);
        }
      });
    });
    
    req.on('error', () => {
      console.log('❌ Backend: Not accessible');
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      console.log('❌ Backend: Timeout');
      resolve(false);
    });
    
    req.end();
  });
}

// Test frontend accessibility
function testFrontend() {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 5175,
      path: '/',
      method: 'GET',
    }, (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Frontend: Accessible on http://localhost:5175');
        resolve(true);
      } else {
        console.log('❌ Frontend: HTTP status', res.statusCode);
        resolve(false);
      }
    });
    
    req.on('error', () => {
      console.log('❌ Frontend: Not accessible on port 5175');
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      console.log('❌ Frontend: Timeout');
      resolve(false);
    });
    
    req.end();
  });
}

// Test backend API login
function testLogin() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      email: 'admin@intelliroute.com',
      password: 'admin123'
    });
    
    const req = http.request({
      hostname: 'localhost',
      port: 5001,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const result = JSON.parse(data);
          console.log('✅ Admin Login: Success -', result.user.name);
          resolve(result.token);
        } else {
          console.log('❌ Admin Login: Failed with status', res.statusCode);
          resolve(null);
        }
      });
    });
    
    req.on('error', () => {
      console.log('❌ Admin Login: Request failed');
      resolve(null);
    });
    
    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('1. Testing Backend Health...');
  const backendOk = await testBackend();
  
  console.log('\n2. Testing Frontend Accessibility...');
  const frontendOk = await testFrontend();
  
  console.log('\n3. Testing Authentication...');
  const token = await testLogin();
  
  console.log('\n📊 Integration Test Results:');
  console.log('   Backend API (port 5001):', backendOk ? '✅ Working' : '❌ Failed');
  console.log('   Frontend App (port 5175):', frontendOk ? '✅ Working' : '❌ Failed');
  console.log('   Authentication:', token ? '✅ Working' : '❌ Failed');
  
  if (backendOk && frontendOk && token) {
    console.log('\n🎉 IntelliRoute Africa is fully operational!');
    console.log('\n🔗 Access Links:');
    console.log('   Frontend: http://localhost:5175');
    console.log('   Backend API: http://localhost:5001');
    console.log('   API Health: http://localhost:5001/health');
    console.log('\n👤 Test Accounts:');
    console.log('   Admin: admin@intelliroute.com / admin123');
    console.log('   Driver: driver@intelliroute.com / driver123');
    console.log('   Producer: producer@intelliroute.com / producer123');
    console.log('   Fleet Manager: fleet@intelliroute.com / fleet123');
    console.log('   Customer: customer@intelliroute.com / customer123');
  } else {
    console.log('\n⚠️  Some components need attention.');
    if (!backendOk) console.log('   - Start backend: cd Backend && npm start');
    if (!frontendOk) console.log('   - Start frontend: cd Frontend && npm run dev');
  }
}

runTests().catch(console.error);
