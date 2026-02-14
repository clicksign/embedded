import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.spec.js'],
    exclude: ['node_modules/**', 'src/_/**'],
  },
});
