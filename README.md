<div align="center">

# Slide ProMax

> *"Type. Hit enter. A finished design lands in your lap."*

[![Agent-Agnostic](https://img.shields.io/badge/Agent-Agnostic-blueviolet)](#)
[![Skills](https://img.shields.io/badge/skills.sh-Compatible-green)](#)

<br>

**Type a sentence into your agent, get a delivery-ready design artifact.**

<br>

Within 3 to 30 minutes, you can ship **product launch animations**, a clickable App prototype, an editable slide deck, or a print-grade infographic.

This is not standard "it looks okay for AI" quality — this looks like it was created by an expert design team. Hand the skill your brand assets (logo, palettes, UI screenshots), and it understands your brand personality; give it nothing, and the built-in 20 design philosophies provide a fallback ensuring zero generic "AI slop".

**Every single animation featured in this README was generated natively using this system.** Not Figma, not After Effects — just a prompt and the skill. Need a promo video for your next product launch? Now you can do it yourself.

```bash
npx skills add DinhLucent/SlideFromMockup
```

Cross-agent compatible — installable on Claude Code, Cursor, Codex, OpenClaw, and Hermes.

[Demo Gallery](#demo-gallery) · [Quick Start](#quick-start) · [Capabilities](#capabilities) · [Core Mechanisms](#core-mechanisms)

</div>

---

<p align="center">
  <img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/hero-animation-v10-en.gif" alt="Hero · Type → Choose → Gallery Expand → Focus → Brand Reveal" width="100%" style="border-radius: 8px;">
</p>

<p align="center"><sub>
  ▲ 25 Seconds · Terminal → 4 Directions → Gallery Ripple → 4 Focuses → Brand Reveal<br>
</sub></p>

---

## Quick Start

```bash
npx skills add DinhLucent/SlideFromMockup
```

Then literally just ask your agent:

```text
"Build a presentation on AI Psychology, recommend 3 style directions for me to choose from."
"Create an iOS Pomodoro app prototype, make 4 core screens fully clickable."
"Turn this logic into a 60-second animation, export as MP4 and GIF."
"Run a 5-dimension expert review on this design."
```

No buttons, no panels, no external plugins.

---

## Capabilities

| Feature | Deliverable | Typical ETA |
|------|--------|----------|
| **Interactive Prototypes (App/Web)** | Single-file HTML · Native iPhone bezel · Clickable · Playwright Verified | 10–15 min |
| **Presentation Decks** | HTML deck (Browser presentation) + Editable PPTX (TextBoxes preserved) | 15–25 min |
| **Timeline Animations** | MP4 (25fps / 60fps interpolated) + GIF (palette optimization) + BGM | 8–12 min |
| **Design Variations** | 3+ Side-by-side comps · Real-time parameter Tweaks · Cross-dimension exploration | 10 min |
| **Infographics / Visualizations** | Print-grade typography · PDF/PNG/SVG Exports | 10 min |
| **Design Direction Consultant** | 5 Schools × 20 Philosophies · 3 Directions recommended · Parallel Demo generation | 5 min |
| **5-Dimension Expert Review** | Radar chart + Keep/Fix/Quick Wins · Actionable remediation checklist | 3 min |

---

## Demo Gallery

### Design Direction Consultant

The ultimate fallback for vague prompts: Selects 3 differentiated directions from 5 schools × 20 design philosophies, spinning parallel demos allowing you to confidently select a visual boundary.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/w3-fallback-advisor.gif" width="100%" style="border-radius: 8px;"></p>

### iOS App Prototypes

Accurate iPhone 15 Pro chassis (Dynamic Island / StatusBar / Home Indicator) · State-driven multi-screen routing · Real imagery extracted from Wikimedia/Met/Unsplash · Automated Playwright interaction testing.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c1-ios-prototype.gif" width="100%" style="border-radius: 8px;"></p>

### Motion Design Engine

Stage + Sprite chronological fragment framework · 4 simple APIs (`useTime` / `useSprite` / `interpolate` / `Easing`) execute any animation physics natively · Export to an MP4 / GIF / 60fps interpolated / music-backed video via a single command.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c3-motion-design.gif" width="100%" style="border-radius: 8px;"></p>

### HTML Slides → Editable PPTX

Deliver HTML decks directly from your browser, leveraging `html2pptx.js` bridging the actual DOM `computedStyle` into native PowerPoint blocks. The output features **genuine editable text fields**, not flat background imagery.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c2-slides-pptx.gif" width="100%" style="border-radius: 8px;"></p>

### Tweaks · Real-Time Variation Toggles

Parameterize your palettes / typography / information density effortlessly · Modular side-panel controls · Pure frontend-driven utilizing `localStorage` persistence — nothing gets lost upon refreshing.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c4-tweaks.gif" width="100%" style="border-radius: 8px;"></p>

### Infographics / Data Viz

Magazine-quality publication grids · CSS Grid precision · `text-wrap: pretty` typographic refinement · Driven globally by accurate data parameters · Native Vector PDF / 300dpi PNG / SVG generation.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c5-infographic.gif" width="100%" style="border-radius: 8px;"></p>

### 5-Dimension Expert Reviews

Philosophical Consistency · Visual Hierarchy · Detail Execution · Functionality · Innovation (Scaled 0-10) · Visual Radar Charts · Instantly exporting actionable Keep / Fix / Quick Wins checklists.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c6-expert-review.gif" width="100%" style="border-radius: 8px;"></p>

### The Junior Designer Workflow

Never initiate full implementations blindly: Formulate assumptions + placeholders + reasoning first, present it for user review early, and then iterate correctly. Catching a misunderstanding early is 100x cheaper than restructuring the final code.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/w2-junior-designer.gif" width="100%" style="border-radius: 8px;"></p>

### The Core Asset Protocol

Strict enforcement sequence mandatory for all client brands: Ask → Search Channels → Download (Deploying 3 fallback limits) → Extract precise Hex profiles natively → Bake into `brand-spec.md`.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/w1-brand-protocol.gif" width="100%" style="border-radius: 8px;"></p>

---

## Core Mechanisms

### The Asset Protocol

The primary rigid firewall guaranteeing unpolluted brand execution. Upon detecting distinct brand constraints (Stripe, Linear, distinct companies), the agent triggers a 5-step mandate:

| Phase | Action | Purpose |
|------|------|------|
| 1 · Query | "Do you possess brand guidelines?" | Respecting existing architectures |
| 2 · Search | Queries official portals `<brand>.com/press` | Establishing exact truth parameters |
| 3 · Download | SVGs → Raw HTML traces → Render extraction | Utilizing 3 fallback trajectories explicitly |
| 4 · Hex Grep | Scans arrays mapping authentic `#xxxxxx` clusters | **Banning completely any guess-work** |
| 5 · Spec Lock | Compiles `brand-spec.md` + strict CSS values | Hardcoding truth against hallucinations |

### Design Direction Consultant (Fallback)

Initiated when requirements are hopelessly vague:
- Denies generating blind HTML blocks utilizing raw intuition completely.
- Formulates 3 strictly disjoint structural recommendations bridging 20 internal philosophies.
- Showcases parallel HTML demonstrations alongside aesthetic templates dynamically.
- Funnels neatly into the primary Junior Designer progression.

### Junior Designer Workflow

Universal procedure binding operations seamlessly:
- Initiates interactions deploying batch questions avoiding fractured dialog.
- Drops assumptions + placeholders + reasoning logic structurally onto code bases.
- Validates the skeleton (Even if entirely utilizing dummy gray cards).
- Executes real variations → Parameterizes specific modules → Tweaks properties explicitly.

### Anti-AI Slop Framework

A dedicated protocol filtering the structural "Visual baseline" haunting AI generation. Eliminates forced gradients / excessive emojis / decorative accents / generic layout traps natively adopting dynamic `text-wrap` logic, correct Serif bindings, and honest imagery bounds.

---

## Limitations

- **Does not export layer-editable Figma constraints from PPTX generators**. The agent delivers HTML architectures, snapshots, and videos, allowing explicit PPT editing—but it won't yield pure un-compiled Figma blocks directly.
- **Complex Framer-Motion behaviors omitted**. Advanced 3D, physics, and profound particle rendering systems remain out-of-scope for the native lightweight `useTime` structural bounds.
- **Utterly zero-context builds yield basic bounds**. Formulating hi-fi interfaces absolutely devoid of content/context forces the protocol aggressively into standard layouts resulting effectively in reliable, yet generic 65-point baseline structures.

This constitutes a rigid 80-point protocol; empowering individuals natively circumventing dense Graphic interface demands simply leveraging robust scalable text environments safely seamlessly.

---

## Repository Structure

```text
Slide_ProMax/
├── SKILL.md                 # Primary Document (Read fundamentally by the AI Agent)
├── README.md                # English translation (User-facing)
├── assets/                  # Core Component Engines
│   ├── animations.jsx       # Interpolation & Timeline physics
│   ├── ios_frame.jsx        # iPhone bezels
│   ├── deck_stage.js        # Internal HTML presentation rendering tools
│   ├── design_canvas.jsx    # Parallel variance visualizer
│   ├── showcases/           # 24 fallback templates natively
│   └── bgm-*.mp3            # 6 native audio track themes
├── references/              # The Internal Encyclopedia
│   ├── design-styles.md     # 20 Philosophy blueprints
│   ├── animation-pitfalls.md# Hard constraints mitigating physics errors
│   ├── slide-decks.md       # PPTX generation syntax
│   └── ...
├── scripts/                 # Export tooling sequences
│   ├── render-video.js      # Raw MP4 execution
│   └── convert-formats.sh   # 60fps interpolation parameters
└── demos/                   # Repository holding reference imagery internally
```
