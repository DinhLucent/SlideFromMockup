# Slide Decks: HTML Presentation Production Standard

Creating slide decks is a core recurring task for this skill. This reference defines the production workflow for HTML-first slide decks, from delivery-format decisions, to architecture, to export as PDF/PPTX.

**Capabilities covered here:**

- HTML presentation source: individual slide HTML files plus an index aggregator, or a compact single-file stage.
- HTML to PDF export: `scripts/export_deck_pdf.mjs` and `scripts/export_deck_stage_pdf.mjs`.
- HTML to editable PPTX export: constrained HTML mapped through `scripts/html2pptx.js`.

**Core rule:** HTML is the source of truth. PDF and PPTX are derivative outputs.

---

## Pre-Flight Check: Confirm Delivery Format First

This decision comes before visual design and before architecture selection. If the user needs editable PPTX and you discover that late, expect rework.

### Decision Tree: HTML-First Architecture

```text
[Always build] HTML deck source
    |
    +-- Browser presentation / archive only
    |      -> Keep full HTML/CSS visual freedom.
    |
    +-- PDF also required
    |      -> Keep full HTML/CSS visual freedom.
    |      -> Export with Playwright/PDF tools.
    |
    +-- Editable PPTX also required
           -> Apply PPTX constraints from line 1.
           -> Sacrifice some gradients, CSS tricks, SVG complexity, and web components.
```

### Start-of-Work Script

Use a concise confirmation when the brief is ambiguous:

```text
Before I build the deck: do you need only browser/PDF delivery, or do you also need an editable PPTX?
If editable PPTX is required, I will keep the HTML structure export-friendly from the start.
```

If the user has already said "PowerPoint", "editable", "team will edit later", or "send me pptx", treat editable PPTX as required.

### Why PPTX Needs Four Hard Constraints From the Start

`html2pptx.js` maps DOM elements to PowerPoint objects. It cannot translate arbitrary web visuals into editable PowerPoint content.

The four constraints:

1. Use a fixed wide layout equivalent to `960pt x 540pt` (`LAYOUT_WIDE`).
2. Put editable text in semantic text tags: `p`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`.
3. Keep backgrounds, borders, and shadows on wrapper `div` elements, not on the text node itself.
4. Avoid `background-image`, CSS gradients, web components, complex SVGs, and unsupported filters when the element must remain editable.

Good structure:

```html
<div class="caption-box">
  <p>Editable caption text</p>
