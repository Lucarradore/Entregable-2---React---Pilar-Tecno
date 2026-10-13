import axios from "axios";
import type {Ropa} from "../types/Ropa";

const BASE_URL = "http://localhost:3000/Ropa";

//Promesa y await van siempre en estos servicios
export const obtenerRopa = async(): Promise<Ropa[]> => {
    const respuesta = await axios.get(BASE_URL);
    return respuesta.data;
};
