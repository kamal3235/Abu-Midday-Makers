// Base bootstrap only — no features/components here
(function(){
  function applySavedTheme(){
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    document.getElementById('themeToggle')?.setAttribute('aria-pressed', saved==='light');
  }
  function toggleTheme(){
    const root = document.documentElement;
    const cur = root.getAttribute('data-theme') || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    document.getElementById('themeToggle')?.setAttribute('aria-pressed', next==='light');
  }
  function init(){
    applySavedTheme();
    const t = document.getElementById('themeToggle');
    if(t) t.onclick = toggleTheme;

    // Minimal placeholder so we see something running
    const start = document.getElementById('categoryPicker');
    if(start) start.innerHTML = '<h2>Getting Started</h2><p>Base skeleton is live. Add components via PRs.</p>';
  }
  window.addEventListener('DOMContentLoaded', init);
})();
