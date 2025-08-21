/*
UTILITY: Streaks

Goal
- Calculate per-habit streaks based on State.history.

What belongs here
- Pure functions like Streaks.calc(state) that return updated streak counts.
- Optional helper to decide if a new habit should unlock after N days.

Rules
- No DOM changes here. No alerts/notifications. Pure logic only.
*/

/**
 * Calculate the current streak of consecutive completed days ending at today.
 * @param {Array} history - Array of day objects with {date, completed}
 */
export function calculateCurrentStreak(history) {
  let streak = 0;

  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].completed) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Calculate the best streak in history
 * @param {Array} history
 */
export function bestStreak(history) {
  let best = 0;
  let current = 0;

  history.forEach((day) => {
    if (day.completed) {
      current++;
      if (current > best) best = current;
    } else {
      current = 0;
    }
  });

  return best;
}
