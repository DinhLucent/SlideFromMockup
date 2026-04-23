# SHOW_ARCHITECTURE.md

## 1) Mục tiêu

Tài liệu này định nghĩa kiến trúc hoàn chỉnh để dựng một **presentation system dạng show chuyên nghiệp** dựa trên style tham chiếu:
- editorial watercolor
- cảm xúc, ấm áp, nhân văn
- tập trung vào family / education / growth / future skills
- bố cục sạch, thoáng, ít chữ, kể chuyện bằng hình + nhịp slide

Mục tiêu không chỉ là dựng **1 deck đẹp**, mà là tạo ra một **hệ thống deck có thể tái sử dụng**, để CODEX, FLASH, hoặc agent khác có thể:
- build deck mới nhanh
- thay nội dung mà không phá layout
- giữ consistency xuyên suốt 15–30 slide
- dễ export HTML → PDF → PNG → PPT handoff

---

## 2) Kết luận kiến trúc: chọn hướng nào?

### Khuyến nghị chính
**HTML-first, slide-second**

### Vì sao không nên build thẳng slide ngay từ đầu
Style tham chiếu có các đặc tính khó giữ ổn định nếu dựng thẳng trong PowerPoint/Google Slides:
- typography scale tinh
- khoảng trắng quan trọng
- illustration chiếm vai trò lớn
- text wrap dễ vỡ
- visual balance giữa text và hình cần consistency
- deck dài nhiều slide dễ lệch chất lượng giữa các trang

### Vì sao HTML-first phù hợp hơn
HTML-first cho phép xây dựng:
- design token rõ ràng
- component slide tái sử dụng
- auto layout ổn định hơn
- dễ review visual từng vòng
- dễ A/B test copy và ảnh
- có thể export ra nhiều format về sau

### Source of truth đề xuất
`content manifest + HTML component system`

Pipeline:

`content spec / manifest`  
→ `HTML slide render`  
→ `visual review`  
→ `export PDF/PNG`  
→ `optional PPT handoff`

---

## 3) Khi nào dùng HTML-first, khi nào slide-first

### Chọn HTML-first nếu
- deck sẽ còn tái sử dụng nhiều lần
- muốn tạo system cho agent
- cần consistency cao
- muốn scale thành nhiều chủ đề cùng một style
- cần output chuyên nghiệp, có thể maintain

### Chọn slide-first nếu
- deck rất ngắn
- chỉnh tay là chính
- không định tái sử dụng system
- deadline quá gấp và chấp nhận technical debt

### Kết luận cho case này
**Nên chọn HTML-first.**  
Slide chỉ nên là output cuối hoặc bản handoff.

---

## 4) Vai trò phù hợp của từng agent

### ChatGPT / reasoning agent
Phù hợp nhất cho:
- design system
- narrative architecture
- content rewrite
- slide archetype definition
- manifest schema
- QA checklist
- handoff spec cho dev agent

### CODEX / coding agent
Phù hợp nhất cho:
- code React / HTML slide engine
- component system
- theme token implementation
- export pipeline
- build tooling

### FLASH / fast model / execution-oriented model
Phù hợp nhất cho:
- scaffold nhanh project
- generate biến thể component
- chuyển spec thành code lần đầu
- xử lý batch content / asset wiring

### Visual/creative model khác
Phù hợp cho:
- prompt illustration
- art direction polishing
- sửa mood, crop, scene consistency

---

## 5) Design direction tổng thể

### Từ khóa style
- watercolor editorial
- warm, hopeful, humane
- child-centered storytelling
- soft premium presentation
- airy composition
- illustration-led communication
- high trust, low noise

### Cảm giác thương hiệu
Deck phải cho cảm giác:
- có giáo dục
- có tình người
- hiện đại nhưng không lạnh
- truyền cảm hứng nhưng không sến
- đủ khoa học nhưng không học thuật khô cứng

### Những thứ phải giữ
- nhiều khoảng trắng
- headline lớn, rõ, tin cậy
- illustration mềm, sáng, giàu cảm xúc
- mỗi slide chỉ 1 ý chính
- màu dịu, điểm nhấn vừa đủ

### Những thứ phải tránh
- nhồi chữ
- bullet quá dài
- quá nhiều icon lẻ tẻ
- nền quá nhiều chi tiết
- visual quá “AI tech” lạnh, cyber, neon
- thống kê trình bày kiểu corporate cứng

---

## 6) Mục tiêu của “show chuyên nghiệp”

