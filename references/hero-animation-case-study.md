# Gallery Ripple + Multi-Focus - Scene Choreography Philosophy

> Extracted from the Slide ProMax hero animation v9: 25 seconds, 8 scenes. It describes **a reusable visual choreography structure**.
> This is not an animation production pipeline. It explains **when this choreography is the right choice**.
> Practical reference: `demos/hero-animation-v9.mp4`

## One-Sentence Rule

> **When you have 20+ homogeneous visual assets and the scene needs to communicate "scale and depth", prefer Gallery Ripple + Multi-Focus instead of stacked layout.**

Generic SaaS feature animations, product launch films, skill promotion videos, and series portfolio showcases can all use this structure as long as the asset volume is high enough and the visual style is consistent.

---

## What This Technique Actually Expresses

It is not "showing materials". It tells a narrative through **two rhythm changes**:

**Beat 1 - Ripple expansion (~1.5s)**: 48 cards spread outward from the center. The audience is hit by quantity: "this thing produces this much output."

**Beat 2 - Multi-Focus (~8s, 4 loops)**: while the camera slowly pans, the background dims and desaturates 4 times, and one card is enlarged to the center each time. The viewer moves from "impact of quantity" to "attention to quality". Each focus lasts a stable 1.7s.

**Core narrative structure**: **Scale (Ripple) -> Focus (Focus x4) -> Fade-out (Walloff)**. Together these three beats express **Breadth x Depth**: not only can it produce many things, each individual output is also worth stopping to inspect.

Anti-examples:

| Approach | Audience Perception |
|---|---|
| Static arrangement of 48 cards, no ripple | Pretty but has no narrative; it feels like a grid screenshot |
| Fast one-by-one cuts without gallery context | Feels like a slideshow and loses the sense of scale |
| Ripple without focus | Impressive but nothing specific is memorable |
| **Ripple + Focus x4** | **First shock by quantity, then attention to quality, then calm fade-out: a complete emotional arc** |

---

## Preconditions

This choreography **is not universal**. All 4 conditions below must be satisfied:

1. **Asset volume >= 20, ideally 30+**
   Fewer than 20 assets makes the ripple feel empty. A 48-slot grid only feels dense when almost every slot is active. v9 used a 48-slot grid filled from 32 images with looping/reuse.

2. **Assets share a consistent visual style**
   They should all be 16:9 slide previews, all app screenshots, all covers, or another coherent family. Aspect ratio, tone, and layout must feel like a set. Mixed assets make the gallery look like a clipboard.

3. **Each focused asset remains readable when enlarged**
   Focus enlarges one card to about 960px wide. If the source image becomes blurry or information-thin at that size, the focus beat fails. Reverse test: can you pick 4 representative cards from the grid? If not, the asset quality is uneven.

4. **The scene is landscape or square, not vertical**
   The gallery's 3D tilt (`rotateX(14deg) rotateY(-10deg)`) needs horizontal expansion. On vertical screens it becomes narrow and awkward.

Fallback paths when a condition is missing:

| Missing Condition | Fallback |
|---|---|
| Fewer than 20 assets | Use 3-5 static side-by-side cards + sequential focus |
| Inconsistent style | Use a cover + 3 chapter hero images in keynote style |
| Thin information | Use a data-driven dashboard or quote + large typography |
| Vertical screen | Use vertical scroll + sticky cards |

---

## Technical Recipe: v9 Battle-Tested Parameters

### 4-Layer Structure

```text
viewport (1920x1080, perspective: 2400px)
  -> canvas (4320x2520, large overflow) -> 3D tilt + pan
      -> 8x6 grid = 48 cards (gap 40px, padding 60px)
          -> img (16:9, border-radius 9px)
      -> focus-overlay (absolute center, z-index 40)
          -> img (matches selected slide)
```

**Key point**: the canvas is 2.25x larger than the viewport. This lets the pan feel like peeking into a larger world.

### Ripple Expansion: Distance-Based Delay

```js
// Each card's entrance time = distance from center x 0.8s delay.
const col = i % 8, row = Math.floor(i / 8);
const dc = col - 3.5, dr = row - 2.5;       // offset from center
const dist = Math.hypot(dc, dr);
const maxDist = Math.hypot(3.5, 2.5);
const delay = (dist / maxDist) * 0.8;       // 0 -> 0.8s
const localT = Math.max(0, (t - rippleStart - delay) / 0.7);
const opacity = expoOut(Math.min(1, localT));
```

