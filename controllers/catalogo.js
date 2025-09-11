document.addEventListener("DOMContentLoaded", async () =>{
    const grid_container = document.getElementById("grid-container");
    try {
        const response = await fetch("../data/products.json");

        if(!response.ok){
            throw new Error("Error al cargar los registros");
        }

        const products = await response.json();

        console.log(products);

        grid_container.innerHTML = " ";


        products.forEach((product) =>{
            console.log("Procesando producto:", product); // <-- añade esto
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.innerHTML =  `
            <div ><img src="../images/${product.imagen}" alt="${product.tittle}" /></div>
            <div class="nombre">${product.nombre}</div>
            <p class="descripcion">${product.descripcion}</p>
            <div class="tamaño">${product.tamaño}</div>
            <div class="color">${product.color}</div>
            <div class="precio">${product.precio}</div>
            
            
            `;
             grid_container.appendChild(gridItem);
        });


        
    } catch (error) {
        
    }
})