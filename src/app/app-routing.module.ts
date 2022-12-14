import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesEnum } from '@constants/routes';

const routes: Routes = [
  {
    path: RoutesEnum.Login,
    loadComponent: () => import('@views/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: RoutesEnum.Home,
    loadComponent: () => import('@views/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: RoutesEnum.Projects,
    loadComponent: () => import('@views/projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: RoutesEnum.Charts,
    loadComponent: () => import('@views/charts/charts.component').then(m => m.ChartsComponent)
  },
  {
    path: RoutesEnum.Hours,
    loadComponent: () => import('@views/hours/hours.component').then(m => m.HoursComponent)
  },
  { path: '', redirectTo: RoutesEnum.Home, pathMatch: 'full' },
  {
    path: '**', redirectTo: RoutesEnum.Home
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
