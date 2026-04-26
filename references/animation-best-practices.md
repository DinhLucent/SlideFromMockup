# Animation Best Practices · Positive Animation Syntax

 > Derived from deep teardowns of Anthropic's 3 official product animations (Claude Design / Claude Code Desktop / Claude for Word), distilling "Anthropic-Tier" animation design rules.
 >
 > To be used in conjunction with `animation-pitfalls.md` (Pitfalls Checklist)—this document is **"What you should do,"** while pitfalls cover **"What you should NOT do."** They are orthogonal; read both.
 >
 > **Constraint Declaration**: This document strictly governs **motion logic and expressive style**, **introducing zero brand-specific hex color codes.** Color decisions follow the Core Asset Protocol (extracted from brand specs) or the "Design Direction Consultant". This reference strictly discusses **"How to move,"** not **"What color to be."**

 ---

 ## §0 · Who Are You · Identity and Taste

 > Before reading any technical rules below, read this section. Rules **emerge from identity**—not the other way around.

 ### §0.1 Identity Anchor

 **You are a motion designer who has studied motion archives from Anthropic / Apple / Pentagram / Field.io.**

 When animating, you are not manipulating CSS transitions—you are using digital elements to **simulate a physical world**, compelling the audience's subconscious to believe "this is an object with weight, momentum, and spill-over bounds."

 You do not create PowerPoint-style animations. You do not create "fade in fade out" animations. You create animations that **make the audience believe the screen is a physical space they can reach into.**

 ### §0.2 Core Beliefs (3 Iron Laws)

 1. **Animation is Physics, Not Curves**
    `linear` is a number; `expoOut` is an object. You believe the pixels on the screen deserve to be treated as "objects." By selecting an easing curve, you are answering a physics question: "How heavy is this element? What is its friction coefficient?"

 2. **Time Allocation is More Important Than Curve Shapes**
    Slow-Fast-Boom-Stop is your breathing. **Uniform-rhythm animations are technical demos; rhythmic animations are storytelling.** Slowing down at the precise moment is more critical than selecting the right easing at the wrong moment.

 3. **Yielding to the Audience is Harder Than Showing Off**
    Pausing for 0.5 seconds right before crucial results is **skill**, not compromise. **Granting the human brain time to react is the motion designer's highest virtue.** AI defaults to creating non-stop, maximum-density animations—that is amateurish. What you must practice is restraint.

 ### §0.3 Taste Standards · What is Beauty

 Here are your standards for judging "good" vs "great". Every principle has a **diagnostic method**—when looking at a candidate animation, use these questions to verify if it passes, rather than mechanically checking 14 rules.

 | Dimension of Beauty | Diagnostic Method (Audience Reaction) |
 |---|---|
 | **Physical Weight** | When the animation finishes, elements "**land**" firmly—they don't just "**stop**" there. The audience subconsciously feels "that has weight." |
 | **Yielding** | There is a perceivable pause (≥300ms) before critical information appears—the audience has time to "**see**" before continuing. |
 | **Negative Space** | It concludes abruptly + holds, never fading to black. The final frame is crisp, assertive, and decisive. |
 | **Restraint** | Only 1 moment in the entire film is "120% exquisite," the remaining 80% is purely appropriate—**Showing off everywhere signals cheapness.** |
 | **Hand-crafted Feel** | Uses arcs (not straight lines), irregularities (not `setInterval` mechanics), and breathes cleanly. |
 | **Respect** | Showcases the tweaking of parameters or fixing of bugs—**Never hide the labor, never give "magic."** AI is a collaborator, not a magician. |

 ### §0.4 Self-Audit · First Reaction Method

 Once an animation concludes, **what is the audience's first reaction?**—This is the singular metric you must optimize.

 | Audience Reaction | Rating | Diagnosis |
 |---|---|---|
 | "Looks pretty smooth" | good | Acceptable but lacks character; you made a PowerPoint. |
 | "That animation was incredibly seamless" | good+ | The technique is right, but lacks the "wow" factor. |
 | "That honestly looks like it just **floated up off the desk**" | great | You touched upon physical weight perception. |
 | "Doesn't look like AI made this at all" | great+ | You reached the Anthropic threshold. |
 | "I want to **screenshot this** to post on my feed" | great++ | You triggered active, voluntary virality. |

 **The difference between great and good isn't technical correctness; it is the judgment of taste.** Technical correctness + Correct Taste = Great. Technical correctness + Empty Taste = Good. Technical errors = You haven't started yet.

 ### §0.5 Relationship Between Identity and Rules

 The technical rules from §1 to §8 below are the **execution methods** for this identity in specific scenarios—not a disconnected checklist.

 - Encountering uncovered setups → Revert to §0, judge with **identity**, do not guess blindly.
 - Encountering rule conflicts → Revert to §0, judge with **taste standards** to find what matters more.
 - Want to break a rule? → First answer: "Which dimension of beauty from §0.3 does breaking it serve?" If you can answer, break it. If not, don't.

 Alright. Keep reading.

 ---

 ## Overview · Animation Unfolds Physics in Three Layers

 The foundational reason why most AI-generated animations feel cheap is: **they behave like "numbers" rather than "objects."**
 Physical objects possess mass, inertia, elasticity, and spill-over limits. The "premium feel" in Anthropic's 3 videos comes entirely from applying **physical world laws** to digital arrays.

 These rules exist across 3 layers:

 1. **Narrative Rhythm**: The Slow-Fast-Boom-Stop time allocation.
 2. **Motion Curves**: Expo Out / Overshoot / Spring, rejecting purely linear motions.
 3. **Expressive Languages**: Revealing the process, mouse arcing, Logo morph-convergence.

 ---

 ## 1. Narrative Rhythm · The Slow-Fast-Boom-Stop 5-Phase Sequence

 Anthropic's 3 videos flawlessly and uniformly follow this blueprint:

 | Phase | Proportion | Rhythm | Function |
 |---|---|---|---|
 | **S1 Trigger** | ~15% | Slow | Gives human reaction time, builds reality. |
 | **S2 Synthesis** | ~15% | Mid | Visual wow-factor emerges. |
 | **S3 Process** | ~40% | Fast | Showcases control / density / detailing. |
 | **S4 Eruption** | ~20% | Boom | Camera pulls back / 3D pop-out / Multi-panel emergence. |
 | **S5 Landing** | ~10% | Static | Brand logo + Abrupt halt. |

 **Specific Duration Mapping** (15-second animation example):
 S1 Trigger 2s · S2 Synthesis 2s · S3 Process 6s · S4 Eruption 3s · S5 Landing 2s

 **Absolute Bans**:
 - ❌ Uniform pacing (Density is static per second) — Induces rapid audience fatigue.
 - ❌ Continuous hyper-density — No peaks, entirely forgettable.
 - ❌ Fading out conclusions (Fade out to 0 opacity) — It must halt **abruptly** and assertively.

 **Self-Audit**: Use pen and paper to draw 5 thumbnails, each representing the climax of a phase. If the 5 pictures look largely identical, you failed the rhythm mapping entirely.

 ---

 ## 2. Easing Philosophy · Rejecting Linear, Embracing Physics

 All motion effects in Anthropic's vids use "dampened" Bezier curves. The default cubic easeOut (`1-(1-t)³`) is **not sharp enough**—it starts too weakly and halts too softly.

 ### The 3 Core Easings (Pre-built in animations.jsx)

 ```js
 // 1. Expo Out · Violent acceleration, excruciatingly slow braking (Most common default)
 // CSS Eq: cubic-bezier(0.16, 1, 0.3, 1)
 Easing.expoOut(t) // = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)

 // 2. Overshoot · Toggle with elasticity / Buttons popping
 // CSS Eq: cubic-bezier(0.34, 1.56, 0.64, 1)
 Easing.overshoot(t)

 // 3. Spring Physics · Geometry snapping back into place naturally
 Easing.spring(t)
 ```

 ### Usage Mappings

 | Scenario | Which Easing |
 |---|---|
 | Card rise-ins / Panel entries / Terminal fades / Focus overlays | **`expoOut`** (Primary default, 90% usage) |
 | Toggle switches / Button popups / Accentuated interactions | `overshoot` |
 | Geometry alignments / Physics fall-ins / UI jitter | `spring` |
 | Continuous drifting (Mouse coordinate interpolation) | `easeInOut` (Preserves symmetry) |

 ### Counter-intuitive Insight

 Most product promo animations are **too fast and too rigid**. `linear` makes elements feel like machines, `easeOut` represents a passing grade, but `expoOut` is the absolute technical root of the "premium feel"—it injects undeniable **physical weight** into binary systems.

 ---

 ## 3. Motion Language · 8 Shared Principles

 ### 3.1 Base Colors are Never Pure Black or White

 None of Anthropic's promos use `#FFFFFF` or `#000000` as the primary base. They use **neutral colors with a slight temperature** (warm or cool) granting the physical sensation of "Paper / Canvas / Desk", massively diluting the "machine aesthetic."

 **Specific color targeting** relies strictly on the Core Asset Protocol or the 20 Philosophy Matrix. This reference gives no hex codes—that is a **brand decision**.

 ### 3.2 Easing is never Linear

 Refer to §2.

 ### 3.3 Slow-Fast-Boom-Stop Narrative

 Refer to §1.

 ### 3.4 Showcase the "Process" Not the "Magical Result"

 - Claude Design showcases dragging sliders and tweaking params (Not a 1-click perfect UI generation).
 - Claude Code highlights error bugs + AI fixing it (Not succeeding immediately on try 1).
 - Claude for Word showcases Redline edits (Not instantly printing the finalized document).

 **The subtext**: The product is a **collaborator, a pair-programmer, a senior editor**—not a 1-click magician. This precisely annihilates the pain points professional users harbor regarding "controllability" and "authenticity."

 **Anti-AI slop**: By default, AI designs "magic 1-click solutions." **Doing the exact inverse**—highlighting the process, the tweaks, the bugs, and the iterative fixes—is the holy grail of brand identity.

 ### 3.5 Mouse Trails Must Be Hand-drawn (Arcs + Perlin Noise)

 Human mouse tracking is never perfectly linear; it follows "Start → Arc → Slow correction → Click".
 AI generating flawlessly linear mouse trails elicits **subconscious rejection**.

 ```js
 // Quadratic Bezier curve (Start → Control Point → Target)
 function bezierQuadratic(p0, p1, p2, t) {
   const x = (1-t)*(1-t)*p0[0] + 2*(1-t)*t*p1[0] + t*t*p2[0];
   const y = (1-t)*(1-t)*p0[1] + 2*(1-t)*t*p1[1] + t*t*p2[1];
   return [x, y];
 }

 // Path: Start → Deviate Midpoint → End (Creating the arc)
 const path = [[100, 100], [targetX - 200, targetY + 80], [targetX, targetY]];

 // Superimpose tiny Perlin Noise (±2px) generating the "hand shake"
 const jitterX = (simpleNoise(t * 10) - 0.5) * 4;
 const jitterY = (simpleNoise(t * 10 + 100) - 0.5) * 4;
 ```

 ### 3.6 Logo "Morphing Convergence"

 In all 3 videos, the Anthropic logo **never simply fades in**; it **morphs out of a preceding visual element.**

 **The Pattern**: In the final 1-2 seconds, trigger a Morph / Rotate / Converge, making the entire narrative physically "collapse" onto the brand point.

 **Low-cost implementation** (Without true morphing vectors):
 Force the previous element to "collapse" into a color block (scale → 0.1, translating to dead center), then the color block "expands" rapidly unraveling the wordmark. Transition using a hyper-fast 150ms cut + motion blur (`filter: blur(6px)` → `0`).

 ```js
 <Sprite start={13} end={14}>
   {/* Collapse: Prior element scale 0.1, opacity stays 1, filter blur surges */}
   const scale = interpolate(t, [0, 0.5], [1, 0.1], Easing.expoOut);
   const blur = interpolate(t, [0, 0.5], [0, 6]);
 </Sprite>
 <Sprite start={13.5} end={15}>
   {/* Expand: Logo emerges from the color block scale 0.1 → 1, blur 6 → 0 */}
   const scale = interpolate(t, [0, 0.6], [0.1, 1], Easing.overshoot);
   const blur = interpolate(t, [0, 0.6], [6, 0]);
 </Sprite>
 ```

 ### 3.7 Dual Typefaces (Serif + Sans-Serif)

 - **Brand / Voiceovers**: Serifs (Evoking "Academia / Publishing / Taste").
 - **UI / Code / Data Readouts**: Sans-serif + Monospacing.

 **Relying entirely on one font is wrong.** The Serif supplies "Taste," the Sans provides "Utility."

 ### 3.8 Focal Swapping = Background Dim + Foreground Sharpen + Flash Guiding

 Refocusing isn't simply dropping opacity. Here is the rigorous recipe:

 ```js
 // Filter compounding for non-focal components
 tile.style.filter = `
   brightness(${1 - 0.5 * focusIntensity})
   saturate(${1 - 0.3 * focusIntensity})
   blur(${focusIntensity * 4}px)        // ← CRITICAL: Blurring is what truly pushes objects "backward"
 `;
 tile.style.opacity = 0.4 + 0.6 * (1 - focusIntensity);

 // The moment focus completes, trigger a 150ms flash pulling human eyes backward
 focusOverlay.animate([
   { background: 'rgba(255,255,255,0.3)' },
   { background: 'rgba(255,255,255,0)' }
 ], { duration: 150, easing: 'ease-out' });
 ```

 **Why blur is mandatory**: Relying merely on opacity + brightness leaves out-of-focus elements visually "sharp," inherently denying any sense of depth-of-field regression. `blur(4-8px)` genuinely pushes the background back a layer.

 ---

 ## 4. Specific Motion Tactics (Copy-Paste Code Blocks)

 ### 4.1 FLIP / Shared Element Transition

 When a button "inflates" into an input box, it **is not** the button disappearing + a new box arriving. The core essence relies on **the exact same DOM element** translating across bounds, rather than cross-fading separate tags.

 ```jsx
 // Utilizing Framer Motion layoutId
 <motion.div layoutId="design-button">Design</motion.div>
 // ↓ Click updates UI whilst reusing identical layoutId
 <motion.div layoutId="design-button">
   <input placeholder="Describe your design..." />
 </motion.div>
 ```

 Native implementations rely fundamentally on https://aerotwist.com/blog/flip-your-animations/

 ### 4.2 "Breathing" Expansions (Width → Height)

 Real panels expanding **do not pull width and height simultaneously**, but logically pace:
 - First 40%: ONLY pulls width (Stretching sideways, crushing height tight).
 - Last 60%: Caps width entirely, dumping out height rapidly.

 This flawlessly mimics the "lay flat, then inject volume" reality of physical folding.

 ```js
 const widthT = interpolate(t, [0, 0.4], [0, 1], Easing.expoOut);
 const heightT = interpolate(t, [0.3, 1], [0, 1], Easing.expoOut);
 style.width = `${widthT * targetW}px`;
 style.height = `${heightT * targetH}px`;
 ```

 ### 4.3 Staggered Fade-up (30ms Stagger)

 When table rows, columns, or cards load, **delay every consecutive element exactly 30ms**, triggering `translateY(10px → 0)` smoothly.

 ```js
 rows.forEach((row, i) => {
   const localT = Math.max(0, t - i * 0.03);  // 30ms stagger
   row.style.opacity = interpolate(localT, [0, 0.3], [0, 1], Easing.expoOut);
   row.style.transform = `translateY(${
     interpolate(localT, [0, 0.3], [10, 0], Easing.expoOut)
   }px)`;
 });
 ```

 ### 4.4 Non-Linear Breathing · Pre-Result Pausing 0.5s

 Machines process instantly, but **suspend for 0.5 seconds right before crucial results**. Permit the human brain massive reaction timing.

 ```jsx
 // Typical scenario: AI processes → Pauses 0.5s → Result bleeds in
 <Sprite start={8} end={8.5}>
   {/* Dead static 0.5s pause — Move nothing. Force audience to watch loading */}
   <LoadingState />
 </Sprite>
 <Sprite start={8.5} end={10}>
   <ResultAppear />
 </Sprite>
 ```

 **Counter-example**: AI processes and instantly fires the result panel—humans inherently fail to decode the transition. Result = Slop.

 ### 4.5 Chunk Reveal · Simulating Raw Token Streams

 Do not stream AI character-by-character via `setInterval` (Looking like vintage movie typewriters). Rely on **chunk reveals**—popping 2-5 characters rapidly using randomized intervals simulating authentic token generation.

 ```js
 // Chunk parsing matching words + punctuation blocks
 const chunks = text.split(/(\s+|,\s*|\.\s*|;\s*)/);
 let i = 0;
 function reveal() {
   if (i >= chunks.length) return;
   element.textContent += chunks[i++];
   const delay = 40 + Math.random() * 80;  // Jittered randomly hitting 40-120ms
   setTimeout(reveal, delay);
 }
 reveal();
 ```

 ### 4.6 Anticipation → Action → Follow-through

 3 of the 12 Principles of Disney Animation heavily and explicitly relied heavily on by Anthropic natively:

 - **Anticipation**: A micro inverse motion just before the trigger (Button shrinks fractionally before exploding).
 - **Action**: The main motion sequence.
 - **Follow-through**: Residual trailing energy (Card settles into place then micro-bounces globally).

 ```js
 // Total 3-part matrix for standard loading entries natively
 const anticip = interpolate(t, [0, 0.2], [1, 0.95], Easing.easeIn);     // Prepare
 const action  = interpolate(t, [0.2, 0.7], [0.95, 1.05], Easing.expoOut); // Execute
 const settle  = interpolate(t, [0.7, 1], [1.05, 1], Easing.spring);       // Settle
 // Combined effectively relying on phase-splitting bounds seamlessly globally.
 ```

 ### 4.7 3D Perspective + translateZ Pushing

 Seeking the "Tilted 3D + Floating Cards" aesthetic perfectly requires mapping `perspective` bounds to containers, then altering uniquely scaled `translateZ` arrays onto individual elements flawlessly:

 ```css
 .stage-wrap {
   perspective: 2400px;
   perspective-origin: 50% 30%;  /* Tilts vantage slightly top-down viewing */
 }
 .card-grid {
   transform-style: preserve-3d;
   transform: rotateX(8deg) rotateY(-4deg);  /* THE Golden Asymmetry Ratio */
 }
 .card:nth-child(3n) { transform: translateZ(30px); }
 .card:nth-child(5n) { transform: translateZ(-20px); }
 .card:nth-child(7n) { transform: translateZ(60px); }
 ```

 **Why is `rotateX 8° / rotateY -4°` the absolute golden ratio**:
 - > 10° → Elements skew excessively, resulting in a feeling of them "falling down."
 - < 5° → Appears purely scaled or misaligned instead of offering 3D depth limits.
 - `8° × -4°` generates asymmetric layouts mirroring "a camera hovering explicitly over the top left quadrant overlooking the desktop" naturality smoothly beautifully intuitively.

 ### 4.8 Diagonal Panning · X & Y Simultaneous Drift

 Cinematic slides never strictly pan purely purely vertical or purely horizontal; they inherently merge **XY bounds together** mirroring diagonal drifting successfully effortlessly seamlessly.

 ```js
 const panX = Math.sin(flowT * 0.22) * 40;
 const panY = Math.sin(flowT * 0.35) * 30;
 stage.style.transform = `
   translate(-50%, -50%)
   rotateX(8deg) rotateY(-4deg)
   translate3d(${panX}px, ${panY}px, 0)
 `;
 ```

 **Core Logic**: Ensure X and Y are mathematically bound utilizing specifically different frequency parameters (e.g. `0.22 vs 0.35`) guaranteeing Lissajous curves effectively circumvent predictable repetitive structural drifting limits safely seamlessly.

 ---

 ## 5. Narrative Blueprints (The 3 Frameworks)

 Highly referenced from explicit Anthropic templates.

 ### Blueprint A · The Apple Keynote Cinematic (Claude Design Template)

 **Intended For**: Major software reveals, hero animations, visual awe-inspiring metrics.
 **Rhythm**: Heavy Slow-Fast-Boom-Stop pacing.
 **Easings**: Exclusively native `expoOut` + minor `overshoot` limits.
 **SFX Density**: Severe (~0.4/s).
 **BGM Profile**: High-end IDM / Minimal electronic waves.
 **Finale**: Sharp zoom out → mass morph → hollow drone ping → Cut to black.

 ### Blueprint B · The Unbroken One-Take Flow (Claude Code Desktop Template)

 **Intended For**: Developer tooling and pure productivity focus.
 **Rhythm**: Consistent flowing transitions devoid of volatile peaks.
 **Easings**: Heavily `spring` physics-oriented.
 **SFX Density**: Pure Zero (Auditory experience driven entirely by BGM and Voiceovers).

 ### Blueprint C · The Fluid Office Narrative (Document/Productivity Template)

 **Intended For**: Corporate suites, document editors, knowledge tools, and professional software.
 **Rhythm**: Multi-scene hard cuts plus dolly in/out movements across chapters.
 **Easings**: `overshoot` for toggles and interactive moments; `expoOut` for panels.
 **SFX Density**: Medium (~0.3/s), primarily subtle UI clicks.
 **BGM Profile**: Jazzy instrumental, minor key, approximately 90-95 BPM.
 **Core Highlight**: One scene should contain the film's memorable lift: 3D pop-out, panel rising off the plane, or a clean camera reveal.

 ---

 ## 6. Anti-Patterns · Do Not Do This

 | Anti-pattern | Why it fails | Correct approach |
 |---|---|---|
 | `transition: all 0.3s ease` | `ease` is close to linear and makes every element feel equally light. | Use `expoOut` plus per-element stagger. |
 | Every entrance is `opacity 0->1` | No directional momentum. | Pair opacity with `translateY 10->0` and anticipation. |
 | Logo only fades in | No narrative convergence or finality. | Morph, converge, collapse-then-expand, or assemble from parts. |
 | Mouse moves in a straight line | The subconscious reads it as robotic. | Use Bezier arcs plus subtle Perlin/noise variation. |
 | Typing one character at a time with `setInterval` | Looks like old subtitles, not modern AI output. | Use chunk reveal with randomized intervals. |
 | Critical result appears with no pause | The viewer has no reaction time. | Hold for about 0.5s before the result lands. |
 | Focus swaps only change opacity | Non-focused elements remain too sharp. | Use opacity, brightness, and blur together. |
 | Pure black or pure white background | Causes glare or generic cyber feel. | Use neutral colors with temperature from the brand/design system. |
 | Every motion has the same speed | No narrative rhythm. | Use Slow-Fast-Boom-Stop. |
 | Ending fades out | No decisive finish. | Stop abruptly and hold the last frame. |

 ---

 ## 7. Self-Audit Checklist (60 Seconds Before Publishing)

 - [ ] The narrative structure is Slow-Fast-Boom-Stop, not uniform pacing.
 - [ ] Default easing is `expoOut`, not `easeOut` or `linear`.
 - [ ] Toggles and button pops use `overshoot`.
 - [ ] Cards and lists enter with roughly 30ms stagger.
 - [ ] A critical result has a 0.5s pause before it appears.
 - [ ] Typing uses chunk reveal, not `setInterval` character popping.
 - [ ] Focus switching uses blur, not only opacity.
 - [ ] Logo motion physically converges or morphs instead of only fading.
 - [ ] Background color is not pure black or pure white.
 - [ ] Typography uses deliberate serif/sans hierarchy where the style calls for it.
 - [ ] Ending stops cleanly instead of fading away.
 - [ ] Mouse trails, if present, use arcs instead of straight lines.
 - [ ] SFX density matches the product personality.
 - [ ] BGM and SFX have roughly 6-8dB separation when mixed.
 - [ ] Final frame is a strong hold frame that can be screenshotted.

 ---

 ## 8. Relationship to Other References

 | Reference | Role | Relationship |
 |---|---|---|
 | `animation-pitfalls.md` | Technical traps | What not to do; use it as the defensive checklist. |
 | `animations.md` | Stage/Sprite engine usage | The coding grammar for writing the motion. |
 | `audio-design-rules.md` | Dual-track audio policy | How audio should match the motion language. |
 | `sfx-library.md` | Sound effect catalog | Practical SFX selection. |
 | `apple-gallery-showcase.md` | Specific motion style | A focused showcase pattern. |
 | **This file** | Positive motion syntax | What the animation should become. |

 **Recommended call order**:

 1. Use `SKILL.md` workflow questions to determine narrative role and visual temperature.
 2. Use this file to select motion language and blueprint A/B/C.
 3. Use `animations.md` and `animation-pitfalls.md` while writing code.
 4. Use `audio-design-rules.md` and `sfx-library.md` when exporting video with audio.

 ---

 ## Appendix · Source Scope

 This reference is distilled from product-animation teardown patterns and internal motion-analysis notes.

 It intentionally excludes:

 - Specific brand color codes.
 - Specific proprietary font requirements.
 - Product-name-dependent styling.
 - Any rule that belongs to the core asset protocol instead of motion design.

 Color and typography decisions should come from the brand asset protocol or the selected design philosophy. This document governs how elements move, pause, land, and resolve.
