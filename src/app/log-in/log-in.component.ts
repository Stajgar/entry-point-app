import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  constructor(private dbService: NgxIndexedDBService, private router: Router) {}

  ngOnInit(): void {
    if (window.sessionStorage.getItem('userId')) {
      this.router.navigate(['/welcome']);
    }
  }

  logInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  get getControl() {
    return this.logInForm.controls;
  }

  onSubmit(): void {
    this.dbService
      .getByIndex('users', 'email', this.logInForm.value.email)
      .subscribe(
        (user: {
          id: number;
          email: string;
          password: string;
          firstName: string;
        }) => {
          if (
            typeof user === 'undefined' ||
            this.logInForm.value.password !== user.password
          ) {
            alert('Invalid login or password');
          } else {
            window.sessionStorage.setItem('userId', user.id.toString());
            window.sessionStorage.setItem('userFirstName', user.firstName);

            this.router.navigate(['/welcome']);
          }
        }
      );
  }
}
