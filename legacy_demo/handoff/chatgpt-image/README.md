# ChatGPT Image Handoff

Recommended workflow:

1. Upload or paste [`MASTER_BRIEF.md`](/D:/MyProject/Slide_ProMax/handoff/chatgpt-image/MASTER_BRIEF.md:1) into ChatGPT first.
2. Send [`STYLE_REFERENCE_REQUEST.md`](/D:/MyProject/Slide_ProMax/handoff/chatgpt-image/STYLE_REFERENCE_REQUEST.md:1) to create or lock a single style reference image first.
3. Tell ChatGPT Image: `Keep this style and cast consistent across all upcoming assets.`
4. Send one batch file at a time:
   - [`BATCH_01_SLIDES_01_05.md`](/D:/MyProject/Slide_ProMax/handoff/chatgpt-image/BATCH_01_SLIDES_01_05.md:1)
   - [`BATCH_02_SLIDES_06_10.md`](/D:/MyProject/Slide_ProMax/handoff/chatgpt-image/BATCH_02_SLIDES_06_10.md:1)
   - [`BATCH_03_SLIDES_11_15.md`](/D:/MyProject/Slide_ProMax/handoff/chatgpt-image/BATCH_03_SLIDES_11_15.md:1)
   - [`BATCH_04_SLIDES_16_20.md`](/D:/MyProject/Slide_ProMax/handoff/chatgpt-image/BATCH_04_SLIDES_16_20.md:1)
5. Ask it to generate one asset at a time, not all 5 at once.
6. After you approve one image, say: `Use this as the character/style reference for the next asset.`

Recommended prompt wrapper:

```text
Use the attached MASTER_BRIEF and the current batch file.
Generate only the first asset in the batch.
Keep character faces, age, clothing palette, and illustration style consistent with previous approved assets.
Output an isolated presentation illustration asset with transparent background if possible.
No embedded text, no watermark, no extra background clutter.
After generating, wait for approval before moving to the next asset.
```

Notes:
- The easiest operating mode is `1 asset per prompt`.
- The easiest package for ChatGPT Image is `1 style reference + 3-5 scene requests`.
- For this HTML deck, prioritize full `scene` assets first. Do not spend time generating separate character cutouts unless we decide to reuse them across multiple slides.
- Preferred scene size: `1792x1024`, `1600x900`, or `1920x1080`.
- Preferred scene format from ChatGPT Image: `PNG` first; convert to `WEBP` later if you want lighter web assets.
- Character cutouts, if needed later, should be `PNG` with transparent background.
- Background washes or simple blobs can be `PNG` transparent or `SVG`.
- Keep accepted outputs in `/assets/illustrations`.
- If a generated filename differs from the current contract, either rename the file to match the target filename or update the manifest afterward.
