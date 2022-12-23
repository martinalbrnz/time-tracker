import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private jsonHeader = new HttpHeaders();
  private multipartHeader = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.jsonHeader.append("Content-Type", "application/json");
    this.multipartHeader.append("Contentent-type", [
      "multipart/encoded",
      "multipart/form-data",
    ]);
  }

  create<T>(route: string, data: any) {
    return this.http
      .post(`${environment.NG_API}/${route}`, data)
      .pipe(
        map((res: any) => res),
        catchError(err => of(err))
      )
  }

  getAll<T>(route: string) {
    return this.http
      .get(`${environment.NG_API}/${route}`)
      .pipe(
        map((res: any) => res),
        catchError(err => of(err))
      )
  }
} 
