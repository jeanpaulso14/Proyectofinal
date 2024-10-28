document
  .getElementById("requerimientos-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const presupuesto = document.getElementById("presupuesto").value;
    const cantidad = document.getElementById("cantidad").value;
    const direccion = document.getElementById("direccion").value;
    const entrega = document.querySelector('input[name="entrega"]:checked');

    if (nombre && presupuesto && cantidad && direccion && entrega) {
      window.location.href = "productos.html";
    } else {
      alert("Por favor, completa todos los campos antes de continuar.");
    }
  });
