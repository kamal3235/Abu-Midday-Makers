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

import { getBestStreak } from '../utilities/streaks.js';
import { getHistory } from '../utilities/xp.js'; 

// Pull real values or fallback to empty if not ready
const streaks = { bestStreak: getBestStreak?.() || 0 };
const history = getHistory?.() || [];

// Badge definitions with icons + tooltips
const badgesState = [
  {
    name: '7-Day Streak',
    earned: streaks.bestStreak >= 7,
    iconUnlocked: '🔥',
    iconLocked: '❌',
    tooltip: "Great job! Keep your streak going strong!"
  },
  {
    name: 'All-Green Day',
    earned: history.some(day => day.allGreen),
    iconUnlocked: '✅',
    iconLocked: '❌',
    tooltip: "Badge unlocked—keep up the great work!"
  },
  {
    name: '51% Club',
    earned: history.filter(day => day.completed).length >
            history.filter(day => !day.completed).length,
    iconUnlocked: '🏆',
    iconLocked: '❌',
    tooltip: "Consistency is key. You’re crushing it!"
  }
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
          title="${badge.tooltip}"
        >
          <span class="badge-icon" aria-hidden="true">
            ${badge.earned ? badge.iconUnlocked : badge.iconLocked}
          </span>
          <span class="badge-label">${badge.name}</span>
          <span class="badge-status">${badge.earned ? 'Unlocked' : 'Locked'}</span>
        </div>
      `).join('')}
    </div>
  `;
}

renderBadges();
