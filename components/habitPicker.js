// components/habitPicker.js

export function renderHabits(categories) {
  const container = document.getElementById("habit-container");
  if (!container) return;

  // Clear previous content
  container.innerHTML = "";

  categories.forEach(category => {
    // Category card
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category-card", category.id); // 🔑 hooks for CSS

    // Category title
    const title = document.createElement("h2");
    title.textContent = `${category.icon} ${category.name}`;
    categoryDiv.appendChild(title);

    // Habit buttons
    const habitsDiv = document.createElement("div");
    habitsDiv.classList.add("habits");

    category.habits.forEach(habit => {
      const habitBtn = document.createElement("button");
      habitBtn.textContent = habit.name;
      habitBtn.classList.add("habit-btn");
      habitBtn.dataset.habitId = habit.id;
      habitsDiv.appendChild(habitBtn);
    });

    categoryDiv.appendChild(habitsDiv);
    
    // All categories go directly to container for uniform grid layout
    container.appendChild(categoryDiv);
  });
}