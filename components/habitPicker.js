/*
COMPONENT: Habit Picker  — renders into #habitPicker

Goal
- Show a list of habits the user can choose to work on.
- (Later) May also show recommended next habits by category.

What to build
- Render clickable "chips" or buttons for habits.
- When the user picks one, update state via State.* and refresh the UI.

Steps
1) Find the container: const el = document.getElementById('habitPicker')
2) Build the list of habits (from /data or State).
3) On click: update State (do not use localStorage directly), then re-render what changed.

Avoid
- Editing HTML outside this section.
- Storing data anywhere except through /utilities/state.js.
*/


// components/habitPicker.js

// Fetch + render habits from JSON
export async function renderHabitPicker(containerId = "habit-container") {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id '${containerId}' not found`);
    return;
  }

  container.innerHTML = ""; // Clear old

  try {
    const res = await fetch("./data/categories.json");
    const categories = await res.json();

    // Flatten all habits
    const habits = categories.flatMap(cat =>
      cat.habits.map(habit => ({
        id: habit.id,
        name: habit.name,
        category: cat.name
      }))
    );

    // Load persisted selections
    const saved = JSON.parse(localStorage.getItem("selectedHabits") || "[]");

    habits.forEach(habit => {
      const chip = document.createElement("button");
      chip.classList.add("chip");
      chip.setAttribute("tabindex", "0");
      chip.setAttribute("role", "button");
      chip.textContent = habit.name;

      // Restore selected state
      if (saved.includes(habit.id)) {
        chip.classList.add("chip--selected");
      }

      const toggle = () => {
        chip.classList.toggle("chip--selected");
        updateSelection(habit.id, chip.classList.contains("chip--selected"));
      };

      chip.addEventListener("click", toggle);
      chip.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });

      container.appendChild(chip);
    });
  } catch (err) {
    console.error("Failed to load categories.json", err);
  }
}

function updateSelection(habitId, isSelected) {
  const saved = JSON.parse(localStorage.getItem("selectedHabits") || "[]");
  let updated = [...saved];

  if (isSelected) {
    if (!updated.includes(habitId)) updated.push(habitId);
  } else {
    updated = updated.filter(id => id !== habitId);
  }

  localStorage.setItem("selectedHabits", JSON.stringify(updated));
}
