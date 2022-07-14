import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/models/UserDTO';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  roleRelatedInfo: any[] = [];
  intresstingAreas: any[] = [];
  intresstingTopics: any[] = [];

  constructor(
    private dataService: DataService,
    private authService: AuthenticateService
  ) {}

  ngOnInit(): void {
    // populate arrays by quering db with user's settings
    this.authService
      .getUserFromDatabase(this.authService.userValue.email)
      .subscribe({
        next: (value) => {
          let user = <UserDTO>value;
          this.dataService.fetchDataFromWorkRoles(user.roles).subscribe({
            next: (value) => {
              this.roleRelatedInfo = value;
            },
            error: (error) => {
              console.error(error);
            },
          });
          this.dataService
            .fetchDataFromUserAreaOfInterest(user.areasOfInterest)
            .subscribe({
              next: (value) => {
                this.intresstingAreas = value;
              },
              error: (error) => {
                console.error(error);
              },
            });
          this.dataService
            .fetchDataFromUserTopicsOfInterest(user.topicsOfInterest)
            .subscribe({
              next: (value) => {
                this.intresstingTopics = value;
              },
              error: (error) => {
                console.error(error);
              },
            });
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
