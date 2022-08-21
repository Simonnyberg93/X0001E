import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorDTO } from 'src/app/models/ActorDTO';
import { Area } from 'src/app/models/Area';
import { AreaDTO } from 'src/app/models/AreaDTO';
import { DocumentDTO } from 'src/app/models/DocumentDTO';
import { DataService } from 'src/app/services/data.service';
import { AddHttpPipe } from 'src/app/utils/add-http.pipe';

@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.component.html',
  styleUrls: ['./document-page.component.css'],
})
export class DocumentPageComponent implements OnInit {
  formatUrlPipe: AddHttpPipe = new AddHttpPipe();

  errorMessage: string = '';
  relatedAreas: Array<AreaDTO> = [];
  relatedActors: Array<ActorDTO> = [];

  documentId: string = '';
  documentObj: DocumentDTO = {
    id: 0,
    title: '',
    source: '',
    description: '',
    siteUrl: '',
    areas: [],
    relatedPermissions: [],
  };
  actorSource: ActorDTO = {
    id: -1,
    title: '',
    description: '',
    siteUrl: '',
    imageUrl: '',
    relatedAreas: [],
    relatedActors: [],
    permissions: [],
  };

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {
    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.params.subscribe((params) => {
      this.documentId = params['documentId'];
      this.ngOnInit(); // reset and set based on new parameter this time
    });
  }

  ngOnInit(): void {
    if (this.documentId && this.documentId.length > 0) {
      //fetch document
      this.dataService.fetchDocumentById(this.documentId).subscribe({
        next: (value: DocumentDTO) => {
          this.documentObj = value;
          //fetch actor by source
          this.dataService
            .fetchActorsByTitles([this.documentObj.source])
            .subscribe({
              next: (value: Array<ActorDTO>) => {
                this.actorSource = value[0];
              },
              error: (err) => console.error(err),
            });
        },
        error: (err) => console.error(err),
      });
      //fetch related actors (shortestpath)
      this.dataService.fetchActorsByShortestPath(this.documentId).subscribe({
        next: (value: Array<ActorDTO>) => {
          this.relatedActors = value;
        },
        error: (err) => console.error(err),
      });
      //fetch related areas (shortestpath)
      this.dataService.fetchAreasByShortestPath(this.documentId).subscribe({
        next: (value: Array<AreaDTO>) => {
          this.relatedAreas = value;
        },
        error: (err) => console.error(err),
      });
    } else {
      this.errorMessage = 'Ops något gick fel..';
    }
  }

  openSource() {
    window.open(
      this.formatUrlPipe.transform(this.documentObj.siteUrl),
      '_blank'
    );
  }
}
