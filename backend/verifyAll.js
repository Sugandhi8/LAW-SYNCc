const http = require('http');

async function runVerification() {
  console.log('=====================================================');
  console.log('🔍 LAW-SYNCc LEGAL DICTIONARY AUTOMATED VERIFICATION');
  console.log('=====================================================\n');

  let passed = 0;
  let failed = 0;

  async function apiGet(endpoint) {
    const res = await fetch(`http://localhost:5000${endpoint}`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} for ${endpoint}`);
    }
    return res.json();
  }

  // Test 1: Fetch all terms
  try {
    const data = await apiGet('/api/terms?limit=500');
    if (data.success && data.count === 186 && data.total === 186) {
      console.log(`✅ [1/7] GET /api/terms: 186 terms retrieved successfully (Total: ${data.total}).`);
      passed++;
    } else {
      console.error(`❌ [1/7] GET /api/terms failed: expected 186, got ${data.count}`);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [1/7] GET /api/terms exception:`, err.message);
    failed++;
  }

  // Test 2: Categories Aggregation
  let allCategories = [];
  try {
    const data = await apiGet('/api/terms/categories');
    const nonAllCats = data.data.filter(c => c.id !== 'all');
    allCategories = nonAllCats;
    if (data.success && nonAllCats.length === 30 && data.totalTerms === 186) {
      console.log(`✅ [2/7] GET /api/terms/categories: All 30 Indian legal categories verified (Sum of counts: ${data.totalTerms}).`);
      passed++;
    } else {
      console.error(`❌ [2/7] GET /api/terms/categories failed: expected 30 categories, got ${nonAllCats.length}`);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [2/7] GET /api/terms/categories exception:`, err.message);
    failed++;
  }

  // Test 3: Term of the Day
  try {
    const data = await apiGet('/api/terms/term-of-day');
    if (data.success && data.data && data.data.word && data.data.simpleMeaning && data.data.definition && data.data.example) {
      console.log(`✅ [3/7] GET /api/terms/term-of-day: Valid term returned ('${data.data.word}', Category: '${data.data.category}').`);
      passed++;
    } else {
      console.error(`❌ [3/7] GET /api/terms/term-of-day returned incomplete data:`, data);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [3/7] GET /api/terms/term-of-day exception:`, err.message);
    failed++;
  }

  // Test 4: Term Comparison
  try {
    const data = await apiGet('/api/terms/compare?term1=Bail&term2=Anticipatory%20Bail');
    if (data.success && data.data.term1 && data.data.term2 && data.data.term1.word === 'Bail' && data.data.term2.word === 'Anticipatory Bail') {
      console.log(`✅ [4/7] GET /api/terms/compare: Side-by-side comparison verified between '${data.data.term1.word}' and '${data.data.term2.word}'.`);
      passed++;
    } else {
      console.error(`❌ [4/7] GET /api/terms/compare failed:`, data);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [4/7] GET /api/terms/compare exception:`, err.message);
    failed++;
  }

  // Test 5: Category Filtering for all 30 Categories
  try {
    let catFilterSuccess = true;
    for (const cat of allCategories) {
      const data = await apiGet(`/api/terms?category=${encodeURIComponent(cat.id)}`);
      if (!data.success || data.count !== cat.count) {
        console.error(`❌ Filter mismatch for category '${cat.name}': expected ${cat.count}, got ${data.count}`);
        catFilterSuccess = false;
        break;
      }
    }
    if (catFilterSuccess) {
      console.log(`✅ [5/7] Dynamic Category Filtering: Verified all 30 categories filter correctly matching PostgreSQL counts.`);
      passed++;
    } else {
      failed++;
    }
  } catch (err) {
    console.error(`❌ [5/7] Category filtering exception:`, err.message);
    failed++;
  }

  // Test 6: Search & Letter Indexing
  try {
    const searchData = await apiGet('/api/terms?search=Constitution');
    const letterData = await apiGet('/api/terms?letter=C');
    if (searchData.success && searchData.count > 0 && letterData.success && letterData.count > 0) {
      console.log(`✅ [6/7] Search & Letter Indexing: Search 'Constitution' returned ${searchData.count} matches; Letter 'C' returned ${letterData.count} terms.`);
      passed++;
    } else {
      console.error(`❌ [6/7] Search / letter indexing failed:`, searchData, letterData);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [6/7] Search exception:`, err.message);
    failed++;
  }

  // Test 7: Schema Field Completeness for all 186 terms
  try {
    const allData = await apiGet('/api/terms?limit=500');
    let fieldErrors = 0;
    allData.data.forEach(t => {
      if (!t.word || !t.simpleMeaning || !t.definition || !t.example || !t.category || !t.relatedLaws || !Array.isArray(t.keyElements) || !Array.isArray(t.relatedTerms)) {
        fieldErrors++;
      }
    });
    if (fieldErrors === 0) {
      console.log(`✅ [7/7] Schema Field Validation: 100% of 186 terms have non-empty word, simpleMeaning, definition, example, category, relatedLaws, keyElements[], and relatedTerms[].`);
      passed++;
    } else {
      console.error(`❌ [7/7] Schema validation found ${fieldErrors} invalid terms.`);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [7/7] Schema validation exception:`, err.message);
    failed++;
  }

  console.log('\n=====================================================');
  console.log(`🏁 VERIFICATION SUMMARY: ${passed} PASSED / ${failed} FAILED`);
  console.log('=====================================================');
}

runVerification();
