import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { UserService } from '../core/services';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  constructor(
    private dbService: NgxIndexedDBService,
    private router: Router,
    private userService: UserService
  ) {}

  logInForm: FormGroup;
  failedLogIn: boolean;
  submitted = false;

  ngOnInit(): void {
    if (window.sessionStorage.getItem('userId')) {
      this.router.navigate(['/welcome']);
    }
    this.logInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get email() {
    return this.logInForm.get('email');
  }
  get password() {
    return this.logInForm.get('password');
  }

  onSubmit(): void {
    this.submitted = true;
    this.failedLogIn = false;

    if (this.logInForm.valid) {
      this.dbService
        .getByIndex('users', 'email', this.logInForm.value.email.toLowerCase())
        .subscribe(
          (user: {
            id: number;
            email: string;
            password: string;
            firstName: string;
          }) => {
            if (this.userService.logInSuccessful(user, this.logInForm)) {
              this.router.navigate(['/welcome']);
            } else {
              this.failedLogIn = true;
            }
          }
        );
    }
  }
}
