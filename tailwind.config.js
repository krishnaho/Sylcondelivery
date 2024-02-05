/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                // Simple 16 column grid
                '1': 'repeat(1, 1fr)',
                '2': 'repeat(2, 1fr)',
                '3': 'repeat(3, 1fr)',
                '4': 'repeat(4, 1fr)',
                '5': 'repeat(5, 1fr)',
                '6': 'repeat(6, 1fr)',
                '7': 'repeat(7, 1fr)',
                '8': 'repeat(8, 1fr)',
                '9': 'repeat(9, 1fr)',
                '10': 'repeat(10, 1fr)',
                '11': 'repeat(11, 1fr)',
                '12': 'repeat(12, 1fr)',
                '13': 'repeat(13, 1fr)',
                '14': 'repeat(14, 1fr)',
                '15': 'repeat(15, 1fr)',
                '16': 'repeat(16, 1fr)',
                '17': 'repeat(17, 1fr)',
                '18': 'repeat(18, 1fr)',
                '19': 'repeat(19, 1fr)',
                '20': 'repeat(20, 1fr)',
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
        plugins: [],
    }
} 