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

/**
 * Updates daily XP by adding points and ensures daily reset has occurred
 * @param {number} points - Points to add (can be negative)
 * @returns {object} Updated state with new daily and total XP
 */
function updateDailyXp(points) {
  // Check and reset daily XP if needed
  const state = window.State.checkAndResetDailyXp();
  
  // Update daily XP
  state.dailyXp = Math.max(0, state.dailyXp + points);
  
  // Update total XP (lifetime XP never decreases, only increases)
  if (points > 0) {
    state.xp += points;
  }
  
  // Save the updated state
  window.State.set(state);
  
  return state;
}

/**
 * Gets current daily XP, ensuring daily reset has occurred
 * @returns {number} Current daily XP
 */
function getDailyXp() {
  const state = window.State.checkAndResetDailyXp();
  return state.dailyXp || 0;
}

/**
 * Gets total/lifetime XP
 * @returns {number} Total XP earned
 */
function getTotalXp() {
  const state = window.State.get();
  return state.xp || 0;
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
export { todayXp, totalXp, getHistory, updateDailyXp, getDailyXp, getTotalXp };