# Pilar Tecno — Community Merch

Frontend del catálogo y la administración de merch de Pilar Tecno. Permite explorar prendas, consultar precios y disponibilidad, y gestionar productos conectándose a la API real con persistencia en MongoDB.

La identidad visual utiliza azul eléctrico, acentos lima e ilustraciones de prendas. Las ilustraciones son referencias visuales: no son fotografías de los productos.

## Tecnologías

React 19, TypeScript, Vite, React Router, Axios, Formik, Yup, Bootstrap, React Bootstrap y React Icons. Oxlint se utiliza para revisar el código.

## Requisitos

- Node.js 20.19 o superior compatible con las dependencias del proyecto y npm.
- La API de Pilar Tecno en ejecución.
- MongoDB accesible desde la API.

El frontend no se conecta directamente a MongoDB: todas las operaciones pasan por los servicios de la API.

## Instalación y ejecución local

Desde la carpeta `landing-pilar-tecno`:

```powershell
npm install
Copy-Item .env.example .env.local
```

Configurar `.env.local`:

```dotenv
VITE_API_URL=http://localhost:3000
```

Esta URL es la base de la API, sin agregar `/productos`. Si no se configura, se utiliza `http://localhost:3000`. Las variables `VITE_*` son públicas; no deben contener secretos.

Iniciar MongoDB y la API siguiendo su README. Luego iniciar el frontend:

```powershell
npm run dev
```

Abrir la dirección que indique Vite, normalmente `http://localhost:5173`. Reiniciar Vite después de modificar las variables de entorno.

El origen exacto del frontend debe estar permitido en `CORS_ORIGINS` de la API. Si Vite cambia de puerto, actualizar esa configuración y reiniciar el backend.

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Presentación del merch y acceso al catálogo. |
| `/productos` | Catálogo conectado a la API, ABM y consultas de negocio. |
| `/contacto` | Página informativa con acceso al catálogo; no envía mensajes. |
| Otras rutas | Página no encontrada con enlace al inicio. |

La navegación utiliza React Router y Link/NavLink sin recargar la página. El menú incluye un selector de tema claro u oscuro.

## Funcionalidades

- **Crear:** botón “Nuevo producto” y formulario en modal con Formik y Yup.
- **Listar:** productos reales con nombre, descripción, categoría, precio y stock.
- **Editar:** formulario precargado, validación y guardado en la API.
- **Eliminar:** modal de confirmación antes de enviar la solicitud.
- **Consultar por categoría:** coincidencia exacta con la categoría ingresada.
- **Consultar bajo stock:** productos cuya cantidad es estrictamente menor al límite indicado.
- **Actualizar stock:** edición de las cantidades de los productos del listado actual mediante el endpoint de negocio. Las cantidades reemplazan el stock existente.
- Indicadores de carga, mensajes de error, actualización del listado y bloqueo de envíos duplicados.

Los precios se muestran en pesos argentinos (ARS). Nombre, precio y cantidad son obligatorios; el precio debe ser no negativo y la cantidad debe ser un entero no negativo.

El alcance de esta entrega no incluye login, Context ni rutas privadas. Tampoco incluye carrito, pagos ni procesamiento de pedidos.

## Organización

```text
src/
├── assets/                      Recursos estáticos
├── components/
│   ├── BarraNavegacion/          Navegación y selector de tema
│   ├── Footer/                  Pie de página
│   ├── FormularioProducto/      Formulario compartido de alta y edición
│   ├── Prenda/                  Ilustraciones de referencia en SVG
│   └── Productos/               Listado, filtros, edición, baja y stock
├── pages/                       Inicio, catálogo y contacto
├── services/
│   └── productos.ts             Cliente Axios y llamadas a la API
├── types/
│   └── Producto.ts              Producto, ProductoNuevo y CambioStock
├── App.tsx                      Definición de rutas
├── main.tsx                     Inicialización y BrowserRouter
└── index.css                    Estilos compartidos y temas
```

Axios se centraliza en `src/services/productos.ts`, con URL configurable, timeout y tratamiento de errores. Los componentes consumen los servicios y los tipos de `src/types/`.

## Endpoints utilizados

| Operación | Método y ruta |
| --- | --- |
| Listar | `GET /productos` |
| Crear | `POST /productos` |
| Editar | `PUT /productos/:id` |
| Eliminar | `DELETE /productos/:id` |
| Filtrar categoría | `GET /productos/categoria/:categoria` |
| Consultar bajo stock | `GET /productos/bajo-stock/:cantidad` |
| Actualizar cantidades | `PUT /productos/actualizar-stock` |

El servicio también expone `obtenerProductoPorId` para `GET /productos/:id`.

## Comandos

| Comando | Uso |
| --- | --- |
| `npm run dev` | Servidor de desarrollo. |
| `npm run build` | Comprobación de TypeScript y compilación en `dist/`. |
| `npm run lint` | Revisión con Oxlint. |
| `npm run preview` | Vista previa local de una compilación ya generada. |

Para publicar el frontend, el hosting debe redirigir las rutas de la aplicación a `index.html`, y `VITE_API_URL` debe configurarse antes de compilar con la URL accesible de la API.

## Problemas frecuentes

- **No se pueden cargar productos:** comprobar que la API y MongoDB estén iniciados y revisar `VITE_API_URL`.
- **Error de CORS:** permitir en la API el origen exacto que muestra Vite, incluyendo protocolo y puerto.
- **Listado vacío:** verificar si existen productos o si los filtros coinciden. Se puede crear un producto desde “Nuevo producto”.
- **Cambios de entorno sin efecto:** reiniciar Vite; para una versión compilada, generar nuevamente el build.

Más detalles de conexión en [CONEXION-API.md](CONEXION-API.md).
