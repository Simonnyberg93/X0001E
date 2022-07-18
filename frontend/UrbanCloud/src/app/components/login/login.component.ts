import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Topic } from 'src/app/models/Topic';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { RouteService } from 'src/app/services/route.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthenticateService,
    private routerService: RouteService,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: new UntypedFormControl('', [
        Validators.email,
        Validators.required,
      ]),
      password: new UntypedFormControl('', [
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

    this.authService.login(this.email?.value, this.password?.value).subscribe({
      next: (res: any) => {
        // check if user is admin
        if (this.authService.haveAdminAccess()) {
          this.routerService.openAdminStart();
        } else {
          this.userService
            .fetchUsersTopicsOfInterestFromDb(res.email)
            .subscribe({
              next: (value: any) => {
                let topics: Array<Topic> = <Array<Topic>>value;
                this.routerService.openDashboard();
              },
              error: (err: any) => {
                console.error(err);
              },
            });
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  loginWorkAccountSubmit() {
    console.log(`WorkAccount`);
  }
}
