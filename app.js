// app.js
console.log('🚀 App.js loading...');

import { renderHabits } from "./components/habitPicker.js?v=5";
import { updateDailyXp, getDailyXp, getTotalXp } from "./utilities/xp.js?v=5";
import "./components/badges.js?v=5";

console.log('📦 All modules imported successfully');

// XP per habit constant (should match utilities/xp.js)
const XP_PER_HABIT = 10;

document.addEventListener("DOMContentLoaded", () => {
  console.log('🎯 DOM Content Loaded');
  
  const xpDisplay = document.getElementById("xp");
  const totalXpDisplay = document.getElementById("total-xp");
  const themeToggle = document.getElementById("theme-toggle");
  let darkMode = false;

  console.log('🔍 DOM Elements found:', {
    xpDisplay: !!xpDisplay,
    totalXpDisplay: !!totalXpDisplay,
    themeToggle: !!themeToggle,
    habitContainer: !!document.getElementById("habit-container"),
    badges: !!document.getElementById("badges")
  });

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
      background: '#4caf50',
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
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, duration);
  }

  function initializeXP() {
    console.log('💰 Initializing XP...');
    // Check and reset daily XP if needed
    window.State.checkAndResetDailyXp();
    
    const dailyXp = getDailyXp();
    const totalXp = getTotalXp();
    
    console.log('💰 XP Values:', { dailyXp, totalXp });
    
    if (xpDisplay) xpDisplay.textContent = dailyXp;
    if (totalXpDisplay) totalXpDisplay.textContent = totalXp;
  }

  function updateXPDisplay(points) {
    console.log('💰 Updating XP display with points:', points);
    updateDailyXp(points);
    
    const newDailyXp = getDailyXp();
    const newTotalXp = getTotalXp();
    
    if (xpDisplay) xpDisplay.textContent = newDailyXp;
    if (totalXpDisplay) totalXpDisplay.textContent = newTotalXp;
    
    showNotification(points > 0 ? `+${points} XP earned!` : `${points} XP lost!`);
  }

  function restoreHabitStates() {
    console.log('🔄 Restoring habit states...');
    const habitButtons = document.querySelectorAll('.habit-btn');
    console.log('🔄 Found habit buttons:', habitButtons.length);
    
    habitButtons.forEach(btn => {
      const habitId = btn.dataset.habitId;
      if (window.Habits && window.Habits.isHabitCompletedToday(habitId)) {
        btn.classList.add('active');
      }
    });
  }

  // Initialize XP display
  initializeXP();

  // Load and render habits
  console.log('📋 Loading categories...');
  fetch("./data/categories.json")
    .then(res => {
      console.log('📋 Categories fetch response:', res.status);
      return res.json();
    })
    .then(categories => {
      console.log('📋 Categories loaded:', categories);
      renderHabits(categories);
      console.log('📋 renderHabits called');
      // Restore habit states after rendering
      setTimeout(() => {
        restoreHabitStates();
      }, 100);
    })
    .catch(err => {
      console.error("❌ Error loading categories:", err);
    });

  // Theme toggle
  if (themeToggle) {
    console.log('🌓 Setting up theme toggle');
    themeToggle.addEventListener("click", () => {
      console.log('🌓 Theme toggle clicked');
      darkMode = !darkMode;
      document.body.classList.toggle("dark", darkMode);
      themeToggle.textContent = darkMode ? "🌗" : "🌓";
    });
  }

  // Global listener for habit clicks (delegation)
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("habit-btn")) {
      console.log('🎯 Habit button clicked:', e.target.dataset.habitId);
      const habitId = e.target.dataset.habitId;
      
      if (!habitId) {
        console.warn('⚠️ No habit ID found on button');
        return;
      }

      // Toggle habit completion
      const newStatus = window.Habits.toggleHabitCompletion(habitId);
      console.log('🎯 Habit status changed:', { habitId, newStatus });
      
      // Update button appearance
      e.target.classList.toggle("active", newStatus);
      
      // Update XP
      const xpChange = newStatus ? XP_PER_HABIT : -XP_PER_HABIT;
      updateXPDisplay(xpChange);
      
      // Re-render badges to reflect new progress
      if (window.renderBadges) {
        console.log('🏆 Re-rendering badges');
        window.renderBadges();
      }
    }
  });

  console.log('✅ App initialization complete');
});