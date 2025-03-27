// Importamos hooks de React
import { useState, useEffect } from "react";
// Función para obtener datos de la API
import { fetchData } from "../../utils/fech";

// Componente reutilizable para renderizar un <select> de categorías o provincias
function Select({ label, type, value, onChange }) {
    // Estado local para almacenar las opciones del select (categorías o provincias)
    const [options, setOptions] = useState([]);

    // useEffect que se ejecuta cuando cambia el tipo (categorias o provincias)
    useEffect(() => {
        async function loadOptions() {
            try {
                let data = [];

                // Según el tipo recibido por props, llamamos a una API distinta
                if (type === "categorias") {
                    data = await fetchData("https://api.euskadi.eus/culture/events/v1.0/eventType");
                } else if (type === "provincias") {
                    const res = await fetchData("https://api.euskadi.eus/culture/events/v1.0/provinces");
                    data = res.items; // Extraemos el array de items
                }

                // Actualizamos el estado con los datos obtenidos
                setOptions(data);
            } catch (error) {
                console.error(`Error al obtener ${type}:`, error);
            }
        }

        loadOptions();
    }, [type]); // Se vuelve a ejecutar si cambia el tipo

    return (
        <div>
            {/* Etiqueta accesible para el select */}
            <label htmlFor={type}>{label}</label>

            {/* Select controlado: value y onChange vienen del componente padre */}
            <select 
                id={type} 
                name={type} 
                value={value} 
                onChange={(e) => onChange(e.target.value)}
            >
                {/* Opción por defecto */}
                <option value="0">Todos</option>

                {/* Renderizado dinámico de las opciones según los datos cargados */}
                {options.map((option) => (
                    <option
                        key={option.id || option.provinceId} // Algunas APIs usan "id", otras "provinceId"
                        value={option.id || option.provinceId}
                    >
                        {option.nameEs} {/* Mostramos el nombre en español */}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
