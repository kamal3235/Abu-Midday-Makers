/*
UTILITY: Scheduler (in‑tab reminders)

Goal
- Schedule reminders while the page is open (setTimeout / setInterval).
- When a reminder fires, call Notify.notify(...).

What belongs here
- Scheduler.scheduleDaily(...) or Scheduler.scheduleAll(...) using State.reminders.
- Scheduler.clearAll()

Rules
- No calendar file creation here (use /utilities/ics.js for that).
*/
