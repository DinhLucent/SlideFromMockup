# Video Export: HTML Animation to MP4/GIF

Use this reference when an HTML animation, hero sequence, product demo, or slide motion prototype needs to be delivered as video.

## When To Export

Export video when the user needs:

- A shareable MP4 preview.
- A social clip.
- A product-launch animation.
- A motion-design review artifact.
- A GIF thumbnail.
- A recording that can be embedded in a deck, website, or issue.

Keep the HTML source as the upstream artifact. MP4, 60fps MP4, and GIF are derivatives.

## Output Specifications

Default delivery set:

| Output | Default | Notes |
|---|---:|---|
| Base MP4 | 25fps or source fps | Good for review and small files. |
| 60fps MP4 | frame-duplicated 60fps | Compatible with QuickTime/Safari/Chrome/VLC. |
| GIF | 15fps | Use only for short previews. |
| First/last frame PNG | optional but recommended | Verifies export start and end state. |

Recommended canvas:

- 1920 x 1080 for standard landscape.
- 1080 x 1920 for vertical social clips.
- 1440 x 1080 or 1600 x 1200 only if the brief requires a 4:3-ish composition.

## Toolchain

### 1. `render-video.js`: HTML to MP4

This script should:

1. Open the HTML with Playwright.
2. Warm up fonts/assets in a throwaway context.
3. Start a fresh recording context.
4. Inject `window.__recording = true`.
5. Wait for `window.__ready === true` when available.
6. Call `window.__seek(0)` when available.
7. Record for the declared duration.
8. Convert Playwright WebM output to H.264 MP4 with ffmpeg.

Example:

```bash
node scripts/render-video.js ./animation.html ./out/animation.mp4 --duration 12 --width 1920 --height 1080
```

Useful flags:

```bash
node scripts/render-video.js ./animation.html ./out/animation.mp4 --duration 12
node scripts/render-video.js ./animation.html ./out/animation.mp4 --duration 12 --keep-chrome
node scripts/render-video.js ./animation.html ./out/animation.mp4 --duration 12 --trim 0.2
node scripts/render-video.js ./animation.html ./out/animation.mp4 --duration 12 --scale 2
```

### 2. Add Music or Sound Design

If the animation has background music or SFX, combine tracks after the visual MP4 export.

Recommended ffmpeg pattern:

```bash
ffmpeg -y \
  -i visual.mp4 \
  -i music.wav \
  -filter_complex "[1:a]volume=0.75[aud]" \
  -map 0:v:0 \
  -map "[aud]" \
  -c:v copy \
  -c:a aac \
  -b:a 192k \
  -shortest \
  final.mp4
```

For separate BGM and SFX:

```bash
ffmpeg -y \
  -i visual.mp4 \
  -i bgm.wav \
  -i sfx.wav \
  -filter_complex "[1:a]volume=0.55[bgm];[2:a]volume=1.0[sfx];[bgm][sfx]amix=inputs=2:duration=longest[aud]" \
  -map 0:v:0 \
  -map "[aud]" \
  -c:v copy \
  -c:a aac \
  -b:a 192k \
  -shortest \
  final.mp4
```

See `audio-design-rules.md` and `sfx-library.md` before adding audio.

### 3. Convert Formats: MP4 to 60fps MP4 and GIF

60fps compatibility mode:

```bash
ffmpeg -y \
  -i animation.mp4 \
  -vf "fps=60,format=yuv420p" \
  -c:v libx264 \
  -profile:v high \
  -level 4.0 \
  -pix_fmt yuv420p \
  animation-60fps.mp4
```

High-quality interpolation is opt-in:

```bash
ffmpeg -y \
  -i animation.mp4 \
  -vf "minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,format=yuv420p" \
  -c:v libx264 \
  -profile:v high \
  -level 4.0 \
  -pix_fmt yuv420p \
  animation-60fps-interpolated.mp4
```

Only use interpolation after testing the target player. Compatibility is less predictable.

GIF two-pass palette:

```bash
ffmpeg -y -i animation.mp4 \
  -vf "fps=15,scale=960:-1:flags=lanczos,palettegen" \
  palette.png

ffmpeg -y -i animation.mp4 -i palette.png \
  -lavfi "fps=15,scale=960:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5" \
  animation.gif
```

## Complete Standard Flow

Assume `$SKILL` points to this skill root. Replace paths as needed.

