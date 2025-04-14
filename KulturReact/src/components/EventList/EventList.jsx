import Event from "../Event/Event.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import "./EventList.css";

function EventList({
  eventos = [],
  onToggleFavorite,
  favorites,
  showingFavorites,
  page,
  handlePreviousPage,
  handleNextPage,
}) {
  return (
    <div className="event-list">
      <h1>{showingFavorites ? "Favoritos" : "Lista de Eventos"}</h1>
      
      {eventos.length === 0 && (
        <div className="spinner-container">
          {showingFavorites ? (
            <p>No tienes eventos favoritos aún.</p>
          ) : (
            <>
              <div className="spinner" />
              <p style={{ marginTop: "1rem" }}>Cargando eventos...</p>
            </>
          )}
        </div>
      )}

      <section className="event-list-container">
        {eventos.map((evento) => (
          <Event
            key={evento.id}
            evento={evento}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favorites.some((fav) => fav.id === evento.id)}
          />
        ))}
      </section>

      {/* Mostramos paginación solo si no se están viendo favoritos */}
      {!showingFavorites && eventos.length > 0 && (
        <Pagination
          page={page}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      )}
    </div>
  );
}

export default EventList;
