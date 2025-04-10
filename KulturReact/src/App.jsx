// Importamos hooks de React y componentes propios
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import EventList from "./components/EventList/EventList.jsx";
import Footer from "./components/Footer/Footer.jsx";

// Importamos funciones utilitarias para obtener eventos según distintos criterios
import { getFilteredEvents } from "./utils/eventos";

// Importamos los estilos globales de la app
import "./App.css";

function App() {
  const [eventos, setEventos] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favoritos");
    return saved ? JSON.parse(saved) : [];
  });
  const [showingFavorites, setShowingFavorites] = useState(false);
  const [page, setPage] = useState(1);
  // Nota: utilizamos "monthOnly" para mantener la estructura actual, aunque luego
  // getFilteredEvents espere quizá un parámetro "date". Por ahora no se toca eventos.js.
  const [filter, setFilter] = useState({
    category: "0",
    province: "0",
    municipality: "0",
    monthOnly: null,
  });
  const [fallbackUsed, setFallbackUsed] = useState(false);

  // useEffect para cargar eventos según los filtros y la página actual
  useEffect(() => {
    if (showingFavorites) return;

    async function loadEvents() {
      setFallbackUsed(false);
      console.log("Cargando eventos con filtro:", filter, "y page:", page);
      const data = await getFilteredEvents({
        category: filter.category,
        province: filter.province,
        municipality: filter.municipality,
        monthOnly: filter.monthOnly,
        page,
        setFallbackUsed,
      });
      setEventos(data);
    }
    loadEvents();
  }, [page, filter, showingFavorites]);

  // Guardamos favoritos en localStorage
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favorites));
  }, [favorites]);

  // Manejador de filtros: recibe argumentos posicionales y actualiza el estado de filtro
  const handleFilter = (category, province, _date, municipality, monthOnly) => {
    console.log("handleFilter llamado con:", {
      category,
      province,
      _date,
      municipality,
      monthOnly,
    });
    // Actualizamos el estado de filtro (se actualiza solo lo que requiere eventos.js)
    setFilter({ category, province, municipality, monthOnly });
    setPage(1);
    setShowingFavorites(false);
  };

  // Función para alternar favorito
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

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Navbar
        onFilter={handleFilter}
        onToggleFavorites={handleToggleFavorites}
        showingFavorites={showingFavorites}
      />

      {fallbackUsed && (
        <div className="alerta-fallback">
          ⚠️ No se han podido cargar todos los eventos del mes. Mostrando solo los de hoy.
        </div>
      )}

      <EventList
        eventos={showingFavorites ? favorites : eventos}
        onToggleFavorite={toggleFavorite}
        favorites={favorites}
        showingFavorites={showingFavorites}
        page={page}
      />

      {!showingFavorites && (
        <div style={{ textAlign: "center", margin: "2rem" }}>
          {page > 1 && (
            <button onClick={handlePreviousPage} className="boton">
              ◀ Página anterior
            </button>
          )}
          <span style={{ margin: "0 1rem" }}>Página {page}</span>
          <button onClick={handleNextPage} className="boton">
            Página siguiente ▶
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
