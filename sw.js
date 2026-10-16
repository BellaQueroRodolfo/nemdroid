// Nemdroid — service worker mínimo. Sólo existe para que la grabadora pueda mostrar un aviso
// del sistema («no entra sonido», «se cortó») con la pantalla apagada o con otra app al frente.
// No guarda nada en caché ni intercepta pedidos: la página siempre se baja actualizada.
// Va en GitHub junto a index.html. Este archivo es público: no tiene ni debe tener datos de pacientes.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    for (const c of cs) if ('focus' in c) return c.focus();
    return self.clients.openWindow ? self.clients.openWindow('./') : null;
  }));
});
