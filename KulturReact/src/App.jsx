import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import EventList from "./components/EventList/EventList.jsx";
import Footer from "./components/Footer/Footer.jsx";
import {
    showEvents,
    showEventsType,
    showEventsProvince,
    showEventsProAndType
} from "./utils/eventos";

import "./App.css";

function App() {
    const [eventos, setEventos] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favoritos");
        return saved ? JSON.parse(saved) : [];
    });
    const [showingFavorites, setShowingFavorites] = useState(false);

    // Cargar eventos iniciales
    useEffect(() => {
        async function loadInitialEvents() {
            const data = await showEvents();
            setEventos(data);
        }
        loadInitialEvents();
    }, []);

    // Guardar favoritos en el localStorage
    useEffect(() => {
        localStorage.setItem("favoritos", JSON.stringify(favorites));
    }, [favorites]);

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
        setShowingFavorites(false); // Volver a eventos cuando se aplica un filtro
    };

    const toggleFavorite = (evento) => {
        const isAlreadyFavorite = favorites.some((fav) => fav.id === evento.id);

        if (isAlreadyFavorite) {
            setFavorites(favorites.filter((fav) => fav.id !== evento.id));
        } else {
            setFavorites([...favorites, evento]);
        }
    };

    const handleToggleFavorites = () => {
        setShowingFavorites((prev) => !prev);
    };

    return (
        <div>
            <Navbar
                onFilter={handleFilter}
                onToggleFavorites={handleToggleFavorites}
                showingFavorites={showingFavorites}
            />

            <EventList
                eventos={showingFavorites ? favorites : eventos}
                onToggleFavorite={toggleFavorite}
                favorites={favorites}
                showingFavorites={showingFavorites}
            />

            <Footer />
        </div>
    );
}

export default App;
