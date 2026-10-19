/**
 * Build-time share images (Instagram 1080×1080 + Open Graph 1200×630) in the site's
 * "Obsidian Violet Matrix" style. Uses satori (HTML/flex → SVG) + resvg (SVG → PNG): free, no browser needed,
 * runs fine on GitHub Actions.
 */
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: (Node | string | null | false | undefined)[]): Node => ({
  type,
  props: { style, children: children.filter((c) => c !== null && c !== false && c !== undefined) },
});

const fontFile = (pkg: string, file: string) => readFile(join(process.cwd(), 'node_modules', '@fontsource', pkg, 'files', file));
let fontsP: Promise<{ name: string; data: Buffer; weight: 400 | 500 | 600 | 700 | 800; style: 'normal' }[]> | undefined;
const fonts = () =>
  (fontsP ??= Promise.all([
    fontFile('plus-jakarta-sans', 'plus-jakarta-sans-latin-400-normal.woff').then((data) => ({ name: 'Jakarta', data, weight: 400 as const, style: 'normal' as const })),
    fontFile('plus-jakarta-sans', 'plus-jakarta-sans-latin-700-normal.woff').then((data) => ({ name: 'Jakarta', data, weight: 700 as const, style: 'normal' as const })),
    fontFile('plus-jakarta-sans', 'plus-jakarta-sans-latin-800-normal.woff').then((data) => ({ name: 'Jakarta', data, weight: 800 as const, style: 'normal' as const })),
    fontFile('jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff').then((data) => ({ name: 'Mono', data, weight: 500 as const, style: 'normal' as const })),
  ]));

const C = {
  bg: '#0b1326', card: '#131b2e', high: '#222a3d', text: '#dae2fd', muted: '#cbc3d7', outline: '#958ea0',
  primary: '#d0bcff', secondary: '#7bd0ff', violet: '#8b5cf6', onPrimary: '#3c0091',
};

export interface ShareInput {
  eyebrow: string; // e.g. "NUEVA ACTUALIZACIÓN"
  appName?: string;
  version?: string;
  title: string;
  footer: string; // e.g. "edwinramos.github.io"
  tags?: string[];
}

const fit = (text: string, sizes: [number, number][]) => sizes.find(([max]) => text.length <= max)?.[1] ?? sizes[sizes.length - 1][1];

function tree(i: ShareInput, format: 'ig' | 'og'): Node {
  const ig = format === 'ig';
  const pad = ig ? 88 : 72;
  const head = i.appName ?? i.title;
  const sub = i.appName ? i.title : undefined;
  const headSize = ig ? fit(head, [[14, 112], [22, 92], [32, 72], [999, 60]]) : fit(head, [[18, 84], [28, 68], [40, 54], [999, 46]]);
  const subSize = sub ? (ig ? fit(sub, [[40, 56], [70, 46], [110, 38], [999, 32]]) : fit(sub, [[50, 40], [90, 34], [999, 28]])) : 0;

  const [W, H] = ig ? [1080, 1080] : [1200, 630];
  return h('div', {
    // satori: padding is added to width/height (content-box)
    width: W - 2 * pad, height: H - 2 * pad, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    padding: pad, backgroundColor: C.bg, color: C.text, fontFamily: 'Jakarta',
    backgroundImage: `radial-gradient(circle at 85% 10%, rgba(139,92,246,0.45), rgba(11,19,38,0) 55%), radial-gradient(circle at 5% 95%, rgba(123,208,255,0.22), rgba(11,19,38,0) 50%)`,
  },
    // top bar: monogram + brand
    h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
      h('div', { display: 'flex', alignItems: 'center', gap: 20 },
        h('div', { width: ig ? 76 : 64, height: ig ? 76 : 64, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundImage: `linear-gradient(135deg, ${C.violet}, ${C.secondary})`, color: '#0b1326', fontSize: ig ? 32 : 28, fontWeight: 800 }, 'ER'),
        h('div', { display: 'flex', flexDirection: 'column' },
          h('div', { fontSize: ig ? 30 : 26, fontWeight: 700, color: C.text }, 'Edwin Ramos'),
          h('div', { fontFamily: 'Mono', fontSize: ig ? 20 : 18, color: C.outline, letterSpacing: 2 }, 'DEVLOG · APPS'),
        ),
      ),
      i.version ? h('div', { display: 'flex', fontFamily: 'Mono', fontSize: ig ? 30 : 26, color: C.onPrimary, backgroundColor: C.primary, padding: '10px 22px', borderRadius: 999 }, i.version) : null,
    ),
    // middle: eyebrow + app + title
    h('div', { display: 'flex', flexDirection: 'column', gap: ig ? 24 : 16 },
      h('div', { display: 'flex', alignItems: 'center', gap: 14 },
        h('div', { width: 14, height: 14, borderRadius: 999, backgroundColor: C.secondary }),
        h('div', { fontFamily: 'Mono', fontSize: ig ? 26 : 22, color: C.secondary, letterSpacing: 4 }, i.eyebrow.toUpperCase()),
      ),
      h('div', { fontSize: headSize, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: C.text }, head),
      sub ? h('div', { fontSize: subSize, fontWeight: 700, lineHeight: 1.2, color: C.muted }, sub) : null,
    ),
    // bottom: tags + url
    h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 16, borderTop: `2px solid ${C.high}`, paddingTop: ig ? 32 : 24 },
      h('div', { display: 'flex', gap: 10, flexWrap: 'wrap', flex: 1 },
        ...(i.tags ?? []).slice(0, 3).map((t) => h('div', { display: 'flex', fontFamily: 'Mono', fontSize: ig ? 22 : 18, color: C.primary, backgroundColor: C.high, padding: '8px 16px', borderRadius: 10 }, t)),
      ),
      h('div', { display: 'flex', fontFamily: 'Mono', fontSize: ig ? 24 : 20, color: C.outline }, i.footer),
    ),
  );
}

export async function renderShareImage(input: ShareInput, format: 'ig' | 'og'): Promise<Uint8Array> {
  const [width, height] = format === 'ig' ? [1080, 1080] : [1200, 630];
  const svg = await satori(tree(input, format) as never, { width, height, fonts: await fonts() });
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();
}
