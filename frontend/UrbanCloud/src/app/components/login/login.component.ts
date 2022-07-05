import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { RouteService } from 'src/app/services/route.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticateService,
    private routerService: RouteService
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {}

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  loginSubmit() {
    console.log(`Form value: ${this.loginForm.value}`);
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login(this.email?.value, this.password?.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.routerService.openDashboard();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  loginWorkAccountSubmit() {
    console.log(`WorkAccount`);
  }
}
