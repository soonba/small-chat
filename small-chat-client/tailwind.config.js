// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'blue-gray': {
                    50: '#eceff1',
                    100: '#cfd8dc',
                    200: '#b0bec5',
                    300: '#90a4ae',
                    400: '#78909c',
                    500: '#607d8b',
                    600: '#546e7a',
                    700: '#455a64',
                    800: '#37474f',
                    900: '#263238'
                }
            }
        }
    },
    plugins: [
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
