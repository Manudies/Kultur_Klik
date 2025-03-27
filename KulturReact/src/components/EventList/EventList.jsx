// Importamos el componente Event que representa cada evento individual
import Event from "../Event/Event.jsx";
// Importamos los estilos específicos para la lista de eventos
import "./EventList.css";

// Componente que muestra una lista de eventos
// Props:
// - eventos: array de eventos a mostrar
// - onToggleFavorite: función para marcar/desmarcar un evento como favorito
// - favorites: lista de eventos favoritos
// - showingFavorites: booleano que indica si se están mostrando los favoritos
// - handleShowAll: (opcional) función para volver a mostrar todos los eventos
function EventList({ eventos = [], onToggleFavorite, favorites, showingFavorites, handleShowAll }) {
    return (
        <div className="event-list">
            <h1>Lista de Eventos</h1>

            {/* Mensaje si no hay eventos para mostrar */}
            {eventos.length === 0 && <p>No hay eventos disponibles.</p>}

            <section className="event-list-container">
                {/* Mensaje alternativo mientras se cargan los eventos */}
                {eventos.length === 0 && <p>Cargando Evento...</p>}

                {/* Recorremos los eventos y renderizamos un componente Event para cada uno */}
                {eventos.map((evento) => (
                    <Event 
                        key={evento.id} // Key única por evento (necesario para reconciliación en React)
                        evento={evento} // Pasamos el objeto del evento al componente hijo
                        onToggleFavorite={onToggleFavorite} // Función para marcar como favorito
                        isFavorite={favorites.some((fav) => fav.id === evento.id)} // Verifica si el evento está en favoritos
                    />
                ))}
            </section>
        </div>
    );
}

export default EventList;
