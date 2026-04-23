# Animations: Timeline Animation Engine

Read this when creating HTML animations/motion designs. Covers principles, usage, and typical patterns.

## Core Pattern: Stage + Sprite

Our animation system (`assets/animations.jsx`) provides a timeline-driven engine:

- **`<Stage>`**: The container for the entire animation. Automatically provides auto-scale (fit viewport) + scrubber + play/pause/loop controls.
- **`<Sprite start end>`**: A time segment. A Sprite is only visible between its `start` and `end` times. Internally, you can read its local progress `t` (0→1) via the `useSprite()` hook.
- **`useTime()`**: Reads the current global time (in seconds).
- **`Easing.easeInOut` / `Easing.easeOut` / ...**: Easing functions.
- **`interpolate(t, from, to, easing?)`**: Interpolates values based on `t`.

This pattern borrows from Remotion/After Effects logic but is lightweight and zero-dependency.

## Getting Started

```html
<script type="text/babel" src="animations.jsx"></script>
<script type="text/babel">
  const { Stage, Sprite, useTime, useSprite, Easing, interpolate } = window.Animations;

  function Title() {
    const { t } = useSprite();  // Local progress 0→1
    const opacity = interpolate(t, [0, 1], [0, 1], Easing.easeOut);
    const y = interpolate(t, [0, 1], [40, 0], Easing.easeOut);
    return (
      <h1 style={{ 
        opacity, 
        transform: `translateY(${y}px)`,
        fontSize: 120,
        fontWeight: 900,
      }}>
        Hello.
      </h1>
    );
  }

  function Scene() {
    return (
      <Stage duration={10}>  {/* 10 seconds total */}
        <Sprite start={0} end={3}>
          <Title />
        </Sprite>
        <Sprite start={2} end={5}>
          <SubTitle />
        </Sprite>
        {/* ... */}
      </Stage>
    );
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<Scene />);
</script>
```

## Common Animation Patterns

### 1. Fade In / Fade Out

```jsx
function FadeIn({ children }) {
  const { t } = useSprite();
  const opacity = interpolate(t, [0, 0.3], [0, 1], Easing.easeOut);
  return <div style={{ opacity }}>{children}</div>;
}
```

**Scope Warning**: `[0, 0.3]` means fading in during the first 30% of the sprite's lifecycle, and keeping opacity=1 for the remainder.

### 2. Slide In

```jsx
function SlideIn({ children, from = 'left' }) {
  const { t } = useSprite();
  const progress = interpolate(t, [0, 0.4], [0, 1], Easing.easeOut);
  const offset = (1 - progress) * 100;
  const directions = {
    left: `translateX(-${offset}px)`,
    right: `translateX(${offset}px)`,
    top: `translateY(-${offset}px)`,
    bottom: `translateY(${offset}px)`,
  };
  return (
    <div style={{
      transform: directions[from],
      opacity: progress,
    }}>
      {children}
    </div>
  );
}
```

### 3. Word-by-Word Typewriter

```jsx
function Typewriter({ text }) {
  const { t } = useSprite();
  const charCount = Math.floor(text.length * Math.min(t * 2, 1));
  return <span>{text.slice(0, charCount)}</span>;
}
```

### 4. Number Counter Up

```jsx
function CountUp({ from = 0, to = 100, duration = 0.6 }) {
  const { t } = useSprite();
  const progress = interpolate(t, [0, duration], [0, 1], Easing.easeOut);
  const value = Math.floor(from + (to - from) * progress);
  return <span>{value.toLocaleString()}</span>;
}
```

### 5. Phased Explanation (Typical Educational Animation)

```jsx
function Scene() {
  return (
    <Stage duration={20}>
      {/* Phase 1: Display Problem */}
      <Sprite start={0} end={4}>
        <Problem />
      </Sprite>

      {/* Phase 2: Display Approach */}
      <Sprite start={4} end={10}>
        <Approach />
      </Sprite>

      {/* Phase 3: Display Result */}
      <Sprite start={10} end={16}>
        <Result />
      </Sprite>

      {/* Captions visible throughout */}
      <Sprite start={0} end={20}>
        <Caption />
      </Sprite>
    </Stage>
  );
}
```

## Easing Functions

Preset easing curves:

