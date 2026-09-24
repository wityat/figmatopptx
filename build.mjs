#!/usr/bin/env node
// Generates the SEO pages and free tools from content/*.mjs into the repo root,
// then writes sitemap.xml and robots.txt.
//
//   node build.mjs
//
// The hand-written pages (index.html, pro.html, legal) are edited directly;
// only pro.html's checkout asset version is updated here. Keep their links in sync with
// content/_shared.mjs.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { page, SITE } from './content/_shared.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));

// GitHub Pages caches scripts for ten minutes. A changed Paddle account must
// have a new asset URL so returning visitors cannot reuse its old configuration.
const checkout = (await readFile(join(ROOT, 'assets/checkout.js'), 'utf8')).replace(/\r\n/g, '\n');
const checkoutVersion = createHash('sha256').update(checkout).digest('hex').slice(0, 12);
const proPath = join(ROOT, 'pro.html');
const pro = await readFile(proPath, 'utf8');
const versionedPro = pro.replace(/src="\/assets\/checkout\.js(?:\?[^"\s]*)?"/, `src="/assets/checkout.js?v=${checkoutVersion}"`);
if (versionedPro !== pro) await writeFile(proPath, versionedPro, 'utf8');

const MODULES = [
  './content/figma-to-pptx.mjs',
  './content/export-figma-to-powerpoint.mjs',
  './content/figma-to-google-slides.mjs',
  './content/convert-figma-to-ppt.mjs',
  './content/figma-presentation-export.mjs',
  './content/pitchdeck-alternative.mjs',
  './content/figma-slides-to-powerpoint-editable.mjs',
  './content/figma-export-editable-pptx.mjs',
  './content/conversion-report.mjs',
  './content/tools-slide-size-calculator.mjs',
  './content/tools-font-compatibility-checker.mjs',
];

// Hand-written pages that still belong in the sitemap.
const STATIC_PAGES = [
  ['/', '1.0'],
  ['/pro.html', '0.8'],
  ['/terms.html', '0.3'],
  ['/privacy.html', '0.3'],
  ['/refunds.html', '0.3'],
];

const built = [];

for (const spec of MODULES) {
  const mod = (await import(spec)).default;
  const html = page(mod);
  const outDir = join(ROOT, mod.path);
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, 'index.html'), html, 'utf8');
  built.push(mod.path);
  console.log(`  ${mod.path.padEnd(42)} ${(html.length / 1024).toFixed(1)} KB`);
}

const urls = [
  ...STATIC_PAGES.map(([p, prio]) => ({ p, prio })),
  ...built.map((p) => ({ p, prio: p.startsWith('/tools/') ? '0.7' : '0.9' })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ p, prio }) => `  <url>
    <loc>${SITE}${p}</loc>
    <priority>${prio}</priority>
  </url>`).join('\n')}
</urlset>
`;
await writeFile(join(ROOT, 'sitemap.xml'), sitemap, 'utf8');

await writeFile(join(ROOT, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`, 'utf8');

console.log(`\n${built.length} pages generated, ${urls.length} URLs in sitemap.xml`);
