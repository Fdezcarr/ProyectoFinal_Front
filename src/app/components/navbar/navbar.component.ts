import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent {
    router = inject(Router);
    authService = inject(AuthService);
    usuario: Usuario | null = null;

    ngOnInit() {
        this.usuario = this.authService.getUser();
    }

    logOut() {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
    }
}
