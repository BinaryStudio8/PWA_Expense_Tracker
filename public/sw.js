// Version for cache invalidation
const CACHE_NAME = "expense-tracker-v1";
const ASSETS = ["/", "/index.html", "/manifest.json", "/pwa-icon-512.png"];

self.addEventListener("install", (event) => {
    console.log("🟢 Installing Service Worker...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("📦 Caching core assets");
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("⚙️ Activating Service Worker...");
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;
    event.respondWith(
        caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
});
