import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, Plugin } from 'vite';
import { app as backendApp } from './server/index.ts';

function backendApiPlugin(): Plugin {
  return {
    name: 'backend-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api') || req.url?.startsWith('/pay/')) {
          backendApp(req as any, res as any, next);
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), backendApiPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  server: {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    hmr: process.env.DISABLE_HMR !== 'true',
    // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        about: fileURLToPath(new URL('./about.html', import.meta.url)),
        leadership: fileURLToPath(new URL('./leadership.html', import.meta.url)),
        membership: fileURLToPath(new URL('./membership.html', import.meta.url)),
        community: fileURLToPath(new URL('./community.html', import.meta.url)),
        gallery: fileURLToPath(new URL('./gallery.html', import.meta.url)),
        documents: fileURLToPath(new URL('./documents.html', import.meta.url)),
        contact: fileURLToPath(new URL('./contact.html', import.meta.url)),
        faculties: fileURLToPath(new URL('./faculties.html', import.meta.url)),
        news: fileURLToPath(new URL('./news.html', import.meta.url)),
        systems: fileURLToPath(new URL('./systems.html', import.meta.url)),
        dashboard: fileURLToPath(new URL('./dashboard.html', import.meta.url)),
        admin: fileURLToPath(new URL('./admin.html', import.meta.url)),
      },
    },
  },
});
