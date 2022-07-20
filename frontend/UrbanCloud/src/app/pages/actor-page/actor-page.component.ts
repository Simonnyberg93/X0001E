import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-actor-page',
  templateUrl: './actor-page.component.html',
  styleUrls: ['./actor-page.component.css'],
})
export class ActorPageComponent implements OnInit {
  actorId: string = '';
  actorObj: any = '';
  descriptionExpanded: boolean = false;
  includesExpanded: boolean = false;
  includesObjects: any[] = [];
  relatedActorsObj: any[] = [];
  relatedAreasObj: any[] = [];
  viewIncludesIdx: number = 4;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.route.params.subscribe((params) => {
      this.actorId = params['actorId'];
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    if (this.actorId && this.actorId.length > 0) {
      // fetch data from db
      this.dataService.fetchActorById(this.actorId).subscribe({
        next: (value) => {
          this.actorObj = value;
          this.includesObjects = value.includes;
        },
        error: (error) => {
          console.error(error);
        },
      });
      // fetch related actors
      this.dataService.fetchRelatedActors(this.actorId).subscribe({
        next: (value) => {
          this.relatedActorsObj = value;
        },
        error: (error) => {
          console.error(error);
        },
      });
      // fetch related areas
      this.dataService.fetchRelatedAreas(this.actorId).subscribe({
        next: (value) => {
          this.relatedAreasObj = value;
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
