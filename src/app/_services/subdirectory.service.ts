
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:8080/demo2-0.0.1-SNAPSHOT/api/subdirectory';
@Injectable({
  providedIn: 'root'
})

export class SubdirectoryService {

  constructor(private http: HttpClient) { }

  createRepository(id,data): Observable<any> {
    return this.http.post(`${baseUrl+"/subdirectory"}/${id}`, data);
  }
  getAll(id): Observable<any> {
    return this.http.get(`${baseUrl+"/subdirectorys"}/${id}`);
  }
}
