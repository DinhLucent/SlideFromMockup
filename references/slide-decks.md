# Slide Decks: HTML Presentation Grid and Sizing

Creating slide decks is a core frequent design task. This document outlines how to build HTML slides—from architecture selections, single page designs, to exporting as PDF/PPTX.

**Skill Capabilities:**
- **HTML Presentation Version (Base artifact, always mandatory)** → Individual HTML per slide + `assets/deck_index.html` aggregator, allowing browser-based keyboard navigation and full screen presentations.
- HTML → PDF Export → `scripts/export_deck_pdf.mjs` / `scripts/export_deck_stage_pdf.mjs`
- HTML → Editable PPTX Export → Using 4 hard constraints + `scripts/html2pptx.js`

> **⚠️ HTML is the foundation, PDF/PPTX are just derivatives.** Always construct the HTML version first. The HTML version is the upstream source of truth.

---

## 🛑 Pre-flight Check: Confirm Delivery Format First

**This decision precedes architecture.** Not confirming this before starting = 2-3 hours of rework.

### HTML-first Decision Tree

```
[Always Mandatory] HTML Aggregation (index.html + slides/*.html)
   │
   ├── Only need browser presentation / archive → Stop here. Full visual freedom.
   │
   ├── Also need PDF (Printing / Archiving)     → Run export_deck_pdf.mjs. Full visual freedom.
   │
   └── Also need Editable PPTX (Text edits)     → Start from line 1 of HTML using 4 hard constraints.
                                                  Sacrifices gradients, web components, and complex SVGs.
```

### Why PPTX Requires Constraints from Step 1

`html2pptx.js` needs to map DOM elements to PowerPoint objects. This requires **4 Hard Constraints**:
1. Background fixed at `960pt x 540pt` (`LAYOUT_WIDE`).
2. Text must be wrapped in `<p>` or `<h1-6>`. Naked `<div>` and `<span`> main texts are forbidden.
3. Backgrounds/borders/shadows cannot be on the `<p>` tag (wrap in a `<div`>).
4. No `background-image` (use `<img>`), CSS gradients, web components, or complex SVGs.

### Handling "Late" PPTX Requests
If the visual HTML draft is already done and the user suddenly wants a PPTX:
1. **Primary approach**: Offer a vector PDF instead.
2. **Secondary approach**: AI rewrites the editable HTML version acting as a blueprint (sacrificing complex visuals for compliant structure).
3. **Do NOT**: Handwrite `pptxgenjs` coordinates manually.

---

## 🛑 Batch Creation: 2 Showcase Pages First

**If a deck is ≥5 pages, never do them chronologically 1 by 1.**

1. Pick **2 visually distinct pages** to do as showcases (e.g. Cover + Content).
2. Get user confirmation on the visual grammar (colors, layouts, font scales).
3. Push through the remaining pages.

---

## 📐 Publication Grammar Template

Suitable for B2B brochures / Product Promos.

### Core Skeleton
```text
┌─ masthead ────────────────────────────────┐
│  [logo] · A Product Brochure     Date │
├───────────────────────────────────────────┤
│  ── kicker (green dash + tag)             │
│  CHAPTER XX · SECTION NAME                │
│                                           │
│  H1 (Main Text, max 80-140px)             │
│  Keywords highlighted                     │
│                                           │
│  [Specific grids/lists/images]            │
├───────────────────────────────────────────┤
│ section name                   XX / total │
└───────────────────────────────────────────┘
```

### Visual Protagonists Rotation
Rotate visual components to avoid monotony:
- Cover typography layouts
- Isolated character portraits
- Asymmetric 2-column data blocks
- Large quote slides
- Timeline progression chains

---

## ⚠️ Common Pitfalls

