import { Component, ElementRef, ViewChild } from '@angular/core';
import { Status } from '../../interfaces/pedido.interface';
import { CommonModule } from '@angular/common';
import { Pedido } from '../../interfaces/pedido.interface';
import { PedidosService } from '../../services/orders.service';
import { FormsModule } from '@angular/forms';
import { SelectorEstadoComponent } from '../selector-estado/selector-estado.component';

@Component({
    selector: 'app-encargado',
    standalone: true,
    imports: [CommonModule, FormsModule, SelectorEstadoComponent],
    templateUrl: './encargado.component.html',
    styleUrl: './encargado.component.css',
})
export class EncargadoComponent {
    @ViewChild('modalDetails') modalElement!: ElementRef;
    pedidos: Pedido[] = [];
    pedido: Pedido;
    pedidosRecientes: Pedido[] = [];

    constructor(private pedidoService: PedidosService) {
        this.pedido = {
            origen: '',
            destino: '',
            matricula_camion: '',
            estado: Status['Pendiente de pago'],
            fecha_salida: '',
        };
        this.pedidoService.getAllPedidos().then((response) => {
            this.pedidos = response.map((pedido) => ({
                ...pedido,
                fecha_salida: this.formatFecha(pedido.fecha_salida),
            }));
            this.filterPedidosRecientes();
        });
    }

    // Formateamos la fecha al formato español 'dd/mm/yyyy'
    formatFecha(fecha: string): string {
        const date = new Date(fecha);
        if (isNaN(date.getTime())) {
            return '';
        }

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };

        return date.toLocaleDateString('es-ES', options); // Formato: dd/mm/yyyy
    }

    filterPedidosRecientes(): void {
        const now = new Date();

        // Creamos una copia temporal de los pedidos para trabajar sin modificar el original
        const pedidosCopia = [...this.pedidos];

        this.pedidosRecientes = pedidosCopia.filter((pedido) => {
            // Calculamos la diferencia en días
            const fechaPedido = new Date(pedido['fecha_salida']);
            const diferenciaDias = Math.floor(
                (now.getTime() - fechaPedido.getTime()) / (1000 * 60 * 60 * 24)
            );
            return diferenciaDias <= 30;
        });
    }

    async guardarPedido() {
        try {
            this.pedidoService
                .updatePedido(this.pedido.id, this.pedido)
                .then((response) => {
                    alert('Pedido actualizado');
                });
        } catch (error) {
            console.error('Error al actualizar el pedido:', error);
        }
    }
}
