/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2196f3",
        "primary-light": "#1976d2",
        gray: {
          900: "#333",
          800: "#757575",
          700: "#e0e0e0",
          600: "#f5f5f5",
        },
        status: {
          healthy: "#4caf50",
          unhealthy: "#f44336",
          degraded: "#ff9800",
          default: "#9e9e9e",
        },
      },
      animation: {
        pulse: "pulse 2s infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};
