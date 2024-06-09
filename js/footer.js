const currentPage = window.location.pathname.split("/").pop();

function getImageBasePath() {
    if (currentPage === "index.html") {
        return "./icons/";
    } else if (currentPage === "detalles_compra.html") {
        return "../icons/";
    }
}

const basePath = getImageBasePath();

const iconSrc = `${basePath}${className}.svg`;
const instagramSrc = `${basePath}instagram.svg`;
const facebookSrc = `${basePath}facebook.svg`;



const footer = document.createElement("footer");
footer.className = "contenedor";

const contenedorFooter = createElementWithClass("section", "contenedor__footer");

const whatsappDiv = createContactDiv("whatsapp", "LLAMAME", "(11) 6 508-3824");
const mailDiv = createContactDiv("email", "ESCRIBIME", "cz.corazon.de.chocolate@gmail.com");
const ubicacionDiv = createContactDiv("ubicación", "Florencio Varela", `Buenos Aires<br> Argentina`);
const horarioDiv = createContactDiv("horario", "ABRIMOS", `Lunes a Viernes de 9 hs a 18 hs<br> Sábado de 9 hs a 13 hs<br> Domingo Cerrado`);

appendChildrenToParent(contenedorFooter, [whatsappDiv, mailDiv, ubicacionDiv, horarioDiv]);

const contenedorRedes = createElementWithClass("section", "contenedor__redes");

const redesList = document.createElement("ul");

const instagramLi = createSocialMediaLink("https://www.instagram.com/corazon.de.chocolate.cz", `${basePath}instagram.svg`, "Ícono de Instagram");
const facebookLi = createSocialMediaLink("https://www.facebook.com/CZ.corazon.de.chocolate", `${basePath}facebook.svg`, "Ícono de Facebook");

appendChildrenToParent(redesList, [instagramLi, facebookLi]);
contenedorRedes.appendChild(redesList);
footer.appendChild(contenedorFooter);
footer.appendChild(contenedorRedes);
document.body.appendChild(footer);



function createElementWithClass(elementType, className) {
    const element = document.createElement(elementType);
    element.className = className;

    return element;
}



function createContactDiv(className, title, ...text) {
    const div = createElementWithClass("div", className);
    const ul = document.createElement("ul");

    const liIcon = document.createElement("li");
    const icon = document.createElement("img");
    icon.src = `${basePath}${className}.svg`;
    icon.alt = `Ícono de ${title}`;
    icon.className = "icon";

    liIcon.appendChild(icon);
    ul.appendChild(liIcon);

    const liText = document.createElement("li");
    const h2 = document.createElement("h2");
    h2.textContent = title;

    liText.appendChild(h2);

    const h3 = document.createElement("h3");
    h3.innerHTML = text.join(`<br>`);

    liText.appendChild(h3);
    ul.appendChild(liText);
    div.appendChild(ul);

    return div;
}



function createSocialMediaLink(href, src, alt) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = href;
    a.target = `_blank`;

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.className = "ired";

    a.appendChild(img);
    li.appendChild(a);

    return li;
}



function appendChildrenToParent(parent, children) {
    children.forEach(child => {
        parent.appendChild(child);
    });
}
