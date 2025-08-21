// app.js
import { renderHabits } from "./components/habitPicker.js";
import { updateDailyXp, getDailyXp, getTotalXp } from "./utilities/xp.js";
import "./components/badges.js";

// XP per habit constant (should match utilities/xp.js)
const XP_PER_HABIT = 10;

document.addEventListener("DOMContentLoaded", () => {
  const xpDisplay = document.getElementById("xp");
  const totalXpDisplay = document.getElementById("total-xp");
  const themeToggle = document.getElementById("theme-toggle");
  let darkMode = false;

  // Show a temporary notification
  function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      z-index: 1000;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, duration);
  }

  // Initialize XP displays (this will also handle daily reset if needed)
  function initializeXP() {
    const dailyXpResult = getDailyXp();
    const totalXp = getTotalXp();

    xpDisplay.textContent = dailyXpResult.dailyXp;
    totalXpDisplay.textContent = totalXp;

    // Show notification if XP was reset and transferred to total
    if (dailyXpResult.wasReset && dailyXpResult.previousDailyXp > 0) {
      showNotification(`Daily XP reset! ${dailyXpResult.previousDailyXp} XP added to your total. Start fresh today! 🌅`);
    }
  }

  // Update XP displays with new values
  function updateXPDisplay(points) {
    const state = updateDailyXp(points);
    const totalXp = getTotalXp(); // Get the current total XP from state
    xpDisplay.textContent = state.dailyXp;
    totalXpDisplay.textContent = totalXp;
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