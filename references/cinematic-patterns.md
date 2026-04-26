# Cinematic Patterns - Best Practices For Workflow Demos

This reference describes five patterns for upgrading a workflow demo animation from "PPT with transitions" to launch-event-level cinematic storytelling.

The patterns were distilled from two real workflow demos: a persona-distillation workflow and an optimization workflow. They are reproducible in HTML animation work.

---

## 0. What This Document Solves

When you need to animate a workflow demo, typical scenarios include a skill workflow, product onboarding, API execution flow, or agent task execution. There are two common approaches:

| Pattern | What It Looks Like | Result |
|---|---|---|
| **PPT animation** (bad) | Step 1 fades in, then step 2, then step 3; four boxes sit side by side on one screen | Viewers feel it is just a slide with fade effects. There is no memorable moment. |
| **Cinematic** (good) | Scene-based; each moment focuses on one thing; scenes move through dissolve, focus pull, or morph transitions | Viewers feel it is a product-launch segment and want to screenshot/share it. |

The difference is not animation technology. The difference is the narrative model. This document explains how to move from the first model to the second.

---

## 1. Five Core Patterns

### Pattern A - Two-Layer Structure: Dashboard + Cinematic Overlay

**Problem**: A pure cinematic view often defaults to a black screen plus one play button. If users land on the page and do not click, they see nothing.

**Solution**:

```text
DEFAULT state, always visible:
  Complete static workflow dashboard
  -> The viewer can understand what the skill/workflow does at a glance.

POINT / play trigger:
  A cinematic overlay rises above the dashboard for around 22 seconds.
  -> When finished, it automatically fades back to DEFAULT.
```

**Implementation points**:

- `.dash` is visible by default.
- `.cinema` defaults to `opacity: 0; pointer-events: none`.
- `.play-cta` is a small button in the lower-right corner, not a giant centered overlay.
- On click: `cinema.classList.add('show')` and `dash.classList.add('hide')`.
- Use one `requestAnimationFrame` loop. Do not chain many `setTimeout` calls.
- After the cinematic finishes, call `endCinematic()` and reverse state.

**Anti-pattern**: default state equals a giant centered play overlay that covers everything, leaving the page blank before interaction.

---

### Pattern B - Scene-Based, Not Step-Based

**Problem**: Splitting animation into "show step 1 -> show step 2 -> show step 3" is still PPT thinking.

**Solution**: split the demo into five scenes. Each scene is an independent shot. The full screen focuses on one job at a time:

| Scene Type | Responsibility | Duration |
|---|---|---|
| 1. Invoke | User input or trigger, often terminal typewriter | 3-4s |
| 2. Process | Visualize the core workflow in a distinct visual language | 5-6s |
| 3. Result / Insight | Extract the key artifact or insight and visualize it | 4-5s |
| 4. Output | Show the actual product output: file, diff, data, preview | 3-4s |
| 5. Hero Reveal | Final hero moment: large type + value proposition | 4-5s |

**Total duration is around 22 seconds**. This tested length is usually enough to hook, unfold, close, and leave an impression.

- Shorter than 18 seconds: viewers often do not enter the state before it ends.
- Longer than 25 seconds: attention starts to decay.
- Around 22 seconds: usually enough for hook -> development -> closure -> memory.

**Implementation points**:

- Define one global timeline object, for example:

```js
const T = {
  DURATION: 22.0,
  s1_in: [0, 0.7],
  s2_in: [3.8, 4.6],
};
```

- Use one `requestAnimationFrame(render)` loop to compute opacity and transform for all scenes.
- Do not schedule animation with a `setTimeout` chain. It is brittle and hard to debug.
- Use `expoOut`, `easeOut`, or custom cubic-bezier easing. Avoid linear motion.

---

### Pattern C - Every Demo Needs Its Own Visual Language

**Problem**: After finishing one cinematic demo, it is tempting to reuse the same template for the next one: the same orbit, pentagon, typewriter, and hero typography with only the copy changed.

