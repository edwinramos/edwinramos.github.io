// Verifies every Material Symbol used in the built HTML is in src/lib/icons.ts (the font is subset).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const list = new Set([...readFileSync('src/lib/icons.ts', 'utf8').matchAll(/'([a-z0-9_]+)'/g)].map((m) => m[1]));
const used = new Set();
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && [...readFileSync(p, 'utf8').matchAll(/material-symbols-outlined[^>]*>([a-z0-9_]+)</g)].forEach((m) => used.add(m[1])); });
walk('dist');
const missing = [...used].filter((i) => !list.has(i));
console.log(`icons used: ${used.size}; missing from icons.ts: ${missing.length ? missing.join(', ') : 'none'}`);
process.exit(missing.length ? 1 : 0);