**Core parameters**:

- Total duration: 1.7s, such as `T.s3_ripple: [8.3, 10.0]`
- Maximum delay: 0.8s; center appears earliest, corners latest
- Each card entrance duration: 0.7s
- Easing: `expoOut`; explosive, not merely smooth

**At the same time**: canvas scale moves from 1.25 -> 0.94, a zoom-out-to-reveal motion that supports the ripple expansion.

### Multi-Focus: 4 Rhythmic Beats

```js
T.focuses = [
  { start: 11.0, end: 12.7, idx: 2  },  // 1.7s
  { start: 13.3, end: 15.0, idx: 3  },  // 1.7s
  { start: 15.6, end: 17.3, idx: 10 },  // 1.7s
  { start: 17.9, end: 19.6, idx: 16 },  // 1.7s
];
```

**Rhythm law**: each focus lasts 1.7s with a 0.6s breathing gap. Total duration is about 8s, from 11.0s to 19.6s.

Inside each focus:

- In ramp: 0.4s with `expoOut`
- Hold: middle 0.9s with `focusIntensity = 1`
- Out ramp: 0.4s with `easeOut`

**Background change, the critical part**:

```js
if (focusIntensity > 0) {
  const dimOp = entryOp * (1 - 0.6 * focusIntensity);  // dim to 40%
  const brt = 1 - 0.32 * focusIntensity;               // brightness 68%
  const sat = 1 - 0.35 * focusIntensity;               // saturation 65%
  card.style.filter = `brightness(${brt}) saturate(${sat})`;
}
```

This is **not just opacity**. Desaturate and darken at the same time. That makes the foreground overlay's color pop out, instead of merely becoming "slightly brighter".

**Focus overlay size animation**:

- From 400x225 on entrance to 960x540 in hold state
- Outer treatment: 3 shadow layers + 3px accent outline ring, producing the feeling that the selected output is framed and inspected

### Pan: Continuous Motion Prevents Static Boredom

```js
const panT = Math.max(0, t - 8.6);
const panX = Math.sin(panT * 0.12) * 220 - panT * 8;
const panY = Math.cos(panT * 0.09) * 120 - panT * 5;
```

- Sine wave + linear drift creates two motion layers. It is not a pure loop; every moment lands in a different place.
- X and Y use different frequencies, 0.12 vs 0.09, which prevents the viewer from seeing the loop pattern.
- Clamp around +/-900px horizontally and +/-500px vertically to avoid drifting out.

**Why not pure linear pan**: viewers predict where pure linear motion will be in the next second. Sine + drift keeps each moment slightly new. Under 3D tilt it creates a subtle drifting-vessel feeling, in the good sense, and holds attention.

---

## 5 Reusable Patterns Distilled From v6 -> v9

### 1. Use `expoOut` as the primary easing, not `cubicOut`

`easeOut = 1 - (1-t)^3`, smooth, versus `expoOut = 1 - 2^(-10t)`, explosive then quickly converging.

**Why**: the first 30% of `expoOut` reaches about 90% quickly, closer to physical damping and the intuition of a heavy object landing. It is especially suitable for:

- Card entrance, giving weight
- Ripple expansion, giving shockwave feel
- Brand lift, giving settled arrival

**When to still use cubic/easeOut**: focus out ramps and symmetrical micro motion.

### 2. Warm paper background + terracotta accent

```css
--bg: #F7F4EE;        /* warm paper */
--ink: #1D1D1F;       /* nearly black */
--accent: #D97757;    /* terracotta */
--hairline: #E4DED2;  /* warm line */
```

**Why**: a warm background still breathes after GIF compression. Pure white becomes screen-like and flat. Terracotta as the only accent ties together the terminal prompt, selected directory card, cursor, brand hyphen, and focus ring.

**v5 lesson**: a noise overlay was added to simulate paper texture, but GIF compression destroyed it because every frame differed. v6 changed to "background color + warm shadow only". It preserved 90% of the paper feeling and reduced GIF size by about 60%.

