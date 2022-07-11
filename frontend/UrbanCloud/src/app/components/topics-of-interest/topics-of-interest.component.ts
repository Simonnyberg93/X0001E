import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserDTO } from 'src/app/models/UserDTO';
import { UserProfile } from 'src/app/models/UserProfile';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { RouteService } from 'src/app/services/route.service';
import { UserService } from 'src/app/services/user.service';
import ConstantValues from 'src/app/utils/constants';

@Component({
  selector: 'app-topics-of-interest',
  templateUrl: './topics-of-interest.component.html',
  styleUrls: ['./topics-of-interest.component.css'],
})
export class TopicsOfInterestComponent implements OnInit {
  selectedRoles: string[] = [];
  selectedAreas: string[] = [];
  selectedInfo: string[] = [];

  public workRoles: string[] = ConstantValues.workRoles;
  public importantInfo: string[] = ConstantValues.importantInfo;
  public importantAreas: string[] = ConstantValues.importantAreas;

  userProfile: UserProfile;
  user: UserDTO = new UserDTO('', '', '', '');

  constructor(
    private routeService: RouteService,
    private userService: UserService,
    private authService: AuthenticateService,
    private _formBuilder: FormBuilder
  ) {
    this.userProfile = this.authService.userValue;
    this.authService.getUserFromDatabase(this.userProfile.email).subscribe({
      next: (user: any) => {
        this.user = <UserDTO>user;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(`Selected roles: ${this.selectedRoles}`);
    console.log(`Selected areas: ${this.selectedAreas}`);
    console.log(`Selected info: ${this.selectedInfo}`);
    // update user
    //this.userService.updateUserInfo(this.selectedRoles, this.selectedAreas, this.selectedInfo);

    // navigate to dashboard
  }
}
