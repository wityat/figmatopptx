// Shared layout + helpers for the generated content pages.
// Existing hand-written pages (index/pro/legal) stay as they are; this module
// only builds the new SEO pages and widgets. Keep nav/footer in sync with them.

export const SITE = 'https://figmatopptx.com';
export const PLUGIN_URL = 'https://www.figma.com/community/plugin/1658228847345139243';
export const CTA_NOTE = '3 free exports/month · no signup';

export const NAV = [
  ['/', 'Home'],
  ['/export-figma-to-powerpoint/', 'How to export'],
  ['/conversion-report/', 'Conversion report'],
  ['/tools/slide-size-calculator/', 'Tools'],
  ['/pro.html', 'Pricing'],
];

export const FOOTER_GUIDES = [
  ['/figma-to-pptx/', 'Figma to PPTX'],
  ['/export-figma-to-powerpoint/', 'Export Figma to PowerPoint'],
  ['/convert-figma-to-ppt/', 'Convert Figma to PPT'],
  ['/figma-to-google-slides/', 'Figma to Google Slides'],
  ['/figma-presentation-export/', 'Figma presentation export'],
  ['/figma-slides-to-powerpoint-editable/', 'Figma Slides to PowerPoint'],
  ['/figma-export-editable-pptx/', 'Editable PPTX explained'],
  ['/pitchdeck-alternative/', 'Pitchdeck alternative'],
];

export const FOOTER_TOOLS = [
  ['/tools/slide-size-calculator/', 'Slide size calculator'],
  ['/tools/font-compatibility-checker/', 'Font compatibility checker'],
  ['/conversion-report/', 'What the report tells you'],
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Primary call to action, used at the top and bottom of every page. */
export function cta(label = 'Install the free Figma plugin', note = CTA_NOTE) {
  return `<div class="cta-group">
        <a class="btn btn-primary" href="${PLUGIN_URL}">${label}</a>
        <span class="cta-note">${note}</span>
      </div>`;
}

/** FAQ block + the FAQPage schema that goes with it. */
export function faq(items) {
  const html = `<div class="faq">
${items.map(([q, a]) => `        <details>
          <summary>${q}</summary>
          <p>${a}</p>
        </details>`).join('\n')}
      </div>`;
  const schema = {
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({
      '@type': 'Question',
      name: stripTags(q),
      acceptedAnswer: { '@type': 'Answer', text: stripTags(a) },
    })),
  };
  return { html, schema };
}

export function stripTags(s) {
  return String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

export function howTo(name, steps) {
  return {
    '@type': 'HowTo',
    name,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: stripTags(s.name),
      text: stripTags(s.text),
    })),
  };
}

export const SOFTWARE_SCHEMA = {
  '@type': 'SoftwareApplication',
  name: 'PPTX Export — Figma to Editable PowerPoint',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Figma (Windows, macOS, web)',
  url: PLUGIN_URL,
  offers: [
    { '@type': 'Offer', price: '0', priceCurrency: 'USD', name: 'Free — 3 exports per month' },
    { '@type': 'Offer', price: '12', priceCurrency: 'USD', name: 'Pro — unlimited exports (monthly)' },
    { '@type': 'Offer', price: '69', priceCurrency: 'USD', name: 'Pro — unlimited exports (yearly)' },
  ],
};

/**
 * Full page shell. `path` is the canonical path with a trailing slash,
 * `schemas` are extra JSON-LD nodes merged into one @graph.
 */
export function page({ path, title, description, h1, lede, body, schemas = [], ogImage = '/assets/cover.png', navKey }) {
  const graph = [SOFTWARE_SCHEMA, ...schemas];
  const nav = NAV.map(([href, label]) =>
    `<a href="${href}"${href === (navKey || path) ? ' aria-current="page"' : ''}>${label}</a>`).join('\n      ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" type="image/png" href="/favicon.png">
  <meta name="theme-color" content="#16161e">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${SITE}${ogImage}">
  <meta property="og:url" content="${SITE}${path}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="${SITE}${path}">
  <script type="application/ld+json">
${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2)}
  </script>
</head>
<body>

<header class="site-header">
  <div class="wrap">
    <a class="brand" href="/"><img src="/favicon.png" alt="" width="28" height="28">PPTX Export</a>
    <nav class="site-nav">
      ${nav}
    </nav>
  </div>
</header>

<main>

  <div class="hero">
    <div class="wrap">
      <h1>${h1}</h1>
      <p class="lede">${lede}</p>
      ${cta()}
    </div>
  </div>

${body}

  <section class="alt">
    <div class="wrap center">
      <h2>Hand off a deck people can actually edit</h2>
      <p class="section-intro">Editable where possible, embedded where it matters, transparent always — that's the whole promise.</p>
      ${cta()}
    </div>
  </section>

</main>

<footer class="site-footer">
  <div class="wrap">
    <div class="footer-cols">
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
    </div>
    <p class="footer-note">PPTX Export — Figma to Editable PowerPoint. Conversion happens entirely on your machine, inside Figma — your designs are never uploaded to any server.</p>
  </div>
</footer>

</body>
</html>
`;
}
