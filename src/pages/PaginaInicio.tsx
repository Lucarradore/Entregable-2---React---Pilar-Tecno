import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function PaginaInicio() {
  return <Container className="py-5"><h1>Merch Pilar Tecno</h1><p>Consultá el catálogo y el stock disponible.</p><Link to="/productos" className="btn btn-primary">Ver catálogo</Link></Container>;
}
