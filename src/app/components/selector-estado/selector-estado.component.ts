import { Component, inject, Input } from '@angular/core';
import { PedidosService } from '../../services/orders.service';

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
    estadosFilter : any[] = []

    async ngOnInit() {
        this.estados = await this.pedidosService.getPedidosStatus();
         this.estadosFilter = this.estados.filter(
             (estado: any) => estado !== this.pedido.estado
         );
    }

    async estadoChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        this.pedido.estado = target.value;
        this.pedidosService
            .patchEstadoPedido(this.pedido.id, this.pedido)
            .subscribe({
                next: (updatedPedido) => {                    
                },
                error: (err) => {
                    console.error('Error al actualizar el pedido:', err);
                },
            });
    }
}
