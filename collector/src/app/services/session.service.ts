import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() {
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', uuid.v1());
    }
  }

  get token() {
    return localStorage.getItem('token');
  }
}