Bản show chuyên nghiệp cần đạt 5 tầng chất lượng:

### 6.1 Narrative quality
Người xem cảm nhận được một hành trình:
- mở vấn đề
- lý do cần quan tâm
- bằng chứng
- framework hành động
- kết đọng lại

### 6.2 Visual consistency
Mọi slide nhìn như cùng một bộ, không phải ghép từ nhiều style khác nhau.

### 6.3 Presentation rhythm
Deck có nhịp: có slide mạnh, slide nghỉ, slide số liệu, slide cảm xúc, slide hành động.

### 6.4 Information hierarchy
Người xem phải hiểu ngay:
- câu chính là gì
- dữ liệu nào quan trọng nhất
- insight nào cần nhớ

### 6.5 Reusability
Có thể thay nội dung mới mà vẫn giữ form đẹp.

---

## 7) Cấu trúc nội dung đề xuất cho deck

Dưới đây là narrative arc hoàn chỉnh để rewrite bộ slide theo hướng “show” thay vì “nhiều tấm minh họa rời”.

# ACT 1 — OPENING / TENSION

## Slide 1 — Cover
**Vai trò:** mở show, định nghĩa chủ đề

- Tiêu đề lớn
- Subtitle ngắn
- 1 illustration hero
- cảm giác ấm áp + có tương lai

## Slide 2 — Hook
**Vai trò:** kéo sự chú ý

Thông điệp dạng câu lớn:
> Tương lai không đợi con lớn mới bắt đầu. Nó đang hình thành từ hôm nay.

- 1 câu lớn
- 1 đoạn diễn giải nhỏ
- 1 visual có cảm giác mở ra tương lai

## Slide 3 — Pain points
**Vai trò:** gọi đúng nỗi lo của phụ huynh

Ví dụ nhóm ý:
- con nghiện thiết bị
- giảm tập trung
- khó kiểm soát công nghệ
- lo con thiếu kỹ năng thật
- lo tương lai nghề nghiệp đổi quá nhanh

## Slide 4 — Why this matters now
**Vai trò:** chuyển từ cảm xúc sang bối cảnh thời đại

Thông điệp:
AI không chỉ là công nghệ mới. Nó đang thay đổi cách con học, làm việc, giao tiếp và trưởng thành.

---

# ACT 2 — EVIDENCE / CONTEXT

## Slide 5 — Research insight 1
**Vai trò:** tăng độ tin cậy

Ví dụ:
- tác động của thời gian màn hình khi thiếu định hướng
- ảnh hưởng đến giấc ngủ, ngôn ngữ, chú ý, giao tiếp

## Slide 6 — Research insight 2
**Vai trò:** đưa yếu tố bảo vệ

Ví dụ:
- tư duy phản biện
- gắn kết với cha mẹ
- EQ
- chất lượng tương tác gia đình

## Slide 7 — Market shift
**Vai trò:** đặt tương lai vào ngữ cảnh nghề nghiệp

Ví dụ:
- nhiều vai trò cũ biến mất
- nhiều vai trò mới xuất hiện
- kỹ năng cần thay đổi

## Slide 8 — Future skills
**Vai trò:** đóng gói “con cần gì trong tương lai”

Ví dụ:
- tư duy phân tích
- giải quyết vấn đề
- học cách học
- sáng tạo
- tự chủ
- thích nghi
- EQ

---

# ACT 3 — ACTION FRAMEWORK

## Slide 9 — Transition
**Vai trò:** chuyển từ bối cảnh sang giải pháp

Thông điệp:
Nếu tương lai đang đổi nhanh như vậy, cha mẹ nên đồng hành cùng con như thế nào?

## Slide 10 — Principle 1
Lắng nghe và thấu hiểu thế giới của con

## Slide 11 — Principle 2
Cùng con học hỏi công nghệ

## Slide 12 — Principle 3
Rèn tư duy phản biện và sáng tạo

## Slide 13 — Principle 4
Xây dựng digital wellbeing

## Slide 14 — Principle 5
Trao trách nhiệm và sự tự chủ

## Slide 15 — Principle 6
Phát triển EQ – nền tảng của hạnh phúc

## Slide 16 — Principle 7
Truyền cảm hứng và giá trị sống

---

# ACT 4 — CLOSING

## Slide 17 — Recap
**Vai trò:** chốt thesis

Thông điệp:
Không phải để con hơn người khác.  
Mà để con vững vàng, nhân bản và đủ năng lực cho tương lai.

