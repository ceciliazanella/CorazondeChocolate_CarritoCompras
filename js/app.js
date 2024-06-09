async function obtenerTortasDesdeJSON() {
    try {
        const respuesta = await fetch("./json/tortas_artesanales.json");

        if (!respuesta.ok) {
            throw new Error("La Respuesta no tuvo éxito...");
        }

        const datos = await respuesta.json();
        console.log(datos);

        const tortasArtesanales = datos.tortasArtesanales;

        mostrarProductos(tortasArtesanales);

        return tortasArtesanales;
    } catch (error) {
        console.error("Hubo un problema al querer obtener los Datos sobre las Tortas Artesanales...", error);
    }
};

async function inicializar() {
    await obtenerTortasDesdeJSON();

    let usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado")) || null;

    if (usuarioLogueado) {
        console.info("El Usuario está logueado en su Sesión.");

        cerrarSesion();
    } else {
        console.info("El Usuario no está logueado.");
    }
}

document.addEventListener("DOMContentLoaded", inicializar);



if (window.location.pathname.includes("index.html")) {
    let usuarioLogueado = localStorage.getItem("usuarioLogueado");
    let productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (usuarioLogueado !== null & productosCarrito.length > 0) {
        mostrarAlerta(`¡Tenés productos en tu carrito!<br> <i class="bi bi-cart-fill"></i><br> ¡No te olvides de utilizar tu código de descuento!<br> <i class="bi bi-percent"></i>`, "info");
        console.info("Hay productos en el carrito.");
    }
}



function mostrarProductos(tortas) {
    const contenedor = document.getElementById("tarjetasTortas");
    if (!contenedor) return;
    contenedor.innerHTML = " ";

    tortas.forEach(torta => {
        const tarjeta = generarTarjetaProducto(torta);

        contenedor.appendChild(tarjeta);
    });
}

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

    const precio = document.createElement("h3");
    precio.innerHTML = `<i class="bi bi-bag-heart"></i> Precio: $ ${torta.precio}`;

    tarjeta.appendChild(precio);

    const cantidadInput = document.createElement("input");
    cantidadInput.type = "number";
    cantidadInput.value = 1;
    cantidadInput.min = 1;
    cantidadInput.classList.add("cantidad_input");

    tarjeta.appendChild(cantidadInput);

    const agregarBtn = document.createElement("button");
    agregarBtn.innerHTML = `Agregar al <i class="bi bi-cart-plus"></i>`;

    agregarBtn.addEventListener("click", () => {
        agregarAlCarrito(torta.id, parseInt(cantidadInput.value));

        console.log(`Se agregó/agregaron ${parseInt(cantidadInput.value)} Unidad/es de ${torta.nombre} al Carrito.`);
    });

    agregarBtn.addEventListener("mouseover", () => {
        agregarBtn.classList.add("hovered");
    });

    agregarBtn.addEventListener("mouseout", () => {
        agregarBtn.classList.remove("hovered");
    });

    tarjeta.appendChild(agregarBtn);

    return tarjeta;
}



function cerrarSesion() {
    const header = document.querySelector("header");
    let botonCerrarSesion = document.getElementById("botonCerrarSesion");

    if (!botonCerrarSesion) {
        botonCerrarSesion = document.createElement("button");
        botonCerrarSesion.id = "botonCerrarSesion";
        botonCerrarSesion.className = "botonCerrarSesion";
        botonCerrarSesion.textContent = "CERRAR SESIÓN";

        botonCerrarSesion.addEventListener("click", () => {

            mostrarAlerta(`¿Estás seguro/a que querés Cerrar tu Chocosesión?<br> <i class="bi bi-door-closed-fill"></i>`,
                "warning",
                true,
                () => {

                    localStorage.removeItem("usuarioLogueado");

                    console.log("El Usuario cerró su Sesión.");

                    setTimeout(() => {
                        mostrarAlerta(`Tu Chocosesión se cerró exitosamente !<br> <i class="bi bi-emoji-laughing"></i>`, "success");
                    }, 500);

                    setTimeout(() => {
                        window.location.href = window.location.href;
                    }, 2000);
                });
        });

        botonCerrarSesion.addEventListener("mouseover", () => {
            botonCerrarSesion.classList.add("hovered");
        });
        botonCerrarSesion.addEventListener("mouseout", () => {
            botonCerrarSesion.classList.remove("hovered");
        });

        header.appendChild(botonCerrarSesion);
    }
}



