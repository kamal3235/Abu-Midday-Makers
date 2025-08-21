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

import { renderHabitPicker } from "./components/habitPicker.js";

(function () {
  function applySavedTheme() {
    const saved = localStorage.getItem("theme") || "dark";
    document.body.dataset.theme = saved;
  }

  function toggleTheme() {
    const current = document.body.dataset.theme || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.body.dataset.theme = next;
    localStorage.setItem("theme", next);
  }

  // Apply saved theme on load
  applySavedTheme();

  // Theme toggle button
  const t = document.getElementById("themeToggle");
  if (t) t.onclick = toggleTheme;

  // Boot the UI
  renderHabitPicker(); // Render chips from JSON

  if (window.TodayPanel?.mount) window.TodayPanel.mount();
  if (window.TowerView?.mount) window.TowerView.mount();
})();
