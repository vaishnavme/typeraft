/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        text: "var(--text)",
        border: "var(--border)",
        secondary: "var(--secondary)",
        background: "var(--background)",
        "text-secondary": "var(--text-secondary)",
        "background-secondary": "var(--background-secondary)",
      },
      fontSize: {
        xxs: "10px",
      },
    },
  },
  plugins: [],
};
