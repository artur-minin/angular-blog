import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from 'src/app/shared/components/interfaces';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  alertMessage: string;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.alertMessage = 'Please log in';
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

  isFormFieldInvalid(fieldName: string): boolean {
    const isFieldTouched: boolean = this.form.get(fieldName).touched;
    const isFieldInvalid: boolean = this.form.get(fieldName).invalid;
    return isFieldTouched && isFieldInvalid;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.auth.login(user).subscribe({
      next: () => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.submitted = false;
      },
      error: () => {
        this.submitted = false;
      },
    });
  }
}
