// app.js
import { renderHabits } from "./components/habitPicker.js";
import { updateDailyXp, getDailyXp } from "./utilities/xp.js";
import "./components/badges.js";

// XP per habit constant (should match utilities/xp.js)
const XP_PER_HABIT = 10;

document.addEventListener("DOMContentLoaded", () => {
  const xpDisplay = document.getElementById("xp");
  const themeToggle = document.getElementById("theme-toggle");
  let darkMode = false;

  // Initialize daily XP display (this will also handle daily reset if needed)
  function initializeXP() {
    const dailyXp = getDailyXp();
    xpDisplay.textContent = dailyXp;
  }

  // Update XP display with new daily XP
  function updateXPDisplay(points) {
    const state = updateDailyXp(points);
    xpDisplay.textContent = state.dailyXp;
  }

  // Initialize XP on page load
  initializeXP();

  // Load categories from JSON
  fetch("./data/categories.json")
    .then(res => res.json())
    .then(categories => {
      renderHabits(categories);
    })
    .catch(err => console.error("Error loading categories:", err));

  // Theme toggle (light/dark)
  themeToggle.addEventListener("click", () => {
    darkMode = !darkMode;
    document.body.classList.toggle("dark", darkMode);
    themeToggle.textContent = darkMode ? "🌗" : "🌓";
  });

  // Global listener for habit clicks (delegation)
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("habit-btn")) {
      // Check if the habit is currently active before toggling
      const wasActive = e.target.classList.contains("active");

      // Toggle the active state
      e.target.classList.toggle("active");

      // Update XP based on whether we're activating or deactivating
      if (wasActive) {
        // Was active, now deactivated - decrease daily XP
        updateXPDisplay(-XP_PER_HABIT);
      } else {
        // Was inactive, now activated - increase daily XP
        updateXPDisplay(XP_PER_HABIT);
      }
    }
  });
});