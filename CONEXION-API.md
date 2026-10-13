# Frontend Pilar Tecno

## Ejecutar
1. Iniciar MongoDB y ejecutar `npm run dev` en API-PILAR-TECNO.
2. Ejecutar `npm install` y `npm run dev` en este frontend.
3. Abrir la dirección que indica Vite.

La API se configura con `VITE_API_URL=http://localhost:3000` en `.env.local`. Reiniciar Vite después de cambiarla. El origen del frontend debe estar permitido en CORS_ORIGINS de la API.

## Funcionalidades
- Navegación con React Router y Link: inicio, productos y contacto.
- Crear y editar productos con Formik y Yup.
- Listado real y eliminación con modal de confirmación.
- Consulta por categoría exacta y stock menor al límite indicado.
- Actualización de stock de los productos del listado mediante el endpoint de negocio. Las cantidades reemplazan el stock actual.
- Errores visibles y bloqueo de envíos duplicados.
- Sin login, Context ni rutas privadas.

## Arquitectura
`src/types/` define Producto, ProductoNuevo y CambioStock.
`src/services/productos.ts` centraliza Axios, la URL, el timeout y los errores de la API.
`src/pages/` organiza las páginas. Los componentes llaman a los servicios.

## Verificar
`npm run build`
`npm run lint`

La página Contacto no envía mensajes; no se proporcionaron datos de contacto.
