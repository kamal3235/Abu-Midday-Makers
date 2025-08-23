
// app.js
console.log('🚀 App.js loading...');

// XP tracking variables
let dailyXP = 0;
let totalXP = 0;

// Habit tracking with customization
let completedHabits = new Set();
let userSelectedHabits = []; // Store user's chosen habits

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



// Load user's selected habits from localStorage
function loadUserHabits() {
  const saved = localStorage.getItem('userSelectedHabits');
  if (saved) {
    userSelectedHabits = JSON.parse(saved);
  } else {
    // Default habits if none selected yet
    userSelectedHabits = [
      { id: "h1", name: "Drink 1 glass of water", category: "health" },
      { id: "h2", name: "Take a 5-minute walk", category: "health" },
      { id: "h3", name: "Take deep breaths", category: "health" },
      { id: "h4", name: "Turn off notifications", category: "productivity" },
      { id: "h5", name: "Create a quiet workspace", category: "productivity" },
      { id: "h6", name: "Set specific work hours", category: "productivity" },
      { id: "h7", name: "Find a mentor", category: "learning" },
      { id: "h8", name: "Practice for 15 minutes", category: "learning" },
      { id: "h9", name: "Read 1 chapter", category: "learning" }
    ];
  }
}

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

// Make functions globally accessible
window.resetAllData = resetAllData;
window.showHabitEditor = showHabitEditor;
window.closeHabitEditor = closeHabitEditor;
window.saveCustomHabits = saveCustomHabits;

// Test that the function is accessible
console.log('🔧 Reset function accessible:', typeof window.resetAllData);

// Show habit editor modal
function showHabitEditor() {
  // Create modal overlay
  const modal = document.createElement('div');
  modal.id = 'habit-editor-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  `;
  
  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: white;
    border-radius: 15px;
    padding: 30px;
    max-width: 800px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
  `;
  
    let html = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
      <h2 style="margin: 0; color: #333;">✏️ Create Your Own Habits</h2>
      <button onclick="closeHabitEditor()" style="
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
        padding: 5px;
      ">×</button>
    </div>
    
    <p style="color: #666; margin-bottom: 30px;">
      Write your own personal habits for each category. These will become your daily tracking habits.
    </p>
    
         <!-- Health Habits Input -->
     <div style="margin-bottom: 25px; padding: 20px; background: #f0f9ff; border-radius: 12px; border: 2px solid #2196f3;">
       <h3 style="color: #333; margin-bottom: 15px; display: flex; align-items: center;">
         🏥 Health & Wellness
       </h3>
       <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
         <input type="text" 
                id="health-habit-1" 
                placeholder="1st Health Habit" 
                value="${userSelectedHabits.find(h => h.category === 'health' && h.id === 'h1')?.name || ''}"
                style="padding: 12px; border: 2px solid #2196f3; border-radius: 8px; font-size: 14px; box-sizing: border-box;">
         <input type="text" 
                id="health-habit-2" 
                placeholder="2nd Health Habit" 
                value="${userSelectedHabits.find(h => h.category === 'health' && h.id === 'h2')?.name || ''}"
                style="padding: 12px; border: 2px solid #2196f3; border-radius: 8px; font-size: 14px; box-sizing: border-box;">
         <input type="text" 
                id="health-habit-3" 
                placeholder="3rd Health Habit" 
                value="${userSelectedHabits.find(h => h.category === 'health' && h.id === 'h3')?.name || ''}"
                style="padding: 12px; border: 2px solid #2196f3; border-radius: 8px; font-size: 14px; box-sizing: border-box;">
       </div>
       <p style="margin: 10px 0 0 0; font-size: 12px; color: #666; font-style: italic;">
         Create 3 health habits you want to build daily
       </p>
     </div>
     
     <!-- Productivity Habits Input -->
     <div style="margin-bottom: 25px; padding: 20px; background: #fff8e1; border-radius: 12px; border: 2px solid #ff9800;">
       <h3 style="color: #333; margin-bottom: 15px; display: flex; align-items: center;">
         ⏱️ Productivity
       </h3>
       <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
         <input type="text" 
                id="productivity-habit-1" 
                placeholder="1st Productivity Habit" 
                value="${userSelectedHabits.find(h => h.category === 'productivity' && h.id === 'h4')?.name || ''}"
                style="padding: 12px; border: 2px solid #ff9800; border-radius: 8px; font-size: 14px; box-sizing: border-box;">
         <input type="text" 
                id="productivity-habit-2" 
                placeholder="2nd Productivity Habit" 
                value="${userSelectedHabits.find(h => h.category === 'productivity' && h.id === 'h5')?.name || ''}"
                style="padding: 12px; border: 2px solid #ff9800; border-radius: 8px; font-size: 14px; box-sizing: border-box;">
         <input type="text" 
                id="productivity-habit-3" 
                placeholder="3rd Productivity Habit" 
                value="${userSelectedHabits.find(h => h.category === 'productivity' && h.id === 'h6')?.name || ''}"
                style="padding: 12px; border: 2px solid #ff9800; border-radius: 8px; font-size: 14px; box-sizing: border-box;">
       </div>
       <p style="margin: 10px 0 0 0; font-size: 12px; color: #666; font-style: italic;">
         Create 3 productivity habits you want to develop daily
       </p>
     </div>
     
     <!-- Learning Habits Input -->
     <div style="margin-bottom: 25px; padding: 20px; background: #f3e5f5; border-radius: 12px; border: 2px solid #9c27b0;">
       <h3 style="color: #333; margin-bottom: 15px; display: flex; align-items: center;">
         📚 Learning & Growth
       </h3>
       <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
         <input type="text" 
                id="learning-habit-1" 
                placeholder="1st Learning Habit" 
                value="${userSelectedHabits.find(h => h.category === 'learning' && h.id === 'h7')?.name || ''}"
                style="padding: 12px; border: 2px solid #9c27b0; border-radius: 8px; font-size: 14px; box-sizing: border-box;">
         <input type="text" 
                id="learning-habit-2" 
                placeholder="2nd Learning Habit" 
                value="${userSelectedHabits.find(h => h.category === 'learning' && h.id === 'h8')?.name || ''}"
                style="padding: 12px; border: 2px solid #9c27b0; border-radius: 8px; font-size: 14px; box-sizing: border-box;">
         <input type="text" 
                id="learning-habit-3" 
                placeholder="3rd Learning Habit" 
                value="${userSelectedHabits.find(h => h.category === 'learning' && h.id === 'h9')?.name || ''}"
                style="padding: 12px; border: 2px solid #9c27b0; border-radius: 8px; font-size: 14px; box-sizing: border-box;">
       </div>
       <p style="margin: 10px 0 0 0; font-size: 12px; color: #666; font-style: italic;">
         Create 3 learning habits you want to cultivate daily
       </p>
     </div>
  `;
   
       html += `
     <div style="text-align: center; margin-top: 30px;">
       <button onclick="saveCustomHabits()" style="
         background: #4caf50;
         color: white;
         border: none;
         border-radius: 8px;
         padding: 15px 30px;
         cursor: pointer;
         font-size: 16px;
         font-weight: 500;
         transition: all 0.3s ease;
         box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
       " onmouseover="this.style.transform='translateY(-2px)'" 
          onmouseout="this.style.transform='translateY(0)'">
         💾 Save My Habits
       </button>
     </div>
   `;
  
  modalContent.innerHTML = html;
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  
  console.log('🎯 Habit editor modal created and added to DOM');
}

