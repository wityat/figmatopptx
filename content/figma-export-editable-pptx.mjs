import { faq } from './_shared.mjs';

const f = faq([
  ['Why not convert everything to native shapes?',
   'Because some things have no native equivalent, and faking them produces a deck that looks wrong. A Figma mask, a layer blur, an inner shadow, a conic gradient and a multiply blend cannot be expressed in the PowerPoint drawing model. The choice is between an exact picture with a written reason, or a native object that renders differently from your design. We pick the picture and tell you.'],
  ['Which gradients stay native?',
   'Linear, radial and diamond gradients become native PowerPoint gradient fills, including on rectangles, ellipses and frame backgrounds. Angular (conic) gradients have no equivalent in the format and are rasterized.'],
  ['What is an EOT and why does it appear in font embedding?',
   'PowerPoint embeds typefaces in a compact font format inside the package. The plugin converts your TTF into that form before writing it in, which is why the deck renders with your typography on a machine that never had the font installed.'],
  ['Do you support variable fonts?',
   'A variable font is embedded as the concrete styles used in your frames — regular, bold, italic, bold italic. Arbitrary intermediate weights are matched to the nearest embedded style rather than silently dropped.'],
  ['What happens to a node type you have never seen?',
   'It becomes a picture with the reason "unsupported node type", rather than throwing an error and losing your export. New Figma features degrade gracefully instead of breaking the run.'],
]);

