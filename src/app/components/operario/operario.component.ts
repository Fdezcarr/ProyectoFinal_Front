import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlmacenService } from '../../services/almacen.service';
import { SelectorAlmacenComponent } from '../selector-almacen/selector-almacen.component';
import { PedidosService } from '../../services/orders.service';
import { Pedido, Status } from '../../interfaces/pedido.interface';
import { SelectorEstadoComponent } from '../selector-estado/selector-estado.component';
import { Almacen } from '../../interfaces/almacen.interface';

@Component({
    selector: 'app-operario',
    standalone: true,
    imports: [CommonModule, FormsModule, SelectorEstadoComponent],
    templateUrl: './operario.component.html',
    styleUrls: ['./operario.component.css'],
})
export class OperarioComponent {
    pedidos: Pedido[] = [];
    almacenes: Almacen[];
    nuevoPedido: Pedido = {
        matricula_camion: '',
        origen: '',
        destino: '',
        fecha_salida: '',
        estado: Status.pendiente,
    };

    constructor(
        private pedidoService: PedidosService,
        private almacenServices: AlmacenService
    ) {}

    ngOnInit(): void {
        this.pedidoService.getAllPedidos().then((response) => {
            this.pedidos = response.filter(
                (pedido) => pedido.estado === Status.pendiente
            );
        });
        this.almacenServices.getAlmacenes().then((response) => {
            this.almacenes = response;
            this.nuevoPedido.origen = this.almacenes[0].nombre;
            this.nuevoPedido.destino = this.almacenes[1].nombre;
        });
    }

    crearPedido(): void {
        try {
            this.pedidoService
                .insertPedido(this.nuevoPedido)
                .then((response) => {
                    if (response) {
                        alert(
                            'Pedido con ID ' +
                                response.id +
                                ' se ha creado correctamente'
                        );
                        this.pedidoService
                            .getAllPedidos()
                            .then((response) => {
                                this.pedidos = response.filter(
                                    (pedido) =>
                                        pedido.estado === Status.pendiente
                                );
                            })
                            .finally(() => {
                                // Reiniciar el formulario
                                this.nuevoPedido = {
                                    matricula_camion: '',
                                    origen: '',
                                    destino: '',
                                    fecha_salida: '',
                                    estado: Status.pendiente,
                                };
                            });
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    actualizarEstado(tarea: any, nuevoEstado: string): void {
        tarea.estado = nuevoEstado;
        console.log(`Tarea ${tarea.id} actualizada a: ${nuevoEstado}`);
    }

    // eliminarPedido(id: number): void {
    //     console.log(`Eliminar tarea con ID: ${id}`);
    //     this.pedidos = this.pedidos.filter((tarea) => tarea.id !== id);
    // }
}
