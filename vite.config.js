import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        header: 'src/components/header/header.html',
        footer: 'src/components/footer/footer.html',
        index: 'index.html', // 기본 index.html
        sign: 'src/pages/auth/signup.html',
        login: 'src/pages/auth/login.html',
        check: 'src/pages/auth/check.html',
        list: 'src/pages/product/list/index.html',
        detail: 'src/pages/product/detail/index.html',
        cart: 'src/pages/product/cart/index.html',
        stores: 'src/pages/stores/index.html',
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
