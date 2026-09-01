let carrito = [];

const contador = document.getElementById("contador");
const botonCarrito = document.getElementById("carrito");
const modalCarrito = document.getElementById("modalCarrito");
const cerrarCarrito = document.getElementById("cerrarCarrito");

const listaCarrito = document.getElementById("listaCarrito");
const totalCarrito = document.getElementById("totalCarrito");

const vaciarCarrito = document.getElementById("vaciarCarrito");
const pedidoWhatsApp = document.getElementById("pedidoWhatsApp");


// AGREGAR PRODUCTOS
document.querySelectorAll(".agregar").forEach(boton => {

    boton.addEventListener("click", () => {

        const nombre = boton.dataset.producto;
        const precio = Number(boton.dataset.precio);

        const existente = carrito.find(
            producto => producto.nombre === nombre
        );

        if (existente) {
            existente.cantidad++;
        } else {
            carrito.push({
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });
        }

        actualizarCarrito();

    });

});


// ACTUALIZAR
function actualizarCarrito() {

    let cantidad = 0;
    let total = 0;

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {

        listaCarrito.innerHTML = `
            <p class="carrito-vacio">
                Tu carrito está vacío 🐾
            </p>
        `;

    }

    carrito.forEach((producto, index) => {

        cantidad += producto.cantidad;

        const subtotal =
            producto.precio * producto.cantidad;

        total += subtotal;

        listaCarrito.innerHTML += `

            <div class="item-carrito">

                <div class="item-info">
                    <strong>${producto.nombre}</strong>
                    <span>S/ ${producto.precio.toFixed(2)} cada uno</span>
                </div>

                <div class="cantidad">

                    <button onclick="cambiarCantidad(${index}, -1)">
                        −
                    </button>

                    <strong>${producto.cantidad}</strong>

                    <button onclick="cambiarCantidad(${index}, 1)">
                        +
                    </button>

                </div>

                <strong class="subtotal">
                    S/ ${subtotal.toFixed(2)}
                </strong>

                <button
                    class="eliminar"
                    onclick="eliminarProducto(${index})">
                    🗑️
                </button>

            </div>
        `;
    });

    contador.textContent = cantidad;
    totalCarrito.textContent = total.toFixed(2);
}


// CAMBIAR CANTIDAD
function cambiarCantidad(index, cambio) {

    carrito[index].cantidad += cambio;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    actualizarCarrito();
}


// ELIMINAR
function eliminarProducto(index) {

    carrito.splice(index, 1);

    actualizarCarrito();
}


// ABRIR CARRITO
botonCarrito.addEventListener("click", () => {

    modalCarrito.classList.add("activo");

    actualizarCarrito();

});


// CERRAR
cerrarCarrito.addEventListener("click", () => {

    modalCarrito.classList.remove("activo");

});


// CERRAR AL HACER CLIC AFUERA
modalCarrito.addEventListener("click", (e) => {

    if (e.target === modalCarrito) {
        modalCarrito.classList.remove("activo");
    }

});


// VACIAR
vaciarCarrito.addEventListener("click", () => {

    carrito = [];

    actualizarCarrito();

});


// WHATSAPP
pedidoWhatsApp.addEventListener("click", () => {

    if (carrito.length === 0) {

        alert("Tu carrito está vacío 🐾");

        return;
    }

    let mensaje =
        "🐾 PEDIDO - A PATAS DEL MISTI\n\n";

    carrito.forEach(producto => {

        const subtotal =
            producto.precio * producto.cantidad;

        mensaje +=
            `${producto.nombre}\n` +
            `Cantidad: ${producto.cantidad}\n` +
            `Subtotal: S/ ${subtotal.toFixed(2)}\n\n`;

    });

    const total = carrito.reduce(
        (suma, producto) =>
            suma + producto.precio * producto.cantidad,
        0
    );

    mensaje +=
        `TOTAL: S/ ${total.toFixed(2)}`;

    // MÁS ADELANTE PONDREMOS TU NÚMERO REAL
    const telefono = "51999999999";

    const url =
        "https://wa.me/" +
        telefono +
        "?text=" +
        encodeURIComponent(mensaje);

    window.open(url, "_blank");

});