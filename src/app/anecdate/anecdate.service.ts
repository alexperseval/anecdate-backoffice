import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CONFIG } from 'src/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Anecdate } from './anecdate';
import { Quiz } from './quiz';
import { Category } from '../categories/category';
import { Comment } from './comment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AnecdateService {

  private url = "http://" + CONFIG.ip + ":" + CONFIG.port + "/api/anecdate";

  constructor(private http: HttpClient) { }

  get(id: number) : Observable<Anecdate>{
    return this.http.get<Anecdate>(this.url + "/" + id);
  }

  getAnecdatesByDate(date: string): Observable<Anecdate[]> {
    return this.http.get<Anecdate[]>(this.url + "/date/" + date);
  }

  getQuiz(id: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.url + "/" + id + "/quiz");
  }

  getAnecdate(id: number): Observable<Anecdate> {
    return this.http.get<Anecdate>(this.url + "/" + id);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>("http://" + CONFIG.ip + ":" + CONFIG.port + "/api/category/" + id);
  }

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url + "/" + id + "/comments");
  }

  getCommentAuthor(id: string): Observable<User> {
    return this.http.get<User>("http://" + CONFIG.ip + ":" + CONFIG.port + "/api/user/" + id);
  }

  deleteAnecdate(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem("token") || ""
      }),
      'responseType': 'text' as 'text'
    };
    return this.http.delete(this.url + "/" + id, httpOptions);
  }

  activateAnecdate(id: number) {
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

  deleteComment(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem("token") || ""
      }),
      'responseType': 'text' as 'text',
    };
    return this.http.delete("http://" + CONFIG.ip + ":" + CONFIG.port + "/api/comment/" + id, httpOptions);
  }

  getAll(): Observable<Anecdate[]> {
    return this.http.get<Anecdate[]>(this.url);
  }
}
