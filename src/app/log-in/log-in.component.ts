import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  logInForm = this.formBuilder.group({
    email: '',
    password: '',
  });
  constructor(
    private formBuilder: FormBuilder,
    private dbService: NgxIndexedDBService
  ) {}

  onSubmit(): void {
    this.dbService
      .getByIndex('users', 'email', this.logInForm.value.email)
      .subscribe((user: { email: string; password: string }) => {
        if (
          typeof user === 'undefined' ||
          this.logInForm.value.password !== user.password
        ) {
          alert('Invalid login or password');
        } else {
          alert(`You're logged in`);
        }
      });
  }
}
