let offset = 0;
const limit = 15;

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();

  const lista = document.querySelector(".productos");
  lista.addEventListener("scroll", () => {
    if (lista.scrollTop + lista.clientHeight >= lista.scrollHeight) {
      cargarProductos();
    }
  });
});

function cargarProductos() {
  const lista = document.getElementById("productos-list");
  const nuevosProductos = productos.slice(offset, offset + limit);

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

  if (offset >= productos.length) {
    document.getElementById("fin-lista").style.display = "block";
  }
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

function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const productoEnCarrito = carrito.find((item) => item.id === producto.id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito");
  console.log("Carrito actualizado:", carrito);
}

function completarCompra() {
  window.location.href = "carrito.html";
}
