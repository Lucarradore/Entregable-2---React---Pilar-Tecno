import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiArrowRight, FiPlus } from "react-icons/fi";
import Prenda from "../components/Prenda/Prenda";
import "./PaginaInicio.css";
export default function PaginaInicio() {
  return <>
    <section className="merch-hero">
      <Container className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow"><span className="status-dot" /> PILAR TECNO / MERCH</span>
          <h1>Tu comunidad.<br />Tu estilo.<br /><span>Tu merch.</span></h1>
          <p>Las ideas nos conectan. El merch nos acompaña.<br className="d-none d-lg-block" /> Llevá un poco de Pilar Tecno a donde vayas.</p>
          <Link to="/productos" className="btn btn-primary hero-cta">Explorar el catálogo <FiArrowUpRight /></Link>
          <div className="hero-note"><span>01 /</span> Diseñado para ser parte.</div>
        </div>
        <div className="hero-art">
          <div className="art-grid" />
          <span className="art-topline">LA COMUNIDAD SE LLEVA PUESTA</span>
          <span className="art-word" aria-hidden="true">TECNO</span>
          <Prenda className="hero-shirt" color="#1638cf" />
          <div className="art-sticker">HECHO DE<br /><strong>IDEAS.</strong><FiPlus /></div>
          <div className="art-caption"><span>ESTILO PILAR TECNO</span><span>Ilustración conceptual ↗</span></div>
        </div>
      </Container>
    </section>
    <div className="brand-strip"><Container><span>CREAR.</span><span>CONECTAR.</span><span>COMPARTIR.</span><span className="strip-accent">SER PARTE. ↗</span></Container></div>
    <section className="collection-section"><Container>
      <div className="section-heading"><div><span className="eyebrow">EL UNIVERSO PILAR TECNO</span><h2>Más que una prenda.<br />Una forma de conectar.</h2></div><p>Una misma identidad, distintas maneras<br className="d-none d-md-block" /> de hacerla tuya.</p></div>
      <div className="collection-grid">
        <Link to="/productos" className="collection-tile tile-blue"><div className="tile-top"><span>01 / ESENCIA TECNO</span><FiArrowUpRight /></div><Prenda color="#182b55" /><div className="tile-bottom"><h3>Tu próximo básico.</h3><span>Explorar catálogo</span></div></Link>
        <Link to="/productos" className="collection-tile tile-lime"><div className="tile-top"><span>02 / ESPÍRITU DE COMUNIDAD</span><FiArrowUpRight /></div><Prenda tipo="buzo" color="#333d3a" /><div className="tile-bottom"><h3>Ideas que abrigan.</h3><span>Explorar catálogo</span></div></Link>
      </div>
      <p className="illustration-note">Ilustraciones de referencia. Consultá los productos y el stock disponible en el catálogo.</p>
    </Container></section>
    <section className="community-section"><Container><span className="eyebrow">DE PILAR. CON IDENTIDAD.</span><h2>El próximo capítulo<br />lo llevás vos.</h2><Link to="/productos" className="btn btn-light">Encontrá tu merch <FiArrowRight /></Link><span className="community-mark" aria-hidden="true">PT.</span></Container></section>
  </>;
}
