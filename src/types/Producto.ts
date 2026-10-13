export type Producto = {
  _id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  cantidad: number;
  categoria?: string;
  fechaIngreso: string;
};
export type ProductoNuevo = {
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  categoria: string;
};
export type CambioStock = { id: string; cantidad: number };
