import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  extraToken = '';

  constructor() {
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', uuid.v1());
    } else {
      console.log('Adds extra token');
      this.extraToken = uuid.v1();
    }
  }

  get token() {
    return localStorage.getItem('token') + this.extraToken;
  }
}
