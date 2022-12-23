import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

import { RoutesEnum } from '@constants/routes';
import { LoginService } from '@services/login/login.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [LoginService, HttpClient],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private login: LoginService,
    private router: Router,
  ) { }

  routesEnum = RoutesEnum

  logout() {
    this.login.logout();
    this.router.navigate([RoutesEnum.Login]);
  }
}
