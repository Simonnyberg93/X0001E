import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-area-card',
  templateUrl: './area-card.component.html',
  styleUrls: ['./area-card.component.css'],
})
export class AreaCardComponent implements OnInit {
  @Input() area: any = new Object();

  constructor() {}

  ngOnInit(): void {}
}