function mostrarAlerta(mensaje, tipo, conBotones = false, callbackAceptar = null, callbackCancelar = null) {
    if (conBotones) {
        Swal.fire({
            icon: tipo,
            iconHtml: `<i class="bi bi-emoji-neutral"></i><br>`,
            iconColor: "#bc8034",
            animation: true,
            html: mensaje,
            showCancelButton: true,
            confirmButtonColor: "#bc8034",
            cancelButtonColor: "#90323d",
            confirmButtonText: `<i class="bi bi-check-square"></i>`,
            cancelButtonText: `<i class="bi bi-x-square"></i>`,
        }).then((result) => {
            if (result.isConfirmed) {
                if (callbackAceptar) callbackAceptar();
            } else {
                if (callbackCancelar) callbackCancelar();
            }
        });
    } else {
        Toastify({
            text: mensaje,
            duration: 3000,
            style: {
                background: tipo === "success" ? "#d9cab3" : tipo === "warning" ? "#bc8034" : tipo === "info" ? "#d9cab3" : tipo === "error" ? "#5e0b15" : "#5e0b15",
                borderColor: tipo === "success" ? "#90323d" : tipo === "warning" ? "#5e0b15" : tipo === "info" ? "#5e0b15" : tipo === "error" ? "#bc8034" : "#d9cab3",
                color: tipo === "success" ? "#90323d" : tipo === "warning" ? "#5e0b15" : tipo === "info" ? "#5e0b15" : tipo === "error" ? "#bc8034" : "#d9cab3",
            },
            close: false,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            className: "alertaToastify",
            escapeMarkup: false
        }).showToast();
    }
}



function renderizarBuscador() {
    const buscadorProductos = document.getElementById("buscador-productos");
    if (!buscadorProductos) return;

    const buscador = document.createElement("h2");
    buscador.innerHTML = `<h2>Encontrá</br>tu torta favorita !</h2><i class="bi bi-search-heart"></i>`;

    buscadorProductos.appendChild(buscador);

    async function filtrarTortasPorNombre(nombre) {
        let tortasArtesanales = await obtenerTortasDesdeJSON();
        let nombreBuscado = nombre.trim().toLowerCase();
        let tortasFiltradas = tortasArtesanales.filter(torta => torta.nombre.toLowerCase().includes(nombreBuscado));

        mostrarProductos(tortasFiltradas);
        console.log("Mostrando Resultados de la Búsqueda.");
    }

    const inputBuscar = document.getElementById("input-buscar");

    inputBuscar.addEventListener("input", (event) => {
        let textoBuscado = event.target.value;

        filtrarTortasPorNombre(textoBuscado);

        console.log("Se ingresó Dato en Buscador.");
    });

    inputBuscar.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            let textoBuscado = event.target.value;

            filtrarTortasPorNombre(textoBuscado);

            inputBuscar.value = " ";
        }
    });
}

renderizarBuscador();



window.addEventListener("load", () => {
    let carritoGuardado = localStorage.getItem("carrito");

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);

        actualizarProductosCarrito();
        actualizarTotalCarrito();
    }
});

let carrito = [];
let contenedorCarrito;
let productosCarrito;

function renderizarCarrito() {
    const iconCarrito = document.getElementById("icon-carrito");
    contenedorCarrito = document.getElementById("contenedorCarrito");
    productosCarrito = document.getElementById("productos-carrito");
    if (!iconCarrito & !contenedorCarrito & !productosCarrito) return;

    iconCarrito.addEventListener("click", () => {
        contenedorCarrito.style.display = "flex";
    });

    iconCarrito.addEventListener("mouseover", () => {
        iconCarrito.classList.add("ampliar");
    });

    iconCarrito.addEventListener("mouseout", () => {
        iconCarrito.classList.remove("ampliar");
    });

    const headerCarrito = document.createElement("div");
    headerCarrito.className = "header_carrito---titulo";
    headerCarrito.innerHTML = `<i class="bi bi-cart-fill"></i><h2>CARRITO</h2>`;

    contenedorCarrito.appendChild(headerCarrito);

    let btnCloseCarrito = document.createElement("button");
    btnCloseCarrito.className = "header_carrito---btn";
    btnCloseCarrito.innerHTML = `<i class="bi bi-x-circle"></i>`;

    headerCarrito.appendChild(btnCloseCarrito);

    btnCloseCarrito.addEventListener("click", () => {
        contenedorCarrito.style.display = "none";
    });

    btnCloseCarrito = document.querySelector(".header_carrito---btn");

    btnCloseCarrito.addEventListener("mouseover", () => {
        btnCloseCarrito.classList.add("hovered");
    });

    btnCloseCarrito.addEventListener("mouseout", () => {
        btnCloseCarrito.classList.remove("hovered");
    });

    productosCarrito = document.createElement("div");
    productosCarrito.id = "productos-carrito";

    contenedorCarrito.appendChild(productosCarrito);
}