### 3. Use two-level shadows to simulate depth instead of true 3D

```css
.gallery-card.depth-near { box-shadow: 0 32px 80px -22px rgba(60,40,20,0.22), ... }
.gallery-card.depth-far  { box-shadow: 0 14px 40px -16px rgba(60,40,20,0.10), ... }
```

Use a deterministic formula such as `sin(i * 1.7) + cos(i * 0.73)` to assign near/mid/far shadow levels. Visually it creates a sense of 3D stacking, while each frame's transform stays static and GPU cost stays low.

**Cost of true 3D**: individual `translateZ` per card means the GPU computes 48 transforms plus shadow blur every frame. v4 tried this and struggled during 25fps Playwright recording. The two-level shadow method looks within roughly 5% of the real effect but costs far less.

### 4. Font-weight morphing feels more cinematic than font-size morphing

```js
const wght = 100 + (700 - 100) * morphP;  // 100 -> 700 over 0.9s
wordmark.style.fontVariationSettings = `"wght" ${wght.toFixed(0)}`;
```

The brand wordmark morphs from Thin -> Bold over 0.9s, with slight letter-spacing adjustment such as `-0.045em -> -0.048em`.

**Why this beats scale up/down**:

- Viewers have seen scale animations too often; the expectation is fixed.
- Weight morphing feels like internal fullness, as if air is filling the form, rather than the word being pushed closer.
- Variable fonts became common after 2020, so viewers subconsciously read it as modern.

**Limit**: use a font that supports variable weight, such as Inter, Roboto Flex, Recursive, or equivalent. Static fonts can only fake it by switching fixed weights, which causes jumps.

### 5. Low-intensity persistent corner signature

During the gallery phase, place a small `SLIDE PROMAX - DESIGN` identifier in the top-left corner: around 16% opacity, 12px, wide letter spacing.

**Why add it**:

- After the ripple burst, viewers may lose the anchor of what they are watching. A light top-left identifier restores context.
- It is more premium than a full-screen giant logo. People who do brand work know that signatures do not need to shout.
- When a GIF is screenshotted or shared, the ownership signal remains.

**Rule**: show it only in the middle busy section. Hide it at the opening so it does not cover the terminal, and hide it at the end because the brand reveal is the protagonist.

---

## Anti-Examples: When Not To Use This Choreography

**Product demo that needs feature explanation**: Gallery makes every card flash by. The viewer will not remember any single feature. Use single-screen focus + tooltip annotation.

**Data-driven content**: viewers need time to read numbers. Gallery pacing does not give them that time. Use data charts + sequential reveal.

**Story narrative**: Gallery is a parallel structure; stories need cause and effect. Use keynote-style chapter transitions.

**Only 3-5 assets**: ripple density is not enough. It looks patched together. Use static arrangement + sequential highlighting.

**Vertical 9:16 scene**: 3D tilt needs horizontal expansion. In vertical format it looks crooked rather than expansive.

---

## How To Judge Whether Your Task Fits This Choreography

Three-step quick check:

**Step 1 - Asset quantity**: count how many same-type visual assets you have. Less than 15 -> stop. 15-25 -> possible but tight. 25+ -> use it confidently.

**Step 2 - Consistency test**: place 4 random assets side by side. Do they feel like one set? If not, unify style first or choose another structure.

**Step 3 - Narrative fit**: are you trying to express **Breadth x Depth**, meaning quantity x quality? Or are you expressing flow, features, or story? If it is not Breadth x Depth, do not force this pattern.

If all three checks are yes, fork the v6/v9 HTML structure, replace the `SLIDE_FILES` array and timeline, and reuse it. Change `--bg / --accent / --ink` to reskin without changing the skeleton.

---

## Related References

- Full technical flow: [references/animations.md](animations.md) and [references/animation-best-practices.md](animation-best-practices.md)
- Animation export pipeline: [references/video-export.md](video-export.md)
- Audio configuration, BGM + SFX dual-track: [references/audio-design-rules.md](audio-design-rules.md)
- Apple gallery style reference: [references/apple-gallery-showcase.md](apple-gallery-showcase.md)
- Source HTML: local `demos/hero-animation-v9/index.html` when available
