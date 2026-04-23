# SCENE_PROMPTS.md

## Mục tiêu
Bộ prompt chuẩn để sinh thêm nhân vật minh họa và scene đồng nhất cho hệ show HTML.
Dùng các prompt này với image model bất kỳ, sau đó chọn asset tốt nhất, export nền trong suốt nếu có thể, rồi để Codex render HTML.

---

## 1) Master style prompt

```text
Warm editorial family-and-learning illustration, soft rounded geometry, watercolor-flat hybrid, premium presentation style, calm emotional tone, minimal facial details, expressive posture, pastel paper palette, navy peach sky green lavender accents, subtle grain texture, clean negative space, modern parenting and AI learning context, soft shadow, no text, transparent background
```

---

## 2) Master negative prompt

```text
photorealistic, realistic skin detail, 3d glossy render, hard black outlines, busy background, classroom clutter, random objects, extra fingers, malformed hands, distorted face, anime style, mascot style, corporate stock vector, embedded text, watermark, harsh lighting, neon colors
```

---

## 3) Prompt framework
Công thức:

```text
[MASTER STYLE PROMPT]
Scene: [mô tả scene cụ thể]
Composition: [bố cục/crop/negative space]
Mood: [cảm xúc]
Color emphasis: [màu chủ đạo]
Output: transparent background, isolated illustration asset
[MASTER NEGATIVE PROMPT]
```

---

## 4) Core scenes

### 4.1 Cover hero
```text
Warm editorial family-and-learning illustration, soft rounded geometry, watercolor-flat hybrid, premium presentation style, calm emotional tone, minimal facial details, expressive posture, pastel paper palette, navy peach sky green lavender accents, subtle grain texture, clean negative space, modern parenting and AI learning context, soft shadow, no text, transparent background.
Scene: a parent and child standing side by side, looking toward a hopeful future, gentle shared confidence, subtle device and book as secondary symbols, not futuristic sci-fi.
Composition: large hero scene for the right side of a presentation slide, generous negative space on the left, slightly overscaled, clean silhouette.
Mood: warm, hopeful, intelligent, emotionally safe.
Color emphasis: sky wash, peach clothing accents, navy grounding tones.
Output: transparent background, isolated illustration asset.
photorealistic, realistic skin detail, 3d glossy render, hard black outlines, busy background, classroom clutter, random objects, extra fingers, malformed hands, distorted face, anime style, mascot style, corporate stock vector, embedded text, watermark, harsh lighting, neon colors.
```

### 4.2 Parent listening to child
```text
[MASTER STYLE PROMPT]
Scene: mother sitting beside child, leaning slightly toward the child, listening with empathy while the child speaks about something important.
Composition: right-side presentation asset, medium-large scale, visible upper body and hand gesture, clean negative space around the figures.
Mood: trust, openness, calm connection.
Color emphasis: navy and peach with a soft sky background wash.
Output: transparent background, isolated illustration asset.
[MASTER NEGATIVE PROMPT]
```

### 4.3 Learning together with technology
```text
[MASTER STYLE PROMPT]
Scene: father and son sitting together using a tablet or laptop for learning, both engaged and curious, technology as a tool not the center of identity.
Composition: right-centered asset for a principle slide, balanced silhouette, device visible but secondary.
Mood: guided exploration, curiosity, healthy digital learning.
Color emphasis: sky, green, navy.
Output: transparent background, isolated illustration asset.
[MASTER NEGATIVE PROMPT]
```

### 4.4 Asking open questions
```text
[MASTER STYLE PROMPT]
Scene: parent asking a child an open reflective question, child thinking and responding, visible thoughtful gesture.
Composition: compact two-character scene for a principle slide, enough negative space for headline on the left.
Mood: reflective, supportive, intellectually alive.
Color emphasis: lavender and navy with soft paper tones.
Output: transparent background, isolated illustration asset.
[MASTER NEGATIVE PROMPT]
```

### 4.5 Digital wellbeing
```text
[MASTER STYLE PROMPT]
Scene: family creating a calm screen-free moment at home, books, warm lamp, gentle evening vibe, no dramatic details.
Composition: right-side or center-right scene, relaxed posture, clean silhouette, quiet storytelling.
Mood: balance, rest, togetherness.
Color emphasis: peach, warm yellow, muted navy.
Output: transparent background, isolated illustration asset.
[MASTER NEGATIVE PROMPT]
```

