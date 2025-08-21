// app.js
import { renderHabits } from "./components/habitPicker.js";

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
    themeToggle.textContent = darkMode ? "☀️" : "🌙";
  });

  // Global listener for habit clicks (delegation)
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("habit-btn")) {
      e.target.classList.toggle("active");
      updateXP(1);
    }
  });
});
