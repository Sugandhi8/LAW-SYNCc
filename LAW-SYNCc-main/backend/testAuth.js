const testAuth = async () => {
  console.log('=====================================================');
  console.log('🔐 LAW-SYNCc AUTHENTICATION & FLOW AUTOMATED TEST');
  console.log('=====================================================\n');

  let passed = 0;
  let failed = 0;

  const testEmail = `advocate_${Date.now()}@lawsync.com`;
  const testPassword = 'SecurePassword123!';
  const testName = 'Advocate Ananya Deshmukh';
  const testMobile = '9876543210';

  // 1. Test Registration with User Name, Email, Mobile Number, Password
  try {
    const regRes = await fetch('http://localhost:5000/api/auth/register', {
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
      console.log(`✅ [1/6] Registration API: Account created for '${regData.user.name}' (${regData.user.email}) with mobile '${regData.user.mobileNumber}'.`);
      passed++;
    } else {
      console.error('❌ [1/6] Registration failed:', regData);
      failed++;
    }
  } catch (err) {
    console.error('❌ [1/6] Registration exception:', err.message);
    failed++;
  }

  // 2. Test Duplicate Email Rejection
  try {
    const dupRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Another User',
        email: testEmail,
        mobileNumber: '9123456780',
        password: 'AnotherPassword123'
      })
    });

    const dupData = await dupRes.json();
    if (dupRes.status === 400 && dupData.success === false) {
      console.log(`✅ [2/6] Duplicate Email Rejection: Correctly prevented duplicate registration for '${testEmail}'.`);
      passed++;
    } else {
      console.error('❌ [2/6] Duplicate check failed:', dupData);
      failed++;
    }
  } catch (err) {
    console.error('❌ [2/6] Duplicate check exception:', err.message);
    failed++;
  }

  // 3. Test Invalid Password Login Rejection
  try {
    const failRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'WrongPassword!'
      })
    });

    const failData = await failRes.json();
    if (failRes.status === 401 && failData.success === false) {
      console.log(`✅ [3/6] Invalid Password Rejection: Correctly rejected unauthorized login attempt.`);
      passed++;
    } else {
      console.error('❌ [3/6] Failed login check failed:', failData);
      failed++;
    }
  } catch (err) {
    console.error('❌ [3/6] Failed login exception:', err.message);
    failed++;
  }

  // 4. Test Valid Login with newly registered credentials
  let authToken = '';
  try {
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      })
    });

    const loginData = await loginRes.json();
    if (loginRes.status === 200 && loginData.success && loginData.token) {
      authToken = loginData.token;
      console.log(`✅ [4/6] Sign In API: Successfully authenticated '${loginData.user.name}' and issued signed JWT token.`);
      passed++;
    } else {
      console.error('❌ [4/6] Sign In failed:', loginData);
      failed++;
    }
  } catch (err) {
    console.error('❌ [4/6] Sign In exception:', err.message);
    failed++;
  }

  // 5. Test Authenticated Profile / Token Validation
  try {
    const meRes = await fetch('http://localhost:5000/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    const meData = await meRes.json();
    if (meRes.status === 200 && meData.success && meData.user.email === testEmail.toLowerCase()) {
      console.log(`✅ [5/6] Protected Profile API: Verified valid user session for '${meData.user.name}'.`);
      passed++;
    } else {
      console.error('❌ [5/6] Profile check failed:', meData);
      failed++;
    }
  } catch (err) {
    console.error('❌ [5/6] Profile check exception:', err.message);
    failed++;
  }

  // 6. Test Dictionary APIs remain 100% functional
  try {
    const termsRes = await fetch('http://localhost:5000/api/terms?limit=500');
    const termsData = await termsRes.json();
    const catsRes = await fetch('http://localhost:5000/api/terms/categories');
    const catsData = await catsRes.json();

    if (termsData.success && termsData.count === 186 && catsData.success && catsData.data.length === 31) {
      console.log(`✅ [6/6] Existing Dictionary APIs: Verified all 186 legal terms and 30 categories remain intact and accessible.`);
      passed++;
    } else {
      console.error('❌ [6/6] Dictionary verification failed:', termsData.count, catsData.data.length);
      failed++;
    }
  } catch (err) {
    console.error('❌ [6/6] Dictionary verification exception:', err.message);
    failed++;
  }

  console.log('\n=====================================================');
  console.log(`🏁 AUTHENTICATION TEST SUMMARY: ${passed} PASSED / ${failed} FAILED`);
  console.log('=====================================================');
};

testAuth();
