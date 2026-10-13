import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
interface Props { marca: string; enlaces: { texto: string; href: string }[] }
export default function BarraNavegacion({ marca, enlaces }: Props) {
  return <Navbar expand="lg"><Container><Navbar.Brand as={Link} to="/">{marca}</Navbar.Brand><Navbar.Toggle aria-controls="navbar-principal" /><Navbar.Collapse id="navbar-principal"><Nav>{enlaces.map(enlace => <Nav.Link key={enlace.href} as={Link} to={enlace.href}>{enlace.texto}</Nav.Link>)}</Nav></Navbar.Collapse></Container></Navbar>;
}
