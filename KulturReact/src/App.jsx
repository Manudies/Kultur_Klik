import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import EventList from "./components/EventList/EventList.jsx";
import { showEvents, showEventsType, showEventsProvince, showEventsProAndType } from "./utils/eventos";

function App() {
    const [eventos, setEventos] = useState([]);

    // Cargar eventos iniciales
    useEffect(() => {
        async function loadInitialEvents() {
            const data = await showEvents();
            setEventos(data);
            console.log(eventos);
        }
        loadInitialEvents();
    }, []);

    // Función de filtro
    const handleFilter = async (category, province) => {
        let data = [];

        if (category !== "0" && province !== "0") {
            data = await showEventsProAndType(category, province);
        } else if (category !== "0") {
            data = await showEventsType(category);
        } else if (province !== "0") {
            data = await showEventsProvince(province);
        } else {
            data = await showEvents();
        }

        setEventos(data);
    };

    const handleShowFavorites = () => {
        // Aquí puedes añadir tu lógica de favoritos si quieres
        alert("Función de favoritos no implementada aún.");
    };

    return (
        <div>
            <Navbar onFilter={handleFilter} onShowFavorites={handleShowFavorites} />
            <EventList eventos={eventos} />
        </div>
    );
}

export default App;
