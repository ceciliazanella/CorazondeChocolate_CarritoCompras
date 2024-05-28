const tarjetasTortas = document.getElementById("tarjetasTortas");
const mensajeAlerta = document.getElementById("mensaje-alerta");
const inputBuscar = document.getElementById("input-buscar");
const buscadorProductos = document.getElementById("buscador-productos");
const iconCarrito = document.getElementById("icon-carrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");



document.addEventListener("DOMContentLoaded", () => {

    mostrarProductos(tortasArtesanales);

    let usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado")) || null;

    if (usuarioLogueado) {

        agregarBotonCerrarSesion();

    }

});

function agregarBotonCerrarSesion() {

    const header = document.querySelector("header");

    let botonCerrarSesion = document.getElementById("botonCerrarSesion");

    if (!botonCerrarSesion) {

        botonCerrarSesion = document.createElement("button");
        botonCerrarSesion.id = "botonCerrarSesion";
        botonCerrarSesion.className = "botonCerrarSesion";
        botonCerrarSesion.textContent = "CERRAR SESIÓN";

        botonCerrarSesion.addEventListener("click", cerrarSesion);

        botonCerrarSesion.addEventListener("mouseover", () => {

            botonCerrarSesion.classList.add("hovered");

        });

        botonCerrarSesion.addEventListener("mouseout", () => {

            botonCerrarSesion.classList.remove("hovered");

        });

        header.appendChild(botonCerrarSesion);

    }

}

function cerrarSesion() {

    localStorage.removeItem("usuarioLogueado");

    setTimeout(() => {

        mostrarAlerta('Tu Chocosesión se cerró exitosamente !<br> <i class="bi bi-emoji-laughing"></i>', "exito");

    }, 500);

    setTimeout(() => {

        window.location.href = window.location.href;

    }, 2000);

}



function mostrarAlerta(mensaje, tipo, conBotones = false, callbackAceptar = null, callbackCancelar = null) {

    let alerta = document.createElement("div");
    alerta.className = `alerta ${tipo}`;
    alerta.style.opacity = 1;

    let mensajeTexto = document.createElement("p");
    mensajeTexto.innerHTML = mensaje;

    alerta.appendChild(mensajeTexto);

    if (conBotones) {

        let botonesDiv = document.createElement("div");
        botonesDiv.style.marginTop = "1rem";

        let botonAceptar = document.createElement("button");
        botonAceptar.innerHTML = '<i class="bi bi-check-square"></i>';
        botonAceptar.className = "btn-aceptar";

        botonAceptar.addEventListener("click", () => {

            if (callbackAceptar) callbackAceptar();

            mensajeAlerta.removeChild(alerta);

        });

        botonAceptar.addEventListener("mouseover", () => {

            botonAceptar.classList.add("hovered");

        });

        botonAceptar.addEventListener("mouseout", () => {

            botonAceptar.classList.remove("hovered");

        });

        let botonCancelar = document.createElement("button");
        botonCancelar.innerHTML = '<i class="bi bi-x-square"></i>';
        botonCancelar.className = "btn-cancelar";

        botonCancelar.addEventListener("click", () => {

            if (callbackCancelar) callbackCancelar();

            mensajeAlerta.removeChild(alerta);

        });

        botonCancelar.addEventListener("mouseover", () => {

            botonCancelar.classList.add("hovered");

        });

        botonCancelar.addEventListener("mouseout", () => {

            botonCancelar.classList.remove("hovered");
        });

        botonesDiv.appendChild(botonAceptar);
        botonesDiv.appendChild(botonCancelar);
        alerta.appendChild(botonesDiv);

    }

    let mensajeAlerta = document.getElementById("mensaje-alerta");

    mensajeAlerta.appendChild(alerta);

    if (!conBotones) {

        setTimeout(() => {

            alerta.style.opacity = 0;

            setTimeout(() => {

                mensajeAlerta.removeChild(alerta);

            }, 1000);

        }, 3000);

    }

}



const buscador = document.createElement("h2");
buscador.innerHTML = `<h2>Encontrá</br>tu torta favorita !</h2><i class="bi bi-search-heart"></i>`;

buscadorProductos.appendChild(buscador);

function filtrarTortasPorNombre(nombre) {

    let nombreBuscado = nombre.trim().toLowerCase();

    let tortasFiltradas = tortasArtesanales.filter(torta => torta.nombre.toLowerCase().includes(nombreBuscado));

    mostrarProductos(tortasFiltradas);

}

inputBuscar.addEventListener("input", (event) => {

    let textoBuscado = event.target.value;

    filtrarTortasPorNombre(textoBuscado);

});

inputBuscar.addEventListener("keyup", (event) => {

    if (event.key === "Enter") {

        let textoBuscado = event.target.value;

        filtrarTortasPorNombre(textoBuscado);

        inputBuscar.value = '';
    }

});



