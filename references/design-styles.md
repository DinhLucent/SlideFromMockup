# Design Philosophy Style Library: 20 Systems

Use this reference when a brief needs visual direction, style recommendations, or a stronger design point of view before execution.

The goal is not to name-drop design studios. The goal is to translate a style into choices about layout, typography, color, imagery, interaction, density, and production constraints.

## Style x Scenario x Execution Quick Table

| No. | Style system | Best scenarios | Core visual logic | Main risk |
|---:|---|---|---|---|
| 01 | Pentagram / Michael Bierut | brand systems, executive decks | identity-led clarity, strong typography | too corporate if over-neutralized |
| 02 | Stamen Design | data, maps, research | data as landscape and story | decorative data without insight |
| 03 | Information Architects | knowledge products, essays | content-first hierarchy | too plain if typography is weak |
| 04 | Fathom Information Design | science, systems, evidence | explanatory visual rigor | overloaded diagrams |
| 05 | Locomotive | web narrative, launches | scroll rhythm and cinematic reveals | motion that hides content |
| 06 | Active Theory | immersive web, WebGL | spatial atmosphere and interaction | heavy runtime, unclear purpose |
| 07 | Field.io | generative visuals, cultural tech | algorithmic beauty | screensaver effect |
| 08 | Resn | experimental storytelling | playful interaction sequences | novelty over usability |
| 09 | Experimental Jetset | cultural posters, concept work | typographic minimalism | cold or inaccessible tone |
| 10 | Muller-Brockmann lineage | grids, systems, posters | Swiss structure and discipline | rigid monotony |
| 11 | Build | modern brand/product | restrained contemporary minimalism | under-designed if too empty |
| 12 | Sagmeister & Walsh | campaign, expressive identity | wit, emotion, surprise | noisy composition |
| 13 | Zach Lieberman | creative coding, education | code as gesture | gimmick without story |
| 14 | Raven Kwok | parametric motion, art tech | procedural rhythm | visual complexity overload |
| 15 | Ash Thorp | cinematic tech, trailers | dark cinematic precision | generic sci-fi look |
| 16 | Territory Studio | fictional UI, screen graphics | interface world-building | illegible micro-detail |
| 17 | Takram | strategy, design research | speculative clarity | too abstract if ungrounded |
| 18 | Kenya Hara | premium minimal, rituals | emptiness, tactility, pause | beige sameness |
| 19 | Irma Boom | books, editorial systems | publication as architecture | over-structuring |
| 20 | Neo Light Minimal | premium product, cultural tech | soft light, object poetry | atmosphere without function |

---

## I. Information Architecture School (01-04)

These styles are best when the user's problem is complexity: too much information, too many stakeholders, too many arguments, or too little trust.

### 01. Pentagram / Michael Bierut Style

**Use when**:

- The artifact must feel credible to executives or institutions.
- A brand or product needs a disciplined identity system.
- The deck/site should feel simple but not generic.

**Visual DNA**:

- Strong typographic hierarchy.
- Clear page architecture.
- Repeated identity devices.
- Simple geometric logic.
- Color used as system identity, not decoration.
- Confident white space.

**Execution cues**:

- Start with a small set of brand tokens.
- Build one recurring device: rule line, monogram, section marker, or numeric system.
- Use fewer components but make them precise.
- Prefer decisive alignment over ornamental layouts.
- Give every slide/page a clear "why this exists" role.

**Prompt DNA**:

```text
Create an identity-led layout system with disciplined typography, clear hierarchy,
repeatable section markers, and restrained color. It should feel like a serious
brand system, not a decorative template.
```

**Avoid**:

- Too many colors.
- Random icons.
- Decorative cards that do not support the identity.
- Weak typography disguised as minimalism.

### 02. Stamen Design / Data Poetics

**Use when**:

- The story is driven by data, geography, networks, or flows.
- A map, timeline, or dataset must become emotionally readable.
- The user wants something analytical but visually memorable.

