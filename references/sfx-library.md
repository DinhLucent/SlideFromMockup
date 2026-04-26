# SFX Library · Slide ProMax

This file describes the sound-effect inventory and selection logic used by animation and product-demo exports.

Use it together with:

- `audio-design-rules.md` for mixing strategy and cue density.
- `video-export.md` for export workflow.
- `animation-best-practices.md` for motion timing.

## Asset Directory

```text
sfx/
├── keyboard/      type, type-fast, delete-key, space-tap, enter
├── ui/            click, click-soft, focus, hover-subtle, tap-finger, toggle-on
├── transition/    whoosh, whoosh-fast, swipe-horizontal, slide-in, dissolve
├── container/     card-snap, card-flip, stack-collapse, modal-open
├── feedback/      success-chime, error-tone, notification-pop, achievement
├── progress/      loading-tick, complete-done, generate-start
├── impact/        logo-reveal, logo-reveal-v2, brand-stamp, drop-thud
├── magic/         sparkle, ai-process, transform
└── terminal/      command-execute, output-appear, cursor-blink
```

Use exact paths in manifests and cue sheets so export scripts can locate the files deterministically.

## Quick Index

### Keyboard

| File | Duration | Use | Prompt keywords |
|---|---:|---|---|
| `sfx/keyboard/type.mp3` | 0.5s | Single key press | mechanical keyboard single key press |
| `sfx/keyboard/type-fast.mp3` | 1.5s | Continuous fast typing | fast continuous typing rhythm |
| `sfx/keyboard/delete-key.mp3` | 0.5s | Backspace/delete action | single backspace key, low thud |
| `sfx/keyboard/space-tap.mp3` | 0.5s | Spacebar tap | soft spacebar tap, wide flat key |
| `sfx/keyboard/enter.mp3` | 0.5s | Enter/confirm key | enter key press, crisp tactile |

### UI

| File | Duration | Use | Prompt keywords |
|---|---:|---|---|
| `sfx/ui/click.mp3` | 0.5s | Standard UI click | crisp modern interface click |
| `sfx/ui/click-soft.mp3` | 0.5s | Secondary button/link | soft gentle button click |
| `sfx/ui/focus.mp3` | 0.5s | Element focus/select | subtle focus tone, element highlight |
| `sfx/ui/hover-subtle.mp3` | 0.5s | Hover feedback | barely audible tick, air whisper |
| `sfx/ui/tap-finger.mp3` | 0.5s | Mobile tap | finger tap on touchscreen, muted thud |
| `sfx/ui/toggle-on.mp3` | 0.5s | Toggle enabled | toggle switch flip, satisfying click |

### Transition

| File | Duration | Use | Prompt keywords |
|---|---:|---|---|
| `sfx/transition/whoosh.mp3` | 0.8s | Normal scene transition | soft cinematic whoosh |
| `sfx/transition/whoosh-fast.mp3` | 0.6s | Fast reveal / pre-impact | fast airy whoosh |
| `sfx/transition/swipe-horizontal.mp3` | 0.7s | Horizontal panel movement | clean horizontal swipe |
| `sfx/transition/slide-in.mp3` | 0.6s | Panel/card slides in | smooth UI panel slide |
| `sfx/transition/dissolve.mp3` | 0.9s | Soft fade/dissolve | soft airy dissolve shimmer |

### Container

| File | Duration | Use | Prompt keywords |
|---|---:|---|---|
| `sfx/container/card-snap.mp3` | 0.5s | Card lands in place | soft card snap, paper and glass |
| `sfx/container/card-flip.mp3` | 0.7s | Card flips | quick card flip, tactile |
| `sfx/container/stack-collapse.mp3` | 0.8s | Multiple cards collapse | stacked papers collapse cleanly |
| `sfx/container/modal-open.mp3` | 0.6s | Modal/panel opens | soft modal pop open |

### Feedback

| File | Duration | Use | Prompt keywords |
|---|---:|---|---|
| `sfx/feedback/success-chime.mp3` | 1.0s | Success confirmation | two ascending bell tones |
| `sfx/feedback/error-tone.mp3` | 0.7s | Error or warning | descending two-note warning |
| `sfx/feedback/notification-pop.mp3` | 0.6s | Notification appears | small notification pop |
| `sfx/feedback/achievement.mp3` | 1.5s | Major milestone | premium achievement chime |

### Progress

| File | Duration | Use | Prompt keywords |
|---|---:|---|---|
| `sfx/progress/loading-tick.mp3` | 0.5s | Loading/progress tick | minimal loading tick |
| `sfx/progress/complete-done.mp3` | 0.8s | Process complete | completion done tone |
| `sfx/progress/generate-start.mp3` | 0.8s | Generation begins | soft engine start, AI process |

### Impact

