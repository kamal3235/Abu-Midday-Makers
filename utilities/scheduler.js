/*
In-tab reminder scheduler (works only while page is open).

✅ Use this file to:
- Schedule timeouts/intervals based on State.reminders rules
- Fire Notify.notify() when a reminder triggers
- Reschedule the next occurrence after firing

Exports (suggested):
- Scheduler.scheduleAll()      // reads State.reminders and schedules next fire times
- Scheduler.clearAll()

⚠ Avoid:
- Editing DOM (except calling Notify), or touching localStorage directly
*/
