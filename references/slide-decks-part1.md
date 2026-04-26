# Slide Decks Part 1: HTML-First Workflow

This file is a compact companion to `slide-decks.md`. Keep `slide-decks.md` as the complete production standard; use this part as a quick operating checklist during deck creation.

## Capabilities

- HTML presentation mode: independent slide HTML files plus `assets/deck_index.html`.
- HTML to PDF export: `scripts/export_deck_pdf.mjs` or `scripts/export_deck_stage_pdf.mjs`.
- HTML to editable PPTX export: `references/editable-pptx.md`, `scripts/html2pptx.js`, and `scripts/export_deck_pptx.mjs`.

HTML is the foundation. PDF and PPTX are derivative exports.

## Pre-Flight Check: Confirm Delivery Format

Ask this before building:

```text
Do you need only HTML/PDF delivery, or do you also need an editable PPTX?
If editable PPTX is required, I will keep the HTML export-friendly from the first line.
```

Decision tree:

```text
[Required] Aggregated HTML presentation
    |
    +-- Browser/local HTML only
    |      -> Full HTML/CSS visual freedom.
    |
    +-- PDF required
    |      -> Full HTML/CSS visual freedom plus PDF export.
    |
    +-- Editable PPTX required
           -> Apply the four PPTX constraints from the start.
```

## Four PPTX Constraints

Editable PPTX export depends on mapping DOM elements into PowerPoint objects.

1. Use the wide PowerPoint canvas: `960pt x 540pt`.
2. Put editable text in semantic tags: `p`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`.
3. Keep visual decoration on wrapper elements, not on the editable text element.
4. Avoid unsupported web-only effects for editable objects: web components, complex SVG internals, CSS gradients, pseudo-element content, and heavy filters.

Good:

```html
<div class="metric-card">
  <p>Revenue grew 38%</p>
</div>
```

Risky:

```html
<div class="metric-card" data-label="Revenue grew 38%"></div>
```

## If PPTX Is Requested Late

Use this order:

1. Offer PDF for faithful visual delivery.
2. Offer a rebuilt PPTX-friendly HTML version.
3. Avoid manually rebuilding the deck with hard-coded `pptxgenjs` coordinates unless there is no other option.

## Batch Creation Rule

For decks with five or more slides:

1. Build two visually distinct showcase slides first.
2. Confirm visual grammar.
3. Produce the remaining slides from that grammar.
4. Run a full slide-by-slide verification pass.

This keeps agents aligned and prevents every slide from inventing a different design language.

## Publication Grammar

Use this structure for product brochures, research decks, and polished PDF-style presentations:

```text
+--------------------------------------------------+
| masthead: logo / document type / date            |
+--------------------------------------------------+
| kicker or section marker                         |
| CHAPTER XX / SECTION NAME                        |
|                                                  |
| H1: main message                                 |
| Supporting statement                             |
|                                                  |
| Main visual: grid, diagram, quote, image, table  |
+--------------------------------------------------+
| section name                              01 / 12 |
+--------------------------------------------------+
```

Typography:

- H1: display serif or strong display sans, 80-140px depending on content.
- Subtitle: 28-40px.
- Labels: 16-22px.
- Footnotes: 14-18px.

Keep highlighted words selective. Do not color entire paragraphs.

## Common Pitfalls

### Emoji Rendering

Emoji can fail in Chromium, PDF export, and PPTX export. Replace with text, verified symbols, SVG icons, or lucide-style icons when a library exists.

### Missing Playwright

If export reports a missing package:

```bash
npm install playwright pdf-lib
npx playwright install chromium
```

### Fonts Captured Too Early

Wait for:

```js
await page.evaluate(() => document.fonts && document.fonts.ready);
```

Then add one short frame delay if the layout still shifts.

### Too Much Content

A slide should hold:

- One central point.
- Up to three supporting details.
- One primary visual.
- One optional source/footnote area.

Split the slide if it exceeds this.

## Architecture Choice

Default to multi-file architecture:

```text
MyDeck/
├── index.html
├── shared/
│   ├── tokens.css
│   └── fonts.html
└── slides/
    ├── 01-cover.html
    ├── 02-context.html
    └── 03-solution.html
```

Use single-file stage only for small quick decks.

## Verification

Before delivery:

- [ ] Open the HTML deck in a browser.
- [ ] Navigate every slide.
- [ ] Check console errors.
- [ ] Check fonts and images.
- [ ] Export PDF if requested and open it.
- [ ] Export PPTX if requested and verify text is editable.
- [ ] Confirm slide count and order.
- [ ] Confirm repeated page furniture is consistent.

For complete guidance, read `slide-decks.md`.
