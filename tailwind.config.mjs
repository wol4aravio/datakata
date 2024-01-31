/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./common/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        "foxdriven-accent": "#dc3900",
        "cyberpony-accent": "#cc00df",
        "bigdatawhale-accent": "#0075e3",
      },
      fontFamily: {
        "roboto-mono": ["Roboto Mono"],
      },
    },
  },
  plugins: [],
};
