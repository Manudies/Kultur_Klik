// Importamos hooks de React y componentes propios
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import EventList from "./components/EventList/EventList.jsx";
import Footer from "./components/Footer/Footer.jsx";

// Importamos la función utilitaria para obtener eventos según distintos criterios
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
  // Valores por defecto: "0" para filtros sin selección y null para monthOnly
  const [filter, setFilter] = useState({
    category: "0",
    province: "0",
    municipality: "0",
    monthOnly: null,
  });
  const [fallbackUsed, setFallbackUsed] = useState(false);
  // Estado para el mensaje de error (cuando no hay eventos)
  const [errorMessage, setErrorMessage] = useState("");

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
      // Si no se encuentran eventos, mostramos el mensaje y luego reseteamos los filtros
      if (!data || data.length === 0) {
        setErrorMessage(
          "No se han encontrado eventos con los filtros seleccionados. Volviendo a la página principal..."
        );
        // Espera 5 segundos y luego resetea los filtros a la configuración por defecto
        setTimeout(() => {
          setFilter({ category: "0", province: "0", municipality: "0", monthOnly: null });
          setPage(1);
          setErrorMessage("");
        }, 5000);
      } else {
        setEventos(data);
        setErrorMessage(""); // Limpiar mensaje en caso de que hubiera
      }
    }
    loadEvents();
  }, [page, filter, showingFavorites]);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favorites));
  }, [favorites]);

  const handleFilter = (category, province, _date, municipality, monthOnly) => {
    console.log("handleFilter llamado con:", { category, province, _date, municipality, monthOnly });
    setFilter({ category, province, municipality, monthOnly });
    setPage(1);
    setShowingFavorites(false);
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
          ⚠️ No se han podido cargar todos los eventos del mes. Mostrando todos eventos de hoy.
        </div>
      )}

      {errorMessage && (
        <div >
          {errorMessage}
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
