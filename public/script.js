// Botão de Voltar ao Topo
var topBtn = document.getElementById("topBtn");
var header = document.getElementById("header");

window.onscroll = function () {
    scrollFunction();
    document.querySelectorAll('section').forEach((section) => {
        if (window.scrollY + window.innerHeight >= section.offsetTop) {
          section.classList.add('visible');
        }
      });
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
        header.classList.add("hidden");
    } else {
        topBtn.style.display = "none";
        header.classList.remove("hidden");
    }
}

topBtn.onclick = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};
    
// Controle do Menu Lateral
function toggleMenu() {
    const menuIcon = document.getElementById("menu-icon");
    const sideMenu = document.getElementById("side-menu");
    menuIcon.classList.toggle("active");
    sideMenu.classList.toggle("open");
}

// Efeito Sonoro nos Botões e Links
const interactiveElements = document.querySelectorAll("a, button");

interactiveElements.forEach(element => {
    element.addEventListener("mouseenter", () => {
        const sound = new Audio('https://freesound.org/data/previews/342/342756_5121236-lq.mp3');
        sound.volume = 0.2; // Reduzir o volume para 20%
        sound.play();
    });
});

// Função unificada para rolar o carrossel
function scrollCarousel(direction, section = 'monitores') {
    const carousel = document.querySelector(`.carousel.${section}`);
    if (!carousel) return;
    
    const scrollAmount = 320; // Defina o tamanho do deslocamento
    carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth',
    });
}

// Adicionar animação de fade-in para as imagens do carrossel
document.addEventListener('DOMContentLoaded', function() {
    const carouselImages = document.querySelectorAll('.carousel img');
    
    carouselImages.forEach((img, index) => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            img.style.opacity = '1';
        }, 100 * index);
    });
    
    // Adicionar efeito de hover nos links do menu
    const menuLinks = document.querySelectorAll('#side-menu ul li a');
    
    menuLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Funcionalidade do FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    // Função para filtrar FAQs por categoria
    function filterFAQs(category) {
        faqItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Event listeners para os botões de categoria
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class de todos os botões
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona active class ao botão clicado
            button.classList.add('active');
            // Filtra as FAQs
            filterFAQs(button.dataset.category);
        });
    });
    
    // Event listeners para os itens do FAQ
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alterna o item atual
            item.classList.toggle('active');
        });
    });
    
    // Adicionar animação de entrada para os cards de destaque e notícias
    const cards = document.querySelectorAll('.destaque-card, .noticia-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Adicionar classe 'visible' para animação
    document.querySelectorAll('.destaque-card, .noticia-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('visible');
        });
    });
});

// Validação e envio do formulário de contato
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.querySelector('#name').value,
            email: this.querySelector('#email').value,
            subject: this.querySelector('#subject').value,
            message: this.querySelector('#message').value
        };
        
        try {
            // Validação básica
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showMessage('Por favor, preencha todos os campos do formulário.', 'error');
                return;
            }
            
            // Envia o formulário usando a API
            const response = await API.contact.sendMessage(formData);
            
            if (response.success) {
                showMessage('Mensagem enviada com sucesso!', 'success');
                this.reset();
            } else {
                showMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            showMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
        }
    });
}

// Função para mostrar mensagens de feedback
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <p>${message}</p>
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Função para carregar vídeos da API
async function loadVideos() {
    try {
        const videos = await API.videos.getAll();
        updateVideoSection(videos);
    } catch (error) {
        console.error('Erro ao carregar vídeos:', error);
    }
}

// Função para atualizar a seção de vídeos
function updateVideoSection(videos) {
    const videoContainer = document.querySelector('.video-container');
    if (!videoContainer) return;
    
    videoContainer.innerHTML = videos.map(video => `
        <div class="video-card">
            <img src="${video.thumbnail}" alt="${video.title}">
            <h3>${video.title}</h3>
            <p>${video.description}</p>
            <a href="${video.url}" class="watch-btn">Assistir</a>
        </div>
    `).join('');
}

// Carrega os vídeos quando a página é carregada
document.addEventListener('DOMContentLoaded', loadVideos);
