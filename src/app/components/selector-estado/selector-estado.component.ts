import { Component, inject, Input } from '@angular/core';
import { PedidosService } from '../../services/orders.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-selector-estado',
    standalone: true,
    imports: [],
    templateUrl: './selector-estado.component.html',
    styleUrl: './selector-estado.component.css',
})
export class SelectorEstadoComponent {
    @Input() pedido;
    pedidosService = inject(PedidosService);

    estados: any = [];
    estadosFilter: any[] = [];

    async ngOnInit() {
        this.estados = await this.pedidosService.getPedidosStatus();
        // this.estadosFilter = this.estados.filter(
        //     (estado: any) => estado !== this.pedido.estado
        // );
    }

    async estadoChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        this.pedido.estado = target.value;

        if (this.pedido.estado === 'completado') {
            const result = await Swal.fire({
                title: '¿Completar pedido?',
                showCancelButton: true,
                confirmButtonColor: '#a3cfbb',
                cancelButtonColor: '##5c636a',
                confirmButtonText: 'Completar',
                cancelButtonText: 'Cancelar',
            });

            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Confirmed!',
                    text: 'The status has been updated.',
                });

                this.pedidosService
                    .patchEstadoPedido(this.pedido.id, this.pedido)
                    .subscribe({
                        next: (updatedPedido) => {
                            console.log('Pedido updated:', updatedPedido);
                        },
                        error: (err) => {
                            console.error('Error updating pedido:', err);
                        },
                    });
            } else {
                target.value = this.pedido.estado; 
            }
        } else {
            this.pedidosService
                .patchEstadoPedido(this.pedido.id, this.pedido)
                .subscribe({
                    next: (updatedPedido) => {
                        console.log('Pedido updated:', updatedPedido);
                    },
                    error: (err) => {
                        console.error('Error updating pedido:', err);
                    },
                });
        }
    }
}
