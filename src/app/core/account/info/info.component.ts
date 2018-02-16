import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../../services/user.service';

import { User } from '../../../models/user.model';
import { templates } from '../../../models/data.model';

@Component({
  selector: 'app-info-form',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() user: User;
  infoSaveForm: FormGroup;
  templates = templates;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    let name = '';
    let email = '';
    let phone = '';
    let template = '';

    if (this.user) {
      name =  this.user.full_name;
      email =  this.user.email;
      phone =  this.user.phone;
      template = this.user.template;
    }

    this.infoSaveForm = this.fb.group({
      full_name: [name, [
        Validators.required,
        Validators.minLength(4)
      ] ],
      email: [email, [
        Validators.required,
        Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/)
      ] ],
      phone: [phone, [
        Validators.required,
        Validators.pattern(/^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/)
      ] ],
      template: [template]
    });
  }

  onUpdateInfo() {
    const user = this.infoSaveForm.value;

    this.loading = true;
    this.userService.updateUser(user)
      .subscribe(
        data => {
        },
        error => {
          this.loading = false;
        });
  }

  get full_name() { return this.infoSaveForm.get('full_name'); }

  get phone() { return this.infoSaveForm.get('phone'); }

  get email() { return this.infoSaveForm.get('email'); }

}
