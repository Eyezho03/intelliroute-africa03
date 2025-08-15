const http = require('http');
const { exec } = require('child_process');

console.log('🔍 IntelliRoute Africa System Status Check\n');

// Check what's running on common ports
function checkPorts() {
  return new Promise((resolve) => {
    exec('netstat -an | findstr LISTENING', (error, stdout) => {
      if (error) {
        console.log('❌ Cannot check ports');
        resolve([]);
        return;
      }
      
      const ports = [];
      const lines = stdout.split('\n');
      lines.forEach(line => {
        const match = line.match(/:(\d+)\s+.*LISTENING/);
        if (match) {
          const port = parseInt(match[1]);
          if ([3000, 5000, 5001, 5173, 5174, 5175, 8080].includes(port)) {
            ports.push(port);
          }
        }
      });
      
      console.log('🌐 Active Ports:', ports.length > 0 ? ports.join(', ') : 'None found');
      resolve(ports);
    });
  });
}

// Test a specific port
function testPort(port, name) {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: port,
      path: port === 5001 ? '/health' : '/',
      method: 'GET',
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          if (port === 5001) {
            try {
              const health = JSON.parse(data);
              console.log(`✅ ${name} (port ${port}): ${health.message}`);
            } catch {
              console.log(`✅ ${name} (port ${port}): Running`);
            }
          } else {
            console.log(`✅ ${name} (port ${port}): Accessible`);
          }
          resolve(true);
        } else {
          console.log(`⚠️  ${name} (port ${port}): HTTP ${res.statusCode}`);
          resolve(false);
        }
      });
    });
    
    req.on('error', () => {
      console.log(`❌ ${name} (port ${port}): Not accessible`);
      resolve(false);
    });
    
    req.setTimeout(3000, () => {
      console.log(`⏱️  ${name} (port ${port}): Timeout`);
      resolve(false);
    });
    
    req.end();
  });
}

// Test backend authentication
function testAuth() {
  return new Promise((resolve) => {
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
        try {
          const result = JSON.parse(data);
          if (res.statusCode === 200 && result.token) {
            console.log('✅ Authentication: Working -', result.user?.name || 'User authenticated');
            resolve(true);
          } else {
            console.log('❌ Authentication: Failed -', result.message || 'Unknown error');
            resolve(false);
          }
        } catch (e) {
          console.log('❌ Authentication: Invalid response');
          resolve(false);
        }
      });
    });
    
    req.on('error', () => {
      console.log('❌ Authentication: Request failed');
      resolve(false);
    });
    
    req.write(postData);
    req.end();
  });
}

async function runStatusCheck() {
  console.log('📡 Checking System Status...\n');
  
  // Check what ports are listening
  const activePorts = await checkPorts();
  
  console.log('\n🔌 Testing Services...');
  
  // Test backend
  const backendOk = await testPort(5001, 'Backend API');
  
  // Test possible frontend ports
  const frontendPorts = [5175, 5174, 5173, 3000];
  let frontendOk = false;
  let frontendPort = null;
  
  for (const port of frontendPorts) {
    if (activePorts.includes(port)) {
      const result = await testPort(port, 'Frontend');
      if (result) {
        frontendOk = true;
        frontendPort = port;
        break;
      }
    }
  }
  
  console.log('\n🔐 Testing Authentication...');
  const authOk = backendOk ? await testAuth() : false;
  
  console.log('\n📊 System Status Summary:');
  console.log('==========================================');
  console.log(`Backend API (port 5001):     ${backendOk ? '✅ Running' : '❌ Down'}`);
  console.log(`Frontend App:                ${frontendOk ? `✅ Running on port ${frontendPort}` : '❌ Not accessible'}`);
  console.log(`Authentication:              ${authOk ? '✅ Working' : '❌ Failed'}`);
  
  if (backendOk && frontendOk && authOk) {
    console.log('\n🎉 IntelliRoute Africa is FULLY OPERATIONAL!');
    console.log('\n🔗 Access the application:');
    console.log(`   Frontend: http://localhost:${frontendPort}`);
    console.log('   Backend:  http://localhost:5001');
    console.log('\n👤 Test Accounts:');
    console.log('   Admin:     admin@intelliroute.com / admin123');
    console.log('   Driver:    driver@intelliroute.com / driver123');
    console.log('   Producer:  producer@intelliroute.com / producer123');
    console.log('   Fleet Mgr: fleet@intelliroute.com / fleet123');
    console.log('   Customer:  customer@intelliroute.com / customer123');
  } else {
    console.log('\n⚠️  Issues detected:');
    if (!backendOk) {
      console.log('   • Backend not running - Start with: cd Backend && npm start');
    }
    if (!frontendOk) {
      console.log('   • Frontend not accessible - Start with: cd Frontend && npm run dev');
    }
    if (!authOk && backendOk) {
      console.log('   • Authentication issues - Check backend logs');
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('Status check completed at:', new Date().toLocaleString());
}

runStatusCheck().catch(console.error);
