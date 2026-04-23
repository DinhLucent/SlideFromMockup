# MASTER BRIEF

Project:
- HTML-first slide deck about parenting, education, and AI.
- Need isolated illustration assets for 20 slides.
- Final use is HTML presentation rendering, not posters with embedded text.

Master style prompt:

```text
Warm editorial family-and-learning illustration, soft rounded geometry, watercolor-flat hybrid, premium presentation style, calm emotional tone, minimal facial details, expressive posture, pastel paper palette, navy peach sky green lavender accents, subtle grain texture, clean negative space, modern parenting and AI learning context, soft shadow, no text, transparent background.
```

Master negative prompt:

```text
photorealistic, realistic skin detail, 3d glossy render, hard black outlines, busy background, classroom clutter, random objects, extra fingers, malformed hands, distorted face, anime style, mascot style, corporate stock vector, embedded text, watermark, harsh lighting, neon colors
```

Global rules:
- Keep the same cast and face language across all slides.
- Do not redesign wardrobe between slides unless explicitly requested.
- Technology is a prop, not the hero.
- Preserve clean negative space for slide composition.
- Prefer transparent background isolated assets.
- No text inside the image.
- Keep expressions calm, warm, thoughtful, and presentation-friendly.

Character roster:
- `CH-01-mother`: calm, warm, thoughtful, emotionally available; wardrobe `navy`, `peach`, `cream`, `muted green`.
- `CH-02-father`: steady, friendly, reliable, quietly encouraging; wardrobe `navy`, `sky`, `cream`, `muted green`.
- `CH-03-daughter`: curious, expressive, inwardly thoughtful, open-hearted; wardrobe `peach`, `lavender`, `cream`, `sky`.
- `CH-04-son`: curious, grounded, calm-energy explorer; wardrobe `sky`, `green`, `navy`, `warm yellow`.
- `CH-05-mentor`: optional teacher figure; soft professional look; wardrobe `navy`, `cream`, `sky`.

Pose and consistency rules:
- Eye contact and open gestures are preferred.
- Avoid stiff pointing, folded arms, dramatic surprise, or corporate supervision posture.
- When a parent and child appear together, the relationship should feel companion-like, not controlling.
- Single-character slides still need a storytelling pose.

Output spec:
- Preferred delivery from ChatGPT Image: `png`.
- Scene assets: `png` or `webp`, ideally `1792x1024`, `1600x900`, or `1920x1080`, with a `16:9` composition.
- Character cutouts: `png` with transparent background if we decide a character needs to be reused across multiple slides.
- Props / micro assets: `png` transparent first; `svg` only if the output is genuinely clean and simple.
- Background wash/blob assets: `png` transparent or `svg`.
- Keep filenames exactly as specified in the batch files.

What to generate first:
- First priority: full scene assets for each slide.
- Second priority: only create separate character cutouts if a scene needs reuse or later compositing.
- Third priority: generate tiny prop/background assets only when a slide really needs them.

Working rule for ChatGPT Image:
- Generate only one requested asset at a time.
- After approval, reuse the previous accepted image as reference for style and cast continuity.
