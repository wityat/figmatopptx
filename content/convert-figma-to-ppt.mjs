import { faq, cta } from './_shared.mjs';

const f = faq([
  ['Do you output .ppt or .pptx?',
   'We write <code class="key">.pptx</code>. It is what PowerPoint 2016+, Microsoft 365, PowerPoint for Mac and web, Keynote and Google Slides all read, and it is the format that can carry editable shapes and embedded fonts. If someone specifically demands the ancient <code class="key">.ppt</code>, open our file in PowerPoint and use Save As.'],
  ['Is it really free?',
   'Three exports every month, free forever, with no signup, no email and no watermark — full quality and the full report. Failed exports do not count against the quota, and it resets on the 1st. Unlimited exports are $12/month or $69/year.'],
  ['Where does my design go?',
   'Nowhere. Conversion happens inside Figma on your machine. The plugin is published with <strong>no network access at all</strong> — a badge Figma shows on the plugin page, which we cannot fake.'],
  ['How long does a conversion take?',
   'About six seconds for a five-slide deck. Photo-heavy decks take longer, mostly spent rendering image fills; the progress bar shows which stage you are in rather than a fake percentage.'],
  ['What if the result is not good enough?',
   'Read the conversion report — it names every node that could not convert natively and why. Usually the fix is small: flatten a mask, swap a conic gradient for a linear one, or upload your .ttf. And since failed exports do not burn quota, retrying costs nothing.'],
]);

