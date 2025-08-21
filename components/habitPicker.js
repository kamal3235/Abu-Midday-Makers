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



const habits = [
  { id: 1, category: "Health", name: "Drink 1 glass of water" },
  { id: 2, category: "Health", name: "Take a 5-minute walk" },
  { id: 3, category: "Health", name: "Take deep breaths" },
  { id: 4, category: "Productivity", name: "Turn off notifications" },
  { id: 5, category: "Productivity", name: "Create a quiet workspace" },
  { id: 6, category: "Productivity", name: "Set specific work hours" },
  { id: 7, category: "Learning", name: "Find a mentor" },
  { id: 8, category: "Learning", name: "Practice for 15 minutes" },
  { id: 9, category: "Learning", name: "Read 1 chapter" },
];

export function renderHabitPicker(containerId = "habitPicker") {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container with id '${containerId}' not found`);
    return;
  }

  // Clear but don’t mess with parent container styling
  container.innerHTML = "";

  habits.forEach(habit => {
    const div = document.createElement("div");
    div.classList.add("habit");
    div.textContent = `${habit.category}: ${habit.name}`;
    container.appendChild(div);
  });
  }