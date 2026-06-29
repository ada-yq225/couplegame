const CACHE = "miyu-v55";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./content-extra.js",
  "./fantasy-packs.js",
  "./challenges.js",
  "./scenes.js",
  "./scenes-extra.js",
  "./erotica.js",
  "./erotica-extra.js",
  "./erotica-extra-b.js",
  "./profile.js",
  "./voice.js",
  "./sync.js",
  "./galgame-campus.js",
  "./galgame-characters.js",
  "./galgame-wardrobe.js",
  "./galgame-rogue.js",
  "./galgame-orion-dialogue.js",
  "./galgame-orion-immersion.js",
  "./galgame-orion-erotica.js",
  "./galgame-orion-strategy.js",
  "./galgame-orion-playmodes.js",
  "./galgame-orion-data.js",
  "./galgame-orion-scenes.js",
  "./galgame-orion-fantasies.js",
  "./galgame-orion-expand.js",
  "./galgame-orion-flow.js",
  "./galgame-orion-ui.js",
  "./galgame-orion.js",
  "./galgame.js",
  "./vendor/peerjs.min.js",
  "./manifest.json",
  "./icon.svg",
];

function isNetworkFirst(request) {
  if (request.method !== "GET") return false;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;
  const p = url.pathname;
  return p.endsWith(".html") || p.endsWith(".js") || p.endsWith(".css") || p === "/" || p.endsWith("/");
}

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (isNetworkFirst(e.request)) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }
  e.respondWith(caches.match(e.request).then((cached) => cached || fetch(e.request)));
});