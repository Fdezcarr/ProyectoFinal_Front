import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Almacen } from '../interfaces/almacen.interface';

@Injectable({
  providedIn: 'root',
})
export class AlmacenService {
  private baseUrl = 'http://localhost:3000/api/almacenes'; // Ruta del backend para almacenes

  constructor(private http: HttpClient) {}

  // Obtener todos los almacenes
  getAlmacenes(): Observable<Almacen[]> {
    return this.http.get<Almacen[]>(this.baseUrl);
  }

  // Crear un nuevo almacén
  crearAlmacen(almacen: Almacen): Observable<Almacen> {
    return this.http.post<Almacen>(this.baseUrl, almacen);
  }

  // Editar un almacén existente
  editarAlmacen(almacen: Almacen): Observable<Almacen> {
    return this.http.put<Almacen>(`${this.baseUrl}/${almacen.id}`, almacen);
  }

  // Eliminar un almacén
  eliminarAlmacen(id: number): Observable<Almacen> {
    return this.http.delete<Almacen>(`${this.baseUrl}/${id}`);
  }
}
