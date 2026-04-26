# Content Guidelines: Anti-AI slop, Content Rules, Scale Specifications
 
 The trap AI design falls into most easily. This is a list of "what NOT to do," which is much more important than "what to do"—because AI slop is the default, and it will happen if you don't actively avoid it.
 
 ## The Complete AI Slop Blacklist
 
 ### Visual Traps
 
 **❌ Aggressive Gradient Backgrounds**
 - Purple → Pink → Blue full-screen gradients (The classic smell of AI-generated web pages).
 - Rainbow gradients in any direction.
 - Mesh gradients covering the entire background.
 - ✅ If you must use gradients: subtle, monochromatic, intentionally dotted (e.g., button hovers).
 
 **❌ Rounded Cards + Left-border Accent Color**
 ```css
 /* This is the classic signature of an AI-flavored card */
 .card {
   border-radius: 12px;
   border-left: 4px solid #3b82f6;
   padding: 16px;
 }
 ```
 These cards are rampant in AI-generated Dashboards. Need emphasis? Use a more design-conscious approach: background contrast, weight/size contrast, plain dividing lines, or just don't use cards at all.
 
 **❌ Emoji Decorations**
 Unless the brand naturally uses emojis (like Notion or Slack), do not put emojis in the UI. **Especially avoid**:
 - 🚀 ⚡️ ✨ 🎯 💡 before titles.
 - ✅ for feature lists.
 - → inside CTA buttons (Arrows alone are OK, emoji arrows are not).
 
 If you have no icons, use real icon libraries (Lucide/Heroicons/Phosphor), or use placeholders.
 
 **❌ Using SVG to Draw Imagery**
 Do not attempt to use SVG to draw: humans, scenes, devices, objects, abstract art. AI-drawn SVG imagery is instantly recognizable as AI-flavored—childish and cheap. **A gray rectangle labeled "Illustration Pos 1200x800" is 100 times better than a clumsy SVG hero illustration.**
 
 The only scenarios where SVG drawing is acceptable:
 - Genuine icons (16x16 up to 32x32 class).
 - Geometric shapes serving as decorative elements.
 - Data viz charts.
 
 **❌ Excessive Iconography**
 Not every title/feature/section needs an icon. Abusing icons makes the interface look like a toy. Less is more.
 
 **❌ "Data slop"**
 Invented stat decorations:
 - "10,000+ happy customers" (You don't even know if anyone uses it).
 - "99.9% uptime" (Don't write this without real data).
 - Decorative "metric cards" made up of icons + numbers + words.
 - Garish mock tables decorated with fake data.
 
 If you don't have real data, leave placeholders or ask the user.
 
 **❌ "Quote slop"**
 Invented user reviews and famous quotes decorating a page. Leave placeholders and ask the user for real quotes.
 
 ### Typography Traps
 
 **❌ Avoid these overused fonts**:
 - Inter (The default for AI-generated web pages)
 - Roboto
 - Arial / Helvetica
 - Pure system font stacks
 - Fraunces (Ever since AI discovered this, it's been abused)
 - Space Grotesk (AI's recent favorite)
 
 **✅ Use distinctive display+body pairings.** Inspiration directions:
 - Serif display + Sans-serif body (editorial feel)
 - Mono display + Sans body (technical feel)
 - Heavy display + Light body (contrast)
 - Variable fonts for thick/thin hero animations
 
 Typography resources:
 - Unpopular but excellent Google Fonts (Instrument Serif, Cormorant, Bricolage Grotesque, JetBrains Mono).
 - Open-source font sites (Sister fonts to Fraunces, Adobe Fonts).
 - Do not invent font names out of thin air.
 
 ### Color Traps
 
 **❌ Inventing colors out of thin air**
 Do not design a completely unfamiliar color palette from scratch. It's usually discordant.
 
 **✅ Strategies**:
 1. Brand colors exist → Use brand colors; interpolate missing color tokens using `oklch`.
 2. No brand colors but references exist → Pipette colors from referenced product screenshots.
 3. Completely from scratch → Choose a known color system (Radix Colors / Default Tailwind palette / Anthropic brand). Do not tune it yourself.
 
 **Defining colors with oklch** is the most modern approach:
 ```css
 :root {
   --primary: oklch(0.65 0.18 25);      /* Warm terracotta */
   --primary-light: oklch(0.85 0.08 25); /* Lighter version */
   --primary-dark: oklch(0.45 0.20 25);  /* Darker version */
 }
 ```
 Oklch ensures the hue doesn't shift when adjusting lightness, making it much better than hsl.
 
 **❌ Casually adding color inversion for dark mode**
 Dark mode is not just a simple color inversion. A good dark mode requires readjusting saturation, contrast, and accent colors. If you don't want to design dark mode properly, don't include it.
 
 ### Layout Traps
 
 **❌ Over-saturating Bento grids**
 Every AI-generated landing page wants to do a bento grid. Unless your information structure genuinely suits a bento grid, use other layouts.
 
 **❌ Big hero + 3-column features + testimonials + CTA**
 This landing page template has been done to death. If you want innovation, genuinely innovate.
 
 **❌ Every card looks identical in a Card grid**
 Asymmetry, varied card sizes, some with images/some text-only, some spanning columns—that's what a real designer would do.
 
 ## Content Rules
 
 ### 1. Don't add filler content
 
 Every element must earn its place. Empty space is a design issue—solve it using **composition** (contrast, rhythm, negative space), **not** by stuffing it with content.
 
 **How to judge filler**:
 - If you removed this content, would the design get worse? If the answer is "no," remove it.
 - What real problem does this element solve? If it's "to make the page less empty," delete it.
 - Are these stats/quotes/features supported by real data? If not, don't invent them.
 
 "One thousand no's for every yes."
 
 ### 2. Ask before adding material
 
 Do you think adding a paragraph/page/section would make it better? Ask the user first. Do not add unilaterally.
 
 Why:
 - The user knows their audience better than you do.
 - Adding content incurs costs; the user might not want it.
 - Unilaterally adding content violates the "junior designer reporting to work" dynamic.
 
 ### 3. Create a system up front
 
 After exploring the design context, **verbally state the system you intend to use**, and have the user confirm:
 
 ```markdown
 My design system:
 - Colors: #1A1A1A body + #F0EEE6 background + #D97757 accent (from your brand)
 - Typography: Instrument Serif for display + Geist Sans for body
 - Rhythm: full-bleed color backgrounds + white text for section titles; white backgrounds for normal sections
 - Imagery: full-bleed photos for heroes, placeholders for feature sections pending your input
 - A maximum of 2 background colors to avoid clutter
 
 Once you confirm this direction, I'll start working.
 ```
 
 Only start hands-on work after the user confirms. This check-in avoids "finishing half of it only to realize the direction was wrong."
 
 ## Scale Specifications
 
 ### Slides (1920x1080)
 
 - Body text minimum **24px**, ideal 28-36px.
 - Titles 60-120px.
 - Section titles 80-160px.
 - Hero headlines can use huge 180-240px types.
 - Never use <24px text on a slideshow.
 
 ### Print Documents
 
 - Body text minimum **10pt** (≈13.3px), ideal 11-12pt.
 - Titles 18-36pt.
 - Captions 8-9pt.
 
 ### Web and Mobile
 
 - Body text minimum **14px** (16px for elderly-friendly).
 - Mobile body text **16px** (To avoid iOS auto-zoom).
 - Hit targets (clickable elements) minimum **44x44px**.
  - Line height 1.5-1.7 (1.7-1.8 for dense non-Latin scripts).
 
 ### Contrast
 
 - Body text vs Background **at least 4.5:1** (WCAG AA).
 - Large text vs Background **at least 3:1**.
 - Inspect this using Chrome DevTools accessibility tools.
 
 ## CSS Artifacts
 
 **Advanced CSS features** are a designer's best friend. Use them boldly:
 
 ### Typography
 
 ```css
 /* Makes title line-breaking more natural, avoiding orphans at the end */
 h1, h2, h3 { text-wrap: balance; }
 
 /* Body text wrapping, avoids widows and orphans */
 p { text-wrap: pretty; }
 
 /* Punctuation optimization: */
 p { 
   text-spacing-trim: space-all;
   hanging-punctuation: first;
 }
 ```
 
 ### Layout
 
 ```css
 /* CSS Grid + named areas = Infinite readability */
 .layout {
   display: grid;
   grid-template-areas:
     "header header"
     "sidebar main"
     "footer footer";
   grid-template-columns: 240px 1fr;
   grid-template-rows: auto 1fr auto;
 }
 
 /* Subgrids to align card content */
 .card { display: grid; grid-template-rows: subgrid; }
 ```
 
 ### Visual Effects
 
 ```css
 /* Highly designed scrollbars */
 * { scrollbar-width: thin; scrollbar-color: #666 transparent; }
 
 /* Glassmorphism (Use with restraint) */
 .glass {
   backdrop-filter: blur(20px) saturate(150%);
   background: color-mix(in oklch, white 70%, transparent);
 }
 
 /* View transitions API for silky page switches */
 @view-transition { navigation: auto; }
 ```
 
 ### Interaction
 
 ```css
 /* The :has() selector makes conditional styling easy */
 .card:has(img) { padding-top: 0; } /* Cards with images have no top padding */
 
 /* Container queries make components truly responsive */
 @container (min-width: 500px) { ... }
 
 /* The new color-mix function */
 .button:hover {
   background: color-mix(in oklch, var(--primary) 85%, black);
 }
 ```
 
 ## Decision Cheat-sheet: When you are hesitant
 
 - Want to add a gradient? → Most likely, don't.
 - Want to add an emoji? → Don't.
 - Want to add rounded corners + left-border accent to a card? → Don't, find another way.
 - Want to draw a hero illustration with SVG? → Don't, use a placeholder.
 - Want to decorate with a quote? → Ask the user if they have a real quote first.
 - Want to add a row of icon features? → Ask if icons are actually needed, they probably aren't.
 - Use Inter? → Switch to something with more character.
 - Use a purple gradient? → Switch to a grounded color palette.
 
 **When you think "adding this will make it look better" — that's usually a symptom of AI slop**. Keep it to the minimal version, and only add things when the user asks for them.
