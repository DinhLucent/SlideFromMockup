# Apple Gallery Showcase · Gallery Display Wall Animation Style

> Inspiration source: Claude Design official website hero video + Apple product page "Gallery wall" displays.
> Real-world origin: Slide ProMax release hero v5
> Applicable Scenarios: **Product launch hero animations, skill capability demos, portfolio showcases**—any scenario where you need to display "multiple high-quality outputs" simultaneously while guiding the viewer's attention.

---

## Trigger Condition: When to use this style

**Suitable for**:
- When you have 10+ real outputs to display on screen simultaneously (PPTs, Apps, Web pages, Infographics).
- The audience consists of professional viewers (developers, designers, product managers) who are sensitive to "texture."
- You wish to convey a vibe of "restraint, gallery-style, premium, spacious."
- You need the focal point and the global view to coexist (letting them see details without losing the whole picture).

**Not suitable for**:
- Single product focus (Use the `frontend-design` product hero template instead).
- Emotional/narrative-heavy animations (Use the timeline narrative template).
- Small screens / Vertical screens (The tilted perspective will become blurry on small displays).

---

## Core Visual Tokens

```css
:root {
  /* Light Gallery Palette */
  --bg:         #F5F5F7;   /* Main canvas background — Apple official website gray */
  --bg-warm:    #FAF9F5;   /* Warm off-white variant */
  --ink:        #1D1D1F;   /* Primary text color */
  --ink-80:     #3A3A3D;
  --ink-60:     #545458;
  --muted:      #86868B;   /* Secondary text */
  --dim:        #C7C7CC;
  --hairline:   #E5E5EA;   /* 1px border for cards */
  --accent:     #D97757;   /* Terracotta orange — Claude brand */
  --accent-deep:#B85D3D;

  --serif-cn: "Noto Serif SC", "Songti SC", Georgia, serif;
  --serif-en: "Source Serif 4", "Tiempos Headline", Georgia, serif;
  --sans:     "Inter", -apple-system, "PingFang SC", system-ui;
  --mono:     "JetBrains Mono", "SF Mono", ui-monospace;
}
```

**Key Principles**:
1. **Never use pure black backgrounds**. A black background makes the work look like a movie, rather than "adoptable work deliverables."
2. **Terracotta orange is the only hue accent**, everything else must be grayscale + white.
3. **Triple font stack** (serif EN + serif CN + sans + mono) creates the vibe of a "publication" rather than an "internet product."

---

## Core Layout Patterns

### 1. Floating Cards (The basic unit of the entire style)

```css
.gallery-card {
  background: #FFFFFF;
  border-radius: 14px;
  padding: 6px;                          /* Inner padding acts like "mounting paper" */
  border: 1px solid var(--hairline);
  box-shadow:
    0 20px 60px -20px rgba(29, 29, 31, 0.12),   /* Main shadow, soft and long */
    0 6px 18px -6px rgba(29, 29, 31, 0.06);     /* Secondary close glow, creates the floating feel */
  aspect-ratio: 16 / 9;                  /* Uniform slide ratio */
  overflow: hidden;
}
.gallery-card img {
  width: 100%; height: 100%;
  object-fit: cover;
  border-radius: 9px;                    /* Slightly smaller than card radius, visual nesting */
}
```

**Counter-example**: Do not use edge-to-edge tiles (no padding, no borders, no shadow)—that is an expression for infographic density, not an exhibition.

### 2. 3D Tilted Artwork Wall

```css
.gallery-viewport {
  position: absolute; inset: 0;
  overflow: hidden;
  perspective: 2400px;                   /* Deeper perspective, tilt is not exaggerated */
  perspective-origin: 50% 45%;
}
.gallery-canvas {
  width: 4320px;                         /* Canvas = 2.25× viewport */
  height: 2520px;                        /* Leave room for panning */
  transform-origin: center center;
  transform: perspective(2400px)
             rotateX(14deg)              /* Tilt backward */
             rotateY(-10deg)             /* Rotate to the left */
             rotateZ(-2deg);             /* Slight tilt to remove artificial neatness */
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 40px;
  padding: 60px;
}
```

**Parameter sweet spots**:
- rotateX: 10-15deg (Any more looks like an awards ceremony VIP photo-wall).
- rotateY: ±8-12deg (Sense of left/right symmetry).
- rotateZ: ±2-3deg ("This wasn't placed by a machine" human touch).
- perspective: 2000-2800px (<2000 causes fisheye effect, >3000 approaches orthographic projection).

