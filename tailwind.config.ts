import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./pages/**/*.{html,js,jsx,ts,tsx,mdx}",
    "./components/**/*.{html,js,jsx,ts,tsx,mdx}",
    "./app/**/*.{html,js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;