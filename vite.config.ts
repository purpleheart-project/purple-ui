import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  server: {
    port: 8000,
    proxy: {
      '/api': {
        target: 'https://purpleheart.rico.org.cn',
        changeOrigin: true,
        rewrite: (path: string) => path.replace('/api', '/'),
      },
    },
  },
});
