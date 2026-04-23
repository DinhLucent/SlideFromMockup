import { z } from "zod";

const citationSchema = z.object({
  source: z.string().min(1),
  note: z.string().min(1).optional(),
  url: z.string().url().optional()
});

const statItemSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  detail: z.string().min(1).optional()
});

const characterIdSchema = z.enum([
  "CH-01-mother",
  "CH-02-father",
  "CH-03-daughter",
  "CH-04-son",
  "CH-05-mentor"
]);

const characterProfileSchema = z.object({
  id: characterIdSchema,
  name: z.string().min(1),
  role: z.string().min(1),
  ageBand: z.string().min(1),
  vibe: z.string().min(1),
  wardrobe: z.array(z.string().min(1)).min(1),
  signaturePose: z.string().min(1)
});

const slideCharacterDirectionSchema = z.object({
  sceneId: z.string().min(1),
  poseId: z.string().min(1).optional(),
  actionId: z.string().min(1),
  actionSummary: z.string().min(1),
  emotionalGoal: z.string().min(1),
  characters: z.array(characterIdSchema),
  propFocus: z.array(z.string().min(1)).optional(),
  compositionNote: z.string().min(1).optional()
});

const characterBibleDirectionSchema = slideCharacterDirectionSchema.extend({
  slideId: z.string().min(1)
});

const illustrationAnchorSchema = z.enum([
  "right-center",
  "right-bottom",
  "right-top",
  "center-right-overscale",
  "left-bottom"
]);

const illustrationTypeSchema = z.enum([
  "hero-scene",
  "principle-scene",
  "micro-illustration",
  "object-cluster"
]);

const illustrationShadowSchema = z.enum([
  "none",
  "soft-sm",
  "soft-md",
  "soft-lg",
  "soft-xl"
]);

const illustrationWashSchema = z.enum([
  "none",
  "sky-soft",
  "sky-peach-soft",
  "peach-sky-soft",
  "lavender-sky-soft",
  "green-sky-soft",
  "sky-green-soft",
  "peach-yellow-soft",
  "peach-lavender-soft",
  "warm-yellow-soft"
]);

const illustrationMotionSchema = z.enum([
  "none",
  "float-xs",
  "fade-float-xs"
]);

const illustrationFocalPointSchema = z.enum([
  "center",
  "center-left",
  "center-right"
]);

const illustrationSchema = z.object({
  asset: z.string().min(1).optional(),
  src: z.string().min(1).optional(),
  type: illustrationTypeSchema,
  anchor: illustrationAnchorSchema,
  scale: z.number().min(0.3).max(1.3).default(1),
  zIndex: z.number().int().min(1).max(5).default(1),
  shadow: illustrationShadowSchema.default("none"),
  wash: illustrationWashSchema.default("none"),
  motion: illustrationMotionSchema.default("none"),
  focalPoint: illustrationFocalPointSchema.default("center"),
  cropSafe: z.boolean().default(true),
  alt: z.string().min(1).optional()
});

const assetManifestSlideSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  layoutVariant: z.string().min(1),
  theme: z.string().min(1),
  illustration: illustrationSchema
});

export const slideRoleSchema = z.enum([
  "cover",
  "hook",
  "pain_points",
  "context",
  "evidence",
  "stat",
  "transition",
  "principle",
  "recap",
  "cta",
  "thanks",
  "appendix"
]);

export const slideTypeSchema = z.enum([
  "CoverSlide",
  "HookSlide",
  "ProblemEvidenceSlide",
  "FrameworkSlide",
  "ClosingReferenceSlide"
]);

export const slideThemeSchema = z.enum([
  "warm-paper",
  "playful-watercolor",
  "sky-wash",
  "golden-hour",
  "quiet-reference"
]);

export const motionSchema = z.enum([
  "none",
  "soft-float",
  "soft-rise",
  "gentle-pan"
]);

export const slideSchema = z.object({
  slideNumber: z.number().int().positive(),
  id: z.string().min(1),
  assetManifestId: z.string().min(1).optional(),
  type: slideTypeSchema,
  role: slideRoleSchema,
  act: z.enum(["opening", "evidence", "action", "closing"]),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  accentWords: z.array(z.string().min(1)).max(2).optional(),
  subheadline: z.string().nullable().optional(),
  body: z.string().nullable().optional(),
  bullets: z.array(z.string()).optional(),
  quote: z.string().nullable().optional(),
  callout: z.string().nullable().optional(),
  badgeNumber: z.union([z.string(), z.number()]).nullable().optional(),
  statItems: z.array(statItemSchema).optional(),
  citation: z.array(citationSchema).optional(),
  coreMessage: z.string().min(1),
  tone: z.string().min(1),
  emotion: z.string().min(1),
  textDensity: z.enum(["hero", "low", "medium"]),
  theme: slideThemeSchema,
  layoutVariant: z.string().min(1),
  motion: motionSchema.default("none"),
  illustration: illustrationSchema,
  characterDirection: slideCharacterDirectionSchema.optional(),
  illustrationSubject: z.string().min(1),
  imagePrompt: z.string().optional(),
  speakerNote: z.string().optional(),
  footerOpacity: z.number().min(0.1).max(1).optional()
});

export const deckSchema = z.object({
  meta: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    audience: z.string().min(1),
    objective: z.string().min(1),
    theme: z.string().min(1)
  }),
  slides: z.array(slideSchema).min(1)
});

export const deckManifestSchema = z.object({
  deckId: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  theme: z.string().min(1),
  language: z.string().min(1),
  deck: z.string().min(1),
  docs: z.array(z.string()).min(1)
});

export const assetManifestSchema = z.object({
  deckId: z.string().min(1),
  canvas: z.object({
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    background: z.string().min(1)
  }),
  assetBasePath: z.string().min(1),
  slides: z.array(assetManifestSlideSchema).min(1)
});

export const characterBibleSchema = z.object({
  roster: z.array(characterProfileSchema).min(1),
  slideDirections: z.array(characterBibleDirectionSchema).min(1)
});

export type Citation = z.infer<typeof citationSchema>;
export type StatItem = z.infer<typeof statItemSchema>;
export type Slide = z.infer<typeof slideSchema>;
export type Deck = z.infer<typeof deckSchema>;
export type DeckManifest = z.infer<typeof deckManifestSchema>;
export type Illustration = z.infer<typeof illustrationSchema>;
export type SlideTheme = z.infer<typeof slideThemeSchema>;
export type SlideMotion = z.infer<typeof motionSchema>;
export type AssetManifest = z.infer<typeof assetManifestSchema>;
export type AssetManifestSlide = z.infer<typeof assetManifestSlideSchema>;
export type CharacterProfile = z.infer<typeof characterProfileSchema>;
export type SlideCharacterDirection = z.infer<typeof slideCharacterDirectionSchema>;
export type CharacterBible = z.infer<typeof characterBibleSchema>;
