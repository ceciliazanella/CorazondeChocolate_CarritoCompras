class Torta {

    constructor(id, nombre, img, precio, unidad) {

        this.id = id;
        this.nombre = nombre;
        this.img = img;
        this.precio = precio;
        this.unidad = unidad;

    }

}

const tortasArtesanalesData = [

    [1, "Torta Lemmon Pie", "./images_menu_tortas_artesanales/1_lemmon_pie.webp", 16500, 1],
    [2, "Cheese Cake Frutos Rojos", "./images_menu_tortas_artesanales/2_cheesecake_frutosrojos.webp", 26000, 1],
    [3, "Crumble de Manzana", "./images_menu_tortas_artesanales/3_crumble_manzana.webp", 16500, 1],
    [4, "Chocotorta", "./images_menu_tortas_artesanales/4_chocotorta.webp", 25000, 1],
    [5, "Tarta Frutal", "./images_menu_tortas_artesanales/5_tarta_frutal.webp", 16500, 1],
    [6, "Postre Balcarse", "./images_menu_tortas_artesanales/6_postre_balcarse.webp", 25000, 1],
    [7, "Torta Brownie Clásica", "./images_menu_tortas_artesanales/7_torta_brownie.webp", 20000, 1],
    [8, "Torta Selva Negra", "./images_menu_tortas_artesanales/8_selva_negra.webp", 30000, 1],
    [9, "Torta Doble Oreo", "./images_menu_tortas_artesanales/9_torta_doble_oreo.webp", 26000, 1],
    [10, "Torta Explosión Oreo", "./images_menu_tortas_artesanales/10_torta_explosion_oreo.webp", 26000, 1]

];

const tortasArtesanales = tortasArtesanalesData.map(tortaData => new Torta(...tortaData));

function generarTarjetaProducto(torta) {

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta_producto");

    const nombre = document.createElement("h2");
    nombre.textContent = torta.nombre;

    tarjeta.appendChild(nombre);

    const fotoProducto = document.createElement("div");
    fotoProducto.classList.add("foto_producto");

    const imagen = document.createElement("img");
    imagen.src = torta.img;
    imagen.alt = torta.nombre;

    fotoProducto.appendChild(imagen);
    tarjeta.appendChild(fotoProducto);

    let precio = document.createElement("h3");
    precio.innerHTML = `<i class="bi bi-bag-heart"></i> Precio: $ ${torta.precio}`;

    tarjeta.appendChild(precio);

    let cantidadInput = document.createElement("input");
    cantidadInput.type = "number";
    cantidadInput.value = 1;
    cantidadInput.min = 1;
    cantidadInput.classList.add("cantidad_input");

    tarjeta.appendChild(cantidadInput);

    let agregarBtn = document.createElement("button");
    agregarBtn.innerHTML = 'Agregar al <i class="bi bi-cart-plus"></i>';

    agregarBtn.addEventListener("click", () => agregarAlCarrito(torta.id, parseInt(cantidadInput.value)));

    tarjeta.appendChild(agregarBtn);

    agregarBtn.addEventListener("mouseover", () => {

        agregarBtn.classList.add("hovered");

    });

    agregarBtn.addEventListener("mouseout", () => {

        agregarBtn.classList.remove("hovered");
        
    });

    return tarjeta;

}

function mostrarProductos(tortas) {

    const contenedor = document.getElementById("tarjetasTortas");

    contenedor.innerHTML = '';

    tortas.forEach(torta => {

        let tarjeta = generarTarjetaProducto(torta);

        contenedor.appendChild(tarjeta);

    });

}

mostrarProductos(tortasArtesanales);

