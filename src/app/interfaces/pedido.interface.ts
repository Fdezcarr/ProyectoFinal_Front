export interface Pedido {
    id?: number;
    origen: number;
    destino: number;
    origen_nombre: string;
    destino_nombre: string;
    fecha_creacion: string;
    fecha_modificacion?: string;
    fecha_fin?: string;
    estado: Status;
    matricula_camion: string;
    encargado: number,
    encargado_nombre: string,
    operario: number,
    operario_nombre: string,
    detalles:string
}

export enum Status {
    'Pendiente' = 'pendiente',
    'Revisando' = 'revisando',
    'Completado' = 'completado',
}
