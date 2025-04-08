import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), visualizer()],
  base: '/small-chat/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('socket.io-client') || id.includes('axios')) {
            return '@network-vendor';
          }
          if (id.includes('emoji-picker-react')) {
            return '@emoji-vendor';
          }
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return '@react-vendor';
          }
        },
      },
    },
  },
});
