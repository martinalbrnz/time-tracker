import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Role } from '@constants/roles';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token') || localStorage.getItem('role') === Role.User || localStorage.getItem('role') === Role.Admin) {
      return true
    };
    this.router.navigateByUrl('login');
    return false;
  }

}
