import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


const simpleUrl = `${environment.baseUrl}/post`;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${simpleUrl}/plot/list/`);
  }

  create(plot: any): Observable<any> {
    return this.http.post<any>(`${simpleUrl}/plot/create/`, plot);
  }

}
