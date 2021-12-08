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

  private url = "https://" + CONFIG.ip + ":" + CONFIG.port + "/api/anecdate";

  constructor(private http: HttpClient) { }

  get(id: number): Observable<Anecdate> {
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
    return this.http.get<Category>("https://" + CONFIG.ip + ":" + CONFIG.port + "/api/category/" + id);
  }

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url + "/" + id + "/comments");
  }

  getCommentAuthor(id: string): Observable<User> {
    return this.http.get<User>("https://" + CONFIG.ip + ":" + CONFIG.port + "/api/user/" + id);
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
    return this.http.delete("https://" + CONFIG.ip + ":" + CONFIG.port + "/api/comment/" + id, httpOptions);
  }

  getAll(): Observable<Anecdate[]> {
    return this.http.get<Anecdate[]>(this.url);
  }

  updateAnecdate(id: number, date: string, description: string, sources: string, title: string, idCategory: string, question: string, tanswer: string, wanswer1: string, wanswer2: string, wanswer3: string) {
    let body = new URLSearchParams();
    if (date != null && description != null && sources != null && title != null && idCategory != null) {
      body.set("date", date);
      body.set("title", title);
      body.set("description", description);
      body.set("sources", sources);
      body.set("idCategory", idCategory);
    }
    if(question != null && tanswer != null && wanswer1 != null && wanswer2 != null && wanswer3 != null) {
      body.set("question", question);
      body.set("true_answer", tanswer);
      body.set("wrong_answer1", wanswer1);
      body.set("wrong_answer2", wanswer2);
      body.set("wrong_answer3", wanswer3);
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
}
