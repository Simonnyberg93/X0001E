import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-acters-search-result',
  templateUrl: './acters-search-result.component.html',
  styleUrls: ['./acters-search-result.component.css'],
})
export class ActersSearchResultComponent implements OnInit {
  @Input() acters: any[] = [];
  viewMoreActers: boolean = false;
  viewArctersHighIdx = 4;

  constructor() {}

  ngOnInit(): void {}

  toggleViewActers() {
    if (!this.viewMoreActers) {
      this.viewArctersHighIdx = -1;
      this.viewMoreActers = !this.viewMoreActers;
    } else {
      this.viewArctersHighIdx = 4;
      this.viewMoreActers = !this.viewMoreActers;
    }
  }
}
