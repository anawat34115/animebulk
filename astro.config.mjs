import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://animebulk.com',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    tailwind(),
    react(),
    keystatic(),
  ],
});
