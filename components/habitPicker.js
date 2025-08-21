import categories from "../data/categories.json" assert { type: "json" };

export function renderHabitPicker() {
  const container = document.getElementById("habit-container");
  if (!container) return;

  container.innerHTML = ""; // clear

  categories.forEach(cat => {
    const card = document.createElement("div");
    card.className = `category-card category-${cat.id}`;

    const title = document.createElement("h3");
    title.className = "category-title";
    title.textContent = `${cat.icon} ${cat.name}`;
    card.appendChild(title);

    cat.habits.forEach(habit => {
      const btn = document.createElement("button");
      btn.textContent = habit.name;
      btn.className = "habit-btn";
      card.appendChild(btn);
    });

    container.appendChild(card);
  });
}
