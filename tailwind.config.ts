import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#101519',
        'brand-gray': {
          DEFAULT: '#57788e',
          light: '#e9eef1',
          border: '#d3dde4',
        },
        'brand-green': '#078838',
        'brand-red': '#e73508',
      },
      fontFamily: {
        sans: ['"Noto Sans"', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
