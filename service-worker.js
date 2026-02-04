const CACHE_NAME = 'sta-v3';
const ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/utils.js',
  './js/storage.js',
  './js/data.js',
  './js/timer.js',
  './js/ui.js',
  './js/app.js',
  './manifest-v2.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Sofort aktivieren
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
