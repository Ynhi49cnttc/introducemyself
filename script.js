
/* ══════════════════════════════════════════════════════
   1. CUSTOM CURSOR
   ══════════════════════════════════════════════════════ */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || window.matchMedia('(hover:none)').matches) return;

  let mx = -100, my = -100;
  let fx = -100, fy = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Smooth follower via RAF
  function followCursor() {
    fx += (mx - fx) * 0.14;
    fy += (my - fy) * 0.14;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(followCursor);
  }
  followCursor();

  // Scale on interactive elements
  document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
      follower.style.borderColor = 'rgba(79,138,255,0.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = '';
      follower.style.transform = '';
      follower.style.borderColor = '';
    });
  });
})();


/* ══════════════════════════════════════════════════════
   2. NAVBAR — sticky + active section highlight
   ══════════════════════════════════════════════════════ */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const links     = document.querySelectorAll('.nav-link');

  // Scroll: add 'scrolled' class
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    highlightActive();
  }, { passive: true });

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Highlight active section
  const sections = ['hero', 'about', 'projects', 'certificates', 'contact'];
  function highlightActive() {
    const scrollY = window.scrollY;
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const top    = el.offsetTop - 90;
      const bottom = top + el.offsetHeight;
      const link   = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) link.classList.toggle('active', scrollY >= top && scrollY < bottom);
    });
  }
  highlightActive();
})();


/* ══════════════════════════════════════════════════════
   3. SCROLL REVEAL ANIMATION
   ══════════════════════════════════════════════════════ */
(function initReveal() {
  const targets = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after reveal to save resources
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
})();


/* ══════════════════════════════════════════════════════
   4. COUNTER ANIMATION (stats in About section)
   ══════════════════════════════════════════════════════ */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.round(easeOut(progress) * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  // Trigger counters when about section is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(animateCounter);
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  const aboutSection = document.getElementById('about');
  if (aboutSection) observer.observe(aboutSection);
})();


/* ══════════════════════════════════════════════════════
   5. PROJECT MODAL
   ══════════════════════════════════════════════════════ */
