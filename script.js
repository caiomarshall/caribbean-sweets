document.addEventListener('DOMContentLoaded', function() {
    const translations = {
        'pt': { 
            slogan: 'Delícias feitas com amor.', 
            connect_prompt: 'Faça seu pedido ou conecte-se:', 
            whatsapp_button: 'Pedir no WhatsApp', 
            whatsapp_message: 'Olá! Gostaria de fazer um pedido e usar meu cupom de primeira compra.', 
            footer_text: '&copy; 2025 Caribbean Sweets',
            menu_button: 'Ver Cardápio',
            menu_title: 'Nosso Cardápio',
            menu_items: [
                { name: 'Bolo de Chocolate', price: '$3.00' },
                { name: 'Torta de Limão', price: '$2.50' },
                { name: 'Cupcake de Baunilha', price: '$1.50' },
                { name: 'Donut Recheado', price: '$1.25' }
            ],
            offer_text: 'Use o cupom',
            offer_text_2: 'para 10% de desconto na primeira compra!',
            copy_coupon_btn: 'Copiar Cupom',
            copied_btn: 'Copiado!',
            testimonials_title: 'O que dizem os nossos clientes',
            testimonials: [
                { quote: '"Nossa, o bolo de chocolate é de outro mundo!! Sério, o melhor de Chicago. Virei cliente fiel!"', author: 'Maria C.', stars: 5 },
                { quote: '"Atendimento 10/10 e os doces... sem palavras. A torta de limão é perfeita!"', author: 'César M.', stars: 5 }
            ]
        },
        'en': { 
            slogan: 'Delights made with love.', 
            connect_prompt: 'Place your order or connect:', 
            whatsapp_button: 'Order on WhatsApp', 
            whatsapp_message: 'Hello! I would like to place an order and use my first-time buyer coupon.', 
            footer_text: '&copy; 2025 Caribbean Sweets',
            menu_button: 'View Menu',
            menu_title: 'Our Menu',
            menu_items: [
                { name: 'Chocolate Cake', price: '$3.00' },
                { name: 'Lemon Pie', price: '$2.50' },
                { name: 'Vanilla Cupcake', price: '$1.50' },
                { name: 'Filled Donut', price: '$1.25' }
            ],
            offer_text: 'Use the coupon',
            offer_text_2: 'for 10% off on your first purchase!',
            copy_coupon_btn: 'Copy Coupon',
            copied_btn: 'Copied!',
            testimonials_title: 'What our clients say',
            testimonials: [
                { quote: '"Wow, the chocolate cake is out of this world!! Seriously, the best in Chicago. I\'m a loyal customer now!"', author: 'Maria C.', stars: 5 },
                { quote: '"10/10 service and the sweets... speechless. The lemon pie is perfect!"', author: 'César M.', stars: 5 }
            ]
        },
        'es': { 
            slogan: 'Delicias hechas com amor.', 
            connect_prompt: 'Realiza tu pedido o conéctate:', 
            whatsapp_button: 'Pregunta en WhatsApp', 
            whatsapp_message: '¡Hola! Me gustaría hacer un pedido y usar mi cupón de primera compra.', 
            footer_text: '&copy; 2025 Caribbean Sweets',
            menu_button: 'Ver Menú',
            menu_title: 'Nuestro Menú',
            menu_items: [
                { name: 'Pastel de Chocolate', price: '$3.00' },
                { name: 'Tarta de Limón', price: '$2.50' },
                { name: 'Cupcake de Vainilla', price: '$1.50' },
                { name: 'Dona Rellena', price: '$1.25' }
            ],
            offer_text: 'Usa el cupón',
            offer_text_2: '¡para un 10% de descuento en tu primera compra!',
            copy_coupon_btn: 'Copiar Cupón',
            copied_btn: '¡Copiado!',
            testimonials_title: 'Lo que dicen nuestros clientes',
            testimonials: [
                { quote: '"¡Wow, el pastel de chocolate es de otro mundo! En serio, el mejor de Chicago. ¡Me he convertido en una clienta fiel!"', author: 'Maria C.', stars: 5 },
                { quote: '"Servicio 10/10 y los dulces... sin palabras. ¡La tarta de limón es perfecta!"', author: 'César M.', stars: 5 }
            ]
        }
    };

    const menuItemsContainer = document.getElementById('menu-items');
    const testimonialsContainer = document.getElementById('testimonials-list');

    const changeLanguage = (lang) => {
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.dataset.translateKey;
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
        
        const waButtonSpan = document.querySelector('#whatsapp-link span');
        if(waButtonSpan) { waButtonSpan.innerHTML = translations[lang]['whatsapp_button']; }

        const menuButtonSpan = document.querySelector('#menu-btn span');
        if(menuButtonSpan) { menuButtonSpan.innerHTML = translations[lang]['menu_button']; }
        
        const whatsappLink = document.getElementById('whatsapp-link');
        if (whatsappLink) {
            const encodedMessage = encodeURIComponent(translations[lang]['whatsapp_message']);
            const numeroWhatsapp = '19179221148';
            whatsappLink.href = `https://wa.me/${numeroWhatsapp}?text=${encodedMessage}`;
        }

        if(menuItemsContainer) {
            menuItemsContainer.innerHTML = '';
            translations[lang].menu_items.forEach(item => {
                const menuItemDiv = document.createElement('div');
                menuItemDiv.className = 'menu-item';
                menuItemDiv.innerHTML = `<span class="menu-item-name">${item.name}</span><span class="menu-item-price">${item.price}</span>`;
                menuItemsContainer.appendChild(menuItemDiv);
            });
        }

        if(testimonialsContainer) {
            testimonialsContainer.innerHTML = '';
            translations[lang].testimonials.forEach(item => {
                const testimonialDiv = document.createElement('div');
                testimonialDiv.className = 'testimonial-item';
                let starsHTML = '';
                for (let i = 0; i < 5; i++) {
                    starsHTML += `<i class="fa-solid fa-star"></i>`;
                }
                testimonialDiv.innerHTML = `
                    <div class="testimonial-stars">${starsHTML}</div>
                    <p class="testimonial-text">“${item.quote}”</p>
                    <span class="testimonial-author">- ${item.author}</span>
                `;
                testimonialsContainer.appendChild(testimonialDiv);
            });
        }

        document.documentElement.lang = lang;
    };

    document.querySelectorAll('.language-switcher button').forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.dataset.lang;
            changeLanguage(selectedLang);
        });
    });

    const userLang = navigator.language.split('-')[0];
    const defaultLang = ['pt', 'en', 'es'].includes(userLang) ? userLang : 'es';
    changeLanguage(defaultLang);

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const toggleIcon = darkModeToggle.querySelector('i');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            toggleIcon.classList.remove('fa-moon');
            toggleIcon.classList.add('fa-sun');
        } else {
            body.classList.remove('dark-mode');
            toggleIcon.classList.remove('fa-sun');
            toggleIcon.classList.add('fa-moon');
        }
    };

    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    darkModeToggle.addEventListener('click', () => {
        let newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    const menuBtn = document.getElementById('menu-btn');
    const modal = document.getElementById('menu-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            document.body.classList.add('modal-open');
        });
    }

    if(closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            document.body.classList.remove('modal-open');
        });
    }

    if(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.classList.remove('modal-open');
            }
        });
    }

    const closeBannerBtn = document.getElementById('close-banner-btn');
    const offerBanner = document.getElementById('offer-banner');
    if(closeBannerBtn && offerBanner) {
        closeBannerBtn.addEventListener('click', () => {
            offerBanner.classList.add('hidden');
            document.body.classList.remove('banner-visible');
        });
    }

    const copyCouponBtn = document.getElementById('copy-coupon-btn');
    const couponCodeEl = document.getElementById('coupon-code');
    if(copyCouponBtn && couponCodeEl) {
        copyCouponBtn.addEventListener('click', () => {
            const couponCode = couponCodeEl.innerText;
            const tempInput = document.createElement('input');
            document.body.appendChild(tempInput);
            tempInput.value = couponCode;
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);

            const originalText = copyCouponBtn.innerText;
            const lang = document.documentElement.lang;
            copyCouponBtn.innerText = translations[lang]['copied_btn'];
            copyCouponBtn.classList.add('copied');
            setTimeout(() => {
                copyCouponBtn.innerText = translations[lang]['copy_coupon_btn'];
                copyCouponBtn.classList.remove('copied');
            }, 2000);
        });
    }

    const backToTopButton = document.getElementById('back-to-top');
    if(backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if(preloader) {
            preloader.classList.add('loaded');
        }
        document.body.classList.add('ready');
    });
});
