import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plot } from '../models/plot.model';
import { environment } from '../../environments/environment';


const simpleUrl = `${environment.baseUrl}/post`;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Plot[]> {
    return this.http.get<Plot[]>(`${simpleUrl}/plot/list/`);
  }

  create(plot: any): Observable<Plot> {
    return this.http.post<Plot>(`${simpleUrl}/plot/create/`, plot);
  }

}
