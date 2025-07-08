document.addEventListener('DOMContentLoaded', function() {
    // --- DICIONÁRIO DE TRADUÇÕES ---
    const translations = {
        'pt': {
            slogan: 'Delícias feitas com amor.',
            connect_prompt: 'Faça seu pedido ou conecte-se:',
            whatsapp_button: 'Pedir no WhatsApp',
            whatsapp_message: 'Olá! Gostaria de fazer um pedido ou tenho uma pergunta.',
            footer_text: '&copy; 2025 Caribbean Sweets'
        },
        'en': {
            slogan: 'Delights made with love.',
            connect_prompt: 'Place your order or connect:',
            whatsapp_button: 'Order on WhatsApp',
            whatsapp_message: 'Hello! I would like to place an order or I have a question.',
            footer_text: '&copy; 2025 Caribbean Sweets'
        },
        'es': {
            slogan: 'Delicias hechas com amor.',
            connect_prompt: 'Realiza tu pedido o conéctate:',
            whatsapp_button: 'Pregunta en WhatsApp',
            whatsapp_message: '¡Hola! Me gustaría hacer un pedido o tengo una pregunta.',
            footer_text: '&copy; 2025 Caribbean Sweets'
        }
    };

    // --- FUNÇÃO PARA MUDAR O IDIOMA ---
    const changeLanguage = (lang) => {
        // Traduz todos os elementos marcados
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.dataset.translateKey;
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
        
        // Atualiza o link do WhatsApp com o número e a mensagem correta
        const whatsappLink = document.getElementById('whatsapp-link');
        if (whatsappLink) {
            const encodedMessage = encodeURIComponent(translations[lang]['whatsapp_message']);
            const numeroWhatsapp = '19179221148'; // Número correto
            whatsappLink.href = `https://wa.me/${numeroWhatsapp}?text=${encodedMessage}`;
        }

        // Atualiza o idioma principal da página para acessibilidade
        document.documentElement.lang = lang;
    };

    // Adiciona os eventos de clique nos botões de idioma
    document.querySelectorAll('.language-switcher button').forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.dataset.lang;
            changeLanguage(selectedLang);
        });
    });

    // Detecta o idioma do navegador e define o idioma padrão da página
    const userLang = navigator.language.split('-')[0];
    const defaultLang = ['pt', 'en', 'es'].includes(userLang) ? userLang : 'es';
    changeLanguage(defaultLang);

    // --- LÓGICA DO MODO ESCURO ---
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

    // Aplica o tema salvo ou o padrão (claro) na primeira visita
    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    // Adiciona o evento de clique para trocar o tema
    darkModeToggle.addEventListener('click', () => {
        let newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
});