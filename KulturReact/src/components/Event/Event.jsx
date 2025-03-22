import "./Event.css";

function Event({ evento }) {
    const defaultImage = "./public/lauburu.png";
    return (
        <div className="event">
            <h2>{evento.nameEs}</h2>
            <img src= {(evento.images && evento.images.length > 0) ? evento.images[0].imageUrl : defaultImage} alt={evento.imageFileName} />
            <p>{evento.shortDescription || "Sin descripción"}</p>
            <p>Fecha: {evento.startDate}</p>
            <p>Provincia: {evento.municipalityEs}</p>
        </div>
    );
}

export default Event;
