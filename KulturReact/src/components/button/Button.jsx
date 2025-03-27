// Importamos los estilos específicos del botón
import "./button.css";

// Componente Button reutilizable
// Props:
// - label: texto que se muestra dentro del botón
// - clase: clase CSS que se aplica al botón (para estilos personalizados)
// - onClick: función que se ejecuta al hacer clic (por defecto es una función vacía para evitar errores)
function Button({ label, clase, onClick = () => {} }) {
    return (
        // Botón con clase y evento onClick
        <button className={clase} onClick={onClick}>
            {label} {/* Texto del botón */}
        </button>
    );
}

export default Button;
