import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  data: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  updateData(newItem: any[]) {
    console.log(`SearchComponent recieved: ${newItem}`);
    this.data = newItem;
  }

  cutText(text: string, wantedLen: number): string {
    if (text.length > wantedLen) {
      return text.substring(0, wantedLen) + ' ... ';
    } else {
      return text;
    }
  }
}
