/*
COMPONENT: Habit Picker — renders into #habit-container

Goal
- Show a list of habits the user can choose to work on.
- (Later) May also show recommended next habits by category.

What to build
- Render clickable "chips" or buttons for habits.
- When the user picks one, update state via State.* and refresh the UI.

Steps
1) Find the container: const el = document.getElementById('habit-container')
2) Fetch habits from data/categories.json
3) Render clickable chips
4) Hook into State to mark chosen habits
*/

export async function renderHabitPicker(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  try {
    const res = await fetch("data/categories.json");
    const categories = await res.json();

    container.innerHTML = "";
    categories.forEach((cat) => {
      cat.habits.forEach((habit) => {
        const chip = document.createElement("div");
        chip.className = "habit-chip";
        chip.textContent = habit.name || habit;
        chip.addEventListener("click", () => {
          chip.classList.toggle("active");
        });
        container.appendChild(chip);
      });
    });
  } catch (err) {
    // Swallowed fetch error to avoid console noise in production
  }
}
