import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { templates } from '../../models/data.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  templates = templates;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.signUpForm = this.fb.group({
      full_name: ['', [
        Validators.required,
        Validators.minLength(4)
      ] ],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/)
      ] ],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/)
      ] ],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ] ],
      template: 'black'
    });
  }

  onSubmit() {
    const user = this.signUpForm.value;

    this.loading = true;
    this.userService.signupUser(user)
      .subscribe(
        data => {
          this.router.navigate(['signin']);
        },
        error => {
          this.loading = false;
        });
  }

  get full_name() { return this.signUpForm.get('full_name'); }

  get phone() { return this.signUpForm.get('phone'); }

  get email() { return this.signUpForm.get('email'); }

  get password() { return this.signUpForm.get('password'); }

}
