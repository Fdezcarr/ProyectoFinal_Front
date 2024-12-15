import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { AlmacenService } from '../../services/almacen.service';
import { Usuario } from '../../interfaces/usuario';
import { Almacen } from '../../interfaces/almacen.interface';

@Component({
    selector: 'app-jefe',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './jefe.component.html',
    styleUrls: ['./jefe.component.css'],
})
export class JefeComponent implements OnInit {
    usuarioService = inject(UsuarioService);
    almacenService = inject(AlmacenService);

    usuarios: Usuario[] = [];
    almacenes: Almacen[] = [];
    nuevoUsuario: Usuario = {
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        rol: '',
        almacen: null,
        almacen_nombre: '',
        telefono: null,
    };

    nuevoAlmacen: Almacen = { nombre: '', localizacion: '' };
    almacenSeleccionado: Almacen = null;
    usuarioSeleccionado: Usuario = null;
    emailDuplicado: boolean = false;

    ngOnInit(): void {
        this.cargarUsuarios();
        this.cargarAlmacenes();
    }

    cargarUsuarios() {
        this.usuarioService.getUsuarios().subscribe({
            next: (data) => {
                this.usuarios = data;
            },
        });
    }

    cargarAlmacenes(): void {
        try {
            this.almacenService.getAlmacenes().then((response) => {
                this.almacenes = response;
            });
        } catch (error) {
            console.error('Error al cargar almacenes:', error);
        }
    }

    verificarEmail(): void {
        if (this.nuevoUsuario.email) {
            this.usuarioService.checkEmail(this.nuevoUsuario.email).subscribe(
                () => (this.emailDuplicado = false),
                () => (this.emailDuplicado = true)
            );
        }
    }

    crearUsuario(): void {
        if (this.emailDuplicado) {
            alert('El email ya está registrado');
            return;
        }

        if (!this.nuevoUsuario.rol) {
            alert('Por favor, selecciona un rol antes de crear el usuario.');
            return;
        }

        if (!this.nuevoUsuario.almacen) {
            alert(
                'Por favor, selecciona un almacén antes de crear el usuario.'
            );
            return;
        }

        console.log(this.nuevoUsuario);

        this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe(() => {
            this.cargarUsuarios();
            this.nuevoUsuario = {
                nombre: '',
                apellido: '',
                email: '',
                password: '',
                rol: '',
                almacen: null,
                almacen_nombre: '',
                telefono: null,
            };
        });
    }

    crearAlmacen(): void {
        this.almacenService.crearAlmacen(this.nuevoAlmacen).subscribe(() => {
            this.cargarAlmacenes();
            this.nuevoAlmacen = { nombre: '', localizacion: '' };
        });
    }

    cargarUsuarioAEditar(usuario: Usuario) {
        this.usuarioSeleccionado = usuario;
    }

    async editarUsuario() {
        const usuarioEditado = await this.usuarioService
            .editarUsuario(this.usuarioSeleccionado)
            .then((response) => {
                alert('Usuario actualizado');
                console.log(response);
            })
            .finally(() => {
                this.usuarioSeleccionado = null;
            });
            
    }

    cargarAlmacenAEditar(almacen: Almacen) {
        this.almacenSeleccionado = almacen;
    }

    editarAlmacen() {
        try {
            this.almacenService
                .editarAlmacen(this.almacenSeleccionado)
                .then((response) => {
                    console.log(response);
                })
                .finally(() => {
                    this.almacenSeleccionado = null;
                });
        } catch (error) {
            console.error(error);
        }
    }

    eliminarUsuario(id: number): void {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            this.usuarioService
                .eliminarUsuario(id)
                .subscribe(() => this.cargarUsuarios());
        }
    }

    eliminarAlmacen(id: number): void {
        if (confirm('¿Estás seguro de eliminar este almacén?')) {
            this.almacenService
                .eliminarAlmacen(id)
                .subscribe(() => this.cargarAlmacenes());
        }
    }
}
