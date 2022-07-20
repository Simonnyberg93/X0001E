import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-small-actor-card',
  templateUrl: './small-actor-card.component.html',
  styleUrls: ['./small-actor-card.component.css'],
})
export class SmallActorCardComponent implements OnInit {
  @Input() actor: any = new Object();

  constructor() {}

  ngOnInit(): void {}

  cutText(text: string, newLen: number): string {
    if (text.length > newLen) {
      return text.substring(0, newLen - 1).concat('...');
    }
    return text;
  }
}
