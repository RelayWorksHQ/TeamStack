/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b1220",
        muted: "#5b677c",
        line: "#e5eaf1",
        brand: "#1677ff"
      },
      boxShadow: {
        soft: "0 18px 55px rgba(15, 23, 42, 0.08)",
        card: "0 4px 22px rgba(15, 23, 42, 0.045)"
      }
    }
  },
  plugins: []
};
