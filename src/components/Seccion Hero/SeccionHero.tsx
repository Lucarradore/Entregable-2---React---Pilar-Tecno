import { Container, Row, Col } from "react-bootstrap";
import BotonColor from "../Boton Color/BotonColor";
import {useNavigate} from "react-router-dom";
import ListaDatos from "../ListaDatos/ListaDatos";
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
    const navigate = useNavigate();

    const handleClick = () => {
    navigate(`/productos`)
};


  return (
    <section id="inicio" className="py-5 bg-light">
      <Container className="py-5">
        <Row className="align-items-center g-4">
          <Col md={6}>
            <h1 className="display-5 fw-bold">{titulo}</h1>
            <p className="lead text-secondary">{subtitulo}</p>
            <BotonColor />
            <button onClick={handleClick}>Ver productos</button>
          </Col>

          <Col md={6}>
            <ListaDatos/>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SeccionHero;
 