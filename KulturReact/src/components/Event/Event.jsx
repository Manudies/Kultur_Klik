// Importamos el botón reutilizable
import Button from "../button/Button.jsx";
// Importamos los estilos del evento
import "./Event.css";

// Componente que muestra los datos de un solo evento
// Props:
// - evento: objeto con la información del evento
// - onToggleFavorite: función que se llama al marcar/desmarcar como favorito
// - isFavorite: booleano que indica si el evento ya está en la lista de favoritos
function Event({ evento, onToggleFavorite, isFavorite }) {
    // Imagen por defecto en caso de que el evento no tenga imágenes
    const defaultImage = "./lauburu.png"; // Se asume que está en /public

    return (
        <div className="event">
            {/* Título del evento */}
            <h2>{evento.nameEs}</h2>

            {/* Imagen del evento o imagen por defecto */}
            <img
                src={evento.images && evento.images.length > 0
                    ? evento.images[0].imageUrl   // Usamos la primera imagen si existe
                    : defaultImage}                // Imagen por defecto si no hay imágenes
                alt={evento.imageFileName || evento.nameEs}
            />

            {/* Información adicional del evento */}
            <p>
                Fecha: {new Date(evento.startDate).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}
            </p>
            <p>Provincia: {evento.municipalityEs?.split("/")[0]}</p>

            {/* Botones para añadir a favoritos o ver más información */}
            <div className="button-container">
                {/* Botón de favoritos (cambia estilo y texto según el estado) */}
                <Button
                    clase={isFavorite ? "fav active" : "fav"}
                    label={isFavorite ? "❤️ Quitar de favoritos" : "🤍 Añadir a favoritos"}
                    onClick={() => onToggleFavorite(evento)}
                />

                {/* Botón que abre la página oficial del evento en una nueva pestaña */}
                <Button 
                    clase="info" 
                    label="Más Info" 
                    onClick={() => window.open(evento.sourceUrlEs, "_blank")} 
                />
            </div>
        </div>
    );
}

export default Event;
