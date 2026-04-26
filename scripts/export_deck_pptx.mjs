#!/usr/bin/env node
/**
 * export_deck_pptx.mjs - export a multi-file slide deck into editable PPTX.
 *
 * Usage:
 *   node export_deck_pptx.mjs --slides <dir> --out <file.pptx>
 *
 * Behavior:
 *   - Calls scripts/html2pptx.js to translate HTML DOM elements into native PowerPoint objects.
 *   - Text is exported as true text frames and can be edited directly in PowerPoint.
 *   - Body size is 960pt x 540pt (LAYOUT_WIDE, 13.333" x 7.5").
 *
 * Important: HTML must satisfy the 4 hard constraints in references/editable-pptx.md:
 *   1. Text must be wrapped in <p>/<h1>-<h6>; div cannot directly contain text.
 *   2. Do not use CSS gradients.
 *   3. <p>/<h*> cannot carry background/border/shadow; put those on an outer div.
 *   4. div cannot use background-image; use <img>.
 *
 * Visually free-form HTML almost never passes after the fact; write to these constraints from line one.
 * For visual freedom first (animation, web components, CSS gradients, complex SVG),
 * use export_deck_pdf.mjs / export_deck_stage_pdf.mjs instead.
 *
 * Dependencies: npm install playwright pptxgenjs sharp
 *
 * Files are sorted by filename (01-xxx.html -> 02-xxx.html -> ...).
 */

import pptxgen from 'pptxgenjs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseArgs() {
  const args = {};
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i += 2) {
    const k = a[i].replace(/^--/, '');
    args[k] = a[i + 1];
  }
  if (!args.slides || !args.out) {
    console.error('Usage: node export_deck_pptx.mjs --slides <dir> --out <file.pptx>');
    console.error('');
    console.error('HTML must satisfy the 4 hard constraints in references/editable-pptx.md.');
    console.error('Use export_deck_pdf.mjs for visually free-form decks.');
    process.exit(1);
  }
  return args;
}

async function main() {
  const { slides, out } = parseArgs();
  const slidesDir = path.resolve(slides);
  const outFile = path.resolve(out);

  const files = (await fs.readdir(slidesDir))
    .filter(f => f.endsWith('.html'))
    .sort();
  if (!files.length) {
    console.error(`No .html files found in ${slidesDir}`);
    process.exit(1);
  }

  console.log(`Converting ${files.length} slides via html2pptx...`);

  const { createRequire } = await import('module');
  const require = createRequire(import.meta.url);
  let html2pptx;
  try {
    html2pptx = require(path.join(__dirname, 'html2pptx.js'));
  } catch (e) {
    console.error(`✗ Failed to load html2pptx.js: ${e.message}`);
    console.error(`  If dependencies are missing, run: npm install playwright pptxgenjs sharp`);
    process.exit(1);
  }

  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';  // 13.333 x 7.5 inch, matching HTML body 960 x 540 pt

  const errors = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const fullPath = path.join(slidesDir, f);
    try {
      await html2pptx(fullPath, pres);
      console.log(`  [${i + 1}/${files.length}] ${f} ✓`);
    } catch (e) {
      console.error(`  [${i + 1}/${files.length}] ${f} ✗  ${e.message}`);
      errors.push({ file: f, error: e.message });
    }
  }

  if (errors.length) {
    console.error(`\n${errors.length} slide(s) failed to convert. Common cause: HTML violates the 4 hard constraints.`);
    console.error(`  See references/editable-pptx.md for the common error checklist.`);
    if (errors.length === files.length) {
      console.error(`✗ All slides failed; PPTX was not generated.`);
      process.exit(1);
    }
  }

  await pres.writeFile({ fileName: outFile });
  console.log(`\n✓ Wrote ${outFile}  (${files.length - errors.length}/${files.length} slides, editable PPTX)`);
}

main().catch(e => { console.error(e); process.exit(1); });
