import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  model: any = {};

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onUpdatePassword() {
    this.userService.updatePassword(this.model.password)
      .subscribe(
        data => {
        },
        error => {
        });
  }

}
