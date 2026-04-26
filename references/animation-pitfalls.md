# Animation Pitfalls: Bugs and Operating Rules

The most common bugs encountered while building HTML animations, plus the rules that prevent them.

Read this before writing animation code. It usually saves at least one failed iteration.

## 1. Layered Layout: `position: relative` Is the Default Obligation

**Observed failure**: A `sentence-wrap` element contained three absolutely positioned bracket layers. The wrapper did not set `position: relative`, so the bracket layers used `.canvas` as their coordinate system and drifted hundreds of pixels outside the intended text line.

**Rule**:

- Any container with `position: absolute` children must explicitly set `position: relative`.
- Even if the parent does not need visual offsetting, it still needs to be the coordinate anchor.
- Whenever you write `.child { position: absolute }`, immediately inspect the nearest parent that should own the coordinate system.

**Quick check**: For every `position: absolute`, walk upward through its ancestors and confirm the nearest positioned ancestor is the one you intended.

## 2. Character Trap: Do Not Depend on Rare Unicode Glyphs

**Observed failure**: The animation used `OPEN BOX` (`U+2423`) to visualize a space token. The selected fonts did not include the glyph, so the mark rendered as blank or tofu and the audience could not see it.

**Rule**:

- Every visible character used in the animation must exist in the selected font stack.
- Risky rare-character examples: `U+2423`, `U+2400`, `U+2410`, `U+240B`, `U+2428`, `U+21A9`, `U+23CE`, and OS-specific keyboard symbols.
- To show metacharacters such as space, return, or tab, build semantic boxes with CSS instead of relying on rare glyphs.

```html
<span class="space-key">Space</span>
```

```css
.space-key {
  display: inline-flex;
  padding: 4px 14px;
  border: 1.5px solid var(--accent);
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.3em;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
```

- Emoji also need verification. Some emoji fall back to monochrome boxes outside a dedicated emoji font. Prefer SVG or an explicit emoji font stack when the symbol matters.

## 3. Data-Driven Grid and Flex Templates

**Observed failure**: JavaScript rendered `const N = 6` tokens, while CSS hard-coded `grid-template-columns: 80px repeat(5, 1fr)`. The sixth token had no matching column and the whole matrix shifted.

**Rule**:

- If the count comes from a JavaScript array, the CSS template must also be data-driven.
- Option A: inject a CSS variable from JavaScript.

```js
el.style.setProperty("--cols", N);
```

```css
.grid {
  grid-template-columns: 80px repeat(var(--cols), 1fr);
}
```

- Option B: use `grid-auto-flow: column` and let the browser extend the structure.
- Do not combine fixed CSS numbers with JS constants. The JS value will change and the CSS will not.

## 4. Transition Gaps: Scene Changes Must Be Continuous

**Observed failure**: Scene `zoom1` ended at 19s, `zoom2` began at 19.2s, and both had fade durations and stagger delays. The main sentence was already hidden, so the viewer saw roughly one second of blank screen and assumed the animation froze.

**Rule**:

- Consecutive scene transitions must overlap fade-out and fade-in. Do not fully remove one scene before starting the next.

```js
// Bad:
if (t >= 19) hideZoom("zoom1");      // 19.0s out
if (t >= 19.4) showZoom("zoom2");    // 19.4s in; blank gap

// Good:
if (t >= 18.6) hideZoom("zoom1");    // start fade-out early
if (t >= 18.6) showZoom("zoom2");    // cross-fade
```

- Keep one anchor element visible across the transition when possible.
- Account for CSS transition duration and stagger delay. The next transition should not start after the visible frame is already empty.

## 5. Pure Render Principle: Animation State Must Be Seekable

**Observed failure**: The animation was orchestrated with chained `setTimeout` and `fireOnce(key, fn)`. Normal playback looked fine, but frame capture and arbitrary seeking could not reconstruct prior states after a timeout had already fired.

**Rule**:

- Ideally, `render(t)` is a pure function: given the same time `t`, it produces exactly one DOM state.
- If side effects are unavoidable, pair them with an explicit reset.

```js
const fired = new Set();

function fireOnce(key, fn) {
  if (!fired.has(key)) {
    fired.add(key);
    fn();
  }
}

function reset() {
  fired.clear();
  // remove all animation classes here
}
```

- Expose a seek hook for Playwright and debugging:

```js
window.__seek = (t) => {
  reset();
  render(t);
};
```

