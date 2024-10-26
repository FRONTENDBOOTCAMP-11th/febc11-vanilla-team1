import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: 'index.html', // 기본 index.html
        sign: 'src/pages/auth/signup.html',
        login: 'src/pages/auth/login.html',
        check: 'src/pages/auth/check.html',
        list: 'src/pages/product/list/index.html',
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
