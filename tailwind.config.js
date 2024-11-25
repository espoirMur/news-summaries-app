/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: ["selector", '[data-mode="dark"]'],
    daisyui: {
        themes: ["light", "dark"],
    },
    theme: {
        extend: {
            fontFamily: {
                montserrat: ["Montserrat", "sans-serif"],
            },
        },
    },
    plugins: [require("daisyui")],
};