**Result**: viewers notice the two skills look identical. The design accidentally says the two workflows are not meaningfully different.

**Solution**: each workflow needs a different core metaphor, and therefore a different visual language.

Example contrast:

| Dimension | Persona Distillation Workflow | Optimization Workflow |
|---|---|---|
| Core metaphor | Collect -> distill -> write | Loop -> evaluate -> ratchet |
| Motion language | Floating, radial, pentagonal | Looping, climbing, comparison |
| Scene 2 | 3D orbit with archive cards floating in perspective | Spin loop with tokens running through six nodes |
| Scene 3 | Pentagon where five tokens radiate from the center | v1 vs v5 side-by-side diff |
| Scene 4 | SKILL.md typewriter | Hill-climb curve drawn full-screen |
| Scene 5 hero | Serif italic time/value lockup | Rotating gear plus progress tag |

**Test**: cover the text and look only at the visuals. Can you tell which demo it is? If not, the visual language is too generic.

---

### Pattern D - Use Real Or AI-Generated Assets, Not Emoji Or Hand-Drawn SVG

**Problem**: Workflow galleries often need floating fragments or object cards. Emoji look cheap and unbranded. Hand-drawn SVG book spines, documents, or product objects rarely look convincing.

**Solution**: generate a single 4x2 grid image containing eight theme-related objects with consistent lighting and style, then crop it into transparent PNG assets.

Asset-generation prompt principles:

- Anchor the intellectual property or visual world, for example "1960s Caltech archive aesthetic" or another relevant style system.
- Use a white background when extraction matters. Gray mood backgrounds often make transparent extraction harder.
- Prefer 4x2 over 5x5 to avoid last-row compression and uneven object scale.
- Add a persona finish, for example: "You are a magazine curator preparing an exhibition photo."

**Anti-pattern**: using emoji as icons, or CSS silhouettes as substitutes for real product imagery.

---

### Pattern E - Dual Track Audio: BGM + SFX

**Problem**: motion without audio often feels cheap, even when the visuals are competent.

**Solution**: use a long background music bed plus a small number of timed sound-effect cues.

General SFX cue recipe for workflow demos:

| Timing | SFX | Trigger |
|---|---|---|
| 0.10s | whoosh | Terminal or main panel rises in |
| 3.0s | enter | Typewriter completes and command executes |
| 4.0s | slide-in | Scene 2 elements enter |
| 5-9s, repeated | sparkle | Key process nodes, tokens, or data points |
| 14s | click | Switch into output scene |
| 17.8s | logo-reveal | Hero reveal moment |
| typewriter | type | Every 2 characters, but not too dense |

Frequency separation:

- BGM volume around 0.32 for low-frequency bed.
- SFX volume around 0.55 for mid/high punch.
- Sparkle around 0.7 when it must be noticed.
- Logo reveal around 0.85 for the strongest hero moment.

User control:

- Include a play overlay because browsers restrict autoplay.
- Include a small mute button in the top-right or control area.
- Do not force audio to play immediately when the page loads.

---

## 2. Static Dashboard Design

The dashboard is Layer 1 of the two-layer structure. A PM should understand the skill even without pressing play.

Use a three-column grid, or one large panel plus two smaller panels. Each panel should answer a real question:

| Panel Type | Question It Answers | Example |
|---|---|---|
| Pipeline / Flow Diagram | What is the workflow? | Four-stage pipeline, autoresearch loop |
| Snapshot / State | What does the real data look like? | Rubric snapshot, output summary |
| Trajectory / Evolution | How does it change across runs? | Hill-climb curve, revision history |
| Examples / Gallery | What has it produced before? | Artifact gallery, persona gallery |
| Example I/O Strip | What input produces what output? | `prompt -> generated skill/file/deck` |

Constraints:

- Information density must be high enough for each panel to carry differentiating information.
- Do not insert fake data just to fill space. Every number must mean something.
- The dashboard palette should align with the cinematic palette so switching layers feels natural.

---

## 3. Debug And Development Tools

