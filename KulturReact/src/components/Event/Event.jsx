import Button from "../button/Button.jsx";
import "./Event.css";

function Event({ evento, onToggleFavorite, isFavorite }) {
    const defaultImage = "./lauburu.png"; // Ajuste de ruta (no necesita `/public/`)

    return (
        <div className="event">
            <h2>{evento.nameEs}</h2>

            <img
                src={evento.images && evento.images.length > 0
                    ? evento.images[0].imageUrl
                    : defaultImage}
                alt={evento.imageFileName || evento.nameEs}
            />

            <p>Fecha: {evento.startDate}</p>
            <p>Provincia: {evento.municipalityEs}</p>

            <div className="button-container">
                <Button
                    clase={isFavorite ? "fav active" : "fav"}
                    label={isFavorite ? "❤️ Quitar de favoritos" : "🤍 Añadir a favoritos"}
                    onClick={() => onToggleFavorite(evento)}
                />
                <Button clase="info" label="Más Info" />
            </div>
        </div>
    );
}

export default Event;