| File | Duration | Use | Prompt keywords |
|---|---:|---|---|
| `sfx/impact/logo-reveal.mp3` | 1.2s | Logo appears | cinematic logo reveal |
| `sfx/impact/logo-reveal-v2.mp3` | 1.5s | Strong logo landing | cinematic bass logo impact |
| `sfx/impact/brand-stamp.mp3` | 0.8s | Brand stamp / final mark | clean brand stamp |
| `sfx/impact/drop-thud.mp3` | 0.6s | Heavy object lands | soft heavy drop thud |

### Magic

| File | Duration | Use | Prompt keywords |
|---|---:|---|---|
| `sfx/magic/sparkle.mp3` | 0.8s | Sparkle / reveal | bright twinkling chime |
| `sfx/magic/ai-process.mp3` | 1.2s | AI processing loop | subtle digital process loop |
| `sfx/magic/transform.mp3` | 1.0s | Transformation | shimmering transformation |

### Terminal

| File | Duration | Use | Prompt keywords |
|---|---:|---|---|
| `sfx/terminal/command-execute.mp3` | 0.5s | Command runs | terminal command execute blip |
| `sfx/terminal/output-appear.mp3` | 0.6s | Output appears | terminal output materializes |
| `sfx/terminal/cursor-blink.mp3` | 0.4s | Cursor blink | tiny cursor blink tick |

## Recommended Scene Recipes

### Terminal Interaction Demo

```text
type (0.5s)
-> enter (0.5s)
-> command-execute (0.5s)
-> output-appear (0.6s)
```

Use for coding demos, CLI workflows, and developer-product animations.

### Card Selection Flow

```text
hover-subtle (0.5s)
-> click-soft (0.5s)
-> card-snap (0.5s)
```

Use for option selection, gallery picking, and visual-direction demos.

### AI Generation Flow

```text
generate-start (0.8s)
-> ai-process (loop every 1.2s while processing)
-> sparkle (0.8s)
-> complete-done (0.8s)
```

Use when the UI needs to show "thinking" without pretending the result appeared magically.

### Logo Reveal

```text
whoosh-fast (0.6s)
-> logo-reveal-v2 (1.5s)
-> sparkle (0.8s, optional tail)
```

Short version:

```text
whoosh -> logo-reveal
```

Use only once per video. Repeating logo hits makes the audio feel cheap.

### Mobile UI Interaction

```text
tap-finger (0.5s)
-> slide-in (0.6s)
-> toggle-on (0.5s)
```

Use for app prototypes, onboarding, settings, and mobile product demos.

### Data Visualization / Dashboard

```text
loading-tick x N
-> complete-done (0.8s)
-> achievement (1.5s, optional if the result is a major reveal)
```

Keep ticks sparse. Dense dashboards become muddy if every metric makes a sound.

### Form Submission

```text
click-soft (0.5s)
-> loading-tick x2 (1.0s total)
-> success-chime (1.0s)
```

For errors, replace `success-chime` with `error-tone` and avoid a harsh alarm unless the product genuinely requires urgency.

### Magic Transform

```text
whoosh-fast (0.6s)
-> transform (1.0s)
-> sparkle (0.8s)
```

Use sparingly. If every transform sparkles, none of them feel special.

## Selection Logic

Choose SFX by the physical action being simulated:

1. **Tactile action** such as typing, tapping, clicking, or swiping -> `keyboard/` or `ui/`.
2. **Element entrance or exit** -> `transition/`.
3. **Container operation** such as cards, modals, or panels -> `container/`.
4. **State feedback** such as success, failure, or notification -> `feedback/`.
5. **Progress or time flow** -> `progress/`.
6. **Brand landing or important moment** -> `impact/`.
7. **AI transformation or reveal** -> `magic/`.
8. **Command-line or code demo** -> `terminal/`.

## Density Rules

- Use fewer sounds than visual beats.
- Give important sounds room to breathe.
- Keep most SFX shorter than 0.8s.
- Avoid stacking more than two SFX in the same 200ms window.
- Do not use impact sounds for ordinary UI clicks.
- Keep one "hero sound" per short video.

## Prompting New SFX

When generating a missing SFX, describe:

1. The physical source.
2. The action.
3. The desired material/tone.
4. Exclusions such as no reverb, no crowd, no voice, no melody.

Bad:

```text
click sound
```

Good:

```text
crisp modern UI button click, clean studio recording, short, high pitched,
no reverb, no background noise
```

Bad:

```text
magic
```

Good:

```text
bright twinkling stars sound, high pitched glittery chime, fairy-dust feel,
short tail, no melody, clean studio
```

## Delivery Checklist

- [ ] Every cue aligns with a visible beat.
- [ ] SFX density matches product personality.
- [ ] No cue is used only because there was silence.
- [ ] BGM leaves room for SFX.
- [ ] Important impact sounds are not repeated.
- [ ] All file paths exist.
- [ ] Final audio is checked in the exported MP4, not only in the timeline.
