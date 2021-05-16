import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  purgeSession() {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userFirstName');
  }
}