let carrito = [];

window.addEventListener("load", () => {

    let carritoGuardado = localStorage.getItem("carrito");

    if (carritoGuardado) {

        carrito = JSON.parse(carritoGuardado);

        actualizarProductosCarrito();
        actualizarTotalCarrito();

    }

});

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

btnCloseCarrito.addEventListener("mouseover", function () {

    btnCloseCarrito.classList.add("hovered");

});

btnCloseCarrito.addEventListener("mouseout", function () {

    btnCloseCarrito.classList.remove("hovered");

});

let productosCarrito = document.createElement("div");
productosCarrito.id = "productos-carrito";

contenedorCarrito.appendChild(productosCarrito);



function agregarAlCarrito(id, cantidad) {

    let torta = tortasArtesanales.find(torta => torta.id === id);

    if (cantidad <= 0) {

        mostrarAlerta('Tenés que seleccionar una Cantidad que sea Mayor a 0...<br> <i class="bi bi-emoji-astonished"></i>', "advertencia");

        return;
    }

    let index = carrito.findIndex(item => item.id === id);

    if (index !== -1) {

        carrito[index].unidad += cantidad;

    } else {

        carrito.push(new Torta(torta.id, torta.nombre, torta.img, torta.precio, cantidad));

    }

    mostrarAlerta(`<i class="bi bi-cart-check"></i><br> Agregaste tu ${torta.nombre} con éxito a tu Carrito !<br> <i class="bi bi-emoji-wink"></i>`, "exito");

    actualizarProductosCarrito();
    actualizarTotalCarrito();
    actualizarLocalStorageCarrito();

}

function actualizarLocalStorageCarrito() {

    localStorage.setItem("carrito", JSON.stringify(carrito));

}



function sumarUnidad(id) {

    const index = carrito.findIndex(item => item.id === id);

    if (index !== -1) {

        carrito[index].unidad++;

        actualizarProductosCarrito();
        actualizarTotalCarrito();
        actualizarLocalStorageCarrito();

    }

}



function restarUnidad(id) {

    const index = carrito.findIndex(item => item.id === id);

    if (index !== -1 && carrito[index].unidad > 1) {

        carrito[index].unidad--;

        actualizarProductosCarrito();
        actualizarTotalCarrito();
        actualizarLocalStorageCarrito();

    }

}



function eliminarDelCarrito(id) {

    const productoEliminar = productoCarrito(id);

    mostrarAlerta(` <i class="bi bi-emoji-neutral"></i><br> ¿Estás seguro/a que querés eliminar tu ${productoEliminar.nombre} de tu Carrito...?<br> <i class="bi bi-cart-x"></i>`,
        "advertencia",

        true,

        () => {

            carrito = carrito.filter(item => item.id !== id);

            mostrarAlerta(`<i class="bi bi-cart-dash"></i><br> Eliminamos con éxito tu ${productoEliminar.nombre} de tu Carrito !`, "exito");

            actualizarProductosCarrito();
            actualizarTotalCarrito();
            actualizarLocalStorageCarrito();

        },

        () => {

            mostrarAlerta(`<i class="bi bi-emoji-wink"></i><br> No eliminamos tu ${productoEliminar.nombre} de tu Carrito !`, "exito");

        });

}



function productoCarrito(id) {

    return carrito.find(item => item.id === id);

}



function actualizarProductosCarrito() {

    productosCarrito.innerHTML = '';

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
        restarBtn.innerHTML = '<i class="bi bi-file-minus"></i>';

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
        precioTotal.textContent = `Precio Total: $ ${item.unidad * item.precio}`;
        precioDiv.appendChild(precioUnitario);
        precioDiv.appendChild(precioTotal);
        itemDiv.appendChild(precioDiv);

        let eliminarBtn = document.createElement("button");
        eliminarBtn.innerHTML = '<i class="bi bi-trash3-fill"></i>';

        eliminarBtn.addEventListener("click", () => eliminarDelCarrito(item.id));

        itemDiv.appendChild(eliminarBtn);

        let hr = document.createElement("hr");
        itemDiv.appendChild(hr);

        productosCarrito.appendChild(itemDiv);

    });
}



let codigoDescuentoDiv = document.createElement("div");
codigoDescuentoDiv.className = "codigo_descuento";
codigoDescuentoDiv.innerHTML = `
    <div>
        <h2>Código de Descuento</h2>
    </div>`;

contenedorCarrito.appendChild(codigoDescuentoDiv);

let codigoDescuentoInput = document.createElement("input");
codigoDescuentoInput.setAttribute("placeholder", "Código de Descuento");

codigoDescuentoDiv.appendChild(codigoDescuentoInput);

