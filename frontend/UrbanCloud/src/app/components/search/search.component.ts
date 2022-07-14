import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  data: any[] = [];
  acters: any[] = [
    {
      name: 'Svenskt Vatten',
      description:
        'In aliquet finibus nisi, quis molestie orci finibus vel. Nam maximus lacinia ipsum, a consectetur erat blandit ut. Fusce',
      imageUrl: '/assets/images/svensktvatten.jpg',
      siteUrl: 'www.svensktvatten.se',
    },
    {
      name: 'SGU',
      description:
        'In aliquet finibus nisi, quis molestie orci finibus vel. Nam maximus lacinia ipsum, a consectetur erat blandit ut. Fusce',
      imageUrl: '/assets/images/index.jpg',
      siteUrl: 'www.sgu.se',
    },
    {
      name: 'Lumire',
      description:
        'In aliquet finibus nisi, quis molestie orci finibus vel. Nam maximus lacinia ipsum, a consectetur erat blandit ut. Fusce',
      imageUrl: '/assets/images/lumire.jpg',
      siteUrl: 'www.lumire.se',
    },
    {
      name: 'Luleå Kommun',
      description:
        'In aliquet finibus nisi, quis molestie orci finibus vel. Nam maximus lacinia ipsum, a consectetur erat blandit ut. Fusce',
      imageUrl: '/assets/images/lulea.jpg',
      siteUrl: 'www.lulea.se',
    },
    {
      name: 'Svenskt Vatten',
      description:
        'In aliquet finibus nisi, quis molestie orci finibus vel. Nam maximus lacinia ipsum, a consectetur erat blandit ut. Fusce',
      imageUrl: '/assets/images/svensktvatten.jpg',
      siteUrl: 'www.svensktvatten.se',
    },
    {
      name: 'Svenskt Vatten',
      description:
        'In aliquet finibus nisi, quis molestie orci finibus vel. Nam maximus lacinia ipsum, a consectetur erat blandit ut. Fusce',
      imageUrl: '/assets/images/svensktvatten.jpg',
      siteUrl: 'www.svensktvatten.se',
    },
    {
      name: 'Svenskt Vatten',
      description:
        'In aliquet finibus nisi, quis molestie orci finibus vel. Nam maximus lacinia ipsum, a consectetur erat blandit ut. Fusce',
      imageUrl: '/assets/images/svensktvatten.jpg',
      siteUrl: 'www.svensktvatten.se',
    },
  ];

  topResultsToggle: boolean = false;
  viewMoreActers: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  // this function gets called when searchbar component emits an event
  updateData(newItem: any[]) {
    // console.log(`SearchComponent recieved: ${newItem}`);
    this.data = newItem;
  }
}
