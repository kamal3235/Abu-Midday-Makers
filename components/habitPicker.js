// components/habitPicker.js
export function renderHabits(categories) {
  const container = document.getElementById("habit-container");
  container.innerHTML = "";

  categories.forEach(category => {
    // Create category card
    const card = document.createElement("div");
    card.className = "habit-card";

    // Category header
    const header = document.createElement("h3");
    header.innerHTML = `${category.icon} ${category.name}`;
    card.appendChild(header);

    // Habit buttons
    category.habits.forEach(habit => {
      const btn = document.createElement("button");
      btn.className = "habit-btn";
      btn.textContent = habit.name;

      btn.addEventListener("click", () => {
        btn.classList.toggle("active");
      });

      card.appendChild(btn);
    });

    container.appendChild(card);
  });
}
