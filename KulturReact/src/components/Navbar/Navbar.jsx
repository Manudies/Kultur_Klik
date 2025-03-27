import { useState, useEffect } from "react";

// Utilidad para hacer fetch a la API
import { fetchData } from "../../utils/fech";
// Componentes personalizados
import Select from "../Select/Select.jsx";
import Button from "../button/Button.jsx";

// Estilos del navbar
import "./Navbar.css";

function Navbar ({ onFilter, onToggleFavorites, showingFavorites }) {
    // Estado para las categorías de eventos
    const [categories, setCategories] = useState([]);
    // Estado para las provincias
    const [provinces, setProvinces] = useState([]);
    // Estado para la categoría seleccionada
    const [selectedCategory, setSelectedCategory] = useState("0");
    // Estado para la provincia seleccionada
    const [selectedProvince, setSelectedProvince] = useState("0");

    // useEffect para obtener las categorías de la API al montar el componente
    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await fetchData("https://api.euskadi.eus/culture/events/v1.0/eventType");
                setCategories(data); // Guardamos las categorías en el estado
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        }
        fetchCategories();
    }, []);

    // useEffect para obtener las provincias de la API al montar el componente
    useEffect (() => {
        async function fechProvinces() {
            try {
                const provinData = await fetchData("https://api.euskadi.eus/culture/events/v1.0/provinces");
                setProvinces(provinData.items); // Guardamos las provincias (items) en el estado
            } catch (error) {
                console.error("Error al obtener las provincias:", error);
            }
        }
        fechProvinces();
    }, []);

    return (
        <nav>
            <div className="navbar-brand">
                <h1 className="logo2">🌄 Kultur Klik</h1>
            </div>
            {/* Selector de Categoría */}
            <Select
                label="Categoría:"
                type="categorias"
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)} // Actualiza estado al seleccionar
            />

            {/* Selector de Provincia */}
            <Select
                label="Provincia:"
                type="provincias"
                value={selectedProvince}
                onChange={(value) => setSelectedProvince(value)} // Actualiza estado al seleccionar
            />

            {/* Botón para aplicar filtro */}
            <Button 
                label="Filtrar" 
                clase="boton" 
                onClick={() => onFilter(selectedCategory, selectedProvince)} // Ejecuta función de filtro con los valores seleccionados
            />

            {/* Botón para alternar entre eventos y favoritos */}
            <Button 
                label={showingFavorites ? "Eventos" : "Favoritos"} // Cambia el texto según el estado
                clase="boton" 
                onClick={onToggleFavorites} // Alterna el estado de mostrar favoritos
            />
        </nav>
    );
};

export default Navbar;
