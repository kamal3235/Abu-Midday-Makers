# Contributing Guide

Welcome to the project! 🎉 Follow these guidelines so we can all work smoothly together.

---

## 🚫 Do NOT Edit Setup Files
Some files are for setup and automation only.  
Please **leave these alone** unless a mentor/teacher tells you otherwise:

- `.gitignore`
- `.editorconfig`
- `.prettierrc`
- `.github/workflows/ci.yml`
- `LICENSE`
- `CONTRIBUTING.md`
- `index.html`

---

## ✅ Where You SHOULD Work
All feature and UI work happens inside the `src/` folder:

- `src/app.js` → main app logic, imports features, connects events
- `src/styles.css` → main styles
- `src/components/` (folder) → create new JS/CSS files for features like:
  - habit cards
  - timers
  - scheduler
  - categories

---

## 🌱 Workflow
1. **Branching**
   - Create a new branch from `main` for your feature
   - Branch name format: `feature/your-feature-name`

2. **Coding**
   - Only add or edit files inside `src/`
   - Write comments in your code so others understand your logic
   - Keep functions/components small and focused

3. **Committing**
   - Commit often with clear messages
   - Format: `feat: add timer component` or `fix: style overlap on habit card`

4. **Pull Requests**
   - Push your branch to GitHub
   - Open a Pull Request (PR) into `main`
   - Wait for at least one teammate or mentor to review before merging

---

## 💡 Questions?
If you aren’t sure where something goes or how to structure it:
- Ask in Discord first
- Open a draft PR for feedback
