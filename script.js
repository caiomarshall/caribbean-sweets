document.addEventListener('DOMContentLoaded', function () {
  const translations = {
    es: {
      title: "Caribbean Sweets",
      slogan: "Delicias hechas con amor.",
      connect_prompt: "Realiza tu pedido o conéctate:",
      whatsapp_button: "Pregunta en WhatsApp",
      menu_button: "Ver Menú",
      testimonials_title: "Lo que dicen nuestros clientes",
      offer_text: "Usa el cupón",
      offer_text_2: "para 10% de descuento en tu primera compra!",
      copy_coupon_btn: "Copiar Cupón",
      copied_btn: "¡Copiado!",
      footer_text: "© 2025 Caribbean Sweets",
      menu_title: "Nuestro Menú",
      whatsapp_message: "¡Hola! Me gustaría hacer un pedido.",
      menu_items: [
        { name: "Pastel de Tres Leches", price: "$5" },
        { name: "Cocada", price: "$3" }
      ],
      testimonials: [
        { stars: 5, quote: "Delicioso y fresco", author: "Ana" },
        { stars: 5, quote: "Atención top y sabor increíble", author: "Maria C." },
        { stars: 5, quote: "Me gustó mucho, recomiendo!", author: "César M." }
      ]
    },
    en: {
      title: "Caribbean Sweets",
      slogan: "Delights made with love.",
      connect_prompt: "Order or connect:",
      whatsapp_button: "Ask on WhatsApp",
      menu_button: "See Menu",
      testimonials_title: "What our customers say",
      offer_text: "Use coupon",
      offer_text_2: "for 10% off your first order!",
      copy_coupon_btn: "Copy Coupon",
      copied_btn: "Copied!",
      footer_text: "© 2025 Caribbean Sweets",
      menu_title: "Our Menu",
      whatsapp_message: "Hi! I'd like to place an order.",
      menu_items: [
        { name: "Tres Leches Cake", price: "$5" },
        { name: "Cocada", price: "$3" }
      ],
      testimonials: [
        { stars: 5, quote: "Delicious and fresh!", author: "Anna" },
        { stars: 5, quote: "Great service and amazing taste!", author: "Maria C." },
        { stars: 5, quote: "I really liked it, recommend!", author: "César M." }
      ]
    },
    pt: {
      title: "Caribbean Sweets",
      slogan: "Delícias feitas com amor.",
      connect_prompt: "Faça seu pedido ou conecte-se:",
      whatsapp_button: "Pergunte no WhatsApp",
      menu_button: "Ver Cardápio",
      testimonials_title: "O que dizem os nossos clientes",
      offer_text: "Use o cupom",
      offer_text_2: "para 10% de desconto na primeira compra!",
      copy_coupon_btn: "Copiar Cupom",
      copied_btn: "Copiado!",
      footer_text: "© 2025 Caribbean Sweets",
      menu_title: "Nosso Cardápio",
      whatsapp_message: "Olá! Gostaria de fazer um pedido.",
      menu_items: [
        { name: "Bolo Três Leites", price: "R$ 25" },
        { name: "Cocada", price: "R$ 15" }
      ],
      testimonials: [
        { stars: 5, quote: "Delicioso e fresquinho!", author: "Ana" },
        { stars: 5, quote: "Atendimento excelente e sabor incrível!", author: "Maria C." },
        { stars: 5, quote: "Gostei muito, recomendo!", author: "César M." }
      ]
    }
  };

  const menuItemsContainer = document.getElementById('menu-items');
  const testimonialsContainer = document.getElementById('testimonials-list');
  const languageButtons = document.querySelectorAll('.language-switcher button');
  const menuBtn = document.getElementById('menu-btn');
  const modal = document.getElementById('menu-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const closeBannerBtn = document.getElementById('close-banner-btn');
  const offerBanner = document.getElementById('offer-banner');
  const copyCouponBtn = document.getElementById('copy-coupon-btn');
  const couponCodeEl = document.getElementById('coupon-code');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;
  const toggleIcon = darkModeToggle.querySelector('i');

  function renderMenuItems(lang) {
    menuItemsContainer.innerHTML = '';
    translations[lang].menu_items.forEach((item) => {
      const menuItemDiv = document.createElement('div');
      menuItemDiv.className = 'menu-item';
      menuItemDiv.innerHTML = `<span class="menu-item-name">${item.name}</span><span class="menu-item-price">${item.price}</span>`;
      menuItemsContainer.appendChild(menuItemDiv);
    });
  }

  function renderTestimonials(lang) {
    testimonialsContainer.innerHTML = '';
    translations[lang].testimonials.forEach((item) => {
      const testimonialDiv = document.createElement('div');
      testimonialDiv.className = 'testimonial-item';
      let starsHTML = '';
      for (let i = 0; i < item.stars; i++) {
        starsHTML += '<i class="fa-solid fa-star"></i>';
      }
      testimonialDiv.innerHTML = `
          <div class="testimonial-stars">${starsHTML}</div>
          <p class="testimonial-text">${item.quote}</p>
          <span class="testimonial-author">- ${item.author}</span>
      `;
      testimonialsContainer.appendChild(testimonialDiv);
    });
  }

  function updateLanguageButtons(selectedLang) {
    languageButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', btn.dataset.lang === selectedLang);
      btn.setAttribute('title', `Mudar para ${btn.textContent}`);
    });
  }

  function updateTranslations(lang) {
    document.querySelectorAll('[data-translate-key]').forEach((element) => {
      const key = element.dataset.translateKey;
      if (translations[lang] && translations[lang][key]) {
        if (element.children.length === 0) {
          element.textContent = translations[lang][key];
        } else {
          element.innerHTML = translations[lang][key];
        }
      }
    });
  }

  function setHtmlLang(lang) {
    document.documentElement.setAttribute('lang', lang);
  }

  function trapFocus(modal) {
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableEls = modal.querySelectorAll(focusableSelectors);
    if (focusableEls.length === 0) return;
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];
    modal.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    });
  }

  const changeLanguage = (lang) => {
    updateTranslations(lang);
    const whatsappLink = document.getElementById('whatsapp-link');
    if (whatsappLink) {
      const encodedMessage = encodeURIComponent(translations[lang]['whatsapp_message']);
      const numeroWhatsapp = '19179221148';
      whatsappLink.href = `https://wa.me/${numeroWhatsapp}?text=${encodedMessage}`;
    }
    renderMenuItems(lang);
    renderTestimonials(lang);
    setHtmlLang(lang);
    updateLanguageButtons(lang);
    if (typeof revealOnScroll === 'function') revealOnScroll();
  };

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      changeLanguage(button.dataset.lang);
    });
  });

  const userLang = navigator.language.split('-')[0];
  const defaultLang = ['pt', 'en', 'es'].includes(userLang) ? userLang : 'es';
  changeLanguage(defaultLang);

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      toggleIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
      body.classList.remove('dark-mode');
      toggleIcon.classList.replace('fa-sun', 'fa-moon');
    }
  };

  const currentTheme = localStorage.getItem('theme') || 'light';
  applyTheme(currentTheme);

  darkModeToggle.addEventListener('click', () => {
    let newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  function openModal() {
    document.body.classList.add('modal-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    setTimeout(() => {
      const closeBtn = modal.querySelector('.modal-close');
      if (closeBtn) closeBtn.focus();
    }, 100);
    trapFocus(modal);
  }

  function closeModal() {
    document.body.classList.remove('modal-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.focus();
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', openModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal();
      }
    });
  }

  if (closeBannerBtn && offerBanner) {
    closeBannerBtn.addEventListener('click', () => {
      offerBanner.classList.add('hidden');
      document.body.classList.remove('banner-visible');
    });
  }

  if (copyCouponBtn && couponCodeEl) {
    copyCouponBtn.addEventListener('click', () => {
      const couponCode = couponCodeEl.textContent;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(couponCode).then(() => {
          const lang = document.documentElement.lang;
          copyCouponBtn.textContent = translations[lang]['copied_btn'];
          copyCouponBtn.classList.add('copied');
          setTimeout(() => {
            const currentLang = document.documentElement.lang;
            copyCouponBtn.textContent = translations[currentLang]['copy_coupon_btn'];
            copyCouponBtn.classList.remove('copied');
          }, 2000);
        });
      } else {
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = couponCode;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        const lang = document.documentElement.lang;
        copyCouponBtn.textContent = translations[lang]['copied_btn'];
        copyCouponBtn.classList.add('copied');
        setTimeout(() => {
          const currentLang = document.documentElement.lang;
          copyCouponBtn.textContent = translations[currentLang]['copy_coupon_btn'];
          copyCouponBtn.classList.remove('copied');
        }, 2000);
      }
    });
  }

  window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.classList.add('loaded');
    }
    document.body.classList.add('ready');
    const main = document.querySelector('.main-container');
    if (main) {
      main.style.opacity = 0;
      main.style.transition = 'opacity 1.2s cubic-bezier(.4,0,.2,1)';
      setTimeout(() => { main.style.opacity = 1; }, 300);
    }
  });

  function addRippleEffect(btn) {
    btn.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      circle.className = 'ripple';
      const rect = btn.getBoundingClientRect();
      circle.style.left = (e.clientX - rect.left) + 'px';
      circle.style.top = (e.clientY - rect.top) + 'px';
      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  }
  document.querySelectorAll('button, .social-icon, .whatsapp-button').forEach(addRippleEffect);

  function revealOnScroll() {
    document.querySelectorAll('.testimonial-item').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add('revealed');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);

  function confettiBurst() {
    if (window.confetti) {
      window.confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }
  if (copyCouponBtn) {
    copyCouponBtn.addEventListener('click', () => {
      if (window.confetti) confettiBurst();
    });
  }

  document.querySelectorAll('.faq-item button').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      answer.classList.toggle('open');
    });
  });

  const progressBar = document.createElement('div');
  progressBar.style.position = 'fixed';
  progressBar.style.top = 0;
  progressBar.style.left = 0;
  progressBar.style.height = '4px';
  progressBar.style.background = 'linear-gradient(90deg, #d92045, #f8c8dc)';
  progressBar.style.zIndex = 3000;
  progressBar.style.width = '0%';
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;
    progressBar.style.width = (scroll / height * 100) + '%';
  });

  function showToast(msg) {
    let toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); toast.remove(); }, 2500);
  }

  window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.classList.add('loaded');
    }
    document.body.classList.add('ready');
  });
});
