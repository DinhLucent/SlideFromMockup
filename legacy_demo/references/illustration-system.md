# ILLUSTRATION_SYSTEM.md

## Mục tiêu
Xây dựng hệ minh họa để Codex hoặc bất kỳ HTML builder nào có thể render deck/show với **show-quality fidelity**, bám đúng tinh thần mockup: ấm, sáng, editorial, hình ảnh dẫn cảm xúc.

---

## 1) Nguyên tắc nền
- HTML là source of truth.
- Minh họa là asset ngoài: `webp/png/svg`.
- Không để code “tự phát minh style” ở runtime.
- Mọi minh họa phải đi qua một hệ chung: style, crop, scale, layering, motion.

---

## 2) Vai trò của minh họa trong show
Minh họa không chỉ để “cho đẹp”. Nó làm 4 việc:
1. **Neo cảm xúc** cho slide.
2. **Định nhịp thị giác** giữa các đoạn nội dung.
3. **Tăng trí nhớ** cho message chính.
4. **Giảm cảm giác text-heavy** mà không làm slide bận.

---

## 3) Asset tiers

### Tier A — Hero scenes
Dùng cho:
- cover
- hook
- chapter open
- closing

Đặc điểm:
- scene lớn
- nhiều cảm xúc
- có 1–3 nhân vật
- khoảng trắng rõ
- có wash/glow mềm đi kèm

### Tier B — Principle scenes
Dùng cho:
- slide nguyên tắc
- evidence / explanation
- transition mềm

Đặc điểm:
- 1–2 nhân vật
- pose rõ
- storytelling rõ
- ít background detail

### Tier C — Micro illustrations
Dùng cho:
- stat slide
- framework slide
- bullet slide
- callout

Đặc điểm:
- object hoặc 1 nhân vật nhỏ
- dùng như điểm nhấn
- không tranh tiêu đề

---

## 4) Illustration archetypes
Chỉ nên dùng 6 archetype minh họa:

1. **Hero emotional scene**
   - parent + child / family
   - chiếm lớn bên phải

2. **Shared learning scene**
   - cùng học với tablet/laptop/sách

3. **Listening / dialogue scene**
   - 2 nhân vật tương tác ánh mắt

4. **Reflective single character**
   - 1 nhân vật suy nghĩ / viết / học

5. **Balanced life scene**
   - nghỉ màn hình / đọc sách / đi bộ / chơi nhẹ

6. **Symbolic object cluster**
   - sách + tablet + ngôi sao + blob + badge
   - dùng khi không cần người

---

## 5) Rhythm rules
Đây là rule rất quan trọng để tránh lặp hình bên phải suốt deck.

- Không dùng **full-height character scene** quá 2 slide liên tiếp.
- Sau 2 slide có nhân vật lớn, phải có 1 slide dùng micro illustration hoặc object cluster.
- Mỗi 5–6 slide phải có ít nhất 1 slide gần như typography-led.
- Scene có người lớn + trẻ em không nên lặp cùng một pose ở hai slide gần nhau.
- Nếu slide hiện tại đã có family scene, slide sau ưu tiên 1 nhân vật hoặc object-led.

---

## 6) Crop & anchor system

### Anchor options
- `right-center`
- `right-bottom`
- `right-top`
- `center-right-overscale`
- `left-bottom` (chỉ dùng hiếm)

### Crop rules
- Cover: overscale nhẹ, cho phép crop 8–15% ở cạnh phải/dưới.
- Principle slide: fit gọn hơn, giữ đầy đủ gesture chính.
- Closing: có thể mềm hơn, nhỏ hơn, nhiều thở hơn.
- Reference slide: gần như không cần hero scene, chỉ dùng micro hoặc không dùng.

### Safe crop
- Không crop qua mặt.
- Hạn chế crop qua bàn tay nếu đó là gesture chính.
- Có thể crop chân hoặc rìa quần áo nếu composition đẹp hơn.

---

## 7) Scale system
Cho asset bên phải trong canvas 1600x900:
- Hero scene: `1.08 – 1.22`
- Principle scene: `0.92 – 1.08`
- Micro illustration: `0.38 – 0.68`
- Object cluster: `0.45 – 0.75`

