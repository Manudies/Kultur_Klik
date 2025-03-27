// Importamos hooks de React y componentes propios
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import EventList from "./components/EventList/EventList.jsx";
import Footer from "./components/Footer/Footer.jsx";

// Importamos funciones utilitarias para obtener eventos según distintos criterios
import { showEvents, showEventsType, showEventsProvince, showEventsProAndType} from "./utils/eventos";

// Importamos los estilos globales de la app
import "./App.css";

function App() {
    // Estado para los eventos que se van a mostrar
    const [eventos, setEventos] = useState([]);

    // Estado para los eventos favoritos, inicializado con lo que esté en localStorage (si hay)
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favoritos");
        return saved ? JSON.parse(saved) : [];
    });

    // Estado para saber si se están mostrando los favoritos en lugar del listado completo
    const [showingFavorites, setShowingFavorites] = useState(false);

    // useEffect que se ejecuta solo una vez al montar el componente
    // Carga los eventos iniciales llamando a showEvents
    useEffect(() => {
        async function loadInitialEvents() {
            const data = await showEvents();
            setEventos(data);
        }
        loadInitialEvents();
    }, []);

    // useEffect que guarda los favoritos en localStorage cada vez que estos cambian
    useEffect(() => {
        localStorage.setItem("favoritos", JSON.stringify(favorites));
    }, [favorites]);

    // Función para filtrar eventos según categoría y provincia
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
        setShowingFavorites(false); // Al aplicar filtro, dejamos de mostrar favoritos
    };

    // Añadir o quitar un evento de favoritos
    const toggleFavorite = (evento) => {
        const isAlreadyFavorite = favorites.some((fav) => fav.id === evento.id);
        // Comprueba si el evento ya está en la lista de favoritos
        // `.some()` devuelve true si al menos un favorito tiene el mismo id que el evento actual
        if (isAlreadyFavorite) {
            // Si ya está en favoritos, lo eliminamos
            setFavorites(favorites.filter((fav) => fav.id !== evento.id));
        } else {
            // Si no está, lo añadimos
            setFavorites([...favorites, evento]);
        }
    };

    // Alterna entre mostrar favoritos o la lista de eventos
    const handleToggleFavorites = () => {
        setShowingFavorites((prev) => !prev);
        //setShowingFavorites actualiza el estado showingFavorites. 
        // prev representa el valor anterior de showingFavorites.
        // !prev lo invierte: true pasa a false, y false a true.
        // Esto sirve para activar o desactivar la vista de favoritos.
    };

    return (
        <div>
            {/* Navbar recibe funciones para aplicar filtros y cambiar a favoritos */}
            <Navbar
                onFilter={handleFilter}
                onToggleFavorites={handleToggleFavorites}
                showingFavorites={showingFavorites}
            />

            {/* Lista de eventos: muestra los favoritos o los eventos filtrados */}
            <EventList
                eventos={showingFavorites ? favorites : eventos}
                onToggleFavorite={toggleFavorite}
                favorites={favorites}
                showingFavorites={showingFavorites}
            />

            {/* Pie de página de la app */}
            <Footer />
        </div>
    );
}

export default App;
