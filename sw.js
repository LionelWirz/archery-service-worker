self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
    event.waitUntil(
        caches.open('fos-archery-cache-v1').then((cache) => {
            return cache.addAll([
                '/', // Add paths to any resources you want to cache
                '/index.html'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching', event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