### 3. 2×2 Four-Corner Convergence (Alternate Scenario)

```css
.grid22 {
  display: grid;
  grid-template-columns: repeat(2, 800px);
  gap: 56px 64px;
  align-items: start;
}
```

Each card glides into the center from its respective corner (tl/tr/bl/br) + fade in. The corresponding `cornerEntry` vectors:

```js
const cornerEntry = {
  tl: { dx: -700, dy: -500 },
  tr: { dx:  700, dy: -500 },
  bl: { dx: -700, dy:  500 },
  br: { dx:  700, dy:  500 },
};
```

---

## Five Core Animation Modes

### Mode A · Four-Corner Convergence (0.8-1.2s)

4 elements glide in from the viewport's four corners while scaling from 0.85 → 1.0, following an ease-out curve. Ideal for openings that "display multiple directional choices."

```js
const inP = easeOut(clampLerp(t, start, end));
card.style.transform = `translate3d(${(1-inP)*ce.dx}px, ${(1-inP)*ce.dy}px, 0) scale(${0.85 + 0.15*inP})`;
card.style.opacity = inP;
```

### Mode B · Selection Zoom + Others Glide Out (0.8s)

The selected card zooms from 1.0 → 1.28, while the remaining cards fade out + blur + drift back toward the four corners:

```js
// Selected
card.style.transform = `translate3d(${cellDx*outP}px, ${cellDy*outP}px, 0) scale(${1 + 0.28*easeOut(zoomP)})`;
// Unselected
card.style.opacity = 1 - outP;
card.style.filter = `blur(${outP * 1.5}px)`;
```

**Key**: Unselected cards must blur, not just purely fade. Blur simulates depth of field, visually "pushing out" the selected card.

### Mode C · Ripple Expansion (1.7s)

Expanding outward from the center, delayed by distance, each card successively fades in + scales down from 1.25x to 0.94x ("camera pulling back"):

```js
const col = i % COLS, row = Math.floor(i / COLS);
const dc = col - (COLS-1)/2, dr = row - (ROWS-1)/2;
const dist = Math.sqrt(dc*dc + dr*dr);
const delay = (dist / maxDist) * 0.8;
const localT = Math.max(0, (t - rippleStart - delay) / 0.7);
card.style.opacity = easeOut(Math.min(1, localT));

// Concurrent overall scale 1.25→0.94
const galleryScale = 1.25 - 0.31 * easeOut(rippleProgress);
```

### Mode D · Sinusoidal Pan (Continuous Drifting)

Leverage a combination of a sine wave + linear drift to avoid the "clear start and end" looped feeling of a marquee:

```js
const panX = Math.sin(panT * 0.12) * 220 - panT * 8;    // Drift left horizontally
const panY = Math.cos(panT * 0.09) * 120 - panT * 5;    // Drift up vertically
const clampedX = Math.max(-900, Math.min(900, panX));   // Prevent exposing the edge
```

