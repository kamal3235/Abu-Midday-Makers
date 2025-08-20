/*
COMPONENT: Today Panel  — renders into #todayPanel

Goal
- Show today's active habits as checkboxes or buttons.
- Let the user mark a habit done/not done for today.

What to build
- A list of today's habits with a control to mark "done".
- Display the current streak next to each habit (optional).

Steps
1) const el = document.getElementById('todayPanel')
2) Render each active habit with a checkbox/button.
3) On toggle: State.toggleToday(...) (or similar), then refresh streaks/xp using utilities.

Avoid
- Writing to localStorage directly; always use /utilities/state.js.
*/
Before:

Streak: 5 days
Missed: 2 days
Complete habit to earn badge
After:

You’ve kept your streak for 5 days—awesome!
Oops, you missed 2 days. Try again tomorrow!
Complete this habit to unlock a fun badge!

// Example function to render a badge with a tooltip
function renderBadge(badge) {
  // badge: { name, icon, type }
  // Add a friendly description for each badge type
  const badgeDescriptions = {
    streak: "Awesome streak! Your habits are thriving!",
    consistency: "Consistency is key. You’re crushing it!",
    completion: "Badge unlocked—keep up the great work!",
    // Add more badge types as needed
  };
  const description = badgeDescriptions[badge.type] || "You earned a badge—way to go!";
  return `
    <span class="badge" title="${description}">
      <img src="${badge.icon}" alt="${badge.name} badge" />
    </span>
  `;
}

// Example usage in your habit rendering logic
function renderHabit(habit) {
  // ...existing code...
  // Assume habit.badges is an array of badge objects
  const badgesHtml = habit.badges
    .map(renderBadge)
    .join('');
  return `
    <div class="habit">
      <label>
        <input type="checkbox" ${habit.doneToday ? 'checked' : ''} />
        ${habit.name}
      </label>
      <span class="streak">Streak: ${habit.streak} days</span>
      <div class="badges">
        ${badgesHtml}
      </div>
    </div>
  `;
}

function renderTodayPanel(habits) {
  const el = document.getElementById('todayPanel');
  if (!habits || habits.length === 0) {
    el.innerHTML = `
      <div class="empty-state">
        No habits selected for today. Add one to get started!
      </div>
    `;
    return;
  }
  el.innerHTML = habits.map(renderHabit).join('');
}