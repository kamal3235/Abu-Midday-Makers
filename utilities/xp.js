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
 * @param {number} doneCount - Number of habits completed today
 * @returns {number} XP
 */
export function todayXp(doneCount) {
  if (!doneCount || doneCount < 0) return 0;
  return doneCount * XP_PER_HABIT;
}

/**
 * Returns total XP earned across history
 * @param {Array} history - Array of day objects with {doneCount}
 * @returns {number}
 */
export function totalXp(history) {
  if (!Array.isArray(history)) return 0;
  return history.reduce((xp, day) => {
    return xp + todayXp(day.doneCount);
  }, 0);
}
