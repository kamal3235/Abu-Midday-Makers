// components/habitPicker.js

export async function renderHabitPicker(containerId = "habit-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Fallback categories in case JSON fails
  const fallbackCategories = [
    {
      id: "health",
      name: "Health",
      habits: ["Drink 1 glass of water", "Take a 5-minute walk", "Take deep breaths"]
    },
    {
      id: "productivity",
      name: "Productivity",
      habits: ["Turn off notifications", "Create a quiet workspace", "Set specific work hours"]
    },
    {
      id: "learning",
      name: "Learning",
      habits: ["Find a mentor", "Practice for 15 minutes", "Read 1 chapter"]
    }
  ];

  container.innerHTML = ""; // Clear old

  try {
    const res = await fetch("data/categories.json");
    if (!res.ok) throw new Error("Failed to fetch categories.json");
    const categories = await res.json();

    // Restore your card/chip rendering logic
    renderHabits(categories, container);
  } catch (err) {
    console.warn("Falling back to default categories:", err);
    renderHabits(fallbackCategories, container);
  }
}

// ✅ This restores your chip/card UI
function renderHabits(categories, container) {
  // Flatten all habits with category info
  const habits = categories.flatMap(cat =>
    cat.habits.map(habit => ({
      id: habit.id || habit, // fallback if string only
      name: habit.name || habit,
      category: cat.name
    }))
  );

  // Load persisted selections
  const saved = JSON.parse(localStorage.getItem("selectedHabits") || "[]");

  habits.forEach(habit => {
    const chip = document.createElement("button");
    chip.classList.add("chip");
    chip.textContent = habit.name;

    // Restore saved selections
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

// ✅ Keep updateSelection to persist in localStorage
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
