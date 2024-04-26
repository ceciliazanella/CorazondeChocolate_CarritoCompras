/* 
Tienda con Carrito de Ventas para Corazón de Chocolate - Pastelería Artesanal Creativa
*/


// Productos (Tortas) disponibles dentro de sección Tortas Artesanales | Identificados con un id | Con sus respectivos nombres y precios  //
let tortasArtesanales = [
    { id: 1, nombre: "Torta Lemmon Pie", precio: 16500 },
    { id: 2, nombre: "Cheese Cake Frutos Rojos", precio: 26000 },
    { id: 3, nombre: "Crumble de Manzana", precio: 16500 },
    { id: 4, nombre: "Chocotorta", precio: 25000 },
    { id: 5, nombre: "Tarta Frutal", precio: 16500 },
    { id: 6, nombre: "Postre Balcarse", precio: 25000 },
    { id: 7, nombre: "Torta Brownie Clásica", precio: 20000 },
    { id: 8, nombre: "Torta Selva Negra", precio: 30000 },
    { id: 9, nombre: "Torta Doble Oreo", precio: 26000 },
    { id: 10, nombre: "Torta Explosión Oreo", precio: 26000 }
];

// Carrito al que se le tendrían que ir agregando los Productos (Tortas) seleccionados //
let carrito = [];

/*Una vez seleccionados los Productos (Tortas) con sus respectivos precios 
y después de saber cuántas unidades se agregan ---> Necesito calcular el Costo Total a pagar por la compra*/
let totalCompra = 0;

/* Función para aplicar Descuento del 20% sobre el Costo Total de la compra mediante 
un Código de Descuento.
El Código de Descuento es cielodejupiter y sólo hay 3 oportunidades para introducirlo;
sino, no se aplica.
*/
function aplicarDescuento(total) {
    let intentos = 0;
    do {

        const codigoDescuento = prompt("¿Tenés Código de Descuento? Ingresalo!");

        if (codigoDescuento === "cielodejupiter") {

            let descuento = total * 0.2;
            let totalConDescuento = total - descuento;

            console.log(`Descuento del 20% aplicado sobre el Costo Total\n El Descuento es de $${descuento}`);
            alert(`Eso ! ;)\n ---> Tenés un 20% de Descuento en esta compra !\n Tu Descuento es de $${descuento}`);
            return totalConDescuento;

        } else {

            console.log("El Código de Descuento ingresado es inválido");
            alert("Ouch ! :S Ese Código no está bien...");
            intentos++;

            if (intentos === 3) {

                console.log("Excedió el número de número de intentos permitidos. No se aplica el Código de Descuento");
                alert("Será en otra oportunidad ! :( Excediste el número de intentos permitidos.");
                return total;

            }

        }

    } while (intentos < 3);

}

// Mensaje de Entrada al Menú de Tortas Artesanales //
alert("Bienvenido/a a la sección más dulce de Corazón de Chocolate ! :)");
alert("Todas las opciones que están disponibles pueden ser para vos !\n También para que las obsequies y/o compartas con alguien más ! ;)");

let confirmacion = window.confirm("Estás por entrar al --->\n Menú de Tortas Artesanales de Corazón de Chocolate !\n ¿Listo/a para elegir entre tus tortas favoritas?");
// Si se acepta entrar al Menú se va a desplegar la lista de Productos (Tortas); sino, se sale //
if (confirmacion) {

    do {

        alert("Genial !\n Te paso a mostrar el Menú de Tortas Artesanales disponibles ! ;)");
        console.log(tortasArtesanales);

        let opcion;

        do {
            // Busca los Productos (Tortas) que ya están almacenados y los muestra con su id, nombre y precio //
            opcion = parseInt(prompt("¿Cuál vas a llevar? ;)\n\n" +
                tortasArtesanales.map((torta) => `${torta.id} - ${torta.nombre} $${torta.precio}`).join("\n")
                + "\n\n0 - Finalizar Compra"));

            if (opcion === 0) {

                console.log("Saliendo del Menú de Tortas Artesanales...");
                alert("Gracias por pasarte por acá ! Espero verte la próxima ;)");

                break;

            } else if (!tortasArtesanales.find((torta) => torta.id === opcion)) {

                console.log("Se ingresó una opción que es inválida y/o no existe.")
                alert("Ops ! :S No cuento con la opción que estás buscando :(\n Por favor, ingresa alguna de las opciones que figuran en el menú.");

            }

        } while (isNaN(opcion) || opcion < 0 || opcion > tortasArtesanales.length);

        if (opcion === 0) {

            break;
        }

        let tortaSeleccionada = tortasArtesanales.find((torta) => torta.id === opcion);

        if (tortaSeleccionada) {

            let unidades;

            do {

                unidades = parseInt(prompt(`¿Cuántas unidades de ${tortaSeleccionada.nombre} te gustaría comprar?`));

            } while (isNaN(unidades) || unidades <= 0);
            /* Lo seleccionado se carga al Carrito una vez que se elije la cantidad 
            de Unidades de cada Producto (Tortas) */
            carrito.push({
                Producto: tortaSeleccionada.nombre,
                Precio: tortaSeleccionada.precio,
                Unidades: unidades,
            });

            totalCompra += unidades * tortaSeleccionada.precio;

            console.log(carrito);
            alert(`Sumaste con éxito al carrito tu ${tortaSeleccionada.nombre} ! ;)\n\n
            Llevás ${unidades} unidad/es,\n
            Total Precio Unitario: $${tortaSeleccionada.precio},\n 
            Total Precio a Pagar x ${unidades} unidades: ${" "}
            $${unidades * tortaSeleccionada.precio}`);

        } else {

            console.log("La opción seleccionada es inválida.")
            alert("Ops... :( La opción que seleccionaste no es válida... :S");

        };
        // Para continuar eligiendo Productos (Tortas) //
        let continuar = window.confirm("¿Te gustaría sumar alguna torta más a tu compra?");

        if (!continuar) {
            /* Cuando ya no se opta por seguir sumando Productos (Tortas) 
            se entrega el Detalle de la Compra */
            let detalleCompra = "DETALLE DE COMPRA\n\n";

            for (let i = 0; i < carrito.length; i++) {
                detalleCompra += `Producto: ${carrito[i].Producto}\n`;
                detalleCompra += `Precio Unitario: $${carrito[i].Precio}\n`;
                detalleCompra += `Unidades: ${carrito[i].Unidades}\n\n`;
            }

            console.log(detalleCompra);
            alert(detalleCompra);

            /* En caso de que se ingrese correctamente el Código de Descuento --->
            Este se aplica sobre el Costo Total */
            totalCompra = aplicarDescuento(totalCompra);

            let mensajeFinal = "El Total Final a Pagar por tu Compra es de $" + totalCompra + "\n\n";

            console.log("Saliendo del Menú de Tortas Artesanales...");
            alert(mensajeFinal + "Gracias por comprar y confiar en Corazón de Chocolate ! :)");

            break;
        }

    } while (true);

} else {

    console.log("Saliendo del Menú de Tortas Artesanales...");
    alert("Gracias por pasarte por acá ! Espero verte la próxima ;)");

}
