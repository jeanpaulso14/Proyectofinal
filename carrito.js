document.addEventListener("DOMContentLoaded", function () {
  cargarCarrito();
});

function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const carritoContainer = document.getElementById("carrito-container");
  carritoContainer.innerHTML = "";

  carrito.forEach((producto) => {
    const item = document.createElement("div");
    item.classList.add("producto-carrito");

    item.innerHTML = `
      <p>Nombre: ${producto.nombre}</p>
      <p>Precio: $${producto.precio}</p>
      <p>Cantidad: ${producto.cantidad}</p>
      <p>Total: $${producto.precio * producto.cantidad}</p>
      <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
    `;

    carritoContainer.appendChild(item);
  });

  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );
  const totalElement = document.getElementById("total-compra");
  totalElement.innerText = `Total: $${total}`;
}

function eliminarProducto(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = carrito.filter((item) => item.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

function irAFormularioPago() {
  const formulario = document.querySelector(".formulario-tarjeta");
  formulario.style.display = "block";
}

document.addEventListener("DOMContentLoaded", cargarCarrito);
