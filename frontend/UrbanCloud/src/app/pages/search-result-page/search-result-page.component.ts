import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.css'],
})
export class SearchResultPageComponent implements OnInit {
  data: any[] = [];
  actors: any[] = [];
  areas: any[] = [];
  permissions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private routeService: RouteService
  ) {
    this.route.params.subscribe((params) => {
      this.dataService
        .fetchDataFromSearchString(params['searchStr'])
        .subscribe({
          next: (value) => {
            this.data = value.topresults;
            this.actors = value.actersresults;
            this.areas = value.arearesults;
            this.permissions = value.permissionsresults;
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
