export interface Pedido {
    id?: number;
    origen: number;
    destino: number;
    origen_nombre: string;
    destino_nombre: string;
    fecha_salida?: string;
    estado: Status;
    matricula_camion: string;
    encargado: number,
    encargado_nombre: string,
    operario: number,
    operario_nombre: string,
}

export enum Status {
    'Pendiente' = 'pendiente',
    'En revisión' = 'en_revision',
    'Completado' = 'completado',
}