</div>
```

Risky structure:

```html
<p class="caption-with-shadow-and-gradient">Editable caption text</p>
```

Do not handwrite dozens of `pptxgenjs` coordinates as a rescue plan. Build compliant HTML and let the exporter map it.

### Real Cost Comparison

| Path | Visual freedom | Editable text | Rework risk | Best for |
|---|---:|---:|---:|---|
| HTML only | High | N/A | Low | Browser presentation, design archive |
| HTML + PDF | High | No | Low | Polished non-editable delivery |
| HTML + editable PPTX from start | Medium | Yes | Medium | Client/team editing |
| HTML first, PPTX requested late | Low | Partial | High | Emergency compromise only |

### Mixed Delivery

When the user wants both a beautiful PDF and an editable PPTX:

- Build one HTML source system.
- Keep text/export structure compliant where editability matters.
- Use images for complex decorative effects that do not need editing.
- Export PDF from the polished HTML.
- Export PPTX with the understanding that PowerPoint may use fallback fonts and simplified effects.

### Late PPTX Request

If the visual HTML draft is already done and the user suddenly asks for editable PPTX:

1. Offer vector PDF as the faithful output.
2. Offer a rebuilt PPTX-friendly version that keeps text editable but simplifies visuals.
3. Do not claim the existing rich HTML can become a fully editable PPTX without tradeoffs.

---

## Batch Production: Build Two Showcase Slides First

For decks of five slides or more, do not create slides chronologically one by one.

Recommended flow:

1. Identify two visually different slide types, such as cover plus dense content.
2. Build those first as a design grammar showcase.
3. Confirm typography, spacing, palette, page furniture, image treatment, and density.
4. Produce the rest of the deck using the confirmed grammar.
5. Run a full slide-by-slide verification pass.

This protects both design quality and multi-agent workflows. Once the grammar is fixed, slides can be created in parallel without everyone inventing a different visual system.

---

## Publication Grammar Template

This structure is useful for B2B brochures, product narratives, research decks, and polished PDF-style presentations.

### Page Skeleton

```text
┌─ masthead ───────────────────────────────────────┐
│ [logo] / Product Brochure / Date                 │
├──────────────────────────────────────────────────┤
│ kicker or section marker                         │
│ CHAPTER XX / SECTION NAME                        │
│                                                  │
│ H1: main statement                               │
│ Supporting line or short proof                   │
│                                                  │
│ Primary visual system                            │
│ - grid                                           │
│ - figure                                         │
│ - quote                                         │
│ - diagram                                        │
│ - table                                          │
├──────────────────────────────────────────────────┤
│ section name                              01 / 12 │
└──────────────────────────────────────────────────┘
```

### Direct Style Contract

```css
:root {
  --slide-w: 1600px;
  --slide-h: 900px;
  --safe-x: 96px;
  --safe-y: 72px;
  --ink: #111111;
  --muted: #686868;
  --paper: #f7f5ef;
  --accent: #2f6f5e;
}

.slide {
  width: var(--slide-w);
  height: var(--slide-h);
  position: relative;
  overflow: hidden;
  background: var(--paper);
  color: var(--ink);
}

.masthead,
.footer {
  position: absolute;
  left: var(--safe-x);
  right: var(--safe-x);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  letter-spacing: 0;
}

.masthead { top: 36px; }
.footer { bottom: 34px; color: var(--muted); }
```

### Visual Protagonist Must Rotate

Avoid a deck where every page is "large heading + three cards".

Rotate the main visual role:

- Cover type composition.
- Product screenshot or device frame.
- Diagram or architecture map.
- Quote page.
- Timeline or phase progression.
- Dense table with editorial annotations.
- Portrait or object cutout.
- Before/after comparison.
- Data visualization.
- Full-bleed image with controlled text overlay.

Every slide should have one clear visual protagonist. Supporting elements should not compete with it.

---

## Common Pitfalls

### 1. Emoji Does Not Reliably Render in Chromium or PPTX Export

Replace emoji with:

- Text labels.
- SVG icons.
- Icon-font components already used by the project.
- Simple Unicode symbols with known font support, such as `+`, `->`, `*`, or checkmarks only after verifying.

Never depend on emoji as the only carrier of meaning.

### 2. `export_deck_pdf.mjs` Cannot Find Playwright

If the script errors with `Cannot find package 'playwright'`, install dependencies locally in the deck/project root:

```bash
npm install playwright pdf-lib
npx playwright install chromium
```

Prefer repo-local dependencies so another agent can reproduce the export.

### 3. Fonts Are Captured Before Loading

If Google Fonts or self-hosted fonts are used:

- Add preconnect/preload when appropriate.
- Wait for `document.fonts.ready`.
- Add a short capture delay for PDF export when the browser needs one extra layout frame.

For export scripts, waiting for `networkidle` alone is not enough.

### 4. Information Density Is Unbalanced

Slide rule:

- One core point.
- Up to three supporting points.
- One primary visual system.
- One optional footnote/source area.

If the slide needs more than this, split it into two slides or convert part of the content into speaker notes.

---

## Architecture Selection: Single File or Multi-File?

Default to multi-file architecture for serious decks.

### Architecture Comparison

| Dimension | Single file + `deck_stage.js` | Multi-file + `deck_index.html` |
|---|---|---|
| Structure | One HTML with multiple sections | One HTML per slide plus iframe index |
| CSS scope | Global, higher collision risk | Isolated per slide |
| Agent parallelism | Poor | Strong |
| Single slide review | Requires route/hash/JS | Open the slide file directly |
| Export reliability | Good for small decks | Best for production decks |
| Refactor safety | Lower | Higher |
| Best use | Small quick decks | Normal deck production |

### Decision Tree

```text
Need 1-4 simple slides?
    -> Single-file is acceptable.

