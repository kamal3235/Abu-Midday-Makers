/*
UTILITY: Notifications (in‑tab only)

Goal
- Request notification permission and show a small system toast.
- Optional: play a short beep (after a user click).

What belongs here
- Notify.enableSoundOnce()
- Notify.notify(title, body)

Rules
- No scheduling here (that goes in /utilities/scheduler.js).
*/
// Example: Request Notification permission, fallback to custom toast if not supported

/*
utilities/notify.js
Helpers for Notifications + fallback toast.
*/

// Track if we've already asked for permission this session
let askedPermission = false;

// Request browser notification permission with graceful fallback
export function requestPermission() {
  if (!('Notification' in window)) {
    toast('Notifications not supported in this browser.');
    return;
  }

  if (askedPermission) return;
  askedPermission = true;

  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      new Notification('Notifications enabled!');
    } else {
      toast('Notifications permission denied.');
    }
  });
}

// Simple toast implementation with cleanup
export function toast(message) {
  // Remove any existing toast
  const oldToast = document.getElementById('custom-toast');
  if (oldToast) oldToast.remove();

  // Create new toast
  const toastEl = document.createElement('div');
  toastEl.id = 'custom-toast';
  toastEl.textContent = message;
  toastEl.style.position = 'fixed';
  toastEl.style.bottom = '24px';
  toastEl.style.left = '50%';
  toastEl.style.transform = 'translateX(-50%)';
  toastEl.style.background = '#333';
  toastEl.style.color = '#fff';
  toastEl.style.padding = '12px 24px';
  toastEl.style.borderRadius = '8px';
  toastEl.style.zIndex = '9999';
  toastEl.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
  document.body.appendChild(toastEl);

  // Remove toast after 2 seconds
  setTimeout(() => {
    toastEl.remove();
  }, 2000);
}