**Visual DNA**:

- Data becomes texture, terrain, or motion.
- Fine-line density.
- Labels as editorial anchors.
- Soft contrast between macro pattern and micro detail.
- Visualization feels exploratory, not dashboard-like.

**Execution cues**:

- Lead with one data shape.
- Reveal scale before detail.
- Use annotations to make the insight readable.
- Keep color meaningful: category, intensity, or time.
- Make legends beautiful but secondary.

**Prompt DNA**:

```text
Turn the dataset into a visual landscape. Use fine-line data textures,
clear annotation, and editorial pacing so the audience sees both pattern
and meaning.
```

**Avoid**:

- Decorative data with no conclusion.
- Chart junk.
- Legends that are harder to read than the chart.
- Overly dark map aesthetics without contrast.

### 03. Information Architects / Content-First Principle

**Use when**:

- The artifact is mostly text, knowledge, or argument.
- Clarity is more important than spectacle.
- The audience needs to scan, compare, and understand quickly.

**Visual DNA**:

- Content hierarchy before ornament.
- Minimal surfaces.
- Strong rhythm between headings, body, notes, and links.
- Grids that support reading.
- Type scale does most of the visual work.

**Execution cues**:

- Write the content outline before designing.
- Assign each content type a typographic role.
- Keep line length comfortable.
- Use rules, spacing, and labels rather than decorative boxes.
- Make the page feel edited.

**Prompt DNA**:

```text
Design a content-first interface with rigorous hierarchy, generous reading rhythm,
minimal decoration, and typography that makes the structure self-evident.
```

**Avoid**:

- Turning every paragraph into a card.
- Overusing badges.
- Low contrast body text.
- Dense copy without sectioning.

### 04. Fathom Information Design / Scientific Narrative

**Use when**:

- Complex evidence needs to be explained.
- The product is technical, scientific, medical, or analytical.
- The audience needs a guided interpretation, not raw charts.

**Visual DNA**:

- Clear explanatory diagrams.
- Step-by-step logic.
- Precise labels and callouts.
- Evidence hierarchy.
- Neutral, trustworthy color.

**Execution cues**:

- Break the system into layers.
- Use arrows only when direction truly matters.
- Keep annotations close to the thing they explain.
- Distinguish observation, inference, and recommendation.
- Create a path for the eye.

**Prompt DNA**:

```text
Build a rigorous explanatory design with layered diagrams, precise labels,
and an evidence-first reading path. Make complexity understandable without
dumbing it down.
```

**Avoid**:

- Diagrams with no entry point.
- Too many arrows.
- Color categories that are not explained.
- Scientific aesthetics without actual reasoning.

---

## II. Motion Poetics School (05-08)

These styles are best when the user needs an experience, not just a static artifact.

### 05. Locomotive / Scroll Narrative Mastery

**Use when**:

- A website or product story needs progressive reveal.
- The artifact should feel premium and editorial.
- The user wants a memorable first-screen-to-next-section experience.

**Visual DNA**:

- Scroll-driven pacing.
- Large type and cinematic image crops.
- Sections that feel like scenes.
- Smooth transitions with clear spatial continuity.
- Interaction that guides attention instead of competing with content.

**Execution cues**:

- Define the story beats before designing sections.
- Let one scene transform into the next.
- Use motion to connect content, not to decorate.
- Keep scroll effects deterministic and performant.
- Provide enough static value if motion is disabled.

**Prompt DNA**:

```text
Create a cinematic scroll narrative with scene-based transitions, large editorial
typography, and motion that carries the user from one idea to the next.
```

**Avoid**:

- Scroll hijacking that makes the site hard to use.
- Parallax everywhere.
- Motion that delays access to core content.
- Huge assets without loading strategy.

### 06. Active Theory / WebGL Poets

**Use when**:

- The brief calls for immersive web, brand world, or a 3D-like hero.
- Interaction and atmosphere are central to the experience.
- The audience expects a technically impressive first impression.

