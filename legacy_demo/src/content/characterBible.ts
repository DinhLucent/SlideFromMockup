import { characterBibleSchema } from "./schema";

const characterBible = characterBibleSchema.parse({
  roster: [
    {
      id: "CH-01-mother",
      name: "Mother",
      role: "Listener-guide",
      ageBand: "30-42",
      vibe: "Calm, warm, thoughtful, emotionally available",
      wardrobe: ["navy", "peach", "cream", "muted green"],
      signaturePose: "pose-mother-listening-child-01"
    },
    {
      id: "CH-02-father",
      name: "Father",
      role: "Explainer-guide",
      ageBand: "32-45",
      vibe: "Steady, friendly, reliable, quietly encouraging",
      wardrobe: ["navy", "sky", "cream", "muted green"],
      signaturePose: "pose-father-son-laptop-01"
    },
    {
      id: "CH-03-daughter",
      name: "Daughter",
      role: "Reflective learner",
      ageBand: "7-11",
      vibe: "Curious, expressive, inwardly thoughtful, open-hearted",
      wardrobe: ["peach", "lavender", "cream", "sky"],
      signaturePose: "pose-daughter-thinking-01"
    },
    {
      id: "CH-04-son",
      name: "Son",
      role: "Focused explorer",
      ageBand: "7-11",
      vibe: "Curious, grounded, energetic in a calm way, eager to build",
      wardrobe: ["sky", "green", "navy", "warm yellow"],
      signaturePose: "pose-son-with-device-seated-01"
    },
    {
      id: "CH-05-mentor",
      name: "Mentor",
      role: "Optional teacher figure",
      ageBand: "25-40",
      vibe: "Clear, bright, professional-but-soft, supportive",
      wardrobe: ["navy", "cream", "sky"],
      signaturePose: "pose-mentor-open-guidance-01"
    }
  ],
  slideDirections: [
    {
      slideId: "s01_cover",
      sceneId: "scene-family-future-horizon-01",
      poseId: "pose-family-side-by-side-01",
      actionId: "family-looking-forward",
      actionSummary:
        "CH-01 and CH-02 anchor CH-03 and CH-04 beside them, all facing the horizon as a shared future scene.",
      emotionalGoal: "Hopeful safety",
      characters: ["CH-01-mother", "CH-02-father", "CH-03-daughter", "CH-04-son"],
      propFocus: ["book", "future skyline", "hot-air balloons"],
      compositionNote: "Keep the family grouped on the right and leave the left side open for the cover title."
    },
    {
      slideId: "s02_hook",
      sceneId: "scene-child-future-path-01",
      poseId: "pose-daughter-stepping-forward-01",
      actionId: "child-stepping-into-future",
      actionSummary:
        "CH-03 moves forward with quiet curiosity, glancing toward the open sky as if entering a larger world.",
      emotionalGoal: "Reflective anticipation",
      characters: ["CH-03-daughter"],
      propFocus: ["light path", "birds"],
      compositionNote: "Single-child hero; keep the silhouette simple and airy."
    },
    {
      slideId: "s03_pain_points",
      sceneId: "scene-digital-overwhelm-embrace-01",
      poseId: "pose-mother-comforting-child-01",
      actionId: "mother-shields-child-from-overwhelm",
      actionSummary:
        "CH-01 bends in to hold CH-04 close while symbolic tech noise stays soft and secondary around them.",
      emotionalGoal: "Empathetic concern",
      characters: ["CH-01-mother", "CH-04-son"],
      propFocus: ["signal icons", "soft device symbols"],
      compositionNote: "The embrace is primary; technology cues should never overpower the human connection."
    },
    {
      slideId: "s04_context_hook",
      sceneId: "scene-child-open-sky-awareness-01",
      poseId: "pose-daughter-looking-up-01",
      actionId: "child-registers-changing-world",
      actionSummary:
        "CH-03 pauses and looks upward as the environment suggests change larger than any single app or device.",
      emotionalGoal: "Aware openness",
      characters: ["CH-03-daughter"],
      propFocus: ["open sky wash"],
      compositionNote: "Use a single upward-looking pose with plenty of atmospheric breathing room."
    },
    {
      slideId: "s05_evidence_screen_time",
      sceneId: "scene-screen-time-observation-01",
      poseId: "pose-son-with-device-seated-01",
      actionId: "child-absorbed-in-device",
      actionSummary:
        "CH-04 sits with a device in a neutral, non-judgmental pose that signals habit rather than crisis.",
      emotionalGoal: "Calm evidence",
      characters: ["CH-04-son"],
      propFocus: ["tablet", "time cue"],
      compositionNote: "Keep the figure compact and anchored low so the research copy stays dominant."
    },
    {
      slideId: "s06_evidence_connection",
      sceneId: "scene-family-secure-attachment-01",
      poseId: "pose-family-warm-hug-01",
      actionId: "family-reconnects-through-closeness",
      actionSummary:
        "CH-01 and CH-02 gather CH-03 and CH-04 into a compact affectionate cluster to signal safety and co-regulation.",
      emotionalGoal: "Reassured attachment",
      characters: ["CH-01-mother", "CH-02-father", "CH-03-daughter", "CH-04-son"],
      propFocus: ["warm light"],
      compositionNote: "Faces should read clearly; keep the family close and emotionally legible."
    },
    {
      slideId: "s07_market_shift",
      sceneId: "scene-future-of-work-signpost-01",
      actionId: "symbolic-signpost-points-to-transition",
      actionSummary:
        "A symbolic signpost replaces human figures so the message reads as market context rather than family drama.",
      emotionalGoal: "Authoritative clarity",
      characters: [],
      propFocus: ["signpost", "path", "mountain horizon"],
      compositionNote: "Use the signpost as a quiet directional cue instead of a character scene."
    },
    {
      slideId: "s08_future_skills",
      sceneId: "scene-child-skill-steps-01",
      poseId: "pose-son-climbing-steps-01",
      actionId: "child-ascends-through-skill-building",
      actionSummary:
        "CH-04 climbs steady steps toward a star, emphasizing growth through repeated practice rather than instant mastery.",
      emotionalGoal: "Empowered momentum",
      characters: ["CH-04-son"],
      propFocus: ["stairs", "star badge"],
      compositionNote: "Keep the stair silhouette clean and upward-moving, not competitive or aggressive."
    },
    {
      slideId: "s09_transition",
      sceneId: "scene-family-transition-walk-01",
      poseId: "pose-family-forward-walk-01",
      actionId: "family-walks-into-action-phase",
      actionSummary:
        "CH-01 and CH-02 walk with CH-03 and CH-04 into a brighter path, bridging context into practical guidance.",
      emotionalGoal: "Inviting movement",
      characters: ["CH-01-mother", "CH-02-father", "CH-03-daughter", "CH-04-son"],
      propFocus: ["bright path", "field light"],
      compositionNote: "Use a wide family silhouette to mark the transition into the principles section."
    },
    {
      slideId: "s10_principle_listen",
      sceneId: "scene-listening-eye-level-01",
      poseId: "pose-mother-listening-child-01",
      actionId: "mother-listens-at-eye-level",
      actionSummary:
        "CH-01 lowers to CH-03's eye level and listens before guiding, letting attention land on the connection itself.",
      emotionalGoal: "Trust and openness",
      characters: ["CH-01-mother", "CH-03-daughter"],
      propFocus: ["shared eye line"],
      compositionNote: "Eye contact and an open hand gesture should carry the scene."
    },
    {
      slideId: "s11_principle_learn_together",
      sceneId: "scene-learning-with-ai-01",
      poseId: "pose-father-son-laptop-01",
      actionId: "father-and-son-explore-tool-together",
      actionSummary:
        "CH-02 and CH-04 learn beside one another, with the device clearly secondary to shared attention and curiosity.",
      emotionalGoal: "Guided curiosity",
      characters: ["CH-02-father", "CH-04-son"],
      propFocus: ["laptop", "notebook"],
      compositionNote: "Keep the posture shoulder-to-shoulder, not supervisory or top-down."
    },
    {
      slideId: "s12_principle_critical_thinking",
      sceneId: "scene-open-question-reflection-01",
      poseId: "pose-daughter-thinking-01",
      actionId: "child-pauses-to-think-before-answering",
      actionSummary:
        "CH-03 holds a reflective pose with question and idea symbols orbiting as prompts, not distractions.",
      emotionalGoal: "Reflective agency",
      characters: ["CH-03-daughter"],
      propFocus: ["question marks", "light bulb"],
      compositionNote: "Use generous headroom around the single figure so the thought cues stay airy."
    },
    {
      slideId: "s13_principle_digital_wellbeing",
      sceneId: "scene-digital-wellbeing-family-outdoors-01",
      poseId: "pose-family-device-free-ride-01",
      actionId: "family-chooses-offline-rhythm",
      actionSummary:
        "CH-01 and CH-02 set the pace while CH-03 and CH-04 enjoy an outdoor moment away from screens.",
      emotionalGoal: "Balanced ease",
      characters: ["CH-01-mother", "CH-02-father", "CH-03-daughter", "CH-04-son"],
      propFocus: ["bicycle", "sunlit path"],
      compositionNote: "Movement should feel light and restorative, not sporty or intense."
    },
    {
      slideId: "s14_principle_autonomy",
      sceneId: "scene-autonomy-shared-responsibility-01",
      poseId: "pose-son-watering-plants-01",
      actionId: "child-practices-responsibility-independently",
      actionSummary:
        "CH-04 completes a small household task on his own, with adult structure implied rather than shown.",
      emotionalGoal: "Confident responsibility",
      characters: ["CH-04-son"],
      propFocus: ["watering can", "plant pots"],
      compositionNote: "Focus on purposeful action and ownership, not on adult correction."
    },
    {
      slideId: "s15_principle_eq",
      sceneId: "scene-eq-self-awareness-01",
      poseId: "pose-daughter-self-soothing-01",
      actionId: "child-names-and-regulates-feelings",
      actionSummary:
        "CH-03 sits calmly with grounded posture as soft heart motifs suggest emotion naming and inner steadiness.",
      emotionalGoal: "Warm emotional literacy",
      characters: ["CH-03-daughter"],
      propFocus: ["heart motifs"],
      compositionNote: "Keep the pose centered and gentle, with no melodrama."
    },
    {
      slideId: "s16_principle_values",
      sceneId: "scene-family-values-guidance-01",
      poseId: "pose-family-storytelling-walk-01",
      actionId: "family-follows-values-toward-guiding-light",
      actionSummary:
        "CH-01 and CH-02 lead CH-03 and CH-04 toward a lighthouse-like symbol of values, turning guidance into a lived scene.",
      emotionalGoal: "Uplifted guidance",
      characters: ["CH-01-mother", "CH-02-father", "CH-03-daughter", "CH-04-son"],
      propFocus: ["lighthouse", "shore path"],
      compositionNote: "Treat the lighthouse as a quiet value symbol, not a literal travel scene."
    },
    {
      slideId: "s17_recap",
      sceneId: "scene-family-warmth-recap-01",
      poseId: "pose-family-hand-in-hand-01",
      actionId: "family-walks-with-security",
      actionSummary:
        "The family moves together in a calm, hand-in-hand rhythm that resolves the deck back into relationship.",
      emotionalGoal: "Settled hope",
      characters: ["CH-01-mother", "CH-02-father", "CH-03-daughter", "CH-04-son"],
      propFocus: ["sunrise field"],
      compositionNote: "Keep the walk compact and emotionally grounded rather than cinematic."
    },
    {
      slideId: "s18_references",
      sceneId: "scene-reference-books-01",
      actionId: "symbolic-reference-stack-supports-credibility",
      actionSummary:
        "A quiet stack of books supports the research layer without introducing character drama.",
      emotionalGoal: "Quiet trust",
      characters: [],
      propFocus: ["books", "paper texture"],
      compositionNote: "Very low visual weight; the asset should stay secondary to the citations."
    },
    {
      slideId: "s19_thanks",
      sceneId: "scene-thank-you-family-banner-01",
      poseId: "pose-family-grateful-walk-01",
      actionId: "family-crosses-flower-field-in-gratitude",
      actionSummary:
        "CH-01, CH-02, CH-03 and CH-04 move lightly through a floral banner composition to carry the thank-you tone.",
      emotionalGoal: "Playful gratitude",
      characters: ["CH-01-mother", "CH-02-father", "CH-03-daughter", "CH-04-son"],
      propFocus: ["flowers", "open sky"],
      compositionNote: "Use a banner-wide silhouette with soft details and a light finish."
    },
    {
      slideId: "s20_closing_poster",
      sceneId: "scene-closing-small-step-01",
      poseId: "pose-family-evening-walk-01",
      actionId: "family-commits-to-one-small-step",
      actionSummary:
        "The whole family keeps moving together through a warm landscape, reinforcing steady action over dramatic change.",
      emotionalGoal: "Motivated calm",
      characters: ["CH-01-mother", "CH-02-father", "CH-03-daughter", "CH-04-son"],
      propFocus: ["flower field", "sunset path"],
      compositionNote: "End with soft momentum and a long-tail emotional afterglow."
    }
  ]
});

export default characterBible;
