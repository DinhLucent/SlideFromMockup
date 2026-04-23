# Editable PPTX Export: HTML Hard Constraints + Sizing Decisions + Common Errors
 
 This document explains the path of **using `scripts/html2pptx.js` + `pptxgenjs` to translate HTML elements one-by-one into true editable PowerPoint text boxes**. This is also the only path supported by `export_deck_pptx.mjs`.
 
 > **Core Premise**: To take this path, the HTML must be written according to the 4 constraints below from line 1. **Do not write it freely and convert it later**—trying to salvage it afterward will trigger 2-3 hours of rework (validated by real-world pitfalls on the 2026-04-20 Options Private Board project).
 >
 > For scenarios prioritizing visual freedom (animations / web components / CSS gradients / complex SVCs), please switch to the PDF path (`export_deck_pdf.mjs` / `export_deck_stage_pdf.mjs`). **Do not** expect PPTX exports to have both visual fidelity and editability—this is a physical constraint of the PPTX file format itself (see the section "Why the 4 Constraints are not Bugs but Physical Constraints" at the end of this document).
 
 ---
 
 ## Canvas Dimensions: Use 960×540pt (LAYOUT_WIDE)
 
 PPTX units are in **inches** (physical dimensions), not px. Decision principle: the computedStyle dimension of the body must **match the inch dimensions of the presentation layout** (±0.1", strictly enforced by `html2pptx.js`'s `validateDimensions`).
 
 ### Comparing the 3 Candidate Dimensions
 
 | HTML body | Physical Dimension | Corresponding PPT Layout | When to Choose |
 |---|---|---|---|
 | **`960pt × 540pt`** | **13.333″ × 7.5″** | **pptxgenjs `LAYOUT_WIDE`** | ✅ **Default Recommendation** (Modern PowerPoint 16:9 standard) |
 | `720pt × 405pt` | 10″ × 5.625″ | Custom | Only when the user specifies a "Legacy PowerPoint Widescreen" template |
 | `1920px × 1080px` | 20″ × 11.25″ | Custom | ❌ Non-standard dimension; fonts will appear abnormally small when projected |
 
 **Do not think of HTML dimensions as resolution.** PPTX is a vector document; the body dimension dictates the **physical size**, not the clarity. A massive body (20″×11.25″) won't make the text clearer—it will only make the font size pt relatively smaller compared to the canvas, looking much worse when projected/printed.
 
 ### Three Syntax Choices for Body (Equivalent)
 
 ```css
 body { width: 960pt;  height: 540pt; }    /* Cleanest, recommended */
 body { width: 1280px; height: 720px; }    /* Equivalent, px convention */
 body { width: 13.333in; height: 7.5in; }  /* Equivalent, inch intuition */
 ```
 
 Matching pptxgenjs code:
 
 ```js
 const pptx = new pptxgen();
 pptx.layout = 'LAYOUT_WIDE';  // 13.333 × 7.5 inches, no custom configuration needed
 ```
 
 ---
 
 ## The 4 Hard Constraints (Violations will immediately throw errors)
 
 `html2pptx.js` translates HTML DOM elements one-by-one into PowerPoint objects. The format constraints of PowerPoint mapped to HTML equal the 4 rules below.
 
 ### Rule 1: DIVs cannot directly contain text — It must be wrapped in `<p>` or `<h1>` to `<h6>`
 
 ```html
 <!-- ❌ Incorrect: text directly inside div -->
 <div class="title">Q3 Revenue Growth 23%</div>
 
 <!-- ✅ Correct: text inside <p> or <h1>-<h6> -->
 <div class="title"><h1>Q3 Revenue Growth 23%</h1></div>
 <div class="body"><p>New users are the main driver</p></div>
 ```
 
 **Why**: PowerPoint text must exist within a text frame, and text frames correspond to paragraph-level HTML elements (p/h*/li). Naked `<div>`s have no corresponding text container in PPTX.
 
 **Also do not use `<span>` to carry main text**—spans are inline elements and cannot be independently aligned as text boxes. Spans can only be **sandwiched inside p/h\*** for localized styling (bolding, color changes).
 
 ### Rule 2: CSS gradients are not supported — You must use solid colors
 
 ```css
 /* ❌ Incorrect */
 background: linear-gradient(to right, #FF6B6B, #4ECDC4);
 
 /* ✅ Correct: solid color */
 background: #FF6B6B;
 
 /* ✅ If multi-color stripes are mandatory, use flex children with distinct solid colors */
 .stripe-bar { display: flex; }
 .stripe-bar div { flex: 1; }
 .red   { background: #FF6B6B; }
 .teal  { background: #4ECDC4; }
 ```
 
 **Why**: PowerPoint shape fills only support solid/gradient-fill, but pptxgenjs's `fill: { color: ... }` only maps to solids. Gradients require distinct native PowerPoint gradient structures which the toolchain currently doesn't support.
 
 ### Rule 3: Backgrounds/Borders/Shadows can only go on DIVs, not on text tags
 
 ```html
 <!-- ❌ Incorrect: <p> has a background color -->
 <p style="background: #FFD700; border-radius: 4px;">Key Content</p>
 
 <!-- ✅ Correct: outer div carries the background/border, <p> only contains text -->
 <div style="background: #FFD700; border-radius: 4px; padding: 8pt 12pt;">
   <p>Key Content</p>
 </div>
 ```
 
 **Why**: In PowerPoint, a shape (square/rounded rectangle) and a text frame are two distinct objects. HTML's `<p>` only translates to a text frame, while backgrounds/borders/shadows pertain to the shape—they must be written on the **div wrapping the text**.
 
 ### Rule 4: DIVs cannot use `background-image` — Use `<img>` tags
 
 ```html
 <!-- ❌ Incorrect -->
 <div style="background-image: url('chart.png')"></div>
 
 <!-- ✅ Correct -->
 <img src="chart.png" style="position: absolute; left: 50%; top: 20%; width: 300pt; height: 200pt;" />
 ```
 
 **Why**: `html2pptx.js` only extracts image paths from `<img>` elements; it does not parse CSS `background-image` URLs.
 
 ---
 
 ## Path A HTML Template Skeleton
 
 Each slide is an independent HTML file with its own isolated scope (avoiding CSS contamination found in single-file decks).
 
 ```html
 <!DOCTYPE html>
 <html lang="en">
 <head>
 <meta charset="UTF-8">
 <style>
   * { margin: 0; padding: 0; box-sizing: border-box; }
   body {
     width: 960pt; height: 540pt;           /* ⚠️ Matches LAYOUT_WIDE */
     font-family: system-ui, -apple-system, "PingFang SC", sans-serif;
     background: #FEFEF9;                    /* Solid color, no gradients */
     overflow: hidden;
   }
   /* DIVs are responsible for layout/background/borders */
   .card {
     position: absolute;
     background: #1A4A8A;                    /* Background goes on DIV */
     border-radius: 4pt;
     padding: 12pt 16pt;
   }
   /* Text tags are only responsible for font styles, no background/border */
   .card h2 { font-size: 24pt; color: #FFFFFF; font-weight: 700; }
   .card p  { font-size: 14pt; color: rgba(255,255,255,0.85); }
 </style>
 </head>
 <body>
 
   <!-- Title Area: outer div positions it, inner text tag -->
   <div style="position: absolute; top: 40pt; left: 60pt; right: 60pt;">
     <h1 style="font-size: 36pt; color: #1A1A1A; font-weight: 700;">Titles use assertions, not topics</h1>
     <p style="font-size: 16pt; color: #555555; margin-top: 10pt;">Subtitle provides additional context</p>
   </div>
 
   <!-- Content Card: div handles background, h2/p handle text -->
   <div class="card" style="top: 130pt; left: 60pt; width: 240pt; height: 160pt;">
     <h2>Point One</h2>
     <p>Brief explanatory text</p>
   </div>
 
   <!-- Lists: use ul/li, do not manually type • symbols -->
   <div style="position: absolute; top: 320pt; left: 60pt; width: 540pt;">
     <ul style="font-size: 16pt; color: #1A1A1A; padding-left: 24pt; list-style: disc;">
       <li>First point</li>
       <li>Second point</li>
       <li>Third point</li>
     </ul>
   </div>
 
   <!-- Illustration: use <img> tags, not background-image -->
   <img src="illustration.png" style="position: absolute; right: 60pt; top: 110pt; width: 320pt; height: 240pt;" />
 
 </body>
 </html>
 ```
 
 ---
 
 ## Common Error Cheat-Sheet
 
 | Error Message | Cause | Fix |
 |---------|------|---------|
 | `DIV element contains unwrapped text "XXX"` | Naked text inside div | Wrap text inside `<p>` or `<h1>` to `<h6>` |
 | `CSS gradients are not supported` | Used linear/radial gradient | Change to solid color, or use segmented flex children |
 | `Text element <p> has background` | Background color applied to `<p>` tag | Add outer `<div>` to carry the background, let `<p>` just be text |
 | `Background images on DIV elements are not supported` | Div used background-image | Change to `<img>` tag |
 | `HTML content overflows body by Xpt vertically` | Content exceeds 540pt | Reduce content or shrink font size, or use `overflow: hidden` to clip |
 | `HTML dimensions don't match presentation layout` | Body dimensions don't match pres layout | Ensure body uses `960pt × 540pt` corresponding to `LAYOUT_WIDE`; or use defineLayout for custom sizes |
 | `Text box "XXX" ends too close to bottom edge` | Large font `<p>` is < 0.5 inch from bottom edge | Move it up to leave enough bottom margin; the bottom of a PPT naturally gets slightly cut off anyway |
 
 ---
 
 ## Basic Workflow (3 Steps to Output PPTX)
 
 ### Step 1: Write independent HTML files per page according to constraints
 
 ```
 MyDeck/
 ├── slides/
 │   ├── 01-cover.html    # Each file is a complete 960x540pt HTML
 │   ├── 02-agenda.html
 │   └── ...
 └── illustration/        # Images referenced by <img>
     ├── chart1.png
     └── ...
 ```
 
 ### Step 2: Write build.js invoking `html2pptx.js`
 
 ```js
 const pptxgen = require('pptxgenjs');
 const html2pptx = require('../scripts/html2pptx.js');  // This skill's script
 
 (async () => {
   const pres = new pptxgen();
   pres.layout = 'LAYOUT_WIDE';  // 13.333 × 7.5 inch, matches HTML's 960x540pt
 
   const slides = ['01-cover.html', '02-agenda.html', '03-content.html'];
   for (const file of slides) {
     await html2pptx(`./slides/${file}`, pres);
   }
 
   await pres.writeFile({ fileName: 'deck.pptx' });
 })();
 ```
 
 ### Step 3: Open and Verify
 
 - Open the exported PPTX in PowerPoint/Keynote.
 - Double-clicking any text should allow direct editing (If it's an image, you violated Rule 1).
 - Verify overflow: every page should remain within body boundaries and not get clipped.
 
 ---
 
 ## This Path vs Alternative Options (When to choose what)
 
 | Requirement | What to Choose |
 |------|------|
 | Coworkers will edit the text in the PPTX / Sent to non-technical staff for continued editing | **This document's path** (editable, requires writing HTML with the 4 constraints from scratch) |
 | Just for presenting / Sending in an archive, won't be edited | `export_deck_pdf.mjs` (Multi-file) or `export_deck_stage_pdf.mjs` (Single file deck-stage), to output vector PDF |
 | Visual freedom is the priority (animations, web components, CSS gradients, complex SVGs), accept non-editable | **PDF** (As above) — PDF offers both high fidelity and cross-platform consistency, much more suitable than an "Image PPTX" |
 
 **Absolutely never run html2pptx forcibly on HTML built with total visual freedom** — tested visual-driven HTML pass rates in html2pptx are < 30%, and retrofitting the remainder page by page is slower than rewriting. This scenario should output to PDF, not force a PPTX.
 
 ---
 
 ## Fallback: You have a visual draft, but the user insists on an editable PPTX
 
 Occasionally, you will encounter this scenario: You or the user have already composed a visually driven HTML draft (using gradients, web components, complex SVGs). Ideally, this should be outputted to PDF, but the user explicitly says: "No, it must be an editable PPTX."
 
 **Do not run `html2pptx` forcibly and hope it passes** — real-world tests show a <30% pass rate for visual-driven HTML with html2pptx; the remaining 70% will error out or warp entirely. The correct fallback is:
 
 ### Step 1 · Outline the Limitations First (Transparent communication)
 
 Succinctly explain these three points to the user:
 
 > "Your current HTML utilized [List specifics: gradients / web components / complex SVGs / ...], directly converting it to an editable PPTX will fail. I have two solutions for you:
 > - A. **Output to PDF** (Recommended) — Visuals are 100% retained, the recipient can view and print it but cannot edit the text.
 > - B. **Use the visual draft as a blueprint, and rewrite a new editable HTML version** (Retaining color/layout/copy design decisions, but reorganizing the HTML structure according to the 4 hard constraints, **sacrificing** the visual capabilities of gradients, web components, and complex SVGs) → Then exporting to an editable PPTX.
 >
 > Which do you prefer?"
 
 Do not undersell Option B — be completely clear about **what will be lost**. Let the user make the compromise.
 
 ### Step 2 · If the User Chooses B: AI Actively Rewrites, Do not ask the user to write it
 
 The doctrine here is: **The user provides the design intent; you are responsible for translating it into a compliant implementation.** Do not ask the user to learn the 4 hard constraints and rewrite it themselves.
 
 Principles for rewriting:
 - **Retain**: The color system (dominant/secondary/neutral colors), information hierarchy (title/subtitle/body/footnotes), core copywriting, layout skeleton (top-mid-bottom / left-right columns / grids), and page rhythm.
 - **Downgrade**: CSS gradients → Solid colors or split flex segments, Web components → Paragraph-level HTML, Complex SVGs → Simplified `<img>`s or solid geometries, Shadows → Delete or downgrade drastically, Custom fonts → Fallback towards system fonts.
 - **Rewrite**: Naked text → wrap inside `<p>` / `<h*>`, `background-image` → `<img>` tags, Backgrounds/borders on `<p>` → Outer div wrappers.
 
 ### Step 3 · Delivery Checklist (Transparent handover)
 
 Upon finishing the rewrite, provide a before/after list for the user, letting them know which visual details were simplified:
 
 ```
 Original Design → Editable version adjustments
 - Title area purple gradient → Dominant #5B3DE8 solid background
 - Data card shadow → Deleted (Replaced by a 2pt stroke to differentiate)
 - Complex SVG line chart → Simplified into an <img> PNG (generated from HTML screenshot)
 - Hero area web component animation → Static first frame (Web components cannot be translated)
 ```
 
 ### Step 4 · Export & Dual-Format Delivery
 
 - `editable` version HTML → Run `scripts/export_deck_pptx.mjs` to output an editable PPTX.
 - **Highly recommended to simultaneously keep** the original visual draft → Run `scripts/export_deck_pdf.mjs` to output a high-fidelity PDF.
 - Dual-format handover to user: PDF of the visual draft + Editable PPTX, each serving its own purpose.
 
 ### When to Outright Refuse Option B
 
 In certain scenarios, the cost of rewriting is too high and you should advise the user to abandon editable PPTX:
 - HTML's core value relies entirely on animation or interaction (Rewrite leaves only a static frame, losing 50%+ of information value).
 - Pages > 30, rewrite cost exceeds 2 hours.
 - Visual design deeply relies on precise SVGs / custom filters (Rewrite will look practically unrelated to the original).
 
 In such cases tell the user: "The cost to rewrite this deck is exorbitant; I strongly suggest delivering a PDF instead of a PPTX. If the receiver absolutely must have a PPTX format, please accept that the visuals will be heavily simplified—do you want to switch to a PDF?"
 
 ---
 
 ## Why the 4 Constraints are not Bugs but Physical Constraints
 
 These 4 constraints aren't because the author of `html2pptx.js` was lazy — they are the results of **the PowerPoint file format (OOXML)'s own constraints** projected onto HTML:
 
 - Text in PPTX must be placed within a text frame (`<a:txBody>`), matching paragraph-level HTML elements.
 - PPTX shapes and text frames are two distinct objects; you cannot paint a background and write text simultaneously on a single element.
 - PPTX shape fills have limited support for gradients (only certain preset gradients, rejecting arbitrary CSS gradient angles).
 - PPTX picture objects must reference actual image files, not CSS properties.
 
 Once understood, **do not expect the tools to magically get smarter** — the HTML syntax must adapt to the PPTX format, not the other way around.
