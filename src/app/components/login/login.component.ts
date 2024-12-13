import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports:[ReactiveFormsModule,FormGroup,Validators,FormBuilder],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ReactiveForm: FormGroup;
  forgotpasswordForm: FormGroup;
  isForgotPassword: boolean = false;

  constructor(private fb: FormBuilder) {}  
  ngOnInit(): void {
    // Inicializar los formularios
    this.ReactiveForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]]
    });

    this.forgotpasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  cargardatos(): void {
    if (this.ReactiveForm.valid) {
      const formData = this.ReactiveForm.value;
      console.log('Datos de login:', formData);
    } else {
      console.log('Formulario de login no válido');
    }
  }

  recuperarcontraseña(): void {
    if (this.forgotpasswordForm.valid) {
      const email = this.forgotpasswordForm.value.email;
      console.log('Recuperación de contraseña para:', email);
    } else {
      console.log('Formulario de recuperación no válido');
    }
  }

  toggleForgotPassword(): void {
    this.isForgotPassword = !this.isForgotPassword;
  }

  redirectToSignUp(): void {
    console.log("Redirigiendo a la página de creación de cuenta");
    // Aquí podrías redirigir a otra ruta con un router
  }
}

