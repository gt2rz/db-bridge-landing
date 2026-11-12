// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Publicada en GitHub Pages como sitio de proyecto: https://gt2rz.github.io/db-bridge-landing/
export default defineConfig({
  site: "https://gt2rz.github.io",
  base: "/db-bridge-landing",
  vite: {
    plugins: [tailwindcss()],
  },
});
