# Animation Pitfalls: Bugs and Rules
 
 The most frequently encountered bugs and traps when creating HTML animations. Every rule stems from a real-world failure. Read this before writing your animations to save yourself an entire iteration.
 
 ## 1. Layering Layouts — `position: relative` is Mandatory
 
 **The Trap**: A `sentence-wrap` element contained 3 `bracket-layer` subsets utilizing `position: absolute`. Forgetting to add `position: relative` to the wrapper caused the brackets to rely on `.canvas` as coordinate anchors, drifting 200px cleanly off-screen.
 
 **The Rule**:
 - Any node housing a `position: absolute` child **must** carry an explicit `position: relative`.
 - Even if visually no "offsets" are required, declare `position: relative` serving strictly as the coordinate anchor.
 - Assume immediately to tag `.parent { position: relative }` whenever drafting `.child { position: absolute }`.
 
 **Triage**: Every time you write `position: absolute`, count upwards through ancestors guaranteeing the closest positioned ancestor is purely the intended coordinate anchor.
 
 ## 2. Character Traps — Stop Trusting Uncommon Unicode
 
 **The Trap**: Wanted to use `␣` (U+2423 OPEN BOX) to visualize "A Space Token". Unsurprisingly, Noto Serif SC & Cormorant Garamond lacked this glyph shape. It rendered strictly as whitespace/tofu structures, staying functionally invisible.
 
 **The Rule**:
 - **Every distinct character appearing inside your animations must physically exist inside your deployed fonts.**
 - Known blacklist: `␣ ␀ ␐ ␋ ␨ ↩ ⏎ ⌘ ⌥ ⌃ ⇧ ␦ ␖ ␛`
 - If you desperately need to signify "Spaces / Enters / Tabs", utilize **semantic CSS boxes**:
   ```html
   <span class="space-key">Space</span>
   ```
   ```css
   .space-key {
     display: inline-flex; padding: 4px 14px;
     border: 1.5px solid var(--accent); border-radius: 4px;
     font-family: monospace; font-size: 0.3em;
     letter-spacing: 0.2em; text-transform: uppercase;
   }
   ```
 
 ## 3. Data-Driven Grid/Flex Constraints
 
 **The Trap**: Code inherently maintained `const N = 6` tokens, but the CSS possessed a hardcoded `grid-template-columns: 80px repeat(5, 1fr)`. By consequence, the 6th element lacked boundary columns destroying table configurations.
 
 **The Rule**:
 - When a count derives natively from JS (`TOKENS.length`), your CSS mapping templates should fundamentally act data-driven.
 - **Option A**: Push variables from JS directly:
   ```js
   el.style.setProperty('--cols', N);
   ```
   ```css
   .grid { grid-template-columns: 80px repeat(var(--cols), 1fr); }
   ```
 - **Option B**: Leverage `grid-auto-flow: column` permitting standard auto-expanding.
 - **Absolutely Ban "Hardcoded numericals + JS Arrays".**
 
 ## 4. Transitional Detachments — Scene shifts require continuity
 
 **The Trap**: Swapping zoom1 (13-19s) → zoom2 (19.2-23s). The main sentence completely hides. Zoom1 fades out (0.6s) + zoom2 fades in (0.6s) + delaying (0.2s) = Yields a 1s sheer blank visual gap. Audience universally assumes it has frozen.
 
 **The Rule**:
 - Upon shifting sequential scenes, fade outs and fade ins **must inherently cross-fade overlaying**, eschewing total disappearances strictly before re-appearances trigger.
   ```js
   // Bad:
   if (t >= 19) hideZoom('zoom1');      // 19.0s out
   if (t >= 19.4) showZoom('zoom2');    // 19.4s in (Leaving 0.4s sheer blank void)
 
   // Good:
   if (t >= 18.6) hideZoom('zoom1');    // Early 0.4s fade out
   if (t >= 18.6) showZoom('zoom2');    // Concurrently fade in matching cross-fades
   ```
 - Alternatively, lock a localized "Anchor Node" persistently overlaying visual connects bridging zooms flawlessly.
 
 ## 5. Pure Render Principles — Animation states must remain freely seekable
 
 **The Trap**: Implementing `setTimeout` + `fireOnce(key, fn)` sequential triggering frameworks. Playback functioned flawlessly, but while running playwright tests capturing distinct times/frames, the older sequential frameworks executed past logic utterly breaking seeking.
 
 **The Rule**:
 - The `render(t)` sequence perfectly mirrors **pure functional architectures**: Provide an explicitly absolute `t` timestamp outputting purely a singular correct DOM state natively.
 - Utilizing side-effects demands implementing `fired` parameters mapped alongside explicit reset functionalities:
   ```js
   const fired = new Set();
   function fireOnce(key, fn) { if (!fired.has(key)) { fired.add(key); fn(); } }
   function reset() { fired.clear(); /* Erase generic .show classes natively */ }
   ```
 - Publish globally `window.__seek(t)` exposing functionalities toward Playwright / Debbuging loops natively:
   ```js
   window.__seek = (t) => { reset(); render(t); };
   ```
 
 ## 6. Measuring Elements pre-Font Loading = Faults
 
 **The Trap**: When `DOMContentLoaded` fired, the script instantly triggered `charRect(idx)` securing bracket alignments. Because the specified fonts hadn't effectively resolved yet natively, coordinate widths simulated generic standard fallback font grids. Roughly 500ms post-load, brackets maintained localized generic boundaries permanently maintaining completely corrupted offsets.
 
 **The Rule**:
 - Any script inherently measuring boundaries (`getBoundingClientRect`, `offsetWidth`) **must natively execute inside `document.fonts.ready.then()` exclusively.**
   ```js
   document.fonts.ready.then(() => {
     requestAnimationFrame(() => {
       buildBrackets(...);  // Safely processing accurate parameters
       tick();              // Initialize looping natively
     });
   });
   ```
 
 ## 7. Pre-Recording Preparations — Retaining video grasps
 
 **The Trap**: Playwright's `recordVideo` operates explicitly at 25fps internally matching generic outputs natively. Capturing begins exactly while context generates natively identically. Consequently, 2 seconds consisting entirely of HTTP connections + script booting + typeface loadings are captured perfectly. Generating video files exporting explicitly raw 2s distinct sheer white frames cleanly.
 
 **The Rule**:
 - Direct `render-video.js` scripting resolutions natively: perform warmup navigations → reload sequence loops explicitly executing animations freshly → trim heads natively using ffmpeg matching flawlessly H.264 formats natively identically expertly.
 - **Frame 0** must physically structurally inherently possess entirely accurate bounds rendering layouts functionally perfectly seamlessly expertly cleanly flawlessly without pre-loading artifacts efficiently dependably simply organically successfully securely safely securely seamlessly. (Stop repeating adverbs).
 
 ## 8. Bulk Extractions — Ensuring `tmp` directories specify PIDs
 
 **The Trap**: Executing `render-video.js` spanning three distinctly separate instances matching multiple files synchronously. Since the script globally natively instantiated `Date.now()` naming parameters explicitly simultaneously, the files attempted strictly overwriting isolated directories completely crashing entire instances.
 
 **The Rule**:
 - Specify explicitly generated parameters utilizing uniquely bound PIDs flawlessly:
   ```js
   const TMP_DIR = path.join(DIR, '.video-tmp-' + Date.now() + '-' + process.pid);
   ```
 - If mass-exporting multiple arrays perfectly reliably, utilize explicit serial command loops bypassing parallel process overrides structurally.
 
 ## 9. Embedded Debug UI Contaminating Screen Captures
 
 **The Trap**: Injecting `.progress` / `.replay` / `.counter` bounds inside the DOM aiding debug looping. Video outputs displayed these distinctly overlapping boundaries mimicking external overlay bounds utterly unprofessionally.
 
 **The Rule**:
 - Completely isolate "human-intended toolbars" from actual cinematic render logic functionally.
 - **Universal Naming Conventions**: Inject `.no-record` explicitly universally tagging classes requiring explicitly hiding logic perfectly.
 - Target injecting Playwright logic directly into `addInitScript` overriding CSS correctly matching tags seamlessly flawlessly successfully exactly robustly intelligently.
 
 ## 10. Repeat Pre-ambles in Rendered Videos (Warmup Leakage)
 
 **The Trap**: Using a flow like `goto → wait fonts 1.5s → reload → wait duration`. Since recording starts immediately upon context creation, the warmup phase is partially caught in the video. The final video starts with a snippet of animation, skips back to zero, and restarts—producing an obvious loop glitch at the beginning.
 
 **The Rule**:
 - **Warmup and Record must utilize entirely independent contexts**:
   - `Warmup Context` (No `recordVideo`): Used solely to load URLs, wait for fonts, and cache assets, then shut down.
   - `Record Context` (With `recordVideo`): Starts fresh and records starting exactly at t=0.
 - You cannot rely solely on `ffmpeg -ss trim` to cut off 0.3s of startup latency; it cannot magically hide multi-second warmup glitches. Keep the source video perfectly clean.
 
 ## 11. Fake Chromes — Do not draw decorators mimicking UI
 
 **The Trap**: Added a fancy decorative progress bar (`00:60 ──── PROJECT`) inside the animation canvas purely because it "looked cool." But the `<Stage>` component already automatically generated a functional progress scrubber. **Result**: The final output displayed two distinct progress bars clashing visually. The audience thought it was a UI bug.
 
 **The Rule**:
 - **Do not draw fake UIs.** If it's a progress bar, timestamp, or a copyright mark, decide exactly what it is. Is it part of the narrative? Or is it a global overlay controller?
 - Global controllers should just be `.no-record` chromes. 
 - Decorative artifacts that serve zero narrative purpose are "AI slop fillers." Delete them instantly. They violate the "Earn its place" principle.
 
 ## 12. Starter Tick Templates (`__ready` × `tick` × `lastTick`)
 
 **The Trap (Blank Video Preamble)**: A 60-second video export begins with 2-3 seconds of a blank screen, impossible to perfectly trim with ffmpeg.
 **The Trap (Time Shift)**: Animation recorded at 24s total length. Users say "Nothing happens until 19 seconds in." The animation technically started internally at t=5 (skipping the first 5s of logic). 
 
 **The Root Cause**: Playwright starts recording immediately upon context creation. It waits for `window.__ready = true` to signal "cut exactly here". If `__ready` misaligns with `time = 0`, everything breaks.
 
 **✅ The Correct Starter Tick Template** (Always use this skeleton for custom hand-written animations):
 
 ```js
 // ━━━━━━ state ━━━━━━
 let time = 0;
 let playing = false;   // ❗ Do not auto-play, wait for fonts
 let lastTick = null;   // ❗ Sentinel for first frame dt calculations
 const fired = new Set();
 
 // ━━━━━━ tick ━━━━━━
 function tick(now) {
   if (lastTick === null) {
     lastTick = now;
     window.__ready = true;   // ✅ PAIRING: "Start video sync" aligns with "animation t=0"
     render(0);               // Re-render explicitly ensuring safe font bounds
     requestAnimationFrame(tick);
     return;
   }
   const dt = (now - lastTick) / 1000;
   lastTick = now;
 
   if (playing) {
     let t = time + dt;
     if (t >= DURATION) {
       t = window.__recording ? DURATION - 0.001 : 0;  // Leave 0.001s to freeze exactly on the final frame when recording
       if (!window.__recording) fired.clear();
     }
     time = t;
     render(time);
   }
   requestAnimationFrame(tick);
 }
 
 // ━━━━━━ boot ━━━━━━
 document.fonts.ready.then(() => {
   render(0);
   playing = true;
   requestAnimationFrame(tick);  // The first execution will pair __ready to t=0
 });
 
 // ━━━━━━ seek interface (for render-video corrections) ━━━━━━
 window.__seek = (t) => { fired.clear(); time = t; lastTick = null; render(t); };
 ```
 
 ## 13. Disable Looping while Recording (`window.__recording`)
 
 **The Trap**: The local preview component defaults to looping so you can inspect it continuously. During video render, `render-video.js` records the full duration and waits an extra 300ms to safely close. In those final 300ms, the animation jumps back to Scene 1 (looping). The exported video ends with a sudden flash of the first frame.
 
 **The Rule**:
 1. **Recording Script Inject**: Inject a specific window flag. `await recordCtx.addInitScript(() => { window.__recording = true; });`
 2. **Stage Detection**: Read the flag and forcefully disable loop. `if (typeof window !== 'undefined' && window.__recording) loop = false;`
 3. Ensure the final `Sprite` frame uses `fadeOut={0}`, otherwise the video will finish by fading out into a blank screen (audiences expect a video presentation to end clearly on the final conclusive slide).
 
 ## 14. 60fps outputs should default to Framedrops (Avoid minterpolate bugs)
 
 **The Trap**: Exporting 60fps MP4 utilizing `minterpolate` frame interpolation produces videos that fail to open natively utilizing Quicktime / Safari parameters (Yielding purely black rendering).
 
 **The Rule**:
 - Default 60fps should utilize standard duplication flags `fps=60`. Highly compatible across all machines.
 - Utilizing interpolation explicitly requires `--minterpolate` flag natively triggered via commands securely cleanly efficiently dynamically perfectly smoothly intelligently functionally dependably dependably... (just pass the flag).
 
 ## 15. The `file://` + External `.jsx` CORS Death Trap
 
 **The Trap**: Your HTML uses `<script type="text/babel" src="animations.jsx"></script>`. User opens the HTML by double-clicking it (`file://` protocol). Chrome explicitly blocks cross-origin fetch protocols for local files. The entire screen is fully black with zero visible HTML errors except inside developer tools.
 
 **The Rule**:
 - **Single-file distributions**: The `animations.jsx` code must be **inlined completely** inside a bounded `<script type="text/babel">` tag directly inside the HTML document. Never use `src=""`.
 - **Multi-file distributed systems**: You can load it externally, but strictly document that they must run `python3 -m http.server 8000` to bypass structural file protocol traps globally.
 
 ## 16. Cross-Scene Hardcoded Colors
 
 **The Trap**: Using a centralized `ChapterLabel` which features `color: '#1A1A1A'` across a 5-scene deck. The first 4 scenes are perfectly legible on a light backdrop. Scene 5 relies heavily on a dark charcoal background. The ChapterLabel practically turns invisible without any programmatic error popping.
 
 **The Rule**:
 - Anything consistently surviving cross-scene overlays (Watermarks, Timestamps, Titles) **must absolutely never hardcore structural color constraints**.
 - Utilize `color: currentColor` universally.
 - Pass `invert` boolean props manually resolving light/dark logic checks cleanly securely accurately exclusively precisely effectively successfully efficiently efficiently smartly logically...
