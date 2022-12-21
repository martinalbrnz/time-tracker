import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  login(email: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:3000/auth/login`, { email, password })
  }
}
