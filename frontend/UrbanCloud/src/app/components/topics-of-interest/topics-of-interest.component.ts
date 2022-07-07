import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/UserProfile';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { RouteService } from 'src/app/services/route.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-topics-of-interest',
  templateUrl: './topics-of-interest.component.html',
  styleUrls: ['./topics-of-interest.component.css'],
})
export class TopicsOfInterestComponent implements OnInit {
  user: UserProfile;

  constructor(
    private routeService: RouteService,
    private userService: UserService,
    private authService: AuthenticateService
  ) {
    this.user = this.authService.userValue;
  }

  ngOnInit(): void {}

  onSubmit() {}
}
