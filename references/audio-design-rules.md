# Audio Design Rules · huashu-design
 
 > Sound application blueprints for all animation demos. Use strictly in tandem with `sfx-library.md` (Asset manifest).
 > Refined through combat: huashu-design release hero iterations v1-v9 · Anthropic 3 official ad deep teardowns · 8000+ A/B comparisons
 
 ---
 
 ## Core Principle · The Dual-Track Audio Rule (Ironclad)
 
 Animation audio **must be independently designed across two separate layers**, never just one:
 
 | Layer | Purpose | Time Scale | Relation to Visuals | Occupied Frequencies |
 |---|---|---|---|---|
 | **SFX (Beat layer)** | Marks every visual beat | 0.2 - 2s rapid | **Strong Sync** (Frame-level alignment) | **High bands 800Hz+** |
 | **BGM (Atmospheric base)** | Emotional bed, soundstage | 20 - 60s continuous | Weak Sync (Segment-level) | **Mid-Low bands <4kHz** |
 
 **Animations with only BGM are crippled**—audiences subconsciously perceive "the picture is moving but making no sound in response," which is the exact root cause of cheapness.
 
 ---
 
 ## The Gold Standard · Golden Ratio
 
 These values are empirical hard parameters derived from measuring Anthropic's 3 official vids + our own finalized v9 iteration. Apply them directly:
 
 ### Volume
 - **BGM Volume**: `0.40 - 0.50` (Relative to 1.0 max scale)
 - **SFX Volume**: `1.00`
 - **Loudness Differential**: BGM peaks must be **-6 to -8 dB lower** than SFX peaks (Do not make SFX prominent by making them absolutely loud; rely on the differential).
 - **amix Parameter**: `normalize=0` (Absolutely never use normalize=1; it flattens dynamic range entirely).
 
 ### Frequency Band Isolation (P1 Hard Optimization)
 Anthropic's secret isn't "loud SFX," it is **frequency stratification**:
 
 ```bash
 [bgm_raw]lowpass=f=4000[bgm]      # BGM restricted to mid-low <4kHz
 [sfx_raw]highpass=f=800[sfx]      # SFX pushed up to mid-high 800Hz+
 [bgm][sfx]amix=inputs=2:duration=first:normalize=0[a]
 ```
 
 **Why**: The human ear is hyper-sensitive to the 2-5kHz range (the "presence band"). If SFX occupy this band, but BGM covers the entire spectrum, **the BGM's highs will drown out the SFX**. High-passing the SFX and low-passing the BGM forces them to inhabit different spectrum corners, instantly elevating SFX clarity by a full tier.
 
 ### Fading
 - BGM In: `afade=in:st=0:d=0.3` (0.3s, prevents harsh clipping cuts)
 - BGM Out: `afade=out:st=N-1.5:d=1.5` (1.5s long tail, provides a conclusive wrapping sensation)
 - SFX inherently possess their own envelopes; no extra fading required.
 
 ---
 
 ## SFX Cue Design Protocol
 
 ### Density (SFX counts per 10 seconds)
 Measured Anthropic SFX densities across the 3 videos occupy three explicit tiers:
 
 | Video | SFX Count per 10s | Product Persona | Scenario |
 |---|---|---|---|
 | Artifacts (ref-1) | **~9 / 10s** | Feature-dense, high info | Complex tooling demo |
 | Code Desktop (ref-2) | **0** | Pure vibe, meditative | Dev tools state of flow |
 | Word (ref-3) | **~4 / 10s** | Balanced, workplace rhythm | Everyday productivity tool |
 
 **Heuristics**:
 - Product persona is calm/focused → Low SFX density (0-3 / 10s), driven primarily by BGM.
 - Product persona is lively/info-dense → High SFX density (6-9 / 10s), driven heavily by SFX rhythms.
 - **Do not fill every single visual beat**—Negative space is drastically more premium than clutter. **Deleting 30-50% of cues instantly injects dramatic tension into the survivors.**
 
 ### Cue Selection Priorities
 You don't need SFX for every single visual beat. Select using this priority matrix:
 
 **P0 Mandatory** (Omission guarantees cognitive dissonance):
 - Typing (Terminal / Inputs)
 - Clicks / Selections (Moments of user decision-making)
 - Focal shifts (When the visual protagonist changes)
 - Logo reveals (Brand conclusions)
 
 **P1 Highly Recommended**:
 - Element enter/exits (Modal / Card)
 - Completion / Success feedbacks
 - AI generation start/finish
 - Major transitions (Scene swaps)
 
 **P2 Optional** (Use sparingly, creates noise if overused):
 - Hover / Focus-ins
 - Progress ticks
 - Ambient decorations
 
 ### Timestamp Alignment Precision
 - **Exact Frame Alignment** (0ms error): Clicks / Focal shifts / Logo settling.
 - **Pre-emptive 1-2 frames** (-33ms): Rapid whooshes (Feeds the audience psychological anticipation).
 - **Trailing 1-2 frames** (+33ms): Objects landing / Impacts (Simulates true physical gravity delay).
 
 ---
 
 ## BGM Selection Decision Tree
 
 The huashu-design skill inherently provides 6 built-in BGMs (`assets/bgm-*.mp3`):
 
 ```
 What is the animation's persona?
 ├─ Product launch / Tech Demo → bgm-tech.mp3 (minimal synth + piano)
 ├─ Tutorial / Tool Showcase    → bgm-tutorial.mp3 (warm, instructional)
 ├─ Educational / Under the hood → bgm-educational.mp3 (curious, thoughtful)
 ├─ Marketing Promo / Brands    → bgm-ad.mp3 (upbeat, promotional)
 └─ Alternate style variations  → bgm-*-alt.mp3 (Alternatives for each)
 ```
 
 ### Scenarios with Zero BGM (Highly Worth Considering)
 Reference Anthropic's Code Desktop (ref-2): **0 SFX + purely Lo-fi BGM** achieved an incredible premium feel without sound clutter.
 
 **When to use Zero BGM**:
 - Animation is <10s (BGM doesn't have time to establish itself).
 - Product persona strictly demands "Focused / Meditative".
 - The environment structurally already houses ambient audio or Voiceovers.
 - SFX densities are exceedingly heavy (Prevents utter auditory overload).
 
 ---
 
 ## Scenario Blueprints (Plug & Play)
 
 ### Blueprint A · Product Launch Hero (Matching huashu-design v9)
 ```
 Duration: 25 Seconds
 BGM: bgm-tech.mp3 · 45% · Frequency <4kHz
 SFX Density: ~6 per 10s
 
 Cues:
   Terminal typing → type × 4 (Gap 0.6s)
   Enter key       → enter
   Cards converge  → card × 4 (Staggered 0.2s)
   Selection       → click
   Ripple expand   → whoosh
   Focal shifts    → focus × 4
   Brand logo      → thud (1.5s)
 
 Volumes: BGM 0.45 / SFX 1.0 · amix normalize=0
 ```
 
 ### Blueprint B · Tool Function Demo (Reference Anthropic Code Desktop)
 ```
 Duration: 30-45 Seconds
 BGM: bgm-tutorial.mp3 · 50%
 SFX Density: 0-2 per 10s (Ultra sparse)
 
 Strategy: Let BGM + Voiceover explanation drive the film. Apply SFX exclusively at **decisive moments** (File finished saving / Command completed executing).
 ```
 
 ### Blueprint C · AI Generation Demo
 ```
 Duration: 15-20 Seconds
 BGM: bgm-tech.mp3 or Zero BGM
 SFX Density: ~8 per 10s (High density)
 
 Cues:
   User Input     → type + enter
   AI Processing  → magic/ai-process (Looping 1.2s intervals)
   Generated Done → feedback/complete-done
   Results Spawn  → magic/sparkle
   
 Highlight: Play the ai-process cue looped 2-3 times acting as a sonic progress bar.
 ```
 
 ### Blueprint D · Pure Ambient Long Take (Reference Artifacts)
 ```
 Duration: 10-15 Seconds
 BGM: Zero.
 SFX: 3-5 meticulously designed isolated cues.
 
 Strategy: Every SFX is the protagonist. Eliminates BGM "muddiness."
 Fits: Single product slow-mos or extreme closeups.
 ```
 
 ---
 
 ## FFmpeg Synthesis Templates
 
 ### Template 1 · Sole SFX Overlay on Video
 ```bash
 ffmpeg -y -i video.mp4 -itsoffset 2.5 -i sfx.mp3 \
   -filter_complex "[0:a][1:a]amix=inputs=2:normalize=0[a]" \
   -map 0:v -map "[a]" output.mp4
 ```
 
 ### Template 2 · Multi-SFX Timeline Assembly (Aligned by cue times)
 ```bash
 ffmpeg -y \
   -i sfx-type.mp3 -i sfx-enter.mp3 -i sfx-click.mp3 -i sfx-thud.mp3 \
   -filter_complex "\
 [0:a]adelay=1100|1100[a0];\
 [1:a]adelay=3200|3200[a1];\
 [2:a]adelay=7000|7000[a2];\
 [3:a]adelay=21800|21800[a3];\
 [a0][a1][a2][a3]amix=inputs=4:duration=longest:normalize=0[mixed]" \
   -map "[mixed]" -t 25 sfx-track.mp3
 ```
 **Key Params**:
 - `adelay=N|N`: First number is left-channel delay(ms), second is right. Duplicate them to maintain stereo balancing.
 - `normalize=0`: Retains dynamic ranges entirely. Critical!
 - `-t 25`: Truncate output to exact seconds.
 
 ### Template 3 · Video + SFX Track + BGM (With Frequency Splitting)
 ```bash
 ffmpeg -y -i video.mp4 -i sfx-track.mp3 -i bgm.mp3 \
   -filter_complex "\
 [2:a]atrim=0:25,afade=in:st=0:d=0.3,afade=out:st=23.5:d=1.5,\
      lowpass=f=4000,volume=0.45[bgm];\
 [1:a]highpass=f=800,volume=1.0[sfx];\
 [bgm][sfx]amix=inputs=2:duration=first:normalize=0[a]" \
   -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k final.mp4
 ```
 
 ---
 
 ## Rapid Failure Triage
 
 | Symptom | Root Cause | Fix |
 |---|---|---|
 | Cannot hear the SFX clearly | Drowned by high BGM frequencies | Apply `lowpass=f=4000` to BGM + `highpass=f=800` to SFX |
 | Sounds screechy or overly loud | Absolute SFX volume is vastly clipped | Drop SFX to 0.7, simultaneously drop BGM to 0.3 to maintain differential |
 | SFX & BGM rhythms conflict | Wrong BGM picked (too beat-heavy) | Swap to ambient/minimal synth BGMs |
 | BGM ends abruptly | Missing fade out | Apply `afade=out:st=N-1.5:d=1.5` |
 | Multiple SFX merged into muddy noise | Density too high + individual SFXs are too long | Shrink SFXs to <0.5s length, maintain cue intervals ≥0.2s |
 | Social media (WeChat) video has no sound | Apps occasionally mute auto-plays natively | Ignore. Tapping the video unleashes sound normally. |
 
 ---
 
 ## High-End Aligning with Visuals
 
 ### SFX texture matching Visual texture
 - Warm Beige / Paper textures → Rely on **Wooden / Soft** cues (Morse, paper snap, soft click).
 - Cold Cyber-tech textures → Rely on **Metallic / Digital** cues (beep, pulse, glitch).
 - Childlike / Drawn textures → Rely on **Cartoony / Exaggerated** cues (boing, pop, zap).
 
 Example: Our `apple-gallery-showcase.md` warm beige scheme → Pairs perfectly with `keyboard/type.mp3` (mechanical) + `container/card-snap.mp3` (soft) + `impact/logo-reveal-v2.mp3` (cinematic bass).
 
 ### SFX guiding visual rhythms
 High-Tier trick: **Design your SFX timeline first, then bend the visuals to match it** (not the other way around).
 Since each SFX cue behaves effectively as a "metronome tick", visual animations stretching or pulling to meet those timestamps feel unbelievably robust. Alternately forcing SFX to chase visuals usually feels jarringly off-beat by a frame or two.
 
 ---
 
 ## Pre-Flight Checklist (Quality Check before Publishing)
 
 - [ ] Differential: SFX peak - BGM peak = -6 to -8 dB?
 - [ ] Frequencies: BGM lowpass 4kHz + SFX highpass 800Hz applied?
 - [ ] amix has `normalize=0` (Keeping dynamic range safe)?
 - [ ] BGM fades in (0.3s) and out (1.5s)?
 - [ ] SFX tally fits the product personality?
 - [ ] Every single SFX aligns exactly to visual beats (±1 Frame)?
 - [ ] Logo reveal SFX is sufficiently long (Recommendation 1.5s)?
 - [ ] Mute the BGM check: Do the naked SFXs maintain rhythmic flow?
 - [ ] Mute the SFXs check: Does the BGM actually feature emotional crescendos?
 
 Either layer, when listened to in complete isolation, must sound functionally harmonious alone. If they only sound okay when jammed together, the soundbed fundamentally failed.
 
 ---
