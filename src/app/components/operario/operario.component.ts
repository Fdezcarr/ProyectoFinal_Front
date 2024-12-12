import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlmacenService } from '../../services/almacen.service';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';
import { SelectorAlmacenComponent } from "../selector-almacen/selector-almacen.component";

@Component({
    selector: 'app-operario',
    standalone: true,
    imports: [CommonModule, FormsModule, SelectorAlmacenComponent], // Importamos los módulos necesarios
    templateUrl: './operario.component.html',
    styleUrls: ['./operario.component.css'],
})
export class OperarioComponent {
    tareas: any[] = [];
    filterText: string = '';
    nuevoPedido: any = {
        nombre: '',
        origen: '',
        destino: '',
        fecha: '',
        estado: 'Pendiente',
        contacto: '',
    };
    almacenes: any[] = [];

    nuevoAlmacen: any = { nombre: '', localizacion: '' };

    almacenService = inject(AlmacenService);

    constructor() {}

    ngOnInit(): void {
        // Inicializar datos de prueba
        this.cargarAlmacenes();
    }

    cargarAlmacenes(): void {
        this.almacenService.getAlmacenes().subscribe(
            (data) => (this.almacenes = data),
            (error) => console.error('Error al cargar almacenes:', error)
        );
    }

    crearPedido(): void {
        const nuevoPedidoConId = {
            id: this.tareas.length + 1,
            ...this.nuevoPedido, // Copia todos los valores del formulario
        };

        this.tareas.push(nuevoPedidoConId);
        console.log('Pedido añadido:', nuevoPedidoConId);

        // Reiniciar el formulario
        this.nuevoPedido = {
            nombre: '',
            origen: '',
            destino: '',
            fecha: '',
            estado: 'Pendiente',
            contacto: '',
        };
    }

    actualizarEstado(tarea: any, nuevoEstado: string): void {
        tarea.estado = nuevoEstado;
        console.log(`Tarea ${tarea.id} actualizada a: ${nuevoEstado}`);
    }

    eliminarTarea(id: number): void {
        console.log(`Eliminar tarea con ID: ${id}`);
        this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
    }
}
