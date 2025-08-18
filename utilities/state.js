/*
UTILITY: State (single source of truth)

Goal
- Read and write the entire app state to localStorage safely.

What belongs here
- load/save functions
- small helpers like State.get(), State.set(), State.todayKey(), and any
  add/remove/toggle functions needed by tickets.

Rules
- Only store plain data (objects/arrays/numbers/strings).
- Components should call these helpers instead of touching localStorage directly.
*/



// Minimal localStorage wrapper only (no streak/xp/logic here)
(function(){
  const KEY = 'microStacker_v1';
  const defaults = {
    goalCategories: {},           // { [catId]: { stackProgress, activeHabits:[], unlockedHabits:[] } }
    selectedCategory: null,
    history: {},                  // { 'YYYY-MM-DD': { [habitId]: true } }
    streaks: {},                  // { [habitId]: number }
    xp: 0,
    badges: {},                   // { [badgeId]: true }
    timers: {},                   // { [habitId]: { durationSec, remainingSec, running, lastStart } }
    reminders: []                 // [{ id, scope:'global'|'habit', habitId?, type:'DAILY'|'WEEKLY', daysOfWeek?, times:[] }]
  };
  function load(){ try { return JSON.parse(localStorage.getItem(KEY)) || { ...defaults }; } catch { return { ...defaults }; } }
  function save(state){ localStorage.setItem(KEY, JSON.stringify(state)); }
  function get(){ return load(); }
  function set(next){ save(next); }
  function todayKey(){ return new Date().toISOString().slice(0,10); }
  window.State = { get, set, todayKey };
})();
