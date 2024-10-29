document.addEventListener("DOMContentLoaded", function () {
  cargarCarrito();
});

function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  console.log("Cargando carrito:", carrito);

  const carritoContainer = document.getElementById("carrito-list");
  const totalElement = document.getElementById("total-compra");

  if (!carritoContainer || !totalElement) {
    console.error("Elementos necesarios no encontrados en el DOM.");
    return;
  }

  carritoContainer.innerHTML = "";

  carrito.forEach((producto) => {
    const item = document.createElement("tr");
    item.classList.add("producto-carrito");

    item.innerHTML = `
      <td>${producto.nombre}</td>
      <td>${producto.cantidad}</td>
      <td>$${producto.precio}</td>
      <td>$${producto.precio * producto.cantidad}</td>
      <td><button onclick="eliminarProducto(${
        producto.id
      })">Eliminar</button></td>
    `;

    carritoContainer.appendChild(item);
  });

  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );
  totalElement.innerText = `Total de la compra: $${total}`;
}

function eliminarProducto(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = carrito.filter((item) => item.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

function irAFormularioPago() {
  const formulario = document.querySelector(".formulario-tarjeta");
  if (formulario) {
    formulario.style.display = "block";
  } else {
    console.error("Formulario de tarjeta no encontrado.");
  }
}
