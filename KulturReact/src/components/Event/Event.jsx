import Button from "../button/Button.jsx";
import "./Event.css";


function Event({ evento }) {
    const defaultImage = "./public/lauburu.png";
    return (
        <div className="event">
            <h2>{evento.nameEs}</h2>
            <img src= {(evento.images && evento.images.length > 0) ? evento.images[0].imageUrl : defaultImage} alt={evento.imageFileName} />
            <p>Fecha: {evento.startDate}</p>
            <p>Provincia: {evento.municipalityEs}</p>
            <Button clase="fav" label="Favoritos" />
            <Button clase="info" label="Más Info"></Button>
            </div>
    );
}

export default Event;
