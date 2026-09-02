const { sequelize } = require('./config/db');

async function runFullWebsiteTests() {
  console.log('================================================================================');
  console.log('🏛️  LAW-SYNCc: COMPREHENSIVE FULL-WEBSITE SYSTEM & API TEST SUITE');
  console.log('================================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`✅ [PASS] ${testName}${details ? ` -> ${details}` : ''}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}${details ? ` -> ${details}` : ''}`);
      failed++;
    }
  }

  const BASE_URL = 'http://localhost:5000/api';
  const PROXY_URL = 'http://localhost:5173/api';

  // ---------------------------------------------------------------------------
  // 1. HEALTH CHECKS
  // ---------------------------------------------------------------------------
  console.log('--- 1. SERVER & PROXY CONNECTIVITY ---');
  try {
    const health = await fetch(`${BASE_URL}/health`).then(r => r.json());
    assert(health.status === 'online', 'Direct Backend Health (Port 5000)', `DB: ${health.database}`);
  } catch (e) {
    assert(false, 'Direct Backend Health (Port 5000)', e.message);
  }

  try {
    const proxyHealth = await fetch(`${PROXY_URL}/health`).then(r => r.json());
    assert(proxyHealth.status === 'online', 'Vite Dev Proxy Health (Port 5173 -> 5000)', `Service: ${proxyHealth.service}`);
  } catch (e) {
    assert(false, 'Vite Dev Proxy Health (Port 5173 -> 5000)', e.message);
  }

  // ---------------------------------------------------------------------------
  // 2. AUTHENTICATION FLOW & USER ISOLATION
  // ---------------------------------------------------------------------------
  console.log('\n--- 2. AUTHENTICATION & MULTI-USER ISOLATION ---');
  const timestamp = Date.now();
  const userA = {
    name: 'Advocate Sneha Patel',
    email: `sneha_${timestamp}@lawsync.com`,
    mobileNumber: '9876543210',
    password: 'Password123!'
  };

  const userB = {
    name: 'Senior Counsel Vikram Roy',
    email: `vikram_${timestamp}@lawsync.com`,
    mobileNumber: '9123456780',
    password: 'Password456!'
  };

  let tokenA = '';
  let tokenB = '';
  let userAId = null;
  let userBId = null;

  // 2.1 Sign Up User A
  try {
    const resA = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userA)
    });
    const dataA = await resA.json();
    tokenA = dataA.token;
    userAId = dataA.user?.id;
    assert(resA.status === 201 && dataA.success && tokenA, 'Sign Up User A', `Created user ID ${userAId} (${userA.email})`);
  } catch (e) {
    assert(false, 'Sign Up User A', e.message);
  }

  // 2.2 Duplicate Email Rejection
  try {
    const dupRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userA)
    });
    const dupData = await dupRes.json();
    assert(dupRes.status === 400 && !dupData.success, 'Duplicate Email Registration Rejection', dupData.message);
  } catch (e) {
    assert(false, 'Duplicate Email Registration Rejection', e.message);
  }

  // 2.3 Sign Up User B
  try {
    const resB = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userB)
    });
    const dataB = await resB.json();
    tokenB = dataB.token;
    userBId = dataB.user?.id;
    assert(resB.status === 201 && dataB.success && tokenB, 'Sign Up User B', `Created user ID ${userBId} (${userB.email})`);
  } catch (e) {
    assert(false, 'Sign Up User B', e.message);
  }

  // 2.4 Invalid Password Login Rejection
  try {
    const invRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userA.email, password: 'WrongPassword!' })
    });
    const invData = await invRes.json();
    assert(invRes.status === 401 && !invData.success, 'Invalid Password Sign In Rejection', invData.message);
  } catch (e) {
    assert(false, 'Invalid Password Sign In Rejection', e.message);
  }

  // 2.5 Successful Sign In User A
  try {
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userA.email, password: userA.password })
    });
    const loginData = await loginRes.json();
    assert(loginRes.status === 200 && loginData.success && loginData.token, 'Sign In User A with Credentials', `Token generated`);
  } catch (e) {
    assert(false, 'Sign In User A with Credentials', e.message);
  }

  // 2.6 Protected Profile Access
  try {
    const meRes = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${tokenA}` }
    });
    const meData = await meRes.json();
    assert(meRes.status === 200 && meData.success && meData.user?.email === userA.email.toLowerCase(), 'Protected /api/auth/me Endpoint', `Name: ${meData.user?.name}`);
  } catch (e) {
    assert(false, 'Protected /api/auth/me Endpoint', e.message);
  }

  // 2.7 Unauthenticated Request Block
  try {
    const unauthRes = await fetch(`${BASE_URL}/auth/me`);
    assert(unauthRes.status === 401, 'Unauthorized Request Blocking (Missing JWT Header)');
  } catch (e) {
    assert(false, 'Unauthorized Request Blocking', e.message);
  }

  // ---------------------------------------------------------------------------
  // 3. LEGAL DICTIONARY DATA & SCHEMA INTEGRITY
  // ---------------------------------------------------------------------------
  console.log('\n--- 3. LEGAL DICTIONARY TERMS & SCHEMA ---');
  let allTerms = [];
  try {
    const termsRes = await fetch(`${BASE_URL}/terms?limit=500`);
    const termsData = await termsRes.json();
    allTerms = termsData.data || [];
    assert(termsData.success && allTerms.length === 186, 'All 186 Legal Terms Fetched Dynamically from PostgreSQL', `Total terms: ${allTerms.length}`);

    // Verify schema fields
    const allValid = allTerms.every(t =>
      t.word && t.simpleMeaning && t.definition && t.category && t.relatedLaws &&
      Array.isArray(t.keyElements) && t.keyElements.length > 0 &&
      Array.isArray(t.relatedTerms) && t.relatedTerms.length > 0
    );
    assert(allValid, '100% Schema Field Integrity (word, meaning, def, laws, elements, related)');
  } catch (e) {
    assert(false, 'Legal Terms Fetched Dynamically', e.message);
  }

  // 3.1 Single Term Retrieval by ID and Case-Insensitive Word
  try {
    const byId = await fetch(`${BASE_URL}/terms/1`).then(r => r.json());
    assert(byId.success && byId.data?.id === 1, 'Single Term Fetch by ID (ID: 1)', byId.data?.word);

    const byWord = await fetch(`${BASE_URL}/terms/habeas%20corpus`).then(r => r.json());
    assert(byWord.success && byWord.data?.word.toLowerCase() === 'habeas corpus', 'Single Term Fetch by Case-Insensitive Word', byWord.data?.word);
  } catch (e) {
    assert(false, 'Single Term Retrieval', e.message);
  }

  // ---------------------------------------------------------------------------
  // 4. SEARCH & FILTERING CAPABILITIES
  // ---------------------------------------------------------------------------
  console.log('\n--- 4. SEARCH & INDEXING ---');
  try {
    // Exact search
    const exactRes = await fetch(`${BASE_URL}/terms?search=Bail`).then(r => r.json());
    assert(exactRes.success && exactRes.count >= 2, 'Exact Term Search ("Bail")', `Found ${exactRes.count} matching items`);

    // Partial search
    const partialRes = await fetch(`${BASE_URL}/terms?search=judic`).then(r => r.json());
    assert(partialRes.success && partialRes.count >= 1, 'Partial Substring Search ("judic")', `Found ${partialRes.count} matches`);

    // Lowercase search
    const lowerRes = await fetch(`${BASE_URL}/terms?search=tort`).then(r => r.json());
    assert(lowerRes.success && lowerRes.count >= 4, 'Lowercase Query Search ("tort")', `Found ${lowerRes.count} matches`);

    // Uppercase search
    const upperRes = await fetch(`${BASE_URL}/terms?search=TORT`).then(r => r.json());
    assert(upperRes.success && upperRes.count === lowerRes.count, 'Uppercase Query Search ("TORT")', `Case-insensitive parity (${upperRes.count} matches)`);

    // Non-existent search
    const emptyRes = await fetch(`${BASE_URL}/terms?search=nonexistentterm12345xyz`).then(r => r.json());
    assert(emptyRes.success && emptyRes.count === 0, 'Non-existent Query Handling', 'Returns empty array with status 200 without error');
  } catch (e) {
    assert(false, 'Search Tests', e.message);
  }

  // ---------------------------------------------------------------------------
  // 5. CATEGORIES & ALPHABET FILTERS
  // ---------------------------------------------------------------------------
  console.log('\n--- 5. CATEGORIES & ALPHABET FILTERS ---');
  try {
    const catRes = await fetch(`${BASE_URL}/terms/categories`).then(r => r.json());
    assert(catRes.success && catRes.data?.length === 31, 'All 30 Categories + All Category Meta', `Count: ${catRes.data?.length}`);

    // Category filter test (e.g. Constitutional Law)
    const constRes = await fetch(`${BASE_URL}/terms?category=Constitutional%20Law&limit=500`).then(r => r.json());
    assert(constRes.success && constRes.count >= 10, 'Category Filtering ("Constitutional Law")', `Filtered count: ${constRes.count}`);

    // Letter filter test (e.g. 'A')
    const letterRes = await fetch(`${BASE_URL}/terms?letter=A&limit=500`).then(r => r.json());
    assert(letterRes.success && letterRes.data.every(t => t.word.toUpperCase().startsWith('A')), 'A-Z Letter Indexing (Letter "A")', `Terms starting with A: ${letterRes.count}`);
  } catch (e) {
    assert(false, 'Categories & Alphabet Filter Tests', e.message);
  }

  // ---------------------------------------------------------------------------
  // 6. TERM OF THE DAY & COMPARISONS
  // ---------------------------------------------------------------------------
  console.log('\n--- 6. TERM OF THE DAY & COMPARISON FEATURE ---');
  try {
    const todRes = await fetch(`${BASE_URL}/terms/term-of-day`).then(r => r.json());
    assert(todRes.success && todRes.data?.word, 'Term of the Day Retrieval', `Featured: ${todRes.data?.word}`);

    // Side-by-side comparison
    const compRes = await fetch(`${BASE_URL}/terms/compare?term1=Bail&term2=Anticipatory%20Bail`).then(r => r.json());
    assert(compRes.success && compRes.data?.term1?.word === 'Bail' && compRes.data?.term2?.word === 'Anticipatory Bail', 'Side-by-Side Term Comparison', 'Bail vs Anticipatory Bail loaded');
  } catch (e) {
    assert(false, 'TOD and Compare Tests', e.message);
  }

  // ---------------------------------------------------------------------------
  // 7. BOOKMARKS & USER ISOLATION
  // ---------------------------------------------------------------------------
  console.log('\n--- 7. BOOKMARKS SYNCHRONIZATION & USER ISOLATION ---');
  try {
    // User A bookmarks term 1 and term 2
    await fetch(`${BASE_URL}/bookmarks/1`, { method: 'POST', headers: { Authorization: `Bearer ${tokenA}` } });
    await fetch(`${BASE_URL}/bookmarks/2`, { method: 'POST', headers: { Authorization: `Bearer ${tokenA}` } });

    // User B bookmarks term 3
    await fetch(`${BASE_URL}/bookmarks/3`, { method: 'POST', headers: { Authorization: `Bearer ${tokenB}` } });

    // Verify User A bookmarks
    const bmA = await fetch(`${BASE_URL}/bookmarks`, { headers: { Authorization: `Bearer ${tokenA}` } }).then(r => r.json());
    const bmAIds = bmA.data.map(b => b.term.id);
    assert(bmA.success && bmAIds.includes(1) && bmAIds.includes(2) && !bmAIds.includes(3), 'User A Bookmarks Isolation', `IDs: [${bmAIds.join(', ')}]`);

    // Verify User B bookmarks
    const bmB = await fetch(`${BASE_URL}/bookmarks`, { headers: { Authorization: `Bearer ${tokenB}` } }).then(r => r.json());
    const bmBIds = bmB.data.map(b => b.term.id);
    assert(bmB.success && bmBIds.includes(3) && !bmBIds.includes(1) && !bmBIds.includes(2), 'User B Bookmarks Isolation', `IDs: [${bmBIds.join(', ')}]`);

    // Remove bookmark 1 from User A
    const remRes = await fetch(`${BASE_URL}/bookmarks/1`, { method: 'DELETE', headers: { Authorization: `Bearer ${tokenA}` } }).then(r => r.json());
    assert(remRes.success && remRes.isBookmarked === false, 'Remove Bookmark from Database for User A');

    // Confirm removal
    const bmAAfter = await fetch(`${BASE_URL}/bookmarks`, { headers: { Authorization: `Bearer ${tokenA}` } }).then(r => r.json());
    assert(!bmAAfter.data.map(b => b.term.id).includes(1), 'Confirmed Bookmark 1 Removed for User A');
  } catch (e) {
    assert(false, 'Bookmark Isolation Tests', e.message);
  }

  // ---------------------------------------------------------------------------
  // 8. LEGAL QUIZ COMPLETE FLOW & SCORING
  // ---------------------------------------------------------------------------
  console.log('\n--- 8. LEGAL QUIZ FLOW & SCORING ---');
  try {
    const quizRes = await fetch(`${BASE_URL}/quizzes`).then(r => r.json());
    const quizzes = quizRes.data || [];
    assert(quizRes.success && quizzes.length > 0, 'Quiz Questions Retrieved from PostgreSQL', `Loaded ${quizzes.length} questions`);

    // 8.1 Submit 100% correct answers
    const allCorrectPayload = quizzes.map(q => ({
      questionId: q.id,
      selectedOption: q.correctAnswer
    }));
    const score100Res = await fetch(`${BASE_URL}/quiz/attempt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: allCorrectPayload })
    }).then(r => r.json());

    assert(score100Res.success && score100Res.score === quizzes.length && score100Res.percentage === 100, 'Quiz 100% Score Calculation', `Score: ${score100Res.score}/${score100Res.total} (100%)`);

    // 8.2 Submit partial answers
    const partialPayload = quizzes.map((q, idx) => ({
      quizId: q.id,
      selectedAnswer: idx === 0 ? q.correctAnswer : (q.correctAnswer === 0 ? 1 : 0)
    }));
    const partialScoreRes = await fetch(`${BASE_URL}/quiz/attempt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: partialPayload })
    }).then(r => r.json());

    assert(partialScoreRes.success && partialScoreRes.score === 1, 'Quiz Partial Score Calculation (1 Correct)', `Score: ${partialScoreRes.score}/${partialScoreRes.total}`);
  } catch (e) {
    assert(false, 'Quiz Tests', e.message);
  }

  // ---------------------------------------------------------------------------
  // 9. SEARCH & VIEW HISTORY
  // ---------------------------------------------------------------------------
  console.log('\n--- 9. USER HISTORY MANAGEMENT ---');
  try {
    // Record view history for User A
    await fetch(`${BASE_URL}/history/1`, { method: 'POST', headers: { Authorization: `Bearer ${tokenA}` } });
    await fetch(`${BASE_URL}/history/2`, { method: 'POST', headers: { Authorization: `Bearer ${tokenA}` } });

    const histRes = await fetch(`${BASE_URL}/history`, { headers: { Authorization: `Bearer ${tokenA}` } }).then(r => r.json());
    assert(histRes.success && histRes.data.length >= 2, 'History Retrieval for User A', `Count: ${histRes.data.length}`);

    // Clear history
    const clearRes = await fetch(`${BASE_URL}/history`, { method: 'DELETE', headers: { Authorization: `Bearer ${tokenA}` } }).then(r => r.json());
    assert(clearRes.success, 'Clear All History for User A');

    const emptyHist = await fetch(`${BASE_URL}/history`, { headers: { Authorization: `Bearer ${tokenA}` } }).then(r => r.json());
    assert(emptyHist.success && emptyHist.data.length === 0, 'Confirmed Empty History Post-Clear');
  } catch (e) {
    assert(false, 'History Tests', e.message);
  }

  // ---------------------------------------------------------------------------
  // 10. POSTGRESQL DATABASE INTEGRITY CHECK
  // ---------------------------------------------------------------------------
  console.log('\n--- 10. POSTGRESQL DATABASE VERIFICATION ---');
  try {
    await sequelize.authenticate();
    const [userCount] = await sequelize.query(`SELECT COUNT(*) as count FROM users;`);
    const [termsCount] = await sequelize.query(`SELECT COUNT(*) as count FROM terms;`);
    const [quizCount] = await sequelize.query(`SELECT COUNT(*) as count FROM quizzes;`);
    const [bookmarksCount] = await sequelize.query(`SELECT COUNT(*) as count FROM bookmarks;`);

    assert(parseInt(termsCount[0].count, 10) === 186, 'PostgreSQL Database: 186 Terms Verified in "terms" Table');
    assert(parseInt(userCount[0].count, 10) >= 2, 'PostgreSQL Database: Registered Users Verified in "users" Table');
    assert(parseInt(quizCount[0].count, 10) >= 6, 'PostgreSQL Database: Quizzes Verified in "quizzes" Table');
    assert(parseInt(bookmarksCount[0].count, 10) >= 1, 'PostgreSQL Database: Active Bookmarks in "bookmarks" Table');
  } catch (e) {
    assert(false, 'Database Verification', e.message);
  }

  console.log('\n================================================================================');
  console.log(`🏁 FULL SUITE EXECUTION SUMMARY: ${passed} PASSED / ${failed} FAILED`);
  console.log('================================================================================');

  process.exit(failed > 0 ? 1 : 0);
}

runFullWebsiteTests();
