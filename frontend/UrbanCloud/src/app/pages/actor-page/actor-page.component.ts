import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorDTO } from 'src/app/models/ActorDTO';
import { AreaDTO } from 'src/app/models/AreaDTO';
import { DocumentDTO } from 'src/app/models/DocumentDTO';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-actor-page',
  templateUrl: './actor-page.component.html',
  styleUrls: ['./actor-page.component.css'],
})
export class ActorPageComponent implements OnInit {
  actorId: string = '';
  actorObj: ActorDTO = {
    id: 0,
    title: '',
    description: '',
    siteUrl: '',
    imageUrl: '',
    relatedAreas: [],
    relatedActors: [],
    permissions: [],
  };

  includesObjects: Array<DocumentDTO> = [];
  relatedActorsObj: Array<ActorDTO> = [];
  relatedAreasObj: Array<AreaDTO> = [];

  includesExpanded: boolean = false;
  viewIncludesIdx: number = 4;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {
    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.params.subscribe((params) => {
      this.actorId = params['actorId'];
      this.ngOnInit();
    });
  }

  ngOnDestroy() {
    this.actorId = '';
    this.actorObj = {
      id: 0,
      title: '',
      description: '',
      siteUrl: '',
      imageUrl: '',
      relatedAreas: [],
      relatedActors: [],
      permissions: [],
    };
    this.includesObjects = [];
    this.relatedActorsObj = [];
    this.relatedAreasObj = [];
  }

  ngOnInit(): void {
    if (this.actorId && this.actorId.length > 0) {
      // fetch data from db
      this.dataService.fetchActorById(this.actorId).subscribe({
        next: (value) => {
          this.actorObj = value;
          this.relatedActorsObj = value.relatedActors;
          this.relatedAreasObj = value.relatedAreas;
          // fetch documents from the Actor
          this.dataService
            .fetchDocumentsByActorTitle(this.actorObj.title)
            .subscribe({
              next: (value: Array<DocumentDTO>) => {
                this.includesObjects = value;
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
      this.errorMessage = 'Ops, something went wrong ...';
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
