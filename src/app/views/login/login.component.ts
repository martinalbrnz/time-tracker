import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoutesEnum } from '@constants/routes';
import { LoginService } from '@services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private login: LoginService,
    private _snackbar: MatSnackBar,
    private router: Router,
  ) { }

  form = this.fb.group({
    password: ['', [Validators.required]],
    email: ['', [Validators.required]]
  })
  showPassword = false

  toggleShowPassword() {
    this.showPassword = !this.showPassword
  }

  handleLogin() {
    const { password, email } = this.form.value
    this.login.login({ email: email!, password: password! })
      .subscribe(
        // Implement next and error
        res => {
          if (res.error) {
            this._snackbar.open('La contraseña o el email son incorrectos', 'Ok', {
              verticalPosition: 'top',
              horizontalPosition: 'right'
            })
          } else { // No error
            localStorage.setItem('id', res.id)
            this.login.setRole(res.role);
            this.login.setToken(res.access_token)
            this.router.navigate([RoutesEnum.Hours])
          }
        })
  }
}
