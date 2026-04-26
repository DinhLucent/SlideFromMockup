# Deep Design Critique Guide

Use this reference when the user asks for a design review, scoring, critique, "does this look good", or a fix list. The goal is not taste commentary; the goal is an actionable diagnosis that preserves what works and identifies what blocks quality.

## Scoring Dimensions

Score each dimension from 0 to 10. Explain the score with concrete visual evidence.

### 1. Philosophy Alignment

| Score | Standard |
|---|---|
| 9-10 | The design fully expresses the selected philosophy. Every major decision has a clear rationale. |
| 7-8 | The overall direction is correct; a few details drift. |
| 5-6 | The intent is visible, but other styles are mixed in. |
| 3-4 | Surface imitation without understanding the design logic. |
| 1-2 | The design is unrelated to the stated direction. |

Check:

- Does the layout, typography, color, and rhythm match the chosen design direction?
- Are there contradictory elements?
- Would the page still feel like the same philosophy if the copy changed?

### 2. Visual Hierarchy

| Score | Standard |
|---|---|
| 9-10 | The eye moves naturally through the intended path. |
| 7-8 | Primary and secondary information are clear, with minor weak spots. |
| 5-6 | Title/body hierarchy exists, but middle levels are confused. |
| 3-4 | Information is flat and lacks a visual entrance. |
| 1-2 | The viewer does not know where to look first. |

Check:

- Is the title/body size contrast strong enough?
- Are there 3-4 clear information levels?
- Does whitespace guide the eye?
- Does the squint test still reveal structure?

### 3. Craft Quality

| Score | Standard |
|---|---|
| 9-10 | Pixel-level alignment, spacing, color, and typography are precise. |
| 7-8 | Polished overall, with 1-2 minor issues. |
| 5-6 | Basic alignment works, but spacing and color lack system. |
| 3-4 | Obvious alignment errors, chaotic spacing, too many colors. |
| 1-2 | Rough draft quality. |

Check:

- Is there a spacing system such as 8pt rhythm?
- Are repeated elements consistent?
- Are colors limited and purposeful?
- Are font families controlled?
- Are edges and baselines aligned?

### 4. Functionality

| Score | Standard |
|---|---|
| 9-10 | Every element serves the message or workflow. |
| 7-8 | Function is clear, with limited removable decoration. |
| 5-6 | Usable, but decorative elements distract. |
| 3-4 | Form dominates function; users must work to find information. |
| 1-2 | Decoration overwhelms communication. |

Check:

- If an element is removed, does the design get worse? If not, remove it.
- Is the CTA or key message in the most visible place?
- Does information density match the medium?
- Are UI states realistic and useful?

### 5. Originality

| Score | Standard |
|---|---|
| 9-10 | Fresh and specific while still fitting the chosen philosophy. |
| 7-8 | Has a point of view and avoids direct template use. |
| 5-6 | Competent but familiar. |
| 3-4 | Relies on cliches such as glowing blobs, fake dashboards, or generic AI gradients. |
| 1-2 | Pure template or asset collage. |

Check:

- Does it avoid common AI-output cliches?
- Does the design have a subject-specific metaphor?
- Are there surprising but justified decisions?

## Scenario-Specific Emphasis

| Scenario | Most Important | Secondary | Can Be Relaxed |
|---|---|---|---|
| Article cover / social graphic | Originality, visual hierarchy | Philosophy alignment | Functionality |
| Infographic | Functionality, visual hierarchy | Craft quality | Originality |
| PPT / Keynote | Visual hierarchy, functionality | Craft quality | Originality |
| PDF / white paper | Craft quality, functionality | Visual hierarchy | Originality |
| Landing page / website | Functionality, visual hierarchy | Originality | None |
| App UI | Functionality, craft quality | Visual hierarchy | Philosophy alignment |
| High-energy social graphic | Originality, visual hierarchy | Philosophy alignment | Fine craft |

## Common Design Problems

### 1. AI Tech Cliche

Problem: gradient blobs, circuit boards, robot faces, digital rain, generic glowing orbs.

Fix: replace literal symbols with a more specific metaphor based on the product or message.

### 2. Weak Type Hierarchy

Problem: title and body size are too close.

Fix: use at least 2.5x contrast between hero title and body copy for major compositions.

### 3. Too Many Accent Colors

Problem: everything is highlighted, so nothing is highlighted.

Fix: reserve accent color for the single main action, data point, or narrative transition.

### 4. Fake Density

Problem: panels are filled with meaningless metrics, chips, and icons.

Fix: remove fake numbers; use real examples, real UI states, or honest placeholders.

### 5. Decorative Icons Everywhere

Problem: every row has an icon, but the icons do not add meaning.

Fix: keep icons only where they help recognition or state.

### 6. Over-Rounded Generic Cards

Problem: standard SaaS cards dominate the composition.

Fix: let structure come from grid, typography, spacing, and real content.

### 7. Poor Brand Recognition

Problem: colors were guessed, but logo/product/UI imagery is absent.

Fix: run the Core Asset Protocol and secure logos, product images, or UI screenshots.

### 8. Layout Does Not Fit The Medium

Problem: a projector slide is too dense, or a PDF is too sparse.

Fix: decide audience distance first, then set font scale and density.

### 9. Inconsistent Imagery

Problem: multiple images have clashing lighting, angle, or visual style.

Fix: use fewer stronger images; normalize crop, exposure, and background.

### 10. Motion Without Narrative

Problem: elements move, but the story does not advance.

Fix: define scene roles: establish, process, proof, output, close.

## Review Output Template

```markdown
## Design Review

| Dimension | Score | Reason |
|---|---:|---|
| Philosophy Alignment |  |  |
| Visual Hierarchy |  |  |
| Craft Quality |  |  |
| Functionality |  |  |
| Originality |  |  |

### Keep
- ...

### Fix First
1. ...
2. ...
3. ...

### Quick Wins
- ...
```
