import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoutesEnum } from '@constants/routes';
import { HttpService } from '@services/http/http.service';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpService,
  ) { }

  showPassword = false;
  form = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    name: [null, [Validators.required, Validators.minLength(2)]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  }, {
    updateOn: 'blur'
  })

  toggleShowPassword() {
    this.showPassword = !this.showPassword
  }

  handleRegistration() {
    this.http.create(`${RoutesEnum.UserAPI}/register`, this.form.value).subscribe({
      next: (resp) => {
        console.log('user created!!');
        console.log(resp);
        // handle creation with something...
      },
      error: (error: HttpErrorResponse) => {
        console.log('an error!! run!!');
        console.error(error)
        // handle error with something...
      }
    })
  }
}
