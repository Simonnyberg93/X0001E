import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.css'],
})
export class DataCardComponent implements OnInit {
  @Input() public data: any = new Object();
  @Input() public isMainCard: boolean = false;

  public maxTextLength: number = 200;

  constructor() {}

  ngOnInit(): void {
    if (this.isMainCard) {
      this.maxTextLength = 400;
    }
  }

  cutText(text: string, wantedLen: number): string {
    if (text.length > wantedLen) {
      return text.substring(0, wantedLen) + ' ... ';
    } else {
      return text;
    }
  }
}
