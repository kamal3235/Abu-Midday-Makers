/*
Calendar export utilities.

✅ Use this file to:
- Generate and download .ics files (recurring events)
- Build Google Calendar quick-add URLs

Exports:
- ICS.downloadIcs({ title, startLocal, durationMin, recur })
- ICS.googleQuickAddUrl({ title, startLocal, durationMin })

⚠ Avoid:
- In-tab scheduling or notifications (use scheduler/notify for those)
*/
