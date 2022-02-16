this.addEventListener('install', function(event) {
    console.log('[Service Worker] Installation en cours de v1');
      event.waitUntil(
        caches.open('v1').then(function(cache) {
          console.log('[Service Worker] Mise en cache globale: app shell et contenu et tout et tout');
          return cache.addAll([
              'index.html',
              'horsligne.html',
              'index.css',
              'index.js',
              'index2.js',
              'icones/avionpapier.png',
              'icones/icon-192x192.png',
              'icones/icon-256x256.png',
              'icones/icon-384x384.png',
              'icones/icon-512x512.png',
              'bootstrap-5.1.3-dist/css/bootstrap.min.css',
              'icons-1.7.2/font/bootstrap-icons.css',
              'bootstrap-5.1.3-dist/js/bootstrap.bundle.min.js',
              'images/IMG_3578.JPG',
              'images/IMG_3836.JPG',
              'images/IMG_3976.JPG',
          ]);
        })
      );
    });
  
  this.addEventListener('activate', (e) => {
    console.log('Service worker activé, all good !');
  });
  
  function cacheOrNetwork(request) {
  return fromCache(request).catch(() => fetch(request));
  };
  
  function fromCache(request) {
  return caches.open('v1').then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
  }
  
  this.addEventListener('fetch', function(event) {
    event.respondWith(cacheOrNetwork(event.request).catch(() => 
    fallbackVersPageHorsLigne()));
  });
   
  function fallbackVersPageHorsLigne() {
    return caches.match("horsligne.html");
   }
  
   // Ne fonctionne pas, comprends pas
   /*function fallbackVersPageHorsLigne(request) {
    if (request.url.endsWith(".html")) {
      return caches.match("horsligne.html");
    } else {
      return undefined;
    }
   }*/
  
  // Gére l’événement sync dans le service worker.
  this.addEventListener('sync', function (event) {
    console.log("evenement recu : " + event);
    if (event.tag == 'mon-tag') {
        console.log("Connection réétablie, la notification peut être envoyée si autorisée.");
        event.waitUntil(envoyerNotification());
    }
  });
  
  // Cette fonction est appelée plus haut quand la connection est rétablie. Une fenêtre s'ouvre pour dire que la connection est revenue et que la page peut s'afficher.
  function envoyerNotification() {
    console.log("Notification envoyée");
    if (Notification.permission === 'granted') {
        var options = {
            body: 'Votre page est maintenant disponible !',
            requireInteraction: true
        };
  
        self.registration.showNotification('La connection est réétablie !', options);
    } else {
        console.log("aucune notification car non permis");
    }
  }