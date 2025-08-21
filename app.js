import { renderHabitPicker } from "./components/habitPicker.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHabitPicker();

  // XP counter
  let xp = 0;
  const xpEl = document.getElementById("xp");

  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("habit-btn")) {
      e.target.classList.toggle("active");
      xp += e.target.classList.contains("active") ? 10 : -10;
      xpEl.textContent = `XP ${xp}`;
    }
  });

  // Dark/light mode
  const modeBtn = document.getElementById("mode-toggle");
  modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    modeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
});
