# Smoke Test Checklist — Midday-Makers Micro-Habit Stacker

A quick manual checklist to confirm the app’s core features work locally.

## Smoke Test Steps

- [ ] App loads at http://localhost:8000 with no errors
- [ ] No console errors in DevTools
- [ ] Habit chips render in the picker
- [ ] Can select a category and see micro-habits
- [ ] Can toggle habits as done/not done for today
- [ ] Streaks and XP update when habits are marked
- [ ] Progress persists after refreshing the page (localStorage works)
- [ ] Can tab through all interactive controls (keyboard navigation)
- [ ] Visible focus indicator on controls
- [ ] Layout looks OK at mobile width


Smoke Test — App Entry

How to Run:
1. Start a local server in your project folder:python3 -m http.server 8000 
2. Open http://localhost:8000/tests/manual/smoke.html in Chrome. 
3. Check the Console (Cmd+Option+I) for PASS/FAIL messages. 
Works in latest Chrome; Firefox optional. 