renderizarCarrito();

function actualizarProductosCarrito() {
    if (productosCarrito) {
        productosCarrito.innerHTML = " ";

        carrito.forEach(item => {
            let itemDiv = document.createElement("div");
            itemDiv.className = "item_carrito";

            let nombreProducto = document.createElement("h3");
            nombreProducto.textContent = item.nombre;

            itemDiv.appendChild(nombreProducto);

            let imagenProductoDiv = document.createElement("div");
            imagenProductoDiv.className = "imagen_producto---carrito";

            let imagenProducto = document.createElement("img");
            imagenProducto.src = item.img;
            imagenProducto.alt = item.nombre;

            imagenProductoDiv.appendChild(imagenProducto);
            itemDiv.appendChild(imagenProductoDiv);

            let unidadDiv = document.createElement("div");
            unidadDiv.className = "unidad";

            let restarBtn = document.createElement("button");
            restarBtn.innerHTML = `<i class="bi bi-file-minus"></i>`;

            restarBtn.addEventListener("click", () => restarUnidad(item.id));

            unidadDiv.appendChild(restarBtn);

            let cantidadUnidades = document.createElement("h4");
            cantidadUnidades.textContent = `Unidad/es: ${item.unidad}`;

            unidadDiv.appendChild(cantidadUnidades);

            let sumarBtn = document.createElement("button");
            sumarBtn.innerHTML = '<i class="bi bi-file-plus"></i>';

            sumarBtn.addEventListener("click", () => sumarUnidad(item.id));

            unidadDiv.appendChild(sumarBtn);
            itemDiv.appendChild(unidadDiv);

            let precioDiv = document.createElement("div");
            precioDiv.className = "precio";

            let precioUnitario = document.createElement("h5");
            precioUnitario.innerHTML = `<i class="bi bi-bag-heart-fill"></i> Precio Unitario: $ ${item.precio}`;

            let precioTotal = document.createElement("h5");
            precioTotal.innerHTML = `<i class="bi bi-cash-coin"></i> Precio Total: $ ${item.unidad * item.precio}`;

            precioDiv.appendChild(precioUnitario);
            precioDiv.appendChild(precioTotal);
            itemDiv.appendChild(precioDiv);

            let eliminarBtn = document.createElement("button");
            eliminarBtn.innerHTML = `<i class="bi bi-trash3-fill"></i>`;

            eliminarBtn.addEventListener("click", () => eliminarDelCarrito(item.id));

            itemDiv.appendChild(eliminarBtn);

            let hr = document.createElement("hr");
            itemDiv.appendChild(hr);

            productosCarrito.appendChild(itemDiv);
        });
    } else {
        console.info("El Carrito está vacío.");
    }
}



class Torta {
    constructor(id, nombre, img, precio, unidad, tittle) {
        this.id = id;
        this.nombre = nombre;
        this.img = img;
        this.precio = precio;
        this.unidad = unidad;
        this.tittle = tittle;
    }
}

async function agregarAlCarrito(id, cantidad) {
    try {
        let tortasArtesanales = await obtenerTortasDesdeJSON();
        let torta = tortasArtesanales.find(torta => torta.id === id);

        if (!torta) {
            throw new Error(`La Torta con el ID ${id} no fue encontrada...`);
        }

        if (cantidad <= 0) {
            mostrarAlerta(`Tenés que seleccionar una Cantidad que sea Mayor a 0...<br> <i class="bi bi-emoji-astonished"></i>`, "warning");

            return;
        }

        let index = carrito.findIndex(item => item.id === id);

        if (index !== -1) {
            carrito[index].unidad += cantidad;
        } else {
            carrito.push(new Torta(torta.id, torta.nombre, torta.img, torta.precio, cantidad));
        }
        mostrarAlerta(`<i class="bi bi-cart-check"></i><br> Agregaste tu ${torta.nombre} con éxito a tu Carrito !<br> <i class="bi bi-emoji-wink"></i>`, "success");

        actualizarProductosCarrito();
        actualizarTotalCarrito();
        actualizarLocalStorageCarrito();
    } catch (error) {
        console.error("Hubo un problema al agregar esta Torta al Carrito...", error);
    }
}

