import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // ICI : On pointe directement vers la racine
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bnp: {
          green: '#00915E', // Le vert BNP
          dark: '#2D2D2D',
          light: '#F4F4F4',
          gray: '#E6E6E6',
        }
      },
    },
  },
  plugins: [],
};
export default config;