import { Injectable } from '@angular/core';
import { Category } from './category';
import { Observable, of } from 'rxjs';
import { CONFIG } from 'src/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = "http://" + CONFIG.ip + ":" + CONFIG.port + "/api/category";

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  addCategory(category: string): Observable<Category> {
    let body = new URLSearchParams();
    body.set("name", category);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': CONFIG.token
      })
    };
    return this.http.post<Category>(this.url, body.toString(), httpOptions).pipe();
  }

  deleteCategory(id: number): Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': CONFIG.token
      }),
      'responseType': 'text' as 'text'
    };
    return this.http.delete(this.url + "/" + id.toString(), httpOptions).pipe();
  }
}
