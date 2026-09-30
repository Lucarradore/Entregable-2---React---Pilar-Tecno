import { Navbar, Nav, Container } from "react-bootstrap";

interface EnlaceNavegacion {
  texto: string;
  href: string;
}

interface BarraNavegacionProps {
  marca: string;
  enlaces: EnlaceNavegacion[];
}

const BarraNavegacion = ({
  marca,
  enlaces,
}: BarraNavegacionProps) => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      className="shadow-sm py-3"
    >
      <Container>
        <Navbar.Brand href="#inicio" className="fw-bold">
          {marca}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-principal" />

        <Navbar.Collapse id="navbar-principal">
          <Nav className="ms-auto gap-lg-3">
            {enlaces.map((enlace) => (
              <Nav.Link key={enlace.href} href={enlace.href}>
                {enlace.texto}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BarraNavegacion;