// Close habit editor modal
function closeHabitEditor() {
  const modal = document.getElementById('habit-editor-modal');
  if (modal) {
    modal.remove();
  }
}

// Save custom habits from input fields
function saveCustomHabits() {
  // Get all 9 habit inputs
  const healthHabit1 = document.getElementById('health-habit-1').value.trim();
  const healthHabit2 = document.getElementById('health-habit-2').value.trim();
  const healthHabit3 = document.getElementById('health-habit-3').value.trim();
  
  const productivityHabit1 = document.getElementById('productivity-habit-1').value.trim();
  const productivityHabit2 = document.getElementById('productivity-habit-2').value.trim();
  const productivityHabit3 = document.getElementById('productivity-habit-3').value.trim();
  
  const learningHabit1 = document.getElementById('learning-habit-1').value.trim();
  const learningHabit2 = document.getElementById('learning-habit-2').value.trim();
  const learningHabit3 = document.getElementById('learning-habit-3').value.trim();
  
  // Validate that all fields are filled
  if (!healthHabit1 || !healthHabit2 || !healthHabit3 || 
      !productivityHabit1 || !productivityHabit2 || !productivityHabit3 || 
      !learningHabit1 || !learningHabit2 || !learningHabit3) {
    showNotification('⚠️ Please fill in all 9 habit fields!');
    return;
  }
  
  // Validate minimum length for each habit
  const allHabits = [healthHabit1, healthHabit2, healthHabit3, 
                     productivityHabit1, productivityHabit2, productivityHabit3, 
                     learningHabit1, learningHabit2, learningHabit3];
  
  for (let habit of allHabits) {
    if (habit.length < 3) {
      showNotification('⚠️ Each habit must be at least 3 characters long!');
      return;
    }
  }
  
  // Create habit objects with proper IDs and categories
  const newHabits = [
    { id: "h1", name: healthHabit1, category: "health" },
    { id: "h2", name: healthHabit2, category: "health" },
    { id: "h3", name: healthHabit3, category: "health" },
    { id: "h4", name: productivityHabit1, category: "productivity" },
    { id: "h5", name: productivityHabit2, category: "productivity" },
    { id: "h6", name: productivityHabit3, category: "productivity" },
    { id: "h7", name: learningHabit1, category: "learning" },
    { id: "h8", name: learningHabit2, category: "learning" },
    { id: "h9", name: learningHabit3, category: "learning" }
  ];
  
  // Save to localStorage
  userSelectedHabits = newHabits;
  localStorage.setItem('userSelectedHabits', JSON.stringify(newHabits));
  
  // Clear completed habits for new selection
  completedHabits.clear();
  saveCompletedHabits();
  
  // Close modal and refresh
  closeHabitEditor();
  renderHabits();
  renderBadges();
  
  showNotification('✅ Your 9 custom habits have been saved and are now ready to track!');
}