**Visual DNA**:

- Spatial scenes.
- Reactive particles, shaders, or depth.
- Dark or high-contrast atmosphere when appropriate.
- Objects that respond to cursor or scroll.
- Audio/visual rhythm if the project supports it.

**Execution cues**:

- Use Three.js or a proven engine for real 3D.
- Keep the main scene full-bleed when 3D is the core experience.
- Verify canvas is nonblank on desktop and mobile.
- Provide fallback content.
- Keep performance budget explicit.

**Prompt DNA**:

```text
Design an immersive interactive scene with spatial depth, responsive motion,
and a high-performance WebGL feel. The experience should be technically
credible and tied to the product story.
```

**Avoid**:

- Blank or slow canvas.
- Decorative particles unrelated to the message.
- 3D inside tiny preview cards.
- Illegible copy on busy backgrounds.

### 07. Field.io / Algorithmic Aesthetics

**Use when**:

- The project involves culture, technology, data, or generative visuals.
- A brand needs a living visual system.
- The output can include motion, procedural imagery, or dynamic patterns.

**Visual DNA**:

- Algorithmic patterns.
- Dense but elegant fields.
- Repetition with variation.
- Mathematical rhythm.
- Visual systems that can generate many states.

**Execution cues**:

- Define the generative rule in plain language.
- Bind the visuals to data, user input, or story phase.
- Use restraint in color so the system remains readable.
- Capture still frames as part of QA.
- Ensure the pattern does not obscure content.

**Prompt DNA**:

```text
Create a generative visual system driven by clear rules, repetition with
variation, and data-like rhythm. It should feel designed, not random.
```

**Avoid**:

- Random noise sold as generative design.
- Dense patterns behind small text.
- Unbounded animation loops that distract from the task.

### 08. Resn / Narrative Interaction

**Use when**:

- The user wants experimental storytelling.
- The artifact can be playful without losing its purpose.
- Interaction is part of the content.

**Visual DNA**:

- Surprising interaction moments.
- Story scenes with strong personality.
- Playful transitions.
- Objects that invite manipulation.
- A sense of craft and oddness.

**Execution cues**:

- Make every playful moment serve a beat.
- Keep affordances understandable.
- Add small surprises, not constant chaos.
- Test on mobile early.
- Provide a direct path for users who do not want to play.

**Prompt DNA**:

```text
Build an experimental interactive story with playful scene transitions,
clear affordances, and moments of surprise that support the narrative.
```

**Avoid**:

- Novelty that blocks the user.
- Hidden navigation.
- Interaction that only works with a mouse.

---

## III. Minimalist School (09-12)

These styles are best when the user wants sharpness, restraint, and conceptual confidence.

### 09. Experimental Jetset / Conceptual Minimalism

**Use when**:

- The artifact is cultural, editorial, or concept-led.
- Typography itself can be the visual subject.
- The user wants austere confidence.

**Visual DNA**:

- Type as image.
- Limited palette.
- Strong alignment.
- Conceptual repetition.
- Minimal elements with high intent.

**Execution cues**:

- Reduce imagery unless it carries the concept.
- Use one typographic idea throughout.
- Make hierarchy through scale, weight, and position.
- Let negative space create tension.
- Keep copy short and deliberate.

**Prompt DNA**:

```text
Create a concept-led minimalist composition where typography carries the
visual identity through scale, alignment, and repetition.
```

**Avoid**:

- Generic Helvetica layouts with no concept.
- Over-explaining.
- Decorative gradients.

### 10. Muller-Brockmann Lineage / Swiss Grid Purism

**Use when**:

- Information needs strong order.
- The user wants a classic, international, systematic feel.
- Posters, reports, and decks need disciplined composition.

**Visual DNA**:

- Modular grid.
- Asymmetric balance.
- Clear typographic scale.
- Objective tone.
- Strict spatial rules.

**Execution cues**:

