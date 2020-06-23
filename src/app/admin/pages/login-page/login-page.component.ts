import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from 'src/app/shared/interfaces';

import { AuthService } from '../../shared/services/auth.service';

import { isFormFieldInvalid } from 'src/app/shared/utils';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  alertMessage: string;
  isSubmitting = false;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.alertMessage = 'Please log in';
      } else if (params['authFailed']) {
        this.alertMessage = 'Session expired. Please, log in again';
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  isFieldInvalid = isFormFieldInvalid;

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.auth.login(user).subscribe({
      next: () => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.isSubmitting = false;
      },
      error: () => {
        this.isSubmitting = false;
      },
    });
  }
}
