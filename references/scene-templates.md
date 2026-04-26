# Scene Template Library: Organized By Output Type

> Use together with the "prompt DNA" sections in `design-styles.md`.
> Formula: `[Style Prompt DNA] + [Scene Template] + [Concrete Content Description]`

---

## 1. Article Cover / Content Header Image

**Specs**:

- Cover image: 2.35:1, such as 900x383px or 1200x510px
- In-article illustration: 16:9, such as 1200x675px, or 4:3, such as 1200x900px

**Key Design Factors**:

- Visual impact first; the user scans quickly in a content feed.
- Minimal or no text; article titles may be rendered outside or on top.
- Moderate saturation; most reading environments are bright.
- Avoid excessive detail; it must remain recognizable as a thumbnail.

**Recommended Styles**: 01 Pentagram / 11 Build / 12 Sagmeister / 18 Kenya Hara / 07 Field.io

**Scene Prompt Template**:

```text
[Insert style DNA here]
- Article cover image
- Landscape format, 2.35:1 aspect ratio
- Bold visual impact, minimal or no text
- Moderate color saturation for a bright reading environment
- Must remain recognizable as a thumbnail
- Clean composition with a clear focal point
```

---

## 2. In-Article Image / Concept Illustration

**Specs**:

- 16:9, such as 1200x675px, is the most universal
- 1:1, such as 800x800px, works for emphasis
- 4:3, such as 1200x900px, works for information-dense content

**Key Design Factors**:

- Serve the article argument; do not decorate for decoration's sake.
- Create visual rhythm with the surrounding text.
- Express one core concept clearly.
- Prefer AI-generated imagery; use HTML screenshots only for precise data tables.

**Recommended Styles**: choose based on article tone; common options are 01 / 04 / 10 / 17 / 18

**Scene Prompt Template**:

```text
[Insert style DNA here]
- Article illustration, concept visualization
- [16:9 / 1:1 / 4:3] aspect ratio
- Single clear concept: [describe the core concept]
- Serve the argument, not decoration
- [Light/Dark] background to match article tone
```

---

## 3. Infographic / Data Visualization

**Specs**:

- Vertical long graphic: 1080x1920px for mobile reading
- Horizontal: 1920x1080px for article embeds
- Square: 1080x1080px for social media

**Key Design Factors**:

- Clear information hierarchy: title -> key data -> details.
- Accurate data; do not fabricate numbers.
- Visual guide lines and reading path.
- Use icons/charts only when they improve understanding.

**Recommended Styles**: 04 Fathom / 10 Muller-Brockmann / 02 Stamen / 17 Takram

**Scene Prompt Template**:

```text
[Insert style DNA here]
- Infographic / data visualization
- [Vertical 1080x1920 / Horizontal 1920x1080 / Square 1080x1080]
- Clear information hierarchy: title -> key data -> details
- Visual flow guiding reader's eye path
- Icons and charts for comprehension
- Data-accurate, no decorative distortion
```

---

## 4. PPT / Keynote Presentation

**Specs**:

- Standard: 16:9, 1920x1080px
- Widescreen: 16:10, 1920x1200px

**Key Design Factors**:

- One core message per slide; do not pile up content.
- Clear type hierarchy: title 40pt+, body 24pt+, notes 16pt+.
- Generous whitespace for projection clarity.
- Image-to-text ratio at least 60:40.
- Consistent visual system: color, typography, spacing.

**Recommended Styles**: 01 Pentagram / 10 Muller-Brockmann / 11 Build / 18 Kenya Hara / 04 Fathom

**Scene Prompt Template**:

```text
[Insert style DNA here]
- Presentation slide design, 16:9
- One core message per slide
- Clear type hierarchy (title 40pt+, body 24pt+)
- Generous whitespace for projection clarity
- Consistent visual system throughout
- [Light/Dark] theme
```

---

## 5. PDF White Paper / Technical Report

**Specs**:

- A4 portrait: 210x297mm / 595x842pt
- Letter portrait: 216x279mm / 612x792pt

**Key Design Factors**:

