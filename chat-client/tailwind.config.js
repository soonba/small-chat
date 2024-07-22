/* eslint-disable global-require */
// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'selector',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                background: {
                    dark: '#0e0e11',
                    light: '#ffffff'
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
                    950: '#082b49'
                }
            }
        }
    },
    plugins: [
        require('tailwind-scrollbar-hide'),
        // eslint-disable-next-line func-names
        plugin(function ({ addUtilities }) {
            addUtilities({
                '.custom-scroll::-webkit-scrollbar': {
                    width: 6
                },
                '.custom-scroll::-webkit-scrollbar-track': {
                    background: '#f5f6fa'
                },
                '.custom-scroll::-webkit-scrollbar-thumb': {
                    borderRadius: 20,
                    background: '#d1d6e6'
                },
                '.custom-scroll::-webkit-scrollbar-thumb:hover': {
                    background: '#d1d6e6'
                }
            });
        })
    ]
};
