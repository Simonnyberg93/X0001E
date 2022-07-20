import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/models/UserDTO';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  data: any[] = [];
  actors: any[] = [];
  areas: any[] = [];
  permissions: any[] = [];

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
      .getUserFromDatabase(this.authService.getUserInfo().email)
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

  // this function gets called when searchbar component emits an event
  updateData(newItem: any) {
    this.data = <any[]>newItem.topresults;
    this.actors = <any[]>newItem.actersresults;
    this.areas = <any[]>newItem.arearesults;
    this.permissions = <any[]>newItem.permissionsresults;
  }
}
