// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        "./index.html", "./src/*/.{js,jsx,ts,tsx}",
        'node_modules/flowbite-react/*/.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    // ...
}
