#!/usr/bin/env node
// Rewrites the shared header nav and footer columns inside the hand-written
// pages (index/pro/legal) so they match content/_shared.mjs. Run after adding
// a page to NAV / FOOTER_GUIDES / FOOTER_TOOLS:
//
//   node sync-static.mjs

import { readFile, writeFile } from 'node:fs/promises';
import { NAV, FOOTER_GUIDES, FOOTER_TOOLS, PLUGIN_URL } from './content/_shared.mjs';

const FILES = ['index.html', 'pro.html', 'terms.html', 'privacy.html', 'refunds.html'];

// Which nav item should be marked current on which hand-written page.
const CURRENT = { 'index.html': '/', 'pro.html': '/pro.html' };

function navBlock(file) {
  const cur = CURRENT[file];
  const links = NAV.map(([href, label]) =>
    `      <a href="${href}"${href === cur ? ' aria-current="page"' : ''}>${label}</a>`).join('\n');
  return `<nav class="site-nav">\n${links}\n    </nav>`;
}

const FOOTER = `<div class="footer-cols">
      <nav aria-label="Product">
        <h3>Product</h3>
        <a href="/">Home</a>
        <a href="/pro.html">Pricing &amp; Pro</a>
        <a href="${PLUGIN_URL}">Install on Figma Community</a>
      </nav>
      <nav aria-label="Guides">
        <h3>Guides</h3>
        ${FOOTER_GUIDES.map(([h, l]) => `<a href="${h}">${l}</a>`).join('\n        ')}
      </nav>
      <nav aria-label="Free tools">
        <h3>Free tools</h3>
        ${FOOTER_TOOLS.map(([h, l]) => `<a href="${h}">${l}</a>`).join('\n        ')}
      </nav>
      <nav aria-label="Legal">
        <h3>Legal</h3>
        <a href="/terms.html">Terms of Service</a>
        <a href="/privacy.html">Privacy Policy</a>
        <a href="/refunds.html">Refund Policy</a>
      </nav>
    </div>`;

for (const file of FILES) {
  let html = await readFile(file, 'utf8');
  const before = html;

  html = html.replace(/<nav class="site-nav">[\s\S]*?<\/nav>/, navBlock(file));
  html = html.replace(/<div class="footer-cols">[\s\S]*?<\/div>\s*(?=<p class="footer-note">)/, FOOTER + '\n    ');

  if (html === before) {
    console.log(`  ${file.padEnd(16)} unchanged (patterns not found?)`);
  } else {
    await writeFile(file, html, 'utf8');
    console.log(`  ${file.padEnd(16)} nav + footer synced`);
  }
}
