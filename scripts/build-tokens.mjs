// Generates app/globals.css and registry.json from design-system/tokens.json.
// Run with `npm run tokens`. Do not edit either output by hand.
//
// REGISTRY_URL is the public address of the built registry (the folder public/r),
// used for dependencies between items. Override it to test against a local server.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_URL = (process.env.REGISTRY_URL || "https://ui.designsbyluca.com/r").replace(/\/$/, "");
const tokens = JSON.parse(readFileSync(join(root, "design-system/tokens.json"), "utf8"));

/* ---------------- colours ---------------- */

const colors = tokens.color.tokens;
const byName = Object.fromEntries(colors.map((t) => [t.name, t]));
const isRef = (v) => /^\{.+\}$/.test(v);
function resolve(value, theme) {
  return isRef(value) ? resolve(byName[value.slice(1, -1)].value[theme], theme) : value;
}
// In globals.css the semantic names point to the base palette with var().
const colorLines = (theme) =>
  colors.map((t) => {
    const v = t.value[theme];
    return `  --${t.name}: ${isRef(v) ? `var(--${v.slice(1, -1)})` : v};`;
  });

/* ---------------- other tokens ---------------- */

const groups = ["spacing", "radius", "duration", "easing", "distance", "shadow"];
const shared = Object.fromEntries(groups.flatMap((g) => tokens[g].tokens.map((t) => [t.name, t.value])));
const ease = Object.fromEntries(tokens.easing.tokens.map((t) => [t.name, t.value]));
const shadows = Object.fromEntries(tokens.shadow.tokens.map((t) => [t.name, t.value]));

/* ---------------- Tailwind theme (@theme inline) ---------------- */

// `input` would clash with the colour --color-input, so the type style is text-input-text.
const typeKey = (name) => (name === "input" ? "input-text" : name);
const typeVars = Object.fromEntries(
  tokens.type.groups.flatMap((g) =>
    g.styles.flatMap((s) => {
      const k = `text-${typeKey(s.name)}`;
      return [
        [k, s.fontSize],
        [`${k}--line-height`, s.lineHeight],
        [`${k}--letter-spacing`, s.letterSpacing],
        [`${k}--font-weight`, String(s.fontWeight)],
      ];
    })
  )
);

const themeVars = {
  ...Object.fromEntries(colors.map((t) => [`color-${t.name}`, `var(--${t.name})`])),
  // The radius scale of the style: xs 2, sm 4, md 8, lg 12, xl 16, 2xl 20, pill.
  ...Object.fromEntries(
    tokens.radius.tokens.filter((r) => r.name !== "radius").map((r) => [r.name, r.value])
  ),
  // The fallback sits inside var(): a missing variable would otherwise void the whole list.
  "font-sans": 'var(--font-inter-tight, "Helvetica Neue"), "Helvetica Neue", Arial, sans-serif',
  "font-serif": 'var(--font-cormorant, "Times New Roman"), "Times New Roman", serif',
  "font-serif-text": "var(--font-newsreader, Georgia), Georgia, serif",
  "font-mono": "var(--font-jetbrains-mono, ui-monospace), ui-monospace, monospace",
  // The tone accent and the tone-dependent control shape (see the tone block below).
  "color-mark": "var(--mark)",
  "color-mark-foreground": "var(--mark-foreground)",
  "color-mark-tint": "var(--mark-tint)",
  "radius-control": "var(--control-radius)",
  "radius-surface": "var(--surface-radius)",
  "radius-kicker": "var(--kicker-radius)",
  "font-control": "var(--control-font)",
  // Literal values (not var()) so they never point at themselves.
  ...Object.fromEntries(Object.entries(ease).map(([k, v]) => [k, v])),
  ...Object.fromEntries(Object.entries(shadows).map(([k, v]) => [k, v])),
  "animate-rise": `rise var(--dur-reveal) ${ease["ease-entrance"]} both`,
  "animate-rise-base": `rise var(--dur-base) ${ease["ease-entrance"]} both`,
  "animate-fade": "fade var(--dur-base) ease-out both",
  "animate-fade-fast": `fade var(--dur-fast) ${ease["ease-standard"]} both`,
  ...typeVars,
};

/* ---------------- tones ---------------- */

