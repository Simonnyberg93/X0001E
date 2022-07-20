import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-actors-search-result',
  templateUrl: './actors-search-result.component.html',
  styleUrls: ['./actors-search-result.component.css'],
})
export class ActorsSearchResultComponent implements OnInit {
  @Input() actors: any[] = [];
  viewMoreActors: boolean = false;
  viewArctorsHighIdx = 4;

  constructor() {}

  ngOnInit(): void {}

  toggleViewActors() {
    if (!this.viewMoreActors) {
      this.viewArctorsHighIdx = -1;
      this.viewMoreActors = !this.viewMoreActors;
    } else {
      this.viewArctorsHighIdx = 4;
      this.viewMoreActors = !this.viewMoreActors;
    }
  }
}
