# Design Context: Start From Existing Context

**This is the most important one thing in this skill.**

Good high-fidelity design must grow out of existing design context. **Doing hi-fi design from a blank slate is a last resort and will almost always produce generic work.** At the start of every design task, ask first: is there anything we can reference?

## What Counts As Design Context

Priority from highest to lowest:

### 1. The user's design system / UI kit

The user's existing component library, color tokens, typography rules, and icon system. **This is the best possible case.**

### 2. The user's codebase

If the user provides a codebase, it contains real component implementation. Read those files:

- `theme.ts` / `colors.ts` / `tokens.css` / `_variables.scss`
- Concrete components such as `Button.tsx`, `Card.tsx`
- Layout scaffolds such as `App.tsx`, `MainLayout.tsx`
- Global stylesheets

**Read code and copy exact values**: hex codes, spacing scale, font stack, border radius. Do not redraw from memory.

### 3. The user's shipped product

If the user has a live product but did not provide code, use Playwright or ask the user for screenshots.

```bash
# Screenshot a public URL with Playwright
npx playwright screenshot https://example.com screenshot.png --viewport-size=1920,1080
```

This lets you see the real visual vocabulary.

### 4. Brand guidelines / logo / existing assets

The user may have logo files, brand color specs, marketing materials, or slide templates. These are all context.

### 5. Competitor references

If the user says "make it like XX website", ask for the URL or screenshot. **Do not** rely on fuzzy impressions from training data.

### 6. Known design systems as fallback

If none of the above exists, use a widely accepted design system as the base:

- Apple HIG
- Material Design 3
- Radix Colors for color
- shadcn/ui for component vocabulary
- Tailwind default palette

Tell the user exactly what system you are using, so they know it is a starting point rather than a final brand direction.

## Context Gathering Flow

### Step 1: Ask the user

Mandatory starter checklist from `workflow.md`:

```markdown
1. Do you already have a design system / UI kit / component library? Where is it?
2. Do you have brand guidelines, color specs, or typography rules?
3. Can you provide screenshots or a URL of the existing product?
4. Is there a codebase I can read?
```

### Step 2: If the user says "no", help them find context

Do not give up immediately. Try:

```markdown
Let me look for clues:
- Do you have related designs from previous projects?
- What colors and typography does the company's marketing site use?
- What style is the product logo? Can you send it?
- Are there products you admire as references?
```

### Step 3: Read all context you can find

If the user provides a codebase path, read:

1. **List the file structure first**: look for style/theme/component files.
2. **Read theme/token files**: lift concrete hex/px values.
3. **Read 2-3 representative components**: inspect visual vocabulary such as hover states, shadows, borders, padding node patterns.
4. **Read global stylesheets**: base reset and font loading.
5. **If there is a Figma link or screenshot**: inspect the image, but **trust code more than the screenshot** when exact values differ.

**Important**: do not glance once and design from impression. You have truly lifted the system only after collecting 30+ concrete values.

### Step 4: Vocalize the system you will use

After reading context, tell the user what system you extracted:

```markdown
Based on your codebase and product screenshots, I extracted this design system:

**Colors**
- Primary: #C27558 (from tokens.css)
- Background: #FDF9F0
- Text: #1A1A1A
- Muted: #6B6B6B

**Typography**
- Display: Instrument Serif (from @font-face in global.css)
- Body: Geist Sans
- Mono: JetBrains Mono

**Spacing** (from your scale)
- 4, 8, 12, 16, 24, 32, 48, 64

**Shadow pattern**
- `0 1px 2px rgba(0,0,0,0.04)` (subtle card)
- `0 10px 40px rgba(0,0,0,0.1)` (elevated modal)

**Border radius**
- Small controls 4px, cards 12px, buttons 8px

**Component vocabulary**
- Button: filled primary, outlined secondary, ghost tertiary; all 8px radius
- Card: white background, subtle shadow, no border

I will start with this system. Does that look right?
```

Wait for user confirmation before doing major work.

## Blank-Slate Design Fallback

**Strong warning**: output quality drops significantly when there is no context. Say that explicitly.

```markdown
You do not have design context, so I can only design from general intuition.
The output will likely look "okay" but lack distinctiveness.
Do you want to continue, or should we gather references first?
```

If the user insists on proceeding, make decisions in this order:

### 1. Choose an aesthetic direction

Do not produce a generic result. Choose a clear direction:

- brutally minimal
- editorial / magazine
- brutalist / raw
- organic / natural
- luxury / refined
- playful / toy
- retro-futuristic
- soft / pastel

Tell the user which one you chose.

### 2. Choose a known design system as the skeleton

- Use Radix Colors for color: https://www.radix-ui.com/colors
- Use shadcn/ui for component vocabulary: https://ui.shadcn.com
- Use Tailwind's spacing scale, multiples of 4

### 3. Choose distinctive font pairings

Do not default to Inter / Roboto. Suggested pairs, commonly available through Google Fonts:

- Instrument Serif + Geist Sans
- Cormorant Garamond + Inter Tight
- Bricolage Grotesque + Sohne (paid)
- Fraunces + Work Sans (note: Fraunces is already overused by AI)
- JetBrains Mono + Geist Sans for a technical feel

### 4. Every key decision needs reasoning

Do not choose silently. Put decisions in an HTML comment:

```html
<!--
Design decisions:
- Primary color: warm terracotta (oklch 0.65 0.18 25) - fits the editorial direction
- Display: Instrument Serif for a humanist, literary feel
- Body: Geist Sans for clean contrast
- No gradients - committed to minimal direction, no AI slop
- Spacing: 8px base, golden-ratio-friendly steps (8/13/21/34)
-->
```

## Import Strategy When The User Provides A Codebase

If the user says "import this codebase as reference":

### Small codebase (<50 files)

Read all files and internalize the context.

### Medium codebase (50-500 files)

Focus on:

- `src/components/` or `components/`
- all style/token/theme-related files
- 2-3 representative full-page components such as `Home.tsx`, `Dashboard.tsx`

### Large codebase (>500 files)

Ask the user to specify focus:

- "I want a settings page" -> read existing settings-related code.
- "I want a new feature" -> read the overall shell plus the closest reference.
- Do not try to read everything. Optimize for precision.

## Working With Figma / Design Drafts

If the user provides a Figma link:

- **Do not** assume you can directly "convert Figma to HTML" without extra tools.
- Figma links are often not publicly accessible.
- Ask the user to export screenshots and provide specific color/spacing values.

If the user only provides a Figma screenshot, tell them:

- I can read the visual direction, but I cannot extract exact values.
- Please provide key numbers such as hex colors and px values, or export as code if Figma supports it.

## Final Reminder

**The quality ceiling of a project's design is determined by the quality of context you obtain.**

Spending 10 minutes gathering context is more valuable than spending 1 hour drawing high-fidelity design from nothing.

**When context is missing, ask for it before forcing a design.**
