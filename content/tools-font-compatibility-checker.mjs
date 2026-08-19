import { readFileSync } from 'node:fs';
import { faq } from './_shared.mjs';

const DATA = JSON.parse(readFileSync(new URL('../data/fonts.json', import.meta.url), 'utf8'));

const LABEL = {
  safe: 'Ships with PowerPoint',
  bundled: 'Embedded automatically',
  remapped: 'Remapped — or embed your file',
  'needs-file': 'Upload the .ttf to embed',
};

const rows = DATA.fonts.map((x) => {
  const target = x.verdict === 'remapped' ? x.to : x.verdict === 'needs-file' ? '—' : x.family;
  return `<tr><td>${x.family}</td><td class="${x.verdict === 'needs-file' ? '' : 'yes'}">${LABEL[x.verdict]}</td><td>${target}</td></tr>`;
}).join('\n            ');

const f = faq([
  ['Will Inter survive an export to PowerPoint?',
   'Yes — Inter is one of the eight families bundled with the plugin, so its actual font file is embedded into your .pptx and the deck renders in Inter on machines that have never installed it. Without embedding, Inter would be remapped to Calibri, which is what most exporters do silently.'],
  ['Why does PowerPoint change my fonts at all?',
   'A .pptx normally stores only the font <em>name</em>. When the file is opened on a machine without that font, PowerPoint substitutes something it does have — and the substitute has different metrics, so lines rewrap, headlines overflow and your layout drifts. Embedding the font file removes the guesswork.'],
  ['Which fonts are always safe?',
   'The families that ship with Windows and Office: Arial, Calibri, Cambria, Candara, Consolas, Courier New, Georgia, Segoe UI, Tahoma, Times New Roman, Trebuchet MS and Verdana. They also all carry full Cyrillic coverage, which is why the converter falls back to them when your text needs it.'],
  ['What about Cyrillic, Greek or CJK text?',
   'If your text contains Cyrillic and the face that would otherwise be written into the file is not guaranteed to cover it, the converter forces a family that does and records the swap. That prevents the classic failure where a deck arrives as rows of empty boxes. CJK typography needs a font that covers those scripts — embed it rather than relying on substitution.'],
  ['Can I embed any font I own?',
   'Technically the plugin will embed any <code class="key">.ttf</code> you upload. Whether you <em>may</em> is a licensing question: many commercial licences permit embedding in documents, some do not. Check your licence — the plugin does not police it for you.'],
  ['Do embedded fonts work in Google Slides?',
   'No. Google Slides ignores embedded font parts and renders from its own library. See <a href="/figma-to-google-slides/">the Google Slides page</a> for how to plan around that.'],
]);