Need 5+ slides?
    -> Multi-file.

Need multiple agents to work in parallel?
    -> Multi-file.

Need editable PPTX?
    -> Multi-file or tightly constrained single-file; keep text semantic.

Need each slide to be independently QA'd?
    -> Multi-file.
```

### Why This Rule Is Strict

Single-file decks accumulate global CSS. A selector created for slide 2 can accidentally change slide 9. In multi-agent work, two agents editing the same file create avoidable merge conflicts and can silently break each other's layout.

Multi-file decks let each slide own its local CSS while shared tokens stay in `shared/`. This is safer and faster for production.

---

## Path A: Multi-File Architecture (Default)

### Directory Structure

```text
MyDeck/
├── index.html                 # built from assets/deck_index.html or equivalent
├── shared/
│   ├── tokens.css             # colors, type scale, spacing, shadows
│   ├── fonts.html             # shared font links
│   └── media/                 # shared imagery
├── slides/
│   ├── 01-cover.html
│   ├── 02-context.html
│   ├── 03-problem.html
│   ├── 04-solution.html
│   └── 05-close.html
└── exports/
    ├── deck.pdf
    └── deck.pptx
```

### Slide Template

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Slide 01 - Cover</title>
  <link rel="stylesheet" href="../shared/tokens.css" />
  <!-- include shared font links here or inline them -->
  <style>
    body {
      margin: 0;
      background: #111;
      display: grid;
      place-items: center;
      min-height: 100vh;
    }

    .slide {
      width: 1600px;
      height: 900px;
      position: relative;
      overflow: hidden;
      background: var(--paper);
      color: var(--ink);
    }

    .safe {
      position: absolute;
      inset: 72px 96px;
    }
  </style>
</head>
<body>
  <main class="slide" data-slide="01" data-title="Cover">
    <section class="safe">
      <p class="kicker">SECTION / CONTEXT</p>
      <h1>Slide headline</h1>
      <p>Supporting statement.</p>
    </section>
  </main>
</body>
</html>
```

### `deck_index.html` Aggregator

The index should:

- Load slide files in an iframe.
- Provide previous/next keyboard navigation.
- Show slide count and current label.
- Avoid injecting global CSS into slide frames.
- Support direct slide index or hash navigation when possible.

Keyboard defaults:

- `ArrowRight`, `PageDown`, or `Space`: next slide.
- `ArrowLeft` or `PageUp`: previous slide.
- `Home`: first slide.
- `End`: last slide.

### Single-Slide Verification

This is the major advantage of multi-file architecture:

```bash
start slides/03-problem.html
```

or:

```bash
python -m http.server 8000
# open http://localhost:8000/slides/03-problem.html
```

Each slide should render correctly in isolation.

### Parallel Development

Recommended ownership split:

- One agent owns `shared/tokens.css` and index.
- One or more agents own disjoint slide files.
- No agent should reformat all slides unless the task is explicitly a global refactor.
- Shared tokens should be modified intentionally and communicated because they affect every slide.

### What Goes in `shared/tokens.css`

Include:

- Color tokens.
- Font families.
- Type scale.
- Spacing scale.
- Shared page furniture classes.
- Reusable diagram primitives.
- Utility classes that are truly cross-slide.

Do not include:

- One-off slide layout hacks.
- Absolute positions for specific slide content.
- Decorative effects used once.
- Experimental selectors that might leak into every slide.

---

## Path B: Single-File Deck With `deck_stage.js`

