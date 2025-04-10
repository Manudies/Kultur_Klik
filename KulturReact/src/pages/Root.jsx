import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { showEvents, showEventsType, showEventsProvince, showEventsProAndType} from "../utils/eventos.js";


function Root() {    const [eventos, setEventos] = useState([]);

    // Estado para los eventos favoritos, inicializado con lo que esté en localStorage (si hay)
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favoritos");
        return saved ? JSON.parse(saved) : [];
    });

    // Estado para saber si se están mostrando los favoritos en lugar del listado completo
    const [showingFavorites, setShowingFavorites] = useState(false);

    // Estado para la paginación
    const [page, setPage] = useState(1);

    // Estado para filtros activos
    const [filter, setFilter] = useState({ category: "0", province: "0" });

    // useEffect que se ejecuta cuando se montan los componentes o cambian filtros o página
    useEffect(() => {
        if (showingFavorites) return;

        async function loadEvents() {
            let data = [];
            if (filter.category !== "0" && filter.province !== "0") {
                data = await showEventsProAndType(filter.category, filter.province, page);
            } else if (filter.category !== "0") {
                data = await showEventsType(filter.category, page);
            } else if (filter.province !== "0") {
                data = await showEventsProvince(filter.province, page);
            } else {
                data = await showEvents(page);
            }
            setEventos(data);
        }
        loadEvents();
    }, [page, filter, showingFavorites]);

    // useEffect que guarda los favoritos en localStorage cada vez que estos cambian
    useEffect(() => {
        localStorage.setItem("favoritos", JSON.stringify(favorites));
    }, [favorites]);

    // Función para filtrar eventos según categoría y provincia
    const handleFilter = (category, province) => {
        setFilter({ category, province });
        setPage(1); // Reiniciamos a la primera página
        setShowingFavorites(false);
    };

    // Añadir o quitar un evento de favoritos
    const toggleFavorite = (evento) => {
        const isAlreadyFavorite = favorites.some((fav) => fav.id === evento.id);
        if (isAlreadyFavorite) {
            setFavorites(favorites.filter((fav) => fav.id !== evento.id));
        } else {
            setFavorites([...favorites, evento]);
        }
    };

    // Alterna entre mostrar favoritos o la lista de eventos
    const handleToggleFavorites = () => {
        setShowingFavorites((prev) => !prev);
    };

    // Funciones para paginar
    const handlePreviousPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNextPage = () => {
        setPage((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  return (
    <>
      {/* Navbar recibe funciones para aplicar filtros y cambiar a favoritos */}
      <Navbar
        onFilter={handleFilter}
        onToggleFavorites={handleToggleFavorites}
        showingFavorites={showingFavorites}
      />
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
