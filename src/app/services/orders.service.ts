import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Pedido } from '../interfaces/pedido.interface';

@Injectable({
    providedIn: 'root',
})
export class PedidosService {
    private apiUrl = 'http://localhost:3000/api/pedidos';

    constructor(private http: HttpClient) {}

    // Método para obtener todos los pedidos
    getAllPedidos(): Observable<Pedido[]> {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.get<Pedido[]>(this.apiUrl, { headers });
    }

    getById(id: number): Promise<Pedido> {
        return firstValueFrom(this.http.get<Pedido>(`${this.apiUrl}/${id}`));
    }

    getPedidosStatus(): Promise<any> {
        return firstValueFrom(this.http.get<any>(`${this.apiUrl}/estados`));
    }

    insertPedido(pedido: Pedido): Promise<Pedido> {
        return firstValueFrom(this.http.post<Pedido>(`${this.apiUrl}`, pedido));
    }

    // PROMISE
    // updatePedido(id: number, pedido: Pedido): Promise<Pedido> {
    // const url = `${this.apiUrl}/${id}`;
    // return firstValueFrom(this.http.put<Pedido>(url, pedido));
    // }
    updatePedido(id: number, pedido: Pedido): Observable<Pedido> {
        const { origen, destino, matricula_camion, estado } = pedido;
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Pedido>(url, pedido);
    }

    patchEstadoPedido(id: number, pedido: Pedido): Observable<Pedido> {
        const { estado } = pedido;
        const url = `${this.apiUrl}/estados/${id}`;
        return this.http.patch<Pedido>(url, pedido);
    }
}
