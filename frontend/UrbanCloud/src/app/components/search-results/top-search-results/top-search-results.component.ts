import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-search-results',
  templateUrl: './top-search-results.component.html',
  styleUrls: ['./top-search-results.component.css'],
})
export class TopSearchResultsComponent implements OnInit {
  @Input() data: any[] = [];

  topResultsToggle: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
