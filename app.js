import { renderHabitPicker } from "./components/habitPicker.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initial render
  renderHabitPicker("habit-picker");

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      document.body.classList.toggle("light");
    });
  }
});
