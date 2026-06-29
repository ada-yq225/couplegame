const CACHE = "miyu-v50";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./content-extra.js",
  "./fantasy-packs.js",
  "./galgame-campus.js",
  "./galgame-characters.js",
  "./galgame-wardrobe.js",
  "./galgame-rogue.js",
  "./galgame-orion-data.js",
  "./galgame-orion-scenes.js",
  "./galgame-orion.js",
  "./galgame.js",
  "./challenges.js",
  "./scenes.js",
  "./scenes-extra.js",
  "./erotica.js",
  "./erotica-extra.js",
  "./erotica-extra-b.js",
  "./profile.js",
  "./voice.js",
  "./sync.js",
  "./manifest.json",
  "./icon.svg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
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
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});