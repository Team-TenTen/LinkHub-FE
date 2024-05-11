if (!self.define) {
  let e,
    s = {}
  const n = (n, a) => (
    (n = new URL(n + '.js', a).href),
    s[n] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;(e.src = n), (e.onload = s), document.head.appendChild(e)
        } else (e = n), importScripts(n), s()
      }).then(() => {
        let e = s[n]
        if (!e) throw new Error(`Module ${n} didn’t register its module`)
        return e
      })
  )
  self.define = (a, i) => {
    const r =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href
    if (s[r]) return
    let c = {}
    const t = (e) => n(e, r),
      o = { module: { uri: r }, exports: c, require: t }
    s[r] = Promise.all(a.map((e) => o[e] || t(e))).then((e) => (i(...e), c))
  }
}
define(['./workbox-07a7b4f2'], function (e) {
  'use strict'
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/404.png', revision: 'b1f315f74a37ee1234bb14f1458f40b1' },
        { url: '/TestImage.svg', revision: '82d3e6cf60dbfee04e7345cdec42c261' },
        {
          url: '/_next/app-build-manifest.json',
          revision: 'ebc80f568d537b871a1f2c05d71c78fa',
        },
        {
          url: '/_next/static/chunks/308-a7203c28d370ca7b.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/413-c58798a93f918f2a.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/472-1f480fe3302d624e.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/934-069483cf89735c76.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/978-b973436f42c7bcae.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/(routes)/login/page-655dcac7f9d900d5.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/(routes)/notification/invite/page-2aab05337cb05c2c.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/(routes)/notification/layout-4fb8fe4b265db9d8.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/(routes)/notification/page-36dd6dea84ae9d64.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/(routes)/register/page-0030ff07c58bbe5e.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/(routes)/search/page-4421b0685e68dc87.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/(routes)/space/%5BspaceId%5D/comment/page-16dc1770d57bd1b9.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/(routes)/space/%5BspaceId%5D/layout-b24d5635975522be.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/(routes)/space/%5BspaceId%5D/page-8955c66d201018f8.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/(routes)/space/%5BspaceId%5D/scrap/page-f6a6f993acab74fb.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/(routes)/space/%5BspaceId%5D/setting/page-855fa259fa385b0f.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/(routes)/space/create/page-acb73d601424651d.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/(routes)/user/%5BuserId%5D/favorite/page-5006268b4883abfd.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/(routes)/user/%5BuserId%5D/layout-ae9141641a74e4f8.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/(routes)/user/%5BuserId%5D/page-e777afb8cf90c401.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/(routes)/user/%5BuserId%5D/space/page-8705f3031361e3a1.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/(routes)/user/setting/page-0eff78e24f40666b.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/layout-30458690844d7a74.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/not-found-2b4434c054aedf9b.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/app/page-3138ec75bef6f9a0.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/fd9d1056-d187cd1bd5197a9b.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/framework-8883d1e9be70c3da.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/main-90f027d28dafd4e6.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/main-app-52aa17ea7ef89807.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/pages/_app-1534f180665c857f.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/pages/_error-b646007f40c4f0a8.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        {
          url: '/_next/static/chunks/webpack-791b6226ee89959e.js',
          revision: 'yn24jJKAIFvmGrGwXnDJr',
        },
        {
          url: '/_next/static/css/018c692f44b6d5c4.css',
          revision: '018c692f44b6d5c4',
        },
        {
          url: '/_next/static/css/431944509084d071.css',
          revision: '431944509084d071',
        },
        {
          url: '/_next/static/css/ecc940c5ccb32d51.css',
          revision: 'ecc940c5ccb32d51',
        },
        {
          url: '/_next/static/yn24jJKAIFvmGrGwXnDJr/_buildManifest.js',
          revision: '50654c4134ba6f71b423498e9447ee91',
        },
        {
          url: '/_next/static/yn24jJKAIFvmGrGwXnDJr/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/images/icons/icon-192x192.png',
          revision: '548d34e349dbfd3e618f37aeb02ab786',
        },
        {
          url: '/images/icons/icon-256x256.png',
          revision: 'b31a04a4795b370a90129c8b51e50d27',
        },
        {
          url: '/images/icons/icon-384x384.png',
          revision: 'f79fdad363cbe55dfd7c731026d9e9ee',
        },
        {
          url: '/images/icons/icon-512x512.png',
          revision: '9cc08f7d8a631737111bb33d1706935c',
        },
        {
          url: '/images/icons/splashscreens/ipad_splash.png',
          revision: '69f0d88a54fc216076b78fa895924d41',
        },
        {
          url: '/images/icons/splashscreens/ipadpro1_splash.png',
          revision: 'ddf32a4f7f6fa8d803570c1414945858',
        },
        {
          url: '/images/icons/splashscreens/ipadpro2_splash.png',
          revision: '6badcda5b3653532dfdb2d15bebb426a',
        },
        {
          url: '/images/icons/splashscreens/ipadpro3_splash.png',
          revision: '1b51032f6358bdb77439beeb5a3dd945',
        },
        {
          url: '/images/icons/splashscreens/iphone5_splash.png',
          revision: 'c68eb6d90130b7221d6d7b143354f666',
        },
        {
          url: '/images/icons/splashscreens/iphone6_splash.png',
          revision: 'cd4b1b83194848e2a83ef416ee0cf858',
        },
        {
          url: '/images/icons/splashscreens/iphoneplus_splash.png',
          revision: '6728c61cb8226bf5861bbeeea28c9b71',
        },
        {
          url: '/images/icons/splashscreens/iphonex_splash.png',
          revision: '5da5ed1d4774ab7ac785d86789903eb7',
        },
        {
          url: '/images/icons/splashscreens/iphonexr_splash.png',
          revision: '107e086b24d9870755e1250049535d8c',
        },
        {
          url: '/images/icons/splashscreens/iphonexsmax_splash.png',
          revision: 'b4f3f3f3a0d33928b3c6e0777f96e25b',
        },
        { url: '/manifest.json', revision: '1382279c5739406f6318700f1e28f10a' },
        {
          url: '/member-default.png',
          revision: '471db6fb4ca55e9ca0822239ff8e5674',
        },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        {
          url: '/test-image.svg',
          revision: '82d3e6cf60dbfee04e7345cdec42c261',
        },
        { url: '/vercel.svg', revision: '61c6b19abff40ea7acd577be818f3976' },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: n,
              state: a,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        const s = e.pathname
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        return !e.pathname.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET',
    )
})
