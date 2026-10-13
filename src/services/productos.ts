import axios from "axios";
import type { Producto, ProductoNuevo, CambioStock } from "../types/Producto";

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/+$/, ""),
  timeout: 10000,
});
api.interceptors.response.use(respuesta => respuesta, (error: unknown) => {
  if (axios.isCancel(error)) return Promise.reject(error);
  const mensaje = axios.isAxiosError<{ mensaje?: string }>(error)
    ? error.response?.data?.mensaje || "No se pudo conectar con la API. Intentá nuevamente."
    : "Ocurrió un error inesperado.";
  return Promise.reject(new Error(mensaje));
});
export async function obtenerProductos(signal?: AbortSignal): Promise<Producto[]> {
  return (await api.get<Producto[]>("/productos", { signal })).data;
}
export async function obtenerCategoria(categoria: string, signal?: AbortSignal): Promise<Producto[]> {
  return (await api.get<Producto[]>(`/productos/categoria/${encodeURIComponent(categoria)}`, { signal })).data;
}
export async function obtenerBajoStock(cantidad: number, signal?: AbortSignal): Promise<Producto[]> {
  return (await api.get<Producto[]>(`/productos/bajo-stock/${cantidad}`, { signal })).data;
}
export async function crearProducto(datos: ProductoNuevo): Promise<Producto> {
  return (await api.post<Producto>("/productos", datos)).data;
}
export async function actualizarProducto(id: string, datos: ProductoNuevo): Promise<Producto> {
  return (await api.put<Producto>(`/productos/${id}`, datos)).data;
}
export async function eliminarProducto(id: string): Promise<void> {
  await api.delete(`/productos/${id}`);
}
export async function obtenerProductoPorId(id: string, signal?: AbortSignal): Promise<Producto> {
  return (await api.get<Producto>(`/productos/${id}`, { signal })).data;
}
export async function actualizarStock(cambios: CambioStock[]): Promise<void> {
  await api.put("/productos/actualizar-stock", cambios);
}
