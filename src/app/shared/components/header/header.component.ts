import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


import { RoutesEnum } from '@constants/routes';
import { AuthGuard } from '@guards/auth.guard';

@Component({
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private authService: AuthGuard
  ) { }

  showHeader = this.authService.canActivate()
  routesEnum = RoutesEnum
}
