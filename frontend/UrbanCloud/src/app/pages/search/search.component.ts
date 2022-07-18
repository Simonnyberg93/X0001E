import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  data: any[] = [];
  acters: any[] = [];
  areas: any[] = [];
  permissions: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  // this function gets called when searchbar component emits an event
  updateData(newItem: any) {
    this.data = <any[]>newItem.topresults;
    this.acters = <any[]>newItem.actersresults;
    this.areas = <any[]>newItem.arearesults;
    this.permissions = <any[]>newItem.permissionsresults;
  }
}
