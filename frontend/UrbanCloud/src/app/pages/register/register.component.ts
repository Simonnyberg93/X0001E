import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { UserDTO } from 'src/app/models/UserDTO';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: UntypedFormGroup;

  constructor(
    private authenticateService: AuthenticateService,
    private routeService: RouteService
  ) {
    this.registerForm = new UntypedFormGroup({
      firstname: new UntypedFormControl('', [Validators.required]),
      lastname: new UntypedFormControl('', [Validators.required]),
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

  get firstname(): AbstractControl | null {
    return this.registerForm.get(['firstname']);
  }

  get lastname(): AbstractControl | null {
    return this.registerForm.get(['lastname']);
  }

  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  registerSubmit() {
    this.authenticateService
      .registerUser(
        new UserDTO(
          this.firstname?.value,
          this.lastname?.value,
          this.email?.value,
          this.password?.value
        )
      )
      .subscribe(
        (res) => {
          console.log(`Register successfull, ${res}`);
          this.authenticateService
            .login(this.email?.value, this.password?.value)
            .subscribe({
              next: (value) => {
                this.routeService.openTopics();
              },
              error: (error) => {
                console.error(error);
              },
            });
        },
        (error) => {
          console.error(error);
        }
      );
  }

  loginWorkAccountSubmit() {
    console.log(`TODO: Login with workaccount`);
  }
}
