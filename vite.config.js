import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    polyfillDynamicImport: false,
    assetsDir: '',
    manifest: true,
    outDir: './public/assets',
    rollupOptions: {
      output: {
        manualChunks: undefined // Désactive la séparation du vendor
      },
      input: {
        app: 'src/index.jsx'
      }
    }
  }
});
