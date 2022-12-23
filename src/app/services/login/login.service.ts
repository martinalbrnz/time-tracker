import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '@constants/roles';
import { environment } from '@environments/environment';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  private userRole: BehaviorSubject<Role> = new BehaviorSubject(localStorage.getItem('role') as Role || Role.Guest)
  private userToken: BehaviorSubject<string | null> = new BehaviorSubject(localStorage.getItem('token'))

  login(user: { email?: string, password?: string }) {
    return this.http.post(`${environment.NG_API}/auth/login`, user)
      .pipe()
      .pipe(
        map((res: any) => res),
        catchError(err => of(err)),
      )
      .pipe(
        map(res => {
          this.setRole(res.role as Role)
          return res
        })
      );
  }

  logout() {
    localStorage.clear()
    this.setRole(Role.Guest)
  }

  setRole(role: Role): void {
    localStorage.setItem('role', role)
    this.userRole.next(role);
  }

  setToken(token: string) {
    localStorage.setItem('token', token)
    this.userToken.next(token);
  }

  get getRole(): Observable<Role> {
    return this.userRole.asObservable()
  }

  get getToken(): Observable<string | null> {
    return this.userToken.asObservable()
  }
}
