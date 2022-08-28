import { Component, OnInit } from '@angular/core';
import { ActorDTO } from 'src/app/models/ActorDTO';
import { AreaDTO } from 'src/app/models/AreaDTO';
import { DocumentDTO } from 'src/app/models/DocumentDTO';
import { UserDTO } from 'src/app/models/UserDTO';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { DataService } from 'src/app/services/data.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  showSpinner: boolean = true;

  data: any[] = [];
  actors: any[] = [];
  areas: any[] = [];
  permissions: any[] = [];

  roleRelatedActors: any[] = [];
  intresstingAreas: any[] = [];
  intresstingDocuments: any[] = [];

  constructor(
    private routeService: RouteService,
    private dataService: DataService,
    private authService: AuthenticateService
  ) {}

  ngOnInit(): void {
    // populate array by quering db with user's settings
    this.authService
      .getUserFromDatabase(this.authService.getUserInfo().email)
      .subscribe({
        next: (value: UserDTO) => {
          let user = value;
          if (user.roles && user.roles.length > 0) {
            this.dataService
              .fetchActorsByTitles(user.roles.map((role) => role.roleName))
              .subscribe({
                next: (value: Array<ActorDTO>) => {
                  this.roleRelatedActors = value;
                },
                error: (error) => {
                  console.error(error);
                },
              });
          }
          if (user.areasOfInterests && user.areasOfInterests.length > 0) {
            this.dataService
              .fetchAreasByTitles(
                user.areasOfInterests.map((area) => area.areaName)
              )
              .subscribe({
                next: (value: Array<AreaDTO>) => {
                  this.intresstingAreas = value;
                },
                error: (error) => {
                  console.error(error);
                },
              });
          }
          if (user.topicsOfInterests && user.topicsOfInterests.length > 0) {
            this.dataService
              .fetchDocumentsByTitles(
                user.topicsOfInterests.map((document) => document.topicName)
              )
              .subscribe({
                next: (value: Array<DocumentDTO>) => {
                  this.intresstingDocuments = value;
                  this.showSpinner = false;
                },
                error: (error) => {
                  console.error(error);
                },
              });
          }
        },
        error: (error) => {
          this.authService.logout();
        },
      });
  }

  // this function gets called when searchbar component emits an event
  updateData(newItem: string) {
    this.routeService.openSearchResult(newItem);
  }
}
