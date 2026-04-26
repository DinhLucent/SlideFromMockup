# Verification: Output Review Workflow

Verification is mandatory before delivery. The agent must inspect the artifact in a browser, catch console/runtime errors, and verify that the output matches the requested format.

## Verification Checklist

Use this sequence for websites, apps, decks, and animation exports. Skip a step only when the artifact type truly does not include that surface.

### 1. Browser Rendering Check

Always render the output in a real browser.

Required checks:

- Page opens without a blank screen.
- Initial viewport shows the intended first screen, not an intermediate loading state.
- Images, fonts, icons, and videos load.
- No visible fallback text or broken media icons.
- Layout uses the intended canvas size or responsive viewport.
- Text does not overlap, clip, or overflow buttons/cards/panels.

For static HTML, double-click or open through `file://` when the handoff is a single file. For app projects, run the local server expected by the repo.

### 2. Console Error Check

Open DevTools or use Playwright to collect:

- `pageerror`
- `console.error`
- failed network requests
- CORS errors
- missing local assets
- unhandled promise rejections

Warnings are not always blockers, but errors must be explained or fixed. A working visual page with hidden console exceptions is not considered verified.

Example Playwright pattern:

```js
page.on("console", (msg) => {
  if (msg.type() === "error") console.log("[console.error]", msg.text());
});

page.on("pageerror", (err) => {
  console.log("[pageerror]", err.message);
});
```

### 3. Multi-Viewport Check

At minimum, inspect:

- Desktop: `1440 x 900`
- Wide desktop: `1920 x 1080`
- Tablet: `1024 x 768`
- Mobile: `390 x 844`

For fixed-format slides, inspect the target slide size and one scaled browser view. Fixed slide canvases should keep their aspect ratio instead of stretching.

For responsive sites/apps, each viewport must be usable without horizontal scrolling unless the product intentionally uses a data table that requires it.

### 4. Interaction Check

If the artifact has controls, verify the expected flows:

- Buttons respond and do not cause layout shifts.
- Form controls accept input and preserve state.
- Keyboard navigation works when relevant.
- Menus, modals, tabs, accordions, filters, sliders, and toggles open and close correctly.
- Hover/focus states are visible but do not resize fixed controls.
- No click target is hidden behind an overlay.

For prototypes, test at least one happy path and one reversal path, such as open modal then close, select filter then clear, or advance slide then return.

### 5. Slide-by-Slide Check

For decks:

- Open the deck index and navigate every slide.
- Open each standalone slide file directly if using multi-file architecture.
- Confirm each slide has a stable label and expected order.
- Check speaker notes if notes are part of the output.
- Confirm page numbers, section labels, and repeated elements are consistent.
- Verify PDF/PPTX exports after generation, not just the source HTML.

For `deck_stage.js` single-file decks, verify stage navigation and direct hash/route navigation if implemented.

## Playwright Setup

Install Playwright if the repo does not already provide it:

```bash
npm install -D playwright
npx playwright install chromium
```

Python alternative:

```bash
pip install playwright
python -m playwright install chromium
```

Prefer the repo-local Playwright dependency for repeatable exports.

## Screenshot Best Practices

Screenshots are the fastest way to catch layout problems and communicate verification.

### Capture Full Page

```js
await page.screenshot({
  path: "artifacts/full-page.png",
  fullPage: true
});
```

### Capture Viewport

```js
await page.setViewportSize({ width: 1440, height: 900 });
await page.screenshot({ path: "artifacts/viewport.png" });
```

### Capture a Specific Element

```js
const el = page.locator(".slide").first();
await el.screenshot({ path: "artifacts/slide-01.png" });
```

### Capture High-Density Output

```js
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2
});
```

Use high-density captures for visual review. Use normal density for performance and automated regression checks.

### Wait for Animation and Fonts

```js
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts && document.fonts.ready);
await page.waitForTimeout(500);
```

For timeline animations, prefer a deterministic `window.__seek(t)` hook instead of waiting arbitrary milliseconds.

## Sharing Screenshots With the User

When working in the Codex desktop app, reference local screenshots with absolute paths in Markdown if visual confirmation is useful:

```md
![Preview](D:/MyProject/Slide_ProMax/artifacts/preview.png)
```

When the user only needs a status report, summarize the verification result instead of attaching every screenshot.

## When Verification Fails

### Blank Page

Check in this order:

1. Console errors and `pageerror`.
2. Missing script paths.
3. CORS caused by `file://` plus external JSX/module scripts.
4. Fonts or assets blocking rendering.
5. Runtime assumptions about `window`, `document`, or build-time globals.

For single-file HTML delivery, inline critical scripts and assets or provide an explicit server command.

### Animation Stutters or Starts Late

Check:

- `window.__ready` is paired with the first real animation frame.
- `document.fonts.ready` gates layout-sensitive work.
- `lastTick` starts as `null`.
- The first exported frame is `t=0`.
- Recording mode disables loops with `window.__recording`.

See `animation-pitfalls.md` and `video-export.md`.

### Font Looks Wrong

Check:

- Font URL loads under the current protocol.
- Export waits for `document.fonts.ready`.
- The target glyphs exist in the font.
- PPTX export may intentionally fall back to system fonts if editable text is required.

### Layout Is Misaligned

Check:

- Hard-coded dimensions versus responsive constraints.
- Missing `position: relative` parent for absolute children.
- Global CSS leakage in single-file decks.
- Browser zoom and screenshot viewport.
- Container aspect ratio for fixed-format slides.

## Verification Is a Second Pair of Design Eyes

Verification is not just an engineering checklist. It is the final design pass.

Look for:

- Visual hierarchy that matches the story.
- Unintended clutter or filler UI.
- Repeated components that should vary by slide/scene.
- Excessive density.
- Copy that does not fit the available space.
- Contrast problems across light and dark scenes.
- Controls that look decorative instead of usable.

If the artifact looks functional but not finished, iterate before delivery.

## Common Verification Commands

Basic open, screenshot, and error collection:

```bash
node scripts/verify.js ./index.html --screenshot artifacts/preview.png
```

Multiple viewport pass:

```bash
node scripts/verify.js ./index.html --viewports 390x844,1024x768,1440x900
```

Deck pass:

```bash
node scripts/export_deck_pdf.mjs ./index.html ./artifacts/deck.pdf
```

Output directory:

```bash
node scripts/verify.js ./index.html --out artifacts/verify
```

Visible browser mode:

```bash
node scripts/verify.js ./index.html --headed
```

If these helper scripts are not present in the current repo, use the same checks manually through Playwright.
