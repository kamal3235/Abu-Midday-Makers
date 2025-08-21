// app.js
import { renderHabits } from "./components/habitPicker.js";
import "./components/badges.js";

document.addEventListener("DOMContentLoaded", () => {
  const xpDisplay = document.getElementById("xp");
  const themeToggle = document.getElementById("theme-toggle");
  let xp = 0;
  let darkMode = false;

  // Load categories from JSON
  fetch("./data/categories.json")
    .then(res => res.json())
    .then(categories => {
      renderHabits(categories);
    })
    .catch(err => console.error("Error loading categories:", err));

  // Update XP display
  function updateXP(points) {
    xp += points;
    xpDisplay.textContent = xp;
  }

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
        // Was active, now deactivated - decrease XP
        updateXP(-1);
      } else {
        // Was inactive, now activated - increase XP
        updateXP(1);
      }
    }
  });
});