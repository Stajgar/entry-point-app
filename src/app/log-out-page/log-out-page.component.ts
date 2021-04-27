import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-out-page',
  templateUrl: './log-out-page.component.html',
  styleUrls: ['./log-out-page.component.css'],
})
export class LogOutPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userFirstName');
  }
}
