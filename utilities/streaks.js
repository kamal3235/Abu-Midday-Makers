/*
UTILITY: Streaks

Goal
- Calculate per‑habit streaks based on State.history.

What belongs here
- Pure functions like Streaks.calc(state) that return updated streak counts.
- Optional helper to decide if a new habit should unlock after N days.

Rules
- No DOM changes here. No alerts/notifications. Pure logic only.
*/
/**
 * Calculate the current streak of consecutive completed days ending at today or the latest valid date.
 * @param {Object} history - { "YYYY-MM-DD": true/false, ... }
 * @returns {number} Current streak count
 *
 * Example:
 * calculateCurrentStreak({
 *   "2025-08-18": true,
 *   "2025-08-19": true,
 *   "2025-08-20": true, // today
 *   "2025-08-21": true  // future, ignored
 * }) // returns 3
 */
function calculateCurrentStreak(history) {
  if (!history || Object.keys(history).length === 0) return 0;

  const today = new Date().toISOString().slice(0, 10);
  // Filter out future dates
  const validDates = Object.keys(history)
    .filter(date => date <= today)
    .sort((a, b) => new Date(b) - new Date(a)); // Descending by UTC

  let streak = 0;
  let prevDate = today;

  for (const date of validDates) {
    if (date < prevDate) {
      // Check if dates are consecutive
      const expected = new Date(prevDate);
      expected.setDate(expected.getDate() - 1);
      const expectedStr = expected.toISOString().slice(0, 10);
      if (date !== expectedStr) break; // gap breaks streak
    }
    if (history[date]) {
      streak++;
      prevDate = date;
    } else {
      break; // false breaks streak
    }
  }
  return streak;
}

/**
 * Find the best (longest) streak of consecutive completed days in history.
 * @param {Object} history - { "YYYY-MM-DD": true/false, ... }
 * @returns {number} Best streak count
*  
* Example:
* bestStreak({
*    "2025-08-16": true,
*    "2025-08-17": true,
*    "2025-08-19": true, // gap (missing 17th)
*    "2025-08-20": true
*  }) // returns 2
*/ 
function bestStreak(history) {
  if (!history || Object.keys(history).length === 0) return 0;

  const today = new Date().toISOString().slice(0, 10);
  // Filter out future dates
  const validDates = Object.keys(history)
    .filter(date => date <= today)
    .sort((a, b) => new Date(a) - new Date(b)); // Ascending by UTC

  let maxStreak = 0;
  let currentStreak = 0;
  let prevDate = null;

  for (const date of validDates) {
    if (!history[date]) {
      currentStreak = 0;
      prevDate = null;
      continue;
    }
    if (prevDate) {
      // Check if dates are consecutive
      const expected = new Date(prevDate);
      expected.setDate(expected.getDate() + 1);
      const expectedStr = expected.toISOString().slice(0, 10);
      if (date !== expectedStr) {
        currentStreak = 1; // restart streak
      } else {
        currentStreak++;
      }
    } else {
      currentStreak = 1;
    }
    maxStreak = Math.max(maxStreak, currentStreak);
    prevDate = date;
  }
  return maxStreak;
}

// --- Commented Example Usage ---

const history = {
  "2025-08-14": true,
  "2025-08-15": true,
  "2025-08-16": true,
  "2025-08-18": true, // gap
  "2025-08-19": true,
  "2025-08-21": true // future
};
console.log(calculateCurrentStreak(history)); // Expected. 2 (if today is 2025-08-20)
console.log(bestStreak(history)); // Expected: 3

// Export the functions for ES6 modules
export { calculateCurrentStreak, bestStreak };

// Also make functions available globally for non-module scripts
if (typeof window !== 'undefined') {
  window.Streaks = { calculateCurrentStreak, bestStreak };
}