- Choose a grid before placing content.
- Align everything to the grid.
- Use contrast through scale and placement.
- Keep color purposeful and sparse.
- Make the composition feel inevitable.

**Prompt DNA**:

```text
Design with Swiss grid discipline: modular structure, asymmetric balance,
objective typography, and minimal color used with precision.
```

**Avoid**:

- Centering everything.
- Random offsets.
- Too many type sizes.
- Decorative icons outside the grid logic.

### 11. Build / Contemporary Minimal Brand

**Use when**:

- A product or company needs quiet modern polish.
- The user wants restrained but warm minimalism.
- The artifact should feel current without chasing trends.

**Visual DNA**:

- Simple identity marks.
- Calm typography.
- Controlled spacing.
- Practical components.
- Subtle material detail.

**Execution cues**:

- Use a small but complete design system.
- Make components feel real and reusable.
- Avoid empty hero minimalism by adding product proof.
- Keep color neutral with one or two accents.
- Prioritize alignment and consistency.

**Prompt DNA**:

```text
Create a contemporary minimal brand system with calm typography, practical
components, restrained color, and enough product detail to feel real.
```

**Avoid**:

- Minimalism as lack of content.
- Oversized empty whitespace.
- Decorative abstract blobs.

### 12. Sagmeister & Walsh / Joyful Minimalism

**Use when**:

- The brief needs emotion, wit, or campaign energy.
- A brand moment should feel memorable and expressive.
- The audience can accept visual personality.

**Visual DNA**:

- Surprise.
- Strong color or material contrast.
- Human wit.
- Bold type.
- Conceptual images.

**Execution cues**:

- Start from the idea, not from decoration.
- Add one memorable twist.
- Keep the composition controlled even when expressive.
- Use copy as part of the visual system.
- Make the emotional tone intentional.

**Prompt DNA**:

```text
Design an expressive campaign-like composition with wit, strong typography,
and one memorable visual twist while keeping the message immediately clear.
```

**Avoid**:

- Random playfulness.
- Too many jokes.
- Visual noise that hides the message.

---

## IV. Experimental Avant-Garde School (13-16)

These styles are strongest when the artifact needs technical aura, creative coding, or cinematic interface language.

### 13. Zach Lieberman / Code Poetics

**Use when**:

- The subject involves creative technology or education.
- You can show process, gesture, or transformation.
- The output benefits from hand-crafted interactive feel.

**Visual DNA**:

- Code-generated gestures.
- Soft experimental motion.
- Human imperfection.
- Simple inputs producing poetic outputs.
- Process visible on screen.

**Execution cues**:

- Create one clear interactive rule.
- Make the system respond gracefully.
- Keep the code-art element legible.
- Avoid overloading the interface around it.
- Use recording or screenshots to verify the visual state.

**Prompt DNA**:

```text
Create a poetic creative-coding experience where simple interaction produces
expressive visual behavior with a hand-made, exploratory feel.
```

**Avoid**:

- Random particles with no input logic.
- Hiding the actual content.
- Pretending a static illustration is interactive.

### 14. Raven Kwok / Parametric Aesthetics

**Use when**:

- The brief needs procedural motion, abstract systems, or visual complexity.
- A scene can be built from repeated parametric forms.
- The output is more like motion art than conventional UI.

**Visual DNA**:

- Parametric repetition.
- Precise geometry.
- Complex rhythms.
- Systematic transformation.
- High craft in motion timing.

**Execution cues**:

- Define parameters explicitly.
- Limit the palette to keep complexity readable.
- Use easing and phase offsets.
- Capture key frames for review.
- Keep title/copy outside the densest motion field.

**Prompt DNA**:

```text
Build a parametric visual system with repeated geometric forms, phase-shifted
motion, and controlled complexity. It should feel mathematically crafted.
```

**Avoid**:

- Complexity without hierarchy.
- Fast motion everywhere.
- Text placed over dense moving patterns.

### 15. Ash Thorp / Cinematic Tech Poetry

