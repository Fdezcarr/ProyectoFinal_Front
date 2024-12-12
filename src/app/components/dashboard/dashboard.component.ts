import { Component, inject } from '@angular/core';
import { EncargadoComponent } from '../encargado/encargado.component';
import { AuthService } from '../../services/auth.service';
import { JefeComponent } from "../jefe/jefe.component";
import { OperarioComponent } from "../operario/operario.component";
import { Usuario } from '../../interfaces/usuario';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [EncargadoComponent, JefeComponent, OperarioComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
    authService = inject(AuthService);
    usuario : Usuario | null;
    usuarioRol: string | null = null;
    
    ngOnInit() {
        this.usuarioRol = this.authService.getUser().rol
        this.usuario = this.authService.getUser()
    }
    
    hasRole(role: string): boolean {
        console.log(this.usuarioRol);
        return this.usuarioRol === role;
    }
}
