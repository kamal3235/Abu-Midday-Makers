
// app.js
console.log('🚀 App.js loading...');

// XP tracking variables
let dailyXP = 0;
let totalXP = 0;

// Load XP from localStorage
function loadXP() {
  const savedDailyXP = localStorage.getItem('dailyXP');
  const savedTotalXP = localStorage.getItem('totalXP');
  
  if (savedDailyXP) dailyXP = parseInt(savedDailyXP);
  if (savedTotalXP) totalXP = parseInt(savedTotalXP);
  
  updateXPDisplay();
}

// Save XP to localStorage
function saveXP() {
  localStorage.setItem('dailyXP', dailyXP.toString());
  localStorage.setItem('totalXP', totalXP.toString());
}

// Update XP display
function updateXPDisplay() {
  const dailyXPElement = document.getElementById('xp');
  const totalXPElement = document.getElementById('total-xp');
  
  if (dailyXPElement) dailyXPElement.textContent = dailyXP;
  if (totalXPElement) totalXPElement.textContent = totalXP;
}

// Add XP (positive or negative)
function addXP(points) {
  dailyXP += points;
  totalXP += points;
  
  // Ensure XP doesn't go below 0
  if (dailyXP < 0) dailyXP = 0;
  if (totalXP < 0) totalXP = 0;
  
  saveXP();
  updateXPDisplay();
  
  // Show notification
  showNotification(points > 0 ? `+${points} XP earned!` : `${points} XP lost!`);
}

