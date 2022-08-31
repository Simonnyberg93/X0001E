import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorDTO } from 'src/app/models/ActorDTO';
import { AreaDTO } from 'src/app/models/AreaDTO';
import { PermissionDTO } from 'src/app/models/PermissionDTO';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-permission-page',
  templateUrl: './permission-page.component.html',
  styleUrls: ['./permission-page.component.css'],
})
export class PermissionPageComponent implements OnInit {
  errorMessage: string = '';
  viewLawsIdx: number = 4;
  lawsExpanded: boolean = false;
  relatedActors: Array<ActorDTO> = [];
  relatedAreas: Array<AreaDTO> = [];

  permissionId: string = '';
  permissionObj: PermissionDTO = {
    id: 0,
    title: '',
    description: '',
    licensedByActor: {
      id: 0,
      title: '',
      description: '',
      siteUrl: '',
      imageUrl: '',
      relatedAreas: [],
      relatedActors: [],
      permissions: [],
    },
    laws: [],
  };

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {
    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.params.subscribe((params) => {
      this.permissionId = params['permissionId'];
      this.ngOnInit(); // reset and set based on new parameter this time
    });
  }

  ngOnInit(): void {
    if (this.permissionId && this.permissionId.length > 0) {
      // fetch data from db
      this.dataService.fetchPermissionById(this.permissionId).subscribe({
        next: (value: PermissionDTO) => {
          this.permissionObj = value;
          // fetch related actors
          this.dataService
            .fetchActorsByShortestPath(this.permissionId)
            .subscribe({
              next: (value: Array<ActorDTO>) => {
                this.relatedActors = value;
              },
              error: (err) => console.error(err),
            });
          // fetch related areas
          this.dataService
            .fetchAreasByShortestPath(this.permissionId)
            .subscribe({
              next: (value: Array<AreaDTO>) => {
                this.relatedAreas = value;
              },
              error: (err) => console.error(err),
            });
        },
        error: (err) => console.error(err),
      });
    } else {
      this.errorMessage = 'Ops something went wrong..';
    }
  }

  toggleViewMoreLaws() {
    if (!this.lawsExpanded) {
      this.viewLawsIdx = -1;
      this.lawsExpanded = !this.lawsExpanded;
    } else {
      this.viewLawsIdx = 4;
      this.lawsExpanded = !this.lawsExpanded;
    }
  }
}
