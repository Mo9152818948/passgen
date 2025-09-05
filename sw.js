const CACHE_NAME = 'passgen-v9'; // برای رفرش کش، هر بار عدد رو بیشتر کن
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './1000002828.png', // 192
  './1000002819.png'  // 512
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
