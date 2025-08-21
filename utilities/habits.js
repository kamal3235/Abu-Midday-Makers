/*
UTILITY: Habits
Goal: Handle habit completion tracking and state persistence
*/

/**
 * Toggle a habit's completion status for today
 * @param {string} habitId - The ID of the habit to toggle
 * @returns {boolean} - The new completion status (true = completed, false = not completed)
 */
function toggleHabitCompletion(habitId) {
  const state = State.get();
  const today = State.todayKey();
  
  // Initialize today's history if it doesn't exist
  if (!state.history[today]) {
    state.history[today] = {};
  }
  
  // Toggle the habit completion status
  const currentStatus = state.history[today][habitId] || false;
  const newStatus = !currentStatus;
  state.history[today][habitId] = newStatus;
  
  // Save the updated state
  State.set(state);
  
  return newStatus;
}

/**
 * Check if a habit is completed today
 * @param {string} habitId - The ID of the habit to check
 * @returns {boolean} - True if completed today, false otherwise
 */
function isHabitCompletedToday(habitId) {
  const state = State.get();
  const today = State.todayKey();
  
  return state.history[today]?.[habitId] || false;
}

/**
 * Get all completed habits for today
 * @returns {Object} - Object with habitId as keys and true as values for completed habits
 */
function getTodaysCompletedHabits() {
  const state = State.get();
  const today = State.todayKey();
  
  return state.history[today] || {};
}

/**
 * Get habit history for streak calculations
 * @param {string} habitId - The ID of the habit
 * @returns {Object} - History object with dates as keys and completion status as values
 */
function getHabitHistory(habitId) {
  const state = State.get();
  const habitHistory = {};
  
  // Extract this habit's data from the full history
  Object.keys(state.history).forEach(date => {
    if (state.history[date][habitId] !== undefined) {
      habitHistory[date] = state.history[date][habitId];
    }
  });
  
  return habitHistory;
}

// Export functions for use in other modules
window.Habits = {
  toggleHabitCompletion,
  isHabitCompletedToday,
  getTodaysCompletedHabits,
  getHabitHistory
};