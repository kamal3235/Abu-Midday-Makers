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

function requestNotificationPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('Notifications enabled!');
      } else {
        showToast('Notifications permission denied.');
      }
    });
  } else {
    showToast('Notifications not supported in this browser.');
  }
}

// Simple toast implementation with cleanup
function showToast(message) {
  // Remove any existing toast
  const oldToast = document.getElementById('custom-toast');
  if (oldToast) oldToast.remove();

  // Create new toast
  const toast = document.createElement('div');
  toast.id = 'custom-toast';
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = '#333';
  toast.style.color = '#fff';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '8px';
  toast.style.zIndex = '9999';
  toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
  document.body.appendChild(toast);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
}