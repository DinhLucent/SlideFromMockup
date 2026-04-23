# HTML_BUILD_SPEC.md

## Core Direction

- HTML/CSS/JS is the only source of truth.
- Content comes from a typed manifest.
- PNG and PDF are export outputs only.
- Motion is optional and must never change base layout.

---

## Runtime Modes

- `preview`: show studio chrome and slide index overlays
- `present`: clean stage mode for playback
- `export`: fixed `1600x900`, no motion, stable per-slide capture

Export rules:

- disable animation and parallax
- wait for fonts before capture
- wait for images before capture
- render each slide independently from HTML

---

## Typography System

- Primary heading: `Plus Jakarta Sans ExtraBold` or `Baloo 2 ExtraBold` depending on theme
- Body: `Nunito`
- Accent script: `Caveat Bold`

Hard rules:

- maximum `2` primary fonts plus `1` accent script
- script is limited to `1–2` highlighted words per slide
- script must never appear in body copy or citations
- no more than `2` colors inside one headline

---

## Design Tokens

The renderer must expose token layers for:

- color
- spacing
- radius
- shadow
- safe area
- max text width
- image scale
- footer opacity

Baseline tokens:

```txt
--bg-paper: #FBF7F0
--text-title: #1F3A6D
--text-body: #334155
--text-muted: #64748B

--accent-yellow: #F6C64E
--accent-peach: #F7B28B
--accent-coral: #E9878D
--accent-lavender: #A786D8
--accent-green: #97C77A
--accent-sky: #DDEFFD

--radius-card: 28px
--radius-pill: 999px

--shadow-soft: 0 20px 60px rgba(31, 58, 109, 0.08)
--shadow-card: 0 8px 30px rgba(31, 58, 109, 0.06)

--space-xs: 8px
--space-sm: 16px
--space-md: 24px
--space-lg: 40px
--space-xl: 64px
--space-2xl: 96px
```

---

## Slide Grammar

Only five top-level archetypes are allowed:

1. `CoverSlide`
2. `HookSlide`
3. `ProblemEvidenceSlide`
4. `FrameworkSlide`
5. `ClosingReferenceSlide`

Rhythm rules:

- do not repeat the same `layoutVariant` more than `2` slides in a row
- every `2–3` slides, change composition rhythm
- each slide carries exactly `1` core message
- add breathing slides with lighter copy regularly

---

## Component Architecture

The system must separate:

- layout shells
- content blocks
- media blocks

Recommended structure:

```txt
DeckShell
 ├─ ThemeProvider
 ├─ ExportModeProvider
 ├─ SlideRenderer
 └─ SlideIndexOverlay

SlideShell
 ├─ SlideContent
 ├─ SlideFooter
 └─ Theme vars

Content blocks
 ├─ Eyebrow
 ├─ Headline
 ├─ BodyCopy
 ├─ BulletList
 ├─ QuoteBox
 ├─ CTABox
 ├─ NumberBadge
 ├─ CitationBlock
 └─ StatCluster

Media blocks
 ├─ IllustrationSlot
 ├─ ImageFrame
 ├─ WashBlob
 ├─ LightGlow
 └─ TextureOverlay
```

No slide should hardcode its own standalone visual system.

---

## Manifest Contract

Each slide manifest entry should support at least:

```json
{
  "id": "principle-01",
  "type": "FrameworkSlide",
  "role": "principle",
  "eyebrow": "Nguyên tắc 1",
  "title": "Lắng nghe và thấu hiểu thế giới của con",
  "accentWords": ["thấu hiểu"],
  "body": "Dành thời gian trò chuyện thật sự mỗi ngày...",
  "callout": "Tối nay hãy bắt đầu bằng một câu hỏi mở, không phán xét.",
  "badgeNumber": "01",
  "theme": "playful-watercolor",
  "layoutVariant": "framework-principle-left",
  "motion": "soft-float",
  "illustration": {
    "src": "/assets/illustrations/family-listening.webp",
    "fit": "contain",
    "anchor": "right-center",
    "scale": 1.08
  }
}
```

Required control fields:

- `type`
- `layoutVariant`
- `theme`
- `accentWords`
- `badgeNumber`
- `illustration.src`
- `illustration.anchor`
- `illustration.scale`
- `motion`

---

## Asset Policy

- Illustration assets live outside components as `webp/png`
- Placeholder abstract art is temporary only
- Replace placeholder media with watercolor hero assets as early as possible
- Crop, anchor, and scale belong to manifest metadata, not hardcoded CSS

---

## Fidelity Priority

When polishing, prioritize in this order:

1. typography
2. color saturation and contrast
3. slide rhythm variation
4. real illustration assets
5. footer and detail polish
