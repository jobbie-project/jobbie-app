/** @type {import('tailwindcss').Config} */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const withMT = require('@material-tailwind/react/utils/withMT');

const colors = require('tailwindcss/colors');
module.exports = withMT({
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './index.html',
  ],
  theme: {
    fontFamily: {
      serif: [
        'ui-sans-serif',
        'system-ui',
        'apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'accordion-down': {
          from: {height: 0},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: 0},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
    colors: {
      ...colors,
      primaryGray: '#6B6B6B',
      redDefault: '#b20000',
      lightblack: '#3A3A3A',
      lightblack2: '#7C7979',
      white: '#FFF',
      green: '#005C6E',
      lightgreen2: '#2BB8C9',
      lightgreen: '#229337',
      lightgray1: '#F2F2F2',
      gray2: '#F1F1F1',
      gray3: '#BDBDBD',
      gray4: '#A9B4CD',
      blue: '#2BB8C9',
    },
    plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],
  },
});
