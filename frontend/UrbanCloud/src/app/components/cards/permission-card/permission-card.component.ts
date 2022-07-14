import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-permission-card',
  templateUrl: './permission-card.component.html',
  styleUrls: ['./permission-card.component.css'],
})
export class PermissionCardComponent implements OnInit {
  @Input() permission: any = new Object();

  constructor() {}

  ngOnInit(): void {}
}
