/* empty css                                                   */
import { d as createComponent, g as renderHead, r as renderTemplate } from '../../chunks/astro/server_2jgbmYDu.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$ = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head><title>AnimeBulk CMS</title>${renderHead()}</head> <body>  </body> </html>`;
}, "G:/animebulk/src/pages/keystatic/[...params].astro", void 0);

const $$file = "G:/animebulk/src/pages/keystatic/[...params].astro";
const $$url = "/keystatic/[...params]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
