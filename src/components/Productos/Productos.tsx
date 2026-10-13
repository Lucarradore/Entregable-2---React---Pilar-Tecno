import { useEffect, useState } from "react";
import { Alert, Badge, Button, Modal, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { eliminarProducto, obtenerProductos, obtenerCategoria, obtenerBajoStock, actualizarStock } from "../../services/productos";
import FormularioProducto from "../FormularioProducto/FormularioProducto";
import Prenda from "../Prenda/Prenda";
import type { Producto } from "../../types/Producto";

const moneda = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" });
type Filtro = { modo: string; valor: string };
export default function Productos({ versionListado }: { versionListado: number }) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [intento, setIntento] = useState(0);
  const [filtro, setFiltro] = useState<Filtro>({ modo: "todos", valor: "" });
  const [aEliminar, setAEliminar] = useState<Producto | null>(null);
  const [aEditar, setAEditar] = useState<Producto | null>(null);
  const [eliminando, setEliminando] = useState(false);
  const [errorEliminar, setErrorEliminar] = useState("");
  const [stock, setStock] = useState<Producto[] | null>(null);
  const [guardandoStock, setGuardandoStock] = useState(false);
  const [editando, setEditando] = useState(false);
  const recargar = () => setIntento(valor => valor + 1);

  useEffect(() => {
    const controller = new AbortController();
    // Sincroniza el indicador con cada nueva consulta a la API.
    // oxlint-disable-next-line react/set-state-in-effect
    setCargando(true);
    setError("");
    const consulta = filtro.modo === "categoria"
      ? obtenerCategoria(filtro.valor, controller.signal)
      : filtro.modo === "stock" ? obtenerBajoStock(Number(filtro.valor), controller.signal)
      : obtenerProductos(controller.signal);
    consulta.then(datos => {
      if (!controller.signal.aborted) setProductos(datos);
    }).catch((fallo: unknown) => {
      if (!controller.signal.aborted) setError(fallo instanceof Error ? fallo.message : "No se pudo cargar el listado.");
    }).finally(() => {
      if (!controller.signal.aborted) setCargando(false);
    });
    return () => controller.abort();
  }, [intento, versionListado, filtro]);

  async function confirmarEliminacion() {
    if (!aEliminar || eliminando) return;
    setEliminando(true);
    setErrorEliminar("");
    try {
      await eliminarProducto(aEliminar._id);
      setAEliminar(null);
      recargar();
    } catch (fallo) {
      setErrorEliminar(fallo instanceof Error ? fallo.message : "No se pudo eliminar.");
    } finally { setEliminando(false); }
  }

  return <section className="catalog-section" aria-busy={cargando}>
    <Container>
      <h2>La colección <span className="text-secondary small">/ {cargando ? "..." : productos.length + " productos"}</span></h2>
      <Formik initialValues={{ modo: "todos", valor: "" }}
        validate={valores => {
          if (valores.modo === "categoria" && !valores.valor.trim()) return { valor: "Ingresá una categoría." };
          if (valores.modo === "stock" && (!valores.valor.trim() || !Number.isSafeInteger(Number(valores.valor)) || Number(valores.valor) < 0))
            return { valor: "Ingresá un límite entero no negativo." };
          return {};
        }}
        onSubmit={valores => setFiltro({ modo: valores.modo, valor: valores.valor.trim() })}>
        {({ values, setFieldValue }) => <Form className="catalog-filters d-flex flex-wrap gap-2 align-items-end mb-4">
          <div><label htmlFor="filtro-modo" className="form-label">Consultar</label>
            <Field as="select" name="modo" id="filtro-modo" className="form-select"
              onChange={(evento: React.ChangeEvent<HTMLSelectElement>) => {
                void setFieldValue("modo", evento.target.value);
                void setFieldValue("valor", "");
              }}>
              <option value="todos">Todos</option><option value="categoria">Por categoría</option><option value="stock">Bajo stock</option>
            </Field>
          </div>
          {values.modo !== "todos" && <div>
            <label htmlFor="filtro-valor" className="form-label">{values.modo === "stock" ? "Stock menor a" : "Categoría exacta"}</label>
            <Field name="valor" id="filtro-valor" type={values.modo === "stock" ? "number" : "text"} min="0" step="1" className="form-control" />
            <ErrorMessage name="valor" component="div" className="text-danger" />
          </div>}
          <Button type="submit">Consultar</Button>
          <Button variant="outline-primary" onClick={recargar} disabled={cargando}>Actualizar listado</Button>
        </Form>}
      </Formik>
      {error && <Alert variant="danger">{error}</Alert>}
      {cargando ? <div role="status"><Spinner animation="border" size="sm" /> Cargando productos...</div>
        : !error && <>
          <Button className="mb-3" disabled={!productos.length} onClick={() => setStock(productos)}>Actualizar stock del listado</Button>
          {!productos.length ? <p role="status">No hay productos para esta consulta.</p> :
            <Row xs={1} sm={2} lg={3} className="g-4 text-start">
              {productos.map(producto => <Col key={producto._id}>
                <Card className="h-100 shadow-sm"><div className="product-art"><Prenda tipo={producto.categoria + " " + producto.nombre} color={["#203fc1", "#25304b", "#576249"][producto.nombre.length % 3]} /><span className="product-art-note">ILUSTRACIÓN DE REFERENCIA</span></div><Card.Body>
                  <span className="text-secondary">{producto.categoria}</span>
                  <Card.Title as="h3" className="h5">{producto.nombre}</Card.Title>
                  <Card.Text>{producto.descripcion}</Card.Text>
                  <p>{moneda.format(producto.precio)}</p>
                  <Badge bg={producto.cantidad > 0 ? "success" : "secondary"}>Stock: {producto.cantidad}</Badge>
                  <div className="d-flex gap-2 mt-3">
                    <Button variant="warning" onClick={() => setAEditar(producto)}>Editar</Button>
                    <Button variant="danger" onClick={() => { setErrorEliminar(""); setAEliminar(producto); }}>Eliminar</Button>
                  </div>
                </Card.Body></Card>
              </Col>)}
            </Row>}
        </>}
      <Modal show={aEliminar !== null} onHide={() => { if (!eliminando) setAEliminar(null); }} backdrop={eliminando ? "static" : true} keyboard={!eliminando} centered>
        <Modal.Header closeButton={!eliminando}><Modal.Title>Confirmar eliminación</Modal.Title></Modal.Header>
        <Modal.Body>
          ¿Seguro que querés eliminar <strong>{aEliminar?.nombre}</strong>?
          {errorEliminar && <Alert variant="danger" className="mt-3">{errorEliminar}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={eliminando} onClick={() => setAEliminar(null)}>Cancelar</Button>
          <Button variant="danger" disabled={eliminando} onClick={confirmarEliminacion}>{eliminando ? "Eliminando..." : "Eliminar"}</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={aEditar !== null} onHide={() => { if (!editando) setAEditar(null); }} backdrop={editando ? "static" : true} keyboard={!editando} centered>
        <Modal.Header closeButton={!editando}><Modal.Title>Editar producto</Modal.Title></Modal.Header>
        <Modal.Body>{aEditar && <FormularioProducto producto={aEditar} onGuardando={setEditando} onProductoCreado={() => { setAEditar(null); recargar(); }} />}</Modal.Body>
      </Modal>
      <Modal show={stock !== null} onHide={() => { if (!guardandoStock) setStock(null); }} backdrop={guardandoStock ? "static" : true} keyboard={!guardandoStock} centered>
        <Modal.Header closeButton={!guardandoStock}><Modal.Title>Actualizar stock</Modal.Title></Modal.Header>
        <Modal.Body>{stock && <Formik
          initialValues={{ cambios: stock.map(p => ({ id: p._id, cantidad: p.cantidad })) }}
          validationSchema={Yup.object({ cambios: Yup.array().of(Yup.object({
            cantidad: Yup.number().typeError("Ingresá una cantidad").integer("Debe ser entera").min(0, "No puede ser negativa").required("Obligatoria"),
          })) })}
          onSubmit={async (valores, { setStatus }) => {
            setStatus(undefined);
            setGuardandoStock(true);
            try { await actualizarStock(valores.cambios); setStock(null); recargar(); }
            catch (fallo) { setStatus(fallo instanceof Error ? fallo.message : "No se pudo guardar el stock."); }
            finally { setGuardandoStock(false); }
          }}>
          {({ isSubmitting, status }) => <Form noValidate><fieldset disabled={isSubmitting}>
            <p>Las cantidades reemplazan el stock actual de los productos mostrados.</p>
            {stock.map((p, indice) => <div key={p._id} className="mb-3">
              <label htmlFor={"stock-" + p._id} className="form-label">{p.nombre}</label>
              <Field id={"stock-" + p._id} name={`cambios.${indice}.cantidad`} type="number" min="0" step="1" className="form-control" />
              <ErrorMessage name={`cambios.${indice}.cantidad`} component="div" className="text-danger" />
            </div>)}
            {status && <Alert variant="danger">{status}</Alert>}
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Guardando..." : "Guardar stock"}</Button>
          </fieldset></Form>}
        </Formik>}</Modal.Body>
      </Modal>
    </Container>
  </section>;
}
