// Button to scroll to top
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