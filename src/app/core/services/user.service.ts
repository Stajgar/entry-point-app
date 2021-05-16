import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  purgeSession() {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userFirstName');
  }

  register(dbService, signUpForm) {
    dbService.add('users', {
      firstName: signUpForm.value.firstName,
      lastName: signUpForm.value.lastName,
      email: signUpForm.value.email.toLowerCase(),
      password: signUpForm.value.password,
    });
  }

  logInSuccessful(user, logInForm) {
    if (
      typeof user === 'undefined' ||
      logInForm.value.password !== user.password
    ) {
      return false;
    } else {
      window.sessionStorage.setItem('userId', user.id.toString());
      window.sessionStorage.setItem('userFirstName', user.firstName);
      return true;
    }
  }
}
