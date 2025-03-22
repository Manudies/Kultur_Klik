import Event from "../Event/Event.jsx";
import "./EventList.css";

function EventList({ eventos }) {
    return (
        <div className="event-list">
            <h1>Lista de Eventos</h1>
            {eventos.length === 0 && <p>No hay eventos disponibles.</p>}
            {eventos.map((evento) => (
                <Event key={evento.id} evento={evento} />
            ))}
        </div>
    );
}

export default EventList;
