#!/usr/bin/env node
/**
 * ============================================================================
 * Design System Token to CSS Converter
 * ============================================================================
 * Reads tokens.json (Material Design 3 & Cocoa Brown #68483A theme) and generates
 * production-ready CSS variables with strict separation between primitives,
 * semantic color roles, light/dark themes, component tokens, and utilities.
 *
 * Usage:
 *   node scripts/tokens-to-css.mjs
 *   node scripts/tokens-to-css.mjs --input tokens.json --output src/app/tokens.css
 *   node scripts/tokens-to-css.mjs --watch
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Command line argument parser
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    input: path.join(ROOT_DIR, 'tokens.json'),
    output: path.join(ROOT_DIR, 'src', 'app', 'tokens.css'),
    secondaryOutput: path.join(ROOT_DIR, 'tokens.css'),
    watch: false,
    help: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--input' || arg === '-i') {
      options.input = path.resolve(ROOT_DIR, args[++i]);
    } else if (arg === '--output' || arg === '-o') {
      options.output = path.resolve(ROOT_DIR, args[++i]);
    } else if (arg === '--watch' || arg === '-w') {
      options.watch = true;
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    }
  }

  return options;
}

// Convert camelCase or dot.notation to kebab-case
function toKebab(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\._]/g, '-')
    .toLowerCase();
}

/**
 * Resolves a token reference string (e.g., "{semantic.color.primary}")
 * to its corresponding CSS variable name (e.g., "var(--color-primary)").
 */
function resolveTokenRef(refPath) {
  const cleaned = refPath.trim();

  // Primitives
  if (cleaned.startsWith('primitives.color.')) {
    const sub = cleaned.slice('primitives.color.'.length);
    // e.g., primary.40 -> --primitive-color-primary-40
    // success.tonal.40 -> --primitive-color-success-tonal-40
    return `--primitive-color-${toKebab(sub)}`;
  }
  if (cleaned.startsWith('primitives.spacing.')) {
    return `--space-${toKebab(cleaned.slice('primitives.spacing.'.length))}`;
  }
  if (cleaned.startsWith('primitives.radius.')) {
    return `--radius-${toKebab(cleaned.slice('primitives.radius.'.length))}`;
  }
  if (cleaned.startsWith('primitives.borderWidth.')) {
    return `--border-width-${toKebab(cleaned.slice('primitives.borderWidth.'.length))}`;
  }
  if (cleaned.startsWith('primitives.elevation.')) {
    return `--elevation-${toKebab(cleaned.slice('primitives.elevation.'.length))}`;
  }
  if (cleaned.startsWith('primitives.icon.')) {
    return `--icon-size-${toKebab(cleaned.slice('primitives.icon.'.length))}`;
  }
  if (cleaned.startsWith('primitives.alpha.')) {
    return `--primitive-alpha-${toKebab(cleaned.slice('primitives.alpha.'.length))}`;
  }
  if (cleaned.startsWith('primitives.state.')) {
    return `--primitive-state-${toKebab(cleaned.slice('primitives.state.'.length))}`;
  }
  if (cleaned.startsWith('primitives.motion.duration.')) {
    return `--motion-duration-${toKebab(cleaned.slice('primitives.motion.duration.'.length))}`;
  }
  if (cleaned.startsWith('primitives.motion.easing.')) {
    return `--motion-easing-${toKebab(cleaned.slice('primitives.motion.easing.'.length))}`;
  }
  if (cleaned.startsWith('primitives.breakpoint.')) {
    return `--breakpoint-${toKebab(cleaned.slice('primitives.breakpoint.'.length))}`;
  }
  if (cleaned.startsWith('primitives.layout.content.')) {
    return `--layout-${toKebab(cleaned.slice('primitives.layout.content.'.length))}`;
  }
  if (cleaned.startsWith('primitives.zIndex.')) {
    return `--z-${toKebab(cleaned.slice('primitives.zIndex.'.length))}`;
  }

  // Semantic
  if (cleaned.startsWith('semantic.color.text.')) {
    return `--color-text-${toKebab(cleaned.slice('semantic.color.text.'.length))}`;
  }
  if (cleaned.startsWith('semantic.color.')) {
    return `--color-${toKebab(cleaned.slice('semantic.color.'.length))}`;
  }
  if (cleaned.startsWith('semantic.border.')) {
    return `--border-${toKebab(cleaned.slice('semantic.border.'.length))}`;
  }
  if (cleaned.startsWith('semantic.borderWidth.')) {
    return `--border-width-${toKebab(cleaned.slice('semantic.borderWidth.'.length))}`;
  }
  if (cleaned.startsWith('semantic.spacing.')) {
    return `--spacing-${toKebab(cleaned.slice('semantic.spacing.'.length))}`;
  }
  if (cleaned.startsWith('semantic.state.')) {
    return `--state-${toKebab(cleaned.slice('semantic.state.'.length))}`;
  }
  if (cleaned.startsWith('semantic.accessibility.')) {
    return `--a11y-${toKebab(cleaned.slice('semantic.accessibility.'.length))}`;
  }

  // Theme references fallback
  if (cleaned.startsWith('themes.light.color.') || cleaned.startsWith('themes.dark.color.')) {
    return `--color-${toKebab(cleaned.split('.').pop())}`;
  }

  return `--${toKebab(cleaned)}`;
}