Rule:
- Không scale theo pixel cứng.
- Scale theo `layoutVariant` và `visual weight`.
- Asset có nhiều khoảng rỗng thì phải tăng scale bù.

---

## 8) Layering system
Mỗi minh họa có thể gồm 4 lớp:

1. `wash/blob-back`
2. `main-illustration`
3. `soft-shadow`
4. `light-grain-overlay` (optional)

### Wash/blob rules
- Dùng blob màu sky/green/peach/lavender rất mềm.
- Blur cao, opacity thấp.
- Không để blob sắc nét hơn nhân vật.

### Shadow rules
- Shadow mềm, to, mờ.
- Không dùng drop shadow cứng kiểu card UI.

---

## 9) Motion rules
### Preview/present mode
Cho phép:
- fade-in nhẹ
- float rất chậm (`translateY` 4–8px)
- parallax cực nhẹ theo cursor/scroll

### Export mode
- tắt toàn bộ motion
- tắt parallax
- khóa ảnh tại vị trí cuối cùng

---

## 10) File format policy
### Ưu tiên
1. `SVG` nếu asset sạch và nhất quán.
2. `WEBP` nền trong suốt cho scene lớn.
3. `PNG` nếu model xuất PNG transparent ổn định hơn.

### Không khuyến khích
- JPG nền trắng cứng
- ảnh có text nhúng sẵn
- nền đầy đủ phức tạp
- file quá nặng không tối ưu

---

## 11) Asset naming convention

### Hero
- `hero-parenting-cover-01.webp`
- `hero-future-skills-family-01.webp`

### Principle
- `principle-listening-01.webp`
- `principle-learning-together-01.webp`
- `principle-critical-thinking-01.webp`
- `principle-digital-wellbeing-01.webp`

### Micro
- `micro-open-question-01.svg`
- `micro-screen-balance-01.svg`
- `micro-storytelling-values-01.svg`

### Background washes
- `wash-sky-01.svg`
- `wash-peach-02.svg`
- `wash-lavender-01.svg`

---

## 12) Scene matrix theo nội dung deck

### Cover
- parent + child đứng/ngồi cạnh nhau
- cảm giác mở ra tương lai, không phải tech sci-fi

### Hook
- parent nhìn con hoặc con nhìn về phía trước
- scene đơn giản, headline là chính

### Problem
- có thể dùng object cluster hoặc 1 child overwhelmed rất nhẹ
- tránh drama mạnh

### Evidence
- ưu tiên calmer scene hoặc micro illustration
- không làm loãng credibility bằng minh họa quá ngọt

### 3 shifts / 3 pillars
- ưu tiên micro illustration / mini scenes / symbolic objects
- không cần hero nhân vật lớn

### Principle slides
- mỗi principle 1 scene hành động riêng

### Closing
- family warmth / storytelling / side-by-side walking / gentle hug

---

## 13) HTML integration contract
Mỗi asset phải đi kèm metadata:
- `src`
- `type`
- `anchor`
- `scale`
- `zIndex`
- `shadow`
- `wash`
- `motion`
- `focalPoint`

Ví dụ:
```json
{
  "src": "/assets/illustrations/principle-learning-together-01.webp",
  "type": "principle-scene",
  "anchor": "right-center",
  "scale": 1.06,
  "shadow": "soft-xl",
  "wash": "sky-peach-soft",
  "motion": "float-xs",
  "focalPoint": "center-left"
}
```

---

## 14) Negative rules
- Không nhồi minh họa lên mọi slide.
- Không để mỗi slide đều có cùng khung card/khung trắng lớn.
- Không lặp cùng asset ở khoảng cách gần.
- Không để minh họa có độ tương phản thấp đến mức “tan vào nền”.
- Không dùng minh họa corporate stock generic.

---

## 15) Definition of done
Hệ minh họa đạt chuẩn khi:
1. Nhìn toàn deck thấy có nhịp, không lặp máy móc.
2. Nhân vật và object cùng một family style.
3. Slide vừa đủ giàu cảm xúc nhưng vẫn sạch cho HTML capture.
4. Có thể thay nội dung mà không làm vỡ art direction.
5. Codex chỉ cần thay asset và metadata là dựng được page/show mới.
