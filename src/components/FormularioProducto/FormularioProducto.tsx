import * as Yup from "yup";
import type { ProductoNuevo } from "../../types/Producto";
import { crearProducto } from "../../services/productos";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface FormularioProductoProps {
  onProductoCreado: () => void;
}

const esquemaProducto = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  descripcion: Yup.string(),
  precio: Yup.number()
    .min(0, "El precio no puede ser negativo")
    .required("El precio es obligatorio"),
  cantidad: Yup.number()
    .integer("La cantidad debe ser un número entero")
    .min(0, "La cantidad no puede ser negativa")
    .required("La cantidad es obligatoria"),
  categoria: Yup.string(),
});

const valoresIniciales: ProductoNuevo = {
  nombre: "",
  descripcion: "",
  precio: 0,
  cantidad: 0,
  categoria: "",
};

const FormularioProducto = ({
  onProductoCreado,
}: FormularioProductoProps) => {
  return (
    <Formik
      initialValues={valoresIniciales}
      validationSchema={esquemaProducto}
      onSubmit={async (valores, { resetForm }) => {
        await crearProducto(valores);
            onProductoCreado();
            resetForm();
      }}
    >
      <Form>
        <div className="mb-3">
            <label htmlFor="nombre">Nombre</label>

            <Field
                id="nombre"
                name="nombre"
                type="text"
                className="form-control"
            />

            <ErrorMessage
                name="nombre"
                component="div"
                className="text-danger"
            />
        </div>  

        <div className="mb-3">
            <label htmlFor="precio">Precio</label>

            <Field
                id="precio"
                name="precio"
                type="number"
                className="form-control"
            />

            <ErrorMessage
                name="precio"
                component="div"
                className="text-danger"
            />
        </div>

        <div className="mb-3">
            <label htmlFor="descripcion">Descripcion</label>
            <Field
                id="descripcion"
                name="descripcion"
                type="textarea"
                className="form-control"
            />

            <ErrorMessage
                name="descripcion"
                component="div"
                className="text-danger"
            />
        </div>

        <div className="mb-3">
            <label htmlFor="cantidad">Cantidad</label>
            <Field
                id="cantidad"
                name="cantidad"
                type="number"
                className="form-control"
            />

            <ErrorMessage
                name="cantidad"
                component="div"
                className="text-danger"
            />
        </div>

        <div className="mb-3">
            <label htmlFor="categoria">Categoria</label>
            <Field
                id="categoria"
                name="categoria"
                type="text"
                className="form-control"
            />

            <ErrorMessage
                name="categoria"
                component="div"
                className="text-danger"
            />
        </div>

        <button type="submit" className="btn btn-primary">
        Crear producto
        </button>
      </Form>
    </Formik>
  );
};

export default FormularioProducto;