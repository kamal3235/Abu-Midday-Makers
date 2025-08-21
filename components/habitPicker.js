// components/habitPicker.js

const fallbackCategories = [
  {
    id: "health",
    name: "Health",
    habits: [
      { id: "h1", name: "Drink 1 glass of water" },
      { id: "h2", name: "Take a 5-minute walk" },
      { id: "h3", name: "Take deep breaths" }
    ]
  },
  {
    id: "productivity",
    name: "Productivity",
    habits: [
      { id: "p1", name: "Turn off notifications" },
      { id: "p2", name: "Create a quiet workspace" },
      { id: "p3", name: "Set specific work hours" }
    ]
  },
  {
    id: "learning",
    name: "Learning",
    habits: [
      { id: "l1", name: "Find a mentor" },
      { id: "l2", name: "Practice for 15 minutes" },
      { id: "l3", name: "Read 1 chapter" }
    ]
  }
];

export async function renderHabitPicker(containerId = "habit-container") {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id '${containerId}' not found`);
    return;
  }

  container.innerHTML = ""; // Clear old

  let categories = fallbackCategories;
  try {
    const res = await fetch("data/categories.json");
    if (res.ok) {
      categories = await res.json();
    }
  } catch (err) {
    console.warn("Using fallback categories:", err);
  }

  // Flatten habits
  const habits = categories.flatMap(cat =>
    cat.habits.map(habit => ({
      id: habit.id || `${cat.id}-${habit}`,
      name: habit.name || habit,
      category: cat.name
    }))
  );

  // Load saved state
  const saved = JSON.parse(localStorage.getItem("selectedHabits") || "[]");

  habits.forEach(habit => {
    const chip = document.createElement("button");
    chip.classList.add("chip");
    chip.textContent = habit.name;

    // Restore selection
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
