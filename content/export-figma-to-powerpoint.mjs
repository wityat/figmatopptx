import { faq, howTo, cta } from './_shared.mjs';

const steps = [
  { name: 'Install the plugin', text: 'Open the plugin page on Figma Community and hit Open in Figma. No account, no email, no API key.' },
  { name: 'Select your frames', text: 'In your Figma file select the frames you want as slides. Run Plugins → PPTX Export. You get slide thumbnails in order and a content pre-count such as 18 texts, 9 shapes, 5 images.' },
  { name: 'Choose an export mode', text: 'Exact look plus editable text is the default. Fully editable turns everything it can into native PowerPoint objects. Pixel-perfect images gives one crisp picture per slide.' },
  { name: 'Export and download', text: 'Click Export to PPTX and watch the staged progress: frames, fonts, convert, package. Download the .pptx and open it in PowerPoint, Google Slides or Keynote.' },
];

const f = faq([
  ['Do I need a Figma paid plan?',
   'No. The plugin runs on free Figma accounts, in the desktop app and in the browser.'],
  ['My client does not have my fonts. What happens?',
   'That is exactly the case the plugin was built for. Eight popular families are bundled and embedded into the .pptx automatically; for any other typeface you upload the <code class="key">.ttf</code> once and it is embedded too. If you skip embedding, the font is honestly remapped to a PowerPoint-safe family and the swap is named in the report — no silent surprises. Check your own typeface in the <a href="/tools/font-compatibility-checker/">font checker</a>.'],
  ['How many frames can I export at once?',
   'There is no hard cap. A 54-frame deck exports fine; big photo-heavy decks simply take longer and produce a larger file. If you are exporting dozens of frames, leave file-size optimization on.'],
  ['Why is my gradient a picture?',
   'Linear, radial and diamond gradients convert to native PowerPoint gradients. Angular (conic) gradients have no equivalent in the PowerPoint format at all, so they are rasterized — and the report names the node and the reason. Same story for masks, blurs, inner shadows and blend modes.'],
  ['Is my design uploaded anywhere?',
   'No. The conversion runs entirely inside Figma on your machine. The plugin ships with no network access — you can verify that badge on its Figma Community page.'],
  ['Can I go the other way, PowerPoint into Figma?',
   'Not with this plugin. It is a one-way Figma → PPTX exporter, deliberately doing one job well. Several import-focused plugins exist for the opposite direction.'],
]);

