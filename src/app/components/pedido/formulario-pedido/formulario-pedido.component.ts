import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Pedido } from '../../../interfaces/pedido.interface';
import { PedidosService } from '../../../services/orders.service';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-formulario-pedido',
    standalone: true,
    imports: [NavbarComponent, RouterOutlet, ReactiveFormsModule],
    templateUrl: './formulario-pedido.component.html',
    styleUrl: './formulario-pedido.component.css',
})
export class FormularioPedidoComponent {
    pedidoForm: FormGroup;
    activatedRoute = inject(ActivatedRoute);
    router = inject(Router);

    pedidoService = inject(PedidosService);

    tipo: string = 'Nuevo';
    submitBtn: string = 'Enviar';
    pedido_id!: number;
    // ExpEmail = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,10}$/;

    constructor() {
        this.pedidoForm = new FormGroup({
            origen: new FormControl(null, [Validators.required]),
            destino: new FormControl(null, [Validators.required]),
            matricula_camion: new FormControl(null, [Validators.required]),
            estado: new FormControl(null, []),
            fecha_salida: new FormControl(null, []),
        });
    }

    checkValidation(control: string, validator: string) {
        return (
            this.pedidoForm.get(control)?.hasError(validator) &&
            this.pedidoForm.get(control)?.touched
        );
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(async (params: any) => {
            if (params.id) {
                this.tipo = 'Actualizar';
                this.submitBtn = 'Actualizar';
                console.log(params.id);
                this.pedido_id = params.id;
                const pedido: Pedido = await this.pedidoService.getById(
                    this.pedido_id
                );

                this.pedidoForm = new FormGroup({
                    origen: new FormControl(pedido.origen, [
                        Validators.required,
                    ]),
                    destino: new FormControl(pedido.destino, [
                        Validators.required,
                    ]),
                    matricula_camion: new FormControl(pedido.matricula_camion, [
                        Validators.required,
                    ]),
                    estado: new FormControl(pedido.estado, [
                        Validators.required,
                    ]),
                });
            }
        });
    }

    async getFormData() {
        if (this.pedidoForm.valid) {
            if (this.pedido_id) {
                // UPDATE PEDIDO
                try {
                    console.log(
                        'Updating pedido:',
                        this.pedido_id,
                        this.pedidoForm.value
                    );
                    const pedidoUpdate = await firstValueFrom( this.pedidoService.updatePedido(
                        this.pedido_id,
                        this.pedidoForm.value
                    ));
                    setTimeout(() => this.formSuccess(), 3000);
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    console.log('Form Data:', this.pedidoForm.value);
                    const pedidoCreate = await this.pedidoService.insertPedido(
                        this.pedidoForm.value
                    );
                    setTimeout(() => this.formSuccess(), 3000);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    formSuccess() {
        this.router.navigateByUrl('/dashboard');
    }
}
