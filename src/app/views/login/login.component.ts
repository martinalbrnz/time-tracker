import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '@services/http/http.service';

interface LoginResponse {
  access_token: string
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [
    HttpService
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpService,
    private fb: FormBuilder
  ) { }

  form = this.fb.group({
    email: [null, [Validators.required]],
    password: [null]
  })

  showPassword = false
  response?: string

  ngOnInit() {
  }

  toggleShow() {
    this.showPassword = !this.showPassword
  }

  handleLogin() {
    const { email, password } = this.form.value
    this.http.login(email!, password!).subscribe(res => {
      localStorage.setItem('token', res.access_token)
    })

  }
}
