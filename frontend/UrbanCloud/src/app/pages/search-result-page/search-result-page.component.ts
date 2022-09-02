import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorDTO } from 'src/app/models/ActorDTO';
import { AreaDTO } from 'src/app/models/AreaDTO';
import { DocumentDTO } from 'src/app/models/DocumentDTO';
import { PermissionDTO } from 'src/app/models/PermissionDTO';
import { RouteService } from 'src/app/services/route.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.css'],
})
export class SearchResultPageComponent implements OnInit {
  actors: Array<ActorDTO> = [];
  areas: Array<AreaDTO> = [];
  documents: Array<DocumentDTO> = [];
  permissions: Array<PermissionDTO> = [];

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private routeService: RouteService
  ) {
    this.route.params.subscribe((params) => {
      let searchStr: string = params['searchStr'] + '~';
      this.searchService.findNodesFromSearchString(searchStr).subscribe({
        next: (value: Array<any>) => {
          value.forEach((obj) => {
            switch (obj.label) {
              case 'Actor': {
                this.actors.push(obj);
                break;
              }
              case 'Area': {
                this.areas.push(obj);
                break;
              }
              case 'Document': {
                this.documents.push(obj);
                break;
              }
              case 'Permission': {
                this.permissions.push(obj);
                break;
              }
              default: {
                console.log(`Found a node that does not match any known type`);
                break;
              }
            }
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
    });
  }

  ngOnInit(): void {}

  updateData(searchStr: string) {
    this.routeService.openSearchResult(searchStr);
  }
}
