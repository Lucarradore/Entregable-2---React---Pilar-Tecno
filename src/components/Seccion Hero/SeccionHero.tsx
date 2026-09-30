import { Container, Row, Col } from "react-bootstrap";
import BotonColor from "../Boton Color/BotonColor";

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
          <Col md={6}>
            <h1 className="display-5 fw-bold">{titulo}</h1>
            <p className="lead text-secondary">{subtitulo}</p>
            <BotonColor />
          </Col>

          <Col md={6}>
            <div
              className="rounded-4 bg-white shadow-sm d-flex align-items-center justify-content-center"
              style={{ minHeight: "220px" }}
            >
              <span className="text-secondary">{mensaje}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SeccionHero;
 