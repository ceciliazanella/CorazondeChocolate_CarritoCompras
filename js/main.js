

function Torta(id, nombre, precio, unidad) {

    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.unidad = unidad;

};


const lemmonPie = new Torta(1, "Torta Lemmon Pie", 16500, 1);
const cheeseCakeFrutosRojos = new Torta(2, "Cheese Cake Frutos Rojos", 26000, 1);
const crumbleManzana = new Torta(3, "Crumble de Manzana", 16500, 1);
const chocotorta = new Torta(4, "Chocotorta", 25000, 1);
const tartaFrutal = new Torta(5, "Tarta Frutal", 16500, 1);
const postreBalcarse = new Torta(6, "Postre Balcarse", 25000, 1);
const brownieClasica = new Torta(7, "Torta Brownie Clásica", 20000, 1);
const selvaNegra = new Torta(8, "Torta Selva Negra", 30000, 1);
const dobleOreo = new Torta(9, "Torta Doble Oreo", 26000, 1);
const explosionOreo = new Torta(10, "Torta Explosión Oreo", 26000, 1);


const tortasArtesanales = [lemmonPie, cheeseCakeFrutosRojos, crumbleManzana, chocotorta, tartaFrutal, postreBalcarse, brownieClasica, selvaNegra, dobleOreo, explosionOreo];


let carrito = [];

let totalCompra = 0;


function seguirComprando() {

    let seguir = confirm("¿Te gustaría agregar alguna Torta más a tu Carrito? :)\n\n");

    console.log("Continuación de la Compra...");

    if (!seguir) {

        finalizarCompra();

        return false;
    }

    return true;

}


function solicitarUnidades(tortaNombre) {

    let unidades;

    do {

        let solicitar = prompt(`¿Cuántas unidades de ${tortaNombre} te gustaría sumar a tu Carrito? :)\n\n ---> Podés "Cancelar" si todavía no te decidís por agregar esta Torta a tu Carrito...\n\n`);

        if (solicitar === null) {

            console.log("Se canceló la operación para ingresar cantidad/unidad/es del Objeto seleccionado.\n Volviendo al listado que arrojó la búsqueda...");
            alert("Cancelamos tu operación.");

            return null;

        }

        unidades = parseInt(solicitar);

        if (isNaN(unidades) || unidades <= 0) {

            console.log("Se ingresó una cantidad inválida.");
            alert("Mmm... :S Por favor, ingresá un número válido que sea mayor a cero...");

        }

    } while (isNaN(unidades) || unidades <= 0);

    return unidades;
}


function agregarAlCarrito(torta, unidades) {

    let tortaExistente = carrito.find(item => item.Producto === torta.nombre);

    if (tortaExistente) {

        tortaExistente.Unidades += unidades;

    } else {

        carrito.push({

            Producto: torta.nombre,
            Precio: torta.precio,
            Unidades: unidades,

        });

    }

    totalCompra += unidades * torta.precio;

    console.log(carrito);

    alert(`Sumaste con éxito a tu Carrito tu ${torta.nombre} ! ;) --->>>\n\n
    Llevás ${unidades} unidad/es :)\n\n
    Total Precio Unitario: $ ${torta.precio}\n\n 
    Total Precio a Pagar x ${unidades} unidad/es: ${" "}
    $ ${unidades * torta.precio}\n\n`);

}


function aplicarDescuento(total) {

    let intentos = 0;

    do {

        let codigoDescuento = prompt("¿Tenés Código de Descuento? Ingresalo ;) !\n\n");

        console.log("Se solicita Código de Descuento.");

        if (codigoDescuento === "cielodejupiter") {

            let descuento = total * 0.2;
            let totalConDescuento = total - descuento;

            console.log(`Código de Descuento válido. Se aplica Descuento del 20% sobre el Costo Total.\n\n El Descuento es de $ ${descuento}`);
            alert(`Eso ! ;)\n\n ---> Tenés un 20% de Descuento en esta compra !\n\n Tu Descuento es de $ ${descuento}`);

            return totalConDescuento;

        } else if (!codigoDescuento) {

            console.log(`No cuenta con Código de Descuento. No se aplica Descuento.`);
            alert("Ops ! No tenés Código de Descuento... :(");

            return total;

        } else {

            console.log("El Código de Descuento ingresado es inválido");
            alert("Ouch ! :S Ese Código no está bien...");

            intentos++;

            if (intentos === 3) {

                console.log("Excedió el número de intentos permitidos.\n\n No se aplica Descuento.");
                alert("Será en otra oportunidad ! :(\n\n Excediste el número de intentos permitidos.");

                return total;

            }

        }

    } while (intentos < 3);

}


