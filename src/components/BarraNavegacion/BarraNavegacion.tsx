import { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { FiArrowUpRight, FiMoon, FiSun } from "react-icons/fi";
import "./BarraNavegacion.css";
interface Props { marca: string; enlaces: { texto: string; href: string }[] }
export default function BarraNavegacion({ marca, enlaces }: Props) {
  const [oscuro, setOscuro] = useState(false);
  const [abierto, setAbierto] = useState(false);
  return <>
    <div className="announcement">Ideas que se comparten. Identidad que se lleva. <span>PILAR TECNO ↗</span></div>
    <Navbar expand="lg" sticky="top" className="merch-nav" expanded={abierto} onToggle={setAbierto}>
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={() => setAbierto(false)} aria-label={marca + " — Inicio"}><span className="brand-symbol">pt<span>.</span></span><span className="brand-type">PILAR TECNO<small>COMMUNITY MERCH</small></span></Navbar.Brand>
        <Navbar.Toggle aria-controls="merch-navigation" />
        <Navbar.Collapse id="merch-navigation">
          <Nav className="mx-auto gap-lg-4">{enlaces.map(enlace => <Nav.Link as={NavLink} end={enlace.href === "/"} to={enlace.href} key={enlace.href} onClick={() => setAbierto(false)}>{enlace.texto === "Productos" ? "Catálogo" : enlace.texto}</Nav.Link>)}</Nav>
          <div className="d-flex align-items-center gap-3">
            <Button variant="link" className="theme-button" aria-label={oscuro ? "Activar tema claro" : "Activar tema oscuro"} aria-pressed={oscuro} onClick={() => { const valor = !oscuro; setOscuro(valor); document.documentElement.dataset.bsTheme = valor ? "dark" : "light"; }}>{oscuro ? <FiSun /> : <FiMoon />}</Button>
            <Link to="/productos" className="nav-catalog-link" onClick={() => setAbierto(false)}>Descubrí el merch <FiArrowUpRight /></Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>;
}
