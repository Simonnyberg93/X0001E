import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ActorDTO } from 'src/app/models/ActorDTO';
import { AreaDTO } from 'src/app/models/AreaDTO';
import { DocumentDTO } from 'src/app/models/DocumentDTO';
import { PermissionDTO } from 'src/app/models/PermissionDTO';
import { DataService } from 'src/app/services/data.service';
import { UrlValidatorService } from 'src/app/services/url-validator.service';
import { AddHttpPipe } from 'src/app/utils/add-http.pipe';

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
  };

  relatedPermissions: Array<PermissionDTO> = [];
  relatedAreasObj: Array<AreaDTO> = [];

  errorMessage: string = '';
  descriptionExpanded: boolean = false;
  includesExpanded: boolean = false;
  viewIncludesIdx: number = 4;

  formatUrlPipe: AddHttpPipe = new AddHttpPipe();

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private validateUrlService: UrlValidatorService,
    private router: Router
  ) {
    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.params.subscribe((params) => {
      this.areaId = params['areaId'];
      this.ngOnInit(); // reset and set based on new parameter this time
    });
  }

  ngOnInit(): void {
    if (this.areaId && this.areaId.length > 0) {
      // fetch data from db
      this.dataService.fetchAreaById(this.areaId).subscribe({
        next: (value: AreaDTO) => {
          this.areaObj = value;
          // fetchPermissions
          this.dataService.fetchPermissionsByShortestPath(value.id).subscribe({
            next: (value: Array<PermissionDTO>) => {
              this.relatedPermissions = value;
            },
            error: (err) => {
              console.error(err);
            },
          });
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

  openAreaSourcePage() {
    const url: string = this.formatUrlPipe.transform(this.areaObj.siteUrl);
    this.validateUrlService
      .validateUrl(url, this.areaObj.id)
      .then((urlIsValid: boolean) => {
        console.log(`Then: ${urlIsValid}`);
        if (urlIsValid) {
          window.open(url, '_blank');
        } else {
          alert(
            `Ops, you found a broken URL. A notice has been sent to administrators.`
          );
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
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
