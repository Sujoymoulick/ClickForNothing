// Service Worker for ClickForNothing - satisfies legacy browser registrations and unregisters cleanly
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister().then(() => self.clients.claim())
  );
});
