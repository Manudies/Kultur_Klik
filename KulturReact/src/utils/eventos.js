import { fetchData } from "./fech.js"; 

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Mes con 2 dígitos
const day = String(today.getDate()).padStart(2, '0');        // Día con 2 dígitos

const fechaActual = `${year}/${month}/${day}`;

async function showEvents() {
    const url = `https://api.euskadi.eus/culture/events/v1.0/events/byDate/${fechaActual}?_elements=20&_page=1`; 
    const data = await fetchData(url);
    console.log("Datos de la API", data)
    if (!data || !data.items) return [];
    
    return data.items; // Ahora devuelve los datos en lugar de renderizarlos directamente
}

async function showEventsType(tipo) {
    const url = `https://api.euskadi.eus/culture/events/v1.0/events/byType/${tipo}/byDate/${fechaActual}?_elements=20&_page=1`;
    const data = await fetchData(url);
    if (!data || !data.items) return [];

    return data.items;
}

async function showEventsProvince(provincia) {
    const url2 = `https://api.euskadi.eus/culture/events/v1.0/events/byDate/${fechaActual}/byProvince/${provincia}?_elements=20&_page=1`
    const url = `https://api.euskadi.eus/culture/events/v1.0/events?_elements=20&_page=1&provinceNoraCode=${provincia}`;
    const data = await fetchData(url2);
    if (!data || !data.items) return [];

    return data.items;
}

async function showEventsProAndType(tipo, provincia) {
    const url = `https://api.euskadi.eus/culture/events/v1.0/events?_elements=20&_page=1&month=${month}&provinceNoraCode=${provincia}&type=${tipo}&year=${year}`;
    const data = await fetchData(url);
    if (!data || !data.items) return [];

    return data.items;
}

export { showEventsType, showEvents, showEventsProvince, showEventsProAndType };
