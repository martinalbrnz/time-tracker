import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

import { RoutesEnum } from '@constants/routes';
import { AuthGuard } from '@guards/auth.guard';
import { LoginService } from '@services/login/login.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [
    HttpClient,
    LoginService,
  ],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthGuard,
    private loged: LoginService,
    private router: Router,
  ) { }

  isLogged?: Observable<string | null>
  routesEnum = RoutesEnum

  ngOnInit() {
    this.isLogged = this.loged.getToken;
    this.loged.getToken.subscribe(val => console.log('tokeeeeeeen', val));
  }
}
