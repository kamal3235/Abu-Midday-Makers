/*
UTILITY: Scheduler (in-tab reminders)

Goal
- This file will handle scheduling reminders while the page is open.
- Eventually it should call Notify.notify(...) at certain times.

What to put here
- Functions like `scheduleDaily(timeHHMM)` and `clearAll()`

How to work on this file
1) Create functions to schedule and clear reminders using setTimeout/setInterval.
2) Use Notify.notify(title, message) when the reminder fires.
*/

// Store references to active reminders
let activeReminders = [];

/**
 * Schedule a reminder at a specific daily time (HH:MM)
 * @param {string} time - "HH:MM" in 24h format
 * @param {function} callback
 */
export function scheduleDaily(time, callback) {
  const now = new Date();
  const target = new Date();

  const [hours, minutes] = time.split(":").map(Number);
  target.setHours(hours, minutes, 0, 0);

  let delay = target - now;
  if (delay < 0) {
    // if the time is earlier today, schedule for tomorrow
    delay += 24 * 60 * 60 * 1000;
  }

  const id = setTimeout(() => {
    callback();
    scheduleDaily(time, callback); // reschedule for next day
  }, delay);

  activeReminders.push(id);
}

/**
 * Clear all scheduled reminders
 */
export function clearAll() {
  activeReminders.forEach(clearTimeout);
  activeReminders = [];
}
