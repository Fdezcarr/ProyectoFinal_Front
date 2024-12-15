export interface Pedido {
    id?: number;
    origen: string;
    destino: string;
    fecha_salida?: string;
    estado: Status;
    matricula_camion: string;
}

export enum Status {
    'completado' = 'completado',
    'pendiente' = 'pendiente',
    'revisando' = 'revisando',
}