## Slide 18 — Call to action
**Vai trò:** biến cảm hứng thành hành động nhỏ

Ví dụ:
- bắt đầu bằng 1 cuộc trò chuyện thật sự tối nay
- chọn 1 thói quen số mới trong tuần này
- cùng con học 1 điều công nghệ mới thay vì chỉ cấm đoán

## Slide 19 — Thank you / emotional close
**Vai trò:** kết mềm, đẹp, dễ nhớ

## Slide 20 — References / appendix
**Vai trò:** hỗ trợ độ tin cậy, không phá mạch chính

Khuyến nghị:
- để cuối
- hoặc footnote nhỏ trong slide evidence

---

## 8) Slide archetype system

Thay vì thiết kế từng slide riêng lẻ, cần gom thành một số archetype cố định.

### A. Hero Cover
**Dùng cho:** cover, recap, closing

**Bố cục:**
- text 40–55%
- visual 45–60%
- headline rất lớn
- subtitle ngắn
- 1 hero illustration

**Mục tiêu:**
- cảm xúc mạnh
- dễ nhớ
- có “poster quality”

### B. Hook Quote
**Dùng cho:** mở vấn đề, transition

**Bố cục:**
- 1 quote lớn
- 1 đoạn explanatory copy ngắn
- 1 visual symbolic hoặc narrative
- rất nhiều khoảng trắng

**Mục tiêu:**
- giữ nhịp sân khấu
- tạo pause và trọng lượng

### C. Problem / Insight Split
**Dùng cho:** pain points, why now

**Bố cục:**
- trái: 4–6 bullet ngắn
- phải: illustration hoặc icon cluster
- kicker nhỏ + title rõ

**Mục tiêu:**
- đọc nhanh
- dễ trình bày miệng

### D. Evidence / Research
**Dùng cho:** khoa học nói gì

**Bố cục:**
- headline
- key claim 1–2 dòng
- đoạn giải thích 30–60 từ
- citation block nhỏ
- visual hỗ trợ, không lấn át nội dung

**Mục tiêu:**
- credible
- clean
- rõ luận điểm

### E. Stat / Market
**Dùng cho:** 85 triệu / 97 triệu / top kỹ năng

**Bố cục:**
- số lớn là hero
- 2–3 data points tối đa
- icon/shape đơn giản
- background sạch hơn các slide cảm xúc

**Mục tiêu:**
- tăng authority
- không bị “tranh đẹp nhưng yếu dữ liệu”

### F. Principle / Tip
**Dùng cho:** 7 bí quyết

**Bố cục:**
- number badge
- title
- 2–4 dòng body
- illustration cùng style
- optional micro-action 1 câu

**Mục tiêu:**
- rõ framework
- dễ nhớ
- dễ lặp system qua nhiều slide

### G. Thank You / Emotional End
**Dùng cho:** thank you, closing image

**Bố cục:**
- chữ ít
- hình mạnh
- mood cao

**Mục tiêu:**
- kết mềm
- tạo dư âm

---

## 9) Rhythm map cho deck

Một deck show tốt không nên có 15 slide cùng form.  
Nên sắp nhịp như sau:

1. Hero
2. Hook
3. Problem split
4. Context split
5. Evidence
6. Evidence
7. Stat
8. Stat/list
9. Transition
10. Principle
11. Principle
12. Principle
13. Principle
14. Principle
15. Principle
16. Principle
17. Recap hero
18. CTA
19. Thank you
20. Appendix

### Quy tắc nhịp
- Không quá 2 slide giống nhau liên tiếp nếu không cần thiết
- Sau slide số liệu nên có slide cảm xúc hoặc action
- Sau 2 slide evidence nên có 1 slide visual shift
- 7 principle slide vẫn cùng system nhưng có thể đổi layout variant nhẹ để tránh mệt

---

## 10) Content hierarchy rules

### Quy tắc vàng
Mỗi slide chỉ có **1 ý chính**.

### Giới hạn nội dung khuyến nghị
- Kicker: 2–5 từ
- Title: tối đa 2 dòng
- Body: 25–60 từ
- Bullet count: 3–5 dòng
- Citation: 1–2 nguồn ngắn
- Quote: tối đa 20 từ nếu làm câu hero

### Những gì nên được ưu tiên nhìn thấy đầu tiên
1. headline hoặc stat
2. 1 insight chính
3. visual
4. supporting text
5. source/citation

