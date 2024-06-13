document.addEventListener("DOMContentLoaded", () => {
    let carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    let descuentoGuardado = parseFloat(localStorage.getItem("descuento")) || 0;
    let usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado")) || null;

    mostrarDetallesCompra(carritoGuardado, descuentoGuardado);
    mostrarFormulariosInicioSesionYRegistro();

    function mostrarDetallesCompra(carrito, descuento) {
        let detalleCompra = document.getElementById("detalleCompra");
        let totalCarrito = 0;

        if (!detalleCompra) return;

        detalleCompra.innerHTML = `
            <h1>DETALLE DE TU COMPRA</h1>
            ${carrito.length === 0 ? `<i class="bi bi-exclamation-triangle-fill"></i><br>Mmm... <i class="bi bi-emoji-frown"></i><br> No tenés nada en tu Carrito para comprar...` : " "}`;

        carrito.forEach(item => {
            let precioTotalItem = item.precio * item.unidad;
            totalCarrito += precioTotalItem;

            let productoDiv = document.createElement("div");
            productoDiv.classList.add("producto");
            productoDiv.innerHTML = `
                <h3>${item.nombre}</h3>
                <p>Precio Unitario: $ ${item.precio}</p>
                <p>Unidad/es: ${item.unidad}</p><br>
                <p>Total: $ ${precioTotalItem}<br><br>
                ------<<<*>>>------<br></p><br>`;

            detalleCompra.appendChild(productoDiv);
        });

        if (carrito.length > 0) {
            let totalConDescuento = totalCarrito - descuento;
            let totalDiv = document.createElement("div");
            totalDiv.classList.add("total");
            totalDiv.innerHTML = `
                <p><i class="bi bi-cart3"></i> Total Parcial $ ${totalCarrito.toFixed(2)}</p><br>
                <p>---------*---------</p><br>
                <p><i class="bi bi-percent"></i> Descuento $ ${descuento.toFixed(2)}</p><br>
                <p>---------*---------</p><br>
                <p><span class="totalAPagar"><i class="bi bi-currency-dollar"></i> TOTAL A PAGAR $ ${totalConDescuento.toFixed(2)}</span></p><br>
                <p>------<<<*>>>------</p><br><br>`;

            detalleCompra.appendChild(totalDiv);
        }

        console.log("Se ejecuta el Detalle de Compra.");
    }

    function mostrarFormulariosInicioSesionYRegistro() {
        const contenedor = document.getElementById("contenedorInicioSesionRegistro");

        if (!contenedor) return;

        contenedor.innerHTML = " ";

        if (!usuarioLogueado) {
            const mensajeInicioSesion = document.createElement("p");
            mensajeInicioSesion.innerHTML = `<h2><i class="bi bi-cake2"></i><br> Para poder Finalizar tu Compra ---><br> Iniciá tu Chocosesión o Regístrate !<br> <i class="bi bi-emoji-laughing"></i></h2>`;

            contenedor.appendChild(mensajeInicioSesion);

            const formularioInicioSesion = document.createElement("form");
            formularioInicioSesion.id = "formInicioSesion";
            formularioInicioSesion.className = "formularioInicioSesion";

            formularioInicioSesion.addEventListener("submit", iniciarSesion);

            formularioInicioSesion.innerHTML = `
                <h2>Bienvenido/a ! <i class="bi bi-emoji-smile"></i></h2>
                <input type="email" id="emailIniciarSesion" placeholder="Correo electrónico" required>
                <input type="password" id="contraseñaIniciarSesion" placeholder="Contraseña" required>
                <button class="btnIniciarSesion" type="submit">Inicia tu Chocosesión <i class="bi bi-emoji-wink-fill"></i></button>`;

            contenedor.appendChild(formularioInicioSesion);

            const formularioRegistro = document.createElement("form");
            formularioRegistro.id = "formRegistro";
            formularioRegistro.className = "formularioRegistro";

            formularioRegistro.addEventListener("submit", registrarse);

            formularioRegistro.innerHTML = `
                <h2>¿Todavía no tenés<br> tu Chocosesión? <i class="bi bi-emoji-smile-upside-down"></i></h2>
                <input type="email" id="emailRegistro" placeholder="Correo Electrónico" required>
                <input type="password" id="contraseñaRegistro" placeholder="Contraseña" required>
                <button class="btnRegistrarse" type="submit">Registrate <i class="bi bi-emoji-laughing-fill"></i></button>`;

            contenedor.appendChild(formularioRegistro);

        } else {
            ocultarFormulariosYMostrarFinalizarCompra();
        }
    }

    let botonIniciarSesion = document.querySelector(".btnIniciarSesion");
    if (!botonIniciarSesion) return;

    botonIniciarSesion.addEventListener("mouseover", () => {
        botonIniciarSesion.classList.add("hovered");
    });

    botonIniciarSesion.addEventListener("mouseout", () => {
        botonIniciarSesion.classList.remove("hovered");
    });

    let botonRegistrarse = document.querySelector(".btnRegistrarse");

    botonRegistrarse.addEventListener("mouseover", () => {
        botonRegistrarse.classList.add("hovered");
    });

    botonRegistrarse.addEventListener("mouseout", () => {
        botonRegistrarse.classList.remove("hovered");
    });

    function iniciarSesion(event) {
        event.preventDefault();

        let emailInput = document.getElementById("emailIniciarSesion");
        let contraseñaInput = document.getElementById("contraseñaIniciarSesion");

        let email = emailInput.value;
        let contraseña = contraseñaInput.value;

        const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
        let usuarioEncontrado = usuariosGuardados.find(u => u.email === email && u.contraseña === contraseña);

        if (usuarioEncontrado) {
            inicioSesionExitoso(email);

        } else {
            mostrarAlerta(`<i class="bi bi-x-circle-fill"></i><br> Mmm... Ese Correo Electrónico no está bien o la Contraseña que ingresaste no es correcta !<br> <i class="bi bi-emoji-grimace"></i>`, "error");
            console.log("Los Datos ingresados son inválidos.");

            emailInput.value = " ";
            contraseñaInput.value = " ";
        }
    }

    function inicioSesionExitoso(email) {
        mostrarAlerta(`<i class="bi bi-emoji-smile-upside-down"></i><br> Iniciaste tu Chocosesión con éxito !`, "success");
        console.log("Inicio de Sesión Éxitoso.");

        usuarioLogueado = { email };

        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));

        ocultarFormulariosYMostrarFinalizarCompra();
    }

    function registrarse(event) {
        event.preventDefault();

        let email = document.getElementById("emailRegistro").value;
        let contraseña = document.getElementById("contraseñaRegistro").value;

        const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioExistente = usuariosGuardados.find(u => u.email === email);

        if (usuarioExistente) {
            mostrarAlerta(`<i class="bi bi-emoji-surprise"></i><br> Ops ! Ese Correo Electrónico ya está en uso.<br> <i class="bi bi-emoji-grimace"></i><br> Ingresá otro...`, "warning");
            console.log("Ingreso de Datos inválidos.");

        } else {
            usuariosGuardados.push({ email, contraseña });

            localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

            mostrarAlerta(`<i class="bi bi-emoji-sunglasses"></i><br> Un éxito !<br> Te registraste correctamente en Corazón de Chocolate !<br> <i class="bi bi-emoji-heart-eyes"></i><br> Ya podés iniciar tu Chocosesión !`, "success");
            console.log("Registro Éxitoso.");

            mostrarFormulariosInicioSesionYRegistro();
        }
    }

    function ocultarFormulariosYMostrarFinalizarCompra() {
        const contenedor = document.getElementById("contenedorInicioSesionRegistro");
        contenedor.innerHTML = " ";

        let botonFinalizarCompra = document.createElement("button");
        botonFinalizarCompra.className = "botonFinalizarCompra";
        botonFinalizarCompra.textContent = "Finalizar Compra";

        botonFinalizarCompra.addEventListener("click", finalizarCompra);

        contenedor.appendChild(botonFinalizarCompra);

        let botonSeguirComprando = document.createElement("button");
        botonSeguirComprando.className = "botonSeguirComprando";
        botonSeguirComprando.textContent = "Seguir Comprando";

        botonSeguirComprando.addEventListener("click", () => {
            window.location.replace("../index.html");
        });

        contenedor.appendChild(botonSeguirComprando);

        [botonFinalizarCompra, botonSeguirComprando].forEach(boton => {
            boton.addEventListener("mouseover", () => {
                boton.classList.add("hovered");
            });

            boton.addEventListener("mouseout", () => {
                boton.classList.remove("hovered");
            });
        });
    }

    function finalizarCompra() {
        mostrarAlerta(`<i class="bi bi-emoji-heart-eyes"></i><br> Gracias por confiar y comprar en Corazón de Chocolate !<br> <i class="bi bi-bag-heart-fill"></i><br> Te paso las formas e instrucciones de pago y entrega en el Correo Electrónico que mandamos a tu casilla de mail !<br> <i class="bi bi-envelope-heart"></i>`, "success");
        console.log("Compra Éxitosa.");

        setTimeout(() => {
            window.location.replace("../index.html");

            vaciarCarrito();

            localStorage.removeItem("carrito");
            localStorage.removeItem("descuento");
        }, 5000);
    }

    function vaciarCarrito() {
        carritoGuardado.length = 0;
    }
});
