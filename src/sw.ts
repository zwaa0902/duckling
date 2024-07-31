import { cacheNames, clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute, setDefaultHandler } from 'workbox-routing';
import { NetworkFirst, NetworkOnly } from 'workbox-strategies';

// import type { ManifestEntry } from 'workbox-build';

declare const self: ServiceWorkerGlobalScope;

self.__WB_DISABLE_DEV_LOGS = true;

// declare type ExtendableEvent = any;

const cacheName = 'Duckling-' + cacheNames.runtime;
// const isProductionMode = process.env.NODE_ENV === 'production';
// const manifest = self.__WB_MANIFEST as Array<ManifestEntry>;
// const cacheEntries: RequestInfo[] = [];
// const regexUrl = new RegExp(/(http[s]?:\/\/)?([^\/\s]+\/)(.*)/);

cleanupOutdatedCaches();

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// to allow work offline
// registerRoute(
//   new NavigationRoute(createHandlerBoundToURL('/'), {
//     denylist: [],
//   }),
// );
registerRoute(new NavigationRoute(new NetworkFirst({ cacheName })));

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

// self.addEventListener('push', (event: ExtendableEvent) => {
//   const data = event.data.json();
//   if (Date.now() - data.createdAt <= 60000) {
//     event.waitUntil(
//       self.clients.matchAll().then((clientList) => {
//         const focused = clientList.some((client: any) => client?.focused);
//         if (!focused) {
//           return self.registration.showNotification(data.title, {
//             body: data.body,
//             icon: data.icon || 'favicon.ico',
//             data: { redirect_url: data.path },
//           });
//         }
//       }),
//     );
//   }
// });

// self.addEventListener('notificationclick', (event) => {
//   event.notification.close();
//   event.waitUntil(
//     self.clients
//       .matchAll({
//         type: 'window',
//       })
//       .then((clientList) => {
//         for (let i = 0; i < clientList.length; i++) {
//           if (
//             `/${regexUrl.exec(clientList[i].url)?.[3]}` == event.notification.data.redirect_url &&
//             'focus' in clientList[i]
//           ) {
//             return clientList[i].focus();
//           }
//         }
//         if (self.clients.openWindow) {
//           if (event.notification.data.redirect_url !== null) {
//             return self.clients.openWindow(event.notification.data.redirect_url);
//           }
//         }
//       }),
//   );
// });

setDefaultHandler(new NetworkOnly());

// fallback to app-shell for document request
// setCatchHandler(({ request }): Promise<Response> => {
//   switch (request.destination) {
//     case 'document':
//       return caches.match('index.html').then((r) => (r ? Promise.resolve(r) : Promise.resolve(Response.error())));
//     default:
//       return Promise.resolve(Response.error());
//   }
// });

// this is necessary, since the new service worker will keep on skipWaiting state
// and then, caches will not be cleared since it is not activated
self.skipWaiting();
clientsClaim();
