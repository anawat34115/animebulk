import { m as makeHandler, k as keystaticConfig } from '../../../chunks/keystatic.config_D4FjtP5-.mjs';
export { renderers } from '../../../renderers.mjs';

const all = makeHandler({ config: keystaticConfig });
const ALL = all;

const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ALL,
	all,
	prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