Use this path for small decks, quick prototypes, or when the user explicitly wants a single HTML file.

### Basic Pattern

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Single File Deck</title>
  <style>
    body {
      margin: 0;
      background: #111;
      display: grid;
      place-items: center;
      min-height: 100vh;
    }

    .deck {
      width: 1600px;
      height: 900px;
      position: relative;
      overflow: hidden;
    }

    .slide {
      width: 1600px;
      height: 900px;
      position: absolute;
      inset: 0;
      display: none;
    }

    .slide.is-active {
      display: block;
    }
  </style>
</head>
<body>
  <main class="deck">
    <section class="slide is-active" data-title="Cover">...</section>
    <section class="slide" data-title="Context">...</section>
  </main>

  <script src="./assets/deck_stage.js"></script>
</body>
</html>
```

### Script Position Requirement

The stage script must run after slide DOM exists. Put it at the end of `<body>` or wrap initialization in `DOMContentLoaded`.

Good:

```html
<body>
  <main class="deck">...</main>
  <script src="./assets/deck_stage.js"></script>
</body>
```

Risky:

```html
<head>
  <script src="./assets/deck_stage.js"></script>
</head>
```

If the script queries slides before they exist, navigation will silently fail or initialize with zero slides.

### Global CSS Trap

In a single-file deck, all slide CSS is global.

Risk patterns:

```css
.title { ... }
.card { ... }
.grid { ... }
section p { ... }
```

Safer patterns:

```css
.s01 .title { ... }
.s03-card { ... }
.slide[data-slide="04"] .grid { ... }
```

Rules:

- Prefix one-off classes by slide number or slide role.
- Put only true shared tokens in global selectors.
- Avoid broad selectors like `section p` unless every slide should inherit the style.
- Check earlier slides after editing later slides.

### Starter CSS

Use this when starting a small deck:

```css
:root {
  --deck-w: 1600px;
  --deck-h: 900px;
  --ink: #111;
  --muted: #666;
  --paper: #f8f7f2;
  --accent: #316b5f;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #141414;
  font-family: Inter, Arial, sans-serif;
}

.deck {
  width: min(100vw, var(--deck-w));
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
  background: var(--paper);
}

.slide {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  display: none;
  color: var(--ink);
}

.slide.is-active {
  display: block;
}

.safe {
  position: absolute;
  inset: 8% 6%;
}
```

### Custom Sizes

Use fixed dimensions for source design, then scale the outer container.

Common sizes:

- `1600 x 900`: high-quality 16:9 design source.
- `1920 x 1080`: video-native 16:9.
- `1280 x 720`: lighter demos.
- `1080 x 1920`: vertical social deck/video.

Do not design with arbitrary viewport units for everything. Fixed-format decks need stable coordinates.

---

## Slide Labels

Each slide should expose a title for index navigation and QA.

Multi-file:

```html
<main class="slide" data-slide="03" data-title="Market Shift">
```

Single-file:

```html
<section class="slide" data-title="Market Shift">
```

Labels should be:

- Short.
- Human-readable.
- Stable during review.
- Not dependent on visual text that may change.

---

## Speaker Notes

Use speaker notes when the deck needs narration, presenter guidance, or hidden context.

### Format

```html
<aside class="speaker-notes">
  The presenter should spend 30 seconds explaining why the metric matters.
