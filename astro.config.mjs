import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://animebulk.com',
  output: 'hybrid',
  adapter: node({ mode: 'middleware' }),
  integrations: [
    tailwind(),
    react(),
    keystatic(),
  ],
});
