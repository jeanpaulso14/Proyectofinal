let offset = 0;
const limit = 15;

function cargarProductos(productosData = productos) {
  const lista = document.getElementById("productos-list");
  const nuevosProductos = productosData.slice(offset, offset + limit);

  nuevosProductos.forEach((producto) => {
    const productoCard = document.createElement("div");
    productoCard.className = "producto-card";
    productoCard.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <p>Categoría: ${producto.categoria}</p>
      <button onclick="verDetalle(${producto.id})">Ver Detalle</button>
    `;
    lista.appendChild(productoCard);
  });

  offset += limit;

  document.getElementById("fin-lista").style.display =
    offset >= productosData.length ? "block" : "none";
}

function aplicarFiltros() {
  const categoria = document.getElementById("filtro1").value;
  const nombre = document.getElementById("filtro2").value.toLowerCase();

  const productosFiltrados = productos.filter((producto) => {
    const matchCategoria = categoria ? producto.categoria === categoria : true;
    const matchNombre = nombre
      ? producto.nombre.toLowerCase().includes(nombre)
      : true;
    return matchCategoria && matchNombre;
  });

  document.getElementById("productos-list").innerHTML = "";
  offset = 0;
  cargarProductos(productosFiltrados);
}

function limpiarFiltros() {
  document.getElementById("filtro1").value = "";
  document.getElementById("filtro2").value = "";
  offset = 0;
  cargarProductos();
}

function verDetalle(id) {
  const producto = productos.find((p) => p.id === id);
  const detalle = document.getElementById("detalle-contenido");
  detalle.innerHTML = `
    <h3 data-id="${producto.id}">${producto.nombre}</h3>
    <img src="${producto.img}" alt="${producto.nombre}">
    <p>Precio: $${producto.precio}</p>
    <p>Categoría: ${producto.categoria}</p>
  `;
}

function agregarAlCarrito() {
  const detalle = document.querySelector("#detalle-contenido h3");
  const id = detalle.getAttribute("data-id");
  const producto = productos.find((p) => p.id == id);
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const cantidadSeleccionada = parseInt(
    document.getElementById("cantidad").value
  );
  if (isNaN(cantidadSeleccionada) || cantidadSeleccionada < 1) {
    alert("Por favor, ingresa una cantidad válida.");
    return;
  }

  const productoEnCarrito = carrito.find((item) => item.id === producto.id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad += cantidadSeleccionada;
  } else {
    carrito.push({ ...producto, cantidad: cantidadSeleccionada });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito");
}

function completarCompra() {
  window.location.href = "carrito.html";
}

function cancelarCompra() {
  localStorage.removeItem("carrito");
  alert("La compra ha sido cancelada y el carrito se ha limpiado.");
  window.location.href = "index.html";
}

document.getElementById("filtro1").addEventListener("change", aplicarFiltros);
document.getElementById("filtro2").addEventListener("input", aplicarFiltros);

document.addEventListener("DOMContentLoaded", function () {
  cargarProductos();
});
