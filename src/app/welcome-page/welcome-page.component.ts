import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
  constructor(private router: Router) {}

  firstName: string;

  ngOnInit(): void {
    if (!window.sessionStorage.getItem('userId')) {
      this.router.navigate(['/login']);
      alert('You need to log in to access the application');
    }
    this.firstName = window.sessionStorage.getItem('userFirstName');
  }
}
