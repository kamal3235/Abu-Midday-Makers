/*
UTILITY: XP (scoring)

Goal
- Compute daily XP from what was completed today and current streaks.

What belongs here
- A function like XP.computeDaily(state, dateKey) that returns a number.

Rules
- Pure logic only. No DOM, no localStorage writes.
*/

const XP_PER_HABIT = 10;

/**
 * Returns XP earned today based on number of habits completed.
 * @param {number} doneCount - Number of habits completed today.
 * @returns {number} XP earned today.
 */
function todayXp(doneCount) {
  if (!doneCount) return 0;
  if (!Number.isFinite(doneCount) || doneCount <= 0) return 0;
  // Ensure non-negative integer
  return Math.max(0, Math.floor(doneCount * XP_PER_HABIT));
}

/**
 * Returns total XP earned from history.
 * @param {Array} history - Array of daily records, each with a 'doneCount' property.
 * @returns {number} Total XP earned.
 */
function totalXp(history) {
  if (!history || !Array.isArray(history) || history.length === 0) return 0;
  const total = history.reduce((sum, day) => {
    // Handle missing or empty day objects safely
    const count = day && Number.isFinite(day.doneCount) ? day.doneCount : 0;
    return sum + todayXp(count);
  }, 0);
  // Ensure non-negative integer
  return Math.max(0, Math.floor(total));
}

/*
To add bonuses (e.g. streaks, achievements), 
pass an extra bonuses array/object and sum it in totalXp/history logic.
You can refactor the internals to add bonuses without changing the function signatures.
*/

// Example tests for todayXp and totalXp

console.log(todayXp(3)); // Should print 30
console.log(todayXp(0)); // Should print 0
console.log(todayXp(-2)); // Should print 0
console.log(todayXp()); // Should print 0

const mockHistory = [
  { doneCount: 2 },
  { doneCount: 4 },
  { doneCount: 0 },
  { doneCount: -1 },
  {},
  null,
  { doneCount: 3 }
];

console.log(totalXp(mockHistory)); // Should print 90 (2+4+0+0+0+0+3 = 9 habits * 10 XP)
console.log(totalXp([])); // Should print 0
console.log(totalXp()); // Should print 0
//end test data


function getHistory() {
  // For now, return empty array - this should be connected to actual state management
  return [];
}

// Export functions for ES6 modules
export { todayXp, totalXp, getHistory };

