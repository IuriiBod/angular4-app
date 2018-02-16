import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => this.user = user);
  }

}