### Không nên
- 2 insight ngang hàng trên cùng slide
- body quá dài hơn visual
- bullet câu dài như đoạn văn

---

## 11) Rewrite định hướng cho bộ nội dung hiện tại

### Những gì đã tốt trong bộ tham chiếu
- đúng mood ấm áp
- illustration nhất quán
- có emotional appeal
- nội dung gần gũi với phụ huynh
- số lượng slide vừa đủ cho 1 talk ngắn

### Những gì đang yếu nếu nâng lên “show chuyên nghiệp”
- nhiều slide quá giống nhau
- phần narrative chưa có đỉnh và nhịp rõ
- evidence và emotion đang trộn chưa đủ phân tầng
- references chưa được xử lý như một lớp thông tin phụ
- stat slide chưa đủ authority trong cách trình bày

### Cần rewrite theo nguyên tắc
- sắc hơn ở thesis
- ít hơn ở chữ thừa
- mạnh hơn ở nhịp chuyển
- rõ hơn ở hierarchy
- tách emotion / evidence / action rõ ràng

---

## 12) Layout system chi tiết

### Canvas ratio
Ưu tiên 16:9

Ví dụ:
- 1600 × 900
- 1920 × 1080

### Safe area
Giữ lề an toàn đồng nhất:
- top: 48–72 px
- left/right: 64–96 px
- bottom: 40–64 px

### Vertical zones
Một slide thường chia thành:
- badge / kicker zone
- title zone
- body zone
- citation/footer zone

### Horizontal patterns
Các pattern cơ bản:
- 50 / 50
- 45 / 55
- 60 / 40
- full-bleed visual with text overlay area

### Visual placement rules
- nhân vật không dính mép slide quá chặt
- tránh cắt đầu / tay / object quan trọng
- visual nên tạo hướng nhìn về text nếu có thể
- negative space phải được khai thác để “thở”

---

## 13) Typography system

### Typographic voice
- headline: tin cậy, rõ, có trọng lượng
- accent word: mềm, thủ công, có cảm xúc
- body: thân thiện, dễ đọc
- citation: nhỏ, kín, trung tính

### Recommended role split
- **Primary heading:** sans serif bold, uppercase hoặc title case có kiểm soát
- **Accent word:** script / handwritten style, chỉ dùng 1–3 từ
- **Body:** clean sans serif
- **Citation/footer:** nhỏ hơn 30–40%

### Scale đề xuất cho 1920×1080
- Kicker / badge label: 20–28
- Title main: 42–68
- Accent script: 46–78 tùy ngữ cảnh
- Body: 20–28
- Bullet: 20–26
- Stat number: 60–120
- Citation: 12–16

### Quy tắc typography
- không dùng quá 2 họ font chính + 1 accent script
- script chỉ dùng để nhấn cảm xúc, không dùng cho body dài
- line length nên ngắn vừa để đọc trên màn hình
- leading thoáng hơn slide corporate truyền thống

---

## 14) Color system

### Base palette
- nền kem sáng / trắng ấm
- navy đậm cho headline
- xanh trời nhạt / pastel sky
- vàng ấm nhẹ cho badge / điểm nhấn
- cam đào / hồng nhạt làm accent cảm xúc
- xám trung tính cho text phụ

### Vai trò màu
- headline: navy
- supportive text: slate / gray
- emphasis: warm accent
- badges: pastel circles
- data emphasis: navy + gold / warm tone

### Quy tắc màu
- không dùng saturation quá mạnh
- không dùng gradient công nghệ chói
- không dùng nhiều hơn 1–2 accent color trong cùng slide
- deck nên giữ brightness cao, contrast vừa đủ, cảm giác sạch

---

## 15) Illustration system

### Hướng hình ảnh
- watercolor / gouache-like soft illustration
- nhân vật ấm áp, biểu cảm nhẹ
- đường nét không quá sắc cạnh
- ánh sáng thiên tự nhiên
- trẻ em và phụ huynh nên thân thiện, nhân văn

### Chủ đề hình ảnh nên lặp lại
- gia đình đồng hành
- trẻ em suy nghĩ / học hỏi / khám phá
- công nghệ ở mức vừa phải, không áp đảo con người
- cảnh ngoài trời, bầu trời, cánh đồng, đường chân trời
- biểu tượng hành trình, lớn lên, phát triển

### Không nên
- robot / cyber / hologram dày đặc
- sci-fi lạnh lẽo
- quá nhiều UI screen trong illustration
- ảnh quá tả thực nếu toàn deck là tranh minh họa

