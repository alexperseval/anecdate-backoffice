import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONFIG } from 'src/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Report } from './report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private url = "http://" + CONFIG.ip + ":" + CONFIG.port + "/api/report";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Report[]> {
    return this.http.get<Report[]>(this.url);
  }

  updateReport(id: number, status: string) {
    let body = new URLSearchParams();
    if (id != null && status != null) {
      body.set("status", status);
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
