const CACHE = "miyu-v36";
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