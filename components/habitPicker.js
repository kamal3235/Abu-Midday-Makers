export async function renderHabitPicker(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

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

  try {
    const res = await fetch("data/categories.json");
    if (!res.ok) throw new Error("Failed to fetch categories.json");
    const categories = await res.json();
    renderCategories(categories, container);
  } catch (err) {
    console.warn("Falling back to default categories:", err);
    renderCategories(fallbackCategories, container);
  }
}

function renderCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach((cat) => {
    // Create a category section
    const catSection = document.createElement("div");
    catSection.className = `category-section ${cat.name.toLowerCase()}`;

    // Add category title
    const catTitle = document.createElement("h2");
    catTitle.className = "category-title";
    catTitle.textContent = cat.name;
    catSection.appendChild(catTitle);

    // Habit chips wrapper
    const habitWrapper = document.createElement("div");
    habitWrapper.className = "habit-wrapper";

    cat.habits.forEach((habit) => {
      const chip = document.createElement("div");
      chip.className = "habit-chip";
      chip.textContent = habit.name || habit;
      chip.addEventListener("click", () => {
        chip.classList.toggle("active");
      });
      habitWrapper.appendChild(chip);
    });

    catSection.appendChild(habitWrapper);
    container.appendChild(catSection);
  });
}
