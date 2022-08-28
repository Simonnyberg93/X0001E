import { Component, OnInit } from '@angular/core';
import { ActorDTO } from 'src/app/models/ActorDTO';
import { AreaDTO } from 'src/app/models/AreaDTO';
import { DocumentDTO } from 'src/app/models/DocumentDTO';
import { UserDTO } from 'src/app/models/UserDTO';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { RouteService } from 'src/app/services/route.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  intresstingDocuments: DocumentDTO[] = [];
  intresstingAreas: AreaDTO[] = [];
  roleRelatedActors: ActorDTO[] = [];

  constructor(
    private routeService: RouteService,
    private searchService: SearchService,
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
            this.searchService
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
            this.searchService
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
            this.searchService
              .fetchDocumentsByTitles(
                user.topicsOfInterests.map((document) => document.topicName)
              )
              .subscribe({
                next: (value: Array<DocumentDTO>) => {
                  this.intresstingDocuments = value;
                },
                error: (error) => {
                  console.error(error);
                },
              });
          }
        },
        error: (error) => {
          //Authentication error, redirect to logout
          this.authService.logout();
        },
      });
  }

  routeToSearch() {
    this.routeService.openSearch();
  }

  routeToMapTool() {
    this.routeService.openMapTool();
  }

  routeToNewProject() {
    this.routeService.openAddProject();
  }
}
