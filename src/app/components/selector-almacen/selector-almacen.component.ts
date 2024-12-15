import { Component, inject, Input } from '@angular/core';
import { AlmacenService } from '../../services/almacen.service';
import { Almacen } from '../../interfaces/almacen.interface';

@Component({
    selector: 'app-selector-almacen',
    standalone: true,
    imports: [],
    templateUrl: './selector-almacen.component.html',
    styleUrl: './selector-almacen.component.css',
})
export class SelectorAlmacenComponent {
    @Input() id;
    almacenService = inject(AlmacenService);
    almacenes: Almacen[] = [];

    ngOnInit() {
        this.almacenService.getAlmacenes().then((response) => {
            this.almacenes = response;
        });
        try {
        } catch (error) {
            console.error('Error al cargar los almacenes:', error);
        }
    }
}