/**
 * Transforms any token value: replaces {path.to.token} with var(--css-var).
 */
function transformValue(value) {
  if (typeof value !== 'string') return value;
  return value.replace(/\{([^{}]+)\}/g, (_, path) => {
    return `var(${resolveTokenRef(path)})`;
  });
}

/**
 * Flattens an object into CSS declarations.
 */
function flattenToCss(obj, prefix, indent = '  ') {
  const lines = [];

  for (const [key, val] of Object.entries(obj)) {
    const varName = prefix ? `${prefix}-${toKebab(key)}` : `--${toKebab(key)}`;

    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      lines.push(...flattenToCss(val, varName, indent));
    } else {
      const resolved = transformValue(val);
      lines.push(`${indent}${varName}: ${resolved};`);
    }
  }

  return lines;
}

/**
 * Main conversion function
 */
export function convertTokensToCss(tokens) {
  const buffer = [];

  const addLine = (str = '') => buffer.push(str);
  const addCommentHeader = (title, subtitle = '') => {
    addLine();
    addLine('  /* ' + '-'.repeat(72) + ' */');
    addLine(`  /* ${title.toUpperCase()}`);
    if (subtitle) addLine(`     ${subtitle}`);
    addLine('  /* ' + '-'.repeat(72) + ' */');
  };

  // Header Banner
  addLine('/**');
  addLine(' * ============================================================================');
  addLine(' * DESIGN SYSTEM CSS TOKENS (MATERIAL DESIGN 3 & LUXURY SAFARI THEME)');
  addLine(' * ============================================================================');
  addLine(' * AUTOMATICALLY GENERATED FROM tokens.json — DO NOT EDIT DIRECTLY!');
  addLine(' *');
  addLine(` * Design System: ${tokens.metadata?.name || 'PropertyFlow / Vic Falls'}`);
  addLine(` * Version:       ${tokens.metadata?.version || '1.0.0'}`);
  addLine(` * Brand Color:   ${tokens.metadata?.primaryBrandColor || '#68483A'} (Cocoa Brown)`);
  addLine(` * Standard:      ${tokens.metadata?.accessibility?.standard || 'WCAG 2.2 AA'}`);
  addLine(' * Generated At:  ' + new Date().toISOString());
  addLine(' *');
  addLine(' * CORE ARCHITECTURE PRINCIPLE:');
  addLine(' * 1. PRIMITIVES (--primitive-*) are raw scales and MUST NOT be used directly');
  addLine(' *    in UI component stylesheets.');
  addLine(' * 2. SEMANTIC COLOR ROLES (--color-*) are the source of truth for all UI styling.');
  addLine(' *    They automatically adapt when switching between Light and Dark themes.');
  addLine(' * 3. COMPONENT TOKENS (--btn-*, --input-*, etc.) reference semantic tokens.');
  addLine(' * ============================================================================');
  addLine(' */');
  addLine();

  // Root Section (Primitives & Global Defaults)
  addLine(':root {');

  // Primitives: Color Palettes
  addCommentHeader(
    '1. Primitives: Color Palettes (Raw scales — Internal Only)',
    'Do not use directly in UI components. Use semantic color roles instead.'
  );

  if (tokens.primitives?.color) {
    for (const [paletteName, paletteValues] of Object.entries(tokens.primitives.color)) {
      if (paletteName === 'tonal') continue;
      addLine();
      addLine(`  /* Palette: ${paletteName} */`);
      for (const [step, hex] of Object.entries(paletteValues)) {
        if (typeof hex === 'object') {
          for (const [subStep, subHex] of Object.entries(hex)) {
            addLine(`  --primitive-color-${toKebab(paletteName)}-${toKebab(step)}-${toKebab(subStep)}: ${subHex};`);
          }
        } else {
          addLine(`  --primitive-color-${toKebab(paletteName)}-${toKebab(step)}: ${hex};`);
        }
      }
    }
  }

  // Primitives: Typography Foundations
  addCommentHeader('2. Primitives: Typography Foundations (Inter & Symbols)');
  if (tokens.primitives?.typography?.fontFamily) {
    for (const [k, v] of Object.entries(tokens.primitives.typography.fontFamily)) {
      addLine(`  --font-${toKebab(k)}: ${v};`);
    }
  }
  if (tokens.primitives?.typography?.fontWeight) {
    for (const [k, v] of Object.entries(tokens.primitives.typography.fontWeight)) {
      addLine(`  --font-weight-${toKebab(k)}: ${v};`);
    }
  }

  // Primitives: Spacing Scale (4px Base Unit)
  addCommentHeader('3. Primitives: Spacing Scale (4px Base Unit)');
  if (tokens.primitives?.spacing) {
    for (const [k, v] of Object.entries(tokens.primitives.spacing)) {
      addLine(`  --space-${toKebab(k)}: ${v};`);
    }
  }

  // Primitives: Border Radius
  addCommentHeader('4. Primitives: Border Radius');
  if (tokens.primitives?.radius) {
    for (const [k, v] of Object.entries(tokens.primitives.radius)) {
      addLine(`  --radius-${toKebab(k)}: ${v};`);
    }
  }

  // Primitives: Border Widths
  addCommentHeader('5. Primitives: Border Widths');
  if (tokens.primitives?.borderWidth || tokens.primitives?.border) {
    const borders = tokens.primitives.borderWidth || tokens.primitives.border;
    for (const [k, v] of Object.entries(borders)) {
      addLine(`  --border-width-${toKebab(k)}: ${v};`);
    }
  }

  // Primitives: Elevation (Material 3 Shadows)
  addCommentHeader('6. Primitives: Elevation Levels (Subtle M3 Tonal Shadows)');
  if (tokens.primitives?.elevation) {
    for (const [k, v] of Object.entries(tokens.primitives.elevation)) {
      addLine(`  --elevation-${toKebab(k)}: ${v};`);
    }
  }

  // Primitives: Icon Sizes
  addCommentHeader('7. Primitives: Icon Dimensions');
  if (tokens.primitives?.icon) {
    for (const [k, v] of Object.entries(tokens.primitives.icon)) {
      addLine(`  --icon-size-${toKebab(k)}: ${v};`);
    }
  }

  // Primitives: Motion (Durations & Easings)
  addCommentHeader('8. Primitives: Motion & Micro-Animations');
  if (tokens.primitives?.motion?.duration) {
    for (const [k, v] of Object.entries(tokens.primitives.motion.duration)) {
      addLine(`  --motion-duration-${toKebab(k)}: ${v};`);
    }
  }
  if (tokens.primitives?.motion?.easing) {
    for (const [k, v] of Object.entries(tokens.primitives.motion.easing)) {
      addLine(`  --motion-easing-${toKebab(k)}: ${v};`);
    }
  }

  // Primitives: Breakpoints & Layout Dimensions
  addCommentHeader('9. Primitives: Breakpoints & Layout');
  if (tokens.primitives?.breakpoint) {
    for (const [k, v] of Object.entries(tokens.primitives.breakpoint)) {
      addLine(`  --breakpoint-${toKebab(k)}: ${v};`);
    }
  }
  if (tokens.primitives?.layout?.content) {
    for (const [k, v] of Object.entries(tokens.primitives.layout.content)) {
      addLine(`  --layout-${toKebab(k)}: ${v};`);
    }
  }

  // Primitives: Z-Index Layering
  addCommentHeader('10. Primitives: Z-Index Layering Stack');
  if (tokens.primitives?.zIndex) {
    for (const [k, v] of Object.entries(tokens.primitives.zIndex)) {
      addLine(`  --z-${toKebab(k)}: ${v};`);
    }
  }

  // Primitives: State Layer Opacities
  addCommentHeader('11. Primitives: Interaction State Opacities');
  if (tokens.primitives?.state) {
    for (const [k, v] of Object.entries(tokens.primitives.state)) {
      addLine(`  --state-opacity-${toKebab(k)}: ${v};`);
    }
  }

  // Semantic Typography Definitions
  addCommentHeader('12. Semantic: Typography Hierarchy Tokens');
  const typeTokens = [
    'displayLarge', 'displayMedium', 'displaySmall',
    'headlineLarge', 'headlineMedium', 'headlineSmall',
    'titleLarge', 'titleMedium', 'titleSmall',
    'bodyLarge', 'bodyMedium', 'bodySmall',
    'labelLarge', 'labelMedium', 'labelSmall'
  ];
  for (const tName of typeTokens) {
    const tVal = tokens.primitives?.typography?.[tName];
    if (tVal) {
      addLine(`  /* Typography: ${tName} */`);
      addLine(`  --type-${toKebab(tName)}-font-size: ${tVal.fontSize};`);
      addLine(`  --type-${toKebab(tName)}-font-weight: ${transformValue(tVal.fontWeight)};`);
      addLine(`  --type-${toKebab(tName)}-line-height: ${tVal.lineHeight};`);
      addLine(`  --type-${toKebab(tName)}-letter-spacing: ${tVal.letterSpacing};`);
    }
  }

  // Accessibility Tokens
  addCommentHeader('13. Semantic: Accessibility & Touch Target Constraints');
  if (tokens.semantic?.accessibility) {
    for (const [k, v] of Object.entries(tokens.semantic.accessibility)) {
      addLine(`  --a11y-${toKebab(k)}: ${transformValue(v)};`);
    }
  }

  // Default Semantic Color Roles (Light Theme)
  addCommentHeader(
    '14. Semantic Color Roles (Light Theme — Default)',
    'Primary API for all UI components. Theme-aware.'
  );

  const lightColors = tokens.themes?.light?.color || tokens.semantic?.color || {};
  for (const [role, value] of Object.entries(lightColors)) {
    if (role === 'text') {
      for (const [subRole, subVal] of Object.entries(value)) {
        addLine(`  --color-text-${toKebab(subRole)}: ${transformValue(subVal)};`);
      }
    } else {
      addLine(`  --color-${toKebab(role)}: ${transformValue(value)};`);
    }
  }

  // Semantic Borders & Focus Ring
  addCommentHeader('15. Semantic: Border Styles & Focus Ring');
  const lightBorders = tokens.themes?.light?.border || tokens.semantic?.border || {};
  for (const [k, v] of Object.entries(lightBorders)) {
    addLine(`  --border-${toKebab(k)}: ${transformValue(v)};`);
  }
  if (tokens.semantic?.state?.focusRing) {
    addLine(`  --focus-ring: ${transformValue(tokens.semantic.state.focusRing)};`);
  }

  // Component Tokens (Buttons, Inputs, Cards, etc.)
  addCommentHeader(
    '16. Component Tokens (Mapped to Semantic Roles)',
    'Consume these directly in component styles.'
  );
  if (tokens.components) {
    for (const [compName, compProps] of Object.entries(tokens.components)) {
      addLine();
      addLine(`  /* Component: ${compName} */`);
      const lines = flattenToCss(compProps, `--${toKebab(compName)}`);
      buffer.push(...lines);
    }
  }

  addLine('}');
  addLine();

  // Dark Theme Overrides
  addLine('/* ==========================================================================');
  addLine('   DARK THEME SEMANTIC COLOR ROLES & OVERRIDES');
  addLine('   Activated via [data-theme="dark"] on <html> or <body>');
  addLine('   ========================================================================== */');
  addLine(':root[data-theme="dark"],');
  addLine('body[data-theme="dark"] {');

  const darkColors = tokens.themes?.dark?.color || {};
  for (const [role, value] of Object.entries(darkColors)) {
    addLine(`  --color-${toKebab(role)}: ${transformValue(value)};`);
  }

  // Dark theme text roles
  addLine('  --color-text-primary: var(--color-on-surface);');
  addLine('  --color-text-secondary: var(--color-on-surface-variant);');
  addLine('  --color-text-tertiary: var(--primitive-color-neutral-variant-60);');
  addLine('  --color-text-disabled: var(--primitive-alpha-white38);');
  addLine('  --color-text-inverse: var(--color-inverse-on-surface);');
  addLine('  --color-text-link: var(--color-primary);');
  addLine('  --color-text-link-hover: var(--primitive-color-primary-90);');

  const darkBorders = tokens.themes?.dark?.border || {};
  for (const [k, v] of Object.entries(darkBorders)) {
    addLine(`  --border-${toKebab(k)}: ${transformValue(v)};`);
  }
  addLine('  --focus-ring: 0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-primary);');

  addLine('}');
  addLine();

  // OS Dark Mode Preference (when no explicit data-theme is set)
  addLine('@media (prefers-color-scheme: dark) {');
  addLine('  :root:not([data-theme="light"]) {');
  for (const [role, value] of Object.entries(darkColors)) {
    addLine(`    --color-${toKebab(role)}: ${transformValue(value)};`);
  }
  addLine('    --color-text-primary: var(--color-on-surface);');
  addLine('    --color-text-secondary: var(--color-on-surface-variant);');
  addLine('    --color-text-tertiary: var(--primitive-color-neutral-variant-60);');
  addLine('    --color-text-disabled: var(--primitive-alpha-white38);');
  addLine('    --color-text-inverse: var(--color-inverse-on-surface);');
  addLine('    --color-text-link: var(--color-primary);');
  addLine('    --color-text-link-hover: var(--primitive-color-primary-90);');
  for (const [k, v] of Object.entries(darkBorders)) {
    addLine(`    --border-${toKebab(k)}: ${transformValue(v)};`);
  }
  addLine('    --focus-ring: 0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-primary);');
  addLine('  }');
  addLine('}');
  addLine();

  // Typography Utility Classes
  addLine('/* ==========================================================================');
  addLine('   TYPOGRAPHY UTILITY CLASSES');
  addLine('   ========================================================================== */');
  for (const tName of typeTokens) {
    const kName = toKebab(tName);
    addLine(`.${kName} {`);
    addLine('  font-family: var(--font-primary);');
    addLine(`  font-size: var(--type-${kName}-font-size);`);
    addLine(`  font-weight: var(--type-${kName}-font-weight);`);
    addLine(`  line-height: var(--type-${kName}-line-height);`);
    addLine(`  letter-spacing: var(--type-${kName}-letter-spacing);`);
    addLine('}');
    addLine();
  }

  // Elevation Utility Classes
  addLine('/* ==========================================================================');
  addLine('   ELEVATION & SURFACE CONTAINER UTILITIES');
  addLine('   ========================================================================== */');
  for (let i = 0; i <= 5; i++) {
    addLine(`.elevation-${i} {`);
    addLine(`  box-shadow: var(--elevation-level-${i});`);
    addLine('}');
    addLine();
  }

  addLine('.surface-container-lowest { background-color: var(--color-surface-container-lowest); color: var(--color-on-surface); }');
  addLine('.surface-container-low    { background-color: var(--color-surface-container-low);    color: var(--color-on-surface); }');
  addLine('.surface-container        { background-color: var(--color-surface-container);        color: var(--color-on-surface); }');
  addLine('.surface-container-high   { background-color: var(--color-surface-container-high);   color: var(--color-on-surface); }');
  addLine('.surface-container-highest{ background-color: var(--color-surface-container-highest);color: var(--color-on-surface); }');
  addLine();

  // Accessibility Utility
  addLine('.touch-target {');
  addLine('  min-width: var(--a11y-min-touch-target);');
  addLine('  min-height: var(--a11y-min-touch-target);');
  addLine('  display: inline-flex;');
  addLine('  align-items: center;');
  addLine('  justify-content: center;');
  addLine('}');
  addLine();

  addLine('.focus-visible:focus-visible {');
  addLine('  outline: none;');
  addLine('  box-shadow: var(--focus-ring);');
  addLine('}');
  addLine();

  return buffer.join('\n');
}

