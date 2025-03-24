import Event from "../Event/Event.jsx";
import "./EventList.css";

function EventList({ eventos = [] }) {
    return (
        <div className="event-list">
            <h1>Lista de Eventos</h1>
            <section className="event-list-container">
                {eventos.length === 0 && <p>No hay eventos disponibles.</p>}
                {eventos.map((evento) => (
                    <Event key={evento.id} evento={evento} />
            ))}

            </section>
        </div>
    );
}

export default EventList;