Any long animation should ship with three development tools.

### Tool 1 - `?seek=N` Freeze At Second N

```js
const seek = parseFloat(params.get('seek'));
if (!isNaN(seek)) {
  started = true;
  muted = true;
  frozenT = seek;
  cinema.classList.add('show');
  dash.classList.add('hide');
}

let t = frozenT !== null ? frozenT : (elapsed % T.DURATION);
```

Usage: `http://.../slide.html?seek=12` opens the exact 12-second frame without waiting for playback.

### Tool 2 - `?autoplay=1` Skip The Play Overlay

Use this for Playwright screenshots, automated checks, and iframe embedding where the animation should start immediately.

### Tool 3 - Manual Replay Button

Place a small replay button in the top-right corner so the user or developer can replay the cinematic at any time.

```css
.replay {
  position: absolute;
  top: 18px;
  right: 18px;
  background: rgba(212,165,116,0.1);
  border: 1px solid rgba(212,165,116,0.3);
  color: #D4A574;
  font-family: monospace;
  font-size: 10px;
  letter-spacing: .28em;
  text-transform: uppercase;
  padding: 6px 12px;
  border-radius: 1px;
  cursor: pointer;
  backdrop-filter: blur(6px);
  z-index: 6;
}
```

---

## 4. Iframe Embedding Pitfalls

### Pitfall 1 - Parent Click Zones Intercept Buttons Inside The Iframe

If a deck index uses transparent left/right click zones for navigation, those zones can cover the iframe's internal play button. The user clicks play, but the parent interprets it as next slide.

Fix: give the click zones top and bottom margins, for example `top: 12vh; bottom: 25vh`, so the center play button and lower-right play button remain clickable.

### Pitfall 2 - Keyboard Events Disappear After Iframe Focus

After a user clicks inside the iframe, keyboard focus moves into the iframe and the parent no longer receives arrow key navigation.

Fix:

```js
iframe.addEventListener('load', () => {
  const doc = iframe.contentDocument;
  doc.addEventListener('keydown', (e) => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: e.key }));
  });
  doc.addEventListener('click', () => setTimeout(() => window.focus(), 0));
});
```

### Pitfall 3 - `file://` And `https://` Behave Differently

A cinematic can work locally under `file://` and then fail after deployment.

Reasons:

- Under `file://`, iframe `contentDocument` often appears same-origin.
- Under `https://`, it may still be same-origin if hosted together, but autoplay rules are stricter.

Fix:

- Before deployment, test through local HTTP, for example `python -m http.server`.
- Call `bgm.play()` only after the user clicks play. Do not start audio on page load.

---

## 5. Anti-Pattern Checklist

| Bad Pattern | Correct Pattern |
|---|---|
| Default is a black screen with a play overlay | Default is a static dashboard; play is auxiliary |
| Four steps sit side by side and fade in | Five full-screen scenes; each scene focuses on one thing |
| Reusing one template with different copy | Independent visual language for every demo |
| Emoji or hand-drawn SVG as materials | Generated or real assets, extracted into usable PNG/SVG material |
| No BGM and no SFX | Dual track: BGM plus timed SFX cues |
| `setTimeout` chain scheduling | `requestAnimationFrame` plus a global timeline object |
| Linear motion | Expo or cubic-bezier easing |
| No dev tools | `?seek=N`, `?autoplay=1`, and a replay button |
| Parent click zone eats iframe buttons | Add top/bottom margins to click zones |

---

## 6. Time Budget

For one complete cinematic workflow demo including the static dashboard:

| Task | Time |
|---|---|
| Design the 5-scene narrative and visual language | 30 minutes |
| Static dashboard layout and content | 1 hour |
| Implement five cinematic scenes | 1.5 hours |
| Audio cue timing and replay controls | 30 minutes |
| Playwright screenshot checks at key timestamps | 15 minutes |
| **Total for one demo** | **3-4 hours** |

The second demo can reuse the technical scaffold, but the visual language must still be independent. Budget roughly 2-3 hours.