const dashed = (vars) => Object.fromEntries(Object.entries(vars).map(([k, v]) => [`--${k}`, v]));

// Font references are resolved to the stacks: @theme inline does not emit --font-* variables.
const fontStack = (v) => v.replace(/var\(--font-(sans|serif|mono)\)/g, (_, f) => themeVars[`font-${f}`]);
const toneVars = (id) =>
  Object.fromEntries(tokens.tone.tokens.map((t) => [t.name, fontStack(t.value[id])]));
const toneCss = `/* Tones: calm (default) and factual. Set data-tone on <html>; never mix both on one page. */
:root,
[data-tone="calm"] {
${block(toneVars("calm"))}
}

[data-tone="factual"] {
${block(toneVars("factual"))}
}`;

const extraCss = `@keyframes rise {
  from { opacity: 0; transform: translateY(var(--rise-sm)); }
  to { opacity: 1; transform: none; }
}
@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes marquee {
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`;

function block(vars) { return Object.entries(vars).map(([k, v]) => `  --${k}: ${v};`).join("\n"); }

/* ---------------- app/globals.css ---------------- */

const css = `/*
 * designsbyluca/ui – generated from design-system/tokens.json by scripts/build-tokens.mjs.
 * Do not edit by hand: change tokens.json and run \`npm run tokens\`.
 */
@import "tailwindcss";

/* Dark theme: the .dark class (shadcn/ui) or data-theme="dark" (the export). */
@custom-variant dark (&:where(.dark, .dark *, [data-theme="dark"], [data-theme="dark"] *));

:root {
${colorLines("light").join("\n")}

${block(shared)}
}

.dark,
[data-theme="dark"] {
${colorLines("dark").join("\n")}
}

@theme inline {
${block(themeVars)}
}

${toneCss}

${extraCss}

@layer base {
  *, ::before, ::after { border-color: var(--border); }
  html { color-scheme: light; }
  html.dark, html[data-theme="dark"] { color-scheme: dark; }
  body {
    margin: 0;
    font-family: var(--font-sans);
    font-weight: 450;
    background: var(--background);
    color: var(--foreground);
    -webkit-font-smoothing: antialiased;
  }
}
`;
writeFileSync(join(root, "app/globals.css"), css);

/* ---------------- registry.json ---------------- */

const lightVars = Object.fromEntries(colors.map((t) => [t.name, resolve(t.value.light, "light")]));
const darkVars = Object.fromEntries(colors.map((t) => [t.name, resolve(t.value.dark, "dark")]));

const theme = {
  name: "theme",
  type: "registry:theme",
  title: "designsbyluca theme",
  description: "Tokens of the designsbyluca website system: stone, sand, one orange, lime for the factual tone, light and dark, two tones, type scale, motion.",
  cssVars: {
    theme: themeVars,
    light: { ...lightVars, ...shared },
    dark: darkVars,
  },
  css: {
    "@keyframes rise": {
      from: { opacity: "0", transform: "translateY(var(--rise-sm))" },
      to: { opacity: "1", transform: "none" },
    },
    "@keyframes fade": { from: { opacity: "0" }, to: { opacity: "1" } },
    "@keyframes marquee": { to: { transform: "translateX(-50%)" } },
    // Custom properties need their dashes here; in globals.css block() adds them.
    ':root, [data-tone="calm"]': dashed(toneVars("calm")),
    '[data-tone="factual"]': dashed(toneVars("factual")),
    "@layer base": { body: { "font-weight": "450" } },
  },
};