export default {
  path: '/convert-figma-to-ppt/',
  title: 'Convert Figma to PPT — Free Figma to PowerPoint Converter',
  description: 'Convert Figma designs to PowerPoint without uploading anything. Runs inside Figma, three free conversions a month, no signup, and a report telling you exactly what converted.',
  h1: 'Convert Figma Designs to PPT — Free, No Signup',
  lede: 'No account. No email. No file upload. Open Figma, run the plugin, get a <strong>.pptx</strong> — three conversions a month, free, with the text still editable.',
  schemas: [f.schema],
  body: `
  <section>
    <div class="wrap center">
      <h2>Three clicks from frames to a deck</h2>
      <p class="section-intro">The converter lives inside Figma, so there is nothing to upload and nothing to sign up for. Select frames → Export to PPTX → download.</p>
      ${cta('Get the free converter plugin')}
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <span class="kicker">Pre-flight check</span>
      <h2>Will your deck convert cleanly?</h2>
      <p class="dim" style="max-width:760px">Tick whatever your design uses. This is the same rule set the converter applies when it decides between a native PowerPoint object and a labelled picture — so you know the answer before you spend an export.</p>

      <div class="preflight">
        <div class="preflight-form">
          <label><input type="checkbox" data-k="text"> Text layers</label>
          <label><input type="checkbox" data-k="shapes"> Rectangles, ellipses, lines</label>
          <label><input type="checkbox" data-k="lineargrad"> Linear or radial gradients</label>
          <label><input type="checkbox" data-k="images"> Photos / image fills</label>
          <label><input type="checkbox" data-k="icons"> Icons drawn as vectors</label>
          <label><input type="checkbox" data-k="masks"> Masks or clipped groups</label>
          <label><input type="checkbox" data-k="blur"> Blur effects</label>
          <label><input type="checkbox" data-k="innershadow"> Inner shadows</label>
          <label><input type="checkbox" data-k="blend"> Blend modes (multiply, overlay…)</label>
          <label><input type="checkbox" data-k="conic"> Angular / conic gradients</label>
          <label><input type="checkbox" data-k="customfont"> A font that is not Arial/Calibri/Georgia…</label>
        </div>
        <div class="preflight-out" id="pfOut" aria-live="polite">
          <p class="dim">Tick a few boxes to see what the converter would do.</p>
        </div>
      </div>
      <p class="dim" style="margin-top:1.2em;font-size:0.92rem">Nothing is sent anywhere — this runs in your browser, like the plugin runs in yours.</p>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="feature">
        <div class="feature-copy">
          <span class="kicker">Why there is no "upload your file here"</span>
          <h2>A converter you do not have to trust with your design</h2>
          <p>Most web converters ask you to upload the thing you are trying to protect. For a personal moodboard, fine. For an unreleased product, a client's brand refresh, an investor deck under NDA — that upload is a decision someone in legal would like to have been asked about.</p>
          <p>This converter runs where your design already lives. The plugin is published with <strong>no network access</strong>, so it is not a promise in a privacy policy — it is a permission the plugin does not hold. Figma displays that badge on the plugin page; go look.</p>
          <p>The practical upside: no queue, no upload time, no file-size limit imposed by someone's server, and nothing to delete afterwards.</p>
        </div>
        <figure class="feature-media">
          <img src="/assets/carousel-1.png" alt="The conversion report screen listing editable text boxes, embedded fonts and rasterized nodes" width="1920" height="1080">
          <figcaption>Every conversion ends with a report, not a mystery file.</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="alt">
    <div class="wrap center">
      <h2>Free vs Pro</h2>
      <p class="section-intro">The free tier is a real tier, not a demo: full quality, full report, embedded fonts, no watermark.</p>
      <div class="pricing-grid">
        <div class="plan">
          <h3>Free</h3>
          <p class="price">$0</p>
          <p class="price-alt">forever</p>
          <ul>
            <li><strong>3 conversions per month</strong></li>
            <li>Full quality and full report</li>
            <li>Embedded fonts, no watermark</li>
            <li>Failed exports do not count</li>
          </ul>
        </div>
        <div class="plan highlight">
          <h3>Pro</h3>
          <p class="price">$12<small>/month</small></p>
          <p class="price-alt">or $69/year — save 52%</p>
          <ul>
            <li><strong>Unlimited conversions</strong></li>
            <li>Everything in Free</li>
            <li>License key, no account needed</li>
          </ul>
        </div>
      </div>
      <p style="margin-top:2em"><a class="btn btn-secondary" href="/pro.html">Compare Free vs Pro →</a></p>
    </div>
  </section>

  <section>
    <div class="wrap">
      <h2 class="center">Frequently asked</h2>
      <div style="max-width:760px;margin:0 auto">
      ${f.html}
      </div>
      <p class="center dim" style="margin-top:2em">Related: <a href="/figma-to-pptx/">What is inside the .pptx</a> · <a href="/conversion-report/">The conversion report</a> · <a href="/pitchdeck-alternative/">Comparing the paid alternatives</a></p>
    </div>
  </section>

  <script>
  (function () {
    var NATIVE = {
      text: 'Text layers → native PowerPoint text boxes. Font, size, weight, colour, alignment, bullets and links all survive; your client can retype them.',
      shapes: 'Rectangles, ellipses and straight lines → native shapes with their fills, strokes, corner radii and drop shadows.',
      lineargrad: 'Linear, radial and diamond gradients → native PowerPoint gradient fills. No picture needed.',
      images: 'Photos → embedded pictures, recompressed by default so the deck stays light.',
      icons: 'Icons made of straight segments → native polylines. Curved or filled vector art is rasterized instead (with a reason).'
    };
    var RASTER = {
      masks: 'Masks and clipped groups → the group becomes one crisp PNG. PowerPoint has no equivalent of a Figma mask.',
      blur: 'Blur effects → PNG. Layer and background blur cannot be expressed in the PowerPoint format.',
      innershadow: 'Inner shadows → PNG. Only drop shadow has a native equivalent.',
      blend: 'Non-normal blend modes → PNG, because the blend result cannot be recomputed by PowerPoint.',
      conic: 'Angular (conic) gradients → PNG. Linear, radial and diamond gradients stay native; conic has no DrawingML equivalent.'
    };
    var out = document.getElementById('pfOut');
    var boxes = [].slice.call(document.querySelectorAll('.preflight-form input'));
    function render() {
      var native = [], raster = [], font = false;
      boxes.forEach(function (b) {
        if (!b.checked) return;
        var k = b.getAttribute('data-k');
        if (k === 'customfont') { font = true; return; }
        if (NATIVE[k]) native.push(NATIVE[k]);
        if (RASTER[k]) raster.push(RASTER[k]);
      });
      if (!native.length && !raster.length && !font) {
        out.innerHTML = '<p class="dim">Tick a few boxes to see what the converter would do.</p>';
        return;
      }
      var html = '';
      if (native.length) {
        html += '<h3 class="pf-ok">✓ Converts natively — stays editable</h3><ul>' +
          native.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>';
      }
      if (raster.length) {
        html += '<h3 class="pf-warn">⚠ Becomes a picture — and the report says why</h3><ul>' +
          raster.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>';
      }
      if (font) {
        html += '<h3 class="pf-font">Aa Fonts</h3><ul><li>Eight popular families are bundled and embedded into the .pptx automatically. Anything else: upload the .ttf and it is embedded too, or let the plugin remap it to a PowerPoint-safe family and name the swap in the report. <a href="/tools/font-compatibility-checker/">Check your font →</a></li></ul>';
      }
      if (raster.length) {
        html += '<p class="dim pf-note">Rasterized nodes still look exactly right — you simply cannot edit them. Every one is listed by name and reason in the report after the export.</p>';
      } else {
        html += '<p class="dim pf-note">Nothing in that list forces a rasterization. This deck should come out fully editable.</p>';
      }
      out.innerHTML = html;
    }
    boxes.forEach(function (b) { b.addEventListener('change', render); });
  })();
  </script>
`,
};
