import { renderHabitPicker } from "./components/habitPicker.js";

(function () {
  function applySavedTheme() {
    const saved = localStorage.getItem("theme") || "dark";
    document.body.classList.remove("light", "dark");
    document.body.classList.add(saved);
  }

  function toggleTheme() {
    const current = document.body.classList.contains("dark") ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    document.body.classList.remove("light", "dark");
    document.body.classList.add(next);
    localStorage.setItem("theme", next);
  }

  // Apply saved theme on load
  applySavedTheme();

  // Theme toggle button
  const t = document.getElementById("themeToggle");
  if (t) t.onclick = toggleTheme;

  // Boot the UI
  renderHabitPicker(); // Render chips from JSON

  if (window.TodayPanel?.mount) window.TodayPanel.mount();
  if (window.TowerView?.mount) window.TowerView.mount();
})();
