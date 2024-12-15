import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pedido } from '../../interfaces/pedido.interface';
import { PedidosService } from '../../services/orders.service';
import { FormsModule } from '@angular/forms';
import { SelectorEstadoComponent } from '../selector-estado/selector-estado.component';
import { AuthService } from '../../services/auth.service';
import { Almacen } from '../../interfaces/almacen.interface';

@Component({
    selector: 'app-encargado',
    standalone: true,
    imports: [CommonModule, FormsModule, SelectorEstadoComponent],
    templateUrl: './encargado.component.html',
    styleUrl: './encargado.component.css',
})
export class EncargadoComponent {
    authService = inject(AuthService);
    pedidoService = inject(PedidosService);

    @ViewChild('modalDetails') modalElement!: ElementRef;
    pedidos: Pedido[] = [];
    pedido: Pedido;
    pedidosRecientes: Pedido[] = [];
    almacen: number | null = null;

    ngOnInit() {
        const { id, almacen }: any = this.authService.getUser();
        this.almacen = almacen;
        console.log(this.almacen, almacen)

        
        this.pedidoService.getAllMyPedidos(id).subscribe({
            next: (response) => {
                this.pedidos = response;
            },
        });
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