function sumarUnidad(id) {
    const index = carrito.findIndex(item => item.id === id);

    if (index !== -1) {
        carrito[index].unidad++;

        console.log(`Se sumó Unidad de ${carrito[index].nombre} en el Carrito.`);

        actualizarProductosCarrito();
        actualizarTotalCarrito();
        actualizarLocalStorageCarrito();
    }
}

function restarUnidad(id) {
    const index = carrito.findIndex(item => item.id === id);

    if (index !== -1 && carrito[index].unidad > 1) {
        carrito[index].unidad--;

        console.log(`Se restó Unidad de ${carrito[index].nombre} en el Carrito.`);

        actualizarProductosCarrito();
        actualizarTotalCarrito();
        actualizarLocalStorageCarrito();
    }
}

function productoCarrito(id) {
    return carrito.find(item => item.id === id);
}

function eliminarDelCarrito(id) {
    const productoEliminar = productoCarrito(id);

    mostrarAlerta(`¿Estás seguro/a que querés eliminar tu ${productoEliminar.nombre} de tu Carrito...?<br> <i class="bi bi-cart-x"></i>`,
        "warning",
        true,
        () => {
            carrito = carrito.filter(item => item.id !== id);

            mostrarAlerta(`<i class="bi bi-cart-dash"></i><br> Eliminamos con éxito tu ${productoEliminar.nombre} de tu Carrito !`, "success");
            console.log(`${productoEliminar.nombre} se eliminó del Carrito.`);

            actualizarProductosCarrito();
            actualizarTotalCarrito();
            actualizarLocalStorageCarrito();
        },

        () => {
            mostrarAlerta(`<i class="bi bi-emoji-wink"></i><br> No eliminamos tu ${productoEliminar.nombre} de tu Carrito !`, "success");
            console.log(`${productoEliminar.nombre} no se eliminó del Carrito.`);
        });
}



function actualizarLocalStorageCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}



function calcularTotalCarrito() {
    let totalCarrito = 0;

    carrito.forEach(item => {
        totalCarrito += item.precio * item.unidad;
    });

    return totalCarrito;
}

let codigoDescuentoDiv;
let codigoDescuentoInput;
let codigoDescuentoButton;

function aplicarDescuento() {
    codigoDescuentoDiv = document.createElement("div");
    codigoDescuentoDiv.className = "codigo_descuento";
    codigoDescuentoDiv.innerHTML = `
        <div>
            <h2>Código de Descuento</h2>
        </div>`;

    contenedorCarrito = document.getElementById("contenedorCarrito");
    if (!contenedorCarrito) return;
    contenedorCarrito.appendChild(codigoDescuentoDiv);

    codigoDescuentoInput = document.createElement("input");
    codigoDescuentoInput.setAttribute("placeholder", "Código de Descuento");

    codigoDescuentoDiv.appendChild(codigoDescuentoInput);

    codigoDescuentoButton = document.createElement("button");
    codigoDescuentoButton.className = "codigoDescuentoBtn";
    codigoDescuentoButton.textContent = "Aplicar Descuento";

    codigoDescuentoDiv.appendChild(codigoDescuentoButton);

    codigoDescuentoButton.addEventListener("mouseover", () => {
        codigoDescuentoButton.classList.add("remarcar");
    });

    codigoDescuentoButton.addEventListener("mouseout", () => {
        codigoDescuentoButton.classList.remove("remarcar");
    });

    codigoDescuentoButton.addEventListener("click", () => {
        let totalCarritoActual = calcularTotalCarrito();
        let codigoIngresado = codigoDescuentoInput.value;
        let descuento = 0;

        if (codigoIngresado === "cielodejupiter") {
            descuento = totalCarritoActual * 0.2;

            mostrarAlerta(`<i class="bi bi-emoji-wink"></i><br> ¡Eso!<br><i class="bi bi-percent"></i><br> ---> ¡Tienes un 20% de Descuento en esta Compra!`, "success");
            console.log("Código de Descuento Válido. Se realiza el 20% de Descuento sobre la Compra Total.");

            localStorage.setItem("descuento", descuento);

            codigoDescuentoDiv.style.display = "none";

        } else {
            intentosCodigoDescuento++;

            mostrarAlerta(`<i class="bi bi-exclamation-circle-fill"></i><br> ¡Ouch!<br> ¡Ese Código no está bien...!<br><i class="bi bi-emoji-grimace"></i><br> ¡Inténtalo de nuevo!`, "error");
            console.log("Código de Descuento inválido.");

            if (intentosCodigoDescuento >= 3) {
                codigoDescuentoDiv.style.display = "none";

                mostrarAlerta(`<i class="bi bi-ban"></i><br> ¡Será en otra oportunidad!<br><i class="bi bi-emoji-tear"></i><br> ¡Excediste el número de intentos permitidos!`, "error");
                console.log("Excedió los 3 Intentos para ingresar el Código de Descuento válido. No se aplica Descuento.");
            }
        }
        actualizarTotalCarrito();
    });
}

