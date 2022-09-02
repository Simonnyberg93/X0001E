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
          let userInterests: Array<string> = concatUserData(value);
          this.searchService.findNodesFromTitles(userInterests).subscribe({
            next: (value: Array<any>) => {
              value.forEach((obj) => {
                switch (obj.label) {
                  case 'Actor': {
                    this.roleRelatedActors.push(obj);
                    break;
                  }
                  case 'Area': {
                    this.intresstingAreas.push(obj);
                    break;
                  }
                  case 'Document': {
                    this.intresstingDocuments.push(obj);
                    break;
                  }
                  case 'Permission': {
                    break;
                  }
                  default: {
                    console.log(`Ooops found a node without type..`);
                    console.log(`Node: ${JSON.stringify(obj)}`);
                    break;
                  }
                }
              });
            },
            error: (err) => console.error(err),
          });
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

function concatUserData(arg: UserDTO): Array<string> {
  var result: Array<string> = [];
  if (!arg.areasOfInterests) {
    arg.areasOfInterests = [];
  }
  if (!arg.roles) {
    arg.roles = [];
  }
  if (!arg.topicsOfInterests) {
    arg.topicsOfInterests = [];
  }
  arg.roles.forEach((actor) => result.push(actor.roleName));
  arg.areasOfInterests.forEach((area) => result.push(area.areaName));
  arg.topicsOfInterests.forEach((topic) => result.push(topic.topicName));
  return result;
}
