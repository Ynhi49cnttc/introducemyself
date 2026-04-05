# 🤖 AI Engineer Portfolio

Portfolio website cá nhân cho **Ngô Ý Nhi** — AI Engineer / Student, chuyên về Computer Vision, Generative AI và Deep Learning.

---

## ✨ Tính năng

- 🌙 **Dark mode** — giao diện tối, hiện đại
- 📱 **Responsive** — tương thích mobile, tablet, desktop
- 🖱️ **Custom cursor** — hiệu ứng con trỏ tùy chỉnh
- 🎞️ **Scroll reveal** — animation xuất hiện khi cuộn
- 🔢 **Counter animation** — số liệu thống kê chạy đếm
- 🗂️ **Project modal** — click card để xem chi tiết dự án
- ✅ **Form validation** — kiểm tra form liên hệ bằng JavaScript
- ⌨️ **Typing effect** — hiệu ứng gõ chữ tự động ở hero section

---

## 🛠 Công nghệ sử dụng

| Công nghệ | Mục đích |
|-----------|----------|
| HTML5 | Cấu trúc trang |
| CSS3 (Grid + Flexbox) | Layout và styling |
| CSS Variables | Theming nhất quán |
| Vanilla JavaScript | Tương tác và animation |
| Google Fonts (Syne + DM Sans) | Typography |
| Phosphor Icons | Icon set |
| Unsplash | Ảnh placeholder |

---

## 🚀 Cách chạy project

### Cách 1: Mở trực tiếp
```bash
# Chỉ cần double-click file index.html
# hoặc kéo thả vào trình duyệt
```

### Cách 2: Dùng Live Server (VS Code)
```bash
# Cài extension "Live Server" trong VS Code
# Click chuột phải vào index.html → "Open with Live Server"
```

### Cách 3: Dùng Python HTTP server
```bash
cd portfolio/
python -m http.server 8000
# Mở trình duyệt: http://localhost:8000
```

---

## 📂 Cấu trúc thư mục

```
portfolio/
├── index.html          # Cấu trúc HTML chính
├── style.css           # Toàn bộ CSS + animations
├── script.js           # JavaScript: cursor, modal, form, counters
├── README.md           # Tài liệu này
└── assets/             # (tùy chọn) Ảnh và file tĩnh
    ├── avatar.jpg      # Ảnh đại diện
    ├── projects/       # Ảnh thumbnail dự án
    └── certificates/   # Ảnh/PDF chứng chỉ
```

---

## ✏️ Hướng dẫn customize

### 1. Đổi thông tin cá nhân
Mở `index.html`, tìm và thay thế:
```html
<!-- Tên -->
Nguyen Van A

<!-- Email -->
nguyenvana@email.com

<!-- GitHub -->
github.com/nguyenvana

<!-- LinkedIn -->
linkedin.com/in/nguyenvana
```

### 2. Thêm/sửa dự án
Trong `script.js`, tìm object `projects` và thêm entry mới:
```javascript
const projects = {
  7: {
    title: 'Tên dự án mới',
    img: 'https://link-anh.com/image.jpg',
    desc: 'Mô tả dự án...',
    tech: ['Tech1', 'Tech2'],
    github: 'https://github.com/...'
  }
};
```

Trong `index.html`, thêm card với `data-id="7"`.

### 3. Thay đổi màu sắc
Trong `style.css`, sửa CSS variables ở `:root`:
```css
:root {
  --accent:  #4f8aff;   /* Màu chính */
  --accent2: #a855f7;   /* Màu phụ */
  --accent3: #06d6a0;   /* Màu nhấn */
  --bg:      #080c14;   /* Màu nền */
}
```

### 4. Thêm chứng chỉ
Copy một `.cert-item` block trong `index.html` và cập nhật thông tin tương ứng.

---

## 🔄 Development Process

### Bước 1 — Thiết kế layout
- Xác định color palette (dark mode với accent xanh/tím)
- Phác thảo wireframe: Hero → About → Projects → Certs → Contact
- Chọn typography: Syne (display, bold) + DM Sans (body, clean)

### Bước 2 — Code HTML structure
- Semantic HTML5: `nav`, `section`, `article`, `footer`
- BEM-inspired class naming
- ARIA attributes cho accessibility

### Bước 3 — Styling CSS
- CSS Custom Properties cho toàn bộ design tokens
- Grid + Flexbox cho layout responsive
- CSS animations thuần: keyframes, transitions, transforms

### Bước 4 — Thêm JavaScript
- Custom cursor với smooth RAF loop
- IntersectionObserver cho scroll reveal và counter
- Event delegation cho project modal
- Form validation không dùng thư viện ngoài

### Bước 5 — Tối ưu UI/UX
- Smooth scroll (CSS `scroll-behavior: smooth`)
- Mobile menu với hamburger toggle
- Parallax nhẹ cho hero section
- Keyboard navigation support (Escape để đóng modal)
- Performance: `passive: true` cho scroll events

---

## 📄 License

MIT — Thoải mái sử dụng và customize cho portfolio cá nhân.