- Long-form reading optimized: 66-character line width, 1.5-1.8 line height.
- Clear chapter navigation system.
- Unified header/footer/page-number design.
- Charts and body text coexist elegantly.
- Citation and note system.
- Polished cover page.

**Recommended Styles**: 10 Muller-Brockmann / 04 Fathom / 03 Information Architects / 17 Takram / 19 Irma Boom

**Scene Prompt Template**:

```text
[Insert style DNA here]
- PDF document / white paper design
- A4 portrait format (210x297mm)
- Long-form reading optimized (66 char line width, 1.5 line height)
- Clear chapter navigation system
- Elegant header/footer/page number design
- Charts integrated with body text
- Professional cover page
```

---

## 6. Landing Page / Product Website

**Specs**:

- Desktop: design at 1440px width, responsive down to 320px
- First viewport height: 100vh

**Key Design Factors**:

- Communicate core value within 5 seconds above the fold.
- Clear CTA button.
- Scroll narrative structure: problem -> solution -> proof -> action.
- Mobile adaptation.
- Load speed.

**Recommended Styles**: 05 Locomotive / 01 Pentagram / 11 Build / 08 Resn / 06 Active Theory

**Scene Prompt Template**:

```text
[Insert style DNA here]
- Landing page / product website
- Desktop 1440px width, responsive
- Hero section 100vh, core value in 5 seconds
- Clear CTA button design
- Scroll narrative: problem -> solution -> proof -> action
- Modern web aesthetic
```

---

## 7. App UI / Prototype Interface

**Specs**:

- iOS: 390x844pt, iPhone 15
- Android: 360x800dp
- Tablet: 1024x1366pt, iPad Pro

**Key Design Factors**:

- Touch friendly: minimum tap area 44x44pt.
- Consistent with platform design language.
- Standard handling for status bar, navigation bar, and tab bar.
- Moderate information density; mobile screens should not become too dense.

**Recommended Styles**: 17 Takram / 11 Build / 03 Information Architects / 01 Pentagram

**Scene Prompt Template**:

```text
[Insert style DNA here]
- Mobile app UI design
- iOS [390x844pt] / Android [360x800dp]
- Touch-friendly (44pt minimum tap targets)
- Consistent design system
- Standard status bar / navigation / tab bar
- Moderate information density
```

---

## 8. Vertical Social Image

**Specs**:

- Vertical: 3:4, 1080x1440px, best default
- Square: 1:1, 1080x1080px
- The first image determines click-through rate

**Key Design Factors**:

- Visual attraction first; it competes in a waterfall/feed layout.
- A small amount of text is allowed, but keep it under 20% of the frame.
- Vivid color without cheapness.
- Lifestyle, texture, and atmosphere.

**Recommended Styles**: 12 Sagmeister / 11 Build / 20 Neo Shen / 09 Experimental Jetset

**Scene Prompt Template**:

```text
[Insert style DNA here]
- Vertical social media image
- Vertical 3:4 (1080x1440px)
- Eye-catching in waterfall/feed layout
- Minimal text overlay (under 20% of area)
- Vivid but tasteful colors
- Lifestyle/texture/atmosphere feel
```

---

## Combination Example

**Scene**: article cover introducing an AI coding tool; should feel professional but warm.

**Step 1**: choose a style -> 17 Takram, professional + warm.
**Step 2**: combine Takram prompt DNA + article cover template.

```text
Takram Japanese speculative design:
- Elegant concept prototypes and diagrams
- Soft tech aesthetic (rounded corners, gentle shadows)
- Charts and diagrams as art pieces
- Modest sophistication
- Neutral natural colors (beige, soft gray, muted green)
- Design as philosophical inquiry

Article cover image
- Landscape format, 2.35:1 aspect ratio (1200x510px)
- Bold visual impact, minimal text
- Moderate color saturation for a bright reading environment
- Must remain recognizable as thumbnail
- Clean composition with clear focal point

Content: An AI coding assistant tool, showing the concept of human-AI collaboration
in software development, warm and professional atmosphere
```

---

**Version**: v1.0
**Updated**: 2026-02-13