### Asset policy
Mỗi slide chỉ nên có:
- 1 hero illustration
hoặc
- 1 illustration + 1 nhóm icon rất nhỏ

Không nên có quá nhiều đối tượng tranh chấp nhau.

---

## 16) Data visualization approach

Style này không hợp chart corporate phức tạp.  
Nếu cần data, hãy dùng **stat card / insight number / short comparison** thay vì chart nặng.

### Dạng nên dùng
- số lớn + nhãn nhỏ
- 2-column comparison
- top skills list
- signpost metaphor
- simple progress motif

### Dạng nên hạn chế
- bar chart phức tạp
- line chart dày đặc
- pie chart nhiều lát
- dashboard-like slide

### Nếu bắt buộc có biểu đồ
- cực tối giản
- nhiều khoảng trắng
- label rõ
- 1 insight duy nhất

---

## 17) Hệ thống metadata cho từng slide

Mỗi slide nên được mô tả bằng metadata rõ ràng để agent render ổn định.

### Schema lõi
```json
{
  "id": "s01_cover",
  "role": "cover",
  "act": "opening",
  "layout": "hero-cover-right-visual",
  "kicker": "7 bí quyết",
  "title": "AI giúp cha mẹ đồng hành hiệu quả cùng con trong thời đại AI",
  "accent_text": "AI",
  "body": "Subtitle hoặc đoạn giới thiệu ngắn.",
  "bullets": [],
  "quote": "",
  "stat": null,
  "citation": [],
  "image_asset": "assets/cover_family_path.png",
  "image_prompt": "warm watercolor family looking toward future skyline",
  "tone": "hopeful, warm, premium",
  "speaker_note": "Mở talk bằng câu chuyện tương lai bắt đầu từ hôm nay.",
  "variant": "A1"
}
```

### Trường bắt buộc
- `id`
- `role`
- `act`
- `layout`
- `title`
- `tone`

### Trường tùy chọn
- `kicker`
- `accent_text`
- `body`
- `bullets`
- `quote`
- `stat`
- `citation`
- `image_asset`
- `image_prompt`
- `speaker_note`
- `variant`

---

## 18) Slide role taxonomy

### Role list đề xuất
- `cover`
- `hook`
- `pain_points`
- `context`
- `evidence`
- `stat`
- `transition`
- `principle`
- `recap`
- `cta`
- `thanks`
- `appendix`

### Vì sao cần taxonomy
Agent sẽ quyết định:
- dùng component nào
- giới hạn text bao nhiêu
- visual prominence bao nhiêu
- có hiện citation không
- có hiện badge số không

---

## 19) Component map cho HTML build

### Components cốt lõi
- `DeckFrame`
- `SlideShell`
- `BadgeNumber`
- `Kicker`
- `HeroTitle`
- `AccentWord`
- `BodyText`
- `BulletList`
- `CitationBlock`
- `StatBlock`
- `IllustrationPanel`
- `FooterSignature`

### Slide components
- `SlideCover`
- `SlideHook`
- `SlideProblemSplit`
- `SlideEvidence`
- `SlideStat`
- `SlidePrinciple`
- `SlideRecap`
- `SlideCTA`
- `SlideThanks`
- `SlideAppendix`

### Quy tắc
Mỗi slide role ánh xạ rõ sang một component hoặc 1 family component, tránh viết layout ad-hoc cho từng slide.

---

## 20) Folder structure đề xuất cho project

```text
show-project/
  content/
    manifest.json
    deck.json
    slides/
      s01_cover.json
      s02_hook.json
      ...
  assets/
    illustrations/
    icons/
    textures/
  src/
    components/
      core/
      slides/
    theme/
      tokens.ts
      typography.ts
      spacing.ts
      colors.ts
      shadows.ts
    layouts/
    utils/
    app/
  export/
    render-pdf.ts
    render-png.ts
    ppt-handoff/
  docs/
    DESIGN.md
    SKILL.md
    slide_system.md
    SHOW_ARCHITECTURE.md
```

---

## 21) Theme token gợi ý

```ts
export const tokens = {
  radius: {
    sm: 8,
    md: 14,
    lg: 22
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 20,
    lg: 32,
    xl: 48,
    xxl: 72
  },
  colors: {
    bg: "#FBF8F2",
    surface: "#FFFDF9",
    navy: "#233B73",
    text: "#42526B",
    gold: "#F1B93A",
    peach: "#F3B5A0",
    sky: "#DCEEFF",
    sage: "#C9D9BF"
  },
  typography: {
    title: "PrimaryHeading",
    body: "BodySans",
    accent: "AccentScript"
  }
}
```