export default {
  path: '/figma-export-editable-pptx/',
  title: 'Figma Export to Editable PPTX — How Real Conversion Works',
  description: 'The anatomy of an honest Figma to PowerPoint conversion: which nodes become native objects, which become pictures and why, and how fonts get embedded into the file.',
  h1: 'Editable PPTX from Figma: How Honest Conversion Actually Works',
  lede: 'Every converter faces the same wall — the PowerPoint format cannot express everything Figma can draw. What separates them is what they do <strong>at</strong> that wall.',
  schemas: [f.schema],
  body: `
  <section>
    <div class="wrap">
      <span class="kicker">The anatomy</span>
      <h2>Three outcomes, and a rule for each</h2>
      <p class="dim" style="max-width:760px">The converter walks your frame tree node by node. Each node ends up in exactly one of three states, decided by a fixed rule set rather than by guesswork — the same rules you can preview in the <a href="/convert-figma-to-ppt/">pre-flight checklist</a>.</p>

      <div class="grid-3">
        <div class="card">
          <h3 style="color:var(--ok)">✓ Native object</h3>
          <p>Text, rectangles, ellipses, straight lines, straight-segment vectors, standard polygons and stars, image fills. These become PowerPoint objects with their fills, strokes, radii, gradients and drop shadows intact.</p>
        </div>
        <div class="card">
          <h3 style="color:var(--accent)">⚠ Picture, with a reason</h3>
          <p>Masks, blurs, inner shadows, blend modes, conic gradients, curved or filled vector art, text with a non-solid fill. Rendered at high resolution so it looks exact — and named in the report.</p>
        </div>
        <div class="card">
          <h3>Aa Font decision</h3>
          <p>Every family used lands in one of three baskets: embedded, honestly remapped, or "needs your file". No family passes through unexamined.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2 class="center">The exact reasons a node becomes a picture</h2>
      <p class="section-intro">These are the real strings the converter writes into your report. Not marketing categories — the actual decision points.</p>
      <div class="table-scroll">
        <table class="compare">
          <thead>
            <tr><th>Reason in the report</th><th>What triggered it</th><th>What you can do</th></tr>
          </thead>
          <tbody>
            <tr><td><code class="key">mask node</code></td><td>The layer is a mask, or its group contains one</td><td>Flatten the masked group in Figma if you need it editable</td></tr>
            <tr><td><code class="key">blend mode …</code></td><td>Anything other than Normal / Pass-through</td><td>Bake the blend into the artwork, or accept the picture</td></tr>
            <tr><td><code class="key">blur effect</code></td><td>Layer blur or background blur</td><td>No native equivalent — keep it as a picture</td></tr>
            <tr><td><code class="key">inner shadow</code></td><td>Inner shadow effect (drop shadow is native)</td><td>Swap to a drop shadow where the design allows</td></tr>
            <tr><td><code class="key">angular gradient fill</code></td><td>Conic gradient</td><td>Use linear or radial — both convert natively</td></tr>
            <tr><td><code class="key">text with non-solid fill</code></td><td>A gradient or image fill on a text layer</td><td>Solid-fill the text to keep it editable</td></tr>
            <tr><td><code class="key">complex vector (curves or filled geometry)</code></td><td>Bezier curves or filled vector art</td><td>Expected — logos and illustrations belong as pictures</td></tr>
            <tr><td><code class="key">unsupported POLYGON pointCount N</code></td><td>A point count with no PowerPoint preset</td><td>Use a standard polygon or star count</td></tr>
            <tr><td><code class="key">unsupported node type …</code></td><td>A node type the converter has not met</td><td>Nothing — it degrades safely instead of failing</td></tr>
          </tbody>
        </table>
      </div>
      <p class="dim center" style="margin-top:1.4em">Every line names the layer, so you can find it in Figma in seconds.</p>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="feature">
        <div class="feature-copy">
          <span class="kicker">Fonts, in three baskets</span>
          <h2>How your typography actually gets into the file</h2>
          <p><strong>Embedded.</strong> The real font bytes are written into the .pptx as font parts. Eight popular families ship with the plugin — Inter, Roboto, Montserrat, Poppins, Open Sans, Lato, Nunito and DM Sans — and any other typeface is embedded once you upload its <code class="key">.ttf</code>. The deck then renders correctly on a machine that has never installed it.</p>
          <p><strong>Remapped.</strong> No bytes available, but a sensible PowerPoint-safe substitute exists — Inter → Calibri, Montserrat → Trebuchet MS, Helvetica → Arial, Playfair Display → Georgia. The report prints the swap as <em>from → to</em>. There is also a Cyrillic safeguard: if the text contains Cyrillic and the chosen face is not guaranteed to cover it, the converter forces a family that does, so your text never arrives as a row of empty boxes.</p>
          <p><strong>Needs your file.</strong> Not PowerPoint-safe and no known mapping. The plugin says so plainly and offers the upload, rather than writing a font name into the file and hoping.</p>
          <p><a href="/tools/font-compatibility-checker/">Look up your own font →</a></p>
        </div>
        <figure class="feature-media">
          <img src="/assets/carousel-3.png" alt="Font panel in the plugin showing families marked as embedded before export" width="1920" height="1080">
          <figcaption>Fonts are resolved before the export runs, not after it fails.</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2 class="center">Limits, stated up front</h2>
      <p class="section-intro">A list every converter should publish and almost none do.</p>
      <ul class="dim" style="max-width:760px;margin:0 auto">
        <li>Conic gradients, masks, blurs, inner shadows and non-normal blend modes are pictures. This is a format limitation, not a roadmap item.</li>
        <li>Curved and filled vector artwork is rasterized; only straight-segment vectors become native polylines.</li>
        <li>Figma prototype interactions, transitions and Figma Slides speaker notes do not exist in .pptx and are not carried over.</li>
        <li>Google Slides ignores embedded fonts — see <a href="/figma-to-google-slides/">the Google Slides page</a> for what to do instead.</li>
        <li>Photo-heavy decks produce large files. Optimization is on by default; turn it off only when you want maximum fidelity.</li>
      </ul>
    </div>
  </section>

  <section>
    <div class="wrap">
      <h2 class="center">Frequently asked</h2>
      <div style="max-width:760px;margin:0 auto">
      ${f.html}
      </div>
      <p class="center dim" style="margin-top:2em">Related: <a href="/conversion-report/">The conversion report explained</a> · <a href="/figma-to-pptx/">What is inside the .pptx</a> · <a href="/pitchdeck-alternative/">How this compares to the paid studios</a></p>
    </div>
  </section>
`,
};
