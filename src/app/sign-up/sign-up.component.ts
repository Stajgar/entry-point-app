import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  constructor(
    private formBuilder: FormBuilder,
    private dbService: NgxIndexedDBService
  ) {}

  onSubmit(): void {
    this.dbService
      .add('users', {
        firstName: this.signUpForm.value.firstName,
        lastName: this.signUpForm.value.lastName,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
      })
      .subscribe(() => {
        // Handle not unique email
        alert(`Thank you for signing up. You can now log in.`);
      });
  }
}
