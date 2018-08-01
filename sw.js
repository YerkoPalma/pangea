/* eslint-env serviceworker */

var VERSION = require('./package.json').version
var URLS = require('./package.json').env.FILE_LIST

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url)
  if (URLS.indexOf(url.pathname) > -1) {
    e.respondWith(self.caches.match(e.request).then(function (request) {
      if (request) return request
      else return self.fetch(e.request)
    }))
  } else if (/[content|assets]\/.+/.test(url.pathname)) {
    e.respondWith(self.caches.open('static-cache').then(function (cache) {
      return cache.match(e.request).then(function (response) {
        var fetchPromise = fetch(e.request).then(function (networkResponse) {
          cache.put(e.request, networkResponse.clone())
          return networkResponse
        })
        return response || fetchPromise
      })
    }))
  }
})

// Register worker
self.addEventListener('install', function (e) {
  self.skipWaiting()
  e.waitUntil(self.caches.open(VERSION).then(function (cache) {
    return cache.addAll(URLS)
  }))
})

// Remove outdated resources
self.addEventListener('activate', function (e) {
  e.waitUntil(self.caches.keys().then(function (keyList) {
    return Promise.all(keyList.map(function (key, i) {
      if (keyList[i] !== VERSION) return self.caches.delete(keyList[i])
    }))
  }))
})