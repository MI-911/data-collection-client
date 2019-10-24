import { SentimentResult } from 'src/app/models/sentiment-result';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Entity } from '../models/entity';
@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  constructor(private http: HttpClient) { }

  movies() {
    return this.http.get<Entity[]>(`${environment.apiUrl}/movies`);
  }

  feedback(result: SentimentResult) {
    return this.http.post<any>(`${environment.apiUrl}/feedback`, result);
  }
}