**Use when**:

- The project needs trailer-like energy.
- The subject is advanced technology, hardware, or speculative product.
- Mood, precision, and reveal are important.

**Visual DNA**:

- Cinematic framing.
- Dark controlled backgrounds when appropriate.
- Metallic or glass-like surfaces.
- Slow reveals.
- Sharp highlights and atmospheric depth.

**Execution cues**:

- Use restraint; one hero object or system should dominate.
- Avoid generic sci-fi dashboards.
- Make lighting intentional.
- Use camera language: push, orbit, reveal, hold.
- Keep copy sparse and high-impact.

**Prompt DNA**:

```text
Create a cinematic technology presentation with precise lighting, controlled
darkness, slow reveals, and a hero object or system that feels premium.
```

**Avoid**:

- Unreadable black-on-black scenes.
- Random HUD overlays.
- Blue neon cliches.

### 16. Territory Studio / Fictional Interface Systems

**Use when**:

- The project needs advanced interface world-building.
- A product concept, dashboard, or cinematic screen needs credibility.
- The visual can include dense technical UI details.

**Visual DNA**:

- Screen graphics.
- Layered interface panels.
- Micro labels.
- Technical diagrams.
- Motion language that feels operational.

**Execution cues**:

- Design the information model before the UI skin.
- Keep the main read path clear despite detail.
- Use microtext as texture only when it is not critical.
- Distinguish primary controls from ambient data.
- Avoid making every panel equally loud.

**Prompt DNA**:

```text
Design a believable advanced interface system with layered data panels,
technical labels, and cinematic screen-graphics detail while preserving
a clear primary read path.
```

**Avoid**:

- Fake data that contradicts itself.
- Illegible mission-control clutter.
- Too many glowing lines.

---

## V. Eastern and Editorial Restraint School (17-20)

These styles are useful when the artifact needs thoughtfulness, premium quiet, tactility, or publication intelligence.

### 17. Takram / Speculative Design Clarity

**Use when**:

- Strategy, research, and product futures need a refined form.
- The user wants an artifact that feels thoughtful and modern.
- The subject benefits from ambiguity handled with discipline.

**Visual DNA**:

- Clear speculative framing.
- Calm grids.
- Soft but precise visuals.
- Diagrammatic thinking.
- Research and imagination balanced.

**Execution cues**:

- Frame the question before the answer.
- Use diagrams to show relationships, not decoration.
- Keep tone calm and intelligent.
- Mix product reality with future possibility.
- Avoid overclaiming.

**Prompt DNA**:

```text
Create a speculative design presentation with calm structure, precise diagrams,
and a thoughtful balance between research evidence and future possibility.
```

**Avoid**:

- Abstract theory without concrete artifact.
- Vague futuristic language.
- Excessive minimalism that removes the argument.

### 18. Kenya Hara / Design of Emptiness

**Use when**:

- Premium quiet, ritual, or tactility is the goal.
- The product is physical, sensory, cultural, or lifestyle-oriented.
- The artifact benefits from pause and restraint.

**Visual DNA**:

- Emptiness as active space.
- Tactile surfaces.
- Soft light.
- Few objects.
- Strong attention to proportion.

**Execution cues**:

- Use large calm margins.
- Let one object or word carry the page.
- Avoid decorative busyness.
- Choose material images carefully.
- Make the pace slower.

**Prompt DNA**:

```text
Design a quiet premium composition where emptiness, tactile detail, soft light,
and proportion carry the experience. Use restraint as the main design action.
```

**Avoid**:

- Beige monotony.
- Empty screens with no idea.
- Stock wellness aesthetics.

### 19. Irma Boom / Book Architecture

**Use when**:

- The output is a long report, publication, portfolio, or narrative deck.
- Structure, sequence, and physical/page logic matter.
- The artifact should feel collectible and editorial.

**Visual DNA**:

- Page sequence as architecture.
- Strong cover/inside contrast.
- Unusual but systematic typography.
- Material thinking.
- Repetition with editorial variation.

