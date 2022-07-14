import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-acter-card',
  templateUrl: './acter-card.component.html',
  styleUrls: ['./acter-card.component.css'],
})
export class ActerCardComponent implements OnInit {
  @Input() acter: any = new Object();

  constructor() {}

  ngOnInit(): void {}

  cutAllExceptHostName(url: string): string {
    let result = url
      .replace('www.', '')
      .replace('http://', '')
      .replace('https://', '')
      .replace('.se', '')
      .replace('.com', '');
    return result;
  }
}
