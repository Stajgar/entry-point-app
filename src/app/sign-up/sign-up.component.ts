import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Router } from '@angular/router';
import { UserService } from '../core/services';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private dbService: NgxIndexedDBService,
    private router: Router,
    private userService: UserService
  ) {}

  signUpForm: FormGroup;
  failedSignUp: boolean;
  successfulSignUp: boolean;
  submitted = false;

  ngOnInit(): void {
    if (window.sessionStorage.getItem('userId')) {
      this.router.navigate(['/welcome']);
    }

    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  get firstName() {
    return this.signUpForm.get('firstName');
  }
  get lastName() {
    return this.signUpForm.get('lastName');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }

  @ViewChild('passwordField') passwordField: ElementRef;

  changePasswordVisibility() {
    if (this.passwordField.nativeElement.type === 'password') {
      this.passwordField.nativeElement.type = 'text';
    } else {
      this.passwordField.nativeElement.type = 'password';
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.successfulSignUp = false;
    this.failedSignUp = false;

    if (this.signUpForm.valid) {
      this.dbService
        .getByIndex('users', 'email', this.signUpForm.value.email.toLowerCase())
        .subscribe((user) => {
          if (typeof user === 'undefined') {
            this.userService.register(this.dbService, this.signUpForm);
            this.successfulSignUp = true;
          } else {
            this.failedSignUp = true;
          }
        });
    }
  }
}