Ghi chú: token thực tế có thể tinh chỉnh khi test visual.

---

## 22) Quy tắc layout cho từng role

### Cover
- visual hero chiếm 45–60%
- title tối đa 4 dòng
- accent word có thể nằm chồng nhẹ
- footer cực nhẹ

### Hook
- quote chiếm ưu tiên 1
- body rất ngắn
- illustration không được cạnh tranh với câu hook

### Pain points
- 4–5 bullet ngắn
- mỗi bullet tối đa 6–10 từ nếu có thể
- visual cluster có thể dùng thought bubble / symbolic device

### Evidence
- title cụ thể, không quá generic
- có 1 claim chính
- body chỉ hỗ trợ claim
- citation luôn có hệ phân cấp thấp hơn

### Stat
- số lớn phải là thứ nhìn đầu tiên
- tối đa 3 items thông tin
- nếu có icon/metaphor phải hỗ trợ số, không lấn át

### Principle
- số thứ tự rõ
- title mang tính hành động
- body nói “cha mẹ nên làm gì” chứ không chỉ mô tả lý thuyết
- có thể thêm micro-action box nhỏ

### Thanks
- text cực ngắn
- hình tạo cảm giác dư âm

---

## 23) Slide-by-slide blueprint mẫu

## S01 Cover
- role: cover
- archetype: hero cover
- objective: establish theme
- visual: gia đình nhìn về phía chân trời / tương lai
- copy mode: title + subtitle

## S02 Hook
- role: hook
- archetype: quote
- objective: create urgency + emotion
- visual: đứa trẻ vươn tay lên bầu trời / ánh sáng / chim bay
- copy mode: quote-led

## S03 Pain points
- role: pain_points
- archetype: problem split
- objective: name parents' anxiety
- visual: parent embracing child + floating concern icons
- copy mode: bullet-led

## S04 Why now
- role: context
- archetype: research/context split
- objective: explain AI era shift simply
- visual: child using device with calm scene, not alarming cyber look
- copy mode: short insight

## S05 Evidence 1
- role: evidence
- archetype: evidence
- objective: time screen impact
- visual: child thinking / overstimulated but gentle
- copy mode: claim + citation

## S06 Evidence 2
- role: evidence
- archetype: evidence
- objective: attachment/family as protective factor
- visual: warm family connection
- copy mode: claim + citation

## S07 Market shift
- role: stat
- archetype: stat
- objective: labor market change
- visual: signpost / future road
- copy mode: number-led

## S08 Future skills
- role: stat
- archetype: stat/list
- objective: top future skills
- visual: child climbing steps / growth metaphor
- copy mode: list-led

## S09 Transition
- role: transition
- archetype: hook quote
- objective: move into action framework
- visual: family walking together / turning point
- copy mode: thesis statement

## S10–S16 Principles
- role: principle
- archetype: principle
- objective: explain 7 principles
- visual: 1 soft illustration per slide
- copy mode: action principle + short explanation

## S17 Recap
- role: recap
- archetype: hero cover
- objective: restate core message
- visual: family walking into light
- copy mode: thesis-led

## S18 CTA
- role: cta
- archetype: insight / short action
- objective: convert inspiration into action
- visual: minimal or soft family action scene
- copy mode: 3 small actions

## S19 Thanks
- role: thanks
- archetype: emotional end
- objective: soft close
- visual: flowers / path / family / kite / sunset
- copy mode: very short

## S20 Appendix
- role: appendix
- archetype: reference sheet
- objective: references
- visual: minimal decoration only
- copy mode: bibliography

---

## 24) Speaker-flow logic

Deck không chỉ để nhìn mà còn để nói.  
Vì vậy mỗi slide nên hỗ trợ lời nói của speaker, không thay speaker.

### Quy tắc
- slide chỉ giữ ý mũi nhọn
- phần giải thích sâu thuộc speaker note
- những câu quá dài nên để trong note, không để lên slide

### Speaker note structure đề xuất
- mục đích slide
- câu mở miệng gợi ý
- điểm nhấn cần nhấn giọng
- cầu nối sang slide kế tiếp

---

## 25) Asset strategy

### Có 2 hướng asset

#### Hướng A — Asset-first
Chuẩn bị sẵn illustration đúng style, rồi gắn vào layout.

