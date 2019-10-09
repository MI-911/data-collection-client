import { SentimentResult } from 'src/app/models/sentiment-result';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  begin() {
    return this.http.get<Movie[]>(`${environment.apiUrl}/begin`);
  }

  entities(result: SentimentResult) {
    return this.http.post<any>(`${environment.apiUrl}/entities`, result);
  }
}
