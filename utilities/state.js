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
    reminders: []         // [{ id, scope:'global'|'habit', habitId?, type:'DAILY'|'WEEKLY', daysOfWeek?, times:[] }]
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
    localStorage.setItem(KEY, JSON.stringify(state));
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

  // Expose a tiny, safe API
  window.State = { get, set, todayKey, checkAndResetDailyXp };
})();