import { fetchData } from "./fech.js";

// Creo el Select dinamicamente
async function createSelectCategory() {

const categorias = await fetchData('https://api.euskadi.eus/culture/events/v1.0/eventType');
console.log(categorias)
  
  const selectCategorias = document.getElementById("categorias");
  
  // Agregar la opción "Todos" manualmente
  const defaultOption = document.createElement("option");
  defaultOption.value = "0";
  defaultOption.textContent = "Todos";
  selectCategorias.appendChild(defaultOption);
  
  // Generar opciones dinámicamente
  categorias.forEach(categoria => {
      const option = document.createElement("option");
      option.value = categoria.id;
      option.textContent = categoria.nameEs;
      selectCategorias.appendChild(option);
  });

}

export { createSelectCategory }

