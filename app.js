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

  function showNotification(message, duration = 3000) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: '1000',
      fontSize: '14px',
      fontWeight: '500',
      opacity: '0',
      transform: 'translateY(-10px)',
      transition: 'all 0.3s ease'
    });

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    });

    // Remove after duration
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, duration);
  }

  function initializeXP() {
    const result = getDailyXp();
    const totalXp = getTotalXp();

    xpDisplay.textContent = result.dailyXp;
    totalXpDisplay.textContent = totalXp;

    if (result.wasReset) {
      showNotification(`Daily XP reset! Yesterday's ${result.previousDailyXp} XP added to total.`);
    }
  }

  function updateXPDisplay(points) {
    updateDailyXp(points);
    const newDailyXp = getDailyXp().dailyXp;
    const newTotalXp = getTotalXp();
    xpDisplay.textContent = newDailyXp;
    totalXpDisplay.textContent = newTotalXp;
  }

  // Function to restore habit button states from localStorage
  function restoreHabitStates() {
    const completedHabits = Habits.getTodaysCompletedHabits();

    // Find all habit buttons and set their active state based on stored data
    document.querySelectorAll('.habit-btn').forEach(button => {
      const habitId = button.dataset.habitId;
      if (completedHabits[habitId]) {
        button.classList.add('active');
      }
    });
  }

  // Initialize XP display
  initializeXP();

  // Load and render habits
  fetch("./data/categories.json")
    .then(res => res.json())
    .then(categories => {
      renderHabits(categories);
      // Restore habit states after rendering
      restoreHabitStates();
    })
    .catch(err => console.error("Error loading categories:", err));

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    darkMode = !darkMode;
    document.body.classList.toggle("dark", darkMode);
    themeToggle.textContent = darkMode ? "🌗" : "🌓";
  });

  // Global listener for habit clicks (delegation)
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("habit-btn")) {
      const habitId = e.target.dataset.habitId;

      if (!habitId) {
        console.error("Habit button missing data-habit-id attribute");
        return;
      }

      // Toggle habit completion in storage
      const isCompleted = Habits.toggleHabitCompletion(habitId);

      // Update button visual state
      e.target.classList.toggle("active", isCompleted);

      // Update XP based on new completion status
      if (isCompleted) {
        // Habit was completed - increase daily XP
        updateXPDisplay(XP_PER_HABIT);
      } else {
        // Habit was uncompleted - decrease daily XP
        updateXPDisplay(-XP_PER_HABIT);
      }

      // Re-render badges to reflect any newly earned badges
      if (window.renderBadges) {
        window.renderBadges();
      }
    }
  });
});