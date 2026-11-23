// Generates app/globals.css and registry.json from design-system/tokens.json.
// Run with `npm run tokens`. Do not edit either output by hand.
//
// REGISTRY_URL is the public address of the built registry (the folder public/r),
// used for dependencies between items, e.g. https://ui.example.com/r
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_URL = (process.env.REGISTRY_URL || "http://localhost:3000/r").replace(/\/$/, "");
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
  // Square: every rounded-* is 0. rounded-full stays round for avatars and radios.
  ...Object.fromEntries(["xs", "sm", "md", "lg", "xl", "2xl"].map((s) => [`radius-${s}`, "var(--radius)"])),
  "radius-pill": "999px",
  "font-sans": 'var(--font-inter-tight), "Helvetica Neue", Arial, sans-serif',
  "font-serif": 'var(--font-newsreader), "Times New Roman", serif',
  "font-mono": "var(--font-jetbrains-mono), ui-monospace, monospace",
  // Literal values (not var()) so they never point at themselves.
  ...Object.fromEntries(Object.entries(ease).map(([k, v]) => [k, v])),
  ...Object.fromEntries(Object.entries(shadows).map(([k, v]) => [k, v])),
  "animate-rise": `rise var(--dur-reveal) ${ease["ease-entrance"]} both`,
  "animate-rise-base": `rise var(--dur-base) ${ease["ease-entrance"]} both`,
  "animate-fade": "fade var(--dur-base) ease-out both",
  "animate-fade-fast": `fade var(--dur-fast) ${ease["ease-standard"]} both`,
  ...typeVars,
};

const extraCss = `@keyframes rise {
  from { opacity: 0; transform: translateY(var(--rise-sm)); }
  to { opacity: 1; transform: none; }
}
@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`;

const block = (vars) => Object.entries(vars).map(([k, v]) => `  --${k}: ${v};`).join("\n");

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

${extraCss}

@layer base {
  *, ::before, ::after { border-color: var(--border); }
  html { color-scheme: light; }
  html.dark, html[data-theme="dark"] { color-scheme: dark; }
  body {
    margin: 0;
    font-family: var(--font-sans);
    font-weight: 420;
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
  description: "Tokens of the designsbyluca design system: colours light and dark, type scale, motion, square corners.",
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
    "@layer base": { body: { "font-weight": "420" } },
  },
};

// name, title, description (from the component READMEs), npm deps, registry deps (own items)
const components = [
  ["button", "Button", "A 48px square button with a verb as its label.", ["radix-ui", "class-variance-authority"], []],
  ["icon-button", "IconButton", "A 48px square button with a single line icon.", [], ["button"]],
  ["link", "Link", "A text link with a 1px line below that thickens to 2px on hover.", ["radix-ui", "class-variance-authority"], []],
  ["input", "Input", "A text field with lots of room and a single line below.", ["class-variance-authority"], []],
  ["textarea", "Textarea", "A multi-line field in a very fine frame.", [], []],
  ["select", "Select", "A single choice from a short list; the trigger looks like an Input.", ["radix-ui"], ["input"]],
  ["checkbox", "Checkbox", "A 20px square for yes/no choices.", ["radix-ui"], []],
  ["radio-group", "RadioGroup", "One choice from a few visible options: a circle with a dot.", ["radix-ui"], []],
  ["switch", "Switch", "An on/off toggle: a 44 × 24px rectangle with a square thumb.", ["radix-ui"], []],
  ["label", "Label", "The name of a form control, with Field, OptionRow, FieldHint and FieldError.", ["radix-ui"], []],
  ["badge", "Badge", "A small square label in capitals. Also exported as Tag.", ["radix-ui", "class-variance-authority"], []],
  ["avatar", "Avatar", "A picture of a person, with initials as fallback.", ["radix-ui"], []],
  ["card", "Card", "A quiet surface, or editorial with the image above.", ["class-variance-authority"], []],
  ["separator", "Separator", "A 1px hairline between groups.", ["radix-ui"], []],
  ["alert", "Alert", "A message in the page flow: the square, a title and one or two sentences.", ["class-variance-authority"], []],
  ["toast", "Toast", "A short note in a corner that leaves by itself. Sonner-style toast() API.", [], ["button"]],
  ["tooltip", "Tooltip", "A short hint on hover or keyboard focus.", ["radix-ui"], []],
  ["dialog", "Dialog", "A modal window for a short task.", ["radix-ui"], []],
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
    files: [{ path: `registry/ui/${name}.tsx`, type: "registry:ui" }],
  })),
  // A theme item itself: shadcn only overwrites existing variables (--primary, --radius …)
  // when the item you ask for is a theme, so `add all.json` sets everything in one go.
  {
    ...theme,
    name: "all",
    title: "All components",
    description: "The theme and all 18 free components at once.",
    registryDependencies: ["utils", ...components.map(([n]) => `${REGISTRY_URL}/${n}.json`)],
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
    `${Object.keys(typeVars).length / 4} type styles, ${components.length} components, base ${REGISTRY_URL}`
);