// Render user's selected habits
function renderHabits() {
  const habitContainer = document.getElementById('habit-container');
  if (!habitContainer) return;
  
  // Use user's selected habits or default ones
  const habits = userSelectedHabits.length > 0 ? userSelectedHabits : [
    { id: "h1", name: "Drink 1 glass of water", category: "health" },
    { id: "h2", name: "Take a 5-minute walk", category: "health" },
    { id: "h3", name: "Take deep breaths", category: "health" },
    { id: "h4", name: "Turn off notifications", category: "productivity" },
    { id: "h5", name: "Create a quiet workspace", category: "productivity" },
    { id: "h6", name: "Set specific work hours", category: "productivity" },
    { id: "h7", name: "Find a mentor", category: "learning" },
    { id: "h8", name: "Practice for 15 minutes", category: "learning" },
    { id: "h9", name: "Read 1 chapter", category: "learning" }
  ];
  
  // Group by category
  const categories = {};
  habits.forEach(habit => {
    if (!categories[habit.category]) {
      categories[habit.category] = [];
    }
    categories[habit.category].push(habit);
  });
  
  let html = '';
  
  Object.entries(categories).forEach(([category, categoryHabits]) => {
    const categoryName = category === 'health' ? 'Health' : 
                        category === 'productivity' ? 'Productivity' : 'Learning';
    const categoryIcon = category === 'health' ? '▲' : 
                        category === 'productivity' ? '✔' : '📚';
    
    html += `
      <div class="category-card ${category}">
        <div class="category-title">${categoryIcon} ${categoryName}</div>
        <div class="habits">
    `;
    
    categoryHabits.forEach(habit => {
      const isActive = completedHabits.has(habit.id);
      html += `
        <button class="habit-btn ${isActive ? 'active' : ''}" data-habit-id="${habit.id}">
          ${habit.name}
        </button>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
  });
  
  // Add Edit My Habits button at the bottom
  html += `
    <div style="text-align: center; margin-top: 30px;">
      <button onclick="showHabitEditor()" style="
        background: #2196f3;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 15px 30px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
      " onmouseover="this.style.transform='translateY(-2px)'" 
         onmouseout="this.style.transform='translateY(0)'">
        ✏️ Edit My Habits
      </button>
             <p style="margin-top: 15px; color: #666; font-size: 14px;">
         Create 3 custom habits for each category and track them daily
       </p>
    </div>
  `;
  
  habitContainer.innerHTML = html;
  
  // Set up event listeners
  setTimeout(() => {
    setupHabitListeners();
  }, 100);
}



// Render badges section
function renderBadges() {
  const badgesSection = document.getElementById('badges');
  if (!badgesSection) return;
  
  const totalHabits = userSelectedHabits.length > 0 ? userSelectedHabits.length : 9; // Dynamic habit count
  
  const badges = [
    { id: 'first-habit', name: 'First Step', icon: '🎯', description: 'Complete your first habit' },
    { id: 'three-habits', name: 'Triple Threat', icon: '🔥', description: 'Complete 3 habits' },
    { id: 'all-habits', name: 'Habit Master', icon: '👑', description: `Complete all ${totalHabits} habits` },
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
  const totalHabits = userSelectedHabits.length > 0 ? userSelectedHabits.length : 9; // Dynamic habit count
  
  switch (badgeId) {
    case 'first-habit':
      return completedCount >= 1;
    case 'three-habits':
      return completedCount >= 3;
    case 'all-habits':
      return completedCount >= totalHabits;
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
    
    // Initialize habit systems
    loadUserHabits();
    loadCompletedHabits();
    
    // Render user's selected habits
    renderHabits();
    
    // Render badges
    renderBadges();
    
    // Theme toggle
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
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
        btn.style.background = '#f5f5f5';
        btn.style.color = '#333';
        btn.textContent = '🎯 Mark Complete';
        addXP(-5); // Lose 5 XP
        completedHabits.delete(habitId);
        console.log('❌ Habit deactivated:', habitId);
      } else {
        // Activating habit - gain XP and add to completed
        btn.classList.add('active');
        btn.style.background = '#4caf50';
        btn.style.color = 'white';
        btn.textContent = '✅ Completed';
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

