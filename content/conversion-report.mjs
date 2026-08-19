import { faq } from './_shared.mjs';

const SAMPLE = `slides: 5
native text boxes: 18
native shapes: 9
images placed: 5
rasterized nodes: 3
  - Hero / gradient-orb: angular gradient fill
  - Logo lockup: complex vector (curves or filled geometry)
  - Card 2 / photo-mask: mask node
font substitutions: 2
  - Inter -> Inter (no mapping — kept as-is, may fall back if not installed)
  - Space Grotesk -> Segoe UI (Cyrillic fallback → Segoe UI (no mapping; Space Grotesk may render as boxes if not installed))
fonts embedded: 1
  - Inter [regular, bold]
fonts remapped: 1
  - Space Grotesk -> Segoe UI (Cyrillic fallback → Segoe UI)
fonts need file: 0`;

const f = faq([
  ['Why show me problems at all? Other plugins just export.',
   'Because you find out either way — the only question is whether you find out here, or your client finds out in front of their board. A three-line report before you send the file is cheaper than a surprise after.'],
  ['Does a rasterized node mean the export failed?',
   'No. A rasterized node still looks exactly like your design; it is rendered at high resolution and placed in the right position. It simply cannot be edited in PowerPoint. For a logo or an illustration that is usually the correct outcome anyway.'],
  ['What is a placeholder PNG?',
   'A rare case where a node had to be rasterized but no rendered bytes were available for it. The report marks that line explicitly rather than shipping an invisible gap — if you see one, re-run the export.'],
  ['Can I get the report as a file?',
   'The report is shown in the plugin right after the export and can be copied as plain text — the same format shown on this page.'],
  ['Do failed exports count against my free quota?',
   'No. Quota is only spent on an export that actually produced a file.'],
]);

export default {
  path: '/conversion-report/',
  title: 'The Conversion Report — What It Tells You After Every Export',
  description: 'Every export ends with a report: how many native text boxes and shapes were written, which nodes became pictures and why, and what happened to every font.',
  h1: 'What the Conversion Report Tells You',
  lede: 'Of the Figma-to-PowerPoint plugins we tested, this is the only one that hands you a report at all. Here is the whole thing, line by line.',
  schemas: [f.schema],
  body: `
  <section>
    <div class="wrap">
      <span class="kicker">A real report</span>
      <h2>This is the actual output format</h2>
      <p class="dim" style="max-width:760px">Not a marketing mock-up — this is what the plugin prints after a five-slide export, in the same plain-text form you can copy out of the UI.</p>
      <pre class="report-sample"><code>${SAMPLE}</code></pre>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2 class="center">Reading it in thirty seconds</h2>
      <div class="grid-3">
        <div class="card">
          <h3>The counts</h3>
          <p><strong>native text boxes</strong> and <strong>native shapes</strong> are the numbers that matter — they are how much of your deck stayed editable. <strong>images placed</strong> counts real image fills, not rasterized fallbacks.</p>
        </div>
        <div class="card">
          <h3>rasterized nodes</h3>
          <p>Each line is <em>layer name: reason</em>. The layer name is the one from your Figma file, so you can jump straight to it. The reason is the specific rule that fired — not "unsupported".</p>
        </div>
        <div class="card">
          <h3>The three font baskets</h3>
          <p><strong>embedded</strong> — real bytes inside the file. <strong>remapped</strong> — an honest <em>from → to</em> swap. <strong>need file</strong> — upload a .ttf and it joins the embedded list.</p>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="feature">
        <div class="feature-copy">
          <span class="kicker">What to actually do with it</span>
          <h2>Three questions worth asking before you hit send</h2>
          <p><strong>1. Is anything editable that needs to be?</strong> If a headline your client will rewrite shows up under <em>rasterized</em>, that is a five-second fix in Figma — usually a mask or a gradient fill on the text — and worth doing before the deck leaves your hands.</p>
          <p><strong>2. Will the fonts survive?</strong> Anything in <em>need file</em> renders with whatever PowerPoint decides on the recipient's machine. Upload the .ttf and it moves to <em>embedded</em>.</p>
          <p><strong>3. Does the raster count match your expectations?</strong> Logos and illustrations as pictures — fine. Half your body copy as pictures — something is off, and the reasons column tells you what.</p>
        </div>
        <figure class="feature-media">
          <img src="/assets/carousel-1.png" alt="The conversion report as it appears in the plugin, with counts, rasterized nodes and font baskets" width="1920" height="1080">
          <figcaption>The same report, in the plugin, the moment your deck is ready.</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2 class="center">Why this exists</h2>
      <p class="section-intro" style="max-width:760px">In July 2026 we exported the same deck through every Figma-to-PowerPoint plugin we could find and opened each file. Two things were consistently true: most "editable" exports were images, and <strong>none of them told the user what had happened.</strong> The silence is the product decision we disagreed with.</p>
      <div style="max-width:760px;margin:0 auto">
      ${f.html}
      </div>
      <p class="center dim" style="margin-top:2em">Related: <a href="/figma-export-editable-pptx/">The full rule set behind the report</a> · <a href="/convert-figma-to-ppt/">Pre-flight check your deck</a> · <a href="/tools/font-compatibility-checker/">Font compatibility checker</a></p>
    </div>
  </section>
`,
};
