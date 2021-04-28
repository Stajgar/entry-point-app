import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private dbService: NgxIndexedDBService, private router: Router) {}

  signUpForm: FormGroup;
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

  get signUpFormControl() {
    return this.signUpForm.controls;
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

    if (this.signUpForm.valid) {
      this.dbService
        .add('users', {
          firstName: this.signUpForm.value.firstName,
          lastName: this.signUpForm.value.lastName,
          email: this.signUpForm.value.email.toLowerCase(),
          password: this.signUpForm.value.password,
        })
        .subscribe(() => {
          // Handle not unique email
          alert(`Thank you for signing up. You can now log in.`);
          this.router.navigate(['/login']);
        });
    }
  }
}
