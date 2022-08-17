import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorDTO } from 'src/app/models/ActorDTO';
import { AreaDTO } from 'src/app/models/AreaDTO';
import { DocumentDTO } from 'src/app/models/DocumentDTO';
import { PermissionDTO } from 'src/app/models/PermissionDTO';
import { DataService } from 'src/app/services/data.service';
import { RouteService } from 'src/app/services/route.service';

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
    private dataService: DataService,
    private routeService: RouteService
  ) {
    this.route.params.subscribe((params) => {
      let searchStr: string = params['searchStr'] + '~';
      this.dataService.fetchActorsFromSearchString(searchStr).subscribe({
        next: (value: Array<ActorDTO>) => {
          this.actors = value;
        },
        error: (err) => {
          console.error(err);
        },
      });
      this.dataService.fetchAreasFromSearchString(searchStr).subscribe({
        next: (value: Array<AreaDTO>) => {
          this.areas = value;
        },
        error: (err) => {
          console.error(err);
        },
      });
      this.dataService.fetchPermissionsFromSearchString(searchStr).subscribe({
        next: (value: Array<PermissionDTO>) => {
          this.permissions = value;
        },
        error: (err) => {
          console.error(err);
        },
      });
      this.dataService.fetchDocumentsFromSearchString(searchStr).subscribe({
        next: (value: Array<DocumentDTO>) => {
          this.documents = value;
        },
        error: (err) => {
          console.error(err);
        },
      });
    });
  }

  ngOnInit(): void {}

  updateData(searchStr: string) {
    this.routeService.openSearchResult(searchStr);
  }
}