function finalizarCompra() {

    mostrarDetalleCompra();

    let continuarCompra = true;

    do {

        let opcion = parseInt(prompt("¿Ahora cómo seguimos? :)\n\n ¿Qué te gustaría hacer?\n\n 1->> ¿Querés eliminar alguna Torta de tu Carrito? :(\n\n 2->> Finalizar la Compra ! ;)\n\n"));

        switch (opcion) {

            case 1:
                eliminarTortaDelCarrito();

                break;

            case 2:
                continuarCompra = false;

                break;

            default:
                alert("Mmm... esa no es una opción válida. Por favor, selecciona la Opción 1 o la Opción 2 :)...");

                break;
        }

    } while (continuarCompra);

    mostrarDetalleCompra();

    totalCompra = aplicarDescuento(totalCompra);

    let mensajeFinal = "El Total Final a Pagar por tu Compra es de $ " + totalCompra + "\n\n";

    console.log("Finalizando Compra...");
    alert(mensajeFinal + "Gracias por Confiar y Comprar en Corazón de Chocolate ! :)\n\n");

    !confirmacion;

}


function mostrarDetalleCompra() {

    let detalleCompra = ">>> DETALLE DE TU COMPRA --->\n\n";

    for (let i = 0; i < carrito.length; i++) {

        detalleCompra += `Producto: ${carrito[i].Producto}\n\n`;
        detalleCompra += `Precio Unitario: $ ${carrito[i].Precio}\n\n`;
        detalleCompra += `Unidades: ${carrito[i].Unidades}\n-----------\n`;
        detalleCompra += `SubTotal: ${carrito[i].Precio * carrito[i].Unidades}\n\n>>> ---------------------- <<<\n\n\n`;
    }

    console.log(detalleCompra);
    alert(detalleCompra);

}


function eliminarTortaDelCarrito() {

    let mensaje = "Tu Carrito :) --->>>\n\n";

    for (let i = 0; i < carrito.length; i++) {

        mensaje += `-> Producto -> ${carrito[i].Producto}\n
        Precio: $ ${carrito[i].Precio}\n
        Unidad/es: ${carrito[i].Unidades}\n\n`;

    }

    alert(mensaje);

    let nombreTortaAEliminar;
    let tortaAEliminar;

    while (true) {

        nombreTortaAEliminar = prompt(`¿Cuál es la Torta que queres eliminar?... :(\n\n Si te arrepentiste... ---> Presiona "Cancelar" !\n\n`);

        if (nombreTortaAEliminar === null) {

            return;

        } else if (nombreTortaAEliminar.trim() === "") {

            alert("Por favor, ingresa el nombre de la Torta que querés eliminar !");

        } else {

            tortaAEliminar = carrito.find(torta => torta.Producto.toLowerCase().includes(nombreTortaAEliminar.toLowerCase()));

            break;
        }

    }

    if (tortaAEliminar) {

        let unidadesAEliminar = parseInt(prompt(`¿Cuántas unidades de ${tortaAEliminar.Producto} queres eliminar?\n\n (1 --- ${tortaAEliminar.Unidades})\n\n`));

        if (unidadesAEliminar >= 1 && unidadesAEliminar <= tortaAEliminar.Unidades) {

            tortaAEliminar.Unidades -= unidadesAEliminar;

            totalCompra -= unidadesAEliminar * tortaAEliminar.Precio;

            alert(`${unidadesAEliminar} unidad/es de ${tortaAEliminar.Producto} eliminadas con éxito de tu Carrito...`);

        } else {

            alert(":S La cantidad de unidades que ingresaste no es válida...");

        }

    } else {

        alert("No encontré ninguna Torta con ese nombre en tu Carrito... :S");

    }

    continuarCompra = false;

    return totalCompra;

}


function manejarTortaSeleccionada(torta) {

    let unidades = solicitarUnidades(torta.nombre);

    if (unidades === null) {

        console.log("No se ingresaron unidad/es; no se prosigue a agregar/sumar el Objeto al Carrito.");
        alert("No agregamos la Torta que seleccionaste a tu Carrito... :(");

    } else {

        agregarAlCarrito(torta, unidades);

        hayTortaEnCarrito = true;

        if (!seguirComprando()) {

            finalizar = true;

        };

    }

}


