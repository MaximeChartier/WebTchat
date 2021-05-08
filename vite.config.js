import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  base: '/',
  build: {
    polyfillDynamicImport: false,
    assetsDir: '',
    manifest: true,
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
