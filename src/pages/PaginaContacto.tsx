import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
export default function PaginaContacto() {
  return <section className="contact-page"><Container>
    <span className="eyebrow">PILAR TECNO / CONTACTO</span><h1>Las buenas ideas<br />empiezan conectando.</h1>
    <p className="lead">Este es el espacio del merch de nuestra comunidad. Explorá las prendas, conocé sus detalles y encontrá tu próxima favorita.</p>
    <div className="contact-panel"><h2>¿Buscás una prenda?</h2><p>En el catálogo podés consultar precios, descripciones y stock actualizado de los productos de Pilar Tecno.</p><Link to="/productos" className="btn btn-primary">Ir al catálogo <FiArrowUpRight className="ms-3" /></Link></div>
  </Container></section>;
}