function manejarMenu() {

    let hayTortaEnCarrito = false;

    let finalizar = false;

    do {

        let opcionMenu = prompt(";) ¿Qué estás queriendo hacer por acá? ------\n\n 1 ---> Buscar tu Torta favorita por su nombre.\n\n 2 --->> Ver el Menú de mis Tortas Artesanales disponibles.\n\n 0 --->>> Salir...\n\n");
        console.log("Se Ejecuta el Menú Principal...");

        if (opcionMenu === null || opcionMenu === "0") {

            if (hayTortaEnCarrito) {

                finalizarCompra();

                console.log("Saliendo del Sistema...");
                alert("Ey ! Espero verte muy pronto por acá ! ;)");

            } else {

                console.log("Saliendo del Sistema...");
                alert("Gracias por pasarte por acá ! :)\n\n Espero verte la próxima por Corazón de Chocolate ;)");

            }

            finalizar = true;

            break;
        }

        switch (opcionMenu) {

            case "1":

                let nombreBuscado;
                let volverMenuPrincipal = false;

                do {

                    nombreBuscado = prompt(":) ¿Qué Torta estás buscando? --->\n\n Ingresá acá su nombre ! ;)\n\n");

                    console.log("Se solicita nombre del producto a buscar.");

                    if (nombreBuscado === "") {

                        console.log("No se ingresó el nombre solicitado para buscar el producto.")
                        alert("Ops ! No sé qué estás buscando... :S\n\n Por favor, ingresá algún nombre así te ayudo a buscar tu Torta Favorita...");

                        volverMenuPrincipal = true;

                    } else if (nombreBuscado === null) {

                        console.log("Volviendo al Menú Principal...");
                        alert("<--- Volvemos al Menú Principal !");

                        volverMenuPrincipal = true;

                        break;

                    } else {

                        nombreBuscado = nombreBuscado.trim().toLowerCase();

                        let tortasFiltradasPorNombre = tortasArtesanales.filter(torta => torta.nombre.trim().toLowerCase().includes(nombreBuscado));

                        if (tortasFiltradasPorNombre.length > 0) {

                            do {

                                let opcionesTortas = "";

                                tortasFiltradasPorNombre.forEach((torta, index) => {

                                    opcionesTortas += `${index + 1} >>> ${torta.nombre}\n\n`;

                                });

                                let opcionSeleccionada = prompt(`Te puedo ofrecer las siguientes Tortas con el nombre "${nombreBuscado}" --->\n\n\n${opcionesTortas}\n ---> Ahora seleccioná el número que corresponde a la Torta que queres agregar a tu Carrito ! ;)\n\n`);

                                console.log("Se muestran los resultados de la búsqueda...");

                                if (opcionSeleccionada === "") {

                                    console.log("No seleccionó y/o ingresó ninguna de las opciones que arrojó la búsqueda.");
                                    alert("Ups ! :S No ingresaste ninguna de las opciones encontradas... :(");

                                } else if (opcionSeleccionada === null) {

                                    console.log("Volviendo a ejecutar el ingreso de búsqueda de producto por nombre...")
                                    alert("<--- Volvamos a buscar opciones disponibles ! ;)");

                                    volverMenuPrincipal = true;

                                    break;

                                } else {

                                    opcionSeleccionada = parseInt(opcionSeleccionada);

                                    if (opcionSeleccionada >= 1 && opcionSeleccionada <= tortasFiltradasPorNombre.length) {

                                        let tortaSeleccionada = tortasFiltradasPorNombre[opcionSeleccionada - 1];

                                        manejarTortaSeleccionada(tortaSeleccionada);

                                    } else {

                                        console.log("Opción seleccionada/ingresada no válida.");
                                        alert("Mmm... La opción que ingresaste no es válida... :S\n\n Por favor, seleccioná alguno de los números que se corresponden con las Tortas encontradas ! ;)");

                                    }

                                }

                            } while (true);

                        } else {

                            console.log("El nombre ingresado no se corresponde con ningún nombre propiedad de los Objetos del Array.");
                            alert("Ups... :S No tengo ninguna Torta con ese nombre... :(");

                            volverMenuPrincipal = true;

                            break;
                        }

                    }

                } while (volverMenuPrincipal);

                break;


            case "2":

                let confirmacion = confirm("Estás por entrar al --->\n\n Menú de Tortas Artesanales de Corazón de Chocolate !\n\n ¿Listo/a para elegir entre tus tortas favoritas?");

                console.log("Aviso de entrada al Menú de Tortas Artesanales.");

                if (confirmacion) {

                    while (true) {

                        alert("Te paso a mostrar el Menú de Tortas Artesanales disponibles ! ;)");
                        console.log(tortasArtesanales);

                        let opcion = prompt("¿Cuál vas a llevar? ;)\n\n\n" +
                            tortasArtesanales.map((torta, index) => `${index + 1} -> ${torta.nombre} $ ${torta.precio}\n\n`).join("\n"));

                        if (opcion === null) {

                            console.log("Volviendo al Menú Principal...")
                            alert("<--- Volvemos al Menú Principal !");

                            break;
                        }

                        opcion = parseInt(opcion);

                        if (isNaN(opcion) || opcion < 1 || opcion > tortasArtesanales.length) {

                            console.log("Se ingresó una opción inválida.")
                            alert("Ops ! :S No tengo la opción que estás buscando :(\n\n Por favor, ingresá alguna de las opciones que figuran en el Menú...");

                            continue;
                        }

                        let tortaSeleccionada = tortasArtesanales[opcion - 1];

                        if (tortaSeleccionada) {

                            manejarTortaSeleccionada(tortaSeleccionada);

                            break;

                        }

                    }

                } else {

                    console.log("Volviendo al Menú Principal...")
                    alert("<--- Mmm... Volvemos al Menú Principal !");

                }

                break;


            default:

                console.log("Se ingresó una opción inválida.")
                alert("Mmm... esa no es una opción válida :S\n\n Elegí alguna de las opciones disponibles, por favor !");


        }

    } while (!finalizar);

}


alert("Bienvenido/a a la sección más dulce de Corazón de Chocolate ! :)");
alert("Todas las opciones que están disponibles pueden ser para vos !\n\n También para que las obsequies y/o compartas con alguien más ! ;)");
console.log("Mensaje de Bienvenida a la Tienda de Corazón de Chocolate");

manejarMenu();