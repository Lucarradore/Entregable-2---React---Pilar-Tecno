import { Container, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Productos from "../components/Productos/Productos";
import FormularioProducto from "../components/FormularioProducto/FormularioProducto";
export default function PaginaRopa() {
  const [version, setVersion] = useState(0);
  const [crear, setCrear] = useState(false);
  const [guardando, setGuardando] = useState(false);
  return <>
    <header className="catalog-header"><Container><span className="eyebrow">PILAR TECNO / CATÁLOGO</span><div className="catalog-header-row"><div><h1>Encontrá tu merch.</h1><p>Prendas con identidad. Explorá la colección y consultá el stock disponible.</p></div><Button onClick={() => setCrear(true)}><FiPlus className="me-2" /> Nuevo producto</Button></div></Container></header>
    <Productos versionListado={version} />
    <Modal show={crear} onHide={() => { if (!guardando) setCrear(false); }} backdrop={guardando ? "static" : true} keyboard={!guardando} centered>
      <Modal.Header closeButton={!guardando}><Modal.Title>Sumar un producto</Modal.Title></Modal.Header>
      <Modal.Body><FormularioProducto onGuardando={setGuardando} onProductoCreado={() => { setVersion(v => v + 1); setCrear(false); }} /></Modal.Body>
    </Modal>
  </>;
}
