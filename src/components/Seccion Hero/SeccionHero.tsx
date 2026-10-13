import { Container, Row, Col } from "react-bootstrap";
import BotonColor from "../Boton Color/BotonColor";
import { Link } from "react-router-dom";

interface SeccionHeroProps {
  titulo: string;
  subtitulo: string;
  mensaje: string;
}

const SeccionHero = ({
  titulo,
  subtitulo,
  mensaje,
}: SeccionHeroProps) => {
  return (
    <section id="inicio" className="py-5 bg-light">
      <Container className="py-5">
        <Row className="align-items-center g-4">
          <Col md={12}>
            <h1 className="display-5 fw-bold">{titulo}</h1>
            <p className="lead text-secondary">{subtitulo}</p>

            <BotonColor />

            <Link to="/productos" className="btn btn-primary">
              {mensaje}
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SeccionHero;