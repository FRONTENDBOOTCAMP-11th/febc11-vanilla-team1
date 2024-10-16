/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#9e3500',
        secondary: '#007d48',
        'gray-100': '#f5f5f5',
        'gray-200': '#e5e5e5',
        'gray-300': '#cacacb',
        'gray-400': '#9e9ea0',
        'gray-500': '#707072',
        black: '#111111',
        white: '#ffffff',
        dim: 'rgba(17, 17, 17, 0.35)',
      },
    },
  },
  plugins: [],
};
