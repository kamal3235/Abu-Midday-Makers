/*
COMPONENT: Badges  — renders into #badges

Goal
- Show badges the user has earned (first 7‑day streak, all‑green day, etc.).

What to build
- A simple list/grid of badge tiles.
- Logic to decide if a badge is earned can live in a small helper or here.

Steps
1) const el = document.getElementById('badges')
2) Check State (streaks/history) and decide which badges are earned.
3) Render earned vs locked visuals.

Avoid
- Writing to localStorage directly—if you need to save earned badges, go through State helpers.
*/

// Example streaks and history state (replace with your actual state logic)
const streaks = { currentStreak: 8 }; // e.g. 8 consecutive days
const history = [
  { date: '2025-08-18', completed: true, allGreen: true },
  { date: '2025-08-19', completed: false, allGreen: false },
  { date: '2025-08-20', completed: true, allGreen: true },
  // ...more days
];

// Badge logic
const earned7DayStreak = streaks.currentStreak >= 7;
const earnedAllGreenDay = history.some(day => day.allGreen);
const completedDays = history.filter(day => day.completed).length;
const notCompletedDays = history.length - completedDays;
const earned51Club = completedDays > notCompletedDays;

const badgesState = [
  { name: '7-Day Streak',  earned: earned7DayStreak,  /* Achievement: 7 or more consecutive completed days */ },
  { name: 'All-Green Day', earned: earnedAllGreenDay, /* Achievement: at least one day where all habits were completed */ },
  { name: '51% Club',      earned: earned51Club,      /* Achievement: more completed days than not completed days in history */ }
];

function renderBadges() {
  const el = document.getElementById('badges');
  if (!el) return;

  el.innerHTML = `
    <h2 style="margin-bottom:0.5rem;">Badges</h2>
    <div class="badges-grid" role="list">
      ${badgesState.map(badge => `
        <div 
          class="badge-card${badge.earned ? '' : ' locked'}" 
          role="listitem"
          aria-label="${badge.name} badge ${badge.earned ? 'unlocked' : 'locked'}"
        >
          <span class="badge-icon" aria-hidden="true">
            ${
              badge.name === '7-Day Streak'
                ? (badge.earned ? '🔥' : '🔒')
                : badge.name === 'All-Green Day'
                  ? (badge.earned ? '✅' : '🔒')
                : badge.name === '51% Club'
                  ? (badge.earned ? '⭐' : '🔒')
                  : (badge.earned ? '🏆' : '🔒')
            }
          </span>
          <span class="badge-label">${badge.name}</span>
          <span class="badge-status">
            ${badge.earned ? 'Unlocked' : 'Locked'}
          </span>
        </div>
      `).join('')}
    </div>
  `;
}

renderBadges();
