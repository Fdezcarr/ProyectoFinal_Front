import { Component, OnInit } from '@angular/core';
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
    usuarios: Usuario[] = [];
    almacenes: any[] = [];
    nuevoUsuario: Usuario = {
        nombre: '',
        apellido: '',
        email: '',
        password: '1234',
        rol: '',
        almacen_id: null,
    };
    nuevoAlmacen: any = { nombre: '', localizacion: '' };
    almacenSeleccionado: Almacen = null;
    usuarioSeleccionado: Usuario = null;
    emailDuplicado: boolean = false;

    constructor(
        private usuarioService: UsuarioService,
        private almacenService: AlmacenService
    ) {}

    ngOnInit(): void {
        this.cargarUsuarios();
        this.cargarAlmacenes();
    }

    cargarUsuarios(): void {
        this.usuarioService.getUsuarios().subscribe(
            (data) => (this.usuarios = data),
            (error) => console.error('Error al cargar usuarios:', error)
        );
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

        if (!this.nuevoUsuario.almacen_id) {
            alert(
                'Por favor, selecciona un almacén antes de crear el usuario.'
            );
            return;
        }

        this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe(() => {
            this.cargarUsuarios();
            this.nuevoUsuario = {
                nombre: '',
                apellido: '',
                email: '',
                password: '1234',
                rol: '',
                almacen_id: null,
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

    editarUsuario() {
        this.usuarioService
            .editarUsuario(this.usuarioSeleccionado)
            .then((response) => {
                alert('Usuario actualizado');
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
