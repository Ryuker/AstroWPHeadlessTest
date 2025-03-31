// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import wordpressImageOptimizer from '@integrations/wordpressImageOptimizer';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: ["astro.build", "astrowpheadless.local"],
  },
  integrations: [wordpressImageOptimizer()],
});
