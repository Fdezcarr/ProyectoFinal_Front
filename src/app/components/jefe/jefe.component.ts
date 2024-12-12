import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { AlmacenService } from '../../services/almacen.service';

@Component({
  selector: 'app-jefe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jefe.component.html',
  styleUrls: ['./jefe.component.css'],
})
export class JefeComponent implements OnInit {
  usuarios: any[] = [];
  almacenes: any[] = [];
  nuevoUsuario: any = { nombre: '', apellido: '', email: '', password: '0000', rol: '', almacenId: null };
  nuevoAlmacen: any = { nombre: '', localizacion: '' };
  almacenSeleccionado: any = null; 
  usuarioSeleccionado: any = null; 
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
    this.almacenService.getAlmacenes().subscribe(
      (data) => (this.almacenes = data),
      (error) => console.error('Error al cargar almacenes:', error)
    );
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

    this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe(() => {
      this.cargarUsuarios();
      this.nuevoUsuario = { nombre: '', apellido: '', email: '', password: '0000', rol: '', almacenId: null };
    });
  }

  crearAlmacen(): void {
    this.almacenService.crearAlmacen(this.nuevoAlmacen).subscribe(() => {
      this.cargarAlmacenes();
      this.nuevoAlmacen = { nombre: '', localizacion: '' };
    });
  }

  
  abrirModalUsuario(usuario: any): void {
    this.usuarioSeleccionado = { ...usuario }; 
  }

  guardarUsuarioEditado(): void {
    this.usuarioService.editarUsuario(this.usuarioSeleccionado).subscribe(() => {
      this.cargarUsuarios();
      this.usuarioSeleccionado = null; 
    });
  }

  
  abrirModalAlmacen(almacen: any): void {
    this.almacenSeleccionado = { ...almacen }; 
  }

  guardarAlmacenEditado(): void {
    this.almacenService.editarAlmacen(this.almacenSeleccionado).subscribe(() => {
      this.cargarAlmacenes();
      this.almacenSeleccionado = null; 
    });
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe(() => this.cargarUsuarios());
    }
  }

  eliminarAlmacen(id: number): void {
    if (confirm('¿Estás seguro de eliminar este almacén?')) {
      this.almacenService.eliminarAlmacen(id).subscribe(() => this.cargarAlmacenes());
    }
  }
}