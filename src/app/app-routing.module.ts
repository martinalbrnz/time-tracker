import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesEnum } from '@constants/routes';
import { authRoutes } from './authRoutes';

import { AuthGuard } from '@guards/auth.guard';
import { LoggedGuard } from '@guards/logged.guard';

const routes: Routes = [
  {
    path: RoutesEnum.Login,
    loadComponent: () => import('@views/login/login.component').then(m => m.LoginComponent),
    canActivate: [LoggedGuard],
  },
  {
    path: RoutesEnum.Registration,
    loadComponent: () => import('@views/user-registration/user-registration.component').then(m => m.UserRegistrationComponent),
    canActivate: [LoggedGuard],
  },
  {
    path: '',
    loadComponent: () => import('@views/landing/landing.component').then(m => m.LandingComponent),
    canActivate: [LoggedGuard],
  },
  {
    path: '',
    loadComponent: () => import('./container/layout-container/layout-container.component').then(m => m.LayoutContainerComponent),
    canActivate: [AuthGuard],
    children: authRoutes
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
