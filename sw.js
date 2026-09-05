JavaScript
const cacheName = 'cra-intelligence-cache-v1';
const staticAssets = [
  './',
  './index.html',
  './manifest.json',
  '[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)',
  '[https://unpkg.com/lucide@latest](https://unpkg.com/lucide@latest)'
];

// Installs cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(staticAssets);
    })
  );
});

// Cache intercept networks fetches
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request).catch(() => {
        // Fallback if everything is unreachable offline
        return caches.match('./index.html');
      });
    })
  );
});
