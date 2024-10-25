import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        header: 'src/components/header/header.html',
        footer: 'src/components/footer/footer.html',
        index: 'index.html', // 기본 index.html
        sign: 'src/pages/auth/signup.html',
        login: 'src/pages/auth/login.html', // 추가 HTML 파일
        pw: 'src/pages/auth/pw.html',
        check: 'src/pages/auth/check.html',
        list: 'src/pages/product/list/index.html', // 추가 HTML 파일
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