(function initModal() {
  const overlay = document.getElementById('modalOverlay');
  const modal   = document.getElementById('modal');
  const closeBtn = document.getElementById('modalClose');
  const content  = document.getElementById('modalContent');

  const projects = {
    1: {
      title: 'BEAT-Unet: Salient Object Segmentation',
      img:   './images/VisualSalience.png',
      desc: `Nghiên cứu kiến trúc mạng U-Net kết hợp Transformer bottleneck, module dò biên học được (Learnable Edge) và Attention Gate. Sử dụng hàm mất mát lai (BCE + Dice) giúp cân bằng độ chính xác pixel và tính toàn vẹn cấu trúc. Huấn luyện trên tập DUTS-TR đạt hiệu suất cao trong việc phân đoạn các đối tượng nổi bật trên nền phức tạp.`,
      tech: ['PyTorch', 'Transformer', 'U-Net', 'Computer Vision', 'Deep Learning'],
      link: './cert/VisualSalience.pdf',
      linkType: 'paper'
    },
    2: {
      title: 'Super Resolution For Medical Image',
      img:   './images/SuperResolution.png',
      desc: `Đề xuất phương pháp siêu phân giải ảnh cộng hưởng từ (MRI) kết hợp thuật toán Optical Flow TV-L1 để căn chỉnh hình học và cơ chế tiêm chi tiết tần số cao có chọn lọc (FI-SR). Phương pháp giúp khôi phục chi tiết các mô tinh vi mà không cần huấn luyện mô hình học sâu, kết hợp CLAHE tăng cường tương phản. Đánh giá trên tập dữ liệu IXI.`,
      tech: ['Optical Flow', 'Machine Learning', 'CLAHE', 'Medical AI'],
      link: './cert/Super_Resolution_Medical.pdf',
      linkType: 'paper'
    },
    3: {
      title: 'MuaRightWeb - Nền tảng Bán Nước Hoa',
      img:   './images/MuaRightWeb.png',
      desc: `Đồ án môn Công nghệ phần mềm xây dựng website thương mại điện tử chuyên cung cấp nước hoa. Trực tiếp đảm nhận vai trò phát triển Frontend và Backend cho phân hệ Quản lý người bán (Seller) và xây dựng một phần chức năng điều phối cho bộ phận Giao hàng (Shipper).`,
      tech: ['Frontend', 'Backend', 'Database', 'Software Engineering'],
      link: 'https://github.com/TruongAnhKietK49/MuaRightWeb',
      linkType: 'github'
    }
  };

  function openModal(id) {
    const p = projects[id];
    if (!p) return;
    
    // Tùy biến Nút bấm (Link) dựa theo loại dự án
    let linkIcon = p.linkType === 'github' ? 'ph-github-logo' : 'ph-file-pdf';
    let linkText = p.linkType === 'github' ? 'Xem trên GitHub' : 'Đọc bài báo nghiên cứu';

    content.innerHTML = `
      <img src="${p.img}" alt="${p.title}" />
      <h2>${p.title}</h2>
      <p>${p.desc}</p>
      <div class="modal-tech-list">
        ${p.tech.map(t => `<span>${t}</span>`).join('')}
      </div>
      <a href="${p.link}" target="_blank" class="modal-link">
        <i class="ph ${linkIcon}"></i> ${linkText}
      </a>
    `;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Lắng nghe sự kiện click vào các thẻ project-card
  document.querySelector('.projects-grid').addEventListener('click', e => {
    // Nếu click vào thẻ overlay-btn bên trong card thì không hiện modal (để nó nhảy link luôn)
    if (e.target.closest('.overlay-btn') || e.target.closest('.card-link')) return;

    const card = e.target.closest('.project-card');
    if (card) openModal(parseInt(card.dataset.id, 10));
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();

/* ══════════════════════════════════════════════════════
   6. CONTACT FORM VALIDATION
   ══════════════════════════════════════════════════════ */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    name:    { el: form.name,    err: document.getElementById('nameErr'),    min: 2,  label: 'Tên' },
    email:   { el: form.email,   err: document.getElementById('emailErr'),   label: 'Email' },
    subject: { el: form.subject, err: document.getElementById('subjectErr'), min: 3,  label: 'Chủ đề' },
    message: { el: form.message, err: document.getElementById('msgErr'),     min: 10, label: 'Tin nhắn' }
  };

  const submitBtn  = document.getElementById('submitBtn');
  const successBox = document.getElementById('formSuccess');

  function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  function validateField(key) {
    const { el, err, min, label } = fields[key];
    const val = el.value.trim();
    let msg = '';

    if (!val) {
      msg = `${label} không được để trống.`;
    } else if (key === 'email' && !validateEmail(val)) {
      msg = 'Email không hợp lệ.';
    } else if (min && val.length < min) {
      msg = `${label} tối thiểu ${min} ký tự.`;
    }

    err.textContent = msg;
    el.classList.toggle('error', !!msg);
    return !msg;
  }

  // Real-time validation on blur
  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener('blur', () => validateField(key));
    fields[key].el.addEventListener('input', () => {
      if (fields[key].el.classList.contains('error')) validateField(key);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Validate all fields
    const valid = Object.keys(fields).map(validateField).every(Boolean);
    if (!valid) return;

    // Simulate async submit
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Đang gửi...';

    setTimeout(() => {
      form.reset();
      Object.values(fields).forEach(({ el }) => el.classList.remove('error'));
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'Gửi tin nhắn';
      successBox.classList.add('show');
      setTimeout(() => successBox.classList.remove('show'), 5000);
    }, 1400);
  });
})();


/* ══════════════════════════════════════════════════════
   7. TYPING EFFECT (optional hero subtitle enhancement)
   ══════════════════════════════════════════════════════ */
(function initTypingBadge() {
  const tag = document.querySelector('.hero-tag');
  if (!tag) return;
  const texts = ['AI Engineer · Student', 'Computer Vision', 'Generative AI', 'Deep Learning'];
  let i = 0, charIdx = 0, deleting = false;

  // Only run after first text is shown
  setTimeout(function tick() {
    const current = texts[i];
    if (!deleting) {
      charIdx++;
      tag.childNodes[1].textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      charIdx--;
      tag.childNodes[1].textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        i = (i + 1) % texts.length;
      }
    }
    setTimeout(tick, deleting ? 50 : 90);
  }, 2400);
})();


/* ══════════════════════════════════════════════════════
   8. SMOOTH PARALLAX — subtle hero grid shift on scroll
   ══════════════════════════════════════════════════════ */
(function initParallax() {
  const gridBg = document.querySelector('.hero-grid-bg');
  if (!gridBg) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    gridBg.style.transform = `translateY(${y * 0.3}px)`;
  }, { passive: true });
})();