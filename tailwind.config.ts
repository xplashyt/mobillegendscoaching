import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        niebla: "#E8EEF3",
        cobalto: "#173A63",
        jade: "#16836F",
        objetivo: "#D5A021",
        alerta: "#D64C5E",
        tinta: "#111A22",
        papel: "#F8FAFB",
      },
      fontFamily: {
        display: ["var(--font-kanit)", "sans-serif"],
        body: ["var(--font-spline)", "sans-serif"],
      },
      boxShadow: {
        board: "10px 12px 0 #111A22",
      },
    },
  },
  plugins: [],
};

export default config;