### 4.6 Shared rule-making
```text
[MASTER STYLE PROMPT]
Scene: parent and child agreeing on simple digital rules together, child participating actively, small habit tracker or notebook visible.
Composition: principle-slide scene, medium scale, clear hands and shared focus.
Mood: responsibility, agency, partnership.
Color emphasis: green, sky, navy.
Output: transparent background, isolated illustration asset.
[MASTER NEGATIVE PROMPT]
```

### 4.7 EQ and emotional naming
```text
[MASTER STYLE PROMPT]
Scene: parent comforting a child gently, helping the child name an emotion before solving the problem, soft eye contact, warm posture.
Composition: right-side emotional scene, visible interaction, minimal props.
Mood: emotional safety, empathy, warmth.
Color emphasis: peach, lavender, cream, navy.
Output: transparent background, isolated illustration asset.
[MASTER NEGATIVE PROMPT]
```

### 4.8 Values and storytelling
```text
[MASTER STYLE PROMPT]
Scene: parent telling a meaningful family story to a child, both seated close together, quiet intimate moment, symbolic warmth.
Composition: elegant closing-slide asset, airy, slightly smaller scale than cover hero.
Mood: values, memory, continuity, love.
Color emphasis: warm yellow, peach, navy.
Output: transparent background, isolated illustration asset.
[MASTER NEGATIVE PROMPT]
```

---

## 5) Framework / micro prompts

### 5.1 Micro object — open question
```text
[MASTER STYLE PROMPT]
Scene: a small symbolic illustration of a speech bubble, question mark, notebook, and soft star shapes, no characters.
Composition: compact micro illustration for a framework/stat slide.
Mood: curiosity and reflection.
Color emphasis: lavender, navy, soft yellow.
Output: transparent background, isolated illustration asset.
[MASTER NEGATIVE PROMPT]
```

### 5.2 Micro object — balanced digital life
```text
[MASTER STYLE PROMPT]
Scene: a small symbolic cluster of tablet, clock, leaf, and book arranged harmoniously.
Composition: compact object cluster with clean silhouette.
Mood: balance and healthy rhythm.
Color emphasis: green, sky, navy.
Output: transparent background, isolated illustration asset.
[MASTER NEGATIVE PROMPT]
```

### 5.3 Micro object — future skills
```text
[MASTER STYLE PROMPT]
Scene: a small symbolic cluster representing critical thinking, creativity, and empathy using abstract book, spark, heart, puzzle, and speech shapes.
Composition: compact clean object cluster for a 3-column framework slide.
Mood: capable, hopeful, future-ready.
Color emphasis: sky, peach, lavender.
Output: transparent background, isolated illustration asset.
[MASTER NEGATIVE PROMPT]
```

---

## 6) Variation prompts for consistency
Dùng khi cần thêm asset nhưng vẫn cùng style.

### Change only one variable at a time
- hành động khác
- góc nhìn khác
- số lượng nhân vật khác
- đạo cụ khác

### Không đổi cùng lúc
- style render
- palette tổng
- chất liệu
- hình khối khuôn mặt
- mức chi tiết background

---

## 7) Batch generation strategy
Để sinh bộ asset ổn định:
1. Sinh 4–6 biến thể cho cùng 1 scene.
2. Chọn 1 biến thể đẹp nhất làm “golden reference”.
3. Dùng golden reference để ràng model cho batch tiếp theo.
4. Chỉ nhận asset có transparent background hoặc dễ tách nền.
5. Chuẩn hóa naming ngay sau khi chọn.

---

## 8) Quick prompt tags
Có thể thêm cuối prompt:
- `isolated illustration`
- `transparent background`
- `presentation asset`
- `clean silhouette`
- `right-side hero composition`
- `editorial soft watercolor`

---

## 9) Acceptance checklist
Một asset sinh ra được giữ lại khi:
- đúng style chung
- tay/mặt không lỗi
- gesture có cảm xúc
- crop vào slide đẹp
- nền đủ sạch để tách
- không cần chỉnh quá nhiều mới dùng được
