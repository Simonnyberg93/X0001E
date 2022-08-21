import { Component, OnInit } from '@angular/core';
import { ActorDTO } from 'src/app/models/ActorDTO';
import { AreaDTO } from 'src/app/models/AreaDTO';
import { DocumentDTO } from 'src/app/models/DocumentDTO';
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
    this.userProfile = this.authService.getUserInfo();
    this.authService.getUserFromDatabase(this.userProfile.email).subscribe({
      next: (user: any) => {
        this.user = <UserDTO>user;
        console.log(JSON.stringify(user));
        if (this.user) {
          console.log('Areas' + this.user.areasOfInterests);
          if (this.user.areasOfInterests != undefined) {
            console.log('Areas');
            this.selectedAreas = this.user.areasOfInterests.map(
              (area) => area.areaName
            );
            this.selectedAreas.forEach((area) => console.log(`Area: ${area}`));
          }
          if (this.user.topicsOfInterests) {
            console.log('Topics');
            this.selectedInfo = this.user.topicsOfInterests.map(
              (topic) => topic.topicName
            );
          }
          if (this.user.roles) {
            console.log('Roles');
            this.selectedRoles = this.user.roles.map((role) => role.roleName);
            this.selectedRoles.forEach((role) => console.log(`Role: ${role}`));
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
    this.dataService.fetchAllAreas().subscribe({
      next: (value: Array<AreaDTO>) => {
        this.importantAreas = value.map((area) => area.title);
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.dataService.fetchAllDocuments().subscribe({
      next: (value: Array<DocumentDTO>) => {
        this.importantInfo = value.map((document) => document.title);
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.dataService.fetchAllActors().subscribe({
      next: (value: Array<ActorDTO>) => {
        this.workRoles = value.map((actor) => actor.title);
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
          console.error(error);
        },
      });
    this.userService
      .updateUserAreasOfImportance(this.user.email, this.selectedAreas)
      .subscribe({
        next: (value) => {
          console.log(`Updated areas of importance. ${value}`);
        },
        error: (error) => {
          console.error(error);
        },
      });
    this.userService
      .updateUserImportantInfo(this.user.email, this.selectedInfo)
      .subscribe({
        next: (value) => {
          console.log(`Updated intresting topics. ${value}`);
        },
        error: (error) => {
          console.error(error);
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
