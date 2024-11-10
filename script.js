document
  .getElementById("requerimientos-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const presupuesto = parseFloat(
      document.getElementById("presupuesto").value
    );
    const cantidad = parseInt(document.getElementById("cantidad").value, 10);
    const direccion = document.getElementById("direccion").value.trim();
    const entrega = document.querySelector('input[name="entrega"]:checked');

    if (
      !nombre ||
      isNaN(presupuesto) ||
      presupuesto <= 0 ||
      isNaN(cantidad) ||
      cantidad <= 0 ||
      cantidad > 20 ||
      !direccion ||
      !entrega
    ) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    sessionStorage.setItem("nombre", nombre);
    sessionStorage.setItem("presupuesto", presupuesto);
    sessionStorage.setItem("cantidad", cantidad);
    sessionStorage.setItem("direccion", direccion);
    sessionStorage.setItem("entrega", entrega.value);

    window.location.href = "productos.html";
  });
