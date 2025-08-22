/*
UTILITY: State (single source of truth)

Goal
- Read and write the entire app state to localStorage safely.

What belongs here
- load/save functions
- small helpers like State.get(), State.set(), State.todayKey()
- (Students may add more helpers via tickets)
*/

(function () {
  const KEY = 'microStacker_v1';

  const defaults = {
    goalCategories: {},   // { [catId]: { stackProgress, activeHabits:[], unlockedHabits:[] } }
    selectedCategory: null,
    history: {},          // { 'YYYY-MM-DD': { [habitId]: true } }
    streaks: {},          // { [habitId]: number }
    xp: 0,                // Total/lifetime XP
    dailyXp: 0,           // XP earned today (resets daily)
    lastXpResetDate: null, // Date when XP was last reset (YYYY-MM-DD format)
    badges: {},           // { [badgeId]: true }
    timers: {},           // { [habitId]: { durationSec, remainingSec, running, lastStart } }
    reminders: [],        // [{ id, scope:'global'|'habit', habitId?, type:'DAILY'|'WEEKLY', daysOfWeek?, times:[] }]
    completedHabits: [],  // Array of habit IDs completed today
    currentStreak: 0,     // Current streak count
    lastStreakUpdate: null // Date when streak was last updated
  };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : { ...defaults };
    } catch {
      return { ...defaults };
    }
  }

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving state:', error);
    }
  }

  function get() { return load(); }
  function set(next) { save(next); }

  // Local YYYY-MM-DD (avoids timezone rollover surprises)
  function todayKey() {
    const now = new Date();
    const tz = now.getTimezoneOffset() * 60000;
    const local = new Date(now - tz);
    return local.toISOString().slice(0, 10);
  }

  // Check if daily XP needs to be reset and reset it if necessary
  function checkAndResetDailyXp() {
    const state = get();
    const today = todayKey();

    if (state.lastXpResetDate !== today) {
      // New day detected - transfer daily XP to total XP, then reset daily XP
      const previousDailyXp = state.dailyXp || 0;

      // Add yesterday's daily XP to total XP (only if there was daily XP to transfer)
      if (previousDailyXp > 0) {
        state.xp = (state.xp || 0) + previousDailyXp;
      }

      // Reset daily XP for the new day
      state.dailyXp = 0;
      state.lastXpResetDate = today;
      
      // Reset completed habits for the new day
      state.completedHabits = [];
      
      // Reset daily streak (not total streak)
      state.currentStreak = 0;
      state.lastStreakUpdate = null;
      
      set(state);

      // Return info about the reset
      return {
        ...state,
        wasReset: true,
        previousDailyXp: previousDailyXp
      };
    }

    return { ...state, wasReset: false };
  }

  // XP management functions
  function addXP(points) {
    const state = get();
    state.dailyXp = Math.max(0, (state.dailyXp || 0) + points);
    state.xp = Math.max(0, (state.xp || 0) + points);
    set(state);
    return { dailyXp: state.dailyXp, xp: state.xp };
  }

  function getDailyXP() {
    const state = get();
    return state.dailyXp || 0;
  }

  function getTotalXP() {
    const state = get();
    return state.xp || 0;
  }

  // Habit management functions
  function addCompletedHabit(habitId) {
    const state = get();
    if (!state.completedHabits.includes(habitId)) {
      state.completedHabits.push(habitId);
      set(state);
    }
    return state.completedHabits;
  }

  function removeCompletedHabit(habitId) {
    const state = get();
    state.completedHabits = state.completedHabits.filter(id => id !== habitId);
    set(state);
    return state.completedHabits;
  }

  function getCompletedHabits() {
    const state = get();
    return state.completedHabits || [];
  }

  function clearCompletedHabits() {
    const state = get();
    state.completedHabits = [];
    set(state);
    return state.completedHabits;
  }

  // Streak management functions
  function updateStreak() {
    const state = get();
    const today = todayKey();
    
    // Only update streak once per day
    if (state.lastStreakUpdate !== today) {
      state.currentStreak = (state.currentStreak || 0) + 1;
      state.lastStreakUpdate = today;
      set(state);
      return { currentStreak: state.currentStreak, wasUpdated: true };
    }
    
    return { currentStreak: state.currentStreak || 0, wasUpdated: false };
  }

  function getCurrentStreak() {
    const state = get();
    return state.currentStreak || 0;
  }

  function resetDailyStreak() {
    const state = get();
    state.currentStreak = 0;
    state.lastStreakUpdate = null;
    set(state);
    return state.currentStreak;
  }

  // Expose a comprehensive, safe API
  window.State = { 
    get, 
    set, 
    todayKey, 
    checkAndResetDailyXp,
    addXP,
    getDailyXP,
    getTotalXP,
    addCompletedHabit,
    removeCompletedHabit,
    getCompletedHabits,
    clearCompletedHabits,
    updateStreak,
    getCurrentStreak,
    resetDailyStreak
  };
})();