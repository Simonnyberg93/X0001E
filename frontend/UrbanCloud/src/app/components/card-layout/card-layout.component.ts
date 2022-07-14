import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-layout',
  templateUrl: './card-layout.component.html',
  styleUrls: ['./card-layout.component.css'],
})
export class CardLayoutComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() isTopThree: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
