/*
APP ENTRY (start here)

What this file does
- Runs when the page loads.
- Sets up the app (theme button, loading data, calling component functions).

What to put here
- A small "init()" function that calls each component’s setup (e.g., HabitPicker, TodayPanel).
- High-level event wiring (like theme toggle).

How to work on this file
1) If your ticket adds a new component, call its setup/mount function from init().
2) Keep this file small. Put feature logic in /components or /utilities.
3) Don’t write to localStorage directly—use helpers in /utilities/state.js.
*/


// Base bootstrap only — no features/components here
(function(){
  function applySavedTheme(){
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    document.getElementById('themeToggle')?.setAttribute('aria-pressed', saved==='light');
  }
  function toggleTheme(){
    const root = document.documentElement;
    const cur = root.getAttribute('data-theme') || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    document.getElementById('themeToggle')?.setAttribute('aria-pressed', next==='light');
  }
  function init(){
    applySavedTheme();
    const t = document.getElementById('themeToggle');
    if(t) t.onclick = toggleTheme;

    // Minimal placeholder so we see something running
    const start = document.getElementById('categoryPicker');
    if(start) start.innerHTML = '<h2>Getting Started</h2><p>Base skeleton is live. Add components via PRs.</p>';
  }
  window.addEventListener('DOMContentLoaded', init);
})();
