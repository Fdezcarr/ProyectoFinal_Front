import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Usuario } from '../interfaces/usuario';

interface payload extends JwtPayload {
    usuario_id: number;
    usuario_rol: string;
    usuario_nombre: string;
    usuario_email: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrlBase = `${environment.API_URL}/auth/login`;
    private http = inject(HttpClient);
    usuario: Usuario | null = null;

    login(credentials: { email: string; password: string }) {
        return firstValueFrom(
            this.http.post<{ message: string; token: string }>(
                `${this.apiUrlBase}`,
                credentials
            )
        );
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getUser(): Usuario | null {
        const token = this.getToken();
        if (!token) {
            console.warn('El token es nulo');
            return null;
        }

        try {
            const data = jwtDecode<payload>(token);
            
            this.usuario = {
              id: data.usuario_id,
              rol: data.usuario_rol,
              nombre: data.usuario_nombre,
              email: data.usuario_email,
            };
            return this.usuario;
        } catch (err) {
            console.error('Error al desencriptar el token:', err);
            return null;
        }
    }
}