// name, title, description (from the component READMEs), npm deps, registry deps (own items)
const components = [
  ["button", "Button", "A 48px button with a verb as its label: a pill (calm) or mono capitals (factual).", ["radix-ui", "class-variance-authority"], []],
  ["icon-button", "IconButton", "A 48px button with a single line icon.", [], ["button"]],
  ["link", "Link", "A text link with a 1px line below that thickens to 2px on hover.", ["radix-ui", "class-variance-authority"], []],
  ["input", "Input", "A text field with lots of room and a single line below.", ["class-variance-authority"], []],
  ["textarea", "Textarea", "A multi-line field in a very fine frame.", [], []],
  ["select", "Select", "A single choice from a short list; the trigger looks like an Input.", ["radix-ui"], ["input"]],
  ["checkbox", "Checkbox", "A 20px box for yes/no choices.", ["radix-ui"], []],
  ["radio-group", "RadioGroup", "One choice from a few visible options: a circle with a dot.", ["radix-ui"], []],
  ["switch", "Switch", "An on/off toggle, 44 × 24px.", ["radix-ui"], []],
  ["label", "Label", "The name of a form control, with Field, OptionRow, FieldHint and FieldError.", ["radix-ui"], []],
  ["badge", "Badge", "A small label in capitals. Also exported as Tag.", ["radix-ui", "class-variance-authority"], []],
  ["avatar", "Avatar", "A picture of a person, with initials as fallback.", ["radix-ui"], []],
  ["card", "Card", "A quiet surface, a service tile on sand, or editorial with the image above.", ["class-variance-authority"], []],
  ["separator", "Separator", "A 1px hairline between groups.", ["radix-ui"], []],
  ["alert", "Alert", "A message in the page flow: a dot, a title and one or two sentences.", ["class-variance-authority"], []],
  ["toast", "Toast", "A short note in a corner that leaves by itself. Sonner-style toast() API.", [], ["button"]],
  ["tooltip", "Tooltip", "A short hint on hover or keyboard focus.", ["radix-ui"], []],
  ["dialog", "Dialog", "A modal window for a short task.", ["radix-ui"], []],
  ["photo", "Photo", "A photo, or a calm placeholder until there is one.", [], []],
  ["kicker", "Kicker", "A short label above a feature title: serif capitals with a dot, or mono on lime.", [], []],
];

// Website blocks: name, title, description, own registry deps.
const blocks = [
  ["hero", "Hero", "One statement per screen; with an image the full-screen photo hero with white pills.", ["photo"]],
  ["wordmark", "Wordmark", "The name set very large, as hero or as a close above the footer.", []],
  ["nav-bar", "NavBar", "The header: normal, over a photo, sticky, or floating.", ["button"]],
  ["feature-tiles", "FeatureTiles", "Services as tiles in one grid with hairline gaps.", []],
  ["feature-stack", "FeatureStack", "Service sections that stick and slide over each other on scroll.", ["kicker", "photo"]],
  ["stat-tiles", "StatTiles", "Real numbers in muted square tiles.", ["photo"]],
  ["testimonial-rail", "TestimonialRail", "A slow rail of quote cards and photos.", ["photo"]],
  ["case-story", "CaseStory", "A full-screen story of a project in slides.", ["photo"]],
  ["footer", "Footer", "Link columns, copyright and legal links.", []],
];

const items = [
  theme,
  ...components.map(([name, title, description, dependencies, own]) => ({
    name,
    type: "registry:ui",
    title,
    description,
    ...(dependencies.length ? { dependencies } : {}),
    registryDependencies: ["utils", `${REGISTRY_URL}/theme.json`, ...own.map((d) => `${REGISTRY_URL}/${d}.json`)],
    files: [{ path: `registry/designsbyluca/ui/${name}.tsx`, type: "registry:ui" }],
  })),
  ...blocks.map(([name, title, description, own]) => ({
    name,
    type: "registry:block",
    title,
    description,
    registryDependencies: ["utils", `${REGISTRY_URL}/theme.json`, ...own.map((d) => `${REGISTRY_URL}/${d}.json`)],
    files: [{ path: `registry/designsbyluca/blocks/${name}.tsx`, type: "registry:component" }],
  })),
  // A theme item itself: shadcn only overwrites existing variables (--primary, --radius …)
  // when the item you ask for is a theme, so `add all.json` sets everything in one go.
  {
    ...theme,
    name: "all",
    title: "Everything",
    description: "The theme, all components and all website blocks at once.",
    registryDependencies: ["utils", ...[...components, ...blocks].map(([n]) => `${REGISTRY_URL}/${n}.json`)],
  },
];

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "designsbyluca",
  homepage: REGISTRY_URL.replace(/\/r$/, ""),
  items,
};
writeFileSync(join(root, "registry.json"), JSON.stringify(registry, null, 2) + "\n");

console.log(
  `globals.css + registry.json: ${colors.length} colours, ${Object.keys(shared).length} shared tokens, ` +
    `${Object.keys(typeVars).length / 4} type styles, ${components.length} components, ${blocks.length} blocks, base ${REGISTRY_URL}`
);