- Animation-related `setTimeout` calls should not span more than one second unless there is a strong reason and a reset path.

## 6. Measuring Before Fonts Load Means Measuring the Wrong Layout

**Observed failure**: The page measured character rectangles on `DOMContentLoaded`, before the target fonts loaded. The measured widths came from fallback fonts. Once the real fonts arrived, bracket positions stayed locked to stale coordinates.

**Rule**:

- Any layout code that depends on `getBoundingClientRect`, `offsetWidth`, or character positioning must wait for `document.fonts.ready`.

```js
document.fonts.ready.then(() => {
  requestAnimationFrame(() => {
    buildBrackets(...);
    tick();
  });
});
```

- The extra `requestAnimationFrame` gives the browser one frame to commit layout.
- When using remote fonts, add `preconnect` and still validate the exported screenshot.

## 7. Recording Preparation: Leave Hooks for Video Export

**Observed failure**: Playwright `recordVideo` starts recording when the context is created. Page loading and font loading were captured, producing two seconds of blank/flash frames at the head of the final MP4.

**Rule**:

- Use `render-video.js` to handle warmup navigation, clean recording context, duration waiting, ffmpeg trimming, and H.264 conversion.
- Frame 0 of the animation must be a complete initial state, not a blank loading state.
- For 60fps, use ffmpeg post-processing. Do not expect Playwright to capture native 60fps.
- For GIF, use the two-pass palette pipeline (`palettegen` + `paletteuse`) so a 1080p animation can stay compact.

See `video-export.md` for the complete command flow.

## 8. Batch Export: Temporary Directories Must Include PID or Randomness

**Observed failure**: Three `render-video.js` processes exported three HTML files in parallel. The temporary directory name used only `Date.now()`. Two processes started in the same millisecond, one cleaned the shared temp folder, and the others failed with `ENOENT`.

**Rule**:

- Any temp directory that might be touched by multiple processes must include a PID or random suffix.

```js
const TMP_DIR = path.join(
  DIR,
  `.video-tmp-${Date.now()}-${process.pid}`
);
```

- If you need parallel export, run separate shell jobs and wait for them rather than forking everything from one Node process.
- Conservative default: export serially. Two files can be parallelized carefully; three or more should usually queue.

## 9. Progress Bars and Replay Buttons Polluting Video Capture

**Observed failure**: The HTML included a progress bar, replay button, counter, and phase labels for human debugging. They appeared in the MP4 and made the deliverable look like a screen recording of the development UI.

**Rule**:

- Separate human chrome from the actual video content.
- Use the class `.no-record` for anything that should be hidden while recording.
- `render-video.js` should hide common chrome selectors by default:

```text
.progress
.counter
.phases
.replay
.masthead
.footer
.no-record
[data-role="chrome"]
```

- Inject this hiding CSS with Playwright `addInitScript` or `addStyleTag` so it survives reload.
- Add a `--keep-chrome` flag only when you intentionally want to record the controls.

## 10. Repeated Opening Frames: Warmup Leakage

**Observed failure**: The old flow was `goto -> wait fonts -> reload -> wait duration`. Recording began when the context was created, so the warmup phase captured part of the animation. After reload, the animation restarted. The final video contained a partial middle segment followed by the real beginning.

**Rule**:

- Warmup and recording must use separate browser contexts.
- The warmup context has no `recordVideo` option and is discarded.
- The record context is fresh and starts at animation time zero.
- ffmpeg trimming can remove small startup latency, but it cannot hide warmup leakage.
- Closing the Playwright context is what flushes the `.webm` file.

```js
// Phase 1: warmup (throwaway)
const warmupCtx = await browser.newContext({ viewport });
const warmupPage = await warmupCtx.newPage();
await warmupPage.goto(url, { waitUntil: "networkidle" });
await warmupPage.waitForTimeout(1200);
await warmupCtx.close();

// Phase 2: record (fresh)
const recordCtx = await browser.newContext({ viewport, recordVideo });
const page = await recordCtx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(DURATION * 1000);
await page.close();
await recordCtx.close();
```

## 11. Do Not Draw Fake Chrome Inside the Canvas

**Observed failure**: The `Stage` component already had a scrubber, timecode, and pause/replay controls marked as `.no-record`. A decorative in-canvas footer also drew a timecode-like progress bar. The user saw two progress bars and reported it as a bug.

**Rule**:

