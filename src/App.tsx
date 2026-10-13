import { Routes, Route, Link } from "react-router-dom";
import PaginaRopa from "./pages/PaginaRopa";
import PaginaInicio from "./pages/PaginaInicio";
import PaginaContacto from "./pages/PaginaContacto";
import BarraNavegacion from "./components/BarraNavegacion/BarraNavegacion";
import Footer from "./components/Footer/Footer";
const enlaces = [
  { texto: "Inicio", href: "/" },
  { texto: "Productos", href: "/productos" },
  { texto: "Contacto", href: "/contacto" },
];
export default function App() {
  return <>
    <BarraNavegacion marca="Pilar Tecno" enlaces={enlaces} />
    <main><Routes>
      <Route path="/" element={<PaginaInicio />} />
      <Route path="/productos" element={<PaginaRopa />} />
      <Route path="/contacto" element={<PaginaContacto />} />
      <Route path="*" element={<div className="container py-5"><h1>Página no encontrada</h1><Link to="/">Volver al inicio</Link></div>} />
    </Routes></main>
    <Footer />
  </>;
}