**Ưu điểm:** đẹp, ổn định  
**Nhược điểm:** tốn thời gian chuẩn bị asset

#### Hướng B — Prompt-first
Định nghĩa prompt system, agent generate asset theo từng slot.

**Ưu điểm:** scale nhanh  
**Nhược điểm:** rủi ro inconsistency giữa ảnh

### Khuyến nghị thực dụng
Dùng hybrid:
- slide quan trọng: asset curated
- slide phụ: prompt-generated theo template chặt

---

## 26) Prompt system cho illustration

Mỗi prompt cần cố định các lớp sau:
- medium: watercolor editorial illustration
- tone: warm, soft, hopeful, premium
- subject: parent-child / child learning / future path / reflection
- composition: clean, airy, negative space for slide text
- palette: pastel sky, warm cream, navy-compatible tones
- avoid: cyberpunk, photorealistic, neon, clutter, hard outlines

### Prompt skeleton
```text
Warm editorial watercolor illustration, soft premium children-and-family storytelling style, airy composition with generous negative space for presentation text, gentle sunlight, pastel sky, emotionally warm but clean, modern educational theme, no neon, no cyberpunk, no dense background, no UI clutter.
```

### Per-slide prompt layer
Bổ sung theo từng slide:
- family looking toward horizon
- child using laptop with parent support
- child thinking with symbolic question marks
- parent embracing child with floating worries
- child climbing steps toward a star

---

## 27) HTML build architecture khuyến nghị

### Stack đề xuất
- React hoặc Next.js static export
- CSS modules hoặc Tailwind nếu team quen
- JSON manifest-driven rendering
- Playwright hoặc Puppeteer để export PDF/PNG

### Tại sao phù hợp
- component hóa tốt
- dễ render hàng loạt
- dễ review visual
- dễ maintain long-term

### Điều cần tránh
- viết từng slide hardcode riêng
- styling inline quá nhiều
- không có token system
- không có manifest validation

---

## 28) PPT handoff strategy

Nếu sau này cần PowerPoint:

### Cách 1 — Export as images per slide
- HTML render ra PNG
- đưa vào PPT làm full-slide images
- phù hợp khi chỉ cần trình chiếu ổn định

### Cách 2 — Export text + image mapping
- title/body/image positions xuất ra spec
- tool khác dựng lại thành editable PPT
- phù hợp khi cần người khác sửa sau này

### Khuyến nghị
- với show ưu tiên visual consistency: **image-based handoff** an toàn hơn
- với show cần team sales sửa text thường xuyên: cần **editable PPT mapping**

---

## 29) Development phases

### Phase 1 — Architecture
- chốt narrative arc
- chốt archetypes
- chốt token system
- chốt schema

### Phase 2 — Prototype
- dựng 4–5 slide representative
- test typography, spacing, illustration balance
- review trên màn hình thật

### Phase 3 — Full deck system
- build toàn bộ roles
- link manifest
- render toàn deck

### Phase 4 — QA and polish
- fix wrap text
- fix safe area
- fix citation consistency
- tune export quality

### Phase 5 — Reusability
- thêm template deck khác cùng system
- tạo prompt pack
- tạo authoring guide cho agent

---

## 30) QA checklist

### Narrative QA
- deck có mở → lý do → bằng chứng → hành động → kết không?
- mỗi slide có 1 ý chính rõ không?
- chuyển slide có tự nhiên không?

### Copy QA
- title có quá dài không?
- body có thể rút ngắn hơn nữa không?
- bullet có song song cấu trúc không?
- slide có đang “viết thay speaker” quá nhiều không?

### Visual QA
- có đủ khoảng trắng không?
- hình và chữ có tranh nhau không?
- hero slide có đủ lực không?
- evidence slide có đủ sạch và credible không?

### System QA
- role nào cũng có component mapping chưa?
- token dùng có nhất quán chưa?
- export PDF/PNG có vỡ layout không?
- ảnh có lệch tone giữa các slide không?

### Delivery QA
- đọc rõ ở projector không?
- title và stat có nhìn ra từ xa không?
- citation đủ kín đáo nhưng vẫn hiện diện không?

---

## 31) Những lỗi phổ biến cần tránh

1. **Quá nhiều slide cùng form**  
   Deck sẽ đều đều, thiếu nhịp.

2. **Để visual quá đẹp nhưng nội dung yếu**  
   Người xem nhớ tranh nhưng không nhớ thông điệp.

