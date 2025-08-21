export async function renderHabitPicker() {
  const container = document.getElementById("habit-container");
  if (!container) return;

  try {
    const res = await fetch("./data/categories.json");
    const categories = await res.json();

    container.innerHTML = "";

    // Assign pyramid positions
    categories.forEach((cat, idx) => {
      const card = document.createElement("div");
      card.className = `category-card`;
      if (idx === 0) card.style.gridArea = "center";
      if (idx === 1) card.style.gridArea = "left";
      if (idx === 2) card.style.gridArea = "right";

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
