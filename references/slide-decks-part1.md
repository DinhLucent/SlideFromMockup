# Slide Decks: HTML Presentation Guidelines
 
 Creating slide decks is a high-frequency scenario in design work. This document explains how to create excellent HTML presentations—from architectural choices, single-page designs, down to the complete paths for PDF/PPTX exportation.
 
 **Capabilities covered by this skill**:
 - **HTML Presentation Mode (The foundational artifact, always a mandatory default)** → Independent HTML per page + `assets/deck_index.html` aggregator. Playable in-browser with keyboard navigation and fullscreen presenting.
 - HTML → PDF Exportation → `scripts/export_deck_pdf.mjs` / `scripts/export_deck_stage_pdf.mjs`
 - HTML → Editable PPTX Exportation → `references/editable-pptx.md` + `scripts/html2pptx.js` + `scripts/export_deck_pptx.mjs` (Demands HTML to be written under 4 hard constraints).
 
 > **⚠️ HTML is the foundation; PDF/PPTX are derivatives.** Regardless of the final delivery format, you **must** first construct the aggregated HTML presentation version (`index.html` + `slides/*.html`). It is the "source" of your slide deck body. PDF/PPTX formats are snapshots exported from the HTML via a single command.
 >
 > **Why HTML-First**:
 > - The absolute best medium for live speeches/presentations (native full screen on projectors/screen-shares, keyboard navigation, unbound from Keynote/PPT).
 > - During development, each page can be opened independently via double-click to verify, bypassing repetitive export runs.
 > - It is the sole upstream source for PDF/PPTX exports (avoiding the doomed loop of "exporting and then realizing the HTML needs changing and exporting again").
 > - The delivery manifest can be dual-purpose "HTML + PDF" or "HTML + PPTX", giving the receiver the freedom to choose what they prefer.
 >
 > Empirical proof (2026-04-22 moxt brochure): After finishing the 13-page HTML + index.html aggregator, running `export_deck_pdf.mjs` yielded a completed PDF in one line, requiring zero tweaks. The HTML version itself is a deliverable meant for direct browser presentation.
 
 ---
 
 ## 🛑 Pre-flight Check: Confirm the Delivery Format First (The Hardest Checkpoint)
 
 **This decision precedes the "single-file vs. multi-file" architecture choice.** Empirical proof from the 2026-04-20 Options Private Board project: **Not confirming the delivery format before starting coding = 2-3 hours of rework.**
 
 ### Decision Tree (HTML-first Architecture)
 
 Placements for all deliveries begin from the identically aggregated HTML (`index.html` + `slides/*.html`). The requested delivery format solely dictates your **writing constraints for HTML** and **export commands**:
 
 ```
 [Always Default · Mandatory] Aggregated HTML Presentation (index.html + slides/*.html)
    │
    ├── Only need browser presentation / local HTML archive → You stop here. Utmost visual freedom for HTML.
    │
    ├── Need a PDF (For printing / chat groups / archiving) → Run export_deck_pdf.mjs for a 1-click export.
    │                                                         HTML writing remains totally unconstrained visually.
    │
    └── Need an Editable PPTX (Co-workers modifying text)   → From your very first line of HTML, operate under the 4 hard constraints.
                                                              Run export_deck_pptx.mjs for a 1-click export.
                                                              Sacrifices gradients / web components / complex SVGs.
 ```
 
 ### Pre-Flight Script (Copy to use)
 
 > Regardless of whether the final delivery is HTML, PDF, or PPTX, I will initially create an aggregated HTML version playable and switchable in the browser (`index.html` with keyboard navigation) — this remains our perpetual standard foundation artifact. Based on that, I'll ask if you require an additional PDF / PPTX snapshot.
 >
 > Which export format do you require?
 > - **Only HTML** (Speeches/archives) → Complete visual freedom.
 > - **Also a PDF** → Same as above, just adding an export command.
 > - **Also an Editable PPTX** (Co-workers modifying text inside PPT) → I must mandate 4 hard constraints from the first line of my HTML, which will sacrifice some visual capacities (no CSS gradients, no web components, no complex SVG decorations).
 
 ### Why "PPTX requires the 4 hard constraints from the get-go"
 
 An editable PPTX relies on the premise that `html2pptx.js` can translate the DOM into PowerPoint objects element-by-element. This demands **4 hard constraints**:
 
 1. Body permanently fixed at 960pt × 540pt (Matching `LAYOUT_WIDE`, 13.333″ × 7.5″, not 1920x1080px).
 2. All text wrapped in `<p>`/`<h1>`-`<h6>` tags (Forbidden from placing text directly in div, forbidden from relying on `<span>` for main text).
 3. The `<p>`/`<h*>` tags themselves cannot harbor background/border/shadows (Place them on an outer div).
 4. `<div>` tags cannot use `background-image` (Must use `<img>` tags).
 5. No CSS gradients, no web components, no complex SVG decorating.
 
 **This skill's default visual freedom for HTML is immense**—heavy reliance on spans, nested flex boxes, complex SVGs, web components (like `<deck-stage>`), CSS gradients—**almost none of which naturally pass html2pptx's constraints** (real world tests show pure visually-driven HTML run through html2pptx has a pass rate < 30%).
 
 ### True Cost Comparison of Two Paths (2026-04-20 Real-World Pitfall)
 
 | Path | Approach | Result | Cost |
 |------|------|------|------|
 | ❌ **Write freely in HTML, try to patch up PPTX later** | Single-file deck-stage + massive SVG/span decors | Reaching editable PPTX yields only two options:<br>A. Handwrite pptxgenjs, hardcoding hundreds of lines of coordinates<br>B. Rewrite the 17-page HTML into Path A format | 2-3 hours rework, and the handwritten version inflicts **perpetual maintenance debt** (Changing one word in HTML means manually mirroring it in PPTX again) |
 | ✅ **Adopt Path A constraints from Step 1** | Independent HTML pages + 4 Hard Constraints + 960×540pt | A single command exports 100% editable PPTX. Can also run full-screen browser presentations (Path A HTML is naturally playable browser HTML) | An extra 5 minutes thinking "how to wrap this text inside `<p>`", zero rework required |
 
 ### Handling Hybrid Delivery
 
 User says "I want HTML presentations **and** an editable PPTX" — **This is not a hybrid**, it's the PPTX requirement overriding the HTML requirement. The HTML written using Path A constraints naturally enables browser full-screen presentations (just top it off with the `deck_index.html` aggregator). **No additional cost.**
 
 User says "I want a PPTX **and** animation / web components" — **This is a genuine contradiction**. Tell the user: Gaining an editable PPTX means sacrificing these visual capabilities. Make them choose out of trade-offs. Never silently opt for the handwritten pptxgenjs solution (you'll fall back into perpetual maintenance debt).
 
 ### What if you only learn they want PPTX after finishing? (Emergency Salvation)
 
 Rare scenarios: The HTML is completely finished but you discover a PPTX is mandatory. Proceed to the **fallback workflow** (full explanation at the end of `references/editable-pptx.md` "Fallback: Visual draft exists but user insists on editable PPTX"):
 
 1. **Primary Choice: Suggest PDF output** (Visuals 100% retained, cross-platform, receiver prints and reads) — If the receiver's real objective is "presentation/archiving", PDF is the ideal deliverable.
 2. **Secondary Choice: AI rewrites an editable HTML version using the visual draft as blueprint** → Exports Editable PPTX — Preserves color/layout/copy decisions but sacrifices grading, web components, and complex SVGs.
 3. **NOT Recommended: Rebuilding with handwritten pptxgenjs** — Coordinates, fonts, and alignments are hand-tweaked with gigantic maintenance costs.
 
 Always push the options to the user, let them decide. **Never react by immediately starting to handwrite pptxgenjs**—it's a last-ditch fallback.
 
 ---
 
 ## 🛑 Batch Creation: Generate 2 specific showcase pages to lock in the "grammar"
 
 **As long as a deck is ≥ 5 pages, never start from page 1 and work chronologically to the end.** Verified optimal sequence generated by 2026-04-22 moxt brochure:
 
 1. Pick **2 visually disparate page types** to craft showcases (e.g., "Cover" + "Emotional/Quote Page", or "Cover" + "Product Showcase").
 2. Screenshot them to the user to confirm the visual grammar (mastheads / typography / coloring / spacing / structures / dual-language proportions).
 3. Push through the remaining N-2 pages only after direction is approved, reusing the established grammar on every page.
 4. Finally interlock all components via the HTML aggregator + finalize PDF / PPTX formatting constraints.
 
 **Why**: Writing 13 pages blindly → User says "Wrong direction" = Reworking 13 times. Writing 2 pitches first → Wrong direction = Reworking 2 pages. Once visual grammar is locked, your decision space for the resting N pages narrows down purely to "how to position this new content."
 
 **Showcase selection principle**: Choose the two pages with the highest structural discrepancy in the entire deck. Getting approval here = any immediate states will pass.
 
 | Deck Type | Recommended Showcase Page Combo |
 |-----------|---------------------|
 | B2B brochure / Product Promo | Cover + Content Page (Ideology/Emotional appeal) |
 | Brand Launch | Cover + Target Features Page |
 | Data Report | Immersive Large Chart Page + Analytical Conclusion Page |
 | Tutorial / Courseware | Chapter Cover + Specialized Topic Instruction Page |
 
 ---
 
 ## 📐 Publishing Grammar Template (Moxt proven reusable pattern)
 
 Suitable for B2B brochures / Product promos / Extensive report decks. Reusing this skeleton layout on every page = 13 pages with unified visuals, zero rework.
 
 ### The Skeleton Code
 
 ```
 ┌─ masthead (top strip + line) ────────────┐
 │  [logo 22-28px] · A Product Brochure                Issue · Date · URL │
 ├──────────────────────────────────────────┤
 │                                          │
 │  ── kicker (short green horizontal line + uppercase tag)   │
 │  CHAPTER XX · SECTION NAME                 │
 │                                          │
 │  H1 (Chinese Noto Serif SC 900)             │
 │  Important words isolated into brand main color │
 │                                          │
 │  English subtitle (Lora italic)          │
 │  ─────────── Dividing Line ──────────            │
 │                                          │
 │  [Specific Content: Dual column 60/40 / 2x2 grid / Lists] │
 │                                          │
 ├──────────────────────────────────────────┤
 │ section name                     XX / total │
 └──────────────────────────────────────────┘
 ```
 
 ### Styling Rules (Copy this directly)
 
 - **H1**: Chinese Noto Serif SC 900, size 80-140px adjusting based on content volume. Important words explicitly highlighted in brand colors (Do not spam color across entire paragraphs).
 - **English sub**: Lora italic 26-46px. Bold brand signatures (e.g., "AI team") alongside your main-colored italics.
 - **Body**: Noto Serif SC 17-21px, line-height 1.75-1.85.
 - **Accent highlights**: Highlight target words inside the main body text explicitly using the brand color bolded, keeping it below 3 hits per page (Otherwise it loses its anchor functionality).
 - **Background**: Warm beige `#FAFAFA` + incredibly subtle radial-gradient noise (`rgba(33,33,33,0.015)`) mimicking paper texture.
 
 ### Protagonists Must Differentiate
 
 Having 13 pages of just "Text + a screenshot" is too monotonous. **Rotate the visual protagonists across pages**:
 
 | Visual Type | Suitable Section |
 |---------|---------------|
 | Cover typography (Huge text + masthead + pillars) | Home / Chapter Covers |
 | Solo character portraits (Massive singular element) | Introducing singular concepts/characters |
 | Group photos / Grid of avatars | Team / Use cases |
 | Sequential timeline cards | Demonstrating "long-term relationships", "evolution" |
 | Knowledge graphs / node connectors | Demonstrating "cooperation", "flow" |
 | Before/After comparing cards | Displaying "transformations", "contrast" |
 | Product UI screenshot + outlined device frames | Specific feature demos |
 | Giant quote (Massive half-page quotation) | Emotional pages / Questions / Endnotes |
 | Real human avatars + quote cards | User testimonies / Usage backgrounds |
 | Big typography envelope back-cover + URL button | CTA / Ending |
 
 ---
 
 ## ⚠️ Common Pitfalls (Moxt Practical Combat Summary)
 
 ### 1. Emojis fail to render during Chromium / Playwright PDF export
 
 Chromium by default runs without colored emoji fonts when running headless. Consequently, `page.pdf()` or `page.screenshot()` yields hollow box outlines for emojis.
 
 **Solution**: Replace with strict Unicode text-symbols (`✦` `✓` `✕` `→` `·` `—`), or flat out switch to straight text strings ("Email · 23" instead of "📧 23 emails").
 
 ### 2. `export_deck_pdf.mjs` Error `Cannot find package 'playwright'`
 
 Reason: ESM parses modules searching iteratively upward from the script for `node_modules`. If the script lives in `~/.claude/skills/huashu-design/scripts/`, dependencies won't exist there.
 
 **Solution**: Duplicate the scripts to the immediate deck project folder (e.g., `brochure/build-pdf.mjs`), run `npm install playwright pdf-lib` globally in the project root, then execute `node build-pdf.mjs --slides slides --out output/deck.pdf`.
 
 ### 3. Rendering misses Google Fonts resulting in fallback blocky text
 
 Playwright captures before fonts fully establish. Set at minimum a `wait-for-timeout=3500` flag pre-render giving webfonts exact time to download & paint. Alternatively, explicitly self-host fonts into `shared/fonts/` circumventing fetching latency entirely.
 
 ### 4. Information Density Imbalances: Bloated pages
 
 Moxt philosophy's first page implemented 2x2 = 4 paragraphs + bottom 3 principles = 7 distinct zones. Way too squeezed and highly repetitive. Moving back to 1x3 = 3 paragraphs immediately revived structural breathable space.
 
 **Solution**: Ensure pages contain max `"1 absolute central point + 3-4 auxiliary metrics + 1 visual protagonist"`. Exceeding this? Splinter it across new pages. **Less is explicitly more**—Audience stares at slides for 10 seconds; providing 1 highly memorable trigger point performs fundamentally better than cramming 4 conflicting points.
 
 ---
