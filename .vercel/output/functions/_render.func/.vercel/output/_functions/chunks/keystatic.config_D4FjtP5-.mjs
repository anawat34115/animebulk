import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { parseString } from 'set-cookie-parser';
import { config, collection, fields } from '@keystatic/core';

function makeHandler(_config) {
  return async function keystaticAPIRoute(context) {
    var _context$locals, _ref, _config$clientId, _ref2, _config$clientSecret, _ref3, _config$secret;
    const envVarsForCf = (_context$locals = context.locals) === null || _context$locals === void 0 || (_context$locals = _context$locals.runtime) === null || _context$locals === void 0 ? void 0 : _context$locals.env;
    const handler = makeGenericAPIRouteHandler({
      ..._config,
      clientId: (_ref = (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_ID) !== null && _ref !== void 0 ? _ref : tryOrUndefined(() => {
        return undefined                                          ;
      }),
      clientSecret: (_ref2 = (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_SECRET) !== null && _ref2 !== void 0 ? _ref2 : tryOrUndefined(() => {
        return undefined                                              ;
      }),
      secret: (_ref3 = (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_SECRET) !== null && _ref3 !== void 0 ? _ref3 : tryOrUndefined(() => {
        return undefined                                ;
      })
    }, {
      slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG"
    });
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    let headersInADifferentStructure = /* @__PURE__ */ new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ("getSetCookie" in headers && typeof headers.getSetCookie === "function") {
          const setCookieHeaders2 = headers.getSetCookie();
          if (setCookieHeaders2 !== null && setCookieHeaders2 !== void 0 && setCookieHeaders2.length) {
            headersInADifferentStructure.set("set-cookie", setCookieHeaders2);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get("set-cookie");
    headersInADifferentStructure.delete("set-cookie");
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === "lax" || sameSite === "strict" || sameSite === "none" ? sameSite : void 0
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map((x) => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return void 0;
  }
}

const keystaticConfig = config({
  storage: {
    kind: "local"
  },
  ui: {
    brand: {
      name: "AnimeBulk CMS"
    }
  },
  collections: {
    blog: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/blog/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Title" },
          slug: { label: "Slug", description: "URL-friendly identifier (auto-generated)" }
        }),
        description: fields.text({
          label: "Description",
          description: "Short summary shown in cards and meta tags",
          multiline: true,
          validation: { isRequired: true }
        }),
        pubDate: fields.date({
          label: "Publish Date",
          validation: { isRequired: true }
        }),
        updatedDate: fields.date({
          label: "Updated Date"
        }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Anime", value: "anime" },
            { label: "Training", value: "training" },
            { label: "Nutrition", value: "nutrition" },
            { label: "Mindset", value: "mindset" }
          ],
          defaultValue: "training"
        }),
        tags: fields.array(
          fields.text({ label: "Tag" }),
          {
            label: "Tags",
            itemLabel: (props) => props.fields.value.value || "Tag"
          }
        ),
        featured: fields.checkbox({
          label: "Featured",
          description: "Show on homepage featured section",
          defaultValue: false
        }),
        heroImage: fields.text({
          label: "Hero Image URL",
          description: "Optional image URL for the post header"
        }),
        content: fields.markdoc({
          label: "Content",
          extension: "md"
        })
      }
    }),
    workouts: collection({
      label: "Workout Routines",
      slugField: "title",
      path: "src/content/workouts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Title" },
          slug: { label: "Slug", description: "URL-friendly identifier (auto-generated)" }
        }),
        character: fields.text({
          label: "Character Name",
          validation: { isRequired: true }
        }),
        anime: fields.text({
          label: "Anime / Series",
          validation: { isRequired: true }
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { isRequired: true }
        }),
        difficulty: fields.select({
          label: "Difficulty",
          options: [
            { label: "Beginner", value: "beginner" },
            { label: "Intermediate", value: "intermediate" },
            { label: "Advanced", value: "advanced" }
          ],
          defaultValue: "intermediate"
        }),
        duration: fields.text({
          label: "Duration",
          description: 'e.g. "12 weeks · 4 days/week"',
          validation: { isRequired: true }
        }),
        goal: fields.text({
          label: "Goal",
          description: 'e.g. "Muscle & Strength"',
          validation: { isRequired: true }
        }),
        pubDate: fields.date({
          label: "Publish Date",
          validation: { isRequired: true }
        }),
        tags: fields.array(
          fields.text({ label: "Tag" }),
          {
            label: "Tags",
            itemLabel: (props) => props.fields.value.value || "Tag"
          }
        ),
        featured: fields.checkbox({
          label: "Featured",
          description: "Show on homepage featured section",
          defaultValue: false
        }),
        heroImage: fields.text({
          label: "Hero Image URL",
          description: "Optional image URL for the workout header"
        }),
        content: fields.markdoc({
          label: "Content",
          extension: "md"
        })
      }
    })
  }
});

export { keystaticConfig as k, makeHandler as m };
