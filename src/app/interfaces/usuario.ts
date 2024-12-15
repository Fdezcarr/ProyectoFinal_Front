export interface Usuario {
    id?: number;
    nombre: string;
    apellido?: string;
    email: string;
    rol: string;
    almacen_id?: number;
    password?: string;
}
