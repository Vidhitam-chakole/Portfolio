/* eslint-disable no-restricted-globals */
const CACHE_VERSION = '3.1.0';
const STATIC_CACHE = `windows11-static-v${CACHE_VERSION}`;
const IMAGE_CACHE = `windows11-images-v${CACHE_VERSION}`;

// Pre-cache core shell resources
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/images/wallpapers/windows11.webp',
  '/images/apps/windows.png',
  '/images/apps/chrome.png',
  '/images/apps/folder.png',
  '/images/apps/recyclebin.png',
  '/images/apps/calculator.png',
  '/images/apps/explorer.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('Pre-caching non-fatal warning:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== IMAGE_CACHE) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests and http/https schemes
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  const url = new URL(request.url);

  // Strategy 1: Static assets (JS, CSS, static chunks) - Stale While Revalidate
  if (url.pathname.startsWith('/static/')) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => null);

        return cachedResponse || (await fetchPromise);
      })
    );
    return;
  }

  // Strategy 2: Images and Audio - Cache First with Network Fallback
  if (
    url.pathname.startsWith('/images/') ||
    url.pathname.startsWith('/audio/') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.ico')
  ) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) return cachedResponse;

        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch {
          return cachedResponse;
        }
      })
    );
    return;
  }

  // Strategy 3: HTML Pages / Navigation - Network first, fallback to cached index
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(STATIC_CACHE);
        return cache.match('/') || cache.match('/index.html');
      })
    );
    return;
  }

  // Default: Network fetch
  event.respondWith(fetch(request));
});