```bash
# 1. Record base MP4
node "$SKILL/scripts/render-video.js" ./demo.html ./out/demo.mp4 --duration 12 --width 1920 --height 1080

# 2. Derive 60fps MP4
ffmpeg -y -i ./out/demo.mp4 -vf "fps=60,format=yuv420p" -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p ./out/demo-60fps.mp4

# 3. Derive GIF
ffmpeg -y -i ./out/demo.mp4 -vf "fps=15,scale=960:-1:flags=lanczos,palettegen" ./out/palette.png
ffmpeg -y -i ./out/demo.mp4 -i ./out/palette.png -lavfi "fps=15,scale=960:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5" ./out/demo.gif
```

Expected outputs:

```text
demo.mp4          base review file
demo-60fps.mp4    platform-friendly MP4
demo.gif          lightweight preview
frame-0.png       optional first-frame QA
frame-end.png     optional final-frame QA
```

## Technical Notes for Debugging

### Playwright `recordVideo` Caveats

- Recording starts at browser context creation, not at `page.goto`.
- The video file is written only after the page/context closes.
- The raw output is WebM; use ffmpeg for MP4 delivery.
- Viewport size and `recordVideo.size` should match.
- A page that visually looks ready is not necessarily animation-ready; wait for `window.__ready` when the HTML provides it.

### `__ready` and `__seek`

Good animation HTML should expose:

```js
window.__ready = true;
window.__seek = (t) => render(t);
```

`__ready` means: fonts are ready, layout is stable, and the first animation frame is prepared.

`__seek(0)` allows the recorder to force the source back to time zero after readiness. This protects against small startup offsets.

### ffmpeg Trim

Trim only small recording latency:

```bash
ffmpeg -y -ss 0.25 -i raw.webm -t 12 -c:v libx264 -pix_fmt yuv420p out.mp4
```

Do not use trimming to hide warmup frames or a wrong animation clock. Fix the HTML start protocol instead.

### GIF Palette Rationale

Direct GIF conversion often causes banding and oversized files. The two-pass palette method:

1. Analyzes representative colors.
2. Applies the palette with controlled dithering.

This is especially important for gradients, shadows, and product UI captures.

## Pre-Flight Check Before Export

- [ ] HTML opens in the same mode the user will use (`file://` or server).
- [ ] No console errors.
- [ ] `document.fonts.ready` is used before measurement-sensitive layout.
- [ ] `window.__ready` exists or the first frame is manually verified.
- [ ] `window.__seek(0)` exists for timeline animations.
- [ ] `window.__recording` disables loops.
- [ ] Debug controls use `.no-record`.
- [ ] There is no fake progress bar or timecode inside the video frame.
- [ ] Duration matches the intended story, not just the page's auto-loop duration.
- [ ] First and final frames are clear and intentional.
- [ ] Audio is mixed with enough headroom if used.

## Delivery Notes To Include

When delivering video outputs, state:

- Source HTML path.
- MP4 path.
- GIF path if generated.
- Duration.
- Resolution.
- Frame rate.
- Whether audio is included.
- Any known tradeoff, such as editable PPTX text losing exact web typography.

Example:

```text
Exported:
- demo.mp4, 12s, 1920x1080, H.264, 25fps
- demo-60fps.mp4, 12s, 1920x1080, H.264, 60fps compatibility mode
- demo.gif, 960px wide, 15fps preview

Verified:
- first frame and final frame extracted
- no console errors
- debug chrome hidden
```

## Common Follow-Up Requests

### "Make it smoother"

First check the animation curves and timing in HTML. Do not default to interpolation. If source motion is choppy, 60fps output will not fix the design.

### "Make the file smaller"

Try:

```bash
ffmpeg -y -i input.mp4 -c:v libx264 -crf 24 -preset medium -pix_fmt yuv420p output-small.mp4
```

For GIF, reduce width, fps, or duration before lowering palette quality.

### "Make it vertical"

Do not crop the existing landscape MP4 unless the user accepts loss. Re-layout the HTML at `1080 x 1920` and re-record.

### "Add music"

Use audio references first. Keep BGM lower than SFX by roughly 6-8dB when both exist, and check the first and last second for abrupt cuts.

### "The MP4 opens black in Safari/QuickTime"

Re-encode with broad compatibility:

```bash
ffmpeg -y -i input.mp4 -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p -movflags +faststart output-compatible.mp4
```

Avoid `minterpolate` unless it has been tested in the target player.
