import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services';

@Component({
  selector: 'app-log-out-page',
  templateUrl: './log-out-page.component.html',
  styleUrls: ['./log-out-page.component.css'],
})
export class LogOutPageComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.purgeSession();
  }
}
