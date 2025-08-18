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
