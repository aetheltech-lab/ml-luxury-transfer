import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/ml-luxury-transfer/',
  plugins: [
    react(),
    // PWA Configuration
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'ML Luxury Transfer',
        short_name: 'ML Transfer',
        description: 'Premium Passenger Transfer Service in Mykonos, Greece',
        theme_color: '#000000', 
        background_color: '#000000', // Set to black to match the app's spatial primary background
        display: 'standalone',
        orientation: 'portrait-primary', // Locks to portrait for a native app feel
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        // Caching strategy for offline functionality (Added jpg/jpeg for backgrounds)
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,json}'],
        navigateFallback: '/ml-luxury-transfer/index.html',
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/maps\.googleapis\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'google-maps-api',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30 // Cache for 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true // Allows PWA installation testing on localhost
      }
    }),
  ],
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
});