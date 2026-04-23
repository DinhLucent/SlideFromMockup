const deck = {
  meta: {
    title: "7 bí quyết cha mẹ đồng hành cùng con trong thời đại AI",
    subtitle: "Deck mẫu manifest-driven để khóa nhịp show, typography và export pipeline HTML-first.",
    audience: "Phụ huynh, nhà giáo dục, cộng đồng học tập",
    objective:
      "Biến kiến trúc deck trong SHOW_ARCHITECTURE.md thành một hệ thống trình chiếu HTML có thể tái sử dụng, export ổn định và bám mood mockup.",
    theme: "watercolor-editorial"
  },
  slides: [
    {
      slideNumber: 1,
      id: "s01_cover",
      assetManifestId: "cover-01",
      type: "CoverSlide",
      role: "cover",
      act: "opening",
      eyebrow: "7 bí quyết",
      title: "AI giúp cha mẹ đồng hành hiệu quả cùng con trong thời AI",
      accentWords: ["AI"],
      subheadline:
        "Một hệ thống trình bày ấm áp, rõ ràng và có thể tái sử dụng cho chủ đề gia đình, giáo dục và tương lai kỹ năng.",
      body: "HTML là nguồn gốc duy nhất. Mọi layer khác chỉ bổ sung cho show, không thay thế cấu trúc gốc.",
      coreMessage: "Tương lai bắt đầu từ cách cha mẹ đồng hành với con ngay hôm nay.",
      tone: "hopeful, warm, premium",
      emotion: "hopeful",
      textDensity: "hero",
      theme: "playful-watercolor",
      layoutVariant: "cover-hero-right",
      motion: "soft-float",
      illustration: {
        anchor: "right-center",
        scale: 1.08,
        type: "hero-scene",
        zIndex: 3,
        shadow: "soft-xl",
        wash: "sky-peach-soft",
        motion: "float-xs",
        focalPoint: "center-left",
        cropSafe: true,
        alt: "Gia đình cùng nhìn về đường chân trời sáng với khinh khí cầu và thành phố tương lai."
      },
      illustrationSubject:
        "Gia đình ngồi cùng nhau nhìn về đường chân trời sáng, khinh khí cầu và thành phố tương lai.",
      imagePrompt:
        "Warm watercolor editorial illustration of a family looking toward a bright future skyline with balloons, soft sky and clear negative space for title.",
      speakerNote:
        "Mở show bằng cảm giác ấm áp và có tương lai; slide này phải có poster quality."
    },
    {
      slideNumber: 2,
      id: "s02_hook",
      assetManifestId: "hook-01",
      type: "HookSlide",
      role: "hook",
      act: "opening",
      eyebrow: "Hook",
      title: "Tương lai không đợi con lớn.",
      accentWords: ["ngày hôm nay"],
      quote: "Nó đang hình thành ngay hôm nay.",
      body:
        "AI không chỉ thay đổi thiết bị con dùng. Nó đang thay đổi cách con học, cách con nghĩ, cách con sống và cách con lớn lên.",
      coreMessage: "Tương lai của con được hình thành từ những lựa chọn rất nhỏ ở hiện tại.",
      tone: "gentle, alert, humane",
      emotion: "reflective",
      textDensity: "low",
      theme: "sky-wash",
      layoutVariant: "hook-quote-left",
      motion: "soft-rise",
      illustration: {
        anchor: "right-center",
        scale: 1.06,
        type: "hero-scene",
        zIndex: 3,
        shadow: "soft-lg",
        wash: "sky-soft",
        motion: "fade-float-xs",
        focalPoint: "center",
        cropSafe: true,
        alt: "Một em bé bước về phía bầu trời rộng với chim và ánh sáng."
      },
      illustrationSubject:
        "Một em bé bước trên con đường sáng với bầu trời mở rộng, chim bay và cảm giác đi vào tương lai.",
      imagePrompt:
        "Watercolor child walking toward a bright future path, airy sky, birds, gentle sunlight, poetic negative space for hook copy.",
      speakerNote: "Đây là slide tạo pause và trọng lượng, không giải thích quá nhiều."
    },
    {
      slideNumber: 3,
      id: "s03_pain_points",
      assetManifestId: "problem-01",
      type: "ProblemEvidenceSlide",
      role: "pain_points",
      act: "opening",
      eyebrow: "Nỗi đau của cha mẹ thời AI",
      title: "Điều khiến nhiều cha mẹ thấy bối rối nhất lúc này",
      body:
        "Không phải vì cha mẹ thiếu quan tâm. Thường là vì công nghệ đổi nhanh hơn những khuôn mẫu cũ.",
      bullets: [
        "Con nghiện thiết bị, khó tập trung.",
        "Kết quả học tập giảm sút.",
        "Không biết con đang học gì trên mạng.",
        "Con lười tư duy, ỷ lại vào AI.",
        "Cha mẹ tụt hậu công nghệ, khó kết nối với con."
      ],
      coreMessage: "Nỗi lo của phụ huynh là có thật và cần được gọi tên rõ ràng.",
      tone: "empathetic, grounded",
      emotion: "concerned",
      textDensity: "medium",
      theme: "warm-paper",
      layoutVariant: "problem-split-right-image",
      motion: "soft-float",
      illustration: {
        anchor: "right-center",
        scale: 0.62,
        type: "object-cluster",
        zIndex: 2,
        shadow: "soft-md",
        wash: "lavender-sky-soft",
        motion: "none",
        focalPoint: "center",
        cropSafe: true,
        alt: "Người mẹ ôm con với những biểu tượng lo âu công nghệ xung quanh."
      },
      illustrationSubject:
        "Mẹ ôm con với những biểu tượng lo âu công nghệ xung quanh, nhưng ánh sáng vẫn ấm và giàu cảm thông.",
      imagePrompt:
        "Warm watercolor mother hugging child with soft symbolic technology icons around, emotional, empathetic, not alarming.",
      speakerNote: "Gọi đúng nỗi lo để tạo đồng cảm trước khi chuyển sang phần lý giải."
    },
    {
      slideNumber: 4,
      id: "s04_context_hook",
      type: "HookSlide",
      role: "context",
      act: "opening",
      eyebrow: "Vì sao là bây giờ",
      title: "AI đang đổi cách con học, chơi và trưởng thành",
      body:
        "Đây không chỉ là một công cụ mới. Nó đang len vào lớp học, thiết bị, thói quen và cả cách con nhìn về giá trị của mình.",
      coreMessage: "AI đang thay đổi môi trường lớn lên của trẻ chứ không chỉ thêm một ứng dụng mới.",
      tone: "clear, contemporary",
      emotion: "aware",
      textDensity: "low",
      theme: "sky-wash",
      layoutVariant: "hook-breathing-right",
      motion: "gentle-pan",
      illustration: {
        anchor: "right-center",
        scale: 1.02,
        type: "hero-scene",
        zIndex: 3,
        shadow: "soft-md",
        wash: "sky-soft",
        motion: "fade-float-xs",
        focalPoint: "center",
        cropSafe: true,
        alt: "Đứa trẻ nhìn lên bầu trời watercolor với khoảng mở lớn."
      },
      illustrationSubject:
        "Đứa trẻ nhìn lên bầu trời rộng với cảm giác thế giới đang mở ra và thay đổi quanh mình.",
      imagePrompt:
        "Watercolor child looking into a wide changing sky, soft premium editorial tone, human-first, open composition.",
      speakerNote: "Đây là breathing slide để tránh deck bị dày từ quá sớm."
    },
    {
      slideNumber: 5,
      id: "s05_evidence_screen_time",
      assetManifestId: "evidence-01",
      type: "ProblemEvidenceSlide",
      role: "evidence",
      act: "evidence",
      eyebrow: "Khoa học nói gì?",
      title: "Tác động của thời gian màn hình",
      body:
        "Màn hình không xấu theo cách tuyệt đối. Vấn đề nằm ở chất lượng nội dung, thời lượng, nhịp sinh hoạt và việc người lớn có đồng hành hay không.",
      callout: "Thiếu định hướng mới là phần dễ gây hại.",
      citation: [
        {
          source: "American Academy of Pediatrics",
          note: "Family media guidance nhấn mạnh vai trò của cha mẹ trong việc đồng hành và thiết lập thói quen lành mạnh."
        }
      ],
      coreMessage: "Tác động của màn hình phụ thuộc mạnh vào cách con sử dụng và cách cha mẹ đồng hành.",
      tone: "credible, calm",
      emotion: "grounded",
      textDensity: "medium",
      theme: "warm-paper",
      layoutVariant: "evidence-right-figure",
      motion: "soft-float",
      illustration: {
        anchor: "right-bottom",
        scale: 0.48,
        type: "micro-illustration",
        zIndex: 2,
        shadow: "soft-sm",
        wash: "green-sky-soft",
        motion: "none",
        focalPoint: "center",
        cropSafe: true,
        alt: "Một em bé ngồi với thiết bị trong không gian watercolor dịu."
      },
      illustrationSubject:
        "Một em bé ngồi với thiết bị trong không gian watercolor dịu, gợi đúng vấn đề nhưng không phán xét.",
      imagePrompt:
        "Warm watercolor child with device, soft educational tone, calm composition, generous clean space for research copy.",
      speakerNote: "Giảm cực đoan: vấn đề là định hướng, không phải chỉ cấm đoán."
    },
    {
      slideNumber: 6,
      id: "s06_evidence_connection",
      type: "ProblemEvidenceSlide",
      role: "evidence",
      act: "evidence",
      eyebrow: "Khoa học nói gì?",
      title: "Gắn kết gia đình là “lá chắn”",
      accentWords: ["lá chắn"],
      body:
        "Khi trẻ được lắng nghe, trò chuyện thường xuyên và có một mối quan hệ an toàn, các kỹ năng như tự điều chỉnh, tư duy phản biện và khả năng phục hồi sẽ bền vững hơn.",
      callout: "Điều bảo vệ con mạnh nhất vẫn là kết nối với cha mẹ.",
      citation: [
        {
          source: "Center on the Developing Child at Harvard",
          note: "Responsive relationships are foundational for self-regulation and resilience."
        }
      ],
      coreMessage: "Sự gắn kết trong gia đình là nền tảng để trẻ dùng công nghệ một cách khỏe mạnh.",
      tone: "reassuring, scientific",
      emotion: "reassured",
      textDensity: "medium",
      theme: "golden-hour",
      layoutVariant: "evidence-left-figure",
      motion: "soft-float",
      illustration: {
        anchor: "right-center",
        scale: 1.02,
        type: "principle-scene",
        zIndex: 3,
        shadow: "soft-lg",
        wash: "peach-yellow-soft",
        motion: "float-xs",
        focalPoint: "center-left",
        cropSafe: true,
        alt: "Gia đình ôm nhau trong ánh sáng ấm."
      },
      illustrationSubject:
        "Gia đình quây quần và ôm nhau trong ánh sáng ấm, tạo cảm giác an toàn và tin cậy.",
      imagePrompt:
        "Warm watercolor family portrait with affectionate smiles, editorial restraint, golden-hour palette, credible and hopeful.",
      speakerNote: "Tạo niềm tin: cha mẹ không cần giỏi hơn công nghệ, chỉ cần hiện diện đúng cách."
    },
    {
      slideNumber: 7,
      id: "s07_market_shift",
      assetManifestId: "framework-01",
      type: "FrameworkSlide",
      role: "stat",
      act: "evidence",
      eyebrow: "Thị trường lao động nói gì?",
      title: "Những thay đổi lớn đã ở ngay trước mắt",
      body: "Deck không cần chart nặng. Chỉ cần vài signpost rõ để người nghe thấy áp lực chuyển dịch là thật.",
      statItems: [
        {
          value: "85",
          label: "triệu",
          detail: "việc làm có thể biến mất nếu dựa hoàn toàn vào kỹ năng cũ."
        },
        {
          value: "→",
          label: "Thay đổi hôm nay",
          detail: "Dẫn đường cho tương lai."
        },
        {
          value: "97",
          label: "triệu",
          detail: "việc làm mới sẽ xuất hiện nếu biết thích nghi."
        }
      ],
      coreMessage: "Bối cảnh tương lai đang thay đổi đồng thời trên nhiều mặt trận.",
      tone: "authoritative, airy",
      emotion: "awake",
      textDensity: "low",
      theme: "sky-wash",
      layoutVariant: "framework-stats-signpost",
      motion: "gentle-pan",
      illustration: {
        anchor: "right-top",
        scale: 0.44,
        type: "object-cluster",
        zIndex: 1,
        shadow: "soft-sm",
        wash: "none",
        motion: "none",
        focalPoint: "center",
        cropSafe: true,
        alt: "Biển chỉ đường mềm trên nền núi và trời watercolor."
      },
      illustrationSubject:
        "Biển chỉ đường mềm trên nền núi và trời watercolor, biểu tượng cho chuyển dịch nghề nghiệp.",
      imagePrompt:
        "Watercolor signpost in a hopeful mountain landscape, soft editorial, symbolic for future of work.",
      speakerNote: "Slide này phải khác nhịp rõ với evidence để tăng authority."
    },
    {
      slideNumber: 8,
      id: "s08_future_skills",
      type: "FrameworkSlide",
      role: "stat",
      act: "evidence",
      eyebrow: "Thị trường lao động nói gì?",
      title: "Top kỹ năng quan trọng đến 2027",
      body: "Điều cha mẹ cần giữ không phải là một công cụ, mà là hệ kỹ năng nền để con thích nghi lâu dài.",
      bullets: [
        "Tư duy phân tích",
        "Tư duy sáng tạo",
        "Giải quyết vấn đề phức tạp",
        "Kỹ năng công nghệ",
        "Trí tuệ cảm xúc",
        "Khả năng học hỏi suốt đời"
      ],
      coreMessage: "Năng lực tương lai không tách rời tính người và khả năng tự học.",
      tone: "hopeful, practical",
      emotion: "empowered",
      textDensity: "low",
      theme: "warm-paper",
      layoutVariant: "framework-skills-stair",
      motion: "soft-float",
      illustration: {
        asset: "micro-future-skills-custom-01",
        anchor: "right-bottom",
        scale: 1.04,
        type: "object-cluster",
        zIndex: 1,
        shadow: "soft-sm",
        wash: "sky-green-soft",
        motion: "none",
        focalPoint: "center",
        cropSafe: true,
        alt: "Một đứa trẻ bước lên những bậc thang hướng tới ngôi sao."
      },
      illustrationSubject:
        "Một đứa trẻ bước lên những bậc thang hướng tới ngôi sao, tượng trưng cho kỹ năng tương lai.",
      imagePrompt:
        "Warm watercolor child climbing gentle stairs toward a bright star, educational editorial tone, soft background.",
      speakerNote: "Đây là framework slide, không phải bullet corporate."
    },
    {
      slideNumber: 9,
      id: "s09_transition",
      type: "HookSlide",
      role: "transition",
      act: "action",
      eyebrow: "7 bí quyết",
      title: "Đồng hành cùng con trong thời AI",
      accentWords: ["AI"],
      body:
        "Không phải để con hơn người khác, mà để con đủ nhân bản và đủ năng lực để bước tiếp trong tương lai.",
      coreMessage: "Giải pháp nằm ở cách đồng hành có chủ đích, không phải kiểm soát cực đoan.",
      tone: "calm, inviting",
      emotion: "curious",
      textDensity: "low",
      theme: "golden-hour",
      layoutVariant: "hook-family-walk",
      motion: "gentle-pan",
      illustration: {
        asset: "scene-transition-family-walk-01",
        anchor: "right-center",
        scale: 1.06,
        type: "hero-scene",
        zIndex: 3,
        shadow: "soft-lg",
        wash: "sky-peach-soft",
        motion: "fade-float-xs",
        focalPoint: "center",
        cropSafe: true,
        alt: "Gia đình đi bộ cùng nhau giữa cánh đồng ấm áp."
      },
      illustrationSubject:
        "Gia đình đi bộ cùng nhau trên con đường rộng, chuyển nhịp từ bối cảnh sang hành động.",
      imagePrompt:
        "Wide watercolor family walking together on a bright path, hopeful and spacious, suitable for section transition.",
      speakerNote: "Đây là tấm chuyển act, phải nhẹ chữ và mở ra cụm principle."
    },
    {
      slideNumber: 10,
      id: "s10_principle_listen",
      assetManifestId: "principle-01",
      type: "FrameworkSlide",
      role: "principle",
      act: "action",
      eyebrow: "Nguyên tắc 1",
      title: "Lắng nghe và thấu hiểu thế giới của con",
      accentWords: ["thấu hiểu"],
      body:
        "Dành thời gian thật chất lượng mỗi ngày để lắng nghe, không phán xét. Hiểu con là bước đầu tiên để dẫn dắt con.",
      callout: "Tối nay hãy bắt đầu bằng một câu hỏi mở, không phán xét.",
      badgeNumber: "01",
      coreMessage: "Hiểu con là bước đầu tiên để đồng hành đúng cách.",
      tone: "nurturing, practical",
      emotion: "nurturing",
      textDensity: "low",
      theme: "playful-watercolor",
      layoutVariant: "framework-principle-left",
      motion: "soft-float",
      illustration: {
        anchor: "right-center",
        scale: 1.05,
        type: "principle-scene",
        zIndex: 3,
        shadow: "soft-lg",
        wash: "sky-peach-soft",
        motion: "float-xs",
        focalPoint: "center-left",
        cropSafe: true,
        alt: "Cha mẹ ngồi ngang tầm mắt với con trong không gian ấm áp."
      },
      illustrationSubject:
        "Cha mẹ ngồi ngang tầm mắt với con trong không gian ấm áp và nhiều sự lắng nghe.",
      imagePrompt:
        "Warm watercolor parent and child sitting eye-to-eye in gentle conversation, editorial, airy, supportive.",
      speakerNote: "Principle slides phải nhất quán nhưng không được lặp y nguyên nhịp."
    },
    {
      slideNumber: 11,
      id: "s11_principle_learn_together",
      assetManifestId: "principle-02",
      type: "FrameworkSlide",
      role: "principle",
      act: "action",
      eyebrow: "Nguyên tắc 2",
      title: "Cùng con học hỏi công nghệ",
      body:
        "Cha mẹ không cần biết tất cả, nhưng hãy học cùng con. Sự đồng hành quan trọng hơn việc kiểm soát.",
      callout: "Chọn một ứng dụng học tập hoặc sáng tạo để cùng thử trong tuần này.",
      badgeNumber: "02",
      coreMessage: "Sự đồng hành chủ động hiệu quả hơn sự cấm đoán một chiều.",
      tone: "optimistic, practical",
      emotion: "encouraged",
      textDensity: "low",
      theme: "sky-wash",
      layoutVariant: "framework-principle-right",
      motion: "soft-rise",
      illustration: {
        anchor: "right-center",
        scale: 1.03,
        type: "principle-scene",
        zIndex: 3,
        shadow: "soft-lg",
        wash: "sky-green-soft",
        motion: "float-xs",
        focalPoint: "center-left",
        cropSafe: true,
        alt: "Cha mẹ và con cùng học trước màn hình và sách."
      },
      illustrationSubject:
        "Cha mẹ và con cùng học trước màn hình và sách, giữ công nghệ ở vai trò công cụ hỗ trợ.",
      imagePrompt:
        "Warm watercolor parent and child learning a technology tool together, soft premium educational tone.",
      speakerNote: "Đổi phía badge và nhịp khối để cụm principle không đều quá."
    },
    {
      slideNumber: 12,
      id: "s12_principle_critical_thinking",
      assetManifestId: "principle-03",
      type: "FrameworkSlide",
      role: "principle",
      act: "action",
      eyebrow: "Nguyên tắc 3",
      title: "Rèn tư duy phản biện và sáng tạo",
      body:
        "Đặt câu hỏi mở, khuyến khích con tranh luận, tìm nhiều góc nhìn. Dạy con cách nghĩ, không chỉ là tìm đáp án.",
      callout: "Thêm câu hỏi “vì sao con nghĩ vậy?” vào các cuộc trò chuyện thường ngày.",
      badgeNumber: "03",
      coreMessage: "Tư duy phản biện giúp con sử dụng AI mà không lệ thuộc vào AI.",
      tone: "clear, developmental",
      emotion: "energized",
      textDensity: "low",
      theme: "warm-paper",
      layoutVariant: "framework-principle-thoughtful",
      motion: "soft-float",
      illustration: {
        anchor: "right-center",
        scale: 1.06,
        type: "principle-scene",
        zIndex: 3,
        shadow: "soft-lg",
        wash: "lavender-sky-soft",
        motion: "float-xs",
        focalPoint: "center",
        cropSafe: true,
        alt: "Một em bé suy nghĩ với dấu hỏi và bóng đèn watercolor."
      },
      illustrationSubject:
        "Một em bé suy nghĩ với dấu hỏi và bóng đèn watercolor, giàu tính học hỏi.",
      imagePrompt:
        "Watercolor child thinking with floating question marks and light bulb doodles, educational, soft, airy.",
      speakerNote: "Đây là principle nhưng phải có cảm giác reflective hơn hai slide trước."
    },
    {
      slideNumber: 13,
      id: "s13_principle_digital_wellbeing",
      assetManifestId: "principle-04",
      type: "FrameworkSlide",
      role: "principle",
      act: "action",
      eyebrow: "Nguyên tắc 4",
      title: "Xây dựng thói quen digital wellbeing",
      body:
        "Thiết lập quy tắc sử dụng thiết bị cùng nhau. Ưu tiên giấc ngủ, vận động, đọc sách và kết nối thật.",
      callout: "Thiết lập một khung giờ không màn hình cho cả nhà mỗi ngày.",
      badgeNumber: "04",
      coreMessage: "Sức khỏe số là một nếp sống chung, không chỉ là quy tắc cho trẻ.",
      tone: "balanced, healthy",
      emotion: "steady",
      textDensity: "low",
      theme: "golden-hour",
      layoutVariant: "framework-principle-left",
      motion: "soft-rise",
      illustration: {
        anchor: "right-center",
        scale: 1.03,
        type: "principle-scene",
        zIndex: 3,
        shadow: "soft-lg",
        wash: "peach-yellow-soft",
        motion: "none",
        focalPoint: "center",
        cropSafe: true,
        alt: "Gia đình đạp xe và đi bộ ngoài trời."
      },
      illustrationSubject:
        "Gia đình đạp xe và đi bộ ngoài trời, điện thoại cất gọn, nhịp sống thanh thản.",
      imagePrompt:
        "Watercolor family biking and walking outdoors in a digital break moment, calm, healthy, sunlit.",
      speakerNote: "Slide này cần sáng và thoáng hơn để làm breathing slide giữa cụm advice."
    },
    {
      slideNumber: 14,
      id: "s14_principle_autonomy",
      assetManifestId: "principle-05",
      type: "FrameworkSlide",
      role: "principle",
      act: "action",
      eyebrow: "Nguyên tắc 5",
      title: "Trao cho con trách nhiệm và sự tự chủ",
      body:
        "Giao việc phù hợp với độ tuổi. Để con tự quyết định trong khuôn khổ an toàn. Trách nhiệm tạo nên trưởng thành.",
      callout: "Cùng con thống nhất một nguyên tắc số và để con tự theo dõi trong 7 ngày.",
      badgeNumber: "05",
      coreMessage: "Tự chủ được xây qua trải nghiệm có trách nhiệm, không phải qua kiểm soát thay.",
      tone: "trusting, developmental",
      emotion: "confident",
      textDensity: "low",
      theme: "warm-paper",
      layoutVariant: "framework-principle-right",
      motion: "soft-float",
      illustration: {
        anchor: "right-center",
        scale: 1.04,
        type: "principle-scene",
        zIndex: 3,
        shadow: "soft-lg",
        wash: "green-sky-soft",
        motion: "none",
        focalPoint: "center-left",
        cropSafe: true,
        alt: "Một đứa trẻ tưới cây, học trách nhiệm qua hành động nhỏ."
      },
      illustrationSubject:
        "Một đứa trẻ tưới cây và chăm sóc việc nhỏ của mình, học trách nhiệm qua hành động.",
      imagePrompt:
        "Warm watercolor child watering plants, soft domestic scene, symbolic of responsibility and autonomy.",
      speakerNote: "Giữ đây là advice card rõ ràng, nói thẳng cha mẹ nên làm gì."
    },
    {
      slideNumber: 15,
      id: "s15_principle_eq",
      assetManifestId: "principle-06",
      type: "FrameworkSlide",
      role: "principle",
      act: "action",
      eyebrow: "Nguyên tắc 6",
      title: "Phát triển EQ – nền tảng của hạnh phúc",
      body:
        "Dạy con nhận diện cảm xúc, thấu hiểu người khác, biết yêu thương và biết ơn. EQ giúp con đi xa và bền vững.",
      callout: "Khi con gặp chuyện khó, bắt đầu bằng việc gọi tên cảm xúc trước khi tìm giải pháp.",
      badgeNumber: "06",
      coreMessage: "EQ là lớp nền giúp con giữ chất người khi môi trường ngày càng tự động hóa.",
      tone: "humane, strong",
      emotion: "warm",
      textDensity: "low",
      theme: "playful-watercolor",
      layoutVariant: "framework-principle-thoughtful",
      motion: "soft-rise",
      illustration: {
        anchor: "right-center",
        scale: 1.05,
        type: "principle-scene",
        zIndex: 3,
        shadow: "soft-lg",
        wash: "peach-lavender-soft",
        motion: "float-xs",
        focalPoint: "center",
        cropSafe: true,
        alt: "Một em bé ngồi yên với những trái tim watercolor quanh mình."
      },
      illustrationSubject:
        "Một em bé ngồi yên, có những trái tim watercolor quanh mình, biểu tượng cho bình an và kết nối cảm xúc.",
      imagePrompt:
        "Watercolor child sitting calmly with small heart motifs, emotionally warm, restrained and editorial.",
      speakerNote: "Principle này cần mềm và nhân văn hơn, tránh corporate."
    },
    {
      slideNumber: 16,
      id: "s16_principle_values",
      assetManifestId: "principle-07",
      type: "FrameworkSlide",
      role: "principle",
      act: "action",
      eyebrow: "Nguyên tắc 7",
      title: "Truyền cảm hứng và giá trị sống",
      body:
        "Lắng gương bằng chính hành động mỗi ngày. Sống tử tế, kiên trì, học hỏi – đó là bài học mạnh mẽ nhất.",
      callout: "Kể cho con nghe một câu chuyện gia đình mà bạn muốn con mang theo lâu dài.",
      badgeNumber: "07",
      coreMessage: "Giá trị sống giúp con định hướng khi công cụ đổi liên tục.",
      tone: "reflective, inspiring",
      emotion: "uplifted",
      textDensity: "low",
      theme: "golden-hour",
      layoutVariant: "framework-principle-poster",
      motion: "gentle-pan",
      illustration: {
        anchor: "right-center",
        scale: 0.96,
        type: "principle-scene",
        zIndex: 3,
        shadow: "soft-lg",
        wash: "warm-yellow-soft",
        motion: "none",
        focalPoint: "center",
        cropSafe: true,
        alt: "Gia đình hướng về ngọn hải đăng trên bờ biển."
      },
      illustrationSubject:
        "Gia đình hướng về ngọn hải đăng trên bờ biển, tượng trưng cho giá trị sống dẫn đường.",
      imagePrompt:
        "Watercolor family walking toward a lighthouse by the sea, symbolic of values and guidance, golden light.",
      speakerNote: "Kết thúc cụm principle bằng tấm có cảm giác poster hơn để đóng section."
    },
    {
      slideNumber: 17,
      id: "s17_recap",
      assetManifestId: "closing-01",
      type: "ClosingReferenceSlide",
      role: "recap",
      act: "closing",
      eyebrow: "Kết lại",
      title: "Cha mẹ là người dẫn đường.",
      body:
        "AI là công cụ. Đồng hành đúng cách hôm nay còn vững vàng ngày mai. Điều con cần nhất vẫn là người lớn biết ở bên.",
      coreMessage: "Điểm đích của cha mẹ là sự trưởng thành toàn diện, không chỉ thành tích.",
      tone: "gentle, resolved",
      emotion: "hopeful",
      textDensity: "low",
      theme: "golden-hour",
      layoutVariant: "closing-family-walk",
      motion: "gentle-pan",
      illustration: {
        anchor: "right-center",
        scale: 0.92,
        type: "hero-scene",
        zIndex: 2,
        shadow: "soft-md",
        wash: "peach-sky-soft",
        motion: "none",
        focalPoint: "center",
        cropSafe: true,
        alt: "Gia đình nắm tay nhau đi trên cánh đồng trong nắng sớm."
      },
      illustrationSubject:
        "Gia đình nắm tay nhau đi trên cánh đồng trong nắng sớm, cảm giác bình yên và vững vàng.",
      imagePrompt:
        "Wide watercolor family walk at sunrise, pastoral, hopeful, calm, suitable for recap and emotional close.",
      speakerNote: "Chốt thesis theo hướng nhân văn, ít chữ và có dư âm."
    },
    {
      slideNumber: 18,
      id: "s18_references",
      assetManifestId: "reference-01",
      type: "ClosingReferenceSlide",
      role: "appendix",
      act: "closing",
      eyebrow: "Tài liệu tham khảo",
      title: "Giữ nguồn ở cuối để không phá mạch chính",
      body:
        "References là lớp thông tin phụ: sạch, yên tĩnh và tăng độ tin cậy mà không cướp spotlight khỏi phần trình bày.",
      citation: [
        {
          source: "American Academy of Pediatrics",
          note: "Media and young minds; family media guidance."
        },
        {
          source: "Facione, P. A.",
          note: "Critical thinking: What it is and why it counts."
        },
        {
          source: "Harvard Center on the Developing Child",
          note: "Responsive relationships and executive function."
        },
        {
          source: "World Economic Forum",
          note: "Future of Jobs reports."
        }
      ],
      coreMessage: "Nguồn tham khảo nên hỗ trợ deck như một lớp thông tin phụ, gọn và yên tĩnh.",
      tone: "clean, quiet",
      emotion: "neutral",
      textDensity: "medium",
      theme: "quiet-reference",
      layoutVariant: "reference-clean-two-column",
      motion: "none",
      illustration: {
        anchor: "right-bottom",
        scale: 0.36,
        type: "micro-illustration",
        zIndex: 1,
        shadow: "none",
        wash: "none",
        motion: "none",
        focalPoint: "center",
        cropSafe: true,
        alt: "Chồng sách nhỏ và chất liệu giấy watercolor."
      },
      illustrationSubject:
        "Một chồng sách nhỏ và chất liệu giấy watercolor nhẹ, chỉ đóng vai trò nền.",
      imagePrompt:
        "Very light watercolor books and paper texture, minimal and quiet for a references slide.",
      speakerNote: "Đây là appendix sạch, không nên mang cảm giác trang trí dư thừa."
    },
    {
      slideNumber: 19,
      id: "s19_thanks",
      type: "ClosingReferenceSlide",
      role: "thanks",
      act: "closing",
      eyebrow: "Cảm ơn!",
      title: "Chúc ba mẹ luôn là người bạn đồng hành tuyệt vời",
      accentWords: ["Cảm ơn!"],
      body:
        "Trên hành trình trưởng thành của con, điều ở lại lâu nhất là cảm giác được yêu thương, được lắng nghe và được đồng hành.",
      coreMessage: "Kết thúc bằng một dư âm ấm áp, nhẹ và dễ nhớ.",
      tone: "soft, grateful",
      emotion: "grateful",
      textDensity: "hero",
      theme: "playful-watercolor",
      layoutVariant: "closing-thank-you-banner",
      motion: "gentle-pan",
      illustration: {
        asset: "closing-thank-you-banner-01",
        anchor: "right-bottom",
        scale: 1.04,
        type: "hero-scene",
        zIndex: 2,
        shadow: "soft-md",
        wash: "sky-peach-soft",
        motion: "none",
        focalPoint: "center",
        cropSafe: true,
        alt: "Dải cỏ hoa watercolor và gia đình bước cùng nhau."
      },
      illustrationSubject:
        "Dải cỏ hoa watercolor và gia đình bước cùng nhau trong không khí cảm ơn, nhẹ và sáng.",
      imagePrompt:
        "Watercolor thank-you banner with flowers, family walking together, playful but premium, wide composition.",
      speakerNote: "Đây là closing banner, ít chữ và hình chiếm cảm xúc chính."
    },
    {
      slideNumber: 20,
      id: "s20_closing_poster",
      type: "ClosingReferenceSlide",
      role: "cta",
      act: "closing",
      eyebrow: "Một bước nhỏ tối nay",
      title: "Bắt đầu bằng một cuộc trò chuyện thật sự",
      body:
        "Không cần thay đổi tất cả ngay lập tức. Hãy bắt đầu bằng một bước nhỏ nhưng đều đặn để gia đình đi cùng nhau lâu dài.",
      bullets: [
        "Nói với con một điều bạn thật sự muốn lắng nghe hôm nay.",
        "Chọn một thói quen số mới cho cả nhà trong tuần này.",
        "Cùng con học một điều công nghệ mới thay vì chỉ cấm đoán."
      ],
      callout: "Action nhỏ, nhịp đều, hiệu quả thật.",
      coreMessage: "Hành động nhỏ, bền bỉ sẽ tạo chuyển biến thật.",
      tone: "practical, optimistic",
      emotion: "motivated",
      textDensity: "medium",
      theme: "golden-hour",
      layoutVariant: "closing-poster-cta",
      motion: "soft-rise",
      illustration: {
        asset: "closing-poster-cta-01",
        anchor: "right-center",
        scale: 1.08,
        type: "hero-scene",
        zIndex: 2,
        shadow: "soft-lg",
        wash: "peach-yellow-soft",
        motion: "fade-float-xs",
        focalPoint: "center",
        cropSafe: true,
        alt: "Gia đình bước giữa cánh đồng hoa rộng trong ánh chiều."
      },
      illustrationSubject:
        "Gia đình bước giữa cánh đồng hoa rộng trong ánh chiều, tạo cảm giác kết đẹp và còn dư âm.",
      imagePrompt:
        "Emotional watercolor family walking through a flower field at sunset, wide composition, calm and memorable.",
      speakerNote: "Đây là tấm poster kết thúc, đủ action nhưng vẫn giữ cảm xúc."
    }
  ]
} as const;

export default deck;
