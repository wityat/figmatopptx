import { faq } from './_shared.mjs';

const f = faq([
  ['Is .pptx the same as .ppt?',
   'No. <code class="key">.ppt</code> is the pre-2007 binary format; <code class="key">.pptx</code> is the modern Office Open XML package (a ZIP of XML parts) that every current version of PowerPoint, Keynote and Google Slides reads. We write <code class="key">.pptx</code> because that XML is what makes shapes and text boxes editable in the first place — the old binary format could not carry native gradients or embedded font parts the same way.'],
  ['Which PowerPoint versions can open the file?',
   'PowerPoint 2016 and newer on Windows, PowerPoint for Mac, PowerPoint on the web, Microsoft 365, Keynote and Google Slides. The generated package targets the standard OOXML presentation schema — no proprietary extensions, no macros.'],
  ['Will PowerPoint show the "repair" dialog?',
   'It should not. Every build is run against a fixture suite of 16 synthetic decks plus a 10-deck stress set, opened through a real PowerPoint 16.0 COM instance — a file that triggers the repair prompt fails the build. If you ever hit a repair dialog, mail the deck to ttrttr449@gmail.com and it becomes a fixture.'],
  ['How big is the exported file?',
   'A typical 5-slide deck lands under 5&nbsp;MB in about 6 seconds. File-size optimization is on by default: photos are recompressed just enough to keep the deck light without visible loss. Photo-heavy decks get much bigger — a 54-frame deck with full-bleed imagery measured 55.8&nbsp;MB with optimization on. You can switch optimization off when you want maximum fidelity.'],
  ['Are the fonts really inside the file?',
   'Yes, when embedding applies. The font bytes are written into the package as font parts — the same mechanism PowerPoint itself uses for "embed fonts in file". Eight popular families ship with the plugin; for anything else you upload a <code class="key">.ttf</code> and it gets embedded too. The <a href="/tools/font-compatibility-checker/">font compatibility checker</a> tells you what happens to your specific typeface.'],
]);