export default {
  path: '/export-figma-to-powerpoint/',
  title: 'How to Export Figma to PowerPoint (Editable, 2026 Guide)',
  description: 'Three ways to get Figma frames into PowerPoint — plugin, manual PNG export and SVG copy-paste — compared honestly, with the trade-offs of each and a step-by-step editable export.',
  h1: 'How to Export Figma to PowerPoint — Step by Step',
  lede: 'There are three real ways to do this, and only one keeps your text editable. Here is all three, honestly compared, so you can pick the one that matches your deadline.',
  schemas: [f.schema, howTo('Export Figma frames to an editable PowerPoint deck', steps)],
  body: `
  <section>
    <div class="wrap">
      <span class="kicker">Method 1 — recommended</span>
      <h2>Export with the plugin (text stays editable)</h2>
      <p class="dim">Four steps, about six seconds for a five-slide deck, and the result is a .pptx your client can retype in.</p>
      <div class="grid-3">
        <div class="card">
          <span class="step-num">1</span>
          <h3>Install</h3>
          <p>Open the plugin on Figma Community and click <strong>Open in Figma</strong>. No account, no email, no API key — your first 3 exports each month are free.</p>
        </div>
        <div class="card">
          <span class="step-num">2</span>
          <h3>Select frames</h3>
          <p>Select the frames you want as slides and run <strong>Plugins → PPTX Export</strong>. You see thumbnails in slide order plus a pre-count — "18 texts · 9 shapes · 5 images" — before you spend an export.</p>
        </div>
        <div class="card">
          <span class="step-num">3</span>
          <h3>Pick a mode</h3>
          <p>Exact look + editable text (default), fully editable native objects, or pixel-perfect images. The trade-offs are spelled out in the UI.</p>
        </div>
      </div>
      <div class="grid-3" style="margin-top:20px">
        <div class="card">
          <span class="step-num">4</span>
          <h3>Export &amp; download</h3>
          <p>Staged progress bar — frames → fonts → convert → package — then your <code class="key">.pptx</code> downloads. Slides come out in the same order as your frames.</p>
        </div>
        <div class="card">
          <span class="step-num">5</span>
          <h3>Read the report</h3>
          <p>Before you send the deck on, glance at the conversion report: what stayed native, what was rasterized and why, which fonts were embedded or remapped. <a href="/conversion-report/">More on the report →</a></p>
        </div>
        <div class="card">
          <span class="step-num">6</span>
          <h3>Open anywhere</h3>
          <p>PowerPoint 2016+, Microsoft 365, PowerPoint for Mac and the web, Keynote, or <a href="/figma-to-google-slides/">Google Slides</a>. No repair dialog.</p>
        </div>
      </div>
      <div style="margin-top:2.4em">${cta('Skip the manual work — install the plugin')}</div>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <div class="feature">
        <div class="feature-copy">
          <span class="kicker">Method 2 — no plugin</span>
          <h2>Export PNGs and place them on slides</h2>
          <p>Select your frames in Figma, set an export preset (2× PNG is the usual choice), export the images, then in PowerPoint use <strong>Insert → Pictures</strong> and stretch each image to fill a slide.</p>
          <p><strong>When this is fine:</strong> the deck is read-only, you are presenting it yourself, and nobody downstream needs to change a word.</p>
          <p><strong>What you lose:</strong> everything. Text is pixels — not selectable, not searchable, not translatable, not screen-reader accessible, and unfixable when someone spots a typo five minutes before the meeting. Corporate template compliance is impossible because there are no real objects to restyle. And the file gets heavy fast: full-bleed 2× PNGs add up quickly.</p>
          <p class="dim">This is what most "Figma to PowerPoint" tools quietly do for you — the result is the same stack of screenshots, just automated.</p>
        </div>
        <figure class="feature-media">
          <img src="/assets/carousel-2.png" alt="An exported slide with live typography rendered from embedded fonts" width="1920" height="1080">
          <figcaption>The plugin route keeps type live; the PNG route freezes it.</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <span class="kicker">Method 3 — the tempting one</span>
      <h2>Copy as SVG and paste into PowerPoint</h2>
      <p class="dim">Figma can copy a selection as SVG, and PowerPoint can paste SVG and even "convert to shape". It sounds like the free lunch. It is not.</p>
      <ul class="dim" style="max-width:760px">
        <li><strong>Text becomes outlines or breaks.</strong> Once converted to shapes, letters are vector paths — you cannot retype them, and font substitution is no longer even a question because there is no font left.</li>
        <li><strong>Images inside the selection go missing or turn into placeholders</strong>, since raster fills do not survive the clipboard round trip cleanly.</li>
        <li><strong>Groups explode.</strong> A single frame can arrive as hundreds of ungrouped shapes, which makes the deck slow to open and miserable to edit.</li>
        <li><strong>Effects drop.</strong> Shadows, blurs and blend modes render differently or vanish.</li>
      </ul>
      <p class="dim">It can work for one simple logo or icon. For a deck, it creates more cleanup than it saves.</p>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2 class="center">The three methods side by side</h2>
      <div class="table-scroll">
        <table class="compare">
          <thead>
            <tr><th></th><th>Plugin</th><th>PNG export</th><th>SVG paste</th></tr>
          </thead>
          <tbody>
            <tr><td>Editable text</td><td class="yes">Yes — real text boxes</td><td>No</td><td>No — outlines</td></tr>
            <tr><td>Native shapes</td><td class="yes">Yes</td><td>No</td><td>Partly, ungrouped</td></tr>
            <tr><td>Fonts on a machine without them</td><td class="yes">Embedded or honestly remapped</td><td>Not applicable — it is a picture</td><td>Not applicable — outlined</td></tr>
            <tr><td>Effort for a 20-slide deck</td><td class="yes">One click</td><td>20 exports + 20 placements</td><td>Hours of cleanup</td></tr>
            <tr><td>Visual fidelity</td><td class="yes">Exact (exact-look mode)</td><td class="yes">Exact</td><td>Drifts</td></tr>
            <tr><td>File size</td><td class="yes">Optimized by default</td><td>Large</td><td>Bloated by shape count</td></tr>
            <tr><td>Cost</td><td class="yes">3 free exports/month</td><td>Free</td><td>Free</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <h2 class="center">Troubleshooting</h2>
      <div style="max-width:760px;margin:0 auto">
      ${f.html}
      </div>
      <p class="center dim" style="margin-top:2em">Related: <a href="/figma-to-pptx/">What is inside the .pptx</a> · <a href="/figma-slides-to-powerpoint-editable/">Exporting from Figma Slides</a> · <a href="/figma-presentation-export/">All Figma presentation export options</a></p>
    </div>
  </section>
`,
};
