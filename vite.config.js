import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        header: 'src/components/header/header.html',
        footer: 'src/components/footer/footer.html',
        index: 'index.html', // 기본 index.html
        login: 'src/pages/auth/login.html', // 추가 HTML 파일
        list: 'src/pages/product/list/index.html', // 추가 HTML 파일
        // 필요한 다른 HTML 파일을 여기에 추가
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
