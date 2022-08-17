import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ActorDTO } from 'src/app/models/ActorDTO';
import { AreaDTO } from 'src/app/models/AreaDTO';
import { DocumentDTO } from 'src/app/models/DocumentDTO';
import { PermissionDTO } from 'src/app/models/PermissionDTO';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-area-page',
  templateUrl: './area-page.component.html',
  styleUrls: ['./area-page.component.css'],
})
export class AreaPageComponent implements OnInit {
  areaId: string = '';
  areaObj: AreaDTO = {
    id: 0,
    title: '',
    description: '',
    siteUrl: '',
    relatedActors: [],
    includes: [],
    relatedPermissions: [],
  };

  relatedPermissions: Array<PermissionDTO> = [];
  relatedAreasObj: Array<AreaDTO> = [];
  actorsWithinArea: Array<ActorDTO> = [];
  includesObjects: Array<DocumentDTO> = [];

  errorMessage: string = '';
  descriptionExpanded: boolean = false;
  includesExpanded: boolean = false;
  viewIncludesIdx: number = 4;

  public urlChanged = new Subject();

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {
    console.log(`CON`);
    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.params.subscribe((params) => {
      this.areaId = params['areaId'];
      this.init(); // reset and set based on new parameter this time
    });
  }

  init() {
    console.log(`INIT`);
  }

  ngOnInit(): void {
    if (this.areaId && this.areaId.length > 0) {
      // fetch data from db
      this.dataService.fetchAreaById(this.areaId).subscribe({
        next: (value: AreaDTO) => {
          this.areaObj = value;
          this.includesObjects = value.includes;
          this.actorsWithinArea = value.relatedActors;
          this.relatedPermissions = value.relatedPermissions;
          // find relatedAreas with shortest path
          this.dataService.findRelatedAreas(this.areaObj.title).subscribe({
            next: (value: AreaDTO[]) => {
              this.relatedAreasObj = value;
            },
            error: (err) => {
              console.error(err);
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
