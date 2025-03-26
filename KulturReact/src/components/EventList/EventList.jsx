import Event from "../Event/Event.jsx";
import "./EventList.css";

function EventList({ eventos = [], onToggleFavorite, favorites, showingFavorites, handleShowAll }) {
    return (
        <div className="event-list">
            <h1>Lista de Eventos</h1>
            {eventos.length === 0 && <p>No hay eventos disponibles.</p>}

            <section className="event-list-container">
                {eventos.length === 0 && <p>Cargando Evento...</p>}
                {eventos.map((evento) => (
                    <Event 
                    key={evento.id}
                    evento={evento}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={favorites.some((fav) => fav.id === evento.id)} />
            ))}

            </section>
        </div>
    );
}

export default EventList;