let codigoDescuentoButton = document.createElement("button");
codigoDescuentoButton.className = "codigoDescuentoBtn";
codigoDescuentoButton.textContent = "Aplicar Descuento";

codigoDescuentoDiv.appendChild(codigoDescuentoButton);

codigoDescuentoButton.addEventListener("mouseover", () => {

    codigoDescuentoButton.classList.add("remarcar");

});

codigoDescuentoButton.addEventListener("mouseout", () => {

    codigoDescuentoButton.classList.remove("remarcar");

});

let codigoDescuento = '';

let intentosCodigoDescuento = 0;

function aplicarDescuento() {

    let totalCarritoActual = calcularTotalCarrito();

    let codigoIngresado = codigoDescuentoInput.value;

    let descuento = 0;

    if (codigoIngresado === "cielodejupiter") {

        descuento = totalCarritoActual * 0.2;

        mostrarAlerta(`<i class="bi bi-emoji-wink"></i><br> ¡Eso!<br><i class="bi bi-percent"></i><br> ---> ¡Tienes un 20% de Descuento en esta Compra!`, "exito");

        localStorage.setItem("descuento", descuento);

        codigoDescuentoDiv.style.display = "none";

    } else {

        intentosCodigoDescuento++;

        mostrarAlerta(`<i class="bi bi-exclamation-circle-fill"></i><br> ¡Ouch!<br> ¡Ese Código no está bien...!<br><i class="bi bi-emoji-grimace"></i><br> ¡Inténtalo de nuevo!`, "error");

        if (intentosCodigoDescuento >= 3) {

            codigoDescuentoDiv.style.display = "none";

            mostrarAlerta(`<i class="bi bi-ban"></i><br> ¡Será en otra oportunidad!<br><i class="bi bi-emoji-tear"></i><br> ¡Excediste el número de intentos permitidos!`, "error");

        }

    }

    actualizarTotalCarrito();

}

codigoDescuentoButton.addEventListener("click", () => {

    aplicarDescuento();

});



let totalCarritoDiv = document.createElement("div");
totalCarritoDiv.id = "total-carrito";

contenedorCarrito.appendChild(totalCarritoDiv);

function calcularTotalCarrito() {

    let totalCarrito = 0;

    carrito.forEach(item => {

        totalCarrito += item.precio * item.unidad;

    });

    return totalCarrito;

}



function actualizarTotalCarrito() {

    let totalCarrito = calcularTotalCarrito();

    let descuentoAplicado = localStorage.getItem("descuento");

    let descuento = descuentoAplicado ? parseFloat(descuentoAplicado) : 0;

    let totalConDescuento = totalCarrito - descuento;

    totalCarritoDiv.className = "total_carrito";
    totalCarritoDiv.innerHTML = `
        <h2><i class="bi bi-cart3"></i> Total Carrito: $${totalCarrito.toFixed(2)}</h2>
        <h3><i class="bi bi-percent"></i> Descuento: $${descuento.toFixed(2)}</h3>
        <h3><i class="bi bi-currency-dollar"></i> Total a Pagar: $${totalConDescuento.toFixed(2)}</h3>`;

}



let btnFinalizarCompra = document.createElement("button");
btnFinalizarCompra.className = "btn_finalizar";
btnFinalizarCompra.textContent = "COMPRAR";

btnFinalizarCompra.addEventListener("click", finalizarCompra);

btnFinalizarCompra.addEventListener("mouseover", () => {

    btnFinalizarCompra.classList.add("comprar");

});

btnFinalizarCompra.addEventListener("mouseout", () => {

    btnFinalizarCompra.classList.remove("comprar");

});

contenedorCarrito.appendChild(btnFinalizarCompra);

function finalizarCompra() {

    if (carrito.length === 0) {

        mostrarAlerta(`<i class="bi bi-exclamation-triangle-fill"></i><br> Mmm... <i class="bi bi-emoji-frown"></i><br> No tenés nada en tu Carrito para comprar...`, "advertencia");

    } else {

        window.location.replace("./pages/detalles_compra.html");

    }

}



let btnVaciarCarrito = document.createElement("button");
btnVaciarCarrito.className = "vaciarCarritoBtn";
btnVaciarCarrito.innerHTML = `<i class="bi bi-cart-dash"></i><br>Vaciar Carrito`;

btnVaciarCarrito.addEventListener("click", vaciarCarrito);

btnVaciarCarrito.addEventListener("mouseover", () => {

    btnVaciarCarrito.classList.add("remarcar");

});

btnVaciarCarrito.addEventListener("mouseout", () => {

    btnVaciarCarrito.classList.remove("remarcar");

});

contenedorCarrito.appendChild(btnVaciarCarrito);

function vaciarCarrito() {

    carrito = [];

    actualizarProductosCarrito();
    actualizarTotalCarrito();
    actualizarLocalStorageCarrito();

}