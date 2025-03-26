import './Footer.css';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <p>&copy; {new Date().getFullYear()} KulturAPI. Todos los derechos reservados.</p>
                <div className="footer-links">
                    <a href="https://github.com/Manudies/Kultur_Klik" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="#">Sobre nosotros</a>
                    <a href="#">Contacto</a>
                </div>
            </div>
            <button className="scroll-top" onClick={scrollToTop} title="Subir arriba">
                ↑
            </button>
        </footer>
    );
}
