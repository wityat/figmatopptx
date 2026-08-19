import { faq } from './_shared.mjs';

const f = faq([
  ['What is the difference between Figma Slides and exporting to PowerPoint?',
   'Figma Slides is a presentation mode inside Figma — great while the deck lives with your team. It exports to PDF and images, not to an editable .pptx. The moment someone outside Figma has to <em>edit</em> the deck, you need a real PowerPoint file. See <a href="/figma-slides-to-powerpoint-editable/">Figma Slides to PowerPoint</a>.'],
  ['Can I export a Figma prototype with animations to PowerPoint?',
   'No, and be suspicious of anything that claims otherwise. PowerPoint has its own animation model; Figma interactions do not map onto it. What travels is the visual design and the content. If animation matters more than editability, present from Figma or export video.'],
  ['Which format should I send to a client?',
   'PDF if they only need to read and comment. Editable .pptx if they need to change anything, present it inside a corporate template, or reuse slides in another deck. Images only if you actively want the deck frozen.'],
  ['Does exporting cost me quality?',
   'Not in exact-look mode: slide backgrounds are pixel-exact renders of your frames with live text boxes on top. Fully-editable mode rebuilds elements as native objects, which occasionally shifts a hairline; the report tells you what changed hands.'],
]);

export default {
  path: '/figma-presentation-export/',
  title: 'Figma Presentation Export — All Your Options Compared',
  description: 'PDF, PNG, Figma Slides, PowerPoint, Google Slides and Keynote — every way to get a presentation out of Figma, what each one keeps, and when an editable PPTX is the only right answer.',
  h1: 'Exporting Presentations from Figma: Every Option Compared',
  lede: 'Figma can hand you a PDF, a pile of PNGs, a live prototype link or a Slides deck. Only one route ends with a file other people can <strong>edit</strong>. Here is the whole map.',
  schemas: [f.schema],
  body: `
  <section>
    <div class="wrap">
      <h2 class="center">The five routes out of Figma</h2>
      <p class="section-intro">Pick by what has to happen to the deck after you send it — not by what is fastest to click.</p>
      <div class="table-scroll">
        <table class="compare">
          <thead>
            <tr><th>Route</th><th>You get</th><th>Editable by the recipient?</th><th>Best for</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>PDF export</strong> (built in)</td><td>One PDF, vector text</td><td>No — read and comment only</td><td>Sending a deck for review or printing</td></tr>
            <tr><td><strong>PNG / JPG export</strong> (built in)</td><td>One image per frame</td><td>No</td><td>Thumbnails, social, embedding in other docs</td></tr>
            <tr><td><strong>Figma Slides</strong></td><td>A presentation inside Figma</td><td>Only for people in your Figma file</td><td>Presenting yourself, internal decks</td></tr>
            <tr><td><strong>Prototype link</strong></td><td>A live URL with interactions</td><td>No, and it needs a browser</td><td>Showing flows and animation</td></tr>
            <tr><td><strong>Editable .pptx</strong> (this plugin)</td><td class="yes">A real PowerPoint file</td><td class="yes">Yes — text boxes and shapes</td><td>Client hand-off, investor decks, corporate templates</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2 class="center">When PPTX is the only answer that works</h2>
      <p class="section-intro">Four situations where every other route quietly fails, usually at the worst moment.</p>
      <div class="grid-3">
        <div class="card">
          <h3>"Just send it in PowerPoint"</h3>
          <p>The client's whole organisation runs on Office. A PDF means someone rebuilds your deck by hand, badly, and your design does not survive the rebuild.</p>
        </div>
        <div class="card">
          <h3>Investors edit the deck</h3>
          <p>Fundraising decks get revised weekly, often by someone who is not you and does not have Figma. Editable text boxes turn a two-day loop into a two-minute one.</p>
        </div>
        <div class="card">
          <h3>Corporate templates</h3>
          <p>Compliance requires the company master, fonts and slide numbering. You can only apply a template to real PowerPoint objects — never to a screenshot.</p>
        </div>
      </div>
      <div class="grid-3" style="margin-top:20px">
        <div class="card">
          <h3>Localisation</h3>
          <p>Translators need selectable text. Images of text mean retyping every string and re-laying out every slide, in every language.</p>
        </div>
        <div class="card">
          <h3>Accessibility</h3>
          <p>Screen readers read text boxes, not pixels. A deck of images is unreadable to anyone using assistive tech — and increasingly a procurement blocker.</p>
        </div>
        <div class="card">
          <h3>Reuse</h3>
          <p>Half of slide reuse is copying one chart or headline into another deck. That only works when the element is an object.</p>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="feature">
        <div class="feature-copy">
          <span class="kicker">The catch nobody mentions</span>
          <h2>Most "PowerPoint export" is a PDF with extra steps</h2>
          <p>A great many Figma-to-PowerPoint tools do exactly what a PNG export does, then place the images on slides. The file extension changes; the editability does not. You find out when the client clicks a headline and nothing happens.</p>
          <p>Two things separate a real conversion from a repackaged screenshot: whether text arrives as <strong>text boxes</strong>, and whether the tool <strong>admits what it could not convert</strong>. This plugin does both — every export ends with a report naming each rasterized node and the reason.</p>
          <p><a href="/conversion-report/">See what the report contains →</a></p>
        </div>
        <figure class="feature-media">
          <img src="/assets/carousel-1.png" alt="Conversion report listing native text boxes, embedded fonts and rasterized nodes with reasons" width="1920" height="1080">
          <figcaption>What converted, what did not, and why — after every export.</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2 class="center">Where to go next</h2>
      <div class="grid-3">
        <div class="card">
          <h3>Just want the steps</h3>
          <p><a href="/export-figma-to-powerpoint/">How to export Figma to PowerPoint</a> — the plugin route plus the two manual ones, compared.</p>
        </div>
        <div class="card">
          <h3>Google Slides is the destination</h3>
          <p><a href="/figma-to-google-slides/">Figma to Google Slides</a> — the .pptx bridge, and the one caveat about fonts.</p>
        </div>
        <div class="card">
          <h3>You use Figma Slides</h3>
          <p><a href="/figma-slides-to-powerpoint-editable/">Figma Slides to PowerPoint</a> — keeping text live when your slides are already slides.</p>
        </div>
      </div>
      <div style="max-width:760px;margin:2.6em auto 0">
      ${f.html}
      </div>
    </div>
  </section>
`,
};
