import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Role } from '@constants/roles';
import { RoutesEnum } from '@constants/routes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token') || localStorage.getItem('role') === Role.User || localStorage.getItem('role') === Role.Admin) {
      this.router.navigateByUrl(RoutesEnum.Home);
      return false
    };
    return true;
  }

}
