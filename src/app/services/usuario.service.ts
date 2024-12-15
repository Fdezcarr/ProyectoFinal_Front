import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    private baseUrl = 'http://localhost:3000/api/users'; // Ruta del backend para usuarios

    constructor(private http: HttpClient) {}

    // Obtener todos los usuarios
    getUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(`${this.baseUrl}`);
    }

    // Obtener todos los operarios
    getAllOperario(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/operario`);
    }
    // Obtener el encargado por id de almacén
    getEncargadoByAlmacenId(almacen_id): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/encargado/${almacen_id}`);
    }

    // Crear un nuevo usuario
    crearUsuario(usuario: any): Observable<any> {
        console.log(usuario);

        return this.http.post<any>(this.baseUrl, usuario);
    }

    // Editar un usuario existente
    editarUsuario(usuario: any): Promise<any> {
        return firstValueFrom(
            this.http.put<any>(`${this.baseUrl}/${usuario.id}`, usuario)
        );
    }

    // Eliminar un usuario
    eliminarUsuario(id: number): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${id}`);
    }

    //Verificar duplicidad del Email
    checkEmail(email: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/checkEmail?email=${email}`);
    }
}
