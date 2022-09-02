import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/models/UserDTO';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { RouteService } from 'src/app/services/route.service';
import { SearchService } from 'src/app/services/search.service';

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

  roleRelatedActors: any[] = [];
  intresstingAreas: any[] = [];
  intresstingDocuments: any[] = [];

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
          this.authService.logout();
        },
      });
  }

  // this function gets called when searchbar component emits an event
  updateData(newItem: string) {
    this.routeService.openSearchResult(newItem);
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
