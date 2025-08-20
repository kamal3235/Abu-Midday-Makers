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

import { getTodayHabits, getTodayStatus, toggleToday, getStreak } from '../utilities/state.js';

export const TodayPanel = {
  mount() {
    const el = document.getElementById('todayPanel');
    if (!el) return;

    const habits = getTodayHabits(); // [{ id, name }]
    const status = getTodayStatus(); // { habitId: true/false }

    el.innerHTML = '';
    habits.forEach(habit => {
      const label = document.createElement('label');
      label.className = 'habit-chip';
      label.tabIndex = 0;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = !!status[habit.id];
      checkbox.setAttribute('aria-label', habit.name);

      checkbox.onchange = () => {
        toggleToday(habit.id, checkbox.checked);
        renderSummary();
        renderStreak(label, habit.id);
      };

      label.onkeydown = e => {
        if (e.key === ' ' || e.key === 'Enter') {
          checkbox.checked = !checkbox.checked;
          checkbox.onchange();
        }
      };

      label.appendChild(checkbox);
      label.append(habit.name);

      // Optional: Show streak
      renderStreak(label, habit.id);

      el.appendChild(label);
    });

    renderSummary();
  }
};

function renderStreak(label, habitId) {
  if (typeof getStreak !== 'function') return;
  const streak = getStreak(habitId);
  let streakEl = label.querySelector('.streak');
  if (!streakEl) {
    streakEl = document.createElement('span');
    streakEl.className = 'streak';
    label.appendChild(streakEl);
  }
  streakEl.textContent = ` (${streak}🔥)`;
}

function renderSummary() {
  const habits = getTodayHabits();
  const status = getTodayStatus();
  const done = habits.filter(h => status[h.id]).length;
  const total = habits.length;
  const summary = document.getElementById('summary');
  if (summary) summary.textContent = `Done: ${done} / ${total}`;
}
