import { renderHabitPicker } from "./components/habitPicker.js";

(function () {
  function applySavedTheme() {
    const saved = localStorage.getItem("theme") || "light";
    document.body.dataset.theme = saved;
  }

  function toggleTheme() {
    const current = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = current;
    localStorage.setItem("theme", current);
  }

  applySavedTheme();

  const t = document.getElementById("themeToggle");
  if (t) t.onclick = toggleTheme;

  // Boot the UI
  renderHabitPicker(); // Render category cards
})();
