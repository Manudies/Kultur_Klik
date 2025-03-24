import { useState, useEffect } from "react";

import { fetchData } from "../../utils/fech";
import Select from "../Select/Select.jsx";
import Button from "../button/Button.jsx";

import "./Navbar.css";

const Navbar = ({ onFilter, onShowFavorites }) => {
    const [categories, setCategories] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("0");
    const [selectedProvince, setSelectedProvince] = useState("0");

    // Obtener categorías desde la API
    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await fetchData("https://api.euskadi.eus/culture/events/v1.0/eventType");
                setCategories(data);
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        }
        fetchCategories();
    }, []);

    useEffect (() =>{
        async function fechProvinces() {
            try {
                const provinData = await fetchData("https://api.euskadi.eus/culture/events/v1.0/provinces");
                setProvinces(provinData.items);
            } catch (error) {
                console.error("Error al obtener las provincias:", error);
            }
        }
        fechProvinces();
    }, []);

    return (
        <nav>
            {/* Categorias */}
            <Select
                label="Categoría:"
                type="categorias"
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
            />
            {/* Provincias */}
            <Select
                label="Provincia:"
                type="provincias"
                value={selectedProvince}
                onChange={(value) => setSelectedProvince(value)}
            />
            {/* Botones */}
            <Button label="Filtrar" clase="boton" onClick={() => onFilter(selectedCategory, selectedProvince)}></Button>
            <Button label="Favoritos" clase="boton" onClick={onShowFavorites}></Button>
        </nav>
    );
};

export default Navbar;