// Show notification
function showNotification(message) {
  // Remove existing notification
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
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
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Check if it's a new day and reset daily XP
function checkNewDay() {
  const today = new Date().toDateString();
  const lastReset = localStorage.getItem('lastXPReset');
  
  if (lastReset !== today) {
    // Reset daily XP
    dailyXP = 0;
    localStorage.setItem('lastXPReset', today);
    updateXPDisplay();
    
    // Reset completed habits for the new day
    completedHabits.clear();
    saveCompletedHabits();
    
    // Reset daily streak (not total streak)
    resetDailyStreak();
    
    // Reset habit button visual states
    resetHabitButtonStates();
    
    // Update badges to reflect the reset
    renderBadges();
    
    // Show notification about daily reset
    showNotification('🔄 New day! All habits reset. Start fresh!');
    
    console.log('🔄 New day detected - Daily XP, habits, and streaks reset');
  }
}

// Reset all habit buttons to inactive state
function resetHabitButtonStates() {
  const habitButtons = document.querySelectorAll('.habit-btn');
  habitButtons.forEach(btn => {
    btn.classList.remove('active');
    btn.style.background = '';
    btn.style.color = '';
  });
  console.log('🔄 Reset habit button visual states');
}

// Badge system
let completedHabits = new Set();

// Load completed habits from localStorage
function loadCompletedHabits() {
  const saved = localStorage.getItem('completedHabits');
  if (saved) {
    completedHabits = new Set(JSON.parse(saved));
  }
}

// Save completed habits to localStorage
function saveCompletedHabits() {
  localStorage.setItem('completedHabits', JSON.stringify(Array.from(completedHabits)));
}

// Get current streak (simplified - you can enhance this)
function getCurrentStreak() {
  const streak = localStorage.getItem('currentStreak') || 0;
  return parseInt(streak);
}

// Check if habits were completed today
function hasCompletedHabitsToday() {
  return completedHabits.size > 0;
}

// Update streak - only increment if habits were completed today
function updateStreak() {
  const today = new Date().toDateString();
  const lastStreakUpdate = localStorage.getItem('lastStreakUpdate');
  
  // Only update streak once per day
  if (lastStreakUpdate !== today) {
    const currentStreak = getCurrentStreak();
    const newStreak = currentStreak + 1;
    localStorage.setItem('currentStreak', newStreak.toString());
    localStorage.setItem('lastStreakUpdate', today);
    return newStreak;
  } else {
    return getCurrentStreak();
  }
}

// Reset streak for new day
function resetDailyStreak() {
  localStorage.setItem('currentStreak', '0');
  localStorage.removeItem('lastStreakUpdate'); // Allow streak to be updated again
}

// Reset all data and start fresh
function resetAllData() {
  console.log('🔄 Reset button clicked!');
  
  try {
    if (confirm('⚠️ Are you sure you want to reset ALL data? This will:\n• Reset XP to 0\n• Clear all completed habits\n• Reset all streaks\n• Lock all badges\n\nThis action cannot be undone!')) {
      console.log('✅ User confirmed reset, clearing localStorage...');
      localStorage.clear();
      console.log('✅ localStorage cleared, reloading page...');
      location.reload();
    } else {
      console.log('❌ User cancelled reset');
    }
  } catch (error) {
    console.error('❌ Error during reset:', error);
    alert('Error during reset: ' + error.message);
  }
}

// Make function globally accessible
window.resetAllData = resetAllData;

// Test that the function is accessible
console.log('🔧 Reset function accessible:', typeof window.resetAllData);
console.log('🔧 Test reset function:', window.resetAllData);

// Render badges section
function renderBadges() {
  const badgesSection = document.getElementById('badges');
  if (!badgesSection) return;
  
  const badges = [
    { id: 'first-habit', name: 'First Step', icon: '🎯', description: 'Complete your first habit' },
    { id: 'three-habits', name: 'Triple Threat', icon: '🔥', description: 'Complete 3 habits' },
    { id: 'all-habits', name: 'Habit Master', icon: '👑', description: 'Complete all 9 habits' },
    { id: 'streak-3', name: 'Consistent', icon: '📈', description: '3-day streak' },
    { id: 'streak-7', name: 'Week Warrior', icon: '🏆', description: '7-day streak' }
  ];
  
  badgesSection.innerHTML = `
    <h2>🏆 Achievement Badges</h2>
    <div class="badges-grid">
      ${badges.map(badge => {
        const isUnlocked = isBadgeUnlocked(badge.id);
        return `
          <div class="badge-card ${isUnlocked ? 'unlocked' : 'locked'}">
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-label">${badge.name}</div>
            <div class="badge-description">${badge.description}</div>
            <div class="badge-status">${isUnlocked ? '✅ Unlocked' : '🔒 Locked'}</div>
          </div>
        `;
      }).join('')}
    </div>
    
    <div style="text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #ddd;">
      <button onclick="resetAllData()" style="
        background: #ff4444; 
        color: white; 
        padding: 12px 24px; 
        border: none; 
        border-radius: 8px; 
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(255, 68, 68, 0.3);
      " onmouseover="this.style.background='#ff6666'; this.style.transform='translateY(-2px)'" 
         onmouseout="this.style.background='#ff4444'; this.style.transform='translateY(0)'">
        🔄 Reset All Data
      </button>
      <p style="margin-top: 10px; font-size: 12px; color: #666; opacity: 0.8;">
        This will reset XP, habits, streaks, and badges to start fresh
      </p>
    </div>
  `;
}

// Check if a badge should be unlocked
function isBadgeUnlocked(badgeId) {
  const currentStreak = getCurrentStreak();
  const completedCount = completedHabits.size;
  
  switch (badgeId) {
    case 'first-habit':
      return completedCount >= 1;
    case 'three-habits':
      return completedCount >= 3;
    case 'all-habits':
      return completedCount >= 9;
    case 'streak-3':
      return currentStreak >= 3;
    case 'streak-7':
      return currentStreak >= 7;
    default:
      return false;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log('🎯 DOM Content Loaded');
  
  try {
    // Initialize XP system
    loadXP();
    checkNewDay();
    
    // Initialize badge system
    loadCompletedHabits();
    
    // Import the habit picker module
    const habitPickerModule = await import("./components/habitPicker.js");
    console.log('📦 Habit picker module loaded:', habitPickerModule);
    
    // Load and render habits
    console.log('📋 Loading categories...');
    fetch("./data/categories.json")
      .then(res => {
        console.log('📋 Categories fetch response:', res.status);
        return res.json();
      })
      .then(categories => {
        console.log('📋 Categories loaded:', categories);
        habitPickerModule.renderHabits(categories);
        console.log('📋 renderHabits called');
        
        // Set up habit click listeners after rendering
        setTimeout(() => {
          setupHabitListeners();
          renderBadges(); // Render badges after habits are set up
        }, 100);
      })
      .catch(err => {
        console.error("❌ Error loading categories:", err);
        // Use fallback categories if fetch fails
        const fallbackCategories = [
          {
            id: "health",
            name: "Health",
            icon: "🧘‍♂️",
            habits: [
              { id: "h1", name: "Drink 1 glass of water" },
              { id: "h2", name: "Take a 5-minute walk" },
              { id: "h3", name: "Take deep breaths" }
            ]
          },
          {
            id: "productivity",
            name: "Productivity",
            icon: "⏱️",
            habits: [
              { id: "h4", name: "Turn off notifications" },
              { id: "h5", name: "Create a quiet workspace" },
              { id: "h6", name: "Set specific work hours" }
            ]
          },
          {
            id: "learning",
            name: "Learning",
            icon: "📚",
            habits: [
              { id: "h7", name: "Find a mentor" },
              { id: "h8", name: "Practice for 15 minutes" },
              { id: "h9", name: "Read 1 chapter" }
            ]
          }
        ];
        habitPickerModule.renderHabits(fallbackCategories);
        
        // Set up habit click listeners after rendering
        setTimeout(() => {
          setupHabitListeners();
          renderBadges(); // Render badges after habits are set up
        }, 100);
      });

    // Theme toggle
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      console.log('🌓 Setting up theme toggle');
      themeToggle.addEventListener("click", () => {
        console.log('🌓 Theme toggle clicked');
        document.body.classList.toggle("dark");
        themeToggle.textContent = document.body.classList.contains("dark") ? "🌗" : "🌙";
      });
    }

    console.log('✅ App initialization complete');
    
  } catch (error) {
    console.error('❌ App initialization failed:', error);
  }
});

// Set up habit click listeners
function setupHabitListeners() {
  const habitButtons = document.querySelectorAll('.habit-btn');
  console.log('🎯 Setting up listeners for', habitButtons.length, 'habit buttons');
  
  habitButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const habitId = btn.dataset.habitId;
      const isActive = btn.classList.contains('active');
      
      console.log('🎯 Habit clicked:', habitId, 'Current state:', isActive ? 'active' : 'inactive');
      
      if (isActive) {
        // Deactivating habit - lose XP and remove from completed
        btn.classList.remove('active');
        btn.style.background = '';
        btn.style.color = '';
        addXP(-5); // Lose 5 XP
        completedHabits.delete(habitId);
        console.log('❌ Habit deactivated:', habitId);
      } else {
        // Activating habit - gain XP and add to completed
        btn.classList.add('active');
        btn.style.background = '#4caf50';
        btn.style.color = 'white';
        addXP(10); // Gain 10 XP
        completedHabits.add(habitId);
        console.log('✅ Habit activated:', habitId);
        
        // Update streak when completing a habit
        updateStreak();
      }
      
      // Save completed habits and update badges
      saveCompletedHabits();
      renderBadges();
    });
  });
}

