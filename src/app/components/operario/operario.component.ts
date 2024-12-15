import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlmacenService } from '../../services/almacen.service';
import { PedidosService } from '../../services/orders.service';
import { Pedido, Status } from '../../interfaces/pedido.interface';
import { SelectorEstadoComponent } from '../selector-estado/selector-estado.component';
import { Almacen } from '../../interfaces/almacen.interface';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { REMOVE_STYLES_ON_COMPONENT_DESTROY } from '@angular/platform-browser';

@Component({
    selector: 'app-operario',
    standalone: true,
    imports: [CommonModule, FormsModule, SelectorEstadoComponent],
    templateUrl: './operario.component.html',
    styleUrls: ['./operario.component.css'],
})
export class OperarioComponent {
    authService = inject(AuthService);
    pedidoService = inject(PedidosService);
    usuariosService = inject(UsuarioService);
    almacenService = inject(AlmacenService);
    user: number = null;
    pedidos: Pedido[] = [];
    pedido: Pedido;
    pedidosRecientes: Pedido[] = [];
    almacen: number | null = null;
    almacenes: Almacen[];

    nuevoPedido: Pedido = {
        matricula_camion: '',
        origen: null,
        origen_nombre: '',
        destino: null,
        destino_nombre: '',
        fecha_creacion: '',
        operario: this.user,
        operario_nombre: '',
        encargado: null,
        encargado_nombre: '',
        estado: Status.pendiente,
        detalles: '',
    };

    ngOnInit(): void {
        const { id, almacen }: any = this.authService.getUser();
        this.almacen = almacen;
        this.user = id
        
        this.pedidoService.getAllMyPedidos(id).subscribe({
            next: (response) => {
                this.pedidos = response;
            },
        });

        this.almacenService.getAlmacenes().then((response) => {
            this.almacenes = response;
            this.nuevoPedido.origen = this.almacenes[0].id;
            this.nuevoPedido.destino = this.almacenes[1].id;
        });
        
    }

    // async crearPedido() {
    //     try {
    //         const pedidoEnviado = await this.pedidoService.insertPedido(
    //             this.nuevoPedido
    //         );
    //         console.log('petición', pedidoEnviado);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // crearPedido(): void {
    //     try {
    //         this.pedidoService
    //             .insertPedido(this.nuevoPedido)
    //             .then((response) => {
    //                 if (response) {
    //                     alert(
    //                         'Pedido con ID ' +
    //                             response.id +
    //                             ' se ha creado correctamente'
    //                     );
    //                     this.pedidoService
    //                         .getAllPedidos()
    //                         .then((response) => {
    //                             this.pedidos = response.filter(
    //                                 (pedido) =>
    //                                     pedido.estado === Status.pendiente
    //                             );
    //                         })
    //                         .finally(() => {
    //                             // Reiniciar el formulario
    //                             this.nuevoPedido = {
    //                                 matricula_camion: '',
    //                                 origen: '',
    //                                 destino: '',
    //                                 fecha_salida: '',
    //                                 estado: Status.pendiente,
    //                             };
    //                         });
    //                 }
    //             });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    crearPedido(): void {
        console.log(this.nuevoPedido)
        try {
            this.pedidoService.getAllMyPedidos(this.user).subscribe({
                next: (response) => {
                    this.pedidos = response;
                    console.log(response)
                },
            });

        } catch (error) {
            console.log(error);
        }
    }

destinoChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.usuariosService
        .getEncargadoByAlmacenId(Number(target.value))
        .subscribe({
            next: (response) => {
                this.nuevoPedido.encargado_nombre = `${response[0].nombre} ${response[0].apellido}`;
               this.nuevoPedido.encargado = response[0].id
            },
        });


    this.nuevoPedido.operario= Number(target.value)



}


    actualizarEstado(tarea: any, nuevoEstado: string): void {
        tarea.estado = nuevoEstado;
        console.log(`Tarea ${tarea.id} actualizada a: ${nuevoEstado}`);
    }

    eliminarPedido(id: number): void {
        console.log(`Eliminar tarea con ID: ${id}`);
        this.pedidos = this.pedidos.filter((tarea) => tarea.id !== id);
    }
}
