import { Component, OnInit } from '@angular/core';
import { ActorDTO } from 'src/app/models/ActorDTO';
import { AreaDTO } from 'src/app/models/AreaDTO';
import { DocumentDTO } from 'src/app/models/DocumentDTO';
import { UserDTO } from 'src/app/models/UserDTO';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { DataService } from 'src/app/services/data.service';
import { RouteService } from 'src/app/services/route.service';
import { typeOfNode } from 'src/app/utils/constants';

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

  AREA = typeOfNode.AREA;
  ACTOR = typeOfNode.ACTOR;
  DOCUMENT = typeOfNode.DOCUMENT;
  PERMISSION = typeOfNode.PERMISSION;

  roleRelatedActors: any[] = [];
  intresstingAreas: any[] = [];
  intresstingDocuments: any[] = [];

  constructor(
    private routeService: RouteService,
    private dataService: DataService,
    private authService: AuthenticateService
  ) {}

  ngOnInit(): void {
    // populate arrays by quering db with user's settings
    this.authService
      .getUserFromDatabase(this.authService.getUserInfo().email)
      .subscribe({
        next: (value: UserDTO) => {
          let user = value;
          console.log(`Userroles: ${user.roles.toString()}`);
          this.dataService.fetchActorsFromWorkRoles(user.roles).subscribe({
            next: (value: Array<ActorDTO>) => {
              this.roleRelatedActors = value;
            },
            error: (error) => {
              console.error(error);
            },
          });
          this.dataService
            .fetchAreasFromUserAreaOfInterest(user.areasOfInterest)
            .subscribe({
              next: (value: Array<AreaDTO>) => {
                this.intresstingAreas = value;
              },
              error: (error) => {
                console.error(error);
              },
            });
          this.dataService
            .fetchDocumentsFromUserTopicsOfInterest(user.topicsOfInterest)
            .subscribe({
              next: (value: Array<DocumentDTO>) => {
                this.intresstingDocuments = value;
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
  updateData(newItem: string) {
    this.routeService.openSearchResult(newItem);
  }
}
