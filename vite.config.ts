import path from 'path';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const isProdMode = process.env.NODE_ENV === 'production';

export const aliases = {
  '@': path.resolve(__dirname, 'src'),
  '@providers': path.resolve(__dirname, 'src/providers'),
  '@components': path.resolve(__dirname, 'src/components'),
  '@config': path.resolve(__dirname, 'src/config'),
  '@constants': path.resolve(__dirname, 'src/constants'),
  '@hooks': path.resolve(__dirname, 'src/hooks'),
  '@layout': path.resolve(__dirname, 'src/layout'),
  '@pages': path.resolve(__dirname, 'src/pages'),
  '@redux': path.resolve(__dirname, 'src/redux'),
  '@services': path.resolve(__dirname, 'src/services'),
  '@styles': path.resolve(__dirname, 'src/styles'),
  '@utils': path.resolve(__dirname, 'src/utils'),
  '/^~/': '',
};

export default defineConfig(({ mode }) => ({
  base: process.env.VITE_BASE_URL || '/',
  server: {
    host: '0.0.0.0',
    open: true,
    port: 80,
  },
  preview: {
    open: true,
    port: 80,
  },
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(process.env.CI_COMMIT_SHORT_SHA) || '1.0',
  },
  envPrefix: 'DCK',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.json'],
    alias: aliases,
  },
  build: {
    sourcemap: !isProdMode,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          antd: ['antd'],
          react: ['react', 'react-dom', 'react-router-dom'],
          libComponents: [
            '@dnd-kit/core',
            '@dnd-kit/sortable',
            'framer-motion',
            'react-fast-marquee',
            'react-infinite-scroll-component',
            'react-otp-input',
            'react-resize-detector',
          ],
          chart: ['highcharts', 'highcharts-react-official'],
          icon: [
            '@ant-design/icons',
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-brands-svg-icons',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/react-fontawesome',
          ],
          grid: ['ag-grid-community', 'ag-grid-react'],
          vendor: [
            '@reduxjs/toolkit',
            '@seznam/compose-react-refs',
            'async',
            'axios',
            'classnames',
            'dayjs',
            'file-saver',
            'history',
            'i18next',
            'i18next-browser-languagedetector',
            'i18next-http-backend',
            'js-cookie',
            'localforage',
            'lodash',
            'react-device-detect',
            'react-helmet-async',
            'react-hotkeys-hook',
            'react-i18next',
            'react-redux',
            'react-secure-storage',
            'redux-persist',
            'uuid',
          ],
          loggingTracking: ['ga-gtag'],
          // else: use index.[id].js
        },
      },
    },
    terserOptions: {
      format: {
        beautify: false,
      },
      compress: {
        passes: 3,
      },
    },
  },
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|webp|svg)$/i,
    }),
    VitePWA({
      mode: isProdMode ? 'production' : 'development',
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      outDir: 'dist',
      devOptions: {
        enabled: false,
        type: 'module',
      },
      injectManifest: {
        swDest: 'dist/sw.js',
      },
      manifest: {
        name: 'Duckling',
        short_name: 'Duckling',
        prefer_related_applications: true,
      },
    }),
  ],
}));
