import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserDTO } from 'src/app/models/UserDTO';
import { UserProfile } from 'src/app/models/UserProfile';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authenticateService: AuthenticateService,
    private routeService: RouteService
  ) {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
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
          this.routeService.openLogin();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  loginWorkAccountSubmit() {}
}
