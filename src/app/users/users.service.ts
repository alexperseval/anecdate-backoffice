import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONFIG } from 'src/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../anecdate/user';
import { Comment } from '../anecdate/comment';
import { Anecdate } from '../anecdate/anecdate';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private url = "https://" + CONFIG.ip + ":" + CONFIG.port + "/api/user";

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  get(id: string): Observable<User> {
    return this.http.get<User>(this.url + "/" + id);
  }

  deleteUser(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem("token") || ""
      }),
      'responseType': 'text' as 'text'
    };
    return this.http.delete(this.url + "/" + id, httpOptions);
  }

  activateUser(id: number) {
    let body = new URLSearchParams();
    body.set("status", "active");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem("token") || ""
      }),
      'responseType': 'text' as 'text',
    };
    return this.http.put(this.url + "/" + id, body, httpOptions);
  }

  updateUser(id: number, pseudo: string, mail: string, role: boolean) {
    let body = new URLSearchParams();
    if (id != null && pseudo != null && mail != null && role != null) {
      body.set("pseudo", pseudo);
      body.set("mail", mail);
      body.set("role", role == false ? "2" : "1");
    }
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': localStorage.getItem("token") || ""
        }),
        'responseType': 'text' as 'text',
      };
      return this.http.put(this.url + "/" + id, body, httpOptions); 
  }

  getComments(id: number) : Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url + "/" + id + "/comments");
  }

  getAnecdates(id: number) : Observable<Anecdate[]> {
    return this.http.get<Anecdate[]>(this.url + "/" + id + "/anecdates");
  }
}