export default {
  path: '/tools/font-compatibility-checker/',
  title: 'PowerPoint Font Checker — Will Your Figma Font Survive Export?',
  description: 'Type a font name and find out whether PowerPoint already has it, whether the plugin embeds it into your .pptx, or whether it gets remapped — and to what.',
  h1: 'Check if Your Font Is PowerPoint-Safe',
  lede: 'PowerPoint silently swaps fonts it does not have, and your layout drifts. Type a family below to see exactly what would happen to it.',
  navKey: '/tools/slide-size-calculator/',
  schemas: [f.schema],
  body: `
  <section>
    <div class="wrap">
      <div class="tool">
        <div class="tool-inputs tool-inputs-single">
          <label style="flex:1 1 320px">Font family
            <input type="text" id="fontq" list="fontlist" placeholder="Inter, Montserrat, Space Grotesk…" autocomplete="off">
          </label>
        </div>
        <datalist id="fontlist">
          ${DATA.fonts.map((x) => `<option value="${x.family}">`).join('\n          ')}
        </datalist>
        <div class="tool-out tool-out-single" id="verdict" aria-live="polite">
          <p class="dim">Start typing a font family used in your Figma file.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2 class="center">The three outcomes</h2>
      <div class="grid-3">
        <div class="card">
          <h3 style="color:var(--ok)">Embedded</h3>
          <p>The real font bytes go into the .pptx. Inter, Roboto, Montserrat, Poppins, Open Sans, Lato, Nunito and DM Sans are bundled with the plugin; any other typeface joins them once you upload its <code class="key">.ttf</code>.</p>
        </div>
        <div class="card">
          <h3 style="color:var(--accent)">Remapped</h3>
          <p>No font file available, so the family is swapped for the closest PowerPoint-safe one — and the report prints the swap as <em>from → to</em>. Never silent.</p>
        </div>
        <div class="card">
          <h3>Needs your file</h3>
          <p>Not a PowerPoint font and no built-in mapping. The plugin says so and offers the upload rather than writing a name into the file and hoping for the best.</p>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <h2 class="center">Popular Figma fonts and their PowerPoint fate</h2>
      <p class="section-intro">Straight from the converter's own mapping table — the same data the plugin uses at export time.</p>
      <div class="table-scroll">
        <table class="compare">
          <thead>
            <tr><th>Font family</th><th>What happens</th><th>Rendered as</th></tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
      <p class="dim center" style="margin-top:1.2em">Not on the list? Any font can be embedded — upload the <code class="key">.ttf</code> in the plugin and it goes into the file.</p>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2 class="center">Frequently asked</h2>
      <div style="max-width:760px;margin:0 auto">
      ${f.html}
      </div>
      <p class="center dim" style="margin-top:2em">Related: <a href="/tools/slide-size-calculator/">Slide size calculator</a> · <a href="/figma-export-editable-pptx/">How font embedding works</a> · <a href="/conversion-report/">The conversion report</a></p>
    </div>
  </section>

  <script>
  (function () {
    var FONTS = ${JSON.stringify(DATA.fonts)};
    var NOTES = ${JSON.stringify(DATA.verdicts)};
    var TITLES = ${JSON.stringify(LABEL)};
    var input = document.getElementById('fontq');
    var out = document.getElementById('verdict');

    function norm(s) { return String(s).toLowerCase().replace(/[^a-z0-9]/g, ''); }

    function find(q) {
      var n = norm(q);
      if (!n) return null;
      var exact = FONTS.filter(function (f) { return norm(f.family) === n; })[0];
      if (exact) return exact;
      return FONTS.filter(function (f) { return norm(f.family).indexOf(n) === 0; })[0] || null;
    }

    function render() {
      var q = input.value.trim();
      if (!q) {
        out.innerHTML = '<p class="dim">Start typing a font family used in your Figma file.</p>';
        return;
      }
      var hit = find(q);
      if (!hit) {
        out.innerHTML = '<h3 class="pf-font">' + q + ' — not in the built-in table</h3>' +
          '<p class="dim">' + NOTES['needs-file'] + '</p>' +
          '<p class="dim">Practically: upload the <code class="key">.ttf</code> once in the plugin and this font is embedded into every export, exactly like the bundled families.</p>';
        return;
      }
      var cls = hit.verdict === 'needs-file' ? 'pf-font' : (hit.verdict === 'remapped' ? 'pf-warn' : 'pf-ok');
      var head = hit.family + ' — ' + TITLES[hit.verdict];
      var body = '<p class="dim">' + NOTES[hit.verdict] + '</p>';
      if (hit.verdict === 'remapped') {
        body += '<p class="dim">Without a font file, your report will read <code class="key">' + hit.family + ' -&gt; ' + hit.to + '</code>. Upload the .ttf and it stays ' + hit.family + ' instead.</p>';
      }
      if (hit.verdict === 'bundled') {
        body += '<p class="dim">Nothing to do — regular and bold ship inside the plugin and are written into your .pptx automatically.</p>';
      }
      if (hit.verdict === 'safe') {
        body += '<p class="dim">Every machine with Office already has it, including full Cyrillic coverage. No embedding needed.</p>';
      }
      out.innerHTML = '<h3 class="' + cls + '">' + head + '</h3>' + body;
    }

    input.addEventListener('input', render);
    render();
  })();
  </script>
`,
};
