/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all files where Tailwind classes may be used
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato"], // Override the default sans-serif to use Lato
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        neutral: {
          50: "#F2F2F2",
          100: "#CCCCCC",
          200: "#B3B3B3",
          300: "#808080",
          400: "#555555",
          500: "#333333",
          600: "#2E2E2E",
          700: "#242424",
          800: "#1A1A1A",
          900: "#0D0D0D",
        },
        primary: {
          50: "#f0f8ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7dc7fc",
          400: "#38abf8",
          500: "#0e90e9",
          600: "#0278d3",
          700: "#035aa1",
          800: "#074d85",
          900: "#0c416e",
        },
        success: {
          50: "#E6F9EF",
          100: "#B3ECCC",
          200: "#8EE3B3",
          300: "#5AD790",
          400: "#3ACF7B",
          500: "#09C35A",
          600: "#08B152",
          700: "#068A40",
          800: "#056B32",
          900: "#045226",
        },
        warning: {
          50: "#FEF5E7",
          100: "#FCE1B3",
          200: "#FAD28F",
          300: "#F8BE5C",
          400: "#F7B13C",
          500: "#F59E0B",
          600: "#DF900A",
          700: "#AE7008",
          800: "#875706",
          900: "#674205",
        },
        destructive: {
          50: "#FCEAEB",
          100: "#F6BEC0",
          200: "#F29EA2",
          300: "#EC7278",
          400: "#E8565D",
          500: "#E22C35",
          600: "#CE2830",
          700: "#A01F26",
          800: "#7C181D",
          900: "#5F1216",
        },
        random_blue: "#00B4FC",
        random_violet: "#585EEC",
        random_green: "#0DD651",
        random_pink: "#E40C8E",
        random_orange: "#FF6600",
        random_gray: "#d3d3d3",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        'bg-dark': '#1e1e1e',
        'text-light': '#e0d6c2',
        'border-dark': '#3a3a3a',
        'bg-gray': '#252525',
        'bg-light-gray': '#2a2a2a',
        'bg-green': '#4a6741',
        'bg-red': '#6b3a3a',
        'text-success': '#a3e635',
        'bg-error': '#6b3a3a',
        'border-error': '#8a4a4a',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