**Parameters**:
- Sine period `0.09-0.15 rad/s` (Slow, roughly 30-50 seconds per oscillation).
- Linear drift `5-8 px/s` (Slower than a viewer's blink).
- Amplitude `120-220 px` (Large enough to be felt, small enough not to induce dizziness).

### Mode E · Focus Overlay (Focal Transition)

**Crucial Design**: The focus overlay is a **flat element** (not tilted) floating above the tilted canvas. The selected slide scales from its tile position (approx. 400x225) into the screen center (960x540). The background canvas does not change its tilt but **darkens to 45%**:

```js
// Focus overlay (flat, centered)
focusOverlay.style.width = (startW + (endW - startW) * focusIntensity) + 'px';
focusOverlay.style.height = (startH + (endH - startH) * focusIntensity) + 'px';
focusOverlay.style.opacity = focusIntensity;

// Background cards darken, but remain visible (Crucial! Do not use 100% mask)
card.style.opacity = entryOp * (1 - 0.55 * focusIntensity);   // 1 → 0.45
card.style.filter = `brightness(${1 - 0.3 * focusIntensity})`;
```

**Absolute Clarity Rule**:
- The `<img>` inside the Focus overlay MUST use a `src` directly linking to the original image; **do not reuse the compressed thumbnail from the gallery**.
- Pre-load all original high-res images in a `new Image()[]` array early on.
- Ensure the overlay's own `width/height` is calculated per frame so the browser resamples the original image every frame.

---

## Timeline Architecture (Reusable Skeleton)

```js
const T = {
  DURATION: 25.0,
  s1_in: [0.0, 0.8],    s1_type: [1.0, 3.2],  s1_out: [3.5, 4.0],
  s2_in: [3.9, 5.1],    s2_hold: [5.1, 7.0],  s2_out: [7.0, 7.8],
  s3_hold: [7.8, 8.3],  s3_ripple: [8.3, 10.0],
  panStart: 8.6,
  focuses: [
    { start: 11.0, end: 12.7, idx: 2  },
    { start: 13.3, end: 15.0, idx: 3  },
    { start: 15.6, end: 17.3, idx: 10 },
    { start: 17.9, end: 19.6, idx: 16 },
  ],
  s4_walloff: [21.1, 21.8], s4_in: [21.8, 22.7], s4_hold: [23.7, 25.0],
};

// Core easings
const easeOut = t => 1 - Math.pow(1 - t, 3);
const easeInOut = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
function lerp(time, start, end, fromV, toV, easing) {
  if (time <= start) return fromV;
  if (time >= end) return toV;
  let p = (time - start) / (end - start);
  if (easing) p = easing(p);
  return fromV + (toV - fromV) * p;
}

// Single render(t) function reads the timestamp and writes all elements
function render(t) { /* ... */ }
requestAnimationFrame(function tick(now) {
  const t = ((now - startMs) / 1000) % T.DURATION;
  render(t);
  requestAnimationFrame(tick);
});
```

**Architectural Essence**: **All states are derived from the timestamp `t`**; there are no state machines, no `setTimeout`s. As a result:
- Playing to an arbitrary moment via `window.__setTime(12.3)` instantly jumps there (Convenient for Playwright frame-by-frame screenshots).
- Loops naturally without seams (`t mod DURATION`).
- You can freeze exactly on an arbitrary frame when debugging.

---

## Textural Details (Easily overlooked but fatal)

### 1. SVG noise texture

Light backgrounds look terrible when they are "too flat." Overlay a very faint layer of fractalNoise:

```html
<style>
.stage::before {
  content: '';
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.078  0 0 0 0 0.078  0 0 0 0 0.074  0 0 0 0.035 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  opacity: 0.5;
  pointer-events: none;
  z-index: 30;
}
</style>
```

It looks like there's no difference until you remove it, then you'll realize it was there.

### 2. Corner Brand Identifier

```html
<div class="corner-brand">
  <div class="mark"></div>
  <div>SLIDE PROMAX - DESIGN</div>
</div>
```

```css
.corner-brand {
  position: absolute; top: 48px; left: 72px;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
}
```

Only displays during the artwork-wall scenes, fading in and out. Feels like an art gallery exhibition plaque.

### 3. Brand Conclusion Wordmark

```css
.brand-wordmark {
  font-family: var(--sans);
  font-size: 148px;
  font-weight: 700;
  letter-spacing: -0.045em;   /* Negative kerning is key; condenses text into a logo */
}
.brand-wordmark .accent {
  color: var(--accent);
  font-weight: 500;           /* The accent characters should actually be thinner for visual discrepancy */
}
```

`letter-spacing: -0.045em` is standard practice for large typography on Apple product pages.

---

## Common Failure Modes

| Symptom | Cause | Solution |
|---|---|---|
| Looks like a PPT template | Cards are devoid of shadows / hairlines | Add a double-layer box-shadow + 1px border. |
| Tilt feels cheap | Only `rotateY` was used without `rotateZ` | Add ±2-3deg of `rotateZ` to break the geometric rigidity. |
| Pan feels "stuttery/laggy" | Using `setTimeout` or CSS keyframe looping | Use `rAF` + continuous sin/cos functions. |
| Focus text is blurry | Reusing the low-res image from the gallery tiles | Use an independent overlay + direct raw-image `src`. |
| Background looks too empty | Using pure `#F5F5F7` flat color | Overlay an SVG fractalNoise with 0.5 opacity. |
| Typography is too "Internet startup" | Only using Inter | Append a Serif (EN & CN) + Mono triple stack. |

---

## Quotes & Reference

- Complete sample implementation: `demos/hero-animation-v5.html`
- Initial Inspiration: `claude.ai/design` hero video
- Aesthetic references: Apple Product Pages, Dribbble shot compilation screens

When faced with an animation request demanding "display multiple high-quality artworks," directly copy the skeleton from this file, swamp the contents + adjust timings, and you're good to go.
