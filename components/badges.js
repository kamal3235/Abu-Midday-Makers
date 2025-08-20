/*
COMPONENT: Badges  — renders into #badges

Goal
- Show badges the user has earned (first 7‑day streak, all‑green day, etc.).

What to build
- A simple list/grid of badge tiles.
- Logic to decide if a badge is earned can live in a small helper or here.

Steps
1) const el = document.getElementById('badges')
2) Check State (streaks/history) and decide which badges are earned.
3) Render earned vs locked visuals.

Avoid
- Writing to localStorage directly—if you need to save earned badges, go through State helpers.
*/

// Show welcome page on startup

// Suggest 3 short, friendly tooltip texts for badges in a habit tracker app. Keep them fun and 6–10 words max.

"Great job! Keep your streak going strong!"
"Habit mastered—you're on a roll!"
"Consistency is key. You’re crushing it!"
friendly tooltip texts for badges in a habit tracker app

"Awesome streak! Your habits are thriving!"
"Badge unlocked—keep up the great work!"
"You’re a habit hero—way to go!"
