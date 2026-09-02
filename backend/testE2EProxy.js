const { sequelize } = require('./config/db');

async function testFullFlow() {
  console.log('=================================================================');
  console.log('🧪 TESTING END-TO-END REGISTRATION & PROXY CONNECTIVITY');
  console.log('=================================================================\n');

  let passed = 0;
  let failed = 0;

  // Test 1: Direct backend health
  try {
    const r1 = await fetch('http://localhost:5000/api/health').then(r => r.json());
    if (r1.status === 'online') {
      console.log('✅ [1/5] Direct Backend (Port 5000) Health: Online');
      passed++;
    } else {
      console.error('❌ [1/5] Direct Backend Health failed:', r1);
      failed++;
    }
  } catch (err) {
    console.error('❌ [1/5] Direct Backend Health exception:', err.message);
    failed++;
  }

  // Test 2: Vite frontend proxy (/api/health through port 5173)
  try {
    const r2 = await fetch('http://localhost:5173/api/health').then(r => r.json());
    if (r2.status === 'online') {
      console.log('✅ [2/5] Frontend Proxy (Port 5173 -> 5000) Health: Online');
      passed++;
    } else {
      console.error('❌ [2/5] Frontend Proxy Health failed:', r2);
      failed++;
    }
  } catch (err) {
    console.error('❌ [2/5] Frontend Proxy Health exception:', err.message);
    failed++;
  }

  // Test 3: Registration through frontend proxy with full required fields
  const uniqueId = Date.now();
  const testEmail = `priya_${uniqueId}@lawsync.com`;
  const testPassword = 'Password@2026!';
  const testName = 'Advocate Priya Sharma';
  const testMobile = '9876543210';

  let registrationSuccess = false;
  try {
    const regRes = await fetch('http://localhost:5173/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: testName,
        email: testEmail,
        mobileNumber: testMobile,
        password: testPassword
      })
    });

    const regData = await regRes.json();
    if (regRes.status === 201 && regData.success && regData.user.email === testEmail.toLowerCase()) {
      console.log(`✅ [3/5] Frontend Sign Up: Successfully registered user '${regData.user.name}' (${regData.user.email}) with mobile '${regData.user.mobileNumber}'.`);
      passed++;
      registrationSuccess = true;
    } else {
      console.error('❌ [3/5] Sign Up failed:', regData);
      failed++;
    }
  } catch (err) {
    console.error('❌ [3/5] Sign Up exception:', err.message);
    failed++;
  }

  // Test 4: Verify direct insertion in PostgreSQL database
  try {
    await sequelize.authenticate();
    const [results] = await sequelize.query(
      `SELECT id, name, email, "mobileNumber", role, "createdAt" FROM users WHERE email = :email`,
      { replacements: { email: testEmail.toLowerCase() } }
    );

    if (results.length > 0 && results[0].email === testEmail.toLowerCase()) {
      console.log(`✅ [4/5] PostgreSQL Database Verification: User record verified in 'users' table (ID: ${results[0].id}, Name: '${results[0].name}', Mobile: '${results[0].mobileNumber}').`);
      passed++;
    } else {
      console.error('❌ [4/5] User not found in database:', results);
      failed++;
    }
  } catch (err) {
    console.error('❌ [4/5] PostgreSQL query exception:', err.message);
    failed++;
  }

  // Test 5: Sign In through frontend proxy with the newly registered user
  try {
    const loginRes = await fetch('http://localhost:5173/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      })
    });

    const loginData = await loginRes.json();
    if (loginRes.status === 200 && loginData.success && loginData.token) {
      console.log(`✅ [5/5] Frontend Sign In: Authentication successful for '${loginData.user.name}'. JWT Token issued.`);
      passed++;
    } else {
      console.error('❌ [5/5] Sign In failed:', loginData);
      failed++;
    }
  } catch (err) {
    console.error('❌ [5/5] Sign In exception:', err.message);
    failed++;
  }

  console.log('\n=================================================================');
  console.log(`🏁 RESULT: ${passed} PASSED / ${failed} FAILED`);
  console.log('=================================================================');
  process.exit(failed > 0 ? 1 : 0);
}

testFullFlow();
