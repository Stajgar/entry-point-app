import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    if (window.sessionStorage.getItem('userId')) {
      this.router.navigate(['/welcome']);
    }
  }

  signUpForm = new FormGroup({
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

  get getControl() {
    return this.signUpForm.controls;
  }

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
    // this.router.navigate(['/login']);
  }
}
