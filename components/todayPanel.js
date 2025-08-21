/*
COMPONENT: Today Panel — renders into #todayPanel

Goal
- Show today's active habits as checkboxes or buttons.
- Let the user mark a habit done/not done for today.

What to build
- A list of today's habits with a control to mark "done".
- Display the current streak next to each habit (optional).

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

    // Empty state
    if (!habits || habits.length === 0) {
      el.innerHTML = `
        <div class="empty-state">
          No habits selected for today. <a href="#habitPicker">Add one to get started!</a>
        </div>
      `;
      return;
    }

    el.innerHTML = '';
    habits.forEach(habit => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `habit-${habit.id}`;
      checkbox.checked = status[habit.id] === true;

      const label = document.createElement('label');
      label.className = 'habit-chip';
      label.setAttribute('for', checkbox.id);
      label.tabIndex = 0;
      label.textContent = habit.name;

      // Events
      checkbox.addEventListener('change', () => {
        toggleToday(habit.id, checkbox.checked);
        renderSummary();
        renderStreak(label, habit.id);
      });

      checkbox.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event('change'));
        }
      });

      el.appendChild(label);
      label.prepend(checkbox);

      // Show streak
      renderStreak(label, habit.id);
    });

    renderSummary();
  }
};

function renderStreak(label, habitId) {
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
