import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-area-page',
  templateUrl: './area-page.component.html',
  styleUrls: ['./area-page.component.css'],
})
export class AreaPageComponent implements OnInit {
  areaId: string = '';
  areaObj: any = '';
  descriptionExpanded: boolean = false;
  includesExpanded: boolean = false;
  viewIncludesIdx: number = 4;
  includesObjects: any[] = [];
  relatedAreasObj: any[] = [];
  actorsWithinArea: any[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.route.params.subscribe((params) => {
      this.areaId = params['areaId'];
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    if (this.areaId && this.areaId.length > 0) {
      // fetch data from db
      this.dataService.fetchAreaById(this.areaId).subscribe({
        next: (value) => {
          this.areaObj = value;
          // fetch includes objects
          this.dataService.fetchTopicsByTitle(this.areaObj.includes).subscribe({
            next: (value) => {
              this.includesObjects = value;
            },
            error: (error) => {
              console.error(error);
            },
          });
          // fetch related areas
          this.dataService.fetchRelatedAreas(this.areaId).subscribe({
            next: (value) => {
              this.relatedAreasObj = value;
            },
            error: (error) => {
              console.error(error);
            },
          });
          // fetch actors within this area
          this.dataService.fetchRelatedActors(this.areaId).subscribe({
            next: (value) => {
              this.actorsWithinArea = value;
            },
            error: (error) => {
              console.log(error);
            },
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.errorMessage = 'Ops something went wrong..';
    }
  }

  toggleViewMoreIncludeObj() {
    if (!this.includesExpanded) {
      this.viewIncludesIdx = -1;
      this.includesExpanded = !this.includesExpanded;
    } else {
      this.viewIncludesIdx = 4;
      this.includesExpanded = !this.includesExpanded;
    }
  }
}
