import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorDTO } from 'src/app/models/ActorDTO';
import { AreaDTO } from 'src/app/models/AreaDTO';
import { DocumentDTO } from 'src/app/models/DocumentDTO';
import { PermissionDTO } from 'src/app/models/PermissionDTO';
import { DataService } from 'src/app/services/data.service';
import { AddHttpPipe } from 'src/app/utils/add-http.pipe';

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

  formatUrlPipe: AddHttpPipe = new AddHttpPipe();

  includesObjects: Array<DocumentDTO> = [];

  includesExpanded: boolean = false;
  permissionsExpanded: boolean = false;
  viewIncludesIdx: number = 4;
  viewPermissionsIdx: number = 4;
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
  }

  ngOnInit(): void {
    if (this.actorId && this.actorId.length > 0) {
      // fetch data from db
      this.dataService.fetchActorById(this.actorId).subscribe({
        next: (value) => {
          this.actorObj = value;
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

  openActorHomePage() {
    window.open(this.formatUrlPipe.transform(this.actorObj.siteUrl), '_blank');
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

  toggleViewMorePermissionObj() {
    if (!this.permissionsExpanded) {
      this.viewPermissionsIdx = -1;
      this.permissionsExpanded = !this.permissionsExpanded;
    } else {
      this.viewPermissionsIdx = 4;
      this.permissionsExpanded = !this.permissionsExpanded;
    }
  }
}
