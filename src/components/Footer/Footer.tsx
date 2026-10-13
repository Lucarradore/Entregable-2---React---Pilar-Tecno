import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Footer() {
  return <footer className="site-footer"><Container>
    <div className="footer-top"><div><Link to="/" className="navbar-brand"><span className="brand-symbol">pt<span>.</span></span><span className="brand-type">PILAR TECNO<small>COMMUNITY MERCH</small></span></Link><p>Ideas que nos conectan. Merch que nos representa.</p></div><nav className="footer-links" aria-label="Navegación del pie"><Link to="/">Inicio</Link><Link to="/productos">Catálogo ↗</Link><Link to="/contacto">Contacto</Link></nav></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Pilar Tecno.</span><span>CREAR. CONECTAR. SER PARTE.</span></div>
  </Container></footer>;
}