export default {
  path: '/figma-to-pptx/',
  title: 'Figma to PPTX — Convert Frames to a Real .pptx File',
  description: 'What is actually inside the .pptx this plugin generates: native text boxes, real shape XML, embedded font parts, and PNG only as a labelled fallback. Opens without repair dialogs.',
  h1: 'Figma to PPTX: a Real .pptx File, Not Pictures in a Wrapper',
  lede: 'Plenty of tools hand you a file with a <strong>.pptx</strong> extension. Far fewer hand you a .pptx whose <strong>insides</strong> are PowerPoint objects. Here is exactly what gets written into the package.',
  schemas: [f.schema],
  body: `
  <section>
    <div class="wrap">
      <span class="kicker">Layer by layer</span>
      <h2>What your Figma layers become</h2>
      <p class="dim">The converter walks your frame tree and maps each node to the closest native PowerPoint object. Where no honest native mapping exists, the node becomes a crisp PNG — <strong>and the reason is written into the report</strong>, never swallowed.</p>
      <div class="table-scroll">
        <table class="compare">
          <thead>
            <tr><th>Figma layer</th><th>Becomes in the .pptx</th><th>What survives</th></tr>
          </thead>
          <tbody>
            <tr><td>Text</td><td class="yes">Native text box</td><td>Font family, size, weight, italic, colour, alignment, line spacing, bullet lists, hyperlinks</td></tr>
            <tr><td>Rectangle, Ellipse</td><td class="yes">Native shape</td><td>Solid fills, linear / radial / diamond gradients, strokes, corner radius, drop shadow</td></tr>
            <tr><td>Line</td><td class="yes">Native line</td><td>Colour, weight, dash pattern — as long as the stroke is solid</td></tr>
            <tr><td>Vector of straight segments</td><td class="yes">Native polyline</td><td>Arrows, ticks, dividers and triangle outlines stay vector</td></tr>
            <tr><td>Polygon / Star, standard point count</td><td class="yes">Native preset shape</td><td>Triangle, diamond, pentagon, hexagon, heptagon, octagon; 4- to 12-point stars</td></tr>
            <tr><td>Image fill</td><td class="yes">Embedded picture</td><td>Position and crop; optionally recompressed to keep the deck light</td></tr>
            <tr><td>Frame / Group</td><td class="yes">Walked through</td><td>Children convert individually — the container is not flattened</td></tr>
            <tr><td>Curved or filled vector, mask, blur, inner shadow, blend mode, conic gradient</td><td>High-resolution PNG</td><td>Exact appearance, <strong>plus a report line naming the node and the reason</strong></td></tr>
          </tbody>
        </table>
      </div>
      <p class="dim" style="margin-top:1.4em">That last row is the honest part. Every exporter has the same limits — OOXML simply has no equivalent for a conic gradient or a Figma mask. The difference is whether the tool <em>tells you</em>. <a href="/conversion-report/">See what the report looks like →</a></p>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <div class="feature">
        <div class="feature-copy">
          <span class="kicker">Valid packages only</span>
          <h2>No repair dialog. That is a test, not a promise.</h2>
          <p>A malformed .pptx is the classic failure of Figma-to-PowerPoint converters: the file downloads, PowerPoint opens it, and you get <em>"PowerPoint found a problem with content."</em> At that moment the deck is worthless to your client.</p>
          <p>So file validity is enforced in the build, not hoped for. Every release runs against <strong>16 synthetic fixtures plus a 10-deck stress suite</strong> — gradients, rotated text, nested masks, full-bleed photo backgrounds, hundreds of nodes per frame — and each generated file is opened through a <strong>real PowerPoint 16.0 COM instance</strong>. A repair prompt fails the build.</p>
          <p>The package itself is plain Office Open XML: a ZIP holding <code class="key">presentation.xml</code>, one <code class="key">slideN.xml</code> per frame, media parts for images and font parts for embedded typefaces. No macros, no proprietary extensions, nothing that needs our software to read.</p>
        </div>
        <figure class="feature-media">
          <img src="/assets/render-slide1.png" alt="A slide rendered straight from an exported .pptx file, with correct typography and layout" width="1920" height="1080">
          <figcaption>Rendered from the exported .pptx — no touch-ups, no repair prompt.</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <h2 class="center">Slide geometry, done properly</h2>
      <p class="section-intro">PowerPoint measures slides in EMU — 914,400 English Metric Units per inch. Figma measures in pixels. Getting that conversion wrong is why exported decks so often arrive with stray white margins.</p>
      <div class="grid-3">
        <div class="card">
          <h3>Frame → slide</h3>
          <p>Each selected frame becomes one slide, in the order you selected them. The slide canvas follows your frame's aspect ratio, so a 1920×1080 frame fills a 16:9 slide edge to edge.</p>
        </div>
        <div class="card">
          <h3>Pixels → EMU</h3>
          <p>Every position and size goes through the same coordinate space, so a box that sat 40&nbsp;px from the left edge in Figma lands at the matching fraction of the slide in PowerPoint.</p>
        </div>
        <div class="card">
          <h3>Need the numbers?</h3>
          <p>The free <a href="/tools/slide-size-calculator/">slide size calculator</a> converts px ↔ inches ↔ cm ↔ EMU for every common preset, so your frames match the deck before you export.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2 class="center">Frequently asked</h2>
      <div style="max-width:760px;margin:0 auto">
      ${f.html}
      </div>
      <p class="center dim" style="margin-top:2em">Related: <a href="/convert-figma-to-ppt/">Convert Figma to PPT</a> · <a href="/figma-export-editable-pptx/">How honest conversion works</a> · <a href="/export-figma-to-powerpoint/">Step-by-step export guide</a></p>
    </div>
  </section>
`,
};
