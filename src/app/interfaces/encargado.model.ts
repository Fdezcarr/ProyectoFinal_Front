import { Status } from './pedido.interface';

export interface User {
    id: number;
    nombre: string;
    apellidos: string;
    origen: string;
    destino: string;
    fecha: string;
    estado: Status;
    contacto: string;
}
