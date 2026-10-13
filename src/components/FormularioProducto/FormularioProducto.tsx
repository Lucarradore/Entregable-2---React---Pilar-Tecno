import { useId } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { Producto, ProductoNuevo } from "../../types/Producto";
import { actualizarProducto, crearProducto } from "../../services/productos";

interface Props {
  onProductoCreado: () => void;
  producto?: Producto;
  onGuardando?: (guardando: boolean) => void;
}
const esquema = Yup.object({
  nombre: Yup.string().trim().required("El nombre es obligatorio"),
  descripcion: Yup.string(),
  categoria: Yup.string(),
  precio: Yup.number().typeError("Ingresá un precio válido").min(0, "El precio no puede ser negativo").required("El precio es obligatorio"),
  cantidad: Yup.number().typeError("Ingresá una cantidad válida").integer("La cantidad debe ser entera").min(0, "La cantidad no puede ser negativa").required("La cantidad es obligatoria"),
});
export default function FormularioProducto({ onProductoCreado, producto, onGuardando }: Props) {
  const prefijo = useId();
  const iniciales: ProductoNuevo = {
    nombre: producto?.nombre ?? "", descripcion: producto?.descripcion ?? "",
    precio: producto?.precio ?? 0, cantidad: producto?.cantidad ?? 0,
    categoria: producto?.categoria ?? "",
  };
  return <Formik initialValues={iniciales} enableReinitialize validationSchema={esquema}
    onSubmit={async (valores, { resetForm, setStatus }) => {
      setStatus(undefined);
      onGuardando?.(true);
      const datos = { ...valores, nombre: valores.nombre.trim(), categoria: valores.categoria.trim(), descripcion: valores.descripcion.trim() };
      try {
        if (producto) await actualizarProducto(producto._id, datos);
        else await crearProducto(datos);
        resetForm();
        onProductoCreado();
        if (!producto) setStatus({ mensaje: "Producto creado correctamente." });
      } catch (error) {
        setStatus({ error: error instanceof Error ? error.message : "No se pudo guardar." });
      } finally { onGuardando?.(false); }
    }}>
    {({ isSubmitting, status }) => <Form noValidate>
      <fieldset disabled={isSubmitting}>
        {(["nombre", "descripcion", "precio", "cantidad", "categoria"] as const).map(campo => <div className="mb-3" key={campo}>
          <label htmlFor={prefijo + campo} className="form-label">{{ nombre: "Nombre", descripcion: "Descripción", precio: "Precio", cantidad: "Cantidad", categoria: "Categoría" }[campo]}</label>
          <Field id={prefijo + campo} name={campo} as={campo === "descripcion" ? "textarea" : "input"}
            type={campo === "precio" || campo === "cantidad" ? "number" : "text"}
            min={campo === "precio" || campo === "cantidad" ? 0 : undefined}
            step={campo === "precio" ? "any" : campo === "cantidad" ? 1 : undefined}
            className="form-control" />
          <ErrorMessage name={campo} component="div" className="text-danger" />
        </div>)}
        {status?.error && <div role="alert" className="alert alert-danger">{status.error}</div>}
        {status?.mensaje && <div role="status" className="alert alert-success">{status.mensaje}</div>}
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : producto ? "Guardar cambios" : "Crear producto"}
        </button>
      </fieldset>
    </Form>}
  </Formik>;
}
