export async function renderHabitPicker(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const res = await fetch("data/categories.json");
    const categories = await res.json();

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

  } catch (err) {
    // Swallowed fetch error to avoid console noise in production
  }
}
