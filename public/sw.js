const CACHE_NAME = 'moviehub-1';

const blackSearchUrls = /object=user_avatar|user\/\d+/;

const assetUrls = [
    '/',
    // '/index.html',
    // '/settings'
];

const cachedReg =
  /\/api|(.png|.ttf|.woff2|.js|.ts|.jpg|.jpeg|.icon|.svg|.css|\/)$/;

self.addEventListener('activate', (event) => {
  const expectedCacheNames = Object.keys(CACHE_NAME).map(
    (key) => CACHE_NAME[key]
  );

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      )
    )
  );

  event.waitUntil(clients.claim());
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(assetUrls))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  const url = new URL(request.url);
  if (
    event.request.method !== 'GET' ||
    !cachedReg.test(url.pathname) ||
    blackSearchUrls.test(url.search)
  ) {
    return;
  }
  event.respondWith(networkFirst(request, /\/$/.test(url.pathname)));
});

/**
 *
 * @param request
 * @param html
 */
async function networkFirst(request, html) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);

    if (response.ok) {
      await cache.put(html ? '/' : request, response.clone());
    }

    return response;
  } catch (e) {
    let cached;
    try {
      cached = await cache.match(html ? '/' : request);
    } catch {
      return new Response(null, { status: 404, statusText: 'Not Found' });
    }
    return cached;
  }
}
