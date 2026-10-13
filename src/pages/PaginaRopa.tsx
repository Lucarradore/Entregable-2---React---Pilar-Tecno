import { Container } from "react-bootstrap";
import { useState } from "react";
import Productos from "../components/Productos/Productos";
import FormularioProducto from "../components/FormularioProducto/FormularioProducto";
export default function PaginaRopa() {
  const [version, setVersion] = useState(0);
  return <><Container className="py-5"><h1>Administrar productos</h1><FormularioProducto onProductoCreado={() => setVersion(v => v + 1)} /></Container><Productos versionListado={version} /></>;
}
