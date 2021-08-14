import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from '../../../home/services/home.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  hidePassword: boolean = true;
  error?: String;

  form: FormGroup = this.fb.group({
    email: [, [Validators.required, Validators.email]],
    nombres: [, [Validators.required]],
    apellidos: [, [Validators.required]],
    passwordPlain: [, [Validators.required, Validators.minLength(4)]],
  })

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  registrar() {
    if (this.form.invalid) {
      return;
    }

    const registroValues = this.form.value;

    this.homeService.registrarUsuario(registroValues)
      .subscribe((usuario) => {


        this.authService.login(registroValues['email'], registroValues['passwordPlain'])
          .subscribe((data: any) => {
            this.router.navigate(['/']);


            this.snackBar.open('Bienvenido ' + data['name'], 'Cerrar', {
              duration: 5 * 1000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
          })
      },
        ({ error }) => {
          this.error = error.message;
        })

  }

}
