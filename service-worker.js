const CACHE_NAME = "firstpwa";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/pages/profile.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/assets/images/react.png",
    "assets/images/profile.png",
    "assets/images/js.png"
]

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, {cacheName: CACHE_NAME})
        .then(function(response) {
            if( response ) {
                console.log("Service Worker: Gunakan aset dari cache", response.url);
                return response
            }
            console.log("Service Worker: memuat aset dari server :", event.request.url );
            return fetch(event.request)
        })
    )
})

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys()
        .then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if(cacheName != CACHE_NAME) {
                        console.log("Service Worker: cache " + cacheName + "dihapus")
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})