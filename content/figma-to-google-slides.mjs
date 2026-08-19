import { faq, howTo } from './_shared.mjs';

const steps = [
  { name: 'Export an editable .pptx from Figma', text: 'Select your frames, run the PPTX Export plugin and download the .pptx. Google Slides has no Figma importer, so the .pptx is the bridge.' },
  { name: 'Open Google Slides', text: 'Create a new presentation or open the deck you want the slides to land in.' },
  { name: 'Import the slides', text: 'Choose File, then Import slides, then Upload, and drop in the .pptx you just exported.' },
  { name: 'Pick the slides and keep the theme', text: 'Select all slides and leave Keep original theme ticked so your design is not restyled by the Google template.' },
];

const f = faq([
  ['Is there a direct Figma → Google Slides plugin?',
   'No plugin writes into Google Slides natively — Google does not expose that kind of write access to a Figma plugin. Every tool that claims "Figma to Google Slides" either goes through a .pptx like this one, or asks you to sign in and hand your design to their server. We go through the .pptx and keep your file on your machine.'],
  ['Do embedded fonts work in Google Slides?',
   'No, and no exporter can change that — Google Slides ignores embedded font parts and renders with fonts from its own library. This is the one place where our font embedding does not help. If Google Slides is your final destination, use a family Google has (or let the plugin remap to a safe family) rather than an exotic licensed typeface. If PowerPoint or Keynote is the destination, embedding works and your typography travels.'],
  ['Will the slides be editable in Google Slides?',
   'Text boxes stay real text and shapes stay real shapes, so yes — click and retype. Anything the report listed as rasterized arrives as a picture in Google Slides too, exactly as it did in PowerPoint.'],
  ['Why do my images look softer after import?',
   'Google Slides downscales very large image fills on import. Exporting with file-size optimization on keeps images closer to the size Slides is happy with, so there is less resampling.'],
  ['Can I just upload the .pptx to Drive instead?',
   'Yes. Drop the .pptx into Google Drive and open it with Google Slides — it converts on open. Use File → Import slides when you want the slides merged into an existing deck instead of a new one.'],
]);

export default {
  path: '/figma-to-google-slides/',
  title: 'Figma to Google Slides — the Editable Way (via PPTX)',
  description: 'Google Slides has no Figma importer, but it reads .pptx natively. Export an editable .pptx from Figma, import it into Slides, and keep your text and shapes live.',
  h1: 'How to Get Figma Frames into Google Slides — Editable',
  lede: 'Google Slides cannot open a Figma file. It <strong>can</strong> open a .pptx. So the honest route is a real editable .pptx in the middle — and that is the part most tools get wrong.',
  schemas: [f.schema, howTo('Import Figma frames into Google Slides as editable slides', steps)],
  body: `
  <section>
    <div class="wrap">
      <span class="kicker">The route</span>
      <h2>Figma → .pptx → Google Slides</h2>
      <p class="dim">Four steps. The only part that needs a tool is the first one — and it is the part that decides whether your text is still text at the end.</p>
      <div class="grid-3">
        <div class="card">
          <span class="step-num">1</span>
          <h3>Export from Figma</h3>
          <p>Select frames, run <strong>PPTX Export</strong>, download the .pptx. Use the default <em>exact look + editable text</em> mode, or <em>fully editable</em> if you want native shapes too.</p>
        </div>
        <div class="card">
          <span class="step-num">2</span>
          <h3>File → Import slides</h3>
          <p>In Google Slides open <strong>File → Import slides → Upload</strong> and drop in the .pptx.</p>
        </div>
        <div class="card">
          <span class="step-num">3</span>
          <h3>Keep the original theme</h3>
          <p>Select all slides and leave <strong>Keep original theme</strong> ticked — otherwise Slides restyles your design with its own template.</p>
        </div>
      </div>
      <p class="dim center" style="margin-top:1.6em">Prefer a whole new deck? Drop the .pptx into Google Drive and open it with Google Slides — same conversion, one less dialog.</p>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2 class="center">What survives the trip into Google Slides</h2>
      <p class="section-intro">Slides is not PowerPoint, and pretending otherwise is how people get burned. Here is the honest matrix.</p>
      <div class="table-scroll">
        <table class="compare">
          <thead>
            <tr><th>Element</th><th>In PowerPoint</th><th>In Google Slides</th></tr>
          </thead>
          <tbody>
            <tr><td>Text boxes</td><td class="yes">Editable</td><td class="yes">Editable</td></tr>
            <tr><td>Rectangles, ellipses, lines</td><td class="yes">Native shapes</td><td class="yes">Native shapes</td></tr>
            <tr><td>Linear / radial gradients</td><td class="yes">Native gradient</td><td class="yes">Native gradient</td></tr>
            <tr><td>Embedded fonts</td><td class="yes">Render from the file</td><td>Ignored — Slides uses its own font library</td></tr>
            <tr><td>Large image fills</td><td class="yes">As exported</td><td>Downscaled on import</td></tr>
            <tr><td>Rasterized nodes (masks, blurs, conic gradients)</td><td>Pictures, listed in the report</td><td>Pictures, same as in PowerPoint</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="feature">
        <div class="feature-copy">
          <span class="kicker">The font caveat, stated plainly</span>
          <h2>Embedding is our differentiator — and Google Slides is where it stops working</h2>
          <p>Font embedding is the reason this plugin exists: a .pptx that carries its own typefaces renders correctly on a machine that has never heard of Inter or Montserrat. PowerPoint and Keynote honour those embedded font parts. <strong>Google Slides does not.</strong></p>
          <p>No exporter can work around that, and any tool promising perfect custom typography inside Google Slides is overselling. What we can do is be useful about it: if Slides is your destination, pick a family Google also has, or let the plugin remap to a PowerPoint-safe family and tell you exactly which swap it made.</p>
          <p><a href="/tools/font-compatibility-checker/">Check your typeface →</a></p>
        </div>
        <figure class="feature-media">
          <img src="/assets/carousel-3.png" alt="Plugin export screen with a fonts panel showing which families will be embedded" width="1920" height="1080">
          <figcaption>Every font is accounted for before you export.</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2 class="center">Frequently asked</h2>
      <div style="max-width:760px;margin:0 auto">
      ${f.html}
      </div>
      <p class="center dim" style="margin-top:2em">Related: <a href="/export-figma-to-powerpoint/">Step-by-step PowerPoint export</a> · <a href="/figma-presentation-export/">Every Figma presentation export option</a> · <a href="/convert-figma-to-ppt/">Convert Figma to PPT</a></p>
    </div>
  </section>
`,
};
