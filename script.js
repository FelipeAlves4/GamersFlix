
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
        sound.play();
    });
});


