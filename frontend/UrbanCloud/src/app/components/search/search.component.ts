import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResult: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  updateData(newItem: any[]) {
    console.log(`SearchComponent recieved: ${newItem}`);
    this.searchResult = newItem;
  }
}