aplicarDescuento();

let codigoDescuento = " ";
let intentosCodigoDescuento = 0;

let totalCarritoDiv;

function inicializarTotalCarrito() {
    totalCarritoDiv = document.createElement("div");
    totalCarritoDiv.id = "total-carrito";

    if (!contenedorCarrito) return;
    contenedorCarrito.appendChild(totalCarritoDiv);
}

inicializarTotalCarrito();

function actualizarTotalCarrito() {
    let totalCarrito = calcularTotalCarrito();
    let descuentoAplicado = localStorage.getItem("descuento");
    let descuento = descuentoAplicado ? parseFloat(descuentoAplicado) : 0;
    let totalConDescuento = totalCarrito - descuento;

    totalCarritoDiv.className = "total_carrito";
    totalCarritoDiv.innerHTML = `
        <h2><i class="bi bi-cart3"></i> Total Carrito: $ ${totalCarrito.toFixed(2)}</h2>
        <h3><i class="bi bi-percent"></i> Descuento: $ ${descuento.toFixed(2)}</h3>
        <h3><i class="bi bi-currency-dollar"></i> Total a Pagar: $ ${totalConDescuento.toFixed(2)}</h3>`;

    localStorage.setItem("descuento", descuento);
}

let btnFinalizarCompra;

function finalizarCompra() {
    btnFinalizarCompra = document.createElement("button");
    btnFinalizarCompra.className = "btn_finalizar";
    btnFinalizarCompra.textContent = "COMPRAR";

    contenedorCarrito = document.getElementById("contenedorCarrito");
    if (!contenedorCarrito) return;
    contenedorCarrito.appendChild(btnFinalizarCompra);

    btnFinalizarCompra.addEventListener("click", () => {
        if (carrito.length === 0) {
            mostrarAlerta(`<i class="bi bi-exclamation-triangle-fill"></i><br> Mmm... <i class="bi bi-emoji-frown"></i><br> No tenés nada en tu Carrito para comprar...`, "warning");
        } else {
            window.location.replace("./pages/detalles_compra.html");
        }
    });

    btnFinalizarCompra.addEventListener("mouseover", () => {
        btnFinalizarCompra.classList.add("comprar");
    });

    btnFinalizarCompra.addEventListener("mouseout", () => {
        btnFinalizarCompra.classList.remove("comprar");
    });
}

finalizarCompra();

function resetearDescuento() {
    localStorage.removeItem("descuento");

    actualizarTotalCarrito();
}

let btnVaciarCarrito;

function vaciarCarrito() {
    btnVaciarCarrito = document.createElement("button");
    btnVaciarCarrito.className = "vaciarCarritoBtn";
    btnVaciarCarrito.innerHTML = `<i class="bi bi-cart-dash"></i><br>Vaciar Carrito`;

    contenedorCarrito = document.getElementById("contenedorCarrito");
    if (!contenedorCarrito) {
        console.info("Los Productos del Carrito están informados en el Detalle de Compra.");
        return
    }
    contenedorCarrito.appendChild(btnVaciarCarrito);

    btnVaciarCarrito.addEventListener("click", () => {
        carrito = [];

        console.log("Se vació el Carrito.");

        resetearDescuento();
        actualizarProductosCarrito();
        actualizarTotalCarrito();
        actualizarLocalStorageCarrito();
    });

    btnVaciarCarrito.addEventListener("mouseover", () => {
        btnVaciarCarrito.classList.add("remarcar");
    });

    btnVaciarCarrito.addEventListener("mouseout", () => {
        btnVaciarCarrito.classList.remove("remarcar");
    });
}

vaciarCarrito();


