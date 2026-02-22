import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Ca66btum.mjs';
import 'es-module-lexer';
import { i as decodeKey } from './chunks/astro/server_2jgbmYDu.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///G:/animebulk/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"programs/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/programs","isIndex":false,"type":"page","pattern":"^\\/programs\\/?$","segments":[[{"content":"programs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/programs.astro","pathname":"/programs","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"workouts/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/workouts","isIndex":true,"type":"page","pattern":"^\\/workouts\\/?$","segments":[[{"content":"workouts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/workouts/index.astro","pathname":"/workouts","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/api/keystatic/[...params]","pattern":"^\\/api\\/keystatic(?:\\/(.*?))?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-api.js","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/keystatic-astro-page.BAytG8HX.css"}],"routeData":{"type":"page","isIndex":false,"route":"/keystatic/[...params]","pattern":"^\\/keystatic(?:\\/(.*?))?\\/?$","segments":[[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-astro-page.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/keystatic/[...params]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/keystatic(?:\\/(.*?))?\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"src/pages/api/keystatic/[...params].ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"window.location.href=\"/keystatic\";\n"}],"styles":[{"type":"external","src":"/_astro/keystatic-astro-page.BAytG8HX.css"}],"routeData":{"route":"/keystatic/[...params]","isIndex":false,"type":"page","pattern":"^\\/keystatic(?:\\/(.*?))?\\/?$","segments":[[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"src/pages/keystatic/[...params].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://animebulk.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["G:/animebulk/src/pages/keystatic/[...params].astro",{"propagation":"none","containsHead":true}],["G:/animebulk/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["G:/animebulk/src/pages/workouts/[character].astro",{"propagation":"in-tree","containsHead":true}],["G:/animebulk/src/pages/404.astro",{"propagation":"none","containsHead":true}],["G:/animebulk/src/pages/about.astro",{"propagation":"none","containsHead":true}],["G:/animebulk/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["G:/animebulk/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["G:/animebulk/src/pages/programs.astro",{"propagation":"none","containsHead":true}],["G:/animebulk/src/pages/workouts/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["G:/animebulk/src/layouts/BlogPost.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["G:/animebulk/src/layouts/WorkoutLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/workouts/[character]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/workouts/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-api@_@js":"pages/api/keystatic/_---params_.astro.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-astro-page@_@astro":"pages/keystatic/_---params_.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/keystatic/[...params]@_@ts":"pages/api/keystatic/_---params_.astro2.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/keystatic/[...params]@_@astro":"pages/keystatic/_---params_.astro2.mjs","\u0000@astro-page:src/pages/programs@_@astro":"pages/programs.astro.mjs","\u0000@astro-page:src/pages/workouts/index@_@astro":"pages/workouts.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/workouts/[character]@_@astro":"pages/workouts/_character_.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","G:/animebulk/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","G:/animebulk/src/content/blog/anime-calisthenics-guide.md?astroContentCollectionEntry=true":"chunks/anime-calisthenics-guide_BOadiCg-.mjs","G:/animebulk/src/content/blog/anime-nutrition-guide.md?astroContentCollectionEntry=true":"chunks/anime-nutrition-guide_BEM9HSLh.mjs","G:/animebulk/src/content/blog/how-to-build-muscle-like-goku.md?astroContentCollectionEntry=true":"chunks/how-to-build-muscle-like-goku_9w3ZrqaM.mjs","G:/animebulk/src/content/blog/itadori-workout-jujutsu-kaisen.md?astroContentCollectionEntry=true":"chunks/itadori-workout-jujutsu-kaisen_CoKHSyoV.mjs","G:/animebulk/src/content/blog/levi-ackerman-workout.md?astroContentCollectionEntry=true":"chunks/levi-ackerman-workout_o4AnmNli.mjs","G:/animebulk/src/content/blog/zoro-workout-one-piece.md?astroContentCollectionEntry=true":"chunks/zoro-workout-one-piece_DCk9ogDS.mjs","G:/animebulk/src/content/workouts/goku.md?astroContentCollectionEntry=true":"chunks/goku_BdT1fPu2.mjs","G:/animebulk/src/content/workouts/itadori.md?astroContentCollectionEntry=true":"chunks/itadori_De0-CvYW.mjs","G:/animebulk/src/content/workouts/levi.md?astroContentCollectionEntry=true":"chunks/levi_Dki6Od2i.mjs","G:/animebulk/src/content/workouts/naruto.md?astroContentCollectionEntry=true":"chunks/naruto_CjIGlBl-.mjs","G:/animebulk/src/content/workouts/tanjiro.md?astroContentCollectionEntry=true":"chunks/tanjiro_DJV7YeNT.mjs","G:/animebulk/src/content/workouts/zoro.md?astroContentCollectionEntry=true":"chunks/zoro_uDSc_0qU.mjs","G:/animebulk/src/content/blog/anime-calisthenics-guide.md?astroPropagatedAssets":"chunks/anime-calisthenics-guide_BRqdRj5U.mjs","G:/animebulk/src/content/blog/anime-nutrition-guide.md?astroPropagatedAssets":"chunks/anime-nutrition-guide_DVUz1liV.mjs","G:/animebulk/src/content/blog/how-to-build-muscle-like-goku.md?astroPropagatedAssets":"chunks/how-to-build-muscle-like-goku_DE8a9meH.mjs","G:/animebulk/src/content/blog/itadori-workout-jujutsu-kaisen.md?astroPropagatedAssets":"chunks/itadori-workout-jujutsu-kaisen_DEzgq9x5.mjs","G:/animebulk/src/content/blog/levi-ackerman-workout.md?astroPropagatedAssets":"chunks/levi-ackerman-workout_CywHLKSq.mjs","G:/animebulk/src/content/blog/zoro-workout-one-piece.md?astroPropagatedAssets":"chunks/zoro-workout-one-piece_yUn_-8hi.mjs","G:/animebulk/src/content/workouts/goku.md?astroPropagatedAssets":"chunks/goku_BNcmyV5c.mjs","G:/animebulk/src/content/workouts/itadori.md?astroPropagatedAssets":"chunks/itadori_BuqGoaIE.mjs","G:/animebulk/src/content/workouts/levi.md?astroPropagatedAssets":"chunks/levi_M6m3VSAn.mjs","G:/animebulk/src/content/workouts/naruto.md?astroPropagatedAssets":"chunks/naruto_CzpEfHxd.mjs","G:/animebulk/src/content/workouts/tanjiro.md?astroPropagatedAssets":"chunks/tanjiro_Cb4PV8x-.mjs","G:/animebulk/src/content/workouts/zoro.md?astroPropagatedAssets":"chunks/zoro_Co6FEXKF.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_D9aVaOQr.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BcEe_9wP.mjs","G:/animebulk/src/content/blog/anime-calisthenics-guide.md":"chunks/anime-calisthenics-guide_DePtOhd5.mjs","G:/animebulk/src/content/blog/anime-nutrition-guide.md":"chunks/anime-nutrition-guide_BGMo_cxz.mjs","G:/animebulk/src/content/blog/how-to-build-muscle-like-goku.md":"chunks/how-to-build-muscle-like-goku_DlnXWuIX.mjs","G:/animebulk/src/content/blog/itadori-workout-jujutsu-kaisen.md":"chunks/itadori-workout-jujutsu-kaisen_Cu8LHY4w.mjs","G:/animebulk/src/content/blog/levi-ackerman-workout.md":"chunks/levi-ackerman-workout_DbaE_ehw.mjs","G:/animebulk/src/content/blog/zoro-workout-one-piece.md":"chunks/zoro-workout-one-piece_DsM8DRvg.mjs","G:/animebulk/src/content/workouts/goku.md":"chunks/goku_BXcfdL92.mjs","G:/animebulk/src/content/workouts/itadori.md":"chunks/itadori_BiBd6XVM.mjs","G:/animebulk/src/content/workouts/levi.md":"chunks/levi_C4RF9rzn.mjs","G:/animebulk/src/content/workouts/naruto.md":"chunks/naruto_CAs8xys9.mjs","G:/animebulk/src/content/workouts/tanjiro.md":"chunks/tanjiro_56mRLyjg.mjs","G:/animebulk/src/content/workouts/zoro.md":"chunks/zoro_BmHyicuW.mjs","\u0000@astrojs-manifest":"manifest_Dp4eO-YN.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.DvLrlSy9.js","/astro/hoisted.js?q=1":"_astro/hoisted.bCiR5EAm.js","/astro/hoisted.js?q=2":"_astro/hoisted.CMFGM2J7.js","/astro/hoisted.js?q=3":"_astro/hoisted.DJgnn7NP.js","@astrojs/react/client.js":"_astro/client.BAzRDEi0.js","G:/animebulk/node_modules/@keystatic/astro/internal/keystatic-page.js":"_astro/keystatic-page.DofjQBz1.js","/astro/hoisted.js?q=4":"_astro/hoisted.BkoFJ0Lt.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/keystatic-astro-page.BAytG8HX.css","/_astro/_slug_.D_g2bPIW.css","/favicon.svg","/robots.txt","/sitemap.xml","/images/og-default.svg","/_astro/client.BAzRDEi0.js","/_astro/hoisted.BkoFJ0Lt.js","/_astro/hoisted.CMFGM2J7.js","/_astro/hoisted.DJgnn7NP.js","/_astro/hoisted.DvLrlSy9.js","/_astro/index.CEVlYrT_.js","/_astro/keystatic-page.DofjQBz1.js","/404.html","/about/index.html","/blog/index.html","/programs/index.html","/workouts/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"gOlDQEE5i+zMHxQogBxeR8m9u2i1yJ4ul2HN5ficTcQ=","experimentalEnvGetSecretEnabled":false});

export { manifest };
