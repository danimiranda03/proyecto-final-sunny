document.addEventListener("DOMContentLoaded", async () =>{
    const grid_container = document.getElementById("grid-container");
    try {
        //const response = await fetch("../data/products.json");
        const response = await fetch("http://localhost:3000/api/bolsas");

        if(!response.ok){
            throw new Error("Error al cargar los registros");
        }

        const products = await response.json();

        console.log(products);

        grid_container.innerHTML = " ";


        products.data.forEach((product) =>{
            console.log("Procesando producto:", product); // <-- añade esto
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.innerHTML =  `
            <div class='img' ><img src="../images/${product.image}" alt="${product.name}" /></div>
            <div class="nombre">${product.nombre}</div>
            <p class="descripcion">${product.description}</p>
            <div class="tamaño">${product.medidas}</div>
            <div class="color">${product.color}</div>
            <div class="precio">${product.price}</div>
            
            
            `;
             grid_container.appendChild(gridItem);
        });


        
    } catch (error) {
        
    }
})