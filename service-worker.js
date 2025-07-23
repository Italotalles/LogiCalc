// service-worker.js

const CACHE_NAME = 'logiccalc-v1';
// Lista de ficheiros essenciais para o funcionamento offline.
// Se o seu projeto React gerar ficheiros com nomes diferentes, ajuste-os aqui.
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Adicione aqui os caminhos para os seus principais ficheiros JS e CSS se souber os nomes.
  // Por exemplo: '/static/js/bundle.js'
];

// Evento de Instalação: Guarda os ficheiros em cache.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de Fetch: Interceta os pedidos e serve do cache se estiver offline.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se encontrarmos no cache, retornamos a resposta do cache.
        if (response) {
          return response;
        }
        // Caso contrário, fazemos o pedido à rede.
        return fetch(event.request);
      })
  );
});
