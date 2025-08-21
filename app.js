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

document.addEventListener("DOMContentLoaded", () => {
  // Initial render
  renderHabitPicker("habit-picker");

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      document.body.classList.toggle("light");
    });
  }
});
