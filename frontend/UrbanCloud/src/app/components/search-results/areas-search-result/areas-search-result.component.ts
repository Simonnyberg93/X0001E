import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-areas-search-result',
  templateUrl: './areas-search-result.component.html',
  styleUrls: ['./areas-search-result.component.css'],
})
export class AreasSearchResultComponent implements OnInit {
  @Input() areas: any[] = [];

  viewMoreAreas: boolean = false;
  viewAreasHighIdx: number = 4;

  constructor() {}

  ngOnInit(): void {}

  toggleViewAreas() {
    if (!this.viewMoreAreas) {
      this.viewAreasHighIdx = -1;
      this.viewMoreAreas = !this.viewMoreAreas;
    } else {
      this.viewAreasHighIdx = 4;
      this.viewMoreAreas = !this.viewMoreAreas;
    }
  }
}
