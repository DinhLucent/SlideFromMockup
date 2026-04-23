# Illustration Assets

This folder is the only runtime source for slide illustration files.

Rules:
- Keep all exported illustration assets directly in `/assets/illustrations`.
- Use transparent-background `webp`, `png`, or `svg` files only.
- Keep the filename stem identical to `illustration.asset` in [`ASSET_MANIFEST_SAMPLE.json`](/D:/MyProject/Slide_ProMax/ASSET_MANIFEST_SAMPLE.json:1).
- Rendered slide components must consume these assets only through [`IllustrationSlot.tsx`](/D:/MyProject/Slide_ProMax/src/components/media/IllustrationSlot.tsx:1).

Naming patterns from spec:
- `hero-parenting-cover-01.webp`
- `scene-parenting-hook-01.webp`
- `principle-listening-01.webp`
- `micro-screen-balance-01.svg`
- `wash-sky-01.svg`

Contract reminder:
- `src` must begin with `/assets/illustrations/`
- `asset` must match the file stem
- illustration presentation is limited to manifest metadata: `type`, `anchor`, `scale`, `zIndex`, `shadow`, `wash`, `motion`, `focalPoint`
