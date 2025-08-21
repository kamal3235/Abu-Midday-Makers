export async function renderHabitPicker() {
  const container = document.getElementById("habit-container");
  if (!container) return;

  try {
    const res = await fetch("./data/categories.json");
    const categories = await res.json();

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
  } catch (err) {
    console.error("Failed to load categories:", err);
  }
}