/**
 * CLI Execution Handler
 */
function run() {
  const options = parseArgs();

  if (options.help) {
    console.log(`
Design System Tokens to CSS Converter
-------------------------------------
Options:
  -i, --input <path>     Path to tokens.json (default: tokens.json)
  -o, --output <path>    Output CSS path (default: src/app/tokens.css)
  -w, --watch            Watch tokens.json for modifications and auto-rebuild
  -h, --help             Show this help message
`);
    process.exit(0);
  }

  function compile() {
    try {
      if (!fs.existsSync(options.input)) {
        console.error(`Error: Input tokens file not found: ${options.input}`);
        process.exit(1);
      }

      console.log(`Reading tokens from: ${path.relative(ROOT_DIR, options.input)}`);
      const raw = fs.readFileSync(options.input, 'utf-8');
      const tokens = JSON.parse(raw);

      const css = convertTokensToCss(tokens);

      // Ensure target directory exists
      fs.mkdirSync(path.dirname(options.output), { recursive: true });
      fs.writeFileSync(options.output, css, 'utf-8');
      console.log(`Successfully generated CSS variables at: ${path.relative(ROOT_DIR, options.output)} (${(Buffer.byteLength(css) / 1024).toFixed(1)} KB)`);

      // Write secondary copy if configured
      if (options.secondaryOutput && options.secondaryOutput !== options.output) {
        fs.mkdirSync(path.dirname(options.secondaryOutput), { recursive: true });
        fs.writeFileSync(options.secondaryOutput, css, 'utf-8');
        console.log(`Synced root copy at: ${path.relative(ROOT_DIR, options.secondaryOutput)}`);
      }
    } catch (err) {
      console.error('Failed to compile tokens to CSS:', err.message);
      if (!options.watch) {
        process.exit(1);
      }
    }
  }

  // Initial compilation
  compile();

  // Watch mode
  if (options.watch) {
    console.log(`Watching for changes in ${path.relative(ROOT_DIR, options.input)}...`);
    fs.watch(options.input, (eventType) => {
      if (eventType === 'change') {
        console.log(`Tokens modified, re-generating CSS...`);
        compile();
      }
    });
  }
}

// Run CLI if invoked directly
run();
