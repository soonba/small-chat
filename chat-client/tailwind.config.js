import plugin from 'tailwindcss/plugin';
import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: 'selector',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        sm: '425px',
      },
      fontFamily: {
        pretendard: ['Pretendard Variable', 'sans-serif'],
        jua: ['Jua', 'sans-serif'],
      },
      fontSize: {
        /** Title */
        '36-R-40': ['2.25rem', { lineHeight: '2.5rem', fontWeight: 400, letterSpacing: 'normal' }],
        '28-R-36': ['1.75rem', { lineHeight: '2.25rem', fontWeight: 400, letterSpacing: 'normal' }],
        '24-R-32': ['1.5rem', { lineHeight: '2rem', fontWeight: 400, letterSpacing: 'normal' }],

        /** Heading */
        '36-B-40': ['2.25rem', { lineHeight: '2.5rem', fontWeight: 900, letterSpacing: 'normal' }],
        '30-B-36': ['1.875rem', { lineHeight: '2.25rem', fontWeight: 700, letterSpacing: 'normal' }],
        '30-M-36': ['1.875rem', { lineHeight: '2.25rem', fontWeight: 500, letterSpacing: 'normal' }],
        '16-SB-24': ['1rem', { lineHeight: '1.5rem', fontWeight: 600, letterSpacing: 'normal' }],

        /** Body */
        '24-BL-32': ['1.5rem', { lineHeight: '2rem', fontWeight: 900, letterSpacing: 'normal' }],
        '20-B-28': ['1.25rem', { lineHeight: '1.75rem', fontWeight: 700, letterSpacing: 'normal' }],
        '18-B-28': ['1.125rem', { lineHeight: '1.75rem', fontWeight: 700, letterSpacing: 'normal' }],
        '18-M-28': ['1.125rem', { lineHeight: '1.75rem', fontWeight: 500, letterSpacing: 'normal' }],
        '18-R-28': ['1.125rem', { lineHeight: '1.75rem', fontWeight: 400, letterSpacing: 'normal' }],
        '16-B-24': ['1rem', { lineHeight: '1.5rem', fontWeight: 700, letterSpacing: 'normal' }],
        '16-M-24': ['1rem', { lineHeight: '1.5rem', fontWeight: 500, letterSpacing: 'normal' }],
        '16-R-24': ['1rem', { lineHeight: '1.5rem', fontWeight: 400, letterSpacing: 'normal' }],
        '14-B-20': ['0.875rem', { lineHeight: '1.25rem', fontWeight: 700, letterSpacing: 'normal' }],
        '14-SB-20': ['0.875rem', { lineHeight: '1.25rem', fontWeight: 600, letterSpacing: 'normal' }],
        '14-M-20': ['0.875rem', { lineHeight: '1.25rem', fontWeight: 500, letterSpacing: 'normal' }],
        '14-R-20': ['0.875rem', { lineHeight: '1.25rem', fontWeight: 400, letterSpacing: 'normal' }],

        /** Caption */
        '12-B-16': ['0.75rem', { lineHeight: '1rem', fontWeight: 700, letterSpacing: 'normal' }],
        '12-SB-16': ['0.75rem', { lineHeight: '1rem', fontWeight: 600, letterSpacing: 'normal' }],
        '12-M-16': ['0.75rem', { lineHeight: '1rem', fontWeight: 500, letterSpacing: 'normal' }],
        '12-R-16': ['0.75rem', { lineHeight: '1rem', fontWeight: 400, letterSpacing: 'normal' }],
        '12-L-16': ['0.75rem', { lineHeight: '1rem', fontWeight: 300, letterSpacing: 'normal' }],
        '10-L-12': ['0.625rem', { lineHeight: '0.75rem', fontWeight: 300, letterSpacing: 'normal' }],
      },
      fontWeight: {
        inherit: 'inherit',
      },
      minHeight: {
        inherit: 'inherit',
      },
      minWidth: {
        laptop: '1280px',
      },
      colors: {
        background: {
          dark: '#0e0e11',
          light: '#ffffff',
        },
        layout: {
          dark: '#02101c',
          light: '#f7fbff',
        },
        primary: {
          50: '#f0f8ff',
          100: '#e0f0fe',
          200: '#bae2fd',
          300: '#7dcbfc',
          400: '#38b0f8',
          500: '#0e96e9',
          600: '#0277c7',
          700: '#035ea1',
          800: '#075185',
          900: '#0c436e',
          950: '#082b49',
        },
      },
      zIndex: {
        1000: 1000,
        10000: 10000,
      },
      backgroundImage: {
        snowflake: "url('/img_snowflake.png')",
      },
      keyframes: {
        fadeIn: {
          '0%': {
            bottom: 0,
            opacity: 0,
          },
          '100%': {
            bottom: 30,
            opacity: 1,
          },
        },
        fadeOut: {
          '0%': {
            bottom: 30,
            opacity: 1,
          },
          '100%': {
            bottom: 0,
            opacity: 0,
          },
        },
      },
      animation: {
        fadeInOut: 'fadeIn 0.5s, fadeOut 0.5s 4.5s forwards',
      },
    },
  },
  plugins: [
    scrollbarHide,
    plugin(function plugin({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          'text-shadow': '0px 0px 2px #0c436e',
        },
        '.text-shadow-light': {
          'text-shadow': '0px 0px 2px #e0f0fe',
        },
        '.text-shadow-unset': {
          'text-shadow': 'unset',
        },
        '.bg-linear-gradient': {
          background: 'linear-gradient(#0c436e, #e5e7eb)',
        },
        '.bg-linear-gradient-dark': {
          background: 'linear-gradient(#000000, #0c436e)',
        },
        '.bg-grid': {
          'background-position': 'center',
          'background-size': '20px 20px',
          'background-image':
            'linear-gradient(to right, #e0f0fe 1px, transparent 1px), linear-gradient(to bottom, #e0f0fe 1px, transparent 1px)',
        },
        '.bg-grid-light': {
          'background-position': 'center',
          'background-size': '20px 20px',
          'background-image':
            'linear-gradient(to right, #0c436e 1px, transparent 1px), linear-gradient(to bottom, #0c436e 1px, transparent 1px)',
        },
      });
    }),
  ],
};
