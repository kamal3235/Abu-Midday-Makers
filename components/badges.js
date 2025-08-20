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

// Example badge state (replace with your actual logic)
const badgesState = [
  { name: '7-Day Streak', earned: true }, // Achievement: completed 7 consecutive days
  { name: 'All-Green Day', earned: true }, // Achievement: all selected habbits were completed today
  { name: '51% Club', earned: true } // Achievement: more completed days than not completed days in history
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