**Execution cues**:

- Design the sequence, not only individual pages.
- Let page turns create rhythm.
- Use recurring motifs.
- Treat captions, indexes, and notes as designed matter.
- Make the deck feel like a coherent object.

**Prompt DNA**:

```text
Build the deck like a designed publication: sequence, rhythm, recurring motifs,
and editorial systems should make the whole artifact feel authored.
```

**Avoid**:

- Beautiful isolated pages with no sequence logic.
- Overly clever layouts that break reading.
- Treating footnotes as afterthoughts.

### 20. Neo Light Minimal / Soft Light Poetry

**Use when**:

- A premium product or cultural-tech artifact needs softness and depth.
- The user wants quiet atmosphere without losing modernity.
- Light, shadow, and object presence can carry emotion.

**Visual DNA**:

- Soft gradients created through light, not decorative blobs.
- Object-centered composition.
- Gentle contrast.
- Spacious typography.
- Subtle motion or reveal.

**Execution cues**:

- Use a real product/object/state as the first visual signal.
- Make light direction consistent.
- Avoid one-note beige or blue palettes.
- Keep text concise and physically placed.
- Use shadow to define depth, not to decorate every card.

**Prompt DNA**:

```text
Create a soft-light premium composition with object presence, spacious type,
subtle depth, and calm motion. It should feel poetic but still functional.
```

**Avoid**:

- Atmosphere without product clarity.
- Decorative orbs and blobs.
- Low-contrast text.

---

## Prompt Usage Guide

### Core Principle: Describe Mood, Not Layout

Do not prompt only for components:

```text
Make a hero with a title, subtitle, three cards, and a button.
```

Prompt for design behavior:

```text
Create a restrained identity-led product page with a strong typographic system,
one dominant product visual, clear proof points, and controlled editorial pacing.
```

Mood and logic produce better layouts than a shopping list of components.

### Good / Bad Examples

Bad:

```text
Use a premium design style.
```

Good:

```text
Use a contemporary minimal brand system: disciplined grid, calm typography,
subtle material detail, one strong product proof area, and no decorative filler.
```

Bad:

```text
Make it futuristic.
```

Good:

```text
Make the interface feel like a believable advanced operations screen:
layered data panels, precise labels, restrained motion, and a clear primary
decision path.
```

### Execution Path Selection

When choosing a direction:

1. Identify the user's domain.
2. Identify the artifact type.
3. Decide whether clarity, emotion, immersion, or editability is the main value.
4. Choose one primary style system.
5. Optionally blend one secondary style for texture.
6. Translate the style into concrete layout and component rules.

Example blends:

- Pentagram + Fathom: executive technical report.
- Locomotive + Build: premium product launch.
- Stamen + Information Architects: data essay.
- Territory + Ash Thorp: cinematic interface trailer.
- Kenya Hara + Neo Light Minimal: premium object landing page.

Do not blend more than two systems unless the user explicitly asks for experimentation.

### Quality Control

Before delivering a style recommendation or implementation, check:

- Does the style solve the brief, or is it just fashionable?
- Are layout, typography, color, media, and motion all aligned to the same philosophy?
- Is there a clear reason for every decorative element?
- Would a different agent understand the design rules from the artifact itself?
- Does the result avoid common AI defaults: generic cards, vague gradients, fake dashboards, empty hero copy, and decorative blobs?

### Recommendation Template

When the user asks for direction, provide three options:

```text
Option A: Conservative / category-native
- Why it fits:
- What it looks like:
- Assets needed:
- Risk:

Option B: Differentiated but practical
- Why it fits:
- What it looks like:
- Assets needed:
- Risk:

Option C: Bold reframing
- Why it fits:
- What it looks like:
- Assets needed:
- Risk:
```

Then ask the user to choose only if implementation cannot reasonably proceed without a direction. If the brief is clear enough, pick the strongest direction and build.
