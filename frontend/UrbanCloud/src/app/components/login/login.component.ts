import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public message: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticateService,
    private routerService: RouteService
  ) {
    this.message = '';
  }

  ngOnInit(): void {}

  loginSubmit() {}

  loginWorkAccountSubmit() {}
}
