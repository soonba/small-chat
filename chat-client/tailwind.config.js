import plugin from 'tailwindcss/plugin';
import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: 'selector',
  content: ['./src/**/*.{js,jsx,ts,tsx}', '.storybook/*.{js,jsx,ts,tsx}'],
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
        pink: {
          50: '#fff1f3',
          100: '#ffe3e8',
          200: '#ffb7c5', // main
          300: '#ffa2b5',
          400: '#fe6e8d',
          500: '#f83b6a',
          600: '#e51955',
          700: '#c20e47',
          800: '#a20f43',
          900: '#8a113f',
          950: '#4d041d',
        },
        'light-blue': {
          50: '#ebffff',
          100: '#cdfbff',
          200: '#a2f6ff',
          300: '#62ecfe',
          400: '#0ad1f0', // main
          500: '#00badc',
          600: '#0295b8',
          700: '#097795',
          800: '#116079',
          900: '#134f66',
          950: '#063446',
        },
        orange: {
          50: '#fff5ed',
          100: '#ffe9d5',
          200: '#fdceab',
          300: '#fcac75',
          400: '#f97f3e',
          500: '#f75f1c', // main
          600: '#e8420e',
          700: '#c0300e',
          800: '#992713',
          900: '#7b2213',
          950: '#420e08',
        },
        blue: {
          50: '#f0f8ff',
          100: '#e0f0fe',
          200: '#bae2fd',
          300: '#7dcbfc',
          400: '#38b0f8',
          500: '#0e96e9',
          600: '#0277c7', // main
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
        'cherry-blossom': "url('/img_cherry_blossom.png')",
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
        'fade-in-out': 'fadeIn 0.5s, fadeOut 0.5s 4.5s forwards',
      },
    },
  },
  variants: {
    extend: {
      spring: ['spring'],
      summer: ['summer'],
      fall: ['fall'],
      winter: ['winter'],
    },
  },
  plugins: [
    scrollbarHide,
    plugin(function plugin({ addUtilities, addVariant }) {
      addVariant('spring', ({ modifySelectors }) => {
        modifySelectors(() => `&:where([data-theme="spring"] *)`);
      });
      addVariant('summer', ({ modifySelectors }) => {
        modifySelectors(() => `&:where([data-theme="summer"] *)`);
      });
      addVariant('fall', ({ modifySelectors }) => {
        modifySelectors(() => `&:where([data-theme="fall"] *)`);
      });
      addVariant('winter', ({ modifySelectors }) => {
        modifySelectors(() => `&:where([data-theme="winter"] *)`);
      });
      addUtilities({
        '.text-shadow': {
          'text-shadow': '0px 1px 2px #000000',
        },
        '.text-shadow-unset': {
          'text-shadow': 'unset',
        },
        '.bg-pink-gradient': {
          background: 'linear-gradient(#ffb7c5, #ffffff)',
        },
        '.bg-dark-pink-gradient': {
          background: 'linear-gradient(#000000 20%, #ffb7c5)',
        },
        '.bg-blue-gradient': {
          background: 'linear-gradient(#0c436e, #e5e7eb)',
        },
        '.bg-dark-blue-gradient': {
          background: 'linear-gradient(#000000 20%, #0c436e)',
        },
      });
    }),
  ],
};
