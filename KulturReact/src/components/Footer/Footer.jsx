// Importamos los estilos del pie de página
import './Footer.css';

// Componente Footer que aparece en la parte inferior de la página
export default function Footer() {
    // Función para hacer scroll hacia arriba suavemente
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Texto con el año actual y derechos reservados */}
                <p>&copy; {new Date().getFullYear()} KulturAPI. Todos los derechos reservados.</p>

                {/* Enlaces del footer */}
                <div className="footer-links">
                    {/* Enlace a GitHub del proyecto */}
                    <a 
                        href="https://github.com/Manudies/Kultur_Klik" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>

                    {/* Enlaces informativos (puedes hacerlos funcionar más adelante) */}
                    <a href="#">Sobre nosotros</a>
                    <a href="#">Contacto</a>
                </div>
            </div>

            {/* Botón para hacer scroll hacia arriba */}
            <button 
                className="scroll-top" 
                onClick={scrollToTop} 
                title="Subir arriba"
            >
                ↑
            </button>
        </footer>
    );
}
