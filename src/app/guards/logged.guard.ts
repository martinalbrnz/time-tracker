import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Role } from '@constants/roles';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token') || localStorage.getItem('role') === Role.User || localStorage.getItem('role') === Role.Admin) return false;
    return true;
  }

}
