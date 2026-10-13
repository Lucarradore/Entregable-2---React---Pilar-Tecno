import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function PaginaContacto() {
  return <Container className="py-5"><h1>Contacto</h1>
    <p>Pilar Tecno — Administración del inventario de prendas.</p>
    <p>Para consultas sobre productos, revisá el catálogo y su disponibilidad.</p>
    <Link to="/productos" className="btn btn-primary">Ver productos</Link>
  </Container>;
}
