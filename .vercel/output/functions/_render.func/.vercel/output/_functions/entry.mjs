import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DshAfiXu.mjs';
import { manifest } from './manifest_Dp4eO-YN.mjs';

const _page0 = () => import('./pages/api/keystatic/_---params_.astro.mjs');
const _page1 = () => import('./pages/_image.astro.mjs');
const _page2 = () => import('./pages/keystatic/_---params_.astro.mjs');
const _page3 = () => import('./pages/404.astro.mjs');
const _page4 = () => import('./pages/about.astro.mjs');
const _page5 = () => import('./pages/api/keystatic/_---params_.astro2.mjs');
const _page6 = () => import('./pages/blog/_slug_.astro.mjs');
const _page7 = () => import('./pages/blog.astro.mjs');
const _page8 = () => import('./pages/keystatic/_---params_.astro2.mjs');
const _page9 = () => import('./pages/programs.astro.mjs');
const _page10 = () => import('./pages/workouts/_character_.astro.mjs');
const _page11 = () => import('./pages/workouts.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/@keystatic/astro/internal/keystatic-api.js", _page0],
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page1],
    ["node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", _page2],
    ["src/pages/404.astro", _page3],
    ["src/pages/about.astro", _page4],
    ["src/pages/api/keystatic/[...params].ts", _page5],
    ["src/pages/blog/[slug].astro", _page6],
    ["src/pages/blog/index.astro", _page7],
    ["src/pages/keystatic/[...params].astro", _page8],
    ["src/pages/programs.astro", _page9],
    ["src/pages/workouts/[character].astro", _page10],
    ["src/pages/workouts/index.astro", _page11],
    ["src/pages/index.astro", _page12]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "7f462637-1b70-4df4-ab46-f8613e31cf7d",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
