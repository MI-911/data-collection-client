import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  sessionToken = '';
  hasClickedEntity = false;
  isFirstSession = false;

  constructor() {
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', uuid.v1());
      this.isFirstSession = true;
    }

    if (!this.sessionToken) {
      this.startSession();
    }
  }

  startSession() {
    this.sessionToken = uuid.v1();
  }

  complete() {
    localStorage.setItem('completed', JSON.stringify(true));
  }

  get firstSession() {
    return this.isFirstSession;
  }

  get token() {
    return `${localStorage.getItem('token')}+${this.sessionToken}`;
  }

  get completed() {
    return JSON.parse(localStorage.getItem('completed'));
  }
}