- `Stage` already owns scrubber, timecode, pause, and replay controls. Do not draw a second progress line, live timecode, copyright strip, or chapter counter in the scene unless the story itself requires it.
- "Magazine footer", "page number", "signature strip", and "version mark" are common filler generated by AI. Every such element must earn its place.
- If an in-scene bar is required because the animation is about player UI, it must be visually distinct from the Stage chrome.

**Ownership test**:

| Element type | Handling |
|---|---|
| Scene narrative content | Keep it. |
| Global control or debug chrome | Add `.no-record`; hide during export. |
| Neither scene content nor chrome | Remove it. It is filler. |

**Three-second self-check**:

- Does anything look like video-player UI inside the frame?
- Would removing it damage the story?
- Does progress, time, signature, or section information appear twice?

Examples of fake chrome: `00:42 ---- PROJECT NAME`, `CH 03 / 06`, bottom signature strips, edge version labels.

## 12. Blank Head and Offset Start: `__ready`, `tick`, and `lastTick`

**Observed failure A**: A 60-second animation exported with two to three seconds of blank video at the beginning. `ffmpeg --trim=0.3` could not fix it.

**Observed failure B**: A 24-second export looked like the first frame started around second 19. In reality, loading time was counted into the animation clock, so recording began at `t=5`, looped, and only showed the true beginning near the end.

**Root cause**:

Playwright starts writing video at `newContext()`. React, Babel, fonts, and layout may take several seconds. The recording script waits for `window.__ready === true` as the anchor for "animation starts here"; that signal must be paired with animation `time = 0`.

| Incorrect pattern | Symptom |
|---|---|
| Setting `__ready` in setup or `useEffect` before the first tick | The recorder thinks animation started while the page is still visually blank. |
| Initializing `lastTick = performance.now()` at top level | Font/loading time becomes the first `dt`, so animation starts in the middle. |

**Correct starter tick template**:

```js
// state
let time = 0;
let playing = false;
let lastTick = null;
const fired = new Set();

function tick(now) {
  if (lastTick === null) {
    lastTick = now;
    window.__ready = true;   // recording anchor and t=0 are paired
    render(0);
    requestAnimationFrame(tick);
    return;
  }

  const dt = (now - lastTick) / 1000;
  lastTick = now;

  if (playing) {
    let t = time + dt;
    if (t >= DURATION) {
      t = window.__recording ? DURATION - 0.001 : 0;
      if (!window.__recording) fired.clear();
    }
    time = t;
    render(time);
  }

  requestAnimationFrame(tick);
}

document.fonts.ready.then(() => {
  render(0);
  playing = true;
  requestAnimationFrame(tick);
});

window.__seek = (t) => {
  fired.clear();
  time = t;
  lastTick = null;
  render(t);
};
```

**Why this works**:

| Part | Reason |
|---|---|
| `lastTick = null` plus first-frame return | Loading time is not counted into animation time. |
| `playing = false` by default | The clock cannot advance while fonts are loading. |
| `__ready` set on the first tick | The recorder's start anchor matches real `t=0`. |
| `document.fonts.ready` | Avoids fallback-font measurement and first-frame font jumps. |
| `window.__seek` | Allows `render-video.js` to defensively reset the source to time zero. |

**Recorder-side defense**:

1. Inject `window.__recording = true` with `addInitScript` before `page.goto`.
2. Wait for `window.__ready === true`.
3. After readiness, call `window.__seek(0)` if it exists to force correction even when the HTML is imperfect.

**Verification**:

```bash
ffmpeg -i video.mp4 -ss 0 -vframes 1 frame-0.png
ffmpeg -i video.mp4 -ss $DURATION-0.1 -vframes 1 frame-end.png
```

Frame 0 must be the initial animation state. The final frame must be the intended end state, not a second-loop frame.

Reference implementations: `assets/animations.jsx` and `scripts/render-video.js`.

## 13. Disable Looping During Recording: `window.__recording`

**Observed failure**: The Stage component looped by default for browser preview. `render-video.js` recorded a little beyond the declared duration for buffer safety, which let the Stage start the next loop. The trimmed MP4 ended with a sudden jump to Scene 1.

**Root cause**: The HTML did not know it was being recorded.

**Rule**:

1. The recorder injects the signal before navigation.

```js
await recordCtx.addInitScript(() => {
  window.__recording = true;
});
```

2. The Stage component reads it and forces `loop=false`.

