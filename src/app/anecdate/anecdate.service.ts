import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, flatMap, toArray } from 'rxjs/operators';
import { CONFIG } from 'src/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Anecdate } from './anecdate';
import { Quiz } from './quiz';
import { Category } from '../categories/category';

@Injectable({
  providedIn: 'root'
})
export class AnecdateService {

  private url = "http://" + CONFIG.ip + ":" + CONFIG.port + "/api/anecdate";

  constructor(private http: HttpClient) { }

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
    return this.http.get<Comment[]>(this.url + "/" + id + "/comments" );    
  }
}
