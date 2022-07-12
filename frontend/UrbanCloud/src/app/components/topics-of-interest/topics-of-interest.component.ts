import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/models/UserDTO';
import { UserProfile } from 'src/app/models/UserProfile';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { DataService } from 'src/app/services/data.service';
import { RouteService } from 'src/app/services/route.service';
import { UserService } from 'src/app/services/user.service';

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

  public workRoles: string[] = [];
  public importantInfo: string[] = [];
  public importantAreas: string[] = [];

  userProfile: UserProfile;
  user: UserDTO = new UserDTO('', '', '', '');

  constructor(
    private routeService: RouteService,
    private userService: UserService,
    private authService: AuthenticateService,
    private dataService: DataService
  ) {
    this.userProfile = this.authService.userValue;
    this.authService.getUserFromDatabase(this.userProfile.email).subscribe({
      next: (user: any) => {
        this.user = <UserDTO>user;
        if (this.user) {
          if (this.user.areasOfInterest) {
            this.selectedAreas = this.user.areasOfInterest.map(
              (area) => area.areaName
            );
          }
          if (this.user.topicsOfInterest) {
            this.selectedInfo = this.user.topicsOfInterest.map(
              (topic) => topic.topicName
            );
          }
          if (this.user.roles) {
            this.selectedRoles = this.user.roles.map((role) => role.roleName);
          }
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  ngOnInit(): void {
    // fetch data from backend
    this.dataService.fetchAreasOfInterest().subscribe({
      next: (value: string[]) => {
        this.importantAreas = value;
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.dataService.fetchTopicsOfInterest().subscribe({
      next: (value: string[]) => {
        this.importantInfo = value;
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.dataService.fetchWorkRoles().subscribe({
      next: (value: string[]) => {
        this.workRoles = value;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

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
