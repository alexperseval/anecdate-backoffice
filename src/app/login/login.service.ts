import { Injectable } from '@angular/core';
import { ResponseLogin } from './response';
import { Observable, of } from 'rxjs';
import { CONFIG } from 'src/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  private url = "http://" + CONFIG.ip + ":" + CONFIG.port + "/api/login";

  constructor(private http: HttpClient) { }

  login(username: string, pass: string): Observable<ResponseLogin> {
    let body = new URLSearchParams();
    body.set("username", username);
    body.set("password", pass);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<ResponseLogin>(this.url, body.toString(), httpOptions).pipe();
  }
}
