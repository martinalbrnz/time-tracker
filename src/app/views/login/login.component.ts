import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoutesEnum } from '@constants/routes';
import { LoginService } from '@services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule,
  ],
  providers: [
    LoginService,
    HttpClient,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private login: LoginService,
    private _snackbar: MatSnackBar,
    private router: Router,
  ) { }

  email?: string
  password?: string
  showPassword = false

  ngOnInit() {
  }

  toggleShow() {
    this.showPassword = !this.showPassword
  }

  handleLogin() {
    this.login.login({ email: this.email, password: this.password })
      .subscribe(res => {
        if (res.error) {
          this._snackbar.open('La contraseña o el email son incorrectos', 'Ok', {
            verticalPosition: 'top',
            horizontalPosition: 'right'
          })
        } else { // No error
          this.login.setRole(res.role);
          this.login.setToken(res.access_token)
          this.router.navigate([RoutesEnum.Home])
        }
      })
  }
}
