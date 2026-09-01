// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

// Static pages by default; /api/telegram opts out of prerender.
export default defineConfig({
  adapter: node({ mode: "standalone" }),
  vite: {
    plugins: [tailwindcss()],
  },
});
