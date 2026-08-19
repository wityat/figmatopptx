import { faq, howTo } from './_shared.mjs';

const steps = [
  { name: 'Open your Figma Slides deck', text: 'Each slide in a Figma Slides file is a frame on the canvas, which is exactly what the exporter works with.' },
  { name: 'Select the slides you want', text: 'Select the slide frames in the order you want them. The plugin shows thumbnails in that order before exporting.' },
  { name: 'Run PPTX Export and keep editable text', text: 'Use the default exact-look plus editable text mode, or fully editable if you want native shapes as well.' },
  { name: 'Check the report, then send the file', text: 'The report lists every rasterized node and every font that was embedded or remapped, so you know what your colleague can change.' },
];

const f = faq([
  ['Does Figma Slides export to PowerPoint on its own?',
   'Not to an editable one. Figma Slides can present, share a link and produce PDF and image exports. There is no built-in editable .pptx output — which is why this plugin exists.'],
  ['Will my slide order be preserved?',
   'Yes. Slides come out in the order you selected the frames, and the plugin shows you thumbnails in that order before you export so you can catch a mistake early.'],
  ['What about speaker notes?',
   'Speaker notes are not carried across. If your notes matter, keep them in the Figma file or paste them into PowerPoint after import — we would rather say so than let you discover it during a rehearsal.'],
  ['What happens to Figma Slides templates and layout grids?',
   'They are a Figma-side authoring aid. What exports is the rendered result: the text, shapes and images actually on the slide.'],
  ['Do interactive elements survive?',
   'No. Interactions, prototype links and slide transitions are Figma constructs with no equivalent in a .pptx. Hyperlinks on text do survive.'],
]);

export default {
  path: '/figma-slides-to-powerpoint-editable/',
  title: 'Figma Slides to PowerPoint — Keep Everything Editable',
  description: 'Figma Slides exports PDF and images, not editable PowerPoint. Here is how to turn a Figma Slides deck into a .pptx where the text is still text.',
  h1: 'Export Figma Slides to PowerPoint Without Losing Editability',
  lede: 'Built your deck in Figma Slides? Figma will give you a PDF or a pile of PNGs. Neither lets your colleague fix a typo. Here is how to keep the text live.',
  schemas: [f.schema, howTo('Export a Figma Slides deck to editable PowerPoint', steps)],
  body: `
  <section>
    <div class="wrap">
      <span class="kicker">Why this is even a problem</span>
      <h2>Figma Slides is a presenter, not an exporter</h2>
      <p class="dim" style="max-width:760px">Figma Slides gave designers a proper presentation mode — speaker view, transitions, a share link. What it did not give them is a way out to an editable file. The supported exports are PDF and images, so the moment your deck has to leave the Figma world and be <em>changed</em> by someone else, you are back to rebuilding slides by hand.</p>
      <p class="dim" style="max-width:760px">The good news is structural: <strong>in a Figma Slides file, each slide is a frame.</strong> That is precisely the unit this exporter converts — so a Slides deck needs no special handling. Select the slides, export, done.</p>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2 class="center">Four steps</h2>
      <div class="grid-3">
        <div class="card">
          <span class="step-num">1</span>
          <h3>Select the slide frames</h3>
          <p>In your Figma Slides file, select the slides you want to export, in the order you want them to appear.</p>
        </div>
        <div class="card">
          <span class="step-num">2</span>
          <h3>Run the plugin</h3>
          <p><strong>Plugins → PPTX Export.</strong> You get thumbnails in slide order and a content pre-count before anything is spent.</p>
        </div>
        <div class="card">
          <span class="step-num">3</span>
          <h3>Keep the text live</h3>
          <p>Stay on <em>exact look + editable text</em> for pixel-exact backgrounds with real text boxes on top, or pick <em>fully editable</em> for native shapes too.</p>
        </div>
      </div>
      <p class="center dim" style="margin-top:1.6em">Then read the report and send the file. <a href="/conversion-report/">What the report contains →</a></p>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="feature">
        <div class="feature-copy">
          <span class="kicker">"Editable" under a microscope</span>
          <h2>The word that gets abused most in this category</h2>
          <p>Almost every Figma-to-PowerPoint tool says "editable". Here is the test that settles it in three seconds: open the exported deck, double-click a headline, and try to type.</p>
          <ul>
            <li><strong>A real text box</strong> shows a caret. The text is selectable, searchable, spell-checkable, translatable and readable by a screen reader. Change the wording and the box reflows.</li>
            <li><strong>A picture of text</strong> shows selection handles around an image. You can move it and scale it. You cannot change a single letter.</li>
          </ul>
          <p>In exact-look mode this plugin puts <em>real text boxes</em> on top of a pixel-exact background, so you get both the fidelity of an image export and text your colleagues can edit. Anything that could not become an object is listed in the report by name and reason — never presented as if it converted.</p>
        </div>
        <figure class="feature-media">
          <img src="/assets/render-slide1.png" alt="A slide rendered from the exported .pptx with live, selectable typography" width="1920" height="1080">
          <figcaption>Exported slide — the headline is a text box, not a screenshot.</figcaption>
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
      <p class="center dim" style="margin-top:2em">Related: <a href="/figma-presentation-export/">All Figma export options compared</a> · <a href="/export-figma-to-powerpoint/">Step-by-step export guide</a> · <a href="/figma-to-google-slides/">Getting the deck into Google Slides</a></p>
    </div>
  </section>
`,
};
