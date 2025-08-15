// KCSE Dynamic Exam Simulator - Service Worker

const CACHE_NAME = 'kcse-simulator-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  // External CDN resources
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/chart.js/3.9.1/chart.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.2.4/fabric.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Cached all files successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Cache failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return response;
        }

        console.log('Service Worker: Fetching from network', event.request.url);
        return fetch(event.request).then(response => {
          // Don't cache if not a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Add to cache for future use
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(error => {
        console.error('Service Worker: Fetch failed', error);
        
        // Return offline page for navigation requests
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
        
        // For other requests, you might want to return a default response
        return new Response('Offline - Content not available', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      })
  );
});

// Background sync for exam data
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'exam-sync') {
    event.waitUntil(syncExamData());
  }
});

// Push notifications for study reminders
self.addEventListener('push', event => {
  console.log('Service Worker: Push received', event);
  
  const options = {
    body: event.data ? event.data.text() : 'Time for your daily study session!',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'start-exam',
        title: 'Start Exam',
        icon: '/icon-192.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icon-192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('KCSE Simulator', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification click', event);
  
  event.notification.close();

  if (event.action === 'start-exam') {
    event.waitUntil(
      clients.openWindow('/?action=quick-exam')
    );
  } else if (event.action === 'dismiss') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Periodic background sync for updating content
self.addEventListener('periodicsync', event => {
  console.log('Service Worker: Periodic sync', event.tag);
  
  if (event.tag === 'content-update') {
    event.waitUntil(updateContent());
  }
});

// Helper function to sync exam data
async function syncExamData() {
  try {
    console.log('Service Worker: Syncing exam data...');
    
    // Get pending exam data from IndexedDB
    const pendingData = await getPendingExamData();
    
    if (pendingData.length > 0) {
      // Send data to server when online
      for (const data of pendingData) {
        await fetch('/api/sync-exam', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
      }
      
      // Clear pending data after successful sync
      await clearPendingExamData();
      console.log('Service Worker: Exam data synced successfully');
    }
  } catch (error) {
    console.error('Service Worker: Exam data sync failed', error);
  }
}

// Helper function to update content
async function updateContent() {
  try {
    console.log('Service Worker: Updating content...');
    
    // Check for app updates
    const response = await fetch('/api/version');
    const versionData = await response.json();
    
    if (versionData.version !== CACHE_NAME) {
      // New version available, update cache
      const cache = await caches.open(versionData.version);
      await cache.addAll(urlsToCache);
      
      // Notify clients about update
      const clients = await self.clients.matchAll();
      clients.forEach(client => {
        client.postMessage({
          type: 'UPDATE_AVAILABLE',
          version: versionData.version
        });
      });
    }
  } catch (error) {
    console.error('Service Worker: Content update failed', error);
  }
}

// Helper functions for IndexedDB operations
async function getPendingExamData() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('KCSESimulator', 1);
    
    request.onerror = () => reject(request.error);
    
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['pendingExams'], 'readonly');
      const store = transaction.objectStore('pendingExams');
      const getAllRequest = store.getAll();
      
      getAllRequest.onsuccess = () => resolve(getAllRequest.result);
      getAllRequest.onerror = () => reject(getAllRequest.error);
    };
    
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('pendingExams')) {
        db.createObjectStore('pendingExams', { keyPath: 'id' });
      }
    };
  });
}

async function clearPendingExamData() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('KCSESimulator', 1);
    
    request.onerror = () => reject(request.error);
    
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['pendingExams'], 'readwrite');
      const store = transaction.objectStore('pendingExams');
      const clearRequest = store.clear();
      
      clearRequest.onsuccess = () => resolve();
      clearRequest.onerror = () => reject(clearRequest.error);
    };
  });
}

// Message handling from main thread
self.addEventListener('message', event => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('Service Worker: Script loaded');

