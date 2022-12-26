import { Routes } from '@angular/router';
import { RoutesEnum } from '@constants/routes';
import { AuthGuard } from '@guards/auth.guard';

export const authRoutes: Routes = [
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
  {
    path: '**',
    redirectTo: RoutesEnum.Home,
    pathMatch: 'full',
  },
]