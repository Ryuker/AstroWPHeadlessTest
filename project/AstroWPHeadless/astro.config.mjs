// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import relativeLinks from 'astro-relative-links';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [relativeLinks()],
  image: {
    domains: ["astro.build", "astrowpheadless.local"],
  },
  output: 'static',
  site: 'https://ryuker.github.io/',
  outDir: './dist/docs/',
  build: {
    assets: 'astro',
  },
});
