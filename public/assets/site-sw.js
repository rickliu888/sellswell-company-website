const CACHE = "sellswell-pages-v3";
const ROUTES = ["/", "/business", "/ai", "/partners", "/about", "/insights", "/careers", "/privacy", "/terms"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => Promise.allSettled(ROUTES.map(async (route) => {
        const response = await fetch(route);
        if (response.ok) await cache.put(route, response);
      })))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith("sellswell-pages-") && key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate" || event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !ROUTES.includes(url.pathname)) return;
  const cached = caches.match(url.pathname);
  const refresh = fetch(event.request).then(async (response) => {
    if (response.ok) (await caches.open(CACHE)).put(url.pathname, response.clone());
    return response;
  });
  event.waitUntil(refresh.then(() => undefined).catch(() => undefined));
  event.respondWith(cached.then((response) => response || refresh));
});
