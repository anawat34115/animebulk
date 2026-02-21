import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://animebulk.com',
  integrations: [
    tailwind(),
  ],
});
