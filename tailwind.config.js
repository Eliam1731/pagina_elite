// tailwind.config.js
import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        dividerWeight: "1px",
        disabledOpacity: 0.45,
        fontSize: { tiny: "0.75rem", small: "0.875rem", medium: "0.9375rem", large: "1.125rem" },
        lineHeight: { tiny: "1rem", small: "1.25rem", medium: "1.5rem", large: "1.75rem" },
        radius: { small: "6px", medium: "8px", large: "12px" },
        borderWidth: { small: "1px", medium: "1px", large: "2px" },
      },
      themes: {
        light: {
          colors: {
            /* Base */
            background: { DEFAULT: "#0B0B0F" }, // negro profundo
            foreground: {
              DEFAULT: "#FFFFFF", // texto principal
              500: "#9CA3AF",     // gris texto secundario
              600: "#8B949E",
            },
            divider: { DEFAULT: "rgba(255,255,255,0.08)" },

            /* Bloques por sección */
            content1: { DEFAULT: "#111216", foreground: "#FFFFFF" },
            content2: { DEFAULT: "#141826", foreground: "#FFFFFF" },
            content3: { DEFAULT: "#1A2032", foreground: "#FFFFFF" },
            content4: { DEFAULT: "#20283D", foreground: "#FFFFFF" },

            overlay: { DEFAULT: "#000000" },

            default: { DEFAULT: "#2A3248", foreground: "#FFFFFF" },

            /* Acento AZUL ELÉCTRICO */
            primary: {
              50:  "#EEF2FF",
              100: "#E0E7FF",
              200: "#C7D2FE",
              300: "#A5B4FC",
              400: "#818CF8",
              500: "#6366F1",
              600: "#2563EB", // principal
              700: "#1D4ED8", // hover/focus
              800: "#1E40AF",
              900: "#1E3A8A",
              DEFAULT: "#2563EB",
              foreground: "#FFFFFF",
            },

            success: { DEFAULT: "#17C964", foreground: "#000000" },
            warning: { DEFAULT: "#F5A524", foreground: "#000000" },
            danger:  { DEFAULT: "#F31260", foreground: "#FFFFFF" },
          },
        },
      },
    }),
  ],
};
