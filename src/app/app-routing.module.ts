import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesEnum } from '@constants/routes';

import { AuthGuard } from '@guards/auth.guard';
import { LoggedGuard } from '@guards/logged.guard';
const containerChildren: Routes = [
  {
    path: RoutesEnum.Home,
    loadComponent: () => import('@views/home/home.component').then(m => m.HomeComponent),
    canActivate: [AuthGuard],
  },
  {
    path: RoutesEnum.Projects,
    loadComponent: () => import('@views/projects/projects.component').then(m => m.ProjectsComponent),
    canActivate: [AuthGuard],
  },
  {
    path: RoutesEnum.Charts,
    loadComponent: () => import('@views/charts/charts.component').then(m => m.ChartsComponent),
    canActivate: [AuthGuard],
  },
  {
    path: RoutesEnum.Hours,
    loadComponent: () => import('@views/hours/hours.component').then(m => m.HoursComponent),
    canActivate: [AuthGuard],
  },
]

const routes: Routes = [
  {
    path: RoutesEnum.Login,
    loadComponent: () => import('@views/login/login.component').then(m => m.LoginComponent),
    canActivate: [LoggedGuard],
  },
  {
    path: '',
    loadComponent: () => import('./container/layout-container/layout-container.component').then(m => m.LayoutContainerComponent),
    canActivate: [AuthGuard],
    children: containerChildren
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
