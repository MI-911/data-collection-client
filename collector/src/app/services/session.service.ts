import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as uuid from 'uuid';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  sessionToken = '';
  hasClickedEntity = false;
  _firstSession = false;

  constructor() {
    if (!localStorage.getItem('userToken')) {
      localStorage.setItem('userToken', uuid.v1());
      this._firstSession = true;
    } else {
      this.sessionToken = uuid.v1();
    }
  }

  get firstSession() {
    return this._firstSession;
  }

  get token() {
    return `${localStorage.getItem('userToken')}+${this.sessionToken}`;
  }
}
