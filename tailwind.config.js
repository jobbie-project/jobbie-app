/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
const colors = require('tailwindcss/colors');
module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
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
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      ...colors,
      red: '#b20000',
      lightblack: '#3A3A3A',
      lightblack2: '#838383',
      white: '#FFF',
      green: '#005C6E',
      lightgreen2: '#2BB8C9',
      lightgreen: '#229337',
      lightgray1: '#F8f8f8',
      gray2: '#F1F1F1',
      gray3: '#BDBDBD',
      gray4: '#A9B4CD',
      blue: '#2BB8C9',
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
});
