import axios from "axios";
import type { Producto, ProductoNuevo } from "../types/Producto";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/+$/, "");

export async function obtenerProductos(signal?: AbortSignal): Promise<Producto[]> {
  try { 
    

    const respuesta = await axios.get<Producto[]>(
    `${API_URL}/productos`,
    {signal}
    );
    const datos = respuesta.data;
    
    
  if (!Array.isArray(datos) || !datos.every(producto =>
    producto && typeof producto._id === "string" &&
    typeof producto.nombre === "string" &&
    typeof producto.precio === "number" &&
    typeof producto.cantidad === "number" &&
    (producto.descripcion == null || typeof producto.descripcion === "string") &&
    (producto.categoria == null || typeof producto.categoria === "string")
  )) {
    throw new Error("El servidor devolvió una lista de productos inválida.");
  }
  return datos;
  } catch (error) {
      if (signal?.aborted) throw error;

      throw new Error("No se pudieron cargar los productos.");
    }
}

export async function crearProducto(
  datos: ProductoNuevo
): Promise<Producto> {
  try {
    const respuesta = await axios.post<Producto>(
      `${API_URL}/productos`,
      datos
    );

    return respuesta.data;
  } catch {
    throw new Error("No se pudo crear el producto.");
  }
}

export async function actualizarProducto(
  id: string,
  datos: ProductoNuevo
): Promise<Producto> {
  try {
    const respuesta = await axios.put<Producto>(
      `${API_URL}/productos/${id}`,
      datos
    );

    return respuesta.data;
  } catch {
    throw new Error("No se pudo actualizar el producto.");
  }
}

export async function eliminarProducto(id: string): Promise<void> {
  try {
    await axios.delete(`${API_URL}/productos/${id}`);
  } catch {
    throw new Error("No se pudo eliminar el producto.");
  }
}

export async function obtenerProductoPorId(
  id: string
): Promise<Producto> {
  try {
    const respuesta = await axios.get<Producto>(
      `${API_URL}/productos/${id}`
    );

    return respuesta.data;
  } catch {
    throw new Error("No se pudo obtener el producto.");
  }
}