</aside>
```

Keep notes visually hidden in browser presentation unless the deck UI has a notes mode.

```css
.speaker-notes {
  display: none;
}
```

### Notes Writing Rules

- Notes are for presentation guidance, not extra slide clutter.
- Keep them concise.
- Do not duplicate every visible line.
- Include pronunciation or timing guidance only when necessary.
- If exporting to PPTX, confirm whether notes are mapped by the exporter; otherwise state that HTML notes remain in source only.

---

## Slide Design Patterns

### 1. Build a System First

Before producing many slides, define:

- Page size.
- Safe margins.
- Type scale.
- Color tokens.
- Grid system.
- Repeated page furniture.
- Diagram grammar.
- Image treatment.
- Data visualization style.

Do not invent these independently on each slide.

### 2. Common Slide Layouts

| Layout | Use for | Notes |
|---|---|---|
| Hero statement | cover, chapter open | One dominant headline, minimal support. |
| Two-column narrative | product explanation | One text column, one visual column. |
| Evidence grid | research, proof | Keep each card comparable. |
| Annotated screenshot | product walkthrough | Use callouts sparingly. |
| Timeline | process, roadmap | Avoid too many stages. |
| Quote page | testimonial, executive voice | Make attribution precise. |
| Diagram page | systems, architecture | Keep labels readable. |
| Data page | chart-led argument | Chart first, commentary second. |
| Comparison | before/after, options | Align baselines and dimensions. |
| Closing page | summary, action | Strong final statement. |

### 3. Scale

Slides are viewed at distance or as thumbnails. Use larger type than a webpage would.

Typical 1600 x 900 starting points:

- Cover headline: 96-150px.
- Section headline: 56-88px.
- Body: 28-40px.
- Labels/captions: 16-24px.
- Footnotes: 14-18px.

Never shrink body text to solve density. Reduce content instead.

### 4. Visual Rhythm

Across a deck, alternate:

- Dense and quiet slides.
- Text-led and visual-led slides.
- Diagram and image pages.
- High-contrast and calmer pages.
- Full-bleed moments and structured grid pages.

If all slides have the same density, the deck feels mechanical.

### 5. Breathing Room for Data-Heavy Slides

For data-heavy pages:

- Give the chart or table at least half the slide.
- Use one insight headline, not a generic chart title.
- Add annotations to the data, not a paragraph explaining it elsewhere.
- Keep source notes present but small.
- Avoid more than two chart types on one slide.

---

## Printing to PDF

Browser print can work for simple decks, but scripted export is more repeatable.

Manual print settings:

- Landscape.
- No headers and footers.
- Background graphics enabled.
- Scale 100% or fit to page, depending on source size.
- Correct paper size or custom size.

Use scripted export for final delivery whenever possible.

---

## Exporting to PDF / PPTX

### `export_deck_pdf.mjs`: Vector PDF for Multi-File Architecture

Use when the deck is an index plus separate slide files.

```bash
node scripts/export_deck_pdf.mjs ./MyDeck/index.html ./MyDeck/exports/deck.pdf
```

Expected behavior:

- Opens the index.
- Iterates all slides.
- Captures each slide at the correct aspect ratio.
- Outputs a single PDF.

Pre-checks:

- All slide paths resolve.
- No console errors.
- Fonts are loaded before capture.
- Slide count matches the deck outline.

### `export_deck_stage_pdf.mjs`: Single-File Stage Export

Use only for decks powered by `deck_stage.js` or equivalent in-page routing.

```bash
node scripts/export_deck_stage_pdf.mjs ./single-deck.html ./exports/deck.pdf
```

This exporter must be able to navigate each slide state. If the slide state is not addressable, export will capture the same slide repeatedly.

Requirements:

- The deck exposes stable slide count.
- The deck can jump to a slide deterministically.
- The active slide is fully rendered before capture.
- Global navigation chrome is hidden or excluded.

### `export_deck_pptx.mjs`: Editable PPTX

Only mode: native editable text boxes.

```bash
node scripts/export_deck_pptx.mjs ./MyDeck/index.html ./MyDeck/exports/deck.pptx
```

Expected tradeoffs:

- Web fonts may fall back to installed system fonts.
- CSS gradients may become simplified fills or images.
- Complex SVG/filter effects may not be editable.
- Some layout precision may differ from browser rendering.

The point of this export is editability, not pixel-perfect fidelity.

### Make HTML Export-Friendly From the Start

Good PPTX-friendly rules:

- Use semantic headings and paragraphs.
- Keep text nodes clean.
- Put decoration on wrappers.
- Use actual `<img>` tags for images.
- Keep important geometry explicit.
- Avoid pseudo-elements for critical content.
- Avoid CSS-generated text for meaningful content.
- Avoid nested transforms on editable text.

Bad patterns:

```html
<div class="headline">Main title</div>
<span class="fake-button">Action</span>
<div class="icon-label" data-label="Revenue"></div>
```

Better:

```html
<h1>Main title</h1>
<p class="button-label">Action</p>
<p class="icon-label">Revenue</p>
```

### Which Export Should You Choose?

| Need | Recommended output |
|---|---|
| Best visual fidelity | HTML and PDF |
| Editable copy | PPTX with constraints |
| Client only reviews | PDF |
| Live presentation | HTML index |
| Email attachment | PDF plus optional PPTX |
| Long-term editable template | Build for PPTX from the beginning |

---

## Deep Path for Editable PPTX

Use this only for long-lived projects where editability matters more than rich web effects.

Recommended process:

1. Define the PowerPoint-safe design system first.
2. Keep a small set of layout primitives.
3. Build slides in HTML using semantic text and simple geometry.
4. Export early after two showcase slides.
5. Open the PPTX and manually inspect text editability.
6. Adjust the HTML structure before producing all slides.
7. Export again after the full deck.
8. Verify the PPTX in PowerPoint, not only in a previewer.

If editable PPTX is a hard requirement, do not wait until the deck is complete to test export.

---

## FAQ

### Can I Use CSS Gradients?

Yes for HTML/PDF. Avoid them for editable PPTX content unless you accept rasterized or simplified output.

### Can I Use SVG?

Yes for HTML/PDF. For editable PPTX, keep SVG decorative or export it as an image. Do not expect complex SVG internals to become editable PowerPoint shapes.

### Can I Use Web Components?

Use them for web-only decks if the runtime is bundled and verified. Avoid them for PPTX export.

### Can I Use Tailwind or a Framework?

Yes when the project already uses it and the build/runtime is clear. For portable standalone decks, plain HTML/CSS is often safer.

### Can I Put All Slides in One File?

Yes for a small deck. For production, multi-file is safer because it supports isolated review, parallel work, and lower CSS collision risk.

### Why Does the PDF Look Right but PPTX Looks Different?

PDF preserves visual appearance. PPTX export maps DOM into editable PowerPoint objects, so fonts, gradients, shadows, and layout details may differ.

### Should I Start a Dev Server?

If the deck uses modules, external scripts, local fetch, or framework build output, start a server. If it is a pure single HTML file with inline scripts/assets, verify that double-click `file://` works.

---

## Final Deck Verification Checklist

- [ ] Delivery format confirmed before production.
- [ ] HTML source exists and is the upstream artifact.
- [ ] For 5+ slides, two showcase slides established the visual grammar.
- [ ] Architecture choice is documented by the actual file structure.
- [ ] Multi-file decks keep slide-specific CSS local.
- [ ] Shared tokens contain only true shared rules.
- [ ] Single-file decks avoid broad global selectors.
- [ ] Every slide has a stable label/title.
- [ ] Speaker notes are hidden from normal presentation view.
- [ ] Fonts load before export.
- [ ] No broken images or missing local assets.
- [ ] No console errors.
- [ ] Slide count matches the outline.
- [ ] Keyboard navigation works in the HTML index/stage.
- [ ] Each standalone slide opens correctly if using multi-file architecture.
- [ ] Text fits within its containers at target size.
- [ ] Repeated page furniture is consistent.
- [ ] Visual protagonists vary across the deck.
- [ ] No slide relies on emoji as critical content.
- [ ] PDF export has been opened and inspected.
- [ ] PPTX export has been opened and inspected if requested.
- [ ] Editable PPTX text is actually editable where promised.
- [ ] Final file paths and known tradeoffs are reported to the user.