| Easing | Characteristic | Applied In |
|--------|------|------|
| `linear` | Constant speed | Scrolling marquees, continuous motions |
| `easeIn` | Slow → Fast | Exits / Disappearances |
| `easeOut` | Fast → Slow | Entrances / Appearances |
| `easeInOut` | Slow → Fast → Slow | Positional changes |
| **`expoOut`** ⭐ | **Exponential ease-out** | **The Anthropic-tier primary easing** (Feel of physical weight) |
| **`overshoot`** ⭐ | **Elastic rebound** | **Toggles / Button popups / Emphasized interactions** |
| `spring` | Spring physics | Interactive feedback, geometry snapping back |
| `anticipation` | Reverse first, then forward | Emphasizing an upcoming action |

**The default primary easing is `expoOut`** (not `easeOut`) — see `animation-best-practices.md` §2. 
Entrances use `expoOut`, exits use `easeIn`, toggles use `overshoot` — This is the fundamental rule of Anthropic-tier animations.

## Rhythm and Duration Guidelines

### Micro-interactions (0.1-0.3 sec)
- Button hover
- Card expand
- Tooltip appearance

### UI Transitions (0.3-0.8 sec)
- Page switching
- Modal appearances
- List item insertions

### Narrative Animations (2-10 sec per segment)
- One phase of a conceptual explanation
- Data chart reveals
- Scene transformations

### **A single narrative segment must never exceed 10 seconds.**
Human attention spans are limited. Speak one concept within 10 seconds, and once done, switch immediately to the next.

## Design Processing Order

### 1. Let Content/Story precede Animation

**Incorrect**: wanting to do a fancy animation first, then stuffing content into it.
**Correct**: clarifying exactly what message to deliver, then using animation to serve that message.

Animation is a **signal**, not a **decoration**. Fading in emphasizes "this is important, look here"—if everything fades in, the signal dies.

### 2. Time-blocking by Scene

```
0:00 - 0:03   Problem emerges (fade in)
0:03 - 0:06   Problem scales/expands (zoom+pan)
0:06 - 0:09   Solution arrives (slide in from right)
0:09 - 0:12   Solution details unravel (typewriter)
0:12 - 0:15   Results demo (counter up + chart reveal)
0:15 - 0:18   Summary sentence (static, read for 3s)
0:18 - 0:20   CTA or fade out
```

Write the timeline first, then write the components.

### 3. Assets First

Gather the images/icons/fonts you need for the animation **early on**. Do not pause midway through drawing to search for assets—it breaks the rhythmic flow.

## Common Triage

**Animation stuttering / Jittery**
→ Primarily layout thrashing. Utilize `transform` and `opacity`. Never animate `top`/`left`/`width`/`height`/`margin`. The browser GPU accelerates `transform` natively.

**Animation is too fast, unable to read.**
→ Humans decode characters at roughly 100-150ms per letter, 300-500ms per word. If narrating using text, leave an absolute minimum of 3 seconds per sentence.

**Animation is too slow, audience is bored.**
→ Interesting visual shifts must be dense. A static screen held for over 5 seconds inherently feels slow.

**Multiple animations interfering with each other**
→ Utilize CSS `will-change: transform` to preemptively alert the browser that an element will shift, minimizing reflows.

**Recording to Video**
→ Utilize the skill's inherent toolchains (1 command produces 3 formats): See `video-export.md`
- `scripts/render-video.js` — HTML → 25fps MP4 (Playwright + ffmpeg)
- `scripts/convert-formats.sh` — 25fps MP4 → 60fps MP4 + Optimized GIF
- Need frame-perfect rendering precision? Turn `render(t)` into a pure function. See `animation-pitfalls.md` rule #5.

## Collaborating with Video Tools

This skill constructs **HTML animations** (running natively in browser). If your final output operates as video materials:

- **Short animations / Concept Demos**: Build HTML animations directly here → Export via screen recording.
- **Long videos / Heavy Narratives**: This skill focuses heavily on HTML animation formats. For long videos, utilize AI video generator skills or professional NLE software.
- **Motion Graphics**: Distinctly geared toward professional Adobe After Effects / Motion Canvas tooling.

## On Popmotion and physics libraries

If you severely require true underlying physics calculation engines (springs, decay, keyframes with precise physics), and our engine falls short, you can immediately fallback onto Popmotion:

```html
<script src="https://unpkg.com/popmotion@11.0.5/dist/popmotion.min.js"></script>
```

However, **try our engine first**. 90% of real-world scenarios are decisively covered natively.
