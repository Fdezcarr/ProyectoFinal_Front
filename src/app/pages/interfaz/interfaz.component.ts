import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DashboardComponent } from "../../components/dashboard/dashboard.component";

@Component({
    selector: 'app-interfaz',
    standalone: true,
    imports: [NavbarComponent, FooterComponent, DashboardComponent],
    templateUrl: './interfaz.component.html',
    styleUrl: './interfaz.component.css',
})
export class InterfazComponent {}
