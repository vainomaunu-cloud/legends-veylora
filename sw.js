// Service worker: lets the installed game (📲 Asenna) start without a connection.
// Network first, so every publish still shows up right away; the cache is only used when there is no connection.
// Files are cached as they load (the game loads all its pictures at start, so one visit is enough).
const CACHE = 'veylora-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      // the page itself is always checked with the server, so a new publish (new ?v= numbers) is picked up at once
      const res = await fetch(req, req.mode === 'navigate' ? { cache: 'no-cache' } : undefined);
      if (res.ok) {
        await cache.put(req, res.clone());
        // keep only the newest ?v= copy of each file, so old versions don't pile up
        for (const old of await cache.keys()) {
          const o = new URL(old.url);
          if (o.pathname === url.pathname && o.search !== url.search) await cache.delete(old);
        }
      }
      return res;
    } catch (err) {   // offline: use the saved copy (the page itself may be asked for as ./ or index.html)
      return (await cache.match(req)) || (await cache.match(req, { ignoreSearch: true }))
        || (url.pathname.endsWith('/') ? await cache.match(new URL('index.html', url)) : undefined)
        || Response.error();
    }
  })());
});
