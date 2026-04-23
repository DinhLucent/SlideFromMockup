# HỆ THỐNG SLIDE GỐC (SLIDE_SYSTEM)

## Mục đích
Tài liệu này biến các quy chuẩn thiết kế thành **một hệ thống tạo slide có thể lặp lại**. Đây là hướng dẫn chi tiết dành cho Agent khi tạo toàn bộ một Slide Deck thay vì chỉ tạo ra các bức ảnh rời rạc.

Nó quy định:
- Vai trò của các Slide
- Các mẫu bố cục (Layout archetypes) được phê duyệt
- Mật độ nội dung
- Logic chèn hình minh họa (Illustration)
- Chuỗi cấu trúc bài thuyết trình
- Output dành cho hệ thống HTML Engine (`SHOW_ARCHITECTURE.md`)

Bạn luôn cần kết hợp tài liệu này cùng với `SKILL.md`, `DESIGN.md`.

---

## 1. Định dạng Hệ thống (System Identity)

**Tên hệ thống:** Warm Watercolor Editorial Slide System (Hệ thống Slide màu nước ấm áp)
**Phù hợp với chủ đề:** Nuôi dạy con, giáo dục, kỹ năng mềm, các bài nói truyền cảm hứng, thuyết trình liên quan đến giá trị cốt lõi.
**Cảm giác mang lại:** Ấm áp, Dễ theo dõi, Ưu tiên vẽ minh họa, Ít chữ (Low-density).

### Tối ưu cho:
- Kể chuyện theo phong cách Keynote.
- Slide dài từ 8 - 20 trang.
- Đối tượng khán giả đại chúng.

### Không dành cho:
- Báo cáo tài chính dày đặc biểu đồ.
- Sơ đồ kiến trúc IT phức tạp (chuyển sang frontend-design).
- Các bài thuyết trình khoa học nặng nề.

---

## 2. Quy tắc cốt lõi của Hệ thống

1. **Một slide - Một thông điệp:** Không bao giờ gộp 2 claim/insight vào 1 khung hình.
2. **Hình ảnh trước, Chữ sau:** Khán giả phải hiểu slide qua [Tiêu đề lớn] + [Minh hoạ] + [1 câu giải thích].
3. **Cảm xúc thắng sự rườm rà rắc rối:** Slide truyền tải gì? Hi vọng, Cảnh báo, Quan tâm, Hành động?
4. **Không gian thở (Whitespace) cực kỳ quan trọng:** Đừng cố nhét nội dung lấp đầy slide.

---

## 3. Các Vai trò đã được phê duyệt (Slide Roles)

Từ đây, mọi slide tạo ra phải có một vai trò cụ thể:

- **Core roles (Vai trò cốt lõi):**
  - `cover` (Bìa)
  - `hook` (Dẫn dụ)
  - `pain_point` (Nỗi đau thực tại)
  - `evidence` (Chứng cứ khoa học)
  - `stat_future` (Số liệu dự báo)
  - `principle` (Nguyên tắc)
  - `action_tip` (Mẹo hành động)
  - `conclusion` (Kết luận)
  - `thank_you` (Cảm ơn)

> Không tự ý sáng tạo các role ngoài danh sách trên nếu chưa thấy sự cần thiết.

---

## 4. Các Mẫu Layout Đặc trưng (Archetypes)

### A1. Cover Hero (Bìa)
- **Role tiêu biểu:** `cover`, `thank_you`
- **Giao diện:** Tiêu đề cực lớn + Hình khối minh họa lớn chiếm 45-70%.
- **Quy định mật độ chữ:** Vô cùng thấp. KHÔNG được thêm bullet.

### A2. Hook Statement (Dẫn dụ/Câu hỏi neo)
- **Giao diện:** Câu nói ngắn cảm xúc + Không gian thở bao la. Chữ chiếm diện tích rất ít.
- **Tone:** Khẩn cấp nhưng nhẹ nhàng, có tính phản tư.

### A3. Problem Framing (Chỉ ra vấn đề)
- **Role tiêu biểu:** `pain_point`
- **Giao diện:** Tiêu đề (Top-Left) + Danh sách Bullet gọn gàng + Hình gia đình/nhân vật đang buồn/lo lắng (Right).
- **Quy định Bullet:** 4 - 6 cái là hoàn hảo.

### A4. Science Says (Khẳng định khoa học/Khoa học nói gì)
- **Role tiêu biểu:** `evidence`
- **Giao diện:** Tiêu đề (Top-Left) + Luận điểm đã tóm tắt (Kèm Trích dẫn trỏ siêu nhỏ ở dưới) + Hình minh họa opposite.
- **Quy tắc:** Đừng bê nguyên báo cáo khoa học. Chỉ diễn giải ra ngôn ngữ con người.

### A6. Numbered Principle Card (Gợi ý nguyên tắc)
- **Role tiêu biểu:** `principle`, `action_tip`
- **Giao diện:** Huy hiệu vòng tròn (Number badge) màu cam/hồng (Top Left) + Tiêu đề đậm + 2-4 dòng khuyên bảo ngắn gọn + Ảnh.
- **System rule:** Đây là khối layout được dùng đi dùng lại nhiều nhất cho phần thực hành.

---

## 5. Chuỗi Slide chuẩn (Deck Skeletons)
Ví dụ gợi ý cho kịch bản 12 slide (Gói Standard):
1. cover
2. hook
3. pain_point
4. evidence 1
5. evidence 2
6. stat_future
7. principle 1
8. principle 2
9. principle 3
10. principle 4 (or action)
11. conclusion
12. thank_you

---

## 6. Lời khuyên thiết kế (Design Constraints)

### Tiêu đề (Heading):
Tránh dùng kiểu Passive Voice (Câu bị động), tiêu đề mang tính chất Academic.
- **TỐT:** "Khoa học nói gì?", "Lắng nghe để thấu hiểu".
- **CHƯA TỐT:** "Cơ chế tác động của sóng âm biểu hiện rõ trong sơ đồ...".

### Độ lặp (Repetition):
- Lặp lại định dạng layout của các slide thuộc role `principle` giúp mọi thứ thống nhất.
- Đừng cố tạo ra một layout khác biệt cho mỗi slide.

### Khi Sinh ra Slide (JSON / Object Generator):
Agent sẽ bắt buộc bọc theo Object Output định dạng HTML / DOM Object gồm những trường sau:
`slide_number`, `role`, `archetype`, `headline`, `illustration_subject` và `emotion`.
