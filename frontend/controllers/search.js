document.addEventListener("DOMContentLoaded", async () => {
  const gridContainer = document.getElementById("grid-container");
  const mensaje = document.getElementById("mensaje");

  // Capturamos el parámetro "q" de la URL (ej: catalogo.html?q=blanco)
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q") ? params.get("q").toLowerCase() : "";

  if (!q) return; // si no hay búsqueda, no hacemos nada (catalogo.js ya muestra todo)

  try {
    const response = await fetch("../data/products.json");
    if (!response.ok) {
      throw new Error("Error al cargar los productos");
    }

    const products = await response.json();

    // Filtrar productos
    const resultados = products.filter(product =>
      (product.nombre && product.nombre.toLowerCase().includes(q)) ||
      (product.descripcion && product.descripcion.toLowerCase().includes(q)) ||
      (product.color && product.color.toLowerCase().includes(q)) ||
      (product.tamaño && product.tamaño.toLowerCase().includes(q)) ||
      (product.precio && product.precio.toLowerCase().includes(q))
    );

    // Limpiar catálogo antes de renderizar búsqueda
    gridContainer.innerHTML = "";

    if (resultados.length > 0) {
      resultados.forEach(product => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.innerHTML = `
          <div><img src="../images/${product.imagen}" alt="${product.nombre}" /></div>
          <div class="nombre"><strong>${product.nombre}</strong></div>
          <p class="descripcion">${product.descripcion}</p>
          <div class="tamaño">${product.tamaño}</div>
          <div class="color">${product.color}</div>
          <div class="precio">${product.precio}</div>
        `;
        gridContainer.appendChild(gridItem);
      });
    } else {
      mensaje.textContent = `No se encontraron resultados para "${q}".`;
    }
  } catch (error) {
    mensaje.textContent = "Hubo un problema al cargar los productos.";
    console.error(error);
  }
});