3. **Slide research mà quá thơ mộng**  
   Làm mất authority.

4. **Dùng illustration chiếm hết trọng tâm trong stat slide**  
   Số liệu bị chìm.

5. **Cố nhồi toàn bộ nội dung lên slide**  
   Làm mất chất “show”.

6. **Thiếu safe area**  
   Dễ hỏng khi xuất hoặc chiếu.

7. **Không có schema nội dung**  
   Agent khó scale, deck sau dễ lệch form.

---

## 32) Khuyến nghị rewrite ngôn ngữ trình bày

### Tone of voice
- ấm
- rõ
- trưởng thành
- nhân văn
- truyền cảm hứng có kiểm soát

### Tránh
- hô hào quá đà
- quá nhiều khẩu hiệu
- từ ngữ công nghệ sáo rỗng
- nặng học thuật

### Hướng câu chữ nên có
- ngắn
- gãy nhịp hợp lý
- dễ nói thành lời
- dùng ít nhưng đúng

Ví dụ tốt:
- Tương lai không đợi con lớn mới bắt đầu.
- Công nghệ không cần bị sợ hãi. Nó cần được đồng hành.
- Điều con cần không chỉ là kỹ năng số, mà còn là bản lĩnh sống.

---

## 33) Handoff instructions cho CODEX / FLASH

## Mục tiêu implementation
Build một **manifest-driven HTML presentation engine** cho deck phong cách watercolor editorial.

## Ưu tiên kỹ thuật
1. consistency
2. readability
3. reusable components
4. easy content swap
5. export reliability

## Yêu cầu bắt buộc
- 16:9 responsive slide canvas
- tokenized spacing / colors / typography
- role-based slide rendering
- clean separation between content and presentation
- stable export to PDF/PNG

## Không làm
- không hardcode từng slide như sản phẩm riêng lẻ
- không dùng magic number tràn lan không giải thích
- không để copy nằm trực tiếp trong component
- không để mỗi slide một CSS style khác hẳn

## Definition of done
- render đủ toàn bộ deck từ manifest
- 5–7 archetype hoạt động ổn định
- typography không vỡ ở nội dung chuẩn
- asset slot rõ ràng
- xuất PDF/PNG usable

---

## 34) Minimal implementation blueprint

### Bước tối thiểu để bắt đầu
1. Tạo token system
2. Tạo `SlideShell`
3. Tạo 5 component chính: cover, hook, evidence, stat, principle
4. Tạo 1 `deck.json`
5. Render 8 slide representative
6. Tune typography + spacing
7. Mở rộng đủ deck

### 8 slide nên prototype đầu tiên
- cover
- hook
- pain points
- evidence
- stat number
- principle
- recap
- thanks

Nếu 8 slide này ổn, phần còn lại sẽ dựng nhanh.

---

## 35) Đề xuất nâng cấp dài hạn

Sau khi hoàn thành phiên bản đầu, có thể phát triển thêm:

### 35.1 Prompt pack
Bộ prompt chuẩn cho từng archetype và từng loại illustration.

### 35.2 Deck authoring guide
Cách viết nội dung mới mà không phá form.

### 35.3 Theme variants
Cùng structure nhưng đổi mood:
- warm family
- healthcare empathy
- education future skills
- nonprofit storytelling

### 35.4 Editable CMS-lite
Cho phép thay deck content bằng JSON/UI nhỏ.

---

## 36) Chốt hướng thực thi

### Kiến trúc khuyên dùng
**HTML-first presentation system**

### Hình thức output
- primary: HTML render
- review: PNG/PDF
- optional handoff: PPT

### Lý do chọn hướng này
- bền
- dễ scale
- hợp với style minh họa + storytelling
- phù hợp để AI agents tái sử dụng lâu dài

### Đánh giá cuối
Nếu mục tiêu là **làm một bộ show chuyên nghiệp, tái sử dụng được, và để CODEX/FLASH build tốt**, thì tài liệu này nên được dùng làm:
- system brief
- implementation spec
- content architecture reference
- QA baseline

---

## 37) One-page executive summary

**Build HTML before building slides.**  
Hãy coi deck này như một **product system**, không chỉ là một file trình chiếu.

Cần chuẩn hóa 4 lớp:
1. narrative architecture
2. slide archetypes
3. design tokens
4. manifest-driven rendering

Khi 4 lớp này rõ ràng, CODEX/FLASH sẽ build nhanh hơn, ít lệch hơn, và deck tương lai cũng giữ được chất lượng.
