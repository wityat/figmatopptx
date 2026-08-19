import { faq } from './_shared.mjs';

const f = faq([
  ['Is this a Pitchdeck clone?',
   'No. Pitchdeck is a presentation studio — animations, video embeds, hosted web decks, analytics, remote control. This plugin does one job: turn Figma frames into an editable .pptx with fonts that travel and an honest report. Different products that happen to overlap on one export button.'],
  ['Can I use both?',
   'Plenty of people will. Present from Pitchdeck when the deck is a performance; export with this plugin when someone downstream has to edit the file. Neither one locks your design in.'],
  ['Do I need an account or a credit card to try this?',
   'Neither. Three exports a month are free forever, with no signup, no email and no watermark. Failed exports do not count against the quota.'],
  ['What does Pro cost here?',
   '$12 a month, or $69 a year. One product, one price, unlimited exports — no bundle to buy into and no per-seat maths.'],
  ['How do I move a workflow over?',
   'There is nothing to migrate. Install the plugin, select the same frames you would have exported before, and export. Your Figma file is untouched — no plugin data is written into it.'],
]);

export default {
  path: '/pitchdeck-alternative/',
  title: 'Pitchdeck Plugin Alternative — Editable PPTX with an Honest Report',
  description: 'A focused alternative to Pitchdeck Presentation Studio for one job: Figma frames to an editable PowerPoint with embedded fonts and a report of exactly what converted.',
  h1: 'Looking for a Pitchdeck Alternative? Same Job, Honest Conversion.',
  lede: 'Pitchdeck is a good product with a big surface area. If all you actually need is <strong>Figma → editable PowerPoint</strong>, you are paying for a studio to use one button.',
  schemas: [f.schema],
  body: `
  <section>
    <div class="wrap">
      <span class="kicker">Straight answer first</span>
      <h2>One job, done properly</h2>
      <p class="dim" style="max-width:760px">Pitchdeck Presentation Studio by Hypermatic has been in Figma Community since 2020 and is used by hundreds of thousands of designers. It is not a bad tool — it is a <em>broad</em> tool: animated web decks, video embeds, speaker notes, QR remote control, viewer analytics, exports to PDF, PowerPoint, Keynote, Google Slides and Canva.</p>
      <p class="dim" style="max-width:760px">This plugin is the opposite shape. It exports Figma frames to an editable <code class="key">.pptx</code>, embeds your fonts, and tells you the truth about what converted. That is the entire product — which is why it costs $12/month instead of studio pricing, and why the export path gets all the attention.</p>
      <div class="notice" style="max-width:760px">Competitor details on this page were checked on the vendor's public pages in <strong>July 2026</strong>. Features and pricing change — verify current details on <a href="https://www.hypermatic.com/pitchdeck/">hypermatic.com</a> before deciding.</div>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2 class="center">Side by side</h2>
      <div class="table-scroll">
        <table class="compare">
          <thead>
            <tr><th></th><th>PPTX Export (this plugin)</th><th>Pitchdeck Presentation Studio</th></tr>
          </thead>
          <tbody>
            <tr><td>Scope</td><td class="yes">Figma → editable PPTX, only</td><td>Full presentation studio, many formats</td></tr>
            <tr><td>Editable text by default</td><td class="yes">Yes — the default mode</td><td>An opt-in setting, labelled BETA when we checked</td></tr>
            <tr><td>Font embedding into the file</td><td class="yes">Yes — real font bytes in the .pptx</td><td>Docs advise installing the fonts on the target machine</td></tr>
            <tr><td>Post-export report</td><td class="yes">Every export — nodes, reasons, font swaps</td><td>Not found in the product; caveats live in the docs</td></tr>
            <tr><td>Free tier</td><td class="yes">3 full exports every month, forever</td><td>10 Pro trials, then static PDF only</td></tr>
            <tr><td>Price</td><td class="yes">$12/month or $69/year</td><td>Higher, and sold alongside a multi-plugin bundle</td></tr>
            <tr><td>Network access</td><td class="yes">None — the plugin cannot reach the internet</td><td>Hosted web decks and analytics require it</td></tr>
            <tr><td>Animations, video, hosted decks, analytics</td><td>No</td><td class="yes">Yes</td></tr>
            <tr><td>Keynote / Canva export</td><td>No (the .pptx opens in Keynote)</td><td class="yes">Yes, direct</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="feature">
        <div class="feature-copy">
          <span class="kicker">Stay with Pitchdeck if…</span>
          <h2>We are genuinely not the right tool for some of you</h2>
          <p>Buy or keep Pitchdeck if you need <strong>animated or interactive presentations</strong>, <strong>embedded video</strong>, a <strong>hosted web deck with a password and view analytics</strong>, <strong>speaker notes managed inside the plugin</strong>, <strong>direct Keynote or Canva output</strong>, or you already own their bundle and use several of their plugins.</p>
          <p>Those are real capabilities and we have none of them. Telling you that here costs us a few sign-ups and saves you a refund request — which is the same trade the conversion report makes after every export.</p>
        </div>
        <div class="feature-copy">
          <span class="kicker">Switch if…</span>
          <h2>What you get by narrowing the scope</h2>
          <p>Come here if your actual job is <strong>"make this Figma deck editable in PowerPoint and make the fonts survive"</strong>. You get editable text as the default rather than a beta toggle, font bytes written into the file so the deck renders on a machine that has never had Inter installed, and a report that names every node that had to become a picture.</p>
          <p>Plus a free tier you can actually work with — three full exports a month, forever, no card, no watermark — instead of a trial that expires into PDF-only.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2 class="center">Switching takes about a minute</h2>
      <div class="grid-3">
        <div class="card">
          <span class="step-num">1</span>
          <h3>Install</h3>
          <p>Open the plugin from Figma Community. Nothing to uninstall — both plugins can live in the same file.</p>
        </div>
        <div class="card">
          <span class="step-num">2</span>
          <h3>Export the same frames</h3>
          <p>Select the frames you already treat as slides and run the export. No project setup, no settings to port over.</p>
        </div>
        <div class="card">
          <span class="step-num">3</span>
          <h3>Compare the files</h3>
          <p>Open both .pptx files side by side and click into a headline. That is the whole evaluation.</p>
        </div>
      </div>
      <div style="max-width:760px;margin:2.6em auto 0">
      ${f.html}
      </div>
      <p class="center dim" style="margin-top:2em">Related: <a href="/figma-export-editable-pptx/">How honest conversion works</a> · <a href="/conversion-report/">The conversion report</a> · <a href="/figma-to-pptx/">What is inside the .pptx</a></p>
    </div>
  </section>
`,
};
