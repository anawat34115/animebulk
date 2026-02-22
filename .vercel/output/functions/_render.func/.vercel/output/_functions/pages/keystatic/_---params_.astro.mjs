/* empty css                                                   */
import { d as createComponent, f as renderComponent, r as renderTemplate } from '../../chunks/astro/server_2jgbmYDu.mjs';
import 'kleur/colors';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$KeystaticAstroPage = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Keystatic", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "G:/animebulk/node_modules/@keystatic/astro/internal/keystatic-page.js", "client:component-export": "Keystatic" })}`;
}, "G:/animebulk/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", void 0);

const $$file = "G:/animebulk/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro";
const $$url = undefined;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$KeystaticAstroPage,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
