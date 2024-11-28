// Controle do Menu Lateral
function toggleMenu() {
    const menuIcon = document.getElementById("menu-icon");
    const sideMenu = document.getElementById("side-menu");
    menuIcon.classList.toggle("active");
    sideMenu.classList.toggle("open");
}

// Efeito Sonoro nos Links
const buttons = document.querySelectorAll("a, button");
buttons.forEach(button => {
    button.addEventListener("mouseenter", () => {
        const sound = new Audio('https://freesound.org/data/previews/342/342756_5121236-lq.mp3');
        sound.play();
    });
});



var topBtn = document.getElementById("topBtn");
        window.onscroll = function() {scrollFunction()};
        var header = document.getElementById("header");

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                topBtn.style.display = "block";
                header.classList.add("hidden");
            } else {
                topBtn.style.display = "none";
                header.classList.remove("hidden");
            }
        }

topBtn.onclick = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

