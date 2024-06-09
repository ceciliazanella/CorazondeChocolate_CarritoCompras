const paginaActual = window.location.pathname;

function obtenerRutaLogo() {
    return paginaActual.includes("detalles_compra.html") ? "../logo/" : "./logo/";
}

const logoImg = document.createElement("img");
logoImg.src = obtenerRutaLogo() + "logo.svg";
logoImg.alt = "Logo de Corazón de Chocolate";
logoImg.className = "logo";

const logoContainer = document.querySelector(".logo");

logoContainer.appendChild(logoImg);



document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes("index.html")) {
        const headerTextContainer = document.querySelector(".header-text");

        const h1 = document.createElement("h1");
        h1.textContent = "La Chocotienda";

        const h2 = document.createElement("h2");
        h2.textContent = "de la Pastelería más creativa y artesanal";

        headerTextContainer.appendChild(h1);
        headerTextContainer.appendChild(h2);
    }
});
