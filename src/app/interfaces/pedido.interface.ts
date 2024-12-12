export interface Pedido {
    id?: number;
    origen: string;
    destino: string;
    fecha_salida?: string;
    estado: Status;
    matricula_camion: string;
}

export enum Status {
    'Pendiente de pago' = 'pendiente_de_pago',
    'Aceptado' = 'aceptado',
    'Cancelado' = 'cancelado',
    'En revisión' = 'en_revision',
    'Pendiente de envío' = 'pendiente_de_envio',
    'Enviado' = 'enviado',
    'Entregado' = 'entregado',
}