1. **Emojis don't render in Chromium/Playwright**: Replace with Unicode symbols (`✦`, `✓`, `→`).
2. **Playwright Module Error**: If `Cannot find package playwright`, install it locally with `npm install playwright pdf-lib`.
3. **Google Fonts missing on export**: Delay playwright capture with `wait-for-timeout=3500` or self-host fonts.
4. **Information density overload**: Less is more. Max 1 core point + 3 auxiliary points per slide.

---

## 🛑 Architecture Selection: Single vs Multi-file?

| Dimension | Single File + `deck_stage.js` | **Multi-file + `deck_index.html`** |
|------|--------------------------|--------------------------------------|
| Structure | One HTML, pages are `<sections>` | Isolated HTML pages connected via iframe |
| Scope | ❌ Global CSS pollution risks | ✅ Complete iFrame encapsulation |
| Validating | ❌ Needs JS routing to view slide | ✅ Just double click the HTML file to view |
| Parallel | ❌ Terrible for multi-agent workflows | ✅ Perfect for parallel tasks |

**Always default to Multi-file architectures.**

---

## Path A (Default): Multi-file Architecture

### Directory Structure
```text
MyDeck/
├── index.html              # deck_index.html aggregator
├── shared/
│   ├── tokens.css          # Shared design tokens
│   └── fonts.html          # Google Fonts
└── slides/
    ├── 01-cover.html
    └── ...
```

### Constraints:
- Use `<body>` as the slide canvas bounding box.
- Lock `width: 1920px; height: 1080px;` via `shared/tokens.css`.
- Update the `window.DECK_MANIFEST` array inside `index.html` to sequence the slides.

---

## Path B (Small Decks): Single-file Architecture

Use only for ≤10 pages needing complex cross-page interactions.

### Script Requirement:
The `<script src="deck_stage.js">` **MUST NOT** execute before the DOM loads. Place it immediately following the `</deck-stage>` close tag, or use `defer`.

### The Global CSS Trap:
If you globally change `display: flex` on a `<section>`, it will override the hidden/active logics of the shadow DOM.
Use this safe pattern:
```css
/* Lock inactive pages */
deck-stage > section:not(.active) { display: none !important; }

/* Engage layout on active ONLY */
deck-stage > section.active { display: flex; flex-direction: column; }
```

---

## Slide Labels & Speaker Notes

- **Labels**: Start numbering from 1 (e.g. `01 Cover`), don't use 0-indexing.
- **Notes**: Exclude by default. If required, inject an array in the `<script id="speaker-notes" type="application/json">` tag. Keep them conversational (200-400 words).

---

## Slide Design Matrix
1. **Establish a System**: Pitch the color matrix, typography map, and background rhythm before writing code.
2. **Standard Layouts**: Restrict to 4-5 core layouts (Title, Divider, Content, Data, Image).
3. **Scale Constraints**:
   - Body minimum `24px`
   - Titles `60-120px`
4. **Spatial Breathability**: Let the margins breathe.

---

## Automated Exports (PDF / PPTX)

### Export to PDF (Multi-file Native)
```bash
node scripts/export_deck_pdf.mjs --slides <dir> --out deck.pdf
```
Retains vectors, zero CSS refactoring needed.

### Export to PDF (Single-file fallback) ⚠️
```bash
node scripts/export_deck_stage_pdf.mjs --html deck.html --out deck.pdf
```
Handles specific shadow DOM extractions.

### Export to PPTX
```bash
node scripts/export_deck_pptx.mjs --slides <dir> --out deck.pptx
```
Only works if the HTML strictly adheres to the 4 constraints outlined in `editable-pptx.md`.

---

## Final Delivery Checklist
1. [ ] Check browser index.html for broken image links.
2. [ ] Manually key-through each slide for bleeding text.
3. [ ] Print to PDF (P-key) preview formatting.
4. [ ] Run randomized refresh tests for localStorage stability.
5. [ ] Take Playwright screenshots and do a final visual inspection.
6. [ ] Assert all `placeholder` code tags have been cleared.
