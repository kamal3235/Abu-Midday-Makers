// Track uncaught errors
let uncaughtError = false;
window.onerror = function (message) {
  uncaughtError = true;
  console.log('FAIL: Uncaught error:', message);
};

// Check if #app exists
function checkAppMount() {
  const app = document.getElementById('app');
  if (app) {
    console.log('PASS: #app element found');
    return true;
  } else {
    console.log('FAIL: #app element not found');
    return false;
  }
}

// Check if categories.json loads
async function checkCategoriesJson() {
  try {
    const res = await fetch('/data/categories.json');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        console.log('PASS: categories.json loaded');
        return true;
      } else {
        console.log(
          'FAIL: categories.json loaded but data is empty or invalid'
        );
        return false;
      }
    } else {
      console.log('FAIL: categories.json fetch failed');
      return false;
    }
  } catch (e) {
    console.log('FAIL: categories.json fetch error', e);
    return false;
  }
}

// Run all smoke tests
async function runSmokeTest() {
  window.addEventListener('DOMContentLoaded', async () => {
    const appMounted = checkAppMount();
    const categoriesLoaded = await checkCategoriesJson();
    const errorFree = !uncaughtError;

    const results = [
      appMounted
        ? '<span class="pass">PASS</span>: #app element found'
        : '<span class="fail">FAIL</span>: #app element not found',
      categoriesLoaded
        ? '<span class="pass">PASS</span>: categories.json loaded'
        : '<span class="fail">FAIL</span>: categories.json failed',
      errorFree
        ? '<span class="pass">PASS</span>: No uncaught errors'
        : '<span class="fail">FAIL</span>: Uncaught errors found',
    ];
    document.getElementById('smoke-results').innerHTML = results.join('<br>');
  });
}

runSmokeTest();
