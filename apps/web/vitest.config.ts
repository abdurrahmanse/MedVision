import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    exclude: ['**/node_modules/**', '**/e2e/**'],
    alias: {
      'components': path.resolve(__dirname, './components'),
      'lib': path.resolve(__dirname, './lib'),
      'hooks': path.resolve(__dirname, './hooks'),
      'app': path.resolve(__dirname, './app'),
    },
  },
});
