import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Status } from '../../interfaces/pedido.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from '../../interfaces/pedido.interface';
import { PedidosService } from '../../services/orders.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { SelectorEstadoComponent } from "../selector-estado/selector-estado.component";
declare var bootstrap: any;

@Component({
    selector: 'app-encargado',
    standalone: true,
    imports: [CommonModule, FormsModule, SelectorEstadoComponent],
    templateUrl: './encargado.component.html',
    styleUrl: './encargado.component.css',
})
export class EncargadoComponent implements OnInit {
    @ViewChild('modalDetails') modalElement!: ElementRef;
    nameUser: string;
    pedidos: Pedido[] = [];
    pedido: Pedido;
    pedidosRecientes: Pedido[] = [];

    constructor(
        private route: ActivatedRoute,
        private pedidoService: PedidosService
    ) {
        this.pedido = {
            origen: '',
            destino: '',
            matricula_camion: '',
            estado: Status['Pendiente de pago'],
            fecha_salida: '',
        };
        this.pedidoService.getAllPedidos().subscribe({
            next: (response) => {
                console.log(response);
                this.pedidos = response.map((pedido) => ({
                    ...pedido,
                    fecha_salida: this.formatFecha(pedido.fecha_salida),
                }));
                this.filterPedidosRecientes();
            },
        });
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.nameUser = params['name'];
        });
    }

    openModalDetails(pedidoId: number) {
        console.log(pedidoId);

        this.getPedidoDetails(pedidoId);
        var myModal = new bootstrap.Modal(
            document.getElementById('modalDetails')
        );
        myModal.show();
    }

    openModalEdit(pedidoId: number) {
        this.getPedidoDetails(pedidoId);
        var myModal = new bootstrap.Modal(document.getElementById('modalEdit'));
        myModal.show();
    }

    closeModal() {
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach((backdrop) => backdrop.remove());
    }

    getPedidoDetails(id: number) {
        this.pedido = this.pedidos[id - 1];
    }

    getUserStatus(estado: Status): string {
        switch (estado) {
            case Status.Aceptado:
                return 'bg-primary';
            case Status.Cancelado:
                return 'bg-danger';
            case Status['En revisión']:
                return 'bg-warning text-dark';
            case Status.Entregado:
                return 'bg-success';
            case Status.Enviado:
                return 'bg-purple';
            case Status['Pendiente de envío']:
                return 'bg-secondary text-light';
            case Status['Pendiente de pago']:
                return 'bg-light text-dark';
            default:
                return '';
        }
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

    getEstadoKey(estado: string): string {
        // Mapeamos el valor a su key en el enum
        const estadoKey = Object.keys(Status).find(
            (key) => Status[key] === estado
        );
        return estadoKey || estado;
    }

    async guardarPedido() {
        //TRY CATCH en caso de usar PROMISE
        // console.log('Submitting pedido:', this.pedido);
        // try {
        //     const updatedPedido = await this.pedidoService.updatePedido(
        //         this.pedido.id,
        //         this.pedido
        //     );
        //     alert('Pedido actualizado');
        //     console.log('Pedido updated successfully:', updatedPedido);
        // } catch (err) {
        //     console.error('Error al actualizar el pedido:', err);
        //     alert('Hubo un error al actualizar el pedido');
        // }
        
        this.pedidoService.updatePedido(this.pedido.id, this.pedido).subscribe({
            next: (updatedPedido) => {
                alert('Pedido actualizado');
            },
            error: (err) => {
                console.error('Error al actualizar el pedido:', err);
            },
        });
    }
}
