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
    if (!localStorage.getItem('userToken')) {
      localStorage.setItem('userToken', uuid.v1());
      this.isFirstSession = true;
    }

    if (!this.sessionToken) {
      this.startSession();
    }
  }

  startSession() {
    this.sessionToken = uuid.v1();
  }
  get firstSession() {
    return this.isFirstSession;
  }

  get token() {
    return `${localStorage.getItem('userToken')}+${this.sessionToken}`;
  }
}
