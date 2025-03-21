import { fetchData } from "./fech.js"; 

let ano = new Date().getFullYear();
ano = ano.toString();
console.log(ano);
async function showEvents() {
    const url = `https://api.euskadi.eus/culture/events/v1.0/events?_elements=20&_page=1`; 
    const data = await fetchData(url);
    console.log("Datos de la API", data)
    if (!data || !data.items) return [];
    
    return data.items; // Ahora devuelve los datos en lugar de renderizarlos directamente
}

async function showEventsType(tipo) {
    const url = `https://api.euskadi.eus/culture/events/v1.0/events/byType/${tipo}?_elements=20&_page=1`;
    const data = await fetchData(url);
    if (!data || !data.items) return [];

    return data.items;
}

async function showEventsProvince(provincia) {
    const url = `https://api.euskadi.eus/culture/events/v1.0/events?_elements=20&_page=1&provinceNoraCode=${provincia}`;
    const data = await fetchData(url);
    if (!data || !data.items) return [];

    return data.items;
}

async function showEventsProAndType(tipo, provincia) {
    const url = `https://api.euskadi.eus/culture/events/v1.0/events?_elements=20&_page=1&provinceNoraCode=${provincia}&type=${tipo}`;
    const data = await fetchData(url);
    if (!data || !data.items) return [];

    return data.items;
}

export { showEventsType, showEvents, showEventsProvince, showEventsProAndType };