```js
const effectiveLoop =
  typeof window !== "undefined" && window.__recording ? false : loop;

if (next >= duration) {
  return effectiveLoop ? 0 : duration - 0.001;
}
```

3. End-frame sprites should use `fadeOut={0}` during recording. The user expects a clear final frame, not a fade to empty or black.

**Verification**: Extract a frame near the end and confirm it is still the final intended scene.

```bash
ffmpeg -ss 19.8 -i video.mp4 -frames:v 1 end.png
```

## 14. 60fps Video Defaults to Frame Duplication

**Observed failure**: `minterpolate=fps=60:mi_mode=mci...` produced a 60fps MP4 that failed in some QuickTime and Safari environments while VLC and Chrome could play it.

**Root cause**: Motion interpolation can emit H.264 streams with metadata or frame structures that some players handle poorly.

**Rule**:

- Default 60fps export should use a simple `fps=60` filter. This duplicates frames and is widely compatible.
- High-quality interpolation should be opt-in, for example `--minterpolate`, and must be tested in the target player before delivery.
- The 60fps label mostly helps platform ingestion; many CSS animations do not gain much perceived smoothness from interpolation.
- Add `-profile:v high -level 4.0` for broad H.264 compatibility.

```bash
bash convert-formats.sh input.mp4 --minterpolate
```

Use interpolation only when the target environment has been verified.

## 15. `file://` Plus External `.jsx` Causes CORS Failures

**Observed failure**: A single HTML animation loaded the engine with `<script type="text/babel" src="animations.jsx"></script>`. When opened by double-clicking the file, Babel tried to fetch the JSX through XHR under `file://`, and Chrome blocked it with a CORS error. The page went black and no `pageerror` explained the root cause.

Running a local HTTP server may not be enough in proxy-heavy environments because `localhost` can still be intercepted.

**Rule**:

- For single-file delivery, inline `animations.jsx` inside the HTML:

```html
<script type="text/babel">
  // Stage / Sprite engine here
</script>
```

- For project-directory delivery, external scripts are fine, but the README must state the server command clearly, such as `python -m http.server 8000`.
- Decide by delivery mode: if the user receives an HTML file, inline the engine.
- A 200-line inline Stage engine is acceptable for single-file handoff.

**Minimum verification**: Double-click the HTML and open it through `file://`. If the initial Stage frame renders, the delivery mode is valid.

## 16. Cross-Scene Inversion: Do Not Hard-Code Colors for Reused In-Canvas Elements

**Observed failure**: A multi-scene animation reused `ChapterLabel`, `SceneNumber`, and watermark elements. The component hard-coded dark text. It was visible on the first light scenes and vanished on a later dark scene. There was no runtime error, just invisible content.

**Rule**:

- Reused in-canvas elements that appear across multiple scene backgrounds must not hard-code text colors.
- Use one of these strategies:

1. `currentColor`: the component inherits color from the scene container.
2. `invert` prop: the scene passes an explicit light/dark mode to the component.
3. Automatic contrast: calculate color from the scene background in JS or CSS when available.

- Before delivery, capture representative frames from every scene and visually inspect reused labels, watermarks, chapter marks, and time labels.

This failure is hard to catch with logs. Human review or OCR is often required.

## Five-Second Preflight Checklist

- [ ] Every `position: absolute` child has the intended positioned parent.
- [ ] Special characters and emoji exist in the selected font stack or are replaced with CSS/SVG.
- [ ] Grid/Flex column counts are tied to data length.
- [ ] Scene transitions cross-fade; no blank gap longer than 0.3s.
- [ ] Measurement code runs after `document.fonts.ready`.
- [ ] `render(t)` is pure or has an explicit reset path.
- [ ] Frame 0 is a complete initial state, not blank.
- [ ] In-canvas fake chrome has been removed or moved into `.no-record` chrome.
- [ ] The first animation tick pairs `window.__ready = true` with `t=0`.
- [ ] Stage detects `window.__recording` and disables loops.
- [ ] Final sprites use `fadeOut={0}` when the exported video should hold the last frame.
- [ ] 60fps MP4 defaults to compatible frame duplication; interpolation is opt-in.
- [ ] Exported MP4 frame 0 and final frame have been extracted and checked.
- [ ] Single-file HTML delivery inlines the animation engine rather than referencing an external `.jsx`.
- [ ] Cross-scene labels, watermarks, and scene counters adapt to each scene background.
- [ ] Brand-specific work follows the asset protocol in `SKILL.md` before animation begins.
