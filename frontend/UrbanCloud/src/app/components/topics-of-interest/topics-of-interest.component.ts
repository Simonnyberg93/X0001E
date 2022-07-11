import { Component, OnInit } from '@angular/core';
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
  roleInput: string = '';
  areaInput: string = '';
  infoInput: string = '';

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
    private authService: AuthenticateService
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
    // update user
    this.userService
      .updateUserRoles(this.user.email, this.selectedRoles)
      .subscribe({
        next: (value) => {
          console.log(`Updated roles. ${value}`);
        },
        error: (error) => {
          //console.error(error);
        },
      });
    this.userService
      .updateUserAreasOfImportance(this.user.email, this.selectedAreas)
      .subscribe({
        next: (value) => {
          console.log(`Updated areas of importance. ${value}`);
        },
        error: (error) => {
          //console.error(error);
        },
      });
    this.userService
      .updateUserImportantInfo(this.user.email, this.selectedInfo)
      .subscribe({
        next: (value) => {
          console.log(`Updated intresting topics. ${value}`);
        },
        error: (error) => {
          //console.error(error);
        },
      });
    // navigate to dashboard
    this.routeService.openDashboard();
  }

  addNewRole() {
    if (this.roleInput.trim().length > 1) {
      this.workRoles.push(this.roleInput);
    }
    this.roleInput = '';
  }

  addNewArea() {
    if (this.areaInput.trim().length > 2) {
      this.importantAreas.push(this.areaInput);
    }
    this.areaInput = '';
  }

  addNewInfo() {
    if (this.infoInput.trim().length > 2) {
      this.importantInfo.push(this.infoInput);
    }
    this.infoInput = '';
